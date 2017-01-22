<template>
	<div class="seller-container" v-el:seller-wrapper>
		<div class="seller-wrap">
			<div class="block">
				<div class="seller-title">
					<h2>{{seller.name}}</h2>
					<div class="seller-evaluation">
						<score :size="36" :type="seller.score"></score>
						<span class="seller-score">({{seller.score}})</span>
						<span class="sell-count">月售{{seller.sellCount}}单</span>
					</div>
				</div>
				<div class="seller-data">
					<div class="data">
						<div class="data-title">
							起送价
						</div>
						<div class="data-text">
							<span class="data-num">{{seller.minPrice}}</span>元
						</div>
					</div>
					<div class="data">
						<div class="data-title">
							商家配送
						</div>
						<div class="data-text">
							<span class="data-num">{{seller.deliveryPrice}}</span>元
						</div>
					</div>
					<div class="data">
						<div class="data-title">
							平均配送时间
						</div>
						<div class="data-text">
							<span class="data-num">{{seller.deliveryTime}}</span>分钟
						</div>
					</div>
				</div>
				<div class="collect-seller" @click="favoriteCallback($event)">
					<i class="iconfont icon-favorite" :class="favorite ? 'favorite' :''"></i>
					<span>{{favoritetext}}</span>
				</div>
			</div>
			<divider></divider>
			<div class="block">
				<h2 class="block-title">
					公告与活动
				</h2>
				<div class="seller-bulletin">
					{{seller.bulletin}}
				</div>
				<div class="supports-main seller-suports-main" v-if="seller.supports">
					<div v-for="supportItem in seller.supports" class="supports-list seller-supports">
						<span class="supports-icon iconfont" :class="classMap[supportItem.type]"></span>
						<span class="supports-desc">{{supportItem.description}}</span>
					</div>
				</div>
			</div>
			<divider></divider>
			<div class="block">
				<h2 class="block-title">
					商家实景
				</h2>
				<div class="seller-pics" v-el:pics-container>
					<ul v-el:pics-ul>
						<li v-for="item in seller.pics">
							<img :src="item" alt="">
						</li>
					</ul>
				</div>
			</div>
			<divider></divider>
			<div class="block">
				<h2 class="block-title">
					商家信息
				</h2>
				<div class="seller-infos" v-if="seller.infos">
					<div v-for="info in seller.infos" class="infos-list">
						{{info}}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import BScroll from 'better-scroll';
	import {saveToLocal, loadFromLocal} from 'common/js/localData.js';
	import score from 'components/score/score.vue';
	import divider from 'components/divider/divider.vue';
	export default {
		props: {
			seller: {
				type: Object
			}
		},
		data() {
			return {
				favorite: (() => {
					return loadFromLocal(this.seller.id, 'favorite');
				})()
			};
		},
		computed: {
			favoritetext() {
				return this.favorite ? '已收藏' : '收藏';
			}
		},
		created: function () {
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
			// this.$nextTick(() => {
			// 	this._initScroll();
			// });
		},
		watch: {
			'seller'() {
				this._initScroll();
				this._setPicsWidth();
			}
		},
		ready() {
			this._initScroll();
			this._setPicsWidth();
		},
		methods: {
			_initScroll() {
				if (!this.scroll) {
					console.log(this.$els.sellerWrapper);
					this.scroll = new BScroll(this.$els.sellerWrapper, {
						click: true
					});
				} else {
					this.scroll.refresh();
				}
			},
			_setPicsWidth() {
				if (this.seller.pics) {
					let picWidth = 120;
					let margin = 6;
					let width = (picWidth + margin) * this.seller.pics.length - margin;
					this.$els.picsUl.style.width = width + 'px';
					this.$nextTick(() => {
						if (!this.picsScroll) {
							console.log(this.$els.picsContainer);
							this.picsScroll = new BScroll(this.$els.picsContainer, {
								scrollX: true,
								eventPassthrough: 'vertical'
							});
						} else {
							this.picsScroll.refresh();
						}
					});
				}
			},
			favoriteCallback(event) {
				if (!event._constructed) {
					return;
				}
				this.favorite = !this.favorite;
				saveToLocal(this.seller.id, 'favorite', this.favorite);
			}
		},
		components: {
			score,
			divider
		}
	};
