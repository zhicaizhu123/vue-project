<template>
	<div class="rank-wrap">
		<ul class="rank-list">
			<li class="rank-item" v-for="item in toplist" @click="getID(item.id)">
				<div class="rank-img">
					<img :src="item.picUrl" alt="">
					<span class="listen-num">
						{{item.listenCount | wan}}
					</span>
				</div>
				<div class="rank-info">
					<div class="top-title">
						{{item.topTitle}}
					</div>
					<p class="top-song" v-for="(song,index) in item.songList">
						{{index + 1}} {{song.songname}}-<span class="singer-name">{{song.singername}}</span>
					</p>
				</div>
			</li>
		</ul>	
	</div>
</template>
<script>
	import BScroll from 'better-scroll';
	import {mapMutations} from 'vuex';
	export default {
		data() {
			return {
				toplist: null
			};
		},
		created() {
			this.$http.jsonp('http://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg', {
				params: {
					format: 'jsonp',
					g_tk: 5381,
					uin: 0,
					inCharset: 'utf-8',
					outCharset: 'utf-8',
					notice: 0,
					platform: 'h5',
					needNewCode: 1,
					_: new Date().getTime()
				},
				jsonp: 'jsonpCallback'
			}).then((response) => {
				this.toplist = response.data.data.topList;
				console.log(this.toplist[0]);
				this.$nextTick(() => {
					if (!this.rankScroll) {
						this.rankScroll = new BScroll(document.getElementsByClassName('rank-wrap')[0], {
							click: true
						});
					} else {
						this.rankScroll.refresh();
					}
				});
			});
		},
		methods: {
			...mapMutations([
				'setID'
			]),
			getID(id) {
				this.setID(id);
				this.$parent.rankPageShow = true;
			}
		},
		filters: {
			wan(val) {
				return Math.round(val / 1000) / 10 + '万';
			}
		}
	};
</script>
<style>
	.rank-wrap{
		position: absolute;
		top:60px;
		left: 0;
		bottom: 50px;
		width:100%;
		overflow: hidden;
	}
	.rank-list{
		padding:10px;
	}
	.rank-item{
		margin-bottom:10px;
		border-radius: 4px;
		display: flex;
		overflow: hidden;
		background-color: #fff;
	}
	.rank-item:last-child{
		margin-bottom: 0;
	}
	.rank-item .rank-img{
		position: relative;
		width:100px;
		height: 100px
	}
	.rank-img img{
		width:100%;
		height: 100%;
	}
	.rank-img .listen-num{
		position: absolute;
		bottom:6px;
		left:6px;
		color:#fff;
		z-index: 1;
		font-size: 12px
	}
	.rank-item .rank-info{
		flex:1;
		padding:5px 10px;
		display: flex;
		justify-content:space-around;
		flex-direction:column;
		overflow: hidden;
	}
	.rank-info .top-title{
		overflow: hidden;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	}
	.rank-info .top-song{
		font-size: 14px;
		overflow: hidden;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	    word-break:break-all;
	    width:100%;
	}
	.top-song .singer-name{
		color:#999;
	}
</style>