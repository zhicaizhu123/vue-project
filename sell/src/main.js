import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import goods from 'components/goods/goods.vue';
import ratings from 'components/ratings/ratings.vue';
import seller from 'components/seller/seller.vue';

// 注册插件
Vue.use(VueRouter);
Vue.use(VueResource);

// 构建组件
var app = Vue.extend(App);
// 实例化路由
var router = new VueRouter({
	linkActiveClass: 'active'
});
// 定义路由地址
router.map({
    '/goods': {component: goods},
    '/ratings': {component: ratings},
    '/seller': {component: seller}
});
// 启动路由,挂在到id=app的元素上面
router.start(app, '#app');
// router.go('/goods');// 默认的展示模块
