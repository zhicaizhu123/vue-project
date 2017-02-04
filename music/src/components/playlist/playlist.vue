<template>
	<div class="play-list-container">
		<div class="play-list-header">
			<img src="../../assets/icon-xunhuan.png" alt="">
			<div class="play-mode">顺序播放 {{playList.length}}首歌曲</div>
			<div class="finish" @click="finish">完成</div>
		</div>
		<div id="playlistWrap" class="play-list-wrap">
			<div class="play-list">
				<div class="music-list">
					<ul>
						<li class="play-list-item" v-for="(item, num) in playList">
							<div class="list-item-content" @click="play(num)">
								<div class="play-list-name">
									{{item.name}} - {{item.singer | singer}}
								</div>
								<img class="music-playing" src="../../assets/icon-playing.svg" alt="正在播放" v-show="index==num">
							</div>
							<div class="action-button">
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
	import {mapState} from 'vuex';
	import BScroll from 'better-scroll';
	export default {
		data() {
			return {

			};
		},
		computed: {
			...mapState([
				'playList', 'index'
			])
		},
		methods: {
			finish() {
				this.$parent.playingListShow = false;
			},
			play: function (index) {
				this.$store.commit('playIndex', index);
			}
		},
		mounted() {
			if (!this.playlistScroll) {
				this.playlistScroll = new BScroll(document.getElementById('playlistWrap'), {
					click: true
				});
			} else {
				this.playlistScroll.refresh();
			}
		},
		filters: {
			singer(val) {
				if (typeof val === 'string') {
					return val;
				} else if (val instanceof Array) {
					var singer = '';
					val.forEach(item => {
						singer = singer + item.name + ' ';
					});
					return singer;
				}
			}
		}
	};
</script>
<style>
	.play-list-container{
		position: fixed;
		background-color: #fff;
		left: 0;
		top:0;
		width:100%;
		height: 100%;
		overflow: hidden;
		z-index: 10;
	}
	.play-list-header{
		position: fixed;
		height: 50px;
		width:100%;
		left:0;
		top:0;
		background-color: #fff;
		border-bottom: 1px solid #eee;
		display: flex;
		align-items:center;
	}
	.play-list-header img{
		width:25px;
		padding-left:10px;
	}
	.play-list-header .play-mode {
		flex:1;
		padding-left: 10px;
	}
	.play-list-header .finish{
		padding:10px;
	}
	.play-list-wrap{
		position: absolute;
		top:51px;
		bottom: 0;
		width:100%;
		overflow: hidden;
		background-color: #fff;
	}
	.play-list-item{
		height: 40px;
		padding:5px 0;
		margin-left: 10px;
		display: flex;
		align-items:center;
		border-bottom: 1px solid #f0f0f0;
	}
	.play-list-item:last-child{
		border:none;
	}
	.list-item-content{
		display: flex;
		flex:1;
		flex-direction:row;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		align-items:center;
		height: 100%;
	}
	.music-playing{
		width:15px;
		height: 15px;
		margin-left: 10px;
	}
</style>