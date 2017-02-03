<template>
	<div class="play-bar">
		<audio id="music" :src="dataUrl" autoplay @ended="playContinue"></audio>
		<div class="bar-img">
			<img :src="coverImgUrl" alt="">
		</div>
		<span class="song-name">{{song.name}}</span>
		<img class="control" :src="playing?iconPause:iconPlay" alt="" @click="controlMusic">
	</div>
</template>
<script>
	import {mapState, mapMutations} from 'vuex';
	import iconPause from 'assets/icon-pause.png';
	import iconPlay from 'assets/icon-play.png';
	export default {
		data() {
			return {
				iconPause,
				iconPlay
			};
		},
		computed: {
			...mapState({
				dataUrl(state) {
					return 'http://ws.stream.qqmusic.qq.com/' + state.song.id + '.m4a?fromtag=46';
				}
			}),
			...mapState([
				'playing', 'song', 'coverImgUrl'
			])
		},
		methods: {
			...mapMutations(
				['play', 'pause']
			),
			controlMusic() {
				this.playing ? this.pause() : this.play();
			}
		},
		watch: {
			playing: function (val) {
				if (val) {
					document.getElementById('music').play();
				} else {
					document.getElementById('music').pause();
				}
			}
		}
	};
</script>
<style>
	.play-bar{
		display: flex;
		width:100%;
		height: 50px;
		position: absolute;
		left: 0;
		bottom: 0;
		background-color: #f9f9f9;
		align-items:center;
		justify-content:center;
	}
	.bar-img{
		width:37.5px;
		height: 37.5px;
		overflow: hidden;
		padding-left:15px;
	}
	.bar-img img{
		width:100%;
		height: 100%;
		border-radius: 4px;
	}
	.song-name{
		display: block;
		flex:1;
		padding-left:10px;
	}
	.play-bar .control{
		width:20px;
		height: 20px;
		padding-right:16px;
	}
</style>