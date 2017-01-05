<template>
	<div class="shopcart">
		<div class="shopcart-content" @click="toggleList">
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
			<div class="shopcart-content-right" @click.stop="pay">
				<div class="pay" :class="payClass">
					{{payDesc}}
				</div>
			</div>
		</div>
		<div class="ball-container">
			<div transition="drop" class="ball" v-for="ball in balls" v-show="ball.show">
				<div class="inner inner-hook"></div>
			</div>
		</div>
		<div class="shopcart-list" v-show="listShow" transition="fold">
			<div class="list-head">
				<span class="title">购物车</span>
				<span class="empty" @click="empty">清空</span>
			</div>
			<div class="list-content" v-el:list-content>
				<ul>
					<li v-for="food in selectFoods">
						<span class="food-name">{{food.name}}</span>
						<div class="price">￥{{food.price * food.count}}</div>
						<div class="cartcontrol-wrapper">
							<cartcontrol :food="food"></cartcontrol>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
	<div class="list-mask" v-show="listShow" transition="fade" @click="hideList"></div>
</template>
<script>
	import BScroll from 'better-scroll';
	import cartcontrol from 'components/cartcontrol/cartcontrol';
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
			return {
				balls: [
					{
						show: false
					},
					{
						show: false
					},
					{
						show: false
					},
					{
						show: false
					},
					{
						show: false
					}
				],
				dropBalls: [],
				fold: true
			};
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
			},
			listShow() {
				if (!this.totalCount) {
					this.fold = true;
					return false;
				}
				let show = !this.fold;
				if (show) {
					this.$nextTick(() => {
						if (!this.scroll) {
							this.scroll = new BScroll(this.$els.listContent, {
								click: true
							});
						} else {
							this.scroll.refresh();
						}
					});
				}
				return show;
			}
		},
		methods: {
			drop(el) {
				let len = this.balls.length;
				for (let i = 0; i < len; i++) {
					let ball = this.balls[i];
					if (!ball.show) {
						ball.show = true;
						ball.el = el;
						this.dropBalls.push(ball);
						return;
					}
				}
			},
			toggleList() {
				console.log(this.totalCount);
				if (!this.totalCount) {
					return;
				}
				this.fold = !this.fold;
			},
			hideList() {
				this.fold = true;
			},
			empty() {
				this.selectFoods.forEach((food) => {
					food.count = 0;
				});
			},
			pay() {
				if (this.totalPrice < this.minPrice) {
					return;
				}
				window.alert(`需要支付${this.totalPrice}元`);
			}

		},
		components: {
			cartcontrol
		},
		transitions: {
			drop: {
				beforeEnter(el) {
					let ballNum = this.balls.length;
					while (ballNum--) {
						let ball = this.balls[ballNum];
						if (ball.show) {
							let rect = ball.el.getBoundingClientRect();
							let x = rect.left - 26;
							let y = -(window.innerHeight - rect.top - 22);
							el.style.display = '';
							el.style.webkitTransform = `translate3d(0,${y}px,0)`;
							el.style.transform = `translate3d(0,${y}px,0)`;
							let inner = el.getElementsByClassName('inner-hook')[0];
							inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
							inner.style.transform = `translate3d(${x}px,0,0)`;
						}
					}
				},
				enter(el) {
					/* eslint-disable no-unused-vars */
					let rf = el.offsetHeight;
					this.$nextTick(() => {
						el.style.webkitTransform = 'translate3d(0,0,0)';
						el.style.transform = 'translate3d(0,0,0)';
						let inner = el.getElementsByClassName('inner-hook')[0];
						inner.style.webkitTransform = 'translate3d(0,0,0)';
						inner.style.transform = 'translate3d(0,0,0)';
					});
				},
				afterEnter(el) {
					let ball = this.dropBalls.shift();
					if (ball) {
						ball.show = false;
						el.style.display = 'none';
					}
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
		z-index: 50;
	}
	.shopcart-content{
		display: flex;
		font-size: 0;
		color:rgba(255,255,255,.4);
		background-color:#141d27;
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
	.ball-container .ball{
		position: fixed;
		left:26px;
		bottom:22px;
		z-index: 100;
	}
	.ball-container .ball.drop-transition{
		transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
	}
	.ball-container .ball .inner{
		width:16px;
		height:16px;
		border-radius: 50%;
		background-color: rgb(0,160,220);
		transition: all 0.4s linear;
	}
	.shopcart-list{
		width:100%;
		position: absolute;
		left: 0;
		top:0;
		z-index: -1;
	}
	.shopcart-list.fold-transition{
		transition: all 0.5s;
		transform: translate3d(0, -100%, 0);
	}
	.shopcart-list.fold-enter,.shopcart-list.fold-leave{
		transform: translate3d(0, 0, 0);
	}
	.list-head{
		height: 40px;
		line-height: 40px;
		font-size: 14px;
		background: #f3f5f7;
		padding: 0 18px;
		border-bottom: 1px solid rgba(7,17,27,.1);
	}
	.list-head .title{
		color:rgb(7,17,27);
	}
	.list-head .empty{
		color:rgb(0,160,220);
		font-size: 12px;
		float: right;
	}
	.list-content{
		padding: 0 18px;
		background-color: #fff;
		max-height: 200px;
		overflow: hidden;
	}
	.list-content li{
		padding: 12px 0;
		border-bottom:1px solid rgba(7,17,27,.1);
		line-height: 24px;
		position: relative;
	}
	.list-content li .food-name{
		font-size: 14px;
		color:rgb(7,17,27);
	}
	.list-content li .price{
		position: absolute;
		right:100px;
		bottom:12px;
		font-size: 14px;
		font-weight: 700;
		line-height: 24px;
		color:rgb(240,20,20);
	}
	.list-content li .cartcontrol-wrapper{
		position: absolute;
		right:-6px;
		bottom:4px;
	}
	.list-mask{
		position: fixed;
		left:0;
		top:0;
		z-index: 40;
		width:100%;
		height: 100%;
		background-color: rgba(7,17,27,.6);
		backdrop:blur(10px);
	}
	.list-mask.fade-transition{
		transition:all .5s linear;
		opacity: 1;
	}
	.list-mask.fade-enter,.list-mask.fade-leave{
		opacity: 0;
	}
</style>