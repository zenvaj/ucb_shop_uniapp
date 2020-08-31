<template style="background: white">
    <view>
        <view style="background: white;z-index: 999">
        </view>
        <view class="index-content">
            <view class="index-coupon has-bg-white has-pd-10 top_30">
                <view class="goods-list" v-if="couponlist.length > 0">
                    <jd-goods-list
                            v-for="(item,index) in couponlist"
                            :itemid="item.skuId"
                            :itempic="item.imageInfo.imageList[0].url"
                            :itemtitle="item.skuName"
                            :itemprice='"在售价 ¥"+item.priceInfo.price'
                            :itemsale='"月销 "+item.inOrderCount30Days+ " 笔"'
                            :itemendprice='"券后价 ￥"+item.endPrice'
                            :pingouUrl="item.pinGouInfo.pingouUrl"
                            :materialUrl="item.materialUrl"
                            :couponUrl="item.couponInfo.couponList.length>0?item.couponInfo.couponList[0].link:null"
                            :tuanNumber='item.pinGouInfo&&item.pinGouInfo.pingouTmCount?item.pinGouInfo.pingouTmCount+"人拼":null'
                            :tuanPrice='item.pinGouInfo&&item.pinGouInfo.pingouPrice?"拼团价 ￥"+item.pinGouInfo.pingouPrice:null'
                            :couponmoney="item.couponInfo.couponList.length>0?'领券'+item.couponInfo.couponList[0].discount+'元':null"
                    ></jd-goods-list>
                </view>
            </view>
            <!-- 悬浮上拉 -->
            <view class="scroll_top" @tap="topScrollTap" v-bind:class="[scrollTop ? 'active' : '','']"
                  style="bottom: 56px;">
                <text class="iconfont icon-shangla"></text>
            </view>
            <!-- 加载更多提示 -->
            <view class="s-col is-col-24" v-if="couponlist.length > 0">
                <load-more :loadingType="loadingType" :contentText="contentText"></load-more>
            </view>
            <!-- 加载更多提示 -->
            <empty v-if="couponlist.length === 0" des="暂无数据" show="false"></empty>

        </view>
    </view>
</template>

<script>
    export default {
        onShareAppMessage(res) {
            return {
                title: '购物先领券，一年省一半',
                path: '/pages/index/index'
            }
        }, data() {
            return {
                logo: "../../static/img/mao.png",
                tab: [
                    {name: '热销', position: "inOrderCount30DaysSku"},
                    {name: '超低价', position: "price"},
                    {name: '好评', position: "goodComments"},
                ],
                category: [
                    {name: "好券商品", position: 1},
                    {name: "京东超市", position: 6},
                    {name: "超级大卖场", position: 2},
                    {name: "9.9专区", position: 10},
                    {name: "服装运动", position: 4},
                    {name: "品质家电", position: 14},
                    {name: "数码先锋", position: 13},
                    {name: "精致生活", position: 12},
                    {name: "京仓配送", position: 15},
                    {name: "精品库", position: 22}

                ],
                TabCur: 0,
                TabCurs: 0,
                scrollLeft: 0,
                scrollLefts: 0,
                couponlist: [],
                page: 1,
                eliteId: 10,
                sort: "inOrderCount30DaysSku",
                loadingType: 0,
                scrollTop: false,
                contentText: {
                    contentdown: "上拉显示更多",
                    contentrefresh: "正在加载...",
                    contentnomore: "没有更多数据了"
                }
            }
        },
        onLoad: function (e) {
            uni.showLoading({
                title: '加载中...'
            });
            this.loadCouponList();
        },
        onPageScroll: function (e) {
            this.scrollTop = e.scrollTop > 200;
        },
        methods: {
            searchSelect(e) {
                uni.showLoading({
                    title: '加载中...'
                });
                this.TabCurs = e.currentTarget.dataset.id;
                this.sort = this.tab[e.currentTarget.dataset.id].position;
                this.scrollLefts = (e.currentTarget.dataset.id - 1) * 60;
                this.page = 1; //#ifdef H5
                uni.pageScrollTo({
                    scrollTop: 0,
                    duration: 300
                });
                //#endifthis.loadCouponList("Refresh");
            },
            tabSelect(e) {
                uni.showLoading({
                    title: '加载中...'
                });
                this.TabCur = e.currentTarget.dataset.id;
                this.eliteId = this.category[e.currentTarget.dataset.id].position;
                this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
                this.page = 1;
                //#ifdef H5
                uni.pageScrollTo({
                    scrollTop: 0,
                    duration: 300
                });
                //#endif
                this.loadCouponList("Refresh");
            },
            topScrollTap: function () {
                uni.pageScrollTo({
                    scrollTop: 0,
                    duration: 300
                });
            },

            loadCouponList: function (type) {
                this.loadingType = 1;
                this.$Request.get('/tao/jd/goods/eliteId/' + this.eliteId + '/page/' + this.page + '/sortName/' + this.sort + '/sort/desc').then(res => {
                    this.loadingType = 0;
                    if (res.code === 200) {
                        if (this.page === 1) {
                            this.couponlist = [];
                        }
                        res.data.forEach(d => {
                            if (d.couponInfo.couponList.length > 0) {
                                d.endPrice = Math.round(d.priceInfo.price - d.couponInfo.couponList[0].discount);
                            } else {
                                d.endPrice = null;
                            }
                            if (d.couponInfo.couponList.length>0){
                                this.couponlist.push(d);
                            }
                        })
                    } else {
                        this.loadingType = 2;
                    }
                    uni.hideLoading();

                    if (type === "Refresh") {
                        uni.stopPullDownRefresh(); // 停止刷新
                    }
                })
            },
            toGoodsInfo: function (itemid) {
               let relation_id = this.$queue.getData("relation_id");
                if (relation_id) {
                    uni.navigateTo({
                        url: "/pages/detail/goodsinfo?itemid=" + itemid + "&relation_id=" + relation_id,
                    })
                } else {
                    uni.navigateTo({
                        url: "/pages/detail/goodsinfo?itemid=" + itemid,
                    })
                }
            },
        },

        onReady: function () {
            this.loadCouponList();
        },
        onReachBottom: function () {
            this.page = this.page + 1;
            this.loadCouponList();
        },
        onPullDownRefresh: function () {
            this.page = 1;
            this.loadCouponList("Refresh");
        }
    }
</script>

<style>
    @import "../../static/css/index.css";
</style>
