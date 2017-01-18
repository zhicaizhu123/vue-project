<template>
	<div class="ratings-container" v-el:ratings-scroll>
		<div class="rating-wrap">
			<div class="level-wrap">
				<div class="level-left">
					<div class="left-content">
						<div class="score-num">
							{{seller.score}}
						</div>
						<div class="score-text">
							综合评分
						</div>
						<div class="compare">
							高于周边商家{{seller.rankRate}}%
						</div>
					</div>
				</div>
				<div class="level-right">
					<div class="goods-evaluation">
						<span class="title">
							商品评价
						</span>
						<score :size="24" :type="seller.foodScore"></score>
						<span class="num">{{seller.foodScore}}</span>
					</div>
					<div class="service-evaluation">
						<span class="title">
							服务态度
						</span>
						<score :size="24" :type="seller.serviceScore"></score>
						<span class="num">{{seller.serviceScore}}</span>
					</div>
					<div class="arrive-time">
						<span class="title">
							送达时间
						</span>
					</div>
				</div>
			</div>
			<divider></divider>
			<div class="ratings-list">
				<div class="rating-selector">
					<ratingselect :ratings="ratings" :select-text="selectText"></ratingselect>
				</div>
				<div class="ratings-detail">
					<li v-show="needShow(item.rateType,item.text)" v-for="item in ratings" class="detail-item">
						<div class="user-img">
							<img :src="item.avatar" alt="">
						</div>
						<div class="detail-context">
							<div class="ratings-time">
								{{item.rateTime |formatDate}}
							</div>
							<div class="user-name">
								{{item.username}}
							</div>
							<div class="ratings-tip">
								<score :size="24" :type="item.score"></score>
								<span v-show="item.deliveryTime" class="arrive-time">{{item.deliveryTime}}分钟送达</span>
							</div>
							<div v-show="item.text" class="ratings-text">
								{{item.text}}
							</div>
							<div class="recommend">
								<i class="iconfont" :class="{'icon-thumb_up':item.rateType===0,'icon-thumb_down':item.rateType===1}"></i>
								<span class="recommend-item" v-for="list in item.recommend">
									{{list}}
								</span>
							</div>
						</div>
					</li>
				</div>
			</div>
		</div>

	</div>
</template>
<script>
	import BScroll from 'better-scroll';
	import {formatDate} from 'common/js/date.js';
	import score from 'components/score/score.vue';
	import divider from 'components/divider/divider.vue';
	import ratingselect from 'components/ratingselect/ratingselect.vue';
	const ALL = 2;
	const ERR_OK = 0;
	export default {
		props: {
			seller: {
				type: Object
			}
		},
		data() {
			return {
				ratings: [],
				selectText: {
					all: '全部',
					positive: '满意',
					negative: '不满意'
				},
				selectType: ALL,
				onlyRating: true
			};
		},
		created() {
			this.$http.get('/api/ratings').then((response) => {
				response = response.body;
				if (response.errno === ERR_OK) {
					this.ratings = response.data;
					this.$nextTick(() => {
						this._initScroll();
					});
				}
			});
		},
		methods: {
			_initScroll() {
				if (!this.scroll) {
					console.log(this.$els.ratingsScroll);
					this.scroll = new BScroll(this.$els.ratingsScroll, {
						click: true
					});
				} else {
					this.scroll.refresh();
				}
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
			score,
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
				this.$nextTick(() => {
					this.scroll.refresh();
				});
			},
			'only.show'(isshow) {
				this.onlyRating = isshow;
				this.$nextTick(() => {
					this.scroll.refresh();
				});
			}
		}
	};
</script>
<style>
	.ratings-container{
		position: absolute;
		top:174px;
		left: 0;
		bottom:0;
		width:100%;
		overflow: hidden;
	}
	.level-wrap{
		display: flex;
	}
	.level-left{
		flex:0 0 138px;
		text-align: center;
		padding:18px 0;
	}
	.level-left .left-content{
		border-right:1px solid rgba(147,153,159,.2);
	}
	.level-left .score-num{
		font-size: 24px;
		color:rgb(255,153,0);
		line-height: 28px;
		margin-bottom: 6px;
	}
	.level-left .score-text{
		font-size: 12px;
		color:rgb(7,17,27);
		line-height: 12px;
		margin-bottom: 8px;
	}
	.level-left .compare{
		font-size: 10px;
		color:rgba(7,17,27,.5);
		line-height: 10px;
		padding-bottom: 6px;
	}


	.level-right{
		flex:1;
		padding:18px 0 18px 24px;
	}
	.level-right .score-container{
		display: inline-block;
		padding:0;
		vertical-align: top;
		margin-right:12px;
	}
	.level-right .title{
		font-size: 12px;
		color:rgb(7,17,27);
		line-height: 18px;
		vertical-align: top;
		margin-right:12px;
	}
	.level-right .num{
		font-size: 12px;
		color:rgb(255,153,0);
		line-height: 18px;
	}
	.goods-evaluation,.service-evaluation{
		margin-bottom: 6px;
	}
	.rating-selector{
		padding:0 18px;
	}
	.ratings-detail{
		padding:0 18px;
		border-top: 1px solid rgba(147,153,157,.2);
	}
	.detail-item{
		display: flex;
		position: relative;
		padding: 18px 0;
		border-bottom: 1px solid rgba(147,153,157,.2);
	}
	.detail-item .user-img{
		flex:0 0 40px;
		width:40px;
	}
	.detail-item .user-img img{
		width:28px;
		height: 28px;
		border-radius: 14px;
	}
	.detail-item .ratings-time{
		position: absolute;
		right:0;
		top:18px;
		color:rgb(147,153,157);
		font-size: 10px;
		line-height: 12px;
	}
	.detail-item .user-name{
		font-size: 10px;
		line-height: 12px;
		margin-bottom: 4px;
	}
	.detail-item .ratings-tip{
		margin-bottom: 6px;
	}
	.ratings-tip .score-container{
		padding:0;
		display:inline-block;
		margin-right: 6px;
	}
	.ratings-tip .arrive-time{
		vertical-align: middle;
		display:inline-block;
		font-size: 10px;
		color:rgb(147,153,157);
		line-height: 12px;
	}
	.detail-item .ratings-text{
		font-size: 12px;
		line-height: 18px;
		color:rgb(7,17,27);
		margin-bottom: 8px;
	}
	.recommend .iconfont{
		font-size: 12px;
		line-height: 16px;
	}
	.recommend .icon-thumb_up{
		color:rgb(0,160,220);
	}
	.recommend .icon-thumb_down{
		color:rgb(183,189,193);
	}
	.recommend .recommend-item{
		font-size: 9px;
		line-height: 16px;
		display:inline-block;
		color:rgb(147,153,157);
		border-radius: 2px;
		margin-right: 8px;
		margin-bottom: 4px;
		padding:0 6px;
		border:1px solid rgba(7,17,27,.1);
	}
</style>