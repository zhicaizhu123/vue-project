<template>
	<div class="action-container">
		<div class="action-mask" @click="hideAction"></div>
		<div class="action-wrapper">
			<div class="action-music action-option">
				<div class="action-music-name">
					{{musicInfo.name}}
				</div>
				<div class="action-music-singer">
					{{musicInfo.singer | singer}}
				</div>
			</div>
			<div class="action-operation">
				<div class="action-next action-option" @click="nextMusic" v-if="parentPage === 'listPage'">
					下一首
				</div>
				<div class="action-delete action-option" @click="deleteMusic" v-if="parentPage === 'listPage'">
					删除
				</div>
				<div class="action-add action-option" @click="addMusic" v-if="parentPage === 'rankPage'">
					添加到列表
				</div>
				<div class="action-cancel action-option" @click="hideAction">
					取消
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {mapState, mapMutations} from 'vuex';
	export default {
		props: {
			actionIndex: Number,
			parentPage: String,
			songList: {
				type: Object,
				default: function () {
					return {};
				}
			}
		},
		computed: {
			...mapState(['playList', 'song', 'index']),
			musicInfo() {
				if (this.parentPage === 'listPage') {
					return {
						name: this.playList[this.actionIndex].name,
						singer: this.playList[this.actionIndex].singer
					};
				} else if (this.parentPage === 'rankPage') {
					return {
						name: this.songList.songorig,
						singer: this.songList.singer
					};
				}
			}
		},
		methods: {
			...mapMutations(['deleteFromPlayList', 'addToPlayList', 'playIndex', 'setIndex', 'playNext']),
			hideAction() {
				this.$parent.actionShow = false;
			},
			deleteMusic() {
				let curIndex = this.playList[this.actionIndex].id;
				this.deleteFromPlayList(this.actionIndex);
				if (this.actionIndex < this.index) {
					this.setIndex();
				}
				if (this.playList.length > 0 && curIndex === this.song.id) {
					this.playIndex(this.actionIndex);
				}
				this.hideAction();
			},
			nextMusic() {
				this.playNext();
				this.hideAction();
			},
			addMusic() {
				let obj = {
					id: this.songList.songid,
					mid: this.songList.songmid,
					name: this.songList.songorig,
					singer: this.songList.singer
				};
				this.addToPlayList(obj);
				this.hideAction();
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
	.action-container{
		position: absolute;
		left: 0;
		top:0;
		bottom:0;
		width:100%;
		z-index: 10;
	}
	.action-mask{
		height: 200%;
		width: 100%;
		position: relative;
		transform:translateY(-50%);
		background-color: rgba(0,0,0,.5);
		z-index: 1;
	}
	.action-wrapper{
		position: absolute;
		left: 0;
		bottom:0;
		width:100%;
		background-color: #eee;
		z-index: 2;
	}
	.action-wrapper .action-option{
		display: flex;
		align-items:center;
		justify-content:center;
		padding:10px 0;
		background-color: #fff;
		font-size: 18px;
		text-align: center;
		border-bottom: 1px solid #eee; 
		min-height: 25px;
	}
	.action-wrapper .action-music{
		display: flex;
		flex-direction:column;
		line-height: 1.5;
	}
	.action-wrapper .action-music .action-music-singer{
		font-size: 14px;
		color:#aaa;
	}
	.action-wrapper .action-option.action-cancel{
		margin-top: 10px;
	}
</style>