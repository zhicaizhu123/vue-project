<template>
	<div class="search-wrap">
		<transition name="action-animation">
			<action v-if="actionShow" :parent-page="'rankPage'" :song-list="songList"></action>
		</transition>
		<div class="search">
			<div class="search-input">
				<img src="./../../assets/icon-search.png" alt="">
				<form @submit.prevent="search(key)">
					<input type="text" placeholder="搜索 歌曲/歌手/专辑" @focus="focus" v-model="key">
				</form>
			</div>
			<div class="search-cancel" :class="{'search-cancel-show' : searchShow}" @click="hideSearchCancel">取消</div>
		</div>
		<div class="hot-search" v-if="searchResult==null&&searchShow">
			<div class="search-history">
				<div class="history-item" v-for="item in historyList" @click="search(item)">
					{{item}}
				</div>
			</div>
			<ul class="hot-key-list">
				<li v-for="(item, index) in hotKeyList" @click="search(item.k)">
					<div class="hot-key-index">
						{{index + 1}}
					</div>
					<div class="hot-key-name">
						{{item.k}}
					</div>
					<div class="hot-key-listener">
						{{item.n | wan}}
					</div>
				</li>
			</ul>
		</div>
		<div id="resultContainer" class="result-container" v-if="searchResult!=null&&searchShow">
			<div class="result">
				<div class="result-group" v-if="searchResult.song">
					<div class="group-title">
						<img src="../../assets/icon-music.png" alt="">
						<span class="title-text">单曲</span>
					</div>
					<div class="group-item" v-for="(item, index) in searchResult.song.itemlist">
						<span class="result-song" @click="play(index)">{{item.name}}</span>
						<span class="result-singer" @click="play(index)">-{{item.singer}}</span>
						<div class="action-button" @click="showAction(index)">
							<img src="../../assets/icon-...black.png" alt="">
						</div>
					</div>
				</div>
				<div class="result-group" v-if="searchResult.album">
					<div class="group-title">
						<img src="../../assets/icon-album.png" alt="">
						<span class="title-text">专辑</span>
					</div>
					<div class="album-item" v-for="item in searchResult.album.itemlist" @click="showAlbum(item.mid)">
						<img class="album-img" :src="item.pic">
						<div class="album-info">
				            <p class="album-name">{{item.name}}</p>
				            <p class="album-author">{{item.singer}}</p>
				        </div>
					</div>
				</div>
				<!-- <div class="result-group" v-if="searchResult.singer">
					<div class="group-title">
						<img src="../../assets/icon-singer.png" alt="">
						<span class="title-text">歌手</span>
					</div>
					<div class="singer-item" v-for="item in searchResult.singer.itemlist">
			          <img class="singer-img" v-bind:src="item.pic">
			          <div class="singer-p">
			            <p>{{item.name}}</p>
			          </div>
			        </div>
				</div> -->
			</div>
		</div>
		<transition name="album-slide">
			<album v-if="albumShow" :mid="mid"></album>
		</transition>
		
	</div>
