<template>
	<div class="play-page">
		<transition name="playlist-slide">
			<playlist v-if="playingListShow"></playlist>
		</transition>
		<div class="album" @click="hidePlayPage">
			<div class="play-page-hide">
				<img src="../../assets/icon-jiantou.png" alt="">
			</div>
			<img class="album-img" :src="coverImgUrl" alt="">
		</div>
		<div class="button-group">
			<div class="progress-bar">
		        <div class="progress-bar-line">
		          <div class="progress" v-bind:style="{width:indicatorPosition+'%'}"></div>
		          <div class="indicator" v-bind:style="{left:indicatorPosition+'%'}" @touchmove.stop.prevent="changeProgress"></div>
		        </div>
		        <div class="time-indicator">
					<span>{{currentTime}}</span>
          			<span>{{duration}}</span>
		        </div>
	      	</div>
			<div class="music-info">
				<p class="song-name">{{song.name}}</p>
				<p class="song-singer">{{song.singer | singer}}</p>
			</div>
			<div class="music-control">
				<ul>
					<li @click="setLike">
						<img :src="isLike ? likeActive : noLike" alt="">
					</li>
					<li @click="playFront">
						<img src="../../assets/icon-shangyiqu.png" alt="">
					</li>
					<li @click="$parent.controlMusic">
						<img :src="playing?$parent.iconPause:$parent.iconPlay" alt="">
					</li>
					<li @click="playNext">
						<img src="../../assets/icon-xiayiqu.png" alt="">
					</li>
					<li @click="showPlayListPage">
						<img src="../../assets/icon-list.png" alt="">
					</li>
				</ul>
			</div>
			<div class="vol-bar">
				<div class="volue-icon volue-left" @click="setExtreme(false)">
					<img src="../../assets/icon-volue-left.png" alt="">
				</div>
				<div class="vol-bar-line">
					<div id="volLine" class="vol-line" ref="volLine">
						<span id="currentVol" class="current-vol" :style="{'width': volPosition + '%'}"></span>
						<span class="vol-button" :style="{'left': volPosition + '%'}" @touchmove.stop.prevent="changeVol"></span>
					</div>
				</div>
				<div class="volue-icon volue-right" @click="setExtreme(true)">
					<img src="../../assets/icon-volue-right.png" alt="">
				</div>
			</div>
			<div class="other-button">
				<ul>
					<li>
						<img src="../../assets/icon-danqu.png" @click="changePlayMode(0)">
					</li>
			        <li>
			        	<img src="../../assets/icon-suiji.png" @click="changePlayMode(2)">
			        </li>
			        <li>
			        	<img src="../../assets/icon-xunhuan.png" @click="changePlayMode(1)">
			        </li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	import {mapState, mapMutations, mapGetters} from 'vuex';
	import {getLocalStorage, setLocalStorage} from '../../common/js/store';
	import playlist from '../playlist/playlist';
	import noLike from 'assets/icon-like.png';
	import likeActive from 'assets/icon-like-active.png';
	export default {
		props: ['songid'],
		data() {
			return {
				playingListShow: false,
				noLike,
				likeActive,
				isLike: (() => {
					return getLocalStorage(this.songid, 'like');
				})()
			};
		},
		computed: {
			...mapState([
				'coverImgUrl', 'song', 'playing'
			]),
			...mapGetters([
				'currentTime', 'duration'
			]),
			...mapState({
				indicatorPosition (state) {
					return state.currentTime / state.duration * 100;
				},
				volPosition (state) {
					return state.volume * 100;
				}
			})
		},
		watch: {
			song: function(val, old) {
				if (val.id !== old.id) {
					this.isLike = (() => {
						return getLocalStorage(val.id, 'like');
					})();
				}
			}
		},
		methods: {
			...mapMutations([
				'playNext', 'playFront', 'changePlayMode'
			]),
			hidePlayPage() {
				this.$parent.playPageShow = false;
			},
			showPlayListPage() {
				this.playingListShow = true;
			},
			setLike() {
				this.isLike = !this.isLike;
				setLocalStorage(this.song.id, 'like', this.isLike);
			},
			changeProgress(event) {
				var clientX = event.changedTouches[0].clientX;
				var fullWidth = window.innerWidth;
				var proportion = clientX / fullWidth;
				var allTime = this.$store.state.duration;
				var currentTime = Math.round(allTime * proportion);
				this.$parent.changeTime(currentTime);
			},
			changeVol(event) {
				// console.log(event);
				var clientX = event.changedTouches[0].clientX;
				var windowWidth = window.innerWidth;
				var fullWidth = this.$refs.volLine.getBoundingClientRect().width;
				var offsetWidth = Math.floor((windowWidth - fullWidth) / 2);
				var proportion = (clientX - offsetWidth) / fullWidth;
				if (proportion < 0) {
					proportion = 0;
				} else if (proportion > 1) {
					proportion = 1;
				}
				this.$parent.changeVol(proportion);
			},
			setExtreme(bool) {
				bool ? this.$parent.changeVol(1) : this.$parent.changeVol(0);
			}

		},
		filters: {
			singer(val) {
				if (typeof val === 'string') {
					return val;
				} else if (val instanceof Array) {
					var str = '';
					val.forEach((item) => {
						str = str + item.name + ' ';
					});
					return str;
				}
			}
		},
		components: {
			playlist
		}
	};
