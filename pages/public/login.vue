<template>
	<view class="container">
		<image @click="navBack" src="../../static/img/close.png" style="width: 32upx;height: 32upx;margin-left: 46upx;"></image>

		<view style="text-align: center;">
			<image style="width: 120upx;height: 120upx;margin-top: 140upx;border-radius:20upx" src="../../static/logo2.png"></image>
			<view style="font-size: 28upx;margin-top: 32upx">你的网购省钱专家</view>
			<button v-if="taobao" class="confirm-btn" @click="taobaoLogin">淘宝登录</button>
			<button v-if="!taobao && weixinLogin" class="confirm-btn" @click="weixinLo">微信登录</button>
			<!-- <button class="confirm-btn-weixin" @click="weixinLo">微信登录</button> -->

			<view style="margin-top: 32upx;text-align: center"><text style="color: #999999;font-size: 26upx;" @click="register()"> 手机号登录 </text></view>
			<!-- 底部信息 -->
			<view class="footer">
				<text>登录即代表同意</text>
				<!-- 协议地址 -->
				<navigator url="/pages/member/mimi" open-type="navigate">《隐私政策》</navigator>
				和
				<navigator url="/pages/member/xieyi" open-type="navigate">《用户服务协议》</navigator>
			</view>
		</view>
	</view>
</template>
<script>
	import {    mapState,mapMutations   } from 'vuex';
