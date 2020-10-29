<template>
	<view class="container">
		<view class="user-section">
			<view class="bg"></view>
			<view class="user-info-box">
				<view style="width: 24%" class="portrait-box" @click="goLogin">
					<image class="portrait" :src="image_url"></image>
				</view>
				<view style="text-align: left;margin-left: 12upx">
					<view class="info-box" @click="goLogin" style="margin-top: 16upx">
						<text v-if="mobile" class="username" style="color: #f7d680">{{ mobile ? mobile : '游客' }}</text>
					</view>
					<view style="display: flex;">
						<view
							v-if="isTuan == 1"
							style="margin-top: 12upx;font-size: 24upx;margin-left: 12upx;color: rgb(54, 52, 60);background: rgb(247, 214, 128);padding: 4upx 20upx;border-radius: 24upx;"
						>
							团长
						</view>
						<view
							@click="copyHref"
							v-if="relation_id"
							style="margin-top: 12upx;font-size: 24upx;margin-left: 12upx;color: rgb(54, 52, 60);background: rgb(247, 214, 128);padding: 4upx 20upx;border-radius: 24upx;"
						>
							邀请码：{{ relation_id }}
						</view>
					</view>
				</view>
			</view>
			<view class="vip-card-box">
				<view v-if="isEnable != '否'" class="b-btn" @click="copyTklWenAn">{{ des }}</view>
				<view class="tit" v-if="!relation_id">
					<text class="yticon icon-iLinkapp-" style="margin-right: 4upx;"></text>
					<text>会员购买商品享省钱+返现</text>
				</view>
				<view class="tit" v-else>
					<text>{{ dengji }}</text>
					<text style="margin-left: 24upx">{{ dengjides }}</text>
					<text
						@click="shengJiMethod"
						v-if="grade != '0.7' && isEnable != '否'&&dengjides"
						style="font-size: 24upx;margin-left: 16upx;color:#36343c;background: #f7d680;padding: 4upx 20upx;border-radius: 24upx"
					>
						<text>升级</text>
					</text>
				</view>
			</view>
		</view>

		<view class="cover-container">
			<view style="background: white;border-radius: 16upx;box-shadow: 0 2upx 20upx rgba(183, 183, 183, 0.3);margin-top: 16upx;">
				<list-cell title="我的订单" tips="查看全部订单" @eventClick="navToLogins('/pages/order/order?state=0')"></list-cell>
				<!-- <image class="arc" src="/static/arc.png"></image> -->
				<view class="tj-sction">
					<view class="tj-item" @click="shangyueyugu()">
						<text class="num">{{ lastjiesuan }} 元</text>
						<text>上月预估</text>
					</view>
					<view class="tj-item" @click="benyuejiesuan()">
						<text class="num">{{ jiesuan }} 元</text>
						<text>本月结算</text>
					</view>
					<view class="tj-item" @click="benyuefukuan()">
						<text class="num">{{ moneyAll }} 元</text>
						<text>本月预估</text>
					</view>
					<view class="tj-item" @click="jinridingdan()">
						<text class="num">{{ orderNum }} 笔</text>
						<text>今日订单</text>
					</view>
				</view>
			</view>
			<view style="color: grey;font-size: 12px;margin-top:8px;text-align: center" v-if="isEnable != '否'">
				每个月25号结算【上月预估】金额，建议26号进行提现
				<text class="yticon icon-xiaoxi" style="margin-left: 8px" @click="showMessage"></text>
			</view>
			<swiper
				v-if="messageList.length > 0"
				:autoplay="true"
				:vertical="true"
				:interval="5000"
				:circular="true"
				:indicator-dots="false"
				style="box-shadow: 0 3rpx 20rpx rgba(183, 183, 183, 0.3);height: 60upx;line-height: 60upx;margin-top: 16upx;background: #FFFFFF;border-radius: 12upx;padding-left: 32upx;"
			>
				<block v-for="(item1, index10) in messageList" :key="index10">
					<swiper-item style="height: 60upx;" @click="goWebView(item1)">
						<view>
							<image src="../../static/img/laba.png" style="width: 40upx;height: 40upx;"></image>
							<text>
								{{ item1.time }}
								<text style="margin-left: 16upx;margin-right: 16upx;">{{ item1.zhifubaoName }}</text>
								提现{{ item1.money }}元
							</text>
						</view>
					</swiper-item>
				</block>
			</swiper>
			<view style="background: white;border-radius: 16upx;margin-top: 16upx;box-shadow: 0 1px 10px rgba(183, 183, 183, 0.3);" v-if="0">
				<view class="tui-cell-header"><view class="tui-cell-title">我的资产</view></view>
				<view class="tj-sction">
					<view class="tj-item" @click="navToLogin('/pages/member/jifen')">
						<text class="num">{{ jifen }}分</text>
						<text>我的积分</text>
					</view>
					<view class="tj-item" @click="taunduishouyi()">
						<text class="num">{{ totalMoney }}元</text>
						<text>团队收益</text>
					</view>
					<view class="tj-item" @click="getMoneys()">
						<text class="num">{{ moneys }}元</text>
						<text>可提现金额</text>
					</view>
				</view>
			</view>

			<!-- <view class="tui-box tui-tool-box" @tap="href(7)"> -->
			<view class="tui-box tui-tool-box" >
				<view class="tui-cell-header"><view class="tui-cell-title">我的商城</view></view>
				<view class="tui-order-list tui-flex-wrap">
					<view class="tui-tool-item" @click="navToLogins('/pages/member/yaoqing')">
						<view class="tui-icon-box"><image src="../../static/img/my/team.png" class="tui-tool-icon"></image></view>
						<view class="tui-tool-text">商城团队</view>
					</view>
					<view class="tui-tool-item" @click="navToLogins('/pages/order/team')">
						<view class="tui-icon-box"><image src="../../static/img/my/teamOrder.png" class="tui-tool-icon"></image></view>
						<view class="tui-tool-text">团队订单</view>
					</view>
					<view class="tui-tool-item" @click="taunduishouyi()">
						<view class="tui-icon-box"><image src="../../static/img/my/icon_fanxian.png" class="tui-tool-icon"></image></view>
						<view class="tui-tool-text">团队收益</view>
					</view>
					<view class="tui-tool-item" @click="navTo('/pages/footer/like')">
						<view class="tui-icon-box"><image src="../../static/img/my/icon_gift.png" class="tui-tool-icon"></image></view>
						<view class="tui-tool-text">我的收藏</view>
					</view>
					<view class="tui-tool-item" @click="navTo('/pages/footer/index')">
						<view class="tui-icon-box"><image src="../../static/img/my/icon_kaipiao.png" class="tui-tool-icon"></image></view>
						<view class="tui-tool-text">我的足迹</view>
					</view>
					<view class="tui-tool-item" @click="navToLogins('/pages/member/jifen')">
						<view class="tui-icon-box"><image src="../../static/img/my/jifen.png" class="tui-tool-icon"></image></view>
						<view class="tui-tool-text">我的积分</view>
					</view>
					<view class="tui-tool-item" @click="shengJiMethod">
						<view class="tui-icon-box"><image src="../../static/img/send.png" class="tui-tool-icon"></image></view>
						<view class="tui-tool-text">商城等级</view>
					</view>
					<view class="tui-tool-item" @click="getMoneys()">
						<view class="tui-icon-box"><image src="../../static/img/my/icon_zhihuan.png" class="tui-tool-icon"></image></view>
						<view class="tui-tool-text">商城提现</view>
					</view>
				</view>
			</view>
			<view class="tui-box tui-tool-box" >
				<view class="tui-cell-header"><view class="tui-cell-title">收款常用工具</view></view>
				<view class="tui-order-list tui-flex-wrap">
					<view class="tui-tool-item" @click="navToLogins('/pages/member/mycard-entrance',1)" v-if="shoukuan">
						<view class="tui-icon-box"><image src="../../static/img/my/kabao.png" class="tui-tool-icon"></image></view>
						<view class="tui-tool-text">我的卡包</view>
					</view>
					<view class="tui-tool-item" @click="navToLogins('/pages/Transactions/Transactions',1)" v-if="shoukuan">
						<view class="tui-icon-box"><image src="../../static/img/my/icon_kaipiao.png" class="tui-tool-icon"></image></view>
						<view class="tui-tool-text">刷卡记录</view>
					</view>
					<view class="tui-tool-item" @click="navToLogins('/pages/authen/authen',1)" v-if="shoukuan">
						<view class="tui-icon-box"><image src="../../static/img/my/shiming.png" class="tui-tool-icon"></image></view>
						<view class="tui-tool-text">实名认证</view>
					</view>
					<view class="tui-tool-item" @click="navToLogins('/pages/member/yao')" v-if="shoukuan">
						<view class="tui-icon-box"><image src="../../static/img/my/yaoqing.png" class="tui-tool-icon"></image></view>
						<view class="tui-tool-text">邀请赚钱</view>
					</view>
					<view class=" tui-tool-item" @click="navToLogin('/pages/member/message')">
						<view class="tui-icon-box"><image src="../../static/img/my/message.png" class="tui-tool-icon"></image></view>
						<view class="tui-tool-text">消息中心</view>
					</view>
					<view class=" tui-tool-item" @click="navToLogin('/pages/member/account',1)">
						<view class="tui-icon-box"><image src="../../static/img/my/anquans.png" class="tui-tool-icon"></image></view>
						<view class="tui-tool-text">账户安全</view>
					</view>
					<view class="tui-tool-item" @click="navTo('/pages/set/set')">
						<view class="tui-icon-box"><image src="../../static/img/my/set.png" class="tui-tool-icon"></image></view>
						<view class="tui-tool-text">设置中心</view>
					</view>
					<view class=" tui-tool-item" @click="navTo('/pages/member/customer',1)">
						<view class="tui-icon-box"><image src="../../static/img/my/icon_kefu.png" class="tui-tool-icon"></image></view>
						<view class="tui-tool-text">联系客服</view>
					</view>
				</view>
			</view>
			<view class="tui-box tui-tool-box" v-if="0">
				<view class="tui-cell-header"><view class="tui-cell-title">常用工具</view></view>
				<view class="tui-order-list tui-flex-wrap">
					<view class="tui-tool-item" @click="navToLogins('/pages/member/mycard-entrance')">
						<view class="tui-icon-box"><image src="../../static/img/my/kabao.png" class="tui-tool-icon"></image></view>
						<view class="tui-tool-text">我的卡包</view>
					</view>
					<view class="tui-tool-item" @click="navToLogins('/pages/Transactions/Transactions')">
						<view class="tui-icon-box"><image src="../../static/img/my/icon_kaipiao.png" class="tui-tool-icon"></image></view>
						<view class="tui-tool-text">刷卡记录</view>
					</view>
					<view class="tui-tool-item" @click="navToLogins('/pages/authen/authen')">
						<view class="tui-icon-box"><image src="../../static/img/my/shiming.png" class="tui-tool-icon"></image></view>
						<view class="tui-tool-text">实名认证</view>
					</view>
					<view class=" tui-tool-item" @click="navToLogin('/pages/member/account')">
						<view class="tui-icon-box"><image src="../../static/img/my/anquans.png" class="tui-tool-icon"></image></view>
						<view class="tui-tool-text">账户安全</view>
					</view>
					<view class="tui-tool-item" @click="navToLogins('/pages/member/yaoqing')">
						<view class="tui-icon-box"><image src="../../static/img/my/team.png" class="tui-tool-icon"></image></view>
						<view class="tui-tool-text">我的团队</view>
					</view>
					<view class="tui-tool-item" @click="navToLogins('/pages/order/team')">
						<view class="tui-icon-box"><image src="../../static/img/my/teamOrder.png" class="tui-tool-icon"></image></view>
						<view class="tui-tool-text">团队订单</view>
					</view>
					<view class="tui-tool-item" @click="navTo('/pages/footer/like')">
						<view class="tui-icon-box"><image src="../../static/img/my/icon_gift.png" class="tui-tool-icon"></image></view>
						<view class="tui-tool-text">我的收藏</view>
					</view>
					<view class="tui-tool-item" @click="navToLogins('/pages/member/yao')">
						<view class="tui-icon-box"><image src="../../static/img/my/yaoqing.png" class="tui-tool-icon"></image></view>
						<view class="tui-tool-text">邀请赚钱</view>
					</view>
					<view class="tui-tool-item" @click="navTo('/pages/footer/index')">
						<view class="tui-icon-box"><image src="../../static/img/my/icon_kaipiao.png" class="tui-tool-icon"></image></view>
						<view class="tui-tool-text">我的足迹</view>
					</view>
					<view class=" tui-tool-item" @click="navToLogin('/pages/member/message')">
						<view class="tui-icon-box"><image src="../../static/img/my/message.png" class="tui-tool-icon"></image></view>
						<view class="tui-tool-text">消息中心</view>
					</view>
					<view class=" tui-tool-item" @click="navTo('/pages/member/customer')">
						<view class="tui-icon-box"><image src="../../static/img/my/icon_kefu.png" class="tui-tool-icon"></image></view>
						<view class="tui-tool-text">联系客服</view>
					</view>
					<view class="tui-tool-item" @click="navToLogins('/pages/member/jifen')">
						<view class="tui-icon-box"><image src="../../static/img/my/jifen.png" class="tui-tool-icon"></image></view>
						<view class="tui-tool-text">我的积分</view>
					</view>
					<view class=" tui-tool-item" @click="navTo('/pages/feedback')">
						<view class="tui-icon-box"><image src="../../static/img/my/feedback.png" class="tui-tool-icon"></image></view>
						<view class="tui-tool-text">意见反馈</view>
					</view>
					<!-- <view class=" tui-tool-item" @click="navTo('/pages/member/help')">
						<view class="tui-icon-box"><image src="../../static/img/my/help.png" class="tui-tool-icon"></image></view>
						<view class="tui-tool-text">帮助中心</view>
					</view> -->
					<view class="tui-tool-item" @click="navTo('/pages/set/set')">
						<view class="tui-icon-box"><image src="../../static/img/my/set.png" class="tui-tool-icon"></image></view>
						<view class="tui-tool-text">设置</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import listCell from '../../components/mix-list-cell';
