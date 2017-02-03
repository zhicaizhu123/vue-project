<template>
	<div class="play-page">
		<div class="album" @click="hidePlayPage">
			<div class="play-page-hide">
				<img src="../../assets/icon-jiantou.png" alt="">
			</div>
			<img class="album-img" :src="coverImgUrl" alt="">
		</div>
		<div class="button-group">
			<div class="progress-bar">
				
			</div>
			<div class="music-info">
				<p class="song-name">{{song.name}}</p>
				<p class="song-singer">{{song.singer}}</p>
			</div>
			<div class="music-control">
				<ul>
					<li>
						<img src="../../assets/icon-like.png" alt="">
					</li>
					<li>
						<img src="../../assets/icon-shangyiqu.png" alt="">
					</li>
					<li>
						<img :src="playing?$parent.iconPause:$parent.iconPlay" @click="$parent.controlMusic" alt="">
					</li>
					<li>
						<img src="../../assets/icon-xiayiqu.png" alt="">
					</li>
					<li>
						<img src="../../assets/icon-list.png" alt="">
					</li>
				</ul>
			</div>
			<div class="vol-bar">
				<div class="volue-icon volue-left">
					<img src="../../assets/icon-volue-left.png" alt="">
				</div>
				<div class="vol-bar-line">
					<div class="vol-line">
						<span class="current-vol"></span>
						<span class="vol-button"></span>
					</div>
				</div>
				<div class="volue-icon volue-right">
					<img src="../../assets/icon-volue-right.png" alt="">
				</div>
			</div>
			<div class="other-button">
				<ul>
					<li>
						<img src="../../assets/icon-share.png">
					</li>
			        <li>
			        	<img src="../../assets/icon-suiji.png">
			        </li>
			        <li>
			        	<img src="../../assets/icon-xunhuan.png">
			        </li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	import {mapState} from 'vuex';
	export default {
		data() {
			return {
				
			};
		},
		computed: {
			...mapState([
				'coverImgUrl', 'song', 'playing'
			])
		},
		methods: {
			hidePlayPage() {
				this.$parent.playPageShow = false;
			}
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
	.button-group .progress-bar,
	.button-group .music-info,
	.button-group .music-control,
	.button-group .vol-bar,
	.button-group .other-button{
		height: 20%;
		min-height: 35px;
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
	}
	.vol-bar .volue-right{
		justify-content:flex-start;
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
		width:20%;
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
		left:20%;
		top:-6.5px;
	}
</style>