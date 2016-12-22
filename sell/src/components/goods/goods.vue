<template>
	<div class="good-container">
		<div class="menu-wrap" v-el:menu-wrap>
			<ul>
				<li v-for="item in goods" class="menu-list" :class="{'current':currentIndex===$index}" @click="selectMenu($index)">
					<span class="text"><span class="supports-icon" v-show="item.type > 0" :class="classMap[item.type]"></span><span class="list-name">{{item.name}}</span></span>
				</li>
			</ul>
		</div>
		<div class="goods-wrap" v-el:goods-wrap>
			<ul>
				<li class="wrap-list wrap-list-hook" v-for="item in goods">
					<h1 class="item-title">
						{{item.name}}
					</h1>
					<ul>
						<li v-for="foodItem in item.foods" class="food-item">
							<div class="food-icon">
								<img :src="foodItem.icon" alt="">
							</div>
							<div class="food-content">
								<h2 class="food-title">{{foodItem.name}}</h2>
								<p class="food-desc">{{foodItem.description}}</p>
								<div class="extra">
									<span class="month-sale">月售{{foodItem.sellCount}}份</span><span>好评率{{foodItem.rating}}%</span>
								</div>
								<div class="price">
									<span class="cur-price">￥<span class="price-large">{{foodItem.price}}</span></span><span v-show="foodItem.oldPrice" class="old-price">￥{{foodItem.oldPrice}}</span>
								</div>
								<div class="cartcontrol-container">
									<cartcontrol :food="foodItem"></cartcontrol>
								</div>
							</div>
							
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
	</div>
</template>
<script>
	import BScroll from 'better-scroll';
	import shopcart from 'components/shopcart/shopcart.vue';
	import cartcontrol from 'components/cartcontrol/cartcontrol.vue';

  const ERR_OK = 0;

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0
      };
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods() {
		let foods = [];
		this.goods.forEach((good) => {
			good.foods.forEach((food) => {
				if (food.count) {
					foods.push(food);
				}
            });
        });
        return foods;
      }
    },
    created() {
      this.classMap = ['decrease_3', 'discount_3', 'special_3', 'invoice_3', 'guarantee_3'];

      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.goods = response.data;
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          });
        }
      });
    },
    methods: {
      _initScroll() {
        this.meunScroll = new BScroll(this.$els.menuWrap, {
          click: true
        });

        this.goodsScroll = new BScroll(this.$els.goodsWrap, {
          click: true,
          probeType: 3
        });

        this.goodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _calculateHeight() {
        let wrapList = this.$els.goodsWrap.getElementsByClassName('wrap-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < wrapList.length; i++) {
          let item = wrapList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
      selectMenu(index) {
        let wrapList = this.$els.goodsWrap.getElementsByClassName('wrap-list-hook');
        let el = wrapList[index];
        this.goodsScroll.scrollToElement(el, 300);
      }
    },
    components: {
        shopcart,
        cartcontrol
    }
  };
</script>
<style>
	.good-container{
		display: flex;
		position: absolute;
		top: 174px;
		bottom: 50px;
		width:100%;
		overflow: hidden;
	}
	.menu-wrap{
		flex: 0 0 80px;
		width: 80px;
		background-color: #f3f5f7;
	}
	.menu-wrap .menu-list{
		height: 54px;
		display:table;
		font-size: 12px;
		position: relative;
		padding:0 12px;
 	}
 	.menu-wrap .menu-list.current{
 		background-color: #fff;
 		margin-top: -2px;
 		z-index: 10;
 	}
 	.menu-wrap .menu-list.current .text{
 		background-color: #fff;
 		margin-top: -1px;
 		z-index: 10;
 	}
 	.menu-wrap .menu-list.current .text:after{
 		border:none;
 	}
 	.menu-wrap .menu-list .text:after,
 	.food-item:after{
	    position: absolute;
	    display: block;
	    width:100%;
	    left:0;
	    bottom:0;
	    content: ' ';
	    border:1px solid rgba(7,17,27,.1);
	}
	.menu-list:last-child .text:after{
		border:none;
	}
	@media (-webkit-min-device-pixel-ratio: 1.5){
	    .menu-wrap .menu-list .text:after,
	    .food-item:after{
	      	-webkit-transform: scaleY(.7);
	      	transform: scaleY(.7);
	    }
	}
	@media (-webkit-min-device-pixel-ratio: 2){
	    .menu-wrap .menu-list .text:after,
	    .food-item:after{
	      	-webkit-transform: scaleY(.5);
	      	transform: scaleY(.5);
	    }
	}
 	.menu-wrap .menu-list .text{
 		display: table-cell;
 		vertical-align: middle;
 		line-height: 14px;
 		width:56px;
 		position: relative;
 	}
	.goods-wrap{
		flex: 1;
	}
	.supports-icon{
		background-repeat: no-repeat;
		background-size: 12px 12px;
		display: inline-block;
		margin-right: 2px;
		width:12px;
		height: 12px;
		vertical-align: top;
	}
	@media (-webkit-min-device-pixel-ratio: 3){
		.supports-icon.decrease_3{
			background-image:url(decrease_3@3x.png);
		}
		.supports-icon.discount_3{
			background-image:url(discount_3@3x.png);
		}
		.supports-icon.special_3{
			background-image:url(special_3@3x.png);
		}
		.supports-icon.invoice_3{
			background-image:url(invoice_3@3x.png);
		}
		.supports-icon.guarantee_3{
			background-image:url(guarantee_3@3x.png);
		}
	}
	@media (-webkit-min-device-pixel-ratio: 2){
		.supports-icon.decrease_3{
			background-image:url(decrease_3@2x.png);
		}
		.supports-icon.discount_3{
			background-image:url(discount_3@2x.png);
		}
		.supports-icon.special_3{
			background-image:url(special_3@2x.png);
		}
		.supports-icon.invoice-3{
			background-image:url(invoice_3@2x.png);
		}
		.supports-icon.guarantee_3{
			background-image:url(guarantee_3@2x.png);
		}
	}
	.item-title{
		height: 26px;
		line-height: 26px;
		font-size: 12px;
		font-weight: 700;
		color:rgb(147,153,159);
		background-color: #f3f5f7;
		border-left:3px solid #d9dde1;
		padding-left:12px;
	}
	.food-item{
		margin:18px;
		padding-bottom: 18px;
		position: relative;
	}
	.wrap-list .food-item:last-child{
		padding-bottom: 0;
	}
	.wrap-list .food-item:last-child:after{
		border:0;
	}
	.food-item {
		display: flex;
	}
	.food-item .food-icon{
		flex: 0 0 70px;
		margin-right: 10px;
	}
	.food-item .food-icon img{
		width:70px;
		height: 70px;
	}
	.food-item .food-content{
		flex: 1;
	}
	.food-content .food-title{
		font-size: 14px;
		font-weight: 700;
		line-height: 14px;
		margin-top:2px;
	}
	.food-desc,.extra{
		font-size: 10px;
		line-height: 10px;
		margin: 8px 0;
		color:rgb(147,153,159);
	}
	.food-desc{
		line-height: 12px;
	}
	.month-sale{
		margin-right:6px;
	}
	.price{
		font-size: 12px;
		line-height: 24px;
	}
	.cur-price{
		color:red;
		margin-right:8px;
		font-weight: 700;
	}
	.price-large{
		font-size: 16px;
		font-weight: 700;
	}
	.old-price{
		text-decoration: line-through;
		color:rgb(147,153,159);
		font-weight: 700;
	}
	.cartcontrol-container{
		position: absolute;
		bottom:18px;
		right:0;
	}
</style>