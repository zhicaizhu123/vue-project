<template>
	<div class="shopcart">
		<div class="shopcart-content">
			<div class="shopcart-content-left">
				<div class="logo-container">
					<div class="logo" :class="{'highlight': totalCount > 0}">
						<i class="iconfont icon-shopping_cart"></i>
					</div>
					<div class="total-num" v-if="totalCount>0">{{totalCount}}</div>
				</div>
				<div class="shopcart-price":class="{'highlight': totalPrice > 0}">
					￥{{totalPrice}}
				</div>
				<div class="deliveryPrice">
					另需配送费￥{{deliveryPrice}}元
				</div>
			</div>
			<div class="shopcart-content-right">
				<div class="pay" :class="payClass">
					{{payDesc}}
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			deliveryPrice: {
				type: Number
			},
			minPrice: {
				type: Number
			},
			selectFoods: {
				type: Array,
				default() {
					return [];
				}
			}
		},
		data() {
			return {};
		},
		computed: {
			totalPrice() {
				let total = 0;
				this.selectFoods.forEach((food) => {
					total += food.price * food.count;
				});
				return total;
			},
			totalCount() {
				let totalNum = 0;
				this.selectFoods.forEach((food) => {
					totalNum += food.count;
				});
				return totalNum;
			},
			payDesc() {
				if (this.totalPrice === 0) {
					return '￥' + this.minPrice + '起送';
				} else if (this.totalPrice < this.minPrice) {
					return '还差￥' + (this.minPrice - this.totalPrice) + '起送';
				} else {
					return '去结算';
				}
			},
			payClass() {
				if (this.totalPrice < this.minPrice) {
					return 'not-enough';
				} else {
					return 'enough';
				}
			}
		}
	};
</script>
<style>
	.shopcart{
		width:100%;
		height:50px;
		position: fixed;
		bottom:0;
		left:0;
		background-color:#141d27;
	}
	.shopcart-content{
		display: flex;
		font-size: 0;
		color:rgba(255,255,255,.4);
	}
	.shopcart-content-left{
		flex:1;
	}
	.shopcart-content-right{
		flex:0 0 105px;
		width:105px;
	}
	.logo-container,.shopcart-price,.deliveryPrice{
		display: inline-block
	}
	.logo-container{
		width:56px;
		height:56px;
		padding:6px;
		border-radius: 50%;
		background-color:#141d27;
		box-sizing:border-box;
		margin-top: -8px;
		margin-left:6px;
		margin-right:6px;
		/*overflow: hidden;*/
		position: relative;
	}
	.logo-container .logo{
		background-color: rgba(255,255,255,.2);
		height:100%;
		width:100%;
		border-radius: 50%;
		text-align: center;
	}
	.logo-container .logo.highlight{
		background-color: #00A0DC;
		color:#fff;
	}
	.logo-container .total-num{
		position: absolute;
		right:0;
		top:0;
		width:24px;
		line-height: 16px;
		font-size: 9px;
		font-weight: 700;
		background-color: rgb(240,20,20);
		color:#fff;
		text-align: center;
		border-radius: 8px;
		box-shadow:0 4px 8px 0 rgba(0,0,0,.4);
	}
	.logo .icon-shopping_cart{
		font-size: 24px;
		line-height: 44px;
	}
	.shopcart-price{
		vertical-align: top;
		margin-top:13px;
		height:25px;
		line-height: 25px;
		font-size: 16px;
		font-weight: 700;
		padding-right:8px;
		border-right: 1px solid rgba(255,255,255,.1);
	}
	.shopcart-price.highlight{
		color:#fff;
	}
	.deliveryPrice{
		padding:0 8px;
		vertical-align: top;
		font-size: 12px;
		height:50px;
		line-height: 50px
	}
	.shopcart-content-right .pay{
		height:50px;
		line-height: 50px;
		text-align: center;
		font-size: 14px;
		font-weight: 700;
	}
	.shopcart-content-right .pay.enough{
		background-color: #12B13D;
		color:#fff;
	}
	.shopcart-content-right .pay.not-enough{
		background-color: #2B333B;
	}
</style>