</template>
<script>
	import BScroll from 'better-scroll';
	import album from '../album/album';
	import action from '../action/action';
	export default {
		data() {
			return {
				key: '',
				searchShow: false,
				historyList: [],
				hotKeyList: null,
				searchResult: null,
				albumShow: false,
				mid: 0,
				actionShow: false,
				songList: {}
			};
		},
		created() {
			if (window.localStorage.historyList) {
				this.historyList = JSON.parse(window.localStorage.historyList);
			}
			this.$http.jsonp('http://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg', {
				params: {
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
				this.hotKeyList = response.data.data.hotkey.slice(0, 5);
			});
		},
		// watch: {
		// 	searchResult: function(val, old) {
		// 		this.$nextTick(() => {
		// 			if (!this.searchScroll) {
		// 				this.searchScroll = new BScroll(document.getElementById('resultContainer'), {
		// 					click: true
		// 				});
		// 			} else {
		// 				console.log('haha');
		// 				this.searchScroll.refresh();
		// 			}
		// 		});
		// 	}
		// },
		methods: {
			focus() {
				this.searchShow = true;
				this.$emit('showSearchCancel');
			},
			hideSearchCancel() {
				this.searchShow = false;
				this.key = '';
				this.searchResult = null;
				this.$emit('hideSearchCancel');
			},
			search(key) {
				this.key = key;
				this.$http.jsonp('http://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg', {
					params: {
						is_xml: 0,
						format: 'jsonp',
						key: key,
						g_tk: 5381,
						loginUin: 0,
						hostUin: 0,
						inCharset: 'utf8',
						outCharset: 'utf-8',
						notice: 0,
						platform: 'yqq',
						needNewCode: 0
					},
					jsonp: 'jsonpCallback'
				}).then((response) => {
					this.searchResult = response.data.data;
					var index = this.historyList.indexOf(key);
					if (index !== -1) {
						this.historyList.splice(index, 1);
					}
					this.historyList.unshift(key);
					this.historyList = this.historyList.slice(0, 10);
					window.localStorage.historyList = JSON.stringify(this.historyList);
					this.$nextTick(() => {
						if (!this.searchScroll) {
							this.searchScroll = new BScroll(document.getElementById('resultContainer'), {
								click: true
							});
						} else {
							this.searchScroll.refresh();
						}
					});
				});
			},
			play(index) {
				let list = [...this.searchResult.song.itemlist];
				this.$store.commit('setPlayList', {
					index: index,
					list: list
				});
			},
			showAlbum(mid) {
				this.albumShow = true;
				this.mid = mid;
			},
			showAction(num) {
				this.actionIndex = num;
				let theSongList = this.searchResult.song.itemlist[num];
				this.songList = {
					songid: theSongList.id,
					songmid: theSongList.mid,
					songorig: theSongList.name,
					singer: theSongList.singer
				};
				this.$nextTick(() => {
					this.actionShow = true;
				});
			}
		},
		filters: {
			wan(val) {
				return Math.round(val / 1000) / 10 + '万';
			}
		},
		components: {
			album,
			action
		}
	};
</script>
<style>
	.search-wrap{
		height: 60px;
		background-color: #fff;
	}
	.search{
		display: flex;
	}
	.search-input{
		margin:10px;
		border-radius: 4px;
		background-color: #eee;
		width:100%;
		flex:1;
		display: flex;
		justify-content:center;
		align-items:center;
		overflow: hidden;
	}
	.search-input img{
		width:30px;
		height: 30px;
		display: inline-block;
		margin:0 5px;
	}
	.search-input form{
		flex:1;
		height: 100%;
		width:100%;
	}
	.search-input form input{
		width:100%;
		height: 100%;
		background-color: #eee;
		border:none;
		outline: none;
		flex:1;
	}
	.search-cancel {
	    height: 40px;
	    width: 0px;
	    margin: 10px auto;
	    line-height: 40px;
	    overflow: hidden;
	    transition: width 0.3s;
	}
  	.search-cancel-show {
    	width: 55px;
  	}
  	.hot-key-list{
  		padding:0 10px;
  		background-color: #fff;
  	}
  	.hot-key-list li{
  		display: flex;
  		height: 40px;
  		align-items:center;
  	}
  	.hot-key-index{
  		padding-right:16px;
  	}
  	.hot-key-name{
  		flex:1;
  	}
  	.hot-key-listener{
  		padding-left: 15px;
  	}
  	.search-history{
  		display: flex;
  		flex-wrap:wrap;
  		background-color: #fff;
  		padding:0 10px;
  		max-height: 66px;
  		overflow: hidden;
  	}
  	.history-item{
  		margin:5px;
  		padding:3px 5px;
  		border-radius: 14px;
  		border:1px solid #333;
  	}
  	.result-container{
  		position: absolute;
  		top:60px;
  		bottom: 50px;
  		left:0;
  		width:100%;
  		overflow: hidden;
  	}
  	.result-group{
  		background-color: #fff;
  	}
  	.group-title{
  		display: flex;
  		background-color: #eee;
  		height: 40px;
  		align-items:flex-end;
  		padding-left:10px;
  		padding-bottom: 5px;
  	}
  	.group-title img{
  		width:25px;
  		height: 25px;
  	}
  	.group-title .title-text{
  		margin-left:10px;
  	}
  	.group-item{
  		display: flex;
  		height: 40px;
  		margin-left: 10px;
  		padding-left:10px;
  		border-bottom:1px solid #eee;
  		align-items:center;
  	}
  	.group-item .result-song,
  	.group-item .result-singer{
  		text-overflow:ellipsis;
		overflow: hidden;
		white-space: nowrap;
  	}
  	.group-item .result-singer{
		flex:1;
		color:#929292;
  	}
  	.action-button{
  		width:20px;
  		height: 20px;
  		padding:10px;
  	}
  	.action-button img{
  		width:20px;
  	}
  	.album-item{
  		display: flex;
  		height: 40px;
  		padding:10px;
  		align-items:center;
  		border-bottom: 1px solid #eee;
  	}
  	.album-item:last-child{
  		border:none;
  	}
  	.album-item img{
  		width:40px;
  		height: 40px;
  		border-radius: 4px;
  	}
  	.album-item .album-info{
		padding-left:15px;
  	}
  	.album-item .album-info p{
  		text-overflow:ellipsis;
  		overflow: hidden;
  		white-space: nowrap;
  	}
  	.album-info .album-name{
  		font-size: 14px;
  		line-height: 20px;
  	}
  	.album-info .album-author{
  		font-size: 12px;
  		line-height: 20px;
  		color:#929292;
  	}
  	.singer-item{
  		display: flex;
  		height: 40px;
  		padding:5px 10px;
  		align-items:center;
  	}
  	.singer-item img{
  		width:40px;
  		height: 40px;
  		border-radius: 50%;
  	}
  	.singer-item .singer-p{
  		padding-left:10px;
  	}
  	.album-slide-enter-active, .album-slide-leave-active {
	  transition: all .3s
	}
	.album-slide-enter, .album-slide-leave-active {
	  transform:translateX(100%);
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