const Alibcsdk = uni.requireNativePlugin('UZK-Alibcsdk');
export default {
	data() {
		return {
			mobile: '',
			code: '',
			taobao: false,
			weixinLogin: true,
			sending: false,
			sendTime: '获取验证码',
			count: 60
		};
	},
	onLoad() {
		this.init();
		//微信登录开启
		this.$Request.getT('/common/type/53').then(res => {
			if (res.status == 0) {
				if (res.data && res.data.value && res.data.value == '是') {
					this.weixinLogin = true;
				}
			}
		});

		//淘宝登录开启
		this.$Request.getT('/common/type/52').then(res => {
			if (res.status == 0) {
				if (res.data && res.data.value && res.data.value == '是') {
					this.taobao = true;
				}
			}
		});
	},
	methods: {
		...mapMutations(['login']),
		weixinLo() {
			let that = this;
			uni.login({
				provider: 'weixin',
				success: function(loginRes) {
					that.$queue.showLoading('正在登录中...');
					console.error(loginRes.authResult);
					that.$queue.setData('weixinToken', loginRes.authResult.access_token);
					that.$queue.setData('unionid', loginRes.authResult.unionid);
					that.$queue.setData('weixinOpenid', loginRes.authResult.openid);
					
					//添加登录 
					that.$Request.postP('/logintarget',{
							log_type: "wechat_auth",
						    "username": "",
						    "password": "",
						    "unionid":loginRes.authResult.unionid,
						    "openid":loginRes.authResult.openid
					}).then(res => {
						console.log(res);
						console.log(res.status==="10000");
						if (res.status === 10000) {
							if (uni.getSystemInfoSync().platform == "android") {
							let clientid = plus.push.getClientInfo().clientid;
							that.$Request.postT('/user/updateClientId?clientId=' + clientid +'&userId=' + res.data.userId).then(res => {
								
							});
							}
							that.$queue.setData('token', res.data.uuid);
							that.$queue.setData('tokenP', res.data.access_token);
							that.$queue.setData('userId', res.data.userId); 
							that.$queue.setData('auth', res.data.auth); 
							that.$queue.setData('idcard', res.data.idCard); 
							that.$queue.setData('realName', res.data.realName); 
							 
							 
							 
							// console.log(res.data.access_token);
							that.getUserInfo(res.data.userId, res.data.uuid);
						} else {
							uni.hideLoading();
							uni.navigateTo({
								url: '/pages/public/wxmobile'
							});
						}
					});
					
					// that.$Request
					// 	.postJson('/user/loginApp', {
					// 		token: loginRes.authResult.access_token,
					// 		unionid: loginRes.authResult.unionid,
					// 		openid: loginRes.authResult.openid
					// 	})
					// 	.then(res => {
					// 		console.log(res);
					// 		if (res.status === 0) {
					// 			if (uni.getSystemInfoSync().platform == "android") {
					// 			let clientid = plus.push.getClientInfo().clientid;
					// 			that.$Request.postT('/user/updateClientId?clientId=' + clientid +'&userId=' + res.data.userId).then(res => {
									
					// 			});
					// 			}
					// 			that.$queue.setData('token', res.data.uuid);
					// 			that.$queue.setData('userId', res.data.userId); 
								
					// 			that.getUserInfo(res.data.userId, res.data.uuid);
					// 		} else {
					// 			uni.hideLoading();
					// 			uni.navigateTo({
					// 				url: '/pages/public/wxmobile'
					// 			});
					// 		}
					// 	});
				},
				fail(err) {
					console.log(err);
				}
			});
		},
		taobaoLogin() {
			Alibcsdk.login(result => {
				this.$queue.showLoading('正在登录中...');
				console.error(JSON.stringify(result));
				if (result.status) {
					this.$queue.setData('tbNick', result.data.nick);
					this.$queue.setData('tbopenid', result.data.openId);
					this.$queue.setData('tbImg', result.data.avatarUrl);
					this.$Request
						.postJson('/user/loginTb', {
							imageUrl: result.data.avatarUrl,
							nickName: result.data.nick,
							openid: result.data.openId
						})
						.then(res => {
							if (res.status === 0) {
								if (uni.getSystemInfoSync().platform == "android") {
									let clientid = plus.push.getClientInfo().clientid;
									this.$Request.postT('/user/updateClientId?clientId=' + clientid +'&userId=' + res.data.userId).then(res => {
										
									});
								}
								
								this.$queue.setData('token', res.data.uuid);
								this.$queue.setData('userId', res.data.userId);
								this.getUserInfo(res.data.userId, res.data.uuid);
							} else {
								uni.hideLoading();
								uni.navigateTo({
									url: '/pages/public/tbmobile'
								});
							}
						});
				}
			});
		},
		init() {
			Alibcsdk.init(result => {
				console.log(JSON.stringify(result));
			});//删掉 阿里百川注释的
			
			
			
			// Alibcsdk.logout(result => {
			// 	if (result.status) {
			// 		console.log('登出成功');
			// 	}
			// });
		},
		forget() {
			uni.navigateTo({
				url: '/pages/public/pwd'
			});
		},
		register() {
			uni.navigateTo({
				url: '/pages/public/loginphone'
			});
		},
		inputChange(e) {
			const key = e.currentTarget.dataset.key;
			this[key] = e.detail.value;
		},
		navBack() {
			uni.navigateBack();
		},

		toLogin() {
			this.$queue.loginClear();
			let openid = this.$queue.getData('openid');
			const { mobile, code } = this;
			if (!mobile && !code) {
				return;
			}
			this.$queue.showLoading('正在登录中...');
			this.$Request
				.postJson('/user/login', {
					pwd: code,
					phone: mobile,
					openid: openid
				})
				.then(res => {
					if (res.status === 0) {
						this.$queue.setData('token', res.data.uuid);
						this.$queue.setData('userId', res.data.userId);
						this.$queue.setData('mobile', mobile);
						this.getUserInfo(res.data.userId, res.data.uuid);
					} else {
						uni.hideLoading();
						uni.showModal({
							showCancel: false,
							title: '登录失败',
							content: res.msg
						});
					}
				});
		},
		getUserInfo(userId, token) {
			this.$Request.getT('/user/' + userId).then(res => {
				console.log(res);
				if (res.status === 0) {
					this.$queue.setData('image_url', res.data.image_url ? res.data.image_url : '/static/img/common/logo.jpg');
					this.$queue.setData('uid', res.data.id);
					this.$queue.setData('relation_id', res.data.relationId);
					this.$queue.setData('relation', res.data.invitation);
					this.$queue.setData('grade', res.data.grade);
					this.$queue.setData('mobile', res.data.phone);
					this.$queue.setData('phone', res.data.phone);
					this.$queue.setData('isInvitation', res.data.isInvitation);
					this.$queue.setData('nickName', res.data.nickName ? res.data.nickName : res.data.phone);
					this.$queue.setData('gender', parseInt(res.data.gender));
					// console.log(res);
					var params = {
						"username": res.data.phone,
						"password": '000000'
					} 
					console.log("登录方法json传参：" + JSON.stringify(params));
					let userdata = {
						userId :res.data.id ,
						userName :res.data.phone,
						mobile: res.data.phone,
					}; 
					this.login(res.data.phone);
					this.jpushIM.userLogin(params, (rem) => { 
						let href = this.$queue.getData('href');
						if (href) {
							if (href === '/pages/member/publisher') {
								this.$queue.remove('href');
								uni.redirectTo({
									url: '/pages/member/publisher?uid=' + userId + '&token=' + token
								});
							} else if (href === '/pages/member/user') {
								this.$queue.remove('href');
								uni.switchTab({
									url: '/pages/member/user'
								});
							} else {
								this.$queue.remove('href');
								uni.redirectTo({
									url: href
								});
							}
						} else {
							uni.switchTab({ url: '/pages/index/index' });
						} 
					}); 
				} else {
					uni.showModal({
						showCancel: false,
						title: '登录失败',
						content: res.msg
					});
					this.$queue.logout();
				}
				uni.hideLoading();
			});
		}
	}
};
</script>

