(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-homeSearch-index"],{"23f5":function(t,a,o){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var e={props:{buttom:{type:Boolean,default:!1},contentClass:{type:String,default:"has-bg-white"}},data:function(){return{showConfirmButton:!0,showCancelButton:!1,confirmButtonText:"确定",cancelButtonText:"取消",isVisibility:!1}},methods:{__setconfig:function(t){void 0!=t&&"object"==typeof t&&(void 0!=t["showConfirmButton"]&&(this.showConfirmButton=t["showConfirmButton"]),void 0!=t["showCancelButton"]&&(this.showCancelButton=t["showCancelButton"]),void 0!=t["confirmButtonText"]&&(this.confirmButtonText=t["confirmButtonText"]),void 0!=t["cancelButtonText"]&&(this.cancelButtonText=t["cancelButtonText"]),void 0!=t["isVisibility"]&&(this.isVisibility=t["isVisibility"]),void 0!=t["contentClass"]&&(this.contentClass=t["contentClass"]))},show:function(t){this.__setconfig(t),this.isVisibility=!0},hide:function(){this.isVisibility=!1},handleClose:function(){this.isVisibility=!1,this.$emit("cancelButton")},handleConfirm:function(){this.$emit("confirmButton")},ClickMaskClose:function(){this.$emit("maskClose")},contentClick:function(t){this.$emit("contentClick")},moveHandleStop:function(){}}};a.default=e},"27cd":function(t,a,o){"use strict";o.r(a);var e=o("ac56"),i=o.n(e);for(var n in e)"default"!==n&&function(t){o.d(a,t,(function(){return e[t]}))}(n);a["default"]=i.a},"28b5":function(t,a,o){var e=o("24fb"),i=o("1de5"),n=o("7d20"),r=o("64b3");a=e(!1);var d=i(n),s=i(r);a.push([t.i,".index-content[data-v-55afa7b7]{width:100%;background:#f8f8f8}.index-content .index-header[data-v-55afa7b7]{position:fixed;z-index:160;\r\n\t/*border-bottom: solid 1px #ddd;*/\r\n\t/*background: linear-gradient(to left, #e10a07 0, #FBAA58 100%);*/border-bottom-color:transparent;-webkit-transition:all .4s ease 0s;-webkit-transform-origin:center;transform-origin:center;width:100%}.index-content .index-header .icon_header[data-v-55afa7b7]{width:100%;line-height:45px;position:relative;background:-webkit-linear-gradient(left,#e10a07,#f15b6c);background:-o-linear-gradient(left,#e10a07 0,#f15b6c 100%);background:-ms-linear-gradient(left,#e10a07 0,#f15b6c 100%);background:-webkit-gradient(linear,right top,left top,color-stop(0,#e10a07),to(#f15b6c));background:-o-linear-gradient(right,#e10a07 0,#f15b6c 100%);background:-webkit-linear-gradient(right,#e10a07,#f15b6c);background:linear-gradient(270deg,#e10a07 0,#f15b6c)}.index-content .index-header .icon_header .index-search[data-v-55afa7b7]{text-align:center;font-size:16px;color:#fff;position:relative;z-index:2;zoom:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding-top:8px;margin:0 45px 0 10px;padding-bottom:6px}.index-content .index-header .icon_header .index-search .icon_search[data-v-55afa7b7]{background:#f6f6f6;border-radius:%?40?%;-moz-border-radius:%?40?%;-webkit-border-radius:%?40?%;-o-border-radius:%?40?%;-ms-border-radius:%?40?%;height:%?66?%;line-height:%?66?%;font-size:%?26?%;color:#dcdcdc;text-align:left;text-indent:%?32?%;position:relative;z-index:1;zoom:1;transition:all .4s ease 0s;-o-transition:all .4s ease 0s;-moz-transition:all .4s ease 0s;-webkit-transition:all .4s ease 0s;-webkit-transform-origin:center;transform-origin:center}.icon_header .icon_search>.iconfont[data-v-55afa7b7]{margin-right:%?20?%;top:1px;color:#ccc}.icon_header .icon_suji[data-v-55afa7b7]{position:absolute;top:0;width:%?90?%;text-align:center;right:0;color:#fff}.icon-gender[data-v-55afa7b7]{position:absolute;top:0;width:%?90?%;text-align:center;left:16px;color:#fff}.icon_header .icon_suji .icon-zuji[data-v-55afa7b7]{font-size:%?40?%}.index-content .index-banner[data-v-55afa7b7]{padding-top:40px;width:100%}.index-content .index-banner uni-swiper-item[data-v-55afa7b7]{height:400px}.index-content .index-banner .swiper .swiper-container uni-image[data-v-55afa7b7]{width:100%}.index-content .index-navlist[data-v-55afa7b7]{\r\n\t/*border-bottom: 10upx solid #f2f2f2*/}.index-content .index-navlist uni-image[data-v-55afa7b7]{width:64px;height:64px}.index-content .home_ant_juhuasuan[data-v-55afa7b7]{padding:0 5px;\r\n\t/*border-bottom: 10upx solid #f2f2f2*/margin-bottom:6px}.index-content .home_ant_juhuasuan .fl-jutext[data-v-55afa7b7]{font-size:0;height:45px;line-height:500px;overflow:hidden;-webkit-background-size:auto 18px;background-size:auto 18px;float:left;width:25%}.index-content .home_ant_juhuasuan .fr-jutext[data-v-55afa7b7]{line-height:45px;background:url("+d+') 100% no-repeat;color:#999;-webkit-background-size:auto 11px;background-size:auto 11px;width:65%;float:right;text-align:right;padding-right:10px;font-size:14px}.index-content .juhuasuan-list[data-v-55afa7b7]{clear:both;padding-bottom:10px}.index-content .juhuasuan-list .juhuasuan-list-goods[data-v-55afa7b7]{width:25%;float:left}.index-content .juhuasuan-list .juhuasuan-list-goods .image[data-v-55afa7b7]{display:block;margin:0 2px;-webkit-border-radius:5px;border-radius:5px;overflow:hidden;position:relative;z-index:0}.index-content .juhuasuan-list .juhuasuan-list-goods .image uni-image[data-v-55afa7b7]{width:91px\r\n\t/* \theight: 91px; */}.index-content .juhuasuan-list .juhuasuan-list-goods .name[data-v-55afa7b7]{position:absolute;left:0;bottom:0;height:20px;line-height:22px;font-size:12px;-moz-border-radius:3px;-webkit-border-radius:3px;-o-border-radius:3px;-ms-border-radius:3px;background:-webkit-linear-gradient(left,#f15b6c,#e10a07);background:-o-linear-gradient(left,#f15b6c 0,#e10a07 100%);background:-ms-linear-gradient(left,#f15b6c 0,#e10a07 100%);background:-webkit-gradient(linear,right top,left top,color-stop(0,#f15b6c),to(#e10a07));background:-o-linear-gradient(right,#f15b6c 0,#e10a07 100%);background:-webkit-linear-gradient(right,#f15b6c,#e10a07);background:linear-gradient(270deg,#f15b6c 0,#e10a07);color:#fff;width:100%;overflow:hidden}.index-content .juhuasuan-list .juhuasuan-list-goods .name[data-v-55afa7b7]:before{background:#ffe7c9;height:100px;position:absolute;-ms-transform:rotate(15deg);right:0;color:#e10a07;padding-left:%?5?%;padding-right:%?5?%}.index-content .juhuasuan-list .juhuasuan-list-goods .name .pinname[data-v-55afa7b7]{font-size:12px;line-height:20px}.index-content .index-coupon .coupon-tab[data-v-55afa7b7]{margin:0 %?10?%}.index-content .index-coupon .coupon-tab .fl-jutext[data-v-55afa7b7]{width:33.33333333%;font-size:%?30?%;color:#333}.index-content .index-coupon .coupon-tab .fl-jutext[data-v-55afa7b7]:before{content:"";float:left;margin-top:3px;width:3px;height:18px;border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px;-o-border-radius:3px;-ms-border-radius:3px;background:-o-linear-gradient(top,#ff5d06 0,#e10a07 100%);background:-o-linear-gradient(bottom,#ff5d06 0,#e10a07 100%);background:-webkit-gradient(linear,left bottom,left top,color-stop(0,#ff5d06),to(#e10a07));background:-webkit-linear-gradient(bottom,#ff5d06,#e10a07);background:linear-gradient(0deg,#ff5d06 0,#e10a07);margin-right:5px}.index-content .index-coupon .coupon-tab .fr-jutext[data-v-55afa7b7]{float:right;color:#aaa;font-size:14px;background:url('+d+') 100% no-repeat;-webkit-background-size:auto 11px;background-size:auto 11px;width:65%;text-align:right;padding-right:10px}.index-content .index-coupon .goods-list .coupon-page[data-v-55afa7b7]{padding:10px}.index-content .index-coupon .goods-list .coupon-page .image[data-v-55afa7b7]{float:left;width:40%}.index-content .index-coupon .goods-list .coupon-page .image uni-image[data-v-55afa7b7]{width:%?240?%;height:%?240?%;-webkit-border-radius:3px;border-radius:3px}.index-content .index-coupon .goods-list .coupon-page .content[data-v-55afa7b7]{float:right;width:60%}.index-content .index-coupon .goods-list .coupon-page .content .title[data-v-55afa7b7]{color:#333;font-weight:400;font-size:16px;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;height:42px;margin-bottom:20px;overflow:hidden}.index-content .index-coupon .goods-list .coupon-page .content .num[data-v-55afa7b7]{color:#aaa;line-height:20px;font-size:13px;padding-top:13px}.index-content .index-coupon .goods-list .coupon-page .content .num .tmprice[data-v-55afa7b7]{padding-right:10px;margin-right:10px;position:relative;z-index:1;zoom:1;display:inline-block}.index-content .index-coupon .goods-list .coupon-page .content .num .volume[data-v-55afa7b7]{float:right}.index-content .index-coupon .goods-list .coupon-page .content .money[data-v-55afa7b7]{height:24px;font-size:18px;margin-top:5px}.index-content .index-coupon .goods-list .coupon-page .content .money .quan[data-v-55afa7b7]{padding:0;position:relative;z-index:1;zoom:1;top:0;overflow:hidden;float:right}.index-content .index-coupon .goods-list .coupon-page .content .money .quan[data-v-55afa7b7]{\r\n\t/*background: -moz-linear-gradient(left, #e10a07 0, #FF927C 100%);*/\r\n\t/*background: -webkit-gradient(linear, left top, left right, color-stop(0, #e10a07), color-stop(100%, #FF927C));*/\r\n\t/*background: -webkit-linear-gradient(left, #e10a07 0, #FF927C 100%);*/\r\n\t/*background: -o-linear-gradient(left, #e10a07 0, #FF927C 100%);*/\r\n\t/*background: -ms-linear-gradient(left, #e10a07 0, #FF927C 100%);*/\r\n\t/*background: linear-gradient(to left, #e10a07 0, #FF927C 100%);*/background:-moz-linear-gradient(left,#f15b6c 0,#ff927c 100%);background:-webkit-gradient(linear,left top,left right,color-stop(0,#f15b6c),color-stop(100%,#ff927c));background:-webkit-linear-gradient(left,#f15b6c,#ff927c);background:-o-linear-gradient(left,#f15b6c 0,#ff927c 100%);background:-ms-linear-gradient(left,#f15b6c 0,#ff927c 100%);background:-webkit-gradient(linear,right top,left top,color-stop(0,#f15b6c),to(#ff927c));background:-webkit-linear-gradient(right,#f15b6c,#ff927c);background:linear-gradient(270deg,#f15b6c 0,#ff927c);position:relative;z-index:1;zoom:1;font-style:normal;display:block;border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px;-o-border-radius:3px;-ms-border-radius:3px;font-size:.785rem;min-width:3rem;text-align:center;padding:1px %?12?%;color:#fff}.index-content .index-coupon .goods-list .coupon-page .content .money .quan[data-v-55afa7b7]:before{position:absolute;z-index:1;zoom:1;top:50%;margin-top:-3px;background:#fff;display:block;width:5px;height:5px;content:"";-webkit-border-radius:10px;border-radius:10px;border:1px solid #fff;left:auto;right:-4px}.index-content .index-coupon .goods-list .coupon-page .content .money .quan[data-v-55afa7b7]:after{position:absolute;z-index:1;zoom:1;top:50%;margin-top:-3px;background:#fff;display:block;width:5px;height:5px;content:"";-webkit-border-radius:10px;border-radius:10px;border:1px solid #fff;left:-4px}.index-content .index-coupon .goods-list .coupon-page .content .money .coupon-price[data-v-55afa7b7]{background:#fff;color:#ff563a;font-size:%?24?%}.index-content .index-coupon .goods-list .coupon-page .content .money .coupon-price uni-text[data-v-55afa7b7]{font-size:%?32?%;padding-left:5px}\r\n\r\n/*\r\n** 商品详情\r\n*/.index-goods[data-v-55afa7b7]{width:100%}.index-goods .goods_info[data-v-55afa7b7]{background:#fff;width:100%}.index-goods .goods_info .title[data-v-55afa7b7]{padding:%?20?% %?10?%;font-size:%?32?%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:400;color:#333}.index-goods .goods_info .title uni-text[data-v-55afa7b7]{border:1px solid #e10a07;color:#e10a07;border-radius:2px;-moz-border-radius:2px;-webkit-border-radius:2px;-o-border-radius:2px;-ms-border-radius:2px;padding:0 5px;margin-right:5px;font-size:%?28?%;top:-1px}.index-goods .goods_info .coupon-price[data-v-55afa7b7]{margin:%?10?% %?10?% 0 %?10?%;margin-top:%?0?%}.index-goods .goods_info .coupon-price .price[data-v-55afa7b7]{float:left;font-size:%?30?%;color:#e10a07;width:50%}.index-goods .goods_info .coupon-price .price uni-text[data-v-55afa7b7]{font-size:%?46?%;font-weight:500}.index-goods .goods_info .coupon-price .volume[data-v-55afa7b7]{float:right;font-size:%?30?%;color:#333;width:50%;text-align:right}.index-goods .goods_info .coupon-price .yprice[data-v-55afa7b7]{float:left;color:#888;width:40%}.index-goods .goods_info .coupon-price .tag-list[data-v-55afa7b7]{float:right;width:60%;text-align:right}.index-goods .goods_info .coupon-price .tag-list .tag[data-v-55afa7b7]{text-align:right;float:right;margin-left:%?20?%;color:#888;font-size:%?28?%}.index-goods .goods_info .coupon-price .tag-list .tag .iconfont[data-v-55afa7b7]{color:#e10a07;margin-right:%?4?%}.index-goods .goods_quan[data-v-55afa7b7]{background:#fff;position:relative;z-index:1;zoom:1}.index-goods .goods_quan[data-v-55afa7b7]:before{content:"";width:2px;height:55%;background:url('+s+');-webkit-background-size:auto 100%;-moz-background-size:auto 100%;background-size:auto 100%;position:absolute;z-index:1;zoom:1;left:64%;top:20%;display:block}.index-goods .goods_quan .row[data-v-55afa7b7]{display:block;position:absolute;z-index:1;zoom:1;left:0;top:0;width:100%;height:100%;text-align:center}.index-goods .goods_quan .row .money[data-v-55afa7b7]{font-size:%?36?%;color:#fff;padding-top:6%;line-height:%?48?%;position:relative;z-index:1;zoom:1;left:.3rem}.index-goods .goods_quan .row .money .date-coupon[data-v-55afa7b7]{font-size:12px;color:#fff}.index-goods .goods_quan .row .name[data-v-55afa7b7]{line-height:100%;color:#fff;position:relative;z-index:1;zoom:1;top:50%;margin-top:-.6rem;text-align:left;font-weight:600}.index-goods .goods_quan .row .name uni-text[data-v-55afa7b7]{margin-left:15%}.index-goods .goods_desc[data-v-55afa7b7]{font-size:%?24?%;line-height:%?48?%;padding:%?10?% %?20?%;color:#888}.hr10[data-v-55afa7b7]{background:#f5f5f5;height:%?10?%}.scroll_top[data-v-55afa7b7]{background:rgba(51,51,51,.8);width:35px;height:35px;border-radius:35px;-moz-border-radius:35px;-webkit-border-radius:35px;-o-border-radius:35px;-ms-border-radius:35px;text-align:center;line-height:35px;color:#fff;position:fixed;z-index:1;zoom:1;right:20px;bottom:25px;opacity:0;-webkit-transform:translateY(100px) translateX(0);transform:translateY(100px) translateX(0);transition:all .4s ease 0s;-o-transition:all .4s ease 0s;-moz-transition:all .4s ease 0s;-webkit-transition:all .4s ease 0s;-webkit-transform-origin:center;transform-origin:center}.scroll_top.active[data-v-55afa7b7]{opacity:1;-webkit-transform:translateY(-25px) translateX(0);transform:translateY(-25px) translateX(0)}.index-goods .goods_shop .info[data-v-55afa7b7]{padding-top:%?20?%;min-height:%?120?%}.index-goods .goods_shop .info uni-image[data-v-55afa7b7]{float:left;width:%?120?%;height:%?120?%;background:#f5f5f5;margin-left:%?20?%}.index-goods .goods_shop .info .shop-text[data-v-55afa7b7]{position:relative;z-index:1;zoom:1;min-height:%?120?%;padding-left:%?160?%;line-height:%?60?%}.index-goods .goods_shop .info .shop-text .shop-title[data-v-55afa7b7]{font-size:1.1rem;font-weight:400;margin-right:%?235?%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.index-goods .goods_shop .info .shop-text .icon-taobao[data-v-55afa7b7]{color:#ff5000}.index-goods .goods_shop .info .shop-text .icon-tianmaotmall[data-v-55afa7b7]{color:#e10a07}.index-goods .goods_shop .info .shop-text .shop-new[data-v-55afa7b7]{position:absolute;z-index:1;zoom:1;right:%?20?%;top:50%;margin-top:-15px;font-size:%?30?%;color:#888}.index-goods .goods_shop .info .shop-text .shop-new .icon-youjiantou[data-v-55afa7b7]{font-size:%?24?%}.index-goods .goods_shop .goods-tab[data-v-55afa7b7]{margin-top:%?30?%;border-top:solid 1px #f5f5f5;font-size:%?30?%;color:#555;padding:%?20?%}.index-goods .goods_shop .goods-tab .lv_p[data-v-55afa7b7]{color:#ff7800;margin-left:%?8?%}.index-goods .goods_shop .goods-tab .lv_d[data-v-55afa7b7]{color:#2ca800;margin-left:%?8?%}.index-goods .goods_shop .goods-tab .lv_g[data-v-55afa7b7]{color:#e31436;margin-left:%?8?%}.index-goods .goods_shop .goods-tab .is-col-8[data-v-55afa7b7]:nth-child(2n):after,\r\n.index-goods .goods_shop .goods-tab .is-col-8[data-v-55afa7b7]:nth-child(2n):before{position:absolute;z-index:1;zoom:1;left:0;top:50%;width:1px;height:1rem;margin-top:-.5rem;background:#eee;display:block;content:""}.index-goods .goods_shop .goods-tab .is-col-8[data-v-55afa7b7]:nth-child(2n):after{left:auto;right:0}.index-goods .goods_reco[data-v-55afa7b7]{background:#fff;margin-bottom:%?120?%}.index-goods .goods_reco .goods-info-title[data-v-55afa7b7]{font-weight:400;text-align:center;font-size:%?28?%;height:%?80?%;line-height:%?80?%;color:#333}.index-goods .goods_reco .imglist[data-v-55afa7b7]{max-width:100%}.index-goods .goods_shop_cart[data-v-55afa7b7]{position:fixed;zoom:1;bottom:0;z-index:500;left:0;width:100%}.index-goods .goods_shop_cart .cent[data-v-55afa7b7]{position:relative;zoom:1;z-index:5;background:#fff;-webkit-box-shadow:0 -2px 2px 0 rgba(0,0,0,.1);box-shadow:0 -2px 2px 0 rgba(0,0,0,.1)}.index-goods .goods_shop_cart .but .img[data-v-55afa7b7]{position:relative;z-index:1;zoom:1;padding-top:8px;height:28px}.index-goods .goods_shop_cart .but .img uni-image[data-v-55afa7b7]{height:23px;width:23px}.index-goods .goods_shop_cart .but .img .iconfont[data-v-55afa7b7]{font-size:20px;color:#777;top:1px}.index-goods .goods_shop_cart .is-col-16[data-v-55afa7b7]{color:#fff;border:0;padding:0;height:43px;line-height:43px;position:relative;z-index:1;zoom:1;top:10px;background:-webkit-gradient(linear,right top,left top,color-stop(0,#e10a07),to(#fe9f69));background:-webkit-linear-gradient(right,#e10a07,#fe9f69);background:linear-gradient(270deg,#e10a07 0,#fe9f69);width:65%}.index-goods .goods_shop_cart .is-col-16 .btn uni-view[data-v-55afa7b7]{height:41px;color:#fff;text-align:center}.index-goods .goods_shop_cart .is-col-16 .btn .tkl[data-v-55afa7b7]{background:#fff;color:#fe9f69;zoom:1;top:1px;left:1px;z-index:5;position:relative\r\n\t/* \tborder-radius: 3px 0 0 3px; */}.index-goods .goods_shop_cart .is-col-16 .btn .coupon-buy[data-v-55afa7b7]{background:-webkit-gradient(linear,right top,left top,color-stop(0,#e10a07),to(#fbaa58));background:-webkit-linear-gradient(right,#e10a07,#fbaa58);background:linear-gradient(270deg,#e10a07 0,#fbaa58);height:42px}.index-goods .goods_shop_cart_bg[data-v-55afa7b7]{width:100%;height:100%;position:fixed;z-index:50;background:#000;left:0;top:0;\r\n\t/*  display: none; */opacity:.5}.index-goods .goods_share[data-v-55afa7b7]{position:fixed;left:2.5%;width:95%;background:#fff;-webkit-border-radius:4px;border-radius:4px;opacity:0;bottom:-200px;transition:all .3s cubic-bezier(.4,.68,.15,1.21) .2s;-o-transition:all .3s cubic-bezier(.4,.68,.15,1.21) .2s;-moz-transition:all .3s cubic-bezier(.4,.68,.15,1.21) .2s;-webkit-transition:all .3s cubic-bezier(.4,.68,.15,1.21) .2s;z-index:0}.index-goods .goods_share.active[data-v-55afa7b7]{opacity:1;bottom:60px;z-index:100}.index-goods .goods_share .cent uni-view[data-v-55afa7b7]{height:56px;line-height:36px;text-align:center;color:#666;display:block;font-size:16px;padding:10px 0}.index-goods .goods_share .cent uni-view[data-v-55afa7b7]:nth-child(2){border-bottom:solid 1px #eee}.index-goods .goods_share .cent uni-view .iconfont[data-v-55afa7b7]{margin-right:%?10?%}.index-goods .goods_share .cent .em[data-v-55afa7b7]{position:absolute;left:44%;bottom:-10px;width:0;height:0;border-left:12px solid transparent;border-right:12px solid transparent;border-top:12px solid #fff}.navBarButton[data-v-55afa7b7]{z-index:501!important}.index-goods .h_newlit[data-v-55afa7b7]{z-index:-50;top:45px;right:0;border:1px solid #ddd;width:35%;-o-transition:all .4s ease 0s;-moz-transition:all .4s ease 0s;-webkit-transition:all .4s ease 0s;opacity:0;-webkit-transform:translateY(0) translateX(100%);transform:translateY(0) translateX(100%);padding-bottom:5px;-moz-box-shadow:-1px 1px 3px hsla(0,0%,49%,.2);-webkit-box-shadow:-1px 1px 3px hsla(0,0%,49%,.2);box-shadow:-1px 1px 3px hsla(0,0%,49%,.2)}.index-goods .h_newlit.active[data-v-55afa7b7]{-webkit-transform:translateY(0) translateX(0);transform:translateY(0) translateX(0);opacity:1;position:fixed;z-index:600;\r\n\r\nzoom:1}.index-goods .h_newlit[data-v-55afa7b7]{width:120px;text-align:center;background:rgba(51,51,51,.9);border:0;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;-o-border-radius:5px;-ms-border-radius:5px;overflow:inherit;right:.5rem\r\n\t/*margin-top: 50upx;*/}.index-goods .h_newlit .em[data-v-55afa7b7]{position:relative;z-index:5;zoom:1}.index-goods .h_newlit .em[data-v-55afa7b7]:before{content:"";position:absolute;z-index:601;zoom:1;top:-7px;right:10px;width:17px;height:12px}.index-goods .h_newlit .em[data-v-55afa7b7]:before{width:0;height:0;border-left:7px transparent solid;border-right:7px transparent solid;border-bottom:7px rgba(51,51,51,.9) solid;border-top:none;position:absolute;z-index:601;zoom:1;right:8px;top:-7px}.index-goods .h_newlit .em uni-view[data-v-55afa7b7]{border-bottom:solid 1px hsla(0,0%,40%,.9);color:#fff;font-size:1rem;line-height:44px}.index-goods .h_newlit .em uni-view[data-v-55afa7b7]:last-child{border-bottom:0}.index-goods .h_newlit .em uni-view .iconfont[data-v-55afa7b7]{margin-right:%?10?%}.buy-box-title[data-v-55afa7b7]{height:40px;line-height:40px;text-align:center;background:-webkit-gradient(linear,left top,right top,from(#e10a07),to(#ffbf63));background:-webkit-linear-gradient(left,#e10a07,#ffbf63);background:linear-gradient(90deg,#e10a07,#ffbf63);-webkit-background-clip:text;color:transparent;font-size:18px;padding:5px 0}.buy-box-title .iconfont[data-v-55afa7b7]{right:7px;color:#999;position:absolute;font-size:23px;top:-1px}.buy-box-center .code-cent[data-v-55afa7b7]{margin:0 10px}.buy-box-center .cente-text[data-v-55afa7b7]{margin:0 10px;padding:10px 0;background:#f1f1f1;color:#333;font-size:14px;line-height:24px;height:260px;-webkit-border-radius:4px;border-radius:4px;overflow:hidden;text-align:left}.buy-box-center .cente-text .textarea[data-v-55afa7b7]{padding:10px}.buy-box-center .code-cent .closeTips[data-v-55afa7b7]{text-align:left;line-height:22px;color:#aaa;font-size:12px;padding-top:10px;margin-left:10px}.buy-box-center .buy-btn-copy[data-v-55afa7b7]{background:-webkit-gradient(linear,right top,left top,color-stop(0,#e10a07),to(#fb85f7));background:-webkit-linear-gradient(right,#e10a07,#fb85f7);background:linear-gradient(270deg,#e10a07 0,#fb85f7);display:block;-webkit-border-radius:50px;border-radius:50px;line-height:40px;height:40px;text-align:center;color:#fff;font-size:16px;width:90%;margin:0 auto;margin-top:10px;margin-bottom:10px}.buy-box-center .buy-btn-copy.active[data-v-55afa7b7]{background:#1fb931}.buy-box-center .code-pic-info[data-v-55afa7b7]{height:119px}.navBarButtonBox[data-v-55afa7b7]{width:0;height:0;overflow:hidden}.getTbk[data-v-55afa7b7]{background:-moz-linear-gradient(left,#e10a07 0,#fbaa58 100%);background:-webkit-gradient(linear,left top,left right,color-stop(0,#e10a07),color-stop(100%,#fbaa58));background:-webkit-linear-gradient(left,#e10a07,#fbaa58);background:-o-linear-gradient(left,#e10a07 0,#fbaa58 100%);background:-ms-linear-gradient(left,#e10a07 0,#fbaa58 100%);background:-webkit-gradient(linear,right top,left top,color-stop(0,#e10a07),to(#fbaa58));background:-webkit-linear-gradient(right,#e10a07,#fbaa58);background:linear-gradient(270deg,#e10a07 0,#fbaa58)}\r\n\r\n/*\r\n\t9.9包邮\r\n*/.jiu-page .main-title[data-v-55afa7b7]{background:-moz-linear-gradient(left,#e10a07 0,#fbaa58 100%);background:-webkit-gradient(linear,left top,left right,color-stop(0,#e10a07),color-stop(100%,#fbaa58));background:-webkit-linear-gradient(left,#e10a07,#fbaa58);background:-o-linear-gradient(left,#e10a07 0,#fbaa58 100%);background:-ms-linear-gradient(left,#e10a07 0,#fbaa58 100%);background:-webkit-gradient(linear,right top,left top,color-stop(0,#e10a07),to(#fbaa58));background:-webkit-linear-gradient(right,#e10a07,#fbaa58);background:linear-gradient(270deg,#e10a07 0,#fbaa58);border-bottom-color:transparent;padding:10px;position:fixed;top:0;left:0;width:100%;z-index:120;display:block;-webkit-box-sizing:border-box;box-sizing:border-box;\n}.jiu-page .main-title .menu-cat[data-v-55afa7b7]{font-family:Simhei;font-size:17px;height:28px;line-height:28px;color:#fff;text-align:center}.jiu-page .main-title .menu-cat .span[data-v-55afa7b7]{position:relative;cursor:pointer;padding:6px 22px 6px 15px;text-align:center}.jiu-page .main-title .menu-cat .span uni-image[data-v-55afa7b7]{width:65px;height:22px;margin-left:42%}.swiper[data-v-55afa7b7]{height:100%}.help-tips[data-v-55afa7b7]{font-size:13px;color:#999;line-height:26px;padding:0 0 0 30px;margin:0;width:80%;text-align:left}.help-tips.color999[data-v-55afa7b7]{color:#999}.search-default[data-v-55afa7b7]{text-align:center;height:150px;margin:auto}.search-default uni-image[data-v-55afa7b7]{display:block;margin:auto;width:80%}.search-cat[data-v-55afa7b7]{position:fixed;top:0;bottom:0;padding-top:150px;width:100%;height:100%;padding-bottom:11px;background-color:#fff}.search-cat .search-cat-tit[data-v-55afa7b7]{position:relative;height:10px;margin:13px 3% 20px}.search-cat .search-cat-tit .up-menu[data-v-55afa7b7]{display:block;height:20px;line-height:20px;font-size:.9em;color:#999}.src-content[data-v-55afa7b7]{margin:20px 0 30px;width:97%}.main-src .src-item[data-v-55afa7b7]{float:left;-webkit-border-radius:22px;border-radius:22px;padding:0 10px;height:23px;line-height:23px;background-color:#f6f6f6;margin:10px;position:relative;font-size:13px;color:#333}.main-title[data-v-55afa7b7]{height:150px}.main-title[data-v-55afa7b7]{background:-webkit-linear-gradient(left,#e10a07,#f15b6c);background:-o-linear-gradient(left,#e10a07 0,#f15b6c 100%);background:-ms-linear-gradient(left,#e10a07 0,#f15b6c 100%);background:-webkit-gradient(linear,right top,left top,color-stop(0,#e10a07),to(#f15b6c));background:-o-linear-gradient(right,#e10a07 0,#f15b6c 100%);background:-webkit-linear-gradient(right,#e10a07,#f15b6c);background:linear-gradient(270deg,#e10a07 0,#f15b6c);\r\n\t/*background: #e10a07;*/border-bottom-color:transparent;padding:8px 10px;position:fixed;top:0;left:0;width:100%;z-index:120;display:block;-webkit-box-sizing:border-box;box-sizing:border-box}.clear[data-v-55afa7b7]{width:%?70?%;background:#fff;color:#dc143c;position:absolute;z-index:999;font-size:18px;\r\n\r\n\t/* height: 60upx; */margin-left:%?98?%;margin-top:-40px}.clears[data-v-55afa7b7]{float:right;color:#dc143c;margin-left:8px;z-index:100}.uni-input-input[data-v-55afa7b7],\r\n.uni-input-placeholder[data-v-55afa7b7]{width:93%}.search-pop .search-tab[data-v-55afa7b7]{margin:5px 0 10px;color:#fff;font-size:15px;text-align:center;\n}.search-pop .search-tab .my-sub-src[data-v-55afa7b7]{\r\n\t/* margin: 0 auto 0 20px; */display:inline-block;color:#fff;line-height:30px;margin-bottom:10px!important}.search-pop .search-tab .my-sub-src[data-v-55afa7b7]:nth-child(1){margin-left:0!important}.main-title .search-tab .cur[data-v-55afa7b7]{opacity:1;border-bottom:1px solid #fff}.main-title .search-tab .close-src[data-v-55afa7b7]{position:absolute;left:%?32?%;display:block;float:left;color:#fff;margin-top:%?8?%}.main-title .search-tab .close-src .iconfont[data-v-55afa7b7]{font-size:20px}.main-title .search[data-v-55afa7b7]{background-color:#fff;-webkit-border-radius:20px;border-radius:20px;width:78%;margin-left:12%;position:relative;padding:0 9px;height:40px;line-height:40px;font-size:14px;margin-top:10px;margin-bottom:%?20?%}.uni-input-wrapper[data-v-55afa7b7]{width:87%!important}.search_submit[data-v-55afa7b7]{width:25%;height:40px;background:#ffb925;color:#fff;float:right;margin-top:-40px;position:relative;-webkit-border-radius:20px;border-radius:20px;margin-right:-20px;z-index:30}.main-title .search uni-input[data-v-55afa7b7]{border:none;outline:0;height:40px;font-size:14px;line-height:40px;background:#fff;color:#666;-webkit-border-radius:5px;border-radius:5px;padding:0 0 0 5px;text-align:left}.main-title .search uni-input.search_area[data-v-55afa7b7]{background-color:transparent;position:relative;z-index:99;width:80%;color:#333;font-size:12px}',""]),t.exports=a},4307:function(t,a,o){"use strict";var e=o("c8f9"),i=o.n(e);i.a},"53e9":function(t,a,o){"use strict";var e,i=function(){var t=this,a=t.$createElement,o=t._self._c||a;return o("v-uni-view",{staticClass:"s-page-wrapper"},[o("v-uni-view",{staticClass:"search-pop"},[o("v-uni-view",{staticClass:"main-title"},[o("v-uni-view",{staticClass:"search-tab"},[o("v-uni-view",{staticClass:"close-src",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.navigateBack.apply(void 0,arguments)}}},[o("v-uni-text",{staticClass:"iconfont icon-zuojiantou"})],1),o("v-uni-view",{staticClass:"my-sub-src",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.switchTab(1)}}},[t._v("全网超级搜")]),o("v-uni-view",{staticClass:"search"},[o("v-uni-input",{staticClass:"search_area",attrs:{type:"text",value:t.keywords,placeholder:t.placeholder},on:{confirm:function(a){arguments[0]=a=t.$handleEvent(a),t.submitSearch.apply(void 0,arguments)},input:function(a){arguments[0]=a=t.$handleEvent(a),t.searchInput.apply(void 0,arguments)}}}),""!==t.keywords?o("v-uni-text",{staticClass:"cuIcon-close clear",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.clearInput.apply(void 0,arguments)}}}):t._e(),o("v-uni-view",{staticClass:"search_submit",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.submitSearch.apply(void 0,arguments)}}},[t._v("搜 索")])],1)],1)],1)],1),o("v-uni-view",{staticClass:"search-cat"},[t.recentKeyword.length>0?o("v-uni-view",[o("v-uni-view",{staticClass:"search-cat-tit",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.deleteKeyword.apply(void 0,arguments)}}},[o("v-uni-text",{staticClass:"up-menu",staticStyle:{"font-size":"32upx"},on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.deleteKeyword.apply(void 0,arguments)}}},[o("v-uni-text",[t._v("搜索历史")]),o("v-uni-text",{staticStyle:{"font-size":"14px","margin-left":"70%"},on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.deleteKeyword.apply(void 0,arguments)}}},[t._v("清空")])],1)],1),o("v-uni-view",{staticClass:"src-content"},[o("v-uni-view",{staticClass:"main-src"},[t._l(t.recentKeyword,(function(a,e){return[a.keyword.length>15?o("v-uni-view",{staticClass:"src-item ",staticStyle:{"white-space":"nowrap","text-overflow":"ellipsis",overflow:"hidden",width:"100%"},on:{click:function(o){arguments[0]=o=t.$handleEvent(o),t.addKeyword(a.keyword)}}},[t._v(t._s(a.keyword))]):o("v-uni-view",{staticClass:"src-item ",staticStyle:{"white-space":"nowrap","text-overflow":"ellipsis",overflow:"hidden"},on:{click:function(o){arguments[0]=o=t.$handleEvent(o),t.addKeyword(a.keyword)}}},[t._v(t._s(a.keyword))])]}))],2)],1)],1):t._e(),o("v-uni-swiper",{staticClass:"swiper",attrs:{current:t.current},on:{change:function(a){arguments[0]=a=t.$handleEvent(a),t.swiperChange.apply(void 0,arguments)}}},[o("v-uni-swiper-item",[o("v-uni-view",[t.keywordlist.length>0?o("v-uni-view",{staticClass:"search-cat-tit"},[o("v-uni-text",{staticClass:"up-menu",staticStyle:{"font-size":"16px"}},[t._v("热门搜索")])],1):t._e(),o("v-uni-view",{staticClass:"src-content"},[o("v-uni-view",{staticClass:"main-src"},t._l(t.keywordlist,(function(a,e){return o("v-uni-view",{key:e,staticClass:"src-item ",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.addKeywords(e)}}},[t._v(t._s(a.keyword))])})),1)],1)],1)],1),o("v-uni-swiper-item",[o("v-uni-view",{staticClass:"search-default"},[o("v-uni-view",{staticClass:"help-tips has-mgtb-10 is-size-18"},[t._v("搜索方法：")]),o("v-uni-view",{staticClass:"help-tips color999"},[t._v("1、打开手机淘宝/天猫/京东/拼多多，长按拷贝商品标题")]),o("v-uni-view",{staticClass:"help-tips color999"},[t._v("2、将商品标题粘贴到搜索框中进行搜索")]),o("v-uni-view",{staticClass:"help-tips color999 has-mgt-10"},[t._v('"全网超级搜"功能中的商品信息均来自于互联网')]),o("v-uni-view",{staticClass:"help-tips color999"},[t._v("商品准确信息请与商品所属店铺经营者沟通确认")])],1)],1)],1)],1)],1)},n=[];o.d(a,"b",(function(){return i})),o.d(a,"c",(function(){return n})),o.d(a,"a",(function(){return e}))},"8c7f":function(t,a,o){"use strict";o.r(a);var e=o("53e9"),i=o("27cd");for(var n in i)"default"!==n&&function(t){o.d(a,t,(function(){return i[t]}))}(n);o("4307");var r,d=o("f0c5"),s=Object(d["a"])(i["default"],e["b"],e["c"],!1,null,"55afa7b7",null,!1,e["a"],r);a["default"]=s.exports},ac56:function(t,a,o){"use strict";(function(t){var e=o("ee27");o("c975"),o("e25e"),o("ac1f"),o("1276"),Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var i=e(o("b3d4")),n={components:{simpleModal:i.default},onShareAppMessage:function(t){return{title:"购物先领券，一年省一半",path:"/pages/index/index"}},data:function(){return{placeholder:"输入关键字或粘贴宝贝标题",keywords:"",keywordlist:[],recentKeyword:[],copyTklStatus:"",localKeyword:"orange-tyh-keyword",current:0}},onShow:function(){this.recentKeyword=this.$queue.get(this.localKeyword)},onLoad:function(){var t=this;-1===window.location.href.indexOf("?invitation=")&&-1===window.location.href.indexOf("&invitation=")||(-1!==window.location.href.indexOf("?invitation=")?this.$queue.setData("relation",window.location.href.split("?invitation=")[1].split("&")[0]):(this.invitation=window.location.href.split("&invitation=")[1].split("&")[0],this.$queue.setData("relation",window.location.href.split("&invitation=")[1].split("&")[0]))),this.$Request.get("/api/hot_key/apikey/maxd").then((function(a){if(1===a.code){t.keywordlist=[];for(var o=0;o<a.data.length;o++)if(t.keywordlist.push(a.data[o]),18===o)break}else t.loadingType=2}));var a=this.$queue.getData("userId");a||this.$Request.getT("/user/"+a).then((function(a){0===a.status&&(t.$queue.setData("image_url",a.data.image_url),t.$queue.setData("mobile",a.data.phone),t.$queue.setData("nickName",a.data.nickName),t.$queue.setData("relation_id",a.data.relationId),t.$queue.setData("gender",parseInt(a.data.gender)))}))},methods:{goSearch:function(){uni.navigateTo({url:"/pages/search/search?keywords="+this.copyTklStatus}),this.$refs.simpleModalTkl.hide(),this.copyTklStatus="",uni.setClipboardData({data:"",success:function(t){uni.showToast({icon:"none",title:"搜索中",duration:1500})}})},clearInput:function(){this.keywords=""},navigateBack:function(){uni.navigateBack()},searchInput:function(t){this.keywords=t.detail.value},deleteKeyword:function(){this.recentKeyword=[],this.$queue.remove(this.localKeyword)},submitSearch:function(){var a=this.$queue.get(this.localKeyword);-1===JSON.stringify(a).indexOf(this.keywords)&&this.$queue.insert({key:this.localKeyword,value:{keyword:this.keywords},capacityNum:20});var o="";-1!=this.keywords.indexOf("&id=")&&(o=this.keywords.split("&id=")[1].split("&")[0]),-1!=this.keywords.indexOf("?id=")&&(o=this.keywords.split("?id=")[1].split("&")[0]),t("error",o," at pages/homeSearch/index.vue:183"),o?this.$queue.getData("relation_id")?uni.navigateTo({url:"/pages/detail/goodsinfo?itemid="+o+"&relation_id="+this.$queue.getData("relation_id")}):uni.navigateTo({url:"/pages/detail/goodsinfo?itemid="+o+"&relation_id="+this.$queue.getInvitation()}):uni.navigateTo({url:"/pages/search/search?keywords="+this.keywords})},swiperChange:function(t){this.current=t.detail.current},switchTab:function(t){this.current=t},addKeywords:function(t){this.keywords=this.keywordlist[t].keyword,uni.navigateTo({url:"/pages/search/search?keywords="+this.keywords})},addKeyword:function(a){this.keywords=a;var o="";-1!=a.indexOf("&id=")&&(o=a.split("&id=")[1].split("&")[0]),-1!=a.indexOf("?id=")&&(o=a.split("?id=")[1].split("&")[0]),t("error",o," at pages/homeSearch/index.vue:221"),o?this.$queue.getData("relation_id")?uni.navigateTo({url:"/pages/detail/goodsinfo?itemid="+o+"&relation_id="+this.$queue.getData("relation_id")}):uni.navigateTo({url:"/pages/detail/goodsinfo?itemid="+o+"&relation_id="+this.$queue.getInvitation()}):uni.navigateTo({url:"/pages/search/search?keywords="+this.keywords})}}};a.default=n}).call(this,o("0de9")["log"])},b3d4:function(t,a,o){"use strict";o.r(a);var e=o("bbc6"),i=o("c71d");for(var n in i)"default"!==n&&function(t){o.d(a,t,(function(){return i[t]}))}(n);var r,d=o("f0c5"),s=Object(d["a"])(i["default"],e["b"],e["c"],!1,null,"119a2da4",null,!1,e["a"],r);a["default"]=s.exports},bbc6:function(t,a,o){"use strict";var e,i=function(){var t=this,a=t.$createElement,o=t._self._c||a;return o("v-uni-view",{staticStyle:{"border-radius":"16upx"}},[o("v-uni-view",{staticClass:"modal-box",class:[t.isVisibility?"show":"",t.buttom?"bottom-modal":""],staticStyle:{"padding-right":"16px","padding-left":"16px"},on:{touchmove:function(a){a.stopPropagation(),a.preventDefault(),arguments[0]=a=t.$handleEvent(a),t.moveHandleStop.apply(void 0,arguments)},click:function(a){arguments[0]=a=t.$handleEvent(a),t.ClickMaskClose.apply(void 0,arguments)}}},[t.buttom?t._e():o("v-uni-view",{staticClass:"dialog",on:{click:function(a){a.stopPropagation(),arguments[0]=a=t.$handleEvent(a),t.contentClick.apply(void 0,arguments)}}},[o("v-uni-view",{class:t.contentClass},[t._t("default")],2),1==t.showConfirmButton||1==t.showCancelButton?o("v-uni-view",{staticClass:"simple-bar has-bordert"},[1==t.showCancelButton?o("v-uni-view",{staticClass:"action has-mg-0 flex-sub text-green",on:{click:function(a){a.stopPropagation(),arguments[0]=a=t.$handleEvent(a),t.handleClose.apply(void 0,arguments)}}},[t._v(t._s(t.cancelButtonText))]):t._e(),1==t.showConfirmButton?o("v-uni-view",{staticClass:"action has-mg-0 flex-sub has-borderl",on:{click:function(a){a.stopPropagation(),arguments[0]=a=t.$handleEvent(a),t.handleConfirm.apply(void 0,arguments)}}},[t._v(t._s(t.confirmButtonText))]):t._e()],1):t._e()],1),t.buttom?o("v-uni-view",{staticClass:"dialog",on:{click:function(a){a.stopPropagation(),arguments[0]=a=t.$handleEvent(a),t.contentClick.apply(void 0,arguments)}}},[1==t.showConfirmButton||1==t.showCancelButton?o("v-uni-view",{staticClass:"simple-bar has-bordert"},[1==t.showCancelButton?o("v-uni-view",{staticClass:"action is-black",on:{click:function(a){a.stopPropagation(),arguments[0]=a=t.$handleEvent(a),t.handleClose.apply(void 0,arguments)}}},[t._v(t._s(t.cancelButtonText))]):t._e(),1==t.showConfirmButton?o("v-uni-view",{staticClass:"action is-blue",on:{click:function(a){a.stopPropagation(),arguments[0]=a=t.$handleEvent(a),t.handleConfirm.apply(void 0,arguments)}}},[t._v(t._s(t.confirmButtonText))]):t._e()],1):t._e(),o("v-uni-view",{class:t.contentClass},[t._t("default")],2)],1):t._e()],1)],1)},n=[];o.d(a,"b",(function(){return i})),o.d(a,"c",(function(){return n})),o.d(a,"a",(function(){return e}))},c71d:function(t,a,o){"use strict";o.r(a);var e=o("23f5"),i=o.n(e);for(var n in e)"default"!==n&&function(t){o.d(a,t,(function(){return e[t]}))}(n);a["default"]=i.a},c8f9:function(t,a,o){var e=o("28b5");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var i=o("4f06").default;i("39a6315c",e,!0,{sourceMap:!1,shadowMode:!1})}}]);