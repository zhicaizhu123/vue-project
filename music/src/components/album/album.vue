<template>
	<div class="album-main">
		<transition name="action-animation">
			<action v-if="actionShow" :parent-page="'rankPage'" :song-list="songList"></action>
		</transition>
		<div class="header-bar">
			<div class="header-title" @click="back">
				<div class="back-icon">
					<img src="../../assets/icon-back.svg">
				</div>
				<div class="back-text">
					专辑
				</div>
			</div>
		</div>
		<div id="albumWrap" class="album-container">
			<div class="album-wrap" v-if="album!=null">
				<div class="play-list-info">
					<img :src="albumImgUrl" alt="">
					<div class="info-content">
						<p>
							{{album.name}} <span class="small-text">-{{album.singername}}</span>
						</p>
						<p class="small-text">
							{{album.list.length}}首歌曲
						</p>
						<p class="small-text">
							{{album.genre}}&nbsp;&nbsp;{{album.lan}}
						</p>
						<p class="small-text">
							发行时间:{{album.aDate}}
						</p>
						<p class="small-text">
							唱片公司:{{album.company}}
						</p>
					</div>
				</div>
				<div class="music-list">
					<ul>
						<li class="music-list-item" v-for="(song, index) in album.list">
							<div class="music-info" @click="play(index)">
								<div class="music-name">
									{{song.songorig}}
								</div>
								<div class="music-author">
									<span v-for="singer in song.singer">{{singer.name}}</span>
	                				<span>{{song.albumdesc}}</span>
								</div>
							</div>
							<div class="action-button" @click="showAction(index)">
								<img src="../../assets/icon-...black.png" alt="">
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import BScroll from 'better-scroll';
	import action from '../action/action';
	export default {
		props: ['mid'],
		data() {
			return {
				album: null,
				actionShow: false,
				songList: {}
			};
		},
		computed: {
			albumImgUrl() {
				return 'http://y.gtimg.cn/music/photo_new/T002R300x300M000' + this.mid + '.jpg?max_age=2592000';
			}
		},
		created() {
			this.$http.jsonp('http://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg', {
				params: {
					albummid: this.mid,
					g_tk: 5381,
					loginUin: 0,
					hostUin: 0,
					format: 'jsonp',
					inCharset: 'utf8',
					outCharset: 'utf-8',
					notice: 0,
					platform: 'yqq',
					needNewCode: 0
				},
				jsonp: 'jsonpCallback'
			}).then((response) => {
				this.album = response.data.data;
				this.$nextTick(() => {
					console.log(this.album);
					if (!this.albumScroll) {
						this.albumScroll = new BScroll(document.getElementById('albumWrap'), {
							click: true
						});
					} else {
						this.albumScroll.refresh();
					}
				});
			});
		},
		methods: {
			back() {
				this.$parent.albumShow = false;
				this.album = null;
			},
			play(index) {
				var list = [];
				this.album.list.forEach(item => {
					list.push({
						id: item.songid,
						mid: item.songmid,
						name: item.songorig,
						singer: item.singer
					});
				});
				this.$store.commit('setPlayList', {
					index: index,
					list: list
				});
				this.$store.commit('play');
			},
			showAction(num) {
				this.actionIndex = num;
				let theSongList = this.album.list[num];
				console.log(theSongList);
				this.songList = {
					songid: theSongList.songid,
					songmid: theSongList.songmid,
					songorig: theSongList.songorig,
					singer: theSongList.singer
				};
				this.$nextTick(() => {
					this.actionShow = true;
				});
			}
		},
		components: {
			action
		}
	};
</script>
<style>
	.header-bar{
		background-color: #fff;
		z-index: 10;
	}
	.album-main{
		position: fixed;
		left: 0;
		top:0;
		bottom: 50px;
		width:100%;
	}
	.album-container{
		background-color: #fff;
		position: absolute;
		left:0;
		top:50px;
		bottom:0;
		width:100%;
		overflow: hidden;
	}
	.play-list-info{
		display: flex;
		height: 110px;
		padding-left:15px;
		padding-bottom: 10px;
		border-bottom: 1px solid #eee;
	}
	.play-list-info img{
		height: 110px;
		width: 110px;
	}
	.play-list-info .info-content{
		padding-left:5px;
	}
	.info-content .small-text{
		line-height: 18px;
    	font-size: 12px;
    	color: #8f8f8f;
	}
	.music-list .music-list-item{
		display: flex;
		padding:5px 10px;
		border-bottom: 1px solid #eee;
	}
	.music-list .music-list-item:last-child{
		border:none;
	}
	.music-list-item .music-info{
		flex:1;
		display: flex;
		flex-direction:column;
		overflow: hidden;
	}
	.music-list-item .music-name,
	.music-list-item .music-author{
		line-height: 20px;
	    margin-right: 20px;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	    overflow: hidden;
	}
	.music-list-item .music-author{
	    color: #8f8f8f;
	    font-size: 12px;
	}
	.action-animation-enter-active,.action-animation-leave-active{
		transition:all .3s;
		opacity: 1;
	}
	.action-animation-enter,.action-animation-leave-active{
		transform:translateY(100%);
		opacity: 0;
	}
</style>