<style lang="scss">
.footer {
	padding-left: 140upx;
	margin-top: 32upx;
	font-size: 24upx;
	color: #666666;
	text-align: center;
	display: flex;
}
page {
	background: #fff;
}

.send-msg {
	border-radius: 30px;
	color: black;
	background: white;
	height: 30px;
	font-size: 14px;
	line-height: 30px;
}

.container {
	top: 0;
	padding-top: 50px;
	position: relative;
	width: 100%;
	height: 100%;
	overflow: hidden;
	background: #fff;
}

.wrapper {
	position: relative;
	z-index: 90;
	background: #fff;
	padding-bottom: 20px;
}

.back-btn {
	position: absolute;
	left: 20px;
	z-index: 9999;
	padding-top: var(--status-bar-height);
	top: 20px;
	font-size: 20px;
	color: $font-color-dark;
}

.left-top-sign {
	font-size: 80px;
	color: $page-color-base;
	position: relative;
}

.right-top-sign {
	position: absolute;
	top: 40px;
	right: -15px;
	z-index: 95;

	&:before,
	&:after {
		display: block;
		content: '';
		width: 20px;
		height: 40px;
		background: #e10a07;
	}

	&:before {
		transform: rotate(50deg);
		border-radius: 0 50px 0 0;
	}

	&:after {
		position: absolute;
		right: -198px;
		top: 0;
		transform: rotate(-50deg);
		border-radius: 50px 0 0 0;
		/* background: pink; */
	}
}

.left-bottom-sign {
	position: absolute;
	left: -270px;
	bottom: -320px;
	/*border: 100upx solid #d0d1fd;*/
	border-radius: 50%;
	padding: 90px;
}

.welcome {
	position: relative;
	left: 30px;
	top: -55px;
	font-size: 28px;
	color: #555;
	text-shadow: 1px 0px 1px rgba(0, 0, 0, 0.3);
}

.input-content {
	padding: 0 20px;
}

.input-item {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	padding: 0 30px;
	background: $page-color-light;
	height: 64px;
	border-radius: 4px;
	margin-bottom: 30px;

	&:last-child {
		margin-bottom: 0;
	}

	.tit {
		height: 30px;
		line-height: 28px;
		font-size: $font-sm + 2upx;
		color: $font-color-base;
	}

	input {
		height: 40px;
		font-size: $font-base + 2upx;
		color: $font-color-dark;
		width: 100%;
	}
}
.confirm-btn-weixin {
	width: 200px;
	height: 42px;
	line-height: 42px;
	border-radius: 30px;
	margin-top: 40upx;
	background: -moz-linear-gradient(left, #f15b6c, #e10a07 100%);
	background: -webkit-gradient(linear, left top, left right, color-stop(0, #f15b6c), color-stop(100%, #e10a07));
	background: -webkit-linear-gradient(left, #f15b6c 0, #e10a07 100%);
	background: -o-linear-gradient(left, #f15b6c 0, #e10a07 100%);
	background: -ms-linear-gradient(left, #f15b6c 0, #e10a07 100%);
	background: linear-gradient(to left, #f15b6c 0, #e10a07 100%);
	color: #fff;
	font-size: $font-lg;

	&:after {
		border-radius: 60px;
	}
}
.confirm-btn {
	width: 200px;
	height: 42px;
	line-height: 42px;
	border-radius: 30px;
	margin-top: 300upx;
	background: -moz-linear-gradient(left, #f15b6c, #e10a07 100%);
	background: -webkit-gradient(linear, left top, left right, color-stop(0, #f15b6c), color-stop(100%, #e10a07));
	background: -webkit-linear-gradient(left, #f15b6c 0, #e10a07 100%);
	background: -o-linear-gradient(left, #f15b6c 0, #e10a07 100%);
	background: -ms-linear-gradient(left, #f15b6c 0, #e10a07 100%);
	background: linear-gradient(to left, #f15b6c 0, #e10a07 100%);
	color: #fff;
	font-size: $font-lg;

	&:after {
		border-radius: 60px;
	}
}

.confirm-btn1 {
	width: 300px;
	height: 42px;
	line-height: 42px;
	border-radius: 30px;
	margin-top: 40px;
	background: whitesmoke;
	color: grey;
	font-size: $font-lg;

	&:after {
		border-radius: 60px;
	}
}

.forget-section {
	font-size: $font-sm + 2upx;
	color: $font-color-spec;
	text-align: center;
	margin-top: 40px;
}

.register-section {
	left: 0;
	margin-top: 30px;
	bottom: 30px;
	width: 100%;
	font-size: $font-sm + 2upx;
	color: $font-color-base;
	text-align: center;

	text {
		color: $font-color-spec;
		margin-left: 10px;
	}
}
</style>
