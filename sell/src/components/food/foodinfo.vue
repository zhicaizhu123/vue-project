<template>
	<div v-show="showFlag" class="food" transition="slide-in-right" v-el:food>
		<div class="food-content">
			<div class="food-img">
				<div class="back" @click="hide">
					<i class="iconfont icon-arrow_lift"></i>
				</div>
				<img :src="food.image" alt="">
			</div>
			<div class="desc">
				<h1>
					{{food.name}}
				</h1>
				<div class="content-text">
					<span>月售{{food.sellCount}}份</span>
					<span>好评率{{food.rating}}%</span>
				</div>
				<div class="price">
					<span class="cur-price">￥<span class="price-large">{{food.price}}</span></span><span v-show="food.oldPrice" class="old-price">￥{{food.oldPrice}}</span>
				</div>
				<div class="cartcontrol-wrapper">
					<div class="no-buy" v-show="!food.count || food.count===0" transition="fade" @click="addFirst($event)">加入购物车</div>
					<cartcontrol :food="food"></cartcontrol>
				</div>
			</div>
			<divider v-show="food.info"></divider>
			<div class="info" v-show="food.info">
				<h2>商品介绍</h2>
				<div class="info-text">{{food.info}}</div>
			</div>
			<divider></divider>
			<div class="rating">
				<div class="select-container">
					<h2>商品评价</h2>
					<ratingselect :ratings="food.ratings" :select-type="selectType" :only-rating="onlyRating"></ratingselect>
				</div>
				<div class="rating-list">
					<div v-show="needShow(item.rateType,item.text)" class="rating-item" v-for="item in food.ratings">
						<div class="rating-time">
							{{item.rateTime | formatDate}}
						</div>
						<div class="rating-cid">
							<span class="user-name">{{item.username}}</span>
							<span class="user-img">
								<img :src="item.avatar" alt="">
							</span>
						</div>
						<div class="rating-text">
							<i class="iconfont" :class="{'icon-thumb_up' : item.rateType == 0,'icon-thumb_down' : item.rateType == 1}"></i>
							<span v-show="item.text">{{item.text}}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import BScroll from 'better-scroll';
	import {formatDate} from 'common/js/date';
	import Vue from 'vue';
	import cartcontrol from 'components/cartcontrol/cartcontrol.vue';
	import divider from 'components/divider/divider.vue';
	import ratingselect from 'components/ratingselect/ratingselect.vue';
	const ALL = 2;
	export default {
		props: {
			food: {
				type: Object
			}
		},
		data() {
			return {
				showFlag: false,
				selectType: ALL,
				onlyRating: true
			};
		},
		methods: {
			show() {
				this.showFlag = true;
				this.$nextTick(() => {
					if (!this.scroll) {
						console.log(this.$els.food);
						this.scroll = new BScroll(this.$els.food, {
							click: true
						});
					} else {
						this.scroll.refresh();
					}
				});
			},
			hide() {
				this.showFlag = false;
			},
			addFirst(event) {
				if (!event._constructed) {
					return;
				}
				this.$dispatch('cart.add', event.target);
				Vue.set(this.food, 'count', 1);
			},
			needShow(type, text) {
				if (this.onlyRating && !text) {
					return false;
				}
				if (this.selectType === ALL) {
					return true;
				} else {
					return type === this.selectType;
				}
			}

		},
		components: {
			cartcontrol,
			divider,
			ratingselect
		},
		filters: {
			formatDate(time) {
				let date = new Date(time);
				return formatDate(date, 'YYYY-MM-dd hh:mm');
			}
		},
		events: {
			'rating.select'(type) {
				this.selectType = type;
				console.log(type);
				this.$nextTick(() => {
					this.scroll.refresh();
				});
			},
			'only.show'(isshow) {
				this.onlyRating = isshow;
				console.log(isshow);
				this.$nextTick(() => {
					this.scroll.refresh();
				});
			}
		}
	};
