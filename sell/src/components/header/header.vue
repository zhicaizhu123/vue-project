<template>
	<div class="header">
		<div class="content">
			<img width="64" height="64" :src="seller.avatar" alt="">
			<div class="content-right">
				<div class="title">
					<span class="title-icon"></span>
					<span class="title-name">{{seller.name}}</span>
				</div>
				<div class="deliver">
					<span>{{seller.description}}</span>/{{seller.deliveryTime}}分钟送达
				</div>
				<div class="supports" v-if="seller.supports">
					<span class="supports-icon" :class="classMap[seller.supports[0].type]"></span>
					<span class="supports-type">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div class="count-container" v-if="seller.supports" @click="showDetail">
				<span class="count">{{seller.supports.length}}个</span>
				<span class="right-arrow iconfont icon-keyboard_arrow_right"></span>
			</div>
		</div>
		<div class="bulletin" @click="showDetail">
			<span class="bulletin-img"></span>
			<span class="bulletin-text">{{seller.bulletin}}</span>
			<span class="bulletin-icon iconfont icon-keyboard_arrow_right"></span>
		</div>
		<div class="header-bg">
			<img :src="seller.avatar" width="100%" alt="">
		</div>
		<div class="detail" v-show="showDetailFlag">
			<div class="detail-container">
				<div class="detail-wrap">
					<div class="detail-title">
						{{seller.name}}
					</div>
					<score :size="48" :type="seller.score"></score>
					<div class="detail-content">
						<div class="content-title">
							<span class="line"></span>
							<h2 class="supports-text">优惠信息</h2>	
							<span class="line"></span>
						</div>
						<div class="supports-main">
							<div v-for="supportItem in seller.supports" class="supports-list">
								<span class="supports-icon iconfont" :class="classMap[supportItem.type]"></span>
								<span class="supports-desc">{{supportItem.description}}</span>
							</div>
						</div>
					</div>
					<div class="detail-content">
						<div class="content-title">
							<span class="line"></span>
							<h2 class="supports-text">商家公告</h2>	
							<span class="line"></span>
						</div>
						<div class="bulletin-main">
							{{seller.bulletin}}
						</div>
					</div>
				</div>
			</div>
			<div class="detail-close">
				<i class="iconfont icon-close" @click="closeDetail"></i>
			</div>
		</div>
	</div>
</template>
<script>
	import score from 'components/score/score.vue';
	export default {
		props: {
			seller: {
				type: Object
			}
		},
		data: function () {
			return {
				showDetailFlag: false
			};
		},
		components: {
			score: score
		},
		methods: {
			showDetail: function () {
				this.showDetailFlag = true;
			},
			closeDetail: function () {
				this.showDetailFlag = false;
			}
		},
		created: function () {
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
		}
	};
</script>
<style>
	*{
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
	}
	.header{
		font-size: 0;
		color:#fff;
		overflow: hidden;
		position: relative;
		background-color: rgba(7,17,27,.5);
	}
	.header-bg{
		position: absolute;
		left:0;
		top:0;
		width:100%;
		z-index: -1;
		filter:blur(10px);

	}
	.content{
		padding: 24px 12px 18px 24px;
		position: relative;
	}
	.content img{
		border-radius: 4px;
		display: inline-block;
		vertical-align: top;
	}
	.content-right{
		display: inline-block;
		margin-left: 16px;
		color:#fff;
	}
	.content-right .title{
		margin:2px 0 8px 0;
	}
	.content-right .title-name{
		margin-left: 6px;
		font-size: 16px;
		font-weight: bold;
		line-height: 18px;
		vertical-align: top;
	}
	.content-right .title-icon{
		background-repeat: no-repeat;
		background-size: 30px 18px;
		display: inline-block;
		width:30px;
		height: 18px;
	}
	@media (-webkit-min-device-pixel-ratio: 3){
		.content-right .title-icon{
			background-image:url(brand@3x.png);
		}
	}
	@media (-webkit-min-device-pixel-ratio: 2){
		.content-right .title-icon{
			background-image:url(brand@2x.png);
		}
	}
	.deliver{
		font-size: 12px;
		line-height: 12px;
		margin-bottom: 10px;
	}
	.supports{
		margin-bottom: 2px;
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
		margin-left: 12px;
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
	.count-container{
		position: absolute;
		right:12px;
		bottom:16px;
		display: inline-block;
		padding:0 8px;
		background-color: rgba(0,0,0,.2);
		font-size: 12px;
		height: 24px;
		line-height: 24px;
		border-radius: 999px;
		color:#fff;
	}
	.count-container .count{
		display: inline-block;
		vertical-align: top;
	}
	.bulletin{
		height: 28px;
		line-height: 28px;
		font-size: 12px;
		background-color: rgba(7,17,27,.2);
		padding:0 22px 0 12px;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow:hidden;
		position: relative;
	}
	.bulletin-img{
		margin-right: 4px;
		background-repeat: no-repeat;
		background-size: 22px 12px;
		display: inline-block;
		margin-right: 4px;
		width:22px;
		height: 12px;
		vertical-align: middle;
	}
	@media (-webkit-min-device-pixel-ratio: 3){
		.bulletin-img{
			background-image: url(bulletin@3x.png);
		}
	}
	@media (-webkit-min-device-pixel-ratio: 2){
		.bulletin-img{
			background-image: url(bulletin@2x.png);
		}
	}
	.bulletin-text{
		vertical-align: top;
	}
	.bulletin-icon{
		position: absolute;
		right:10px;
	}
	.detail{
		position: fixed;
		top:0;
		left:0;
		right:0;
		bottom: 0;
		width:100%;
		height: 100%;
		overflow-y: auto;
		overflow-x:hidden; 
		z-index: 1;
		background-color: rgba(7,17,27,.8);
		/*filter:blur(10px);*/
	}
	.detail-container{
		min-height: 100%;
		padding-top: 64px;
		padding-bottom: 64px;
	}
	.detail-wrap{
		
	}
	.detail-close{
		margin-top:-64px;
		height: 64px;
	}
	.detail-close i{
		font-size: 32px;
		width:32px;
		height: 32px;
		text-align: center;
		display: block;
		margin:0 auto;
	}
	.detail-title{
		font-size: 16px;
		font-weight: 700;
		text-align: center;
		height: 16px;
		line-height: 16px;
	}
	.detail-content{
		padding: 0 36px;
	}
	.content-title{
		display: -webkit-box;
		display: box;
		-webkit-box-align: center;
		box-align: center;
		-webkit-box-pack: center;
		box-pack: center;
	}
	.content-title .supports-text{
		font-weight: 700;
		font-size: 14px;
		line-height: 14px;
		padding: 0 12px;
	}
	.content-title .line{
		display: block;
		-webkit-box-flex: 1;
		box-flex: 1;
		height: 1px;
		background-color: rgba(255,255,255,.2);
	}
	.supports-main,.bulletin-main{
		font-size: 12px;
		line-height: 12px;
		margin:24px 0 28px ;
	}
	.bulletin-main{
		line-height: 24px;
	}
	.supports-desc{
		font-size: 12px;
		line-height: 12px;
	}
</style>