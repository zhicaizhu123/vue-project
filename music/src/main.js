// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
// import Vuex from 'vuex';
// Vue.use(Vuex); // 注册vuex组件
var VueResource = require('vue-resource');
Vue.use(VueResource); // 注册vue-resource组件

// const SINGLE = 0; //单曲循环播放模式
// const SEQUENTIAL = 1; //顺序播放模式
// const RANDOM = 2; //随机播放模式
// const store = new Vuex.Store({
// 	// 数据源
// 	state: {
		
// 	},
// 	//数据操作
// 	mutations: {

// 	},
// 	// 可复用方法
// 	getter: {

// 	}
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
});
