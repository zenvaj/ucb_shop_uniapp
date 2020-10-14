<template>
	<view>
		<view class="card-entrance">
			<!-- 添加信用卡 -->
			<view class="card-item card-item-other" style="height: 30vw;">
				<!-- <image src="/static/img/card/add.png" mode=""></image>
				<view class="card-title">
					团队 | 钱包
				</view> -->
				<view class="other-item" style="background-color: #4db7c7;" @tap="go('team')">
					<image src="/static/img/card/team.png" mode=""></image>
					<view class="other-card-title">
						团队
					</view>
				</view>
				<view class="other-item" style="background-color: #bbc7a2;" @tap="go('money')">
					<image src="/static/img/card/money.png" mode=""></image>
					<view class="other-card-title">
						钱包
					</view>
				</view>
				<view class="other-item" style="background-color: #a19ec7;" @tap="go('level')">
					<image src="/static/img/card/level.png" mode=""></image>
					<view class="other-card-title">
						等级
					</view>
				</view>
			</view>
			<!-- 添加信用卡 -->
			<view class="card-item" style="background-color: #909399;" @tap="go('addcard')">
				<image src="/static/img/card/add.png" mode=""></image>
				<view class="card-title">
					添加信用卡
				</view>
			</view>
			<!-- 智能养卡 -->
			<view class="card-item" style="background-color: #409EFF;" @tap="go('card-list')">
				<image src="/static/img/card/IQ.png" mode=""></image>
				<view class="card-title">
					智能养卡
				</view>
			</view>
			<!-- 快捷支付 -->
			<view class="card-item" style="background-color: #67C23A;" @tap="go('mycard')">
				<image src="/static/img/card/payfor.png" mode=""></image>
				<view class="card-title">
					快捷支付
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			go(type) {
				//console.log(type)
				if(type === 'money') {
					uni.navigateTo({
						url: '/pages/member/money' 
					})
				}
				if(type === 'team') {
					uni.navigateTo({
						url: '/pages/member/team' 
					})
				}
				if(type === 'level') {
					// copyTklWenAn: function() {
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
					// },
				}
				if(type === 'addcard') {
					uni.navigateTo({
						url: '/pages/member/addcard'
					})
				}
				if(type === 'card-list') {
					uni.navigateTo({
						url: '/pages/member/card-list?type=smart' 
					})
				}
				if(type === 'mycard') {
					uni.navigateTo({
						// url: '/pages/member/mycard'
						url: '/pages/member/card-list?type=payfor'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.card-entrance {
		padding: 0 30rpx;
		.card-item {
			width: 100%;
			height: 40vw;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			border-radius: 10rpx;
			margin-top: 30rpx;
			image {
				width: 80rpx;
				height: 80rpx;
				margin-bottom: 10rpx;
			}
			.card-title {
				font-size: 30rpx;
				color: #f5f5f5;
				font-weight: bolder;
			}
			&:active {
				opacity: 0.7;
			}
		}
		.card-item-other {
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
			align-items: center;
			.other-item {
				width: 32%;
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				border-radius: 10rpx;
				image {
					width: 80rpx;
					height: 80rpx;
					margin-bottom: 10rpx;
				}
				.other-card-title {
					font-size: 30rpx;
					color: #f5f5f5;
					font-weight: bolder;
				}
				
			}
			.other-item:active {
				opacity: 0.7;
			}
			&:active {
				opacity: 1 !important;
			}
			
		}
		
	}
</style>