</script>
<style>
	.seller-container{
		position: absolute;
		left:0;
		top:174px;
		bottom:0;
		width:100%;
		overflow: hidden;
	}
	.block{
		padding:0 18px;
		position: relative;
	}
	.block .seller-title,
	.block .seller-data{
		padding:18px 0;
		position: relative;
	}
	.block .seller-title:after{
		content:"";
		bottom:0;
		left: 0;
		width:100%;
		position: absolute;
		border-bottom:1px solid rgba(7,17,27,.1);
	}
	@media (-webkit-min-device-pixel-ratio: 1.5){
	    .block .seller-title:after,
	    .infos-list:after:after{
	      	-webkit-transform: scaleY(.7);
	      	transform: scaleY(.7);
	    }
	}
	@media (-webkit-min-device-pixel-ratio: 2){
	    .block .seller-title:after,
	    .infos-list:after:after{
	      	-webkit-transform: scaleY(.5);
	      	transform: scaleY(.5);
	    }
	}
	.seller-title h2{
		margin-bottom: 8px;
		font-size: 14px;
		line-height: 14px;
		color:rgb(7,17,27);
	}
	.seller-evaluation .score-container{
		padding:0;
		display: inline-block;
		vertical-align: top;
	}
	.seller-evaluation .seller-score{
		margin-left:8px;
		margin-right: 12px;
	}
	.seller-evaluation .seller-score,
	.seller-evaluation .sell-count{
		font-size: 10px;
		line-height: 18px;
		color:rgb(77,85,93);
	}
	.block .seller-data{
		display: flex;
		justify-content:center;
		align-items:center;
	}
	.seller-data .data{
		flex:1;
		text-align: center;
		border-right: 1px solid  rgba(147,153,159,.2);
	}
	.seller-data .data:last-child{
		border:none;
	}
	.seller-data .data-title{
		font-size: 10px;
		color:rgb(147,153,159);
		line-height: 10px;
		margin-bottom: 4px;
	}
	.seller-data .data-text{
		font-size: 10px;
		color:rgb(7,17,27);
		line-height: 10px;
	}
	.seller-data .data-text .data-num{
		font-size: 24px;
		line-height: 24px;
	}
	.collect-seller{
		position: absolute;
		right: 10px;
		top:18px;
		width:48px;
		text-align: center;
	}
	.collect-seller span{
		display: block;
		font-size: 10px;
		margin-top: 4px;
		color:rgb(77,85,93);
	}
	.icon-favorite{
		font-size: 24px;
		line-height: 24px;
		color:rgb(147,153,159);
	}
	.icon-favorite.favorite{
		color:rgb(240,20,20);
	}
	.block-title{
		padding-top: 18px;
		font-size: 14px;
		color:rgb(7,17,27);
		line-height: 14px;
	}
	.seller-bulletin{
		padding-top: 8px;
		padding-bottom: 16px;
		padding-left:12px;
		font-size: 12px;
		color:rgb(240,20,20);
		line-height: 24px;
	}
	.supports-main.seller-suports-main{
		margin-top: 0;
	}
	.supports-list.seller-supports{
		padding:16px 12px;
		position: relative;
		margin-bottom: 0;
	}
	.supports-list:after{
		content:"";
		top:0;
		left: 0;
		width:100%;
		position: absolute;
		border-bottom:1px solid rgba(7,17,27,.1);
	}

	.supports .supports-icon{
		background-repeat: no-repeat;
		background-size: 12px 12px;
		display: inline-block;
		margin-right: 4px;
		width:12px;
		height: 12px;
		vertical-align: top;
	}
	.supports .supports-type{
		font-size: 10px;
		line-height: 12px;
	}
	.supports-list{
		margin-bottom: 12px;
	}
	.supports-list .supports-icon{
		background-repeat: no-repeat;
		background-size: 16px 16px;
		width:16px;
		height: 16px;
		display: inline-block;
		margin-right: 6px;
		vertical-align: top;
	}
	@media (-webkit-min-device-pixel-ratio: 3){
		.supports .supports-icon.decrease,
		.supports-list .supports-icon.decrease{
			background-image:url(decrease_1@3x.png);
		}
		.supports .supports-icon.discount,
		.supports-list .supports-icon.discount{
			background-image:url(discount_1@3x.png);
		}
		.supports .supports-icon.special,
		.supports-list .supports-icon.special{
			background-image:url(special_1@3x.png);
		}
		.supports .supports-icon.invoice,
		.supports-list .supports-icon.invoice{
			background-image:url(invoice_1@3x.png);
		}
		.supports .supports-icon.guarantee,
		.supports-list .supports-icon.guarantee{
			background-image:url(guarantee_1@3x.png);
		}
	}
	@media (-webkit-min-device-pixel-ratio: 2){
		.supports .supports-icon.decrease,
		.supports-list .supports-icon.decrease{
			background-image:url(decrease_1@2x.png);
		}
		.supports .supports-icon.discount,
		.supports-list .supports-icon.discount{
			background-image:url(discount_1@2x.png);
		}
		.supports .supports-icon.special,
		.supports-list .supports-icon.special{
			background-image:url(special_1@2x.png);
		}
		.supports .supports-icon.invoice,
		.supports-list .supports-icon.invoice{
			background-image:url(invoice_1@2x.png);
		}
		.supports .supports-icon.guarantee,
		.supports-list .supports-icon.guarantee{
			background-image:url(guarantee_1@2x.png);
		}
	}
	.seller-pics{
		padding:12px 0 18px;
		overflow: hidden;
	}
	.seller-pics ul{
		overflow: hidden;
		height: 90px;
	}
	.seller-pics li{
		float: left;
		margin-right: 6px;
	}
	.seller-pics li:last-child{
		margin-right: 0;
	}
	.seller-pics img{
		width:120px;
		height: 90px;
	}
	.seller-infos{
		margin-top: 12px;
	}
	.infos-list{
		padding:16px 12px;
		position: relative;
		font-size: 12px;
		line-height: 16px;
	}
	.infos-list:after{
		content:"";
		top:0;
		left: 0;
		width:100%;
		position: absolute;
		border-bottom:1px solid rgba(7,17,27,.1);
	}
</style>