import wmPosters from '@/components/wm-poster/wm-posters.vue';
export default {
	components: {
		listCell,
		wmPosters
	},
	data() {
		return {
			modalName: '',
			couponlist: [],
			des: '会员申请',
			coverTransform: 'translateY(0px)',
			coverTransition: '0s',
			mobile: '',
			relation_id: '',
			jifen: '0',
			image_url: '/static/logo.png',
			gender: '',
			isTuan: 0,
			moneyAll: '0',
			moneys: '0',
			messageList: [],
			jiesuan: '0',
			grade: '',
			phone: '',
			dengji: '',
			dengjides: '',
			lastjiesuan: '0',
			lastMoneyAll: '0',
			orderNum: '0',
			orderMonthNum: '0',
			totalMoney: '0',
			isInvitation: 0,
			moving: false,
			isEnable: '否',
			itemendprice: '识别二维码免费领取',
			itemtitle: '',
			totalMoney1: '0',
			itemprice: '',
			erweima: '',
			itempic: '',
			footprintKey: 'orange-sqx-footprint',
			shoukuan:true 
		};
	},

	onLoad() {
		let a = this.$queue.getData('isEnable');
		if (a) {
			this.isEnable = a;
		}
		//console.log(a);
		//console.log(this.isEnable);
		let userId = this.$queue.getData('userId');
		if (userId) {
			this.getUserInfo(userId);
		}
		//#ifdef H5
		if (window.location.href.indexOf('?invitation=') !== -1 || window.location.href.indexOf('&invitation=') !== -1) {
			if (window.location.href.indexOf('?invitation=') !== -1) {
				this.$queue.setData('relation', window.location.href.split('?invitation=')[1].split('&')[0]);
			} else {
				this.invitation = window.location.href.split('&invitation=')[1].split('&')[0];
				this.$queue.setData('relation', window.location.href.split('&invitation=')[1].split('&')[0]);
			}
		}
		//#endif
		
		this.$Request.postP('/cashBagShow', {}).then(res => {
			console.log(res.status)
			//this.shoukuan = res.status==0?false:true
		});
	},
	onShow() {
		let mobile = this.$queue.getData('nickName');
		this.phone = this.$queue.getData('mobile');
		let image_url = this.$queue.getData('image_url');
		let gender = this.$queue.getData('gender');

		if (mobile && mobile !== 'undefined') {
			this.mobile = mobile;
		} else {
			this.mobile = '';
		}
		if (image_url && image_url !== 'undefined') {
			this.image_url = image_url;
		} else {
			this.image_url = '/static/img/common/logo.jpg';
		}
		if (gender) {
			this.gender = gender;
		}
		let relation_id = this.$queue.getData('relation_id');
		if (relation_id && relation_id !== 'undefined') {
			this.des = '我的特权';
			this.relation_id = relation_id;
		} else {
			this.des = '会员申请';
			this.relation_id = '';
		}

		let userId = this.$queue.getData('userId');
		if (userId) {
			this.getCashList();
			this.getMoney();
			this.getUserInfo(userId);
			this.couponlist = this.$queue.get(this.footprintKey);
			this.$Request.getT('/cash/money/' + userId).then(res => {
				if (res.status === 0 && res.data) {
					this.moneys = parseFloat(res.data).toFixed(2);
				} else {
					this.moneys = '0';
				}
			});
		} else {
			this.isTuan=0;
			this.totalMoney = '0';
			this.orderNum = '0';
			this.moneys = '0';
			this.moneyAll = '0';
			this.lastjiesuan = '0';
			this.lastMoneyAll = '0';
			this.orderMonthNum = '0';
			this.jiesuan = '0';
			this.jifen = '0';
		}
	},

	methods: {
		getCashList() {
			//获取用户提现
			this.$Request.getT('/statistics/getCashList/0/10').then(res => {
				if (res.status == 0 && res.data) {
					let index = 1;
					res.data.content.forEach(d => {
						if (index == 12) {
							index = 4;
						}
						if (index == 8) {
							index = 3;
						}
						if (index == 6) {
							index = 2;
						}
						index = index + index;
						d.zhifubaoName = d.zhifubaoName.substring(0, 1) + '**';
						d.time = '刚刚';
						this.messageList.push(d);
					});
				}
				uni.hideLoading();
			});
		},
		//升级规则弹框
		shengJiMethod() {
			uni.navigateTo({
				url: '/pages/member/yao'
			});
		},
		//邀请码复制
		copyHref() {
			uni.setClipboardData({
				data: this.relation_id,
				success: r => {
					this.$queue.showToast('邀请码复制成功');
				}
			});
		},
		//获取用户信息
		getUserInfo(userId) {
			this.$Request.getT('/user/' + userId).then(res => {
				if (res.status === 0) {
					if (res.data.orderJifen) {
						this.jifen = parseFloat(res.data.orderJifen).toFixed(0);
					}
					this.$queue.setData('image_url', res.data.image_url);
					this.$queue.setData('relation_id', res.data.relationId);
					this.$queue.setData('nickName', res.data.nickName);
					this.$queue.setData('isInvitation', res.data.isInvitation);
					if (res.data.isTuan) {
						this.isTuan = parseInt(res.data.isTuan);
					}
					if (res.data.gradeDes) {
						this.dengji = res.data.gradeDes;
					} else {
						this.dengji = 'VIP 0';
					}
					if (res.data.gradeNumber) {
						if (res.data.gradeNumber == '还可邀请0人') {
							this.dengjides = '已到达最高等级';
						} else {
							this.dengjides = res.data.gradeNumber;
						}
					} else {
						this.dengjides = '还可邀请10人';
					}
					this.grade = res.data.grade;
					this.isInvitation = res.data.isInvitation;
					this.$queue.setData('relation', res.data.invitation);
					this.$queue.setData('gender', parseInt(res.data.gender));
					this.gender = parseInt(res.data.gender);
					if (res.data.image_url) {
						this.image_url = res.data.image_url;
					} else {
						this.image_url = '/static/img/common/logo.jpg';
					}
					if (res.data.relationId) {
						this.relation_id = res.data.relationId;
						this.des = '我的特权';
					} else {
						this.relation_id = '';
						this.des = '会员申请';
					}
					if (res.data.nickName) {
						this.mobile = res.data.nickName;
					} else {
						this.mobile = res.data.phone;
					}
				} else {
					this.$queue.logout();
					uni.showModal({
						title: '用户信息提示',
						content: '本地用户信息失效需要重新授权登录',
						showCancel: false,
						success: e => {
							//#ifdef H5
							if (e.confirm) {
								window.location.reload();
							} else {
								window.location.reload();
							}
							//#endif
							//#ifndef H5
							this.navTo('/pages/public/login');
							//#endif
						}
					});
				}
			});
		},

		//会员申请弹框
		copyTklWenAn: function() {
			let relation_id = this.$queue.getData('relation_id');
			let token = this.$queue.getData('token');
			let userId = this.$queue.getData('userId');
			let gradle = this.$queue.getData('gradle');
			if (!token) {
				this.goLoginInfo();
			} else {
				if (!relation_id) {
					this.navTo('/pages/member/publisher?uid=' + userId + '&token=' + token);
				} else {
					uni.showModal({
						cancelText: '关闭',
						confirmColor:'#e10a07',
						cancelColor:'#999999',
						confirmText: '我要升级',
						showCancel: true,
						title: '我的特权',
						content:
							'1、享受 ' +
							this.dengji +
							'级返现！\n2、购买商品可享受省钱 +返现！\n3、分享商品给好友购买拿返现金额！\n4、邀好友加入享受永久粉丝提成！\n5、享受积分免费兑换商品;\n6、可生成专属商城推广链接;\n7、更多会员特权我们将陆续上线！\n注：VIP越高返现越高哦',
						success: res => {
							if (res.confirm) {
								this.shengJiMethod();
							}
						}
					});
				}
			}
		},
		//获取付款收入查询
		getMoney() {
			let that = this;
			let token = this.$queue.getData('token');
			let relation_id = this.$queue.getData('relation_id');
			if (token && relation_id && relation_id !== 'undefined') {
				//团队本月付款收入
				var date = new Date();
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var day = date.getDate();
				if (month < 10) {
					month = '0' + month;
				}
				if (day < 10) {
					day = '0' + day;
				}
				var month1 = date.getMonth();
				var nowDate = year + '-' + month;
				if (month1 < 10) {
					month1 = '0' + month1;
				}
				var lastDate = year + '-' + month1;
				this.$Request.getT('/statistics/TeamOrderTotalByRelation?relation=' + relation_id + '&tk_status=12&time=' + nowDate).then(res => {
					if (res.status === 0 && res.data) {
						let totalMoney = parseFloat(res.data).toFixed(2);
						this.$Request.getT('/statistics/TeamOrderTotalByRelation?relation=' + relation_id + '&tk_status=3&time=' + nowDate).then(res => {
							if (res.status === 0 && res.data) {
								this.totalMoney = (parseFloat(res.data) + parseFloat(totalMoney)).toFixed(2);
							} else {
								this.totalMoney = '0';
							}

							uni.hideLoading();
						});
					} else {
						this.totalMoney = '0';
					}

					uni.hideLoading();
				});

				//预估本月付款收入查询
				this.$Request.getT('/order/count?relation_id=' + relation_id + '&tk_status=12').then(res => {
					if (res.status === 0 && res.data) {
						that.moneyAll = parseFloat(res.data).toFixed(2);
					} else {
						that.moneyAll = '0';
					}
				});
				//预估本月结算查询
				this.$Request.getT('/order/count?relation_id=' + relation_id + '&tk_status=3').then(res => {
					if (res.status === 0 && res.data) {
						that.jiesuan = parseFloat(res.data).toFixed(2);
					} else {
						that.jiesuan = '0';
					}
				});

				//预估上月结算查询
				this.$Request.getT('/order/last/count?relation_id=' + relation_id + '&tk_status=3').then(res => {
					if (res.status === 0 && res.data) {
						that.lastjiesuan = parseFloat(res.data).toFixed(2);
					} else {
						that.lastjiesuan = '0';
					}
					this.$Request.getT('/statistics/TeamOrderTotalByRelation?relation=' + relation_id + '&tk_status=3&time=' + lastDate).then(res => {
						if (res.status === 0 && res.data) {
							this.lastjiesuan = (parseFloat(res.data) + parseFloat(this.lastjiesuan)).toFixed(2);
						} else {
							this.lastjiesuan = '0';
						}

						uni.hideLoading();
					});
				});
				//今日付款订单数
				this.$Request.getT('/order/paidCount/' + relation_id).then(res => {
					if (res.status === 0 && res.data) {
						that.orderNum = res.data;
					} else {
						that.orderNum = '0';
					}
				});
			} else {
				that.totalMoney = '0';
				that.orderNum = '0';
				that.moneys = '0';
				that.moneyAll = '0';
				that.lastjiesuan = '0';
				that.lastMoneyAll = '0';
				that.orderMonthNum = '0';
				that.jiesuan = '0';
			}
		},
		//立即提现
		getMoneys() {
			let token = this.$queue.getData('token');
			if (token) {
				this.navTo('/pages/member/cash');
			} else {
				this.goLoginInfo();
			}
		},
		//结算弹框
		showMessage() {
			uni.showModal({
				showCancel: false,
				title: '结算提示',
				confirmColor:'#e10a07',
				content:
					'每个月25号结算上月【确认收货】的订单，结算完成后【可提现金额】才会同步更新金额。因结算订单量大，结算时间会较长，结算会在25号晚上完成，建议您26号进行提现。\n举例：5月份确认收货订单，6月25号才会进行结算，以此类推'
			});
		},
		//上月预估收入弹框
		shangyueyugu() {
			uni.showModal({
				showCancel: false,
				confirmColor:'#e10a07',
				title: '上月预估收入说明',
				content: '上月个人【确认收货】和团队【确认收货】订单的佣金收入\n本月25号结算'
			});
		},
		//团队收益
		taunduishouyi() {
			uni.showModal({
				showCancel: false,
				confirmColor:'#e10a07',
				title: '团队收益说明',
				content: '本月团队【确认收货】和【已付款】订单的佣金收入！下月25号结算'
			});
		},
		//积分说明弹框
		jifenDes() {
			uni.showModal({
				showCancel: false,
				title: '积分说明',
				content: '优财宝中累计付款金额，积分到达一定数量可免费兑换商品'
			});
		},
		//本月结算收入弹框
		benyuejiesuan() {
			uni.showModal({
				showCancel: false,
				confirmColor:'#e10a07',
				title: '本月结算收入说明',
				content: '本月【确认收货】订单的佣金收入\n下月25号结算'
			});
		},
		//本月付款收入说明弹框
		benyuefukuan() {
			uni.showModal({
				showCancel: false,
				confirmColor:'#e10a07',
				title: '本月预估收入说明',
				content: '本月【已付款】订单的佣金收入\n用户付款未确认收货的订单'
			});
		},
		//今日订单说明弹框
		jinridingdan() {
			uni.showModal({
				showCancel: false,
				confirmColor:'#e10a07',
				title: '今日订单说明',
				content: '今日用户【已付款】的订单笔数'
			});
		},
		/**
		 * 统一跳转接口,拦截未登录路由
		 * navigator标签现在默认没有转场动画，所以用view
		 */
		navTo(url) {
			// console.log(url);
			if (url === '/pages/member/help') {
				//#ifdef H5
				window.location.href = this.$queue.publicYuMing() + '/help/custom.html';
				//#endif
				//#ifdef APP-PLUS
				uni.navigateTo({
					url: '/pages/member/webview?url=' + this.$queue.publicYuMing() + '/help/custom.html'
				});
				//#endif
			} else {
				// console.log(url);
				uni.navigateTo({
					url:url
				});
			}
		},
		//订单详情跳转
		navToOrder(itemid) {
			let relation_id = this.$queue.getData('relation_id');
			if (relation_id && relation_id !== 'undefined') {
				uni.navigateTo({
					url: '/pages/detail/goodsinfo?itemid=' + itemid + '&relation_id=' + relation_id
				});
			} else {
				uni.navigateTo({
					url: '/pages/detail/goodsinfo?itemid=' + itemid
				});
			}
		},

		downApp() {
			let token = this.$queue.getData('token');
			if (token) {
				let userId = this.$queue.getData('userId');
				this.$Request.getT('/user/' + userId).then(res => {
					if (res.status === 0 && res.data.phone) {
						if (res.data.relationId) {
							uni.showModal({
								showCancel: false,
								title: '下载提示',
								confirmText: '立即安装',
								content: '客户端安装密码为123456',
								success: res => {
									if (res.confirm) {
										window.location.href = this.$queue.getAppDownUrl();
									}
								}
							});
						} else {
							uni.showModal({
								showCancel: true,
								title: '温馨提示',
								cancelText: '关闭',
								confirmText: '开通会员',
								content: '此功能为会员专享功能\n申请成为会员后可使用',
								success: res => {
									if (res.confirm) {
										this.copyTklWenAn();
									}
								}
							});
						}
					} else {
						uni.navigateTo({
							url: '/pages/public/mobile'
						});
					}
				});
			} else {
				this.goLoginInfo();
			}
		},

		/**
		 * 统一跳转接口,拦截未登录路由
		 * navigator标签现在默认没有转场动画，所以用view
		 */
		navToLogin(url) {
			let token = this.$queue.getData('token');
			let mobile = this.$queue.getData('mobile');
			let userId = this.$queue.getData('userId');
			if (token) {
				this.$Request.getT('/user/' + userId).then(res => {
					if (res.status === 0 && res.data.phone) {
						uni.navigateTo({
							url
						});
					} else {
						uni.navigateTo({
							url: '/pages/public/mobile'
						});
					}
				});
			} else {
				this.goLoginInfo();
			}
		},
		//统一登录跳转
		goLoginInfo() {
			this.$queue.setData('href', '/pages/member/user');
			//#ifdef H5
			uni.navigateTo({
				url: '/pages/member/register'
			});
			//#endif
			//#ifndef H5
			uni.navigateTo({
				url: '/pages/public/login'
			});
			//#endif
		},
		navToLogins(url,without_login = 0) {
			if(without_login){
				uni.navigateTo({
					url
				});
				return
			}
			let token = this.$queue.getData('token');
			if (token) {
				let relation_id = this.$queue.getData('relation_id');
				if (relation_id) {
					uni.navigateTo({
						url
					});
				} else {
					uni.showModal({
						showCancel: true,
						title: '温馨提示',
						confirmColor:'#e10a07',
						cancelText:'#999999',
						cancelText: '关闭',
						confirmText: '开通会员',
						content: '此功能为会员专享功能\n申请成为会员后可使用',
						success: res => {
							if (res.confirm) {
								this.copyTklWenAn();
							}
						}
					});
				}
			} else {
				this.goLoginInfo();
			}
		},

		goLogin(url) {
			let token = this.$queue.getData('token');
			if (!token) {
				this.goLoginInfo();
			}
		}
	}
};
</script>
<style lang="scss" scoped>
page {
	background: #f8f8f8;
}

