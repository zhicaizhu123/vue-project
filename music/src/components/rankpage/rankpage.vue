<template>
	<div id="rankpage" class="rank-page" v-cloak>
		<action v-if="actionShow" :action-index="actionIndex" :parent-page="'rankPage'" :song-list="songlist"></action>
		
		<div class="rank-page-content">
			<div id="singer-header" class="singer-header" v-if="topListData!=null">
				<div class="header-blank">
					
				</div>
				<div class="singer-wrap" :style="{background:gradientcolor}">
					<div class="singer-info" :class="{dark:isDark}">
						<p class="singer-name">{{topListData.topinfo.ListName}}</p>
						<p class="singer-listener">{{topListData.topinfo.listennum | wan}}</p>
					</div>
					<div class="play-button">
						
					</div>
				</div>
			</div>
			<div class="list" v-if="topListData!=null" :style="{background:color}">
				<ul>
					<li v-for="(item,index) in topListData.songlist">
						<div class="music-index" :class="{dark:isDark}">
							{{index+1}}
						</div>
						<div class="music-info" @click="play(index)">
							<div class="music-name" :class="{dark:isDark}">
								{{item.data.songorig}}
							</div>
							<div class="music-singer">
								<span v-for="singername in item.data.singer">{{singername.name}} - </span>
	          					<span>{{item.data.albumname}}</span>
							</div>
						</div>
						<div class="more-icon" @click="showAction(index)">
							<img src="../../assets/icon-...black.png" alt="">
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="singer-photo">
	      <img :src="imgurl" alt="">
	    </div>
		<div class="header-bar" :style="{background:background}" :class="{dark:isDark}">
			<div class="header-title" @click="back">
				<div class="back-icon">
					<img src="../../assets/icon-back.svg" v-if="!isDark">
          			<img src="../../assets/icon-back-white.svg" v-if="isDark">
				</div>
				<div class="back-text">
					排行榜
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import BScroll from 'better-scroll';
	import {mapState} from 'vuex';
	import action from '../action/action';
	export default {
		data() {
			return {
				topListData: null,
				opacity: 0,
				actionShow: false,
				actionIndex: 0,
				songlist: {}
			};
		},
		computed: {
			...mapState([
				'rankid'
			]),
			imgurl: function () {
				if (this.topListData !== null) {
					return this.topListData.topinfo.pic_album;
				}
			},
			color: function () {
				if (this.topListData !== null) {
					var fixed = '00000' + this.topListData.color.toString(16);
					return '#' + fixed.substr(fixed.length - 6);
				} else {
					return '#ffffff';
				}
			},
			gradientcolor: function () {
				return '-webkit-linear-gradient(top, rgba(' + this.r + ',' + this.g + ',' + this.b + ', 0), ' + this.color + ')';
			},
			isDark: function () {
				var grayLevel = this.r * 0.299 + this.g * 0.587 + this.b * 0.114;
				return (grayLevel < 192);
			},
			background: function () {
				return 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.opacity + ')';
			},
			r: function () {
				return parseInt(this.color.slice(1, 3), 16);
			},
			g: function () {
				return parseInt(this.color.slice(3, 5), 16);
			},
			b: function () {
				return parseInt(this.color.slice(5, 7), 16);
			}
		},
		methods: {
			back() {
				this.$parent.rankPageShow = false;
			},
			play(index) {
				var list = [];
				this.topListData.songlist.forEach(item => {
					list.push({
						id: item.data.songid,
						mid: item.data.songmid,
						name: item.data.songorig,
						singer: item.data.singer
					});
				});
				this.$store.commit('setPlayList', { // 执行
					index: index,
					list: list
				});
				this.$store.commit('play');
			},
			showAction(num) {
				this.actionIndex = num;
				this.songlist = this.topListData.songlist[num].data;
				this.$nextTick(() => {
					this.actionShow = true;
				});
			}
		},
		created: function () {
			this.$http.jsonp('http://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg', {
				params: {
					g_tk: 5381,
					uin: 0,
					format: 'json',
					inCharset: 'utf-8',
					outCharset: 'utf-8',
					notice: 0,
					platform: 'h5',
					needNewCode: 1,
					tpl: 3,
					page: 'detail',
					type: 'top',
					topid: this.rankid,
					_: new Date().getTime()
				},
			jsonp: 'jsonpCallback'
			}).then((response) => {
				this.topListData = response.data;
				console.log(this.topListData);
				this.$nextTick(() => {
					if (!this.rankPageScroll) {
						this.rankPageScroll = new BScroll(document.getElementById('rankpage'), {
							click: true
						});
					} else {
						this.rankPageScroll.refresh();
					}
				});
			});
		},
		filters: {
			wan(val) {
				return Math.round(val / 1000) / 10 + '万';
			}
		},
		components: {
			action
		}
	};
</script>
<style>
	[v-cloak] {
  		display: none;
	}
	.rank-page{
		position: absolute;
		left:0;
		top:0;
		bottom: 50px;
		background-color: #fff;
		width:100%;
		z-index: 5;
		overflow: hidden;
	}
	.singer-photo{
		position: fixed;
		width:100%;
		left: 0;
		top:0;
		z-index: -1;
	}
	.singer-photo img{
		width: 100%;
		height: 100vw;
	}
	.header-bar{
		height: 50px;
		position: fixed;
		left:0;
		top:0;
		z-index: 2;
		width:100%;
	}
	.header-title{
		height: 25px;
		padding:12.5px;
		line-height: 25px;
	}
	.header-title .back-icon{
		width:25px;
		height: 25px;
		float: left;
	}
	.header-title .back-icon img{
		width:25px;
	}
	.header-title .back-text{
		float: left;
	}
	.singer-header{
		width:100%;
		height: 100vw;
		display: flex;
		flex-direction: column;
    	justify-content: space-between;
	}
	.singer-wrap {
		display: flex;
		justify-content:space-between;
		padding:10px;
		line-height: 1.2;
	}
	.singer-info .singer-name{
		font-size: 24px;
		font-weight: bold;
	}
	.list{
		border-top:1px solid rgba(255, 255, 255, .15);
	}
	.list li{
		display: flex;
		justify-content:center;
		align-items:center;
		height: 60px;
		margin-left: 44px;
		border-bottom: 1px solid rgba(255, 255, 255, .15);
	}
	.list li:last-child{
		border-bottom: none;
	}
	.list ul{
		padding-left:10px;
	}
	.list li .music-index{
		width:50px;
		text-align: center;
		margin-left: -50px;
	}
	.list li .music-info{
	    display: flex;
	    flex-direction: column;
	    flex: 1;
	    overflow: hidden;
	}
	.list li .more-icon{
		width:25px;
		height: 25px;
		margin-right: 10px;
	}
	.list .more-icon img{
		width:25px;
	}
	.music-name,.music-singer{
		line-height: 22px;
		text-overflow: ellipsis;
	    overflow: hidden;
	    white-space: nowrap;
	}
	.music-singer{
		font-size: 14px;
		color:#aaa;
	}
	.dark {
	    color: #fff !important;
	}
</style>