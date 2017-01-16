<template>
	<div class="rating-select">
		<div class="select-block">
			<span @click="select(2,$event)" class="block positive" :class="{'active':selectType == 2}">{{selectText.all}}<span class="rating-numm">{{ratings.length}}</span></span>
			<span @click="select(0,$event)" class="block positive" :class="{'active':selectType == 0}">{{selectText.positive}}<span class="rating-numm">{{positivenum.length}}</span></span>
			<span @click="select(1,$event)" class="block negative" :class="{'active':selectType == 1}">{{selectText.negative}}<span class="rating-numm">{{negativenum.length}}</span></span>
		</div>
		<div class="only-raging" @click="onlySelect">
			<i class="iconfont icon-check_circle" :class="{'on' : onlyRating}"></i><span>只看有内容的评论</span>
		</div>
	</div>
</template>
<script>
	const POSITIVE = 0;
	const NEGATIVE = 1;
	const ALL = 2;
	export default {
		props: {
			ratings: {
				type: Array,
				default() {
					return [];
				}
			},
			selectText: {
				type: Object,
				default: function () {
					return {
						all: '全部',
						positive: '推荐',
						negative: '吐槽'
					};
				}
			},
			selectType: {
				type: Number,
				default: ALL
			},
			onlyRating: {
				type: Boolean,
				default: true
			}
		},
		computed: {
			positivenum() {
				return this.ratings.filter((obj) => {
					return obj.rateType === POSITIVE;
				});
			},
			negativenum() {
				return this.ratings.filter((obj) => {
					return obj.rateType === NEGATIVE;
				});
			}
		},
		methods: {
			select(type, event) {
				this.selectType = type;
				this.$dispatch('rating.select', this.selectType);
			},
			onlySelect() {
				this.onlyRating = !this.onlyRating;
				this.$dispatch('only.show', this.onlyRating);
			}
		}
	};
</script>
<style>
	.select-block{
		padding:18px 0;
		font-size: 0;
		position: relative;
	}
	.select-block:after{
		content:"";
		width:100%;
		border-bottom:1px solid #f0f0f0;
		position: absolute;
		bottom:0;
		left:0;
	}
	@media (-webkit-min-device-pixel-ratio: 1.5){
	    .select-block:after{
	      	-webkit-transform: scaleY(.7);
	      	transform: scaleY(.7);
	    }
	}
	@media (-webkit-min-device-pixel-ratio: 2){
	    .select-block:after{
	      	-webkit-transform: scaleY(.5);
	      	transform: scaleY(.5);
	    }
	}
	.select-block .block{
		display: inline-block;
		font-size: 12px;
		padding:8px 12px;
		line-height: 16px;
		border-radius: 4px;
		color:rgb(77,85,93);
		margin-right:8px;
	}
	.select-block .block .rating-numm{
		font-size: 10px;
	}
	.select-block .block.positive{
		background-color: rgba(0,160,220,.2);
	}
	.select-block .block.negative{
		background-color: rgba(77,85,93,.2);
	}
	.select-block .block.positive.active{
		color:#fff;
		background-color: rgb(0,160,220);
	}
	.select-block .block.negative.active{
		color:#fff;
		background-color: rgb(77,85,93);
	}
	.only-raging{
		color:rgb(147,153,159);
		line-height: 24px;
		padding: 12px 0;
	}
	.only-raging .iconfont{
		font-size: 24px;
	}
	.only-raging .iconfont.on{
		color:rgb(0,160,220);
	}
	.only-raging span{
		margin-left: 4px;
		vertical-align: top;
		font-size: 12px;
	}
</style>