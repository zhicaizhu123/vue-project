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
				<div class="supports">
					<span class="supports-icon"></span>
					<span class="supports-type" v-if="seller.supports">{{seller.supports[0].description}}</span>
				</div>
			</div>
		</div>
		<div class="announcement"></div>
	</div>
</template>
<script>
	export default {
		props: {
			seller: {
				type: Object
			}
		}
	};
</script>
<style>
	.content{
		padding: 24px 12px 18px 24px;
		background-color: #000;
		font-size: 0;
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
	@media (-webkit-min-device-pixel-ratio: 3){
		.supports .supports-icon{
			background-image:url(decrease_1@3x.png);
		}
	}
	@media (-webkit-min-device-pixel-ratio: 2){
		.supports .supports-icon{
			background-image:url(decrease_1@2x.png);
		}
	}
</style>