</script>
<style>
	.slide-in-right-transition{
		transition: all 0.2s linear;
      	transform: translate3d(0, 0, 0);
	}
	.slide-in-right-enter,.slide-in-right-leave{
		transform: translate3d(100%, 0, 0);
	}
	.fade-transition{
		opacity: 1;
		transition:all .2s linear;
	}
	.fade-enter,.fade-leave{
		opacity: 0;
	}
	.food{
		position: fixed;
		left:0;
		top:0;
		right:0;
		bottom:50px;
		z-index: 30;
		background-color: #fff;
	}
	.food .back{
		position: absolute;
		left:0;
		top:0;
		color:#fff;
		z-index: 10;
		padding:10px;
	}
	.food-img{
		width:100%;
		padding-top:100%;
		background-color: #f0f0f0;
		position: relative;
	}
	.food-img img{
		width:100%;
		height: 100%;
		position: absolute;
		left:0;
		top:0;
	}
	.food-content .desc,
	.food-content .info{
		padding:18px;
		position: relative;
	}
	.food-content .rating{
		padding-top:18px;
	}
	.food-content .rating .select-container{
		padding: 0 18px;
	}
	.food-content .desc h1{
		font-size: 14px; 
		font-weight: 700;
		line-height: 14px;
		margin-bottom: 8px;
	}
	.food-content .info h2,
	.food-content .rating h2{
		font-size: 14px;
		color:#000;
	}
	.food-content .info h2{
		margin-bottom:6px;
	}
	.food-content .info .info-text{
		font-size: 12px;
		color:rgb(77,85,93);
		line-height: 24px;
		margin-left: 8px;
	}
	.desc .content-text{
		color:rgb(147,152,159);
		font-size: 10px;
		line-height: 10px;
		margin-bottom: 18px;
	}
	.cartcontrol-wrapper{
		position: absolute;
		right:18px;
		bottom:18px;
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
	.no-buy{
		position: absolute;
		text-align: center;
		right:0;
		top:0;
		width:96px;
		padding:6px;
		line-height: 12px;
		background-color: rgb(0,160,220);
		color:#fff;
		font-size: 12px;
		border-radius: 999px;
		z-index: 1;
	}
	.rating-list{
		padding: 0 18px;
		border-top:1px solid #eee;
	}
	.rating-list .rating-item{
		padding:16px 0;
		position: relative;
	}
	.rating-list .rating-item:after{
		content:"";
		width:100%;
		border-bottom:1px solid #f0f0f0;
		position: absolute;
		left: 0;
		bottom: 0;
	}
	@media (-webkit-min-device-pixel-ratio: 1.5){
	    .rating-list .rating-item:after{
	      	-webkit-transform: scaleY(.7);
	      	transform: scaleY(.7);
	    }
	}
	@media (-webkit-min-device-pixel-ratio: 2){
	    .rating-list .rating-item:after{
	      	-webkit-transform: scaleY(.5);
	      	transform: scaleY(.5);
	    }
	}
	.rating-item .rating-time{
		font-size: 10px;
		line-height: 12px;
		color:rgb(147,153,159);
		margin-bottom: 6px;
	}
	.rating-item .rating-cid{
		position: absolute;
		right:0;
		top:18px;
		font-size: 0;
	}
	.rating-cid .user-name,
	.rating-cid .user-img{
		display: inline-block;
		font-size: 10px;
		color:rgb(147,153,159);
	}
	.rating-cid .user-img{
		width:12px;
		height: 12px;
		border-radius: 6px;
		margin-left: 6px;
		overflow: hidden;
	}
	.rating-cid .user-name{
		vertical-align: top;
	}
	.rating-cid .user-img img{
		width:100%;
		height: 100%;
	}
	.rating-text{
		font-size: 0;
	}
	.rating-text .iconfont{
		margin-right:4px;
		font-size: 12px;
	}
	.rating-text .icon-thumb_up{
		color:rgb(0,160,220);
	}
	.rating-text .icon-thumb_down{
		color:rgb(147,153,159);
	}
	.rating-text span{
		font-size: 10px;
		color:rgb(7,17,27);
	}
</style>