.tui-order-text,
.tui-tool-text {
	font-size: 26rpx;
	font-weight: 400;
	color: #666;
	padding-top: 4rpx;
}

.tui-tool-text {
	font-size: 24rpx;
}

.tui-order-list {
	width: 100%;
	height: 134rpx;
	padding: 0 30rpx;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	// justify-content: space-between;
	justify-content: flex-start;
}

.tui-order-item {
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.tui-box {
	width: 100%;
	background: #fff;
	box-shadow: 0 3rpx 20rpx rgba(183, 183, 183, 0.3);
	border-radius: 10rpx;
	overflow: hidden;
}

.tui-cell-header {
	width: 100%;
	height: 74rpx;
	padding: 0 26rpx;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.tui-cell-title {
	font-size: 30rpx;
	line-height: 30rpx;
	font-weight: 600;
	color: #333;
}

.tui-tool-box {
	margin-top: 20rpx;
}

.tui-flex-wrap {
	flex-wrap: wrap;
	height: auto;
	padding-bottom: 30rpx;
}

.tui-tool-item {
	width: 25%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding-top: 30rpx;
}

.tui-tool-icon {
	width: 60rpx;
	height: 60rpx;
	display: block;
	padding: 4upx;
}

.tui-badge-icon {
	width: 66rpx;
	height: 30rpx;
	position: absolute;
	right: 0;
	transform: translateX(88%);
	top: -15rpx;
}

%flex-center {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

%section {
	display: flex;
	justify-content: space-around;
	align-content: center;
	background: #fff;
	border-radius: 10px;
}

.tixian {
	background: -moz-linear-gradient(left, #f15b6c, #e10a07 100%);
	background: -webkit-gradient(linear, left top, left right, color-stop(0, #f15b6c), color-stop(100%, #e10a07));
	background: -webkit-linear-gradient(left, #f15b6c 0, #e10a07 100%);
	background: -o-linear-gradient(left, #f15b6c 0, #e10a07 100%);
	background: -ms-linear-gradient(left, #f15b6c 0, #e10a07 100%);
	background: linear-gradient(to left, #f15b6c 0, #e10a07 100%);
}

.user-section {
	margin-top: -20upx;
	height: 400upx;
	padding: 50upx 50upx 0;
	position: relative;

	.bg {
		background: -webkit-linear-gradient(left, #e10a07 0, #f15b6c 100%);
		background: -o-linear-gradient(left, #e10a07 0, #f15b6c 100%);
		background: -ms-linear-gradient(left, #e10a07 0, #f15b6c 100%);
		background: -webkit-gradient(linear, right top, left top, color-stop(0, #e10a07), to(#f15b6c));
		background: -o-linear-gradient(right, #e10a07 0, #f15b6c 100%);
		background: linear-gradient(to left, #e10a07 0, #f15b6c 100%);
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		filter: blur(1px);
	}
}

.user-info-box {
	height: 100px;
	display: flex;
	align-items: center;
	position: relative;
	z-index: 1;

	.portrait {
		width: 140upx;
		height: 140upx;
		border-radius: 50%;
	}

	.username {
		font-size: 16px;
		color: #f2f2f2;
		margin-top: 16px;
		margin-left: 10px;
	}

	.username1 {
		font-size: 14px;
		color: whitesmoke;
		margin-top: 16px;
		margin-left: 10px;
	}
}

.vip-card-box {
	display: flex;
	flex-direction: column;
	color: #f7d680;
	height: 360upx;
	background: linear-gradient(left, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8));
	border-radius: 24upx 32upx 0 0;
	overflow: hidden;
	position: relative;
	padding: 40upx 28upx;

	.card-bg {
		position: absolute;
		top: 40upx;
		right: 0;
		width: 440upx;
		height: 320upx;
	}

	.b-btn {
		position: absolute;
		right: 20upx;
		top: 32upx;
		width: 160upx;
		height: 60upx;
		text-align: center;
		line-height: 60upx;
		font-size: 28upx;
		color: #36343c;
		border-radius: 32upx;
		background: linear-gradient(left, #f9e6af, #ffd465);
		z-index: 1;
	}

	.tit {
		font-size: 14px;
		color: #f7d680;
		margin-bottom: 16px;
	}
}

.cover-container {
	padding: 0 28upx;
	position: relative;
	margin-top: -44upx;
	padding-bottom: 24upx;

	.arc {
		position: absolute;
		left: 0;
		top: -17px;
		width: 100%;
		height: 22px;
	}
}

.tj-sction {
	@extend %section;

	.tj-item {
		@extend %flex-center;
		flex-direction: column;
		height: 80px;
		font-size: $font-sm;
		color: #75787d;
	}

	.num {
		font-size: $font-lg;
		color: $font-color-dark;
		margin-bottom: 8px;
	}
}

.order-section {
	@extend %section;
	padding: 16px 0;
	margin-top: 12px;

	.order-item {
		@extend %flex-center;
		width: 70px;
		height: 70px;
		border-radius: 10px;
		font-size: $font-sm;
		color: $font-color-dark;
	}

	.yticon {
		font-size: 24px;
		margin-bottom: 12px;
		color: #fa436a;
	}

	.icon-shouhoutuikuan {
		font-size: 22px;
	}
}

.history-section {
	padding: 16px 0 0;
	margin-top: 12px;
	background: #fff;
	border-radius: 10px;

	.sec-header {
		display: flex;
		align-items: center;
		font-size: $font-base;
		color: $font-color-dark;
		line-height: 22px;
		margin-left: 15px;

		.yticon {
			font-size: 22px;
			color: #5eba8f;
			margin-right: 10px;
			line-height: 20px;
		}
	}

	.h-list {
		white-space: nowrap;
		padding: 15px 15px 0;

		image {
			display: inline-block;
			width: 100px;
			height: 100px;
			margin-right: 12px;
			border-radius: 10px;
		}
	}
}
</style>
