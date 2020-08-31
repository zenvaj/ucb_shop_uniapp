import Vue from 'vue'
import App from './App'
import store from './store'

import HttpRequest from './common/httpRequest'
import HttpCache from './common/cache'
import queue from './common/queue'

import loadMore from './components/uni-pro/load-more'
import orangeGoodsList from './components/uni-pro/orange-goods-list'
import orangeGoodsNewsList from './components/uni-pro/orange-goods-news-list'
import orangeGoodsCarg from './components/uni-pro/orange-goods-card'
import orangeHandpick from './components/uni-pro/orange-handpick'
import orangeNews from './components/uni-pro/orange-news'
import loading from './components/xuan-loading/xuan-loading'
import orangeGoodsCargHome from './components/uni-pro/orange-goods-card-home'
import empty from './components/empty'

import imUtils from "./common/imTools.js"
import jpushIM from "./common/im.js"
import cuCustom from './colorui/components/cu-custom.vue'

import jdGoodsList from './components/uni-pro/jd-goods-list'

import 'js_sdk/ican-H5Api/ican-H5Api'
import wx from 'js_sdk/weixin'

Vue.config.productionTip = false;
Vue.prototype.$Request = HttpRequest;
Vue.prototype.$queue = queue;

Vue.prototype.$wx = wx;

Vue.prototype.$Sysconf = HttpRequest.config;
Vue.prototype.$SysCache = HttpCache;
 
Vue.prototype.$store = store;
Vue.prototype.imUtils = imUtils;
Vue.prototype.jpushIM = jpushIM;


App.mpType = 'app';
Vue.component('cu-custom',cuCustom)   

Vue.component('orange-news', orangeNews);
Vue.component('orange-handpick', orangeHandpick);

Vue.component('load-more', loadMore);
Vue.component('loading', loading);
Vue.component('empty', empty);
Vue.component('orange-goods-list', orangeGoodsList);
Vue.component('orange-goods-news-list', orangeGoodsNewsList);
Vue.component('orange-goods-card', orangeGoodsCarg);
Vue.component('orange-goods-card-home', orangeGoodsCargHome);

Vue.component('jd-goods-list', jdGoodsList);

const app = new Vue({
	store,
    ...App
});
app.$mount();
