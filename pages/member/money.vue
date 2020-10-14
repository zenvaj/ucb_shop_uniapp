<template>
	<view>
		<view class="money">
			<!-- 表头 -->
			<view class="title">
				<view class="title-name">
					类型
				</view>
				<view class="title-name">
					当前
				</view>
				<view class="title-name">
					累计
				</view>
				<view class="title-name">
					操作
				</view>
			</view>
			<!-- 分润 -->
			<view class="content">
				<view class="content-item">
					分润
				</view>
				<view class="content-item">
					{{moeny.profits}}
				</view>
				<view class="content-item">
					{{moeny.profits_all}}
				</view>
				<view class="content-item text-btn" @click="MoneyTranslation('分润')">
					转余额
				</view>
			</view>
			<!-- 佣金 -->
			<view class="content">
				<view class="content-item">
					佣金
				</view>
				<view class="content-item">
					{{moeny.bonus}}
				</view>
				<view class="content-item">
					{{moeny.bonus_all}}
				</view>
				<view class="content-item text-btn" @click="MoneyTranslation('佣金')">
					转余额
				</view>
			</view>
			<!-- 红包 -->
			<view class="content">
				<view class="content-item">
					红包
				</view>
				<view class="content-item">
					{{moeny.redbonus}}
				</view>
				<view class="content-item">
					{{moeny.redbonus_all}}
				</view>
				<view class="content-item text-btn" @click="MoneyTranslation('红包')">
					转余额
				</view>
			</view>
			<!-- 余额 -->
			<view class="content">
				<view class="content-item" style="width: 25%;">
					余额
				</view>
				<view class="content-item" style="width: 30%;">
					{{moeny.money}}
				</view>
				<view class="content-item" style="width: 45%;">
					{{moeny.money_all}}
				</view>
			</view>
			<!-- 提现输入框 -->
			<view class="inp-box">
				<input class="inp" type="number" :placeholder-style="'inp'" :value="money_cash" :placeholder="'请输入金额'" @input="cashFlash"/>
				<view class="inp-btn" @click="cashAll">
					全部提现
				</view>
			</view>
			<!-- 提现按钮 -->
			<view class="bottom-btn" @click="MoneyCash">
				提现
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				moeny:[],
				money_cash:''
			}
		},
		onLoad() {
			this.Money()
		},
		methods: {
			cashAll(){
				this.money_cash = this.moeny.money
			},
			cashFlash(e){
				this.money_cash = e.detail.value
			},
			Money(){
				this.$Request.postP('/money/wallet',{
				}).then(res => {
					//console.log(res);
					if (res.status === 10000) {
						this.moeny = res.data
					}else{
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
					}
				});
			},
			MoneyTranslation(type){
				this.$Request.postP('/money/translate',{
					type:type
				}).then(res => {
					console.log(res);
					if (res.status === 10000) {
						uni.showModal({
							content:"转换成功"
						})
						uni.redirectTo({
							url:"/pages/member/money"
						})
					}else{
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
					}
				});
			},
			MoneyCash(){
				this.$Request.postP('/money/cash',{
					money:this.money_cash
				}).then(res => {
					console.log(res);
					if (res.status === 10000) {
						uni.showModal({
							content:"提现成功，请等待到账"
						})
						uni.redirectTo({
							url:"/pages/member/money"
						})
					}else{
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.money {
		padding: 10px;
		.title {
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-around;
			align-items: center;
			background-color: #cecece;
			.title-name {
				width: 25%;
				text-align: center;
				font-size: 30rpx;
				color: #000000;
			}
		}
		.content {
			height: 9vh;
			border-bottom: 1px solid #cccccc;
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-around;
			align-items: center;
			.content-item {
				width: 25%;
				text-align: center;
				font-size: 30rpx;
				color: #434343;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			.text-btn {
				font-size: 30rpx;
				border-radius: 6px;
				background-color: #0092F7;
				height: 5vh;
				line-height: 5vh;
				text-align: center;
				color: #FFFFFF;
				&:active {
					opacity: 0.8;
				}
			}
		}
		.inp-box {
			display: flex;
			flex-flow: row nowrap;
			justify-content: center;
			align-items: center;
			padding: 50rpx 0;
			.inp {
				width: 60%;
				border-bottom: 1px solid #0081FF;
				font-size: 36rpx;
			}
			.inp-btn {
				border-radius: 6px;
				margin-left: 20rpx;
				font-size: 36rpx;
				color: #0092F7;
				&:active {
					opacity: 0.6;
				}
			}
		}
		.bottom-btn {
			// margin-top: 20rpx;
			border-radius: 6px;
			height: 8vh;
			line-height: 8vh;
			background-color: #0092F7;
			text-align: center;
			font-size: 36rpx;
			color: #FFFFFF;
			&:active {
				opacity: 0.9;
			}
		}
	}
</style>
