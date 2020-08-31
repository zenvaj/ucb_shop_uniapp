<template>
	<view>
		<view style="position: absolute;width: 100%;height: 460upx;background: #e10a07;"></view>
		<view style="color: #FFFFFF;position: relative;padding-left: 80upx;padding-top: 80upx;">
			<view style="font-size: 32upx;">当前积分</view>
			<view style="display: flex;">
				<view style="padding-top: 16upx;font-size: 50upx;font-weight: bold;width: 76%;">{{ total ? total : 0 }}</view>
			</view>
		</view>

		<view style="border-radius:12px;border:1px solid rgba(238,238,238,1);position: relative;background: #FFFFFF;margin: 64upx 24upx 24upx 24upx;">
			<view style="text-align: center;margin-top: 32upx">
				<text class="news_title">一</text>
				<text style="font-size: 32upx;">积分明细</text>
				<text class="news_title">一</text>
			</view>
			<view v-if="contents.length==0" style="margin-top: 300upx;color: #999999;text-align: center;margin-bottom: 400upx;">暂无积分</view>
			<view v-for="(item, index) in contents" :key="index" style="padding: 32upx;border-bottom: 1upx solid #F0F0F0;font-size: 32upx;color: #666666;">
				<view style="display: flex;">
					<view style="width: 500upx;overflow: hidden;text-overflow: ellipsis;white-space:nowrap">{{item.des}}</view>
					<view class="jifen_number">+ {{ item.number }}</view>
				</view>
				<view style="margin-top: 4upx;color: #999999;font-size: 28upx;">{{ item.createAt }}</view>
			</view>
		</view>
		<!-- <view class="cu-modal" :class="modalName=='RadioModal'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop="" style="width: 70%;height: 700upx;text-align: start;" @tap="hideModal">
				<image src="../../static/jifens.png" style="height: 700upx;position: absolute;"></image>
				<view style="margin: 200upx 32upx 40upx 40upx;font-size: 32upx;">
					<view style="position: relative;margin-bottom: 24upx;">1.购买商品实付款<text style="color: #E67817;margin-left:16upx;font-size: 28upx;">+上不封顶</text></view>
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				contents: [],
				modalName: '',
				isLogin: false,
				percent: 0,
				total: 0
			};
		},
		onLoad() {
			let userId = this.$queue.getData('userId');
			if (userId) {
				this.getUserInfo(userId),
				this.getToatal(userId);
			}
		},
		methods: {
			hideModal() {
				this.modalName = ''
			},
			showModals() {
				this.modalName = 'RadioModal'
			},
			goBack() {
				uni.navigateBack({

				})
			},
			changeLogin() {
				this.isLogin = true;
				this.percent = 100;
			},
			//获取用户信息
			getUserInfo(userId) {
				this.$Request.getT('/user/' + userId).then(res => {
					if (res.status === 0) {
						if (res.data.orderJifen) {
							this.total = parseFloat(res.data.orderJifen).toFixed(0);
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
			getToatal(userId) {
				this.$Request.postT('/user/getUserJifenList/'+userId).then(res => {
					if (res.status === 0) {
						this.contents = res.data;
					} else {
						this.contents = [];
					}
				});
			},
			goPage(url) {
				uni.navigateTo({
					url: url
				});
			}
		}
	};
</script>

<style scoped>
	.jifenguize {
		width: 180upx;
		height: 60upx;
		background: rgba(255, 255, 255, 1);
		border-radius: 30upx 0px 0px 30upx;
		opacity: 0.3;
	}

	.news_title {
		font-weight: bold;
		color: #E67817;
		margin-right: 16px;
		margin-left: 16px;
		width: 6px;
	}

	.back_img {
		position: relative;
		width: 24upx;
		height: 32upx;

	}

	.jifen_active {
		background: #f0f0f0;
		padding: 6upx 16upx;
		height: 50upx;
		border-radius: 8upx;
		margin-top: 40upx;
		color: #999999;
	}

	.jifen_noactive {
		background: #0055b8;
		padding: 6upx 16upx;
		height: 50upx;
		border-radius: 8upx;
		margin-top: 40upx;
		color: #ffffff;
	}

	.jifen_login {
		display: flex;
		margin-left: 32upx;
		margin-right: 32upx;
		border-bottom: 1upx solid #f1f1f1;
		padding-bottom: 32upx;
	}

	.jifen_number {
		color: #ff7800;
		margin-left: 8upx;
	}

	.total_jifen {
		width: 40%;
		text-align: right;
		font-size: 14px;
		color: grey;
	}

	.jifen_title {
		width: 60%;
		font-size: 32upx;
	}

	.jifen {
		display: flex;
		margin: 8px 16px 8px 16px;
		border-bottom: 1upx solid #f1f1f1;
		padding-bottom: 20upx;
		padding-top: 8upx;
	}

	.top_yuan {
		margin-left: 37%;
		border-radius: 200px;
		width: 200upx;
		height: 200upx;
		border: 4upx dotted #f1f1f1;
	}

	.title {
		text-align: center;
		color: #ffffff;
		font-size: 26px;
		/* background-position: center; */
		/* background-image: url(../../../static/jifenimg.png); */
		/* background: #0055b8; */
		/* border-bottom-left-radius: 180px;
		border-bottom-right-radius: 180px; */
		height: 250upx;
	}

	.news_title {
		font-weight: bold;
		color: #f9221d;
		margin-right: 16px;
		margin-left: 16px;
		width: 6px;
	}

	.news_content {
		display: flex;
		text-align: left;
		padding: 8px 16px 8px 16px;
		background: #ffffff;
		margin-top: 1px;
	}

	.news_content_text {
		margin-top: 8px;
		width: 200px;
		overflow: hidden;
		font-size: 16px;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
</style>