</script>
<style>
	.play-page{
		position: absolute;
		left:0;
		top:0;
		width:100%;
		height: 100%;
		z-index: 10;
		background-color: #EEEEEE;
	}
	.play-page .album{
		width: 100%;
	    height: 100vw;
	    max-height: 68vh;
	}
	.play-page .album .album-img{
		width:100%;
		height: auto;
	}
	.play-page .play-page-hide{
		height: 25px;
		width: 25px;
		background-color: rgba(256,256,256,.8);
		border-radius: 50%;
		position: absolute;
		left:14px;
		top:24px;
		z-index: 1;
		display: flex;
		justify-content:center;
		align-items:center;

	}
	.play-page .play-page-hide img{
		height: 12px;
		width:12px;
		display: inline-block;
	}
	.button-group{
		position: absolute;
		width:100%;
		left:0;
		top:100vw;
		bottom:0;
	}
	.button-group .music-info,
	.button-group .music-control,
	.button-group .vol-bar,
	.button-group .other-button{
		height: 20%;
	}
	.button-group .progress-bar{
		height: 16%;
		min-height: 35px;
	}
	.progress-bar .progress-bar-line{
		height: 5px;
		background-color: #ccc;
		position: relative;
		margin-top: 2%;
	}
	.progress-bar-line .progress{
		height: 100%;
		background-color: #999;
	}
	.progress-bar-line .indicator{
		display: block;
	    width: 12px;
	    height: 12px;
	    background-color: #fff;
	    border-radius: 50%;
	    box-shadow: 0 2px 2px #ccc;
	    position: absolute;
	    top: -4px;
	}
	.progress-bar .time-indicator{
		display: flex;
		justify-content:space-between;
		padding:10px;
		line-height: 16px;
		font-size: 12px;
	}
	.music-info p{
		text-align: center;
		line-height: 1.5;
	}
	.music-info .song-name{
		font-size: 18px;
		font-weight: 700;
	}
	.music-info .song-singer{
		font-size: 12px;
		color:#8f8f8f;
	}
	.music-control ul,
	.other-button ul{
		display: flex;
		height: 100%;
	}
	.music-control li,
	.other-button li{
		flex:1;
		display: flex;
		justify-content:center;
		align-items:center;
	}
	.music-control li img{
		width:35px;
	}
	.other-button li img{
		width:20px;
	}
	.vol-bar{
		display: flex;
	}
	.vol-bar .volue-icon{
		width:15%;
		height: 100%;
		display: flex;
		align-items:center;
	}
	.vol-bar .volue-icon img{
		width:20px;
	}
	.vol-bar .volue-left{
		justify-content:flex-end;
		padding-right:6px;
	}
	.vol-bar .volue-right{
		justify-content:flex-start;
		padding-left:16px;
	}
	.vol-bar .vol-bar-line{
		width:70%;
		position: relative;
	}
	.vol-bar-line .vol-line{
		width:100%;
		height: 3px;
		background-color: #ccc;
		position: absolute;
    	top: 50%;
    	margin-top: -1.5px;
	}
	.vol-line .current-vol{
		display: block;
		height: 100%;
		background-color: #7f7f7f;
	}
	.vol-line .vol-button{
		display: block;
		width:15px;
		height: 15px;
		background-color: #fff;
		border-radius: 50%;
		box-shadow: 0 2px 2px #ccc;
		position: absolute;
		top:-6.5px;
	}
	.playlist-slide-enter-active, .playlist-slide-leave-active {
	    transition: all .3s linear;
	}
	.playlist-slide-enter, .playlist-slide-leave-active {
	    transform:translateY(100%);
	}
</style>