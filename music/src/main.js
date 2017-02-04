// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Vuex from 'vuex';
Vue.use(Vuex); // 注册vuex组件
var VueResource = require('vue-resource');
Vue.use(VueResource); // 注册vue-resource组件

const SINGLE = 0;
const SEQUENTIAL = 1; // 播放模式1
const RANDOM = 2;
const store = new Vuex.Store({
	state: {
		playing: true,
		currentTime: 0,
		duration: 0,
		playMode: SINGLE,
		index: 0,
		coverImgUrl: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003RMaRI1iFoYd.jpg?max_age=2592000',
		song: {
			id: '107192078',
			mid: '003OUlho2HcRHC',
			name: '告白气球',
			singer: '周杰伦'
		},
		playList: [{
			id: '107192078',
			mid: '003OUlho2HcRHC',
			name: '告白气球',
			singer: '周杰伦'
		}],
		rankid: 1
	},
	mutations: {
		play(state) {
			state.playing = true;
		},
		pause(state) {
			state.playing = false;
		},
		playIndex (state, index) { 
			state.index = index;
			state.song = state.playList[index];
		},
		playFront (state) { // 上一首
			state.index = (state.index - 1 + state.playList.length) % state.playList.length;
			state.song = state.playList[state.index];
		},
		playNext (state) { // 下一首
			state.index = (state.index + 1) % state.playList.length;
			state.song = state.playList[state.index];
		},
		playContinue(state) {
			switch (state.playMode) {
				case SINGLE:
					state.playing = true;
					break;
				case SEQUENTIAL:
					break;
				case RANDOM: 
					break;
			}
		},
		setID(state, id) {
			state.rankid = id;
		},
		setPlayList (state, playList) { // 获取新的歌曲列表
			state.playList = playList.list;
			state.index = playList.index;
			state.song = state.playList[state.index];
		},
		addToPlayList (state, item) { // 添加歌曲到播放列表
			state.playList.push(item);
		}
	}
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  store,
  components: { App }
});
