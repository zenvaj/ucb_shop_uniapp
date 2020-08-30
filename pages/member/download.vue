<template>
	<view class="container">
		<view style="text-align: center;">
			<image style="width: 120upx;height: 120upx;margin-top: 140upx;border-radius:20upx" src="../../static/logo2.png"></image>
			<view style="font-size: 28upx;margin-top: 32upx">你的网购省钱专家</view>
			<button class="confirm-btn" @click="taobaoLogin">优财宝APP下载</button>
			<view style="margin-top: 32upx;text-align: center"><text style="color: #999999;font-size: 26upx;">下载优财宝APP邀请码填写</text></view>
			<view style="color: #e10a07;margin-top: 16upx;">{{ relationId }}</view>
		</view>
		<view id="shareit" v-if="show_share" @tap="closeShare">
			<image class="arrow" src="../../static/img/jiant.png"></image>
			<view id="follow">点击右上角按钮，选择浏览器打开下载！</view>
		</view>
	</view>
</template>
<script>
const Alibcsdk = uni.requireNativePlugin('UZK-Alibcsdk');
export default {
	data() {
		return {
			mobile: '',
			code: '',
			show_share: false,
			relationId: '',
			sending: false,
			sendTime: '获取验证码',
			count: 60
		};
	},
	onLoad(e) {
		if (e.relationId) {
			this.relationId = e.relationId;
		} else {
			this.relationId = this.$queue.getInvitation();
		}
		this.init();
	},
	methods: {
		closeShare() {
			this.show_share = false;
		},
		taobaoLogin() {
			uni.setClipboardData({
				data: this.relationId,
				success: r => {
					this.$queue.showToast('邀请码复制成功');
				}
			});
			var u = navigator.userAgent;
			if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) {
				this.$Request.getT('/common/type/49').then(res => {
					if (res.status == 0) {
						if (res.data && res.data.value) {
							// #ifndef H5
							plus.runtime.openURL(res.data.value, function (res) {
							
							});
							// #endif
							// #ifdef H5
							window.location.href = res.data.value;
							// #endif
							
						}
					}
				});
			} else {
				this.$Request.getT('/common/type/50').then(res => {
					if (res.status == 0) {
						if (res.data && res.data.value) {
							// #ifndef H5
							plus.runtime.openURL(res.data.value, function (res) {
							
							});
							// #endif
							// #ifdef H5
							window.location.href = res.data.value;
							// #endif
						}
					}
				});
			}
		}
	}
};
</script>

<style lang="scss">
#shareit {
	-webkit-user-select: none;
	position: fixed;
	/*width: 100%;*/
	height: 2000px;
	background: rgba(0, 0, 0, 0.85);
	text-align: center;
	top: 0;
	left: 0;
	z-index: 999;
}

#shareit img {
	max-width: 100%;
}

.arrow {
	width: 100px;
	height: 150px;
	position: absolute;
	right: 5%;
	top: 1%;
}

#follow {
	margin-right: 60px;
	margin-left: 30px;
	width: 90%;
	height: 50px;
	line-height: 50px;
	text-align: left;
	text-decoration: none;
	font-size: 18px;
	color: white;
	float: left;
	margin-top: 160px;
}
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
