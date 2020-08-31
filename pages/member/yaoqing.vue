<template>
	<view style="text-align: left">
		<view style="text-align: center;display: flex;background: #e10a07;padding: 32upx;color: #FFFFFF;">
			<view style="width: 49%;text-align: center;">
				<view>邀请好友（人）</view>
				<view style="margin-top: 28upx;font-weight: bold;font-size: 40upx;">{{ total }}</view>
			</view>
			<view style="background: #FFFFFF;width: 2upx;"></view>
			<view style="width: 49%;text-align: center;">
				总收益（元）
				<view style="margin-top: 28upx;font-weight: bold;font-size: 40upx;">{{ totalMoney }}</view>
			</view>
		</view>
		<view class="item" style="margin-bottom: 90upx;">
			<view style="display: flex;padding-top: 16upx;padding-bottom: 8upx;border-bottom: 1upx solid #F8F8F8;">
				<view style="margin-bottom: 4px;color: #e10a07;width: 20%;">排名</view>
				<view style="margin-bottom: 4px;color: #e10a07;width: 60%;">昵称</view>

				<view style="margin-bottom: 4px;color: #e10a07;width: 20%;text-align: center;">累计贡献</view>
			</view>
			<view v-for="(item, index) in list" :key="index">
				<view style="display: flex;padding-top: 16upx;padding-bottom: 8upx;border-bottom: 1upx solid #F8F8F8;">
					<view style="margin-bottom: 4px;color: black;width: 20%;text-overflow: ellipsis;">{{ index + 1 }}</view>
					<view style="margin-bottom: 4px;color: black;width: 60%;">{{ item.userName }}</view>
					<view style="color: black;width: 20%;text-align: center;color: #e10a07" v-if="item.money != '0.00'">{{ item.money ? item.money + '元' : '0元' }}</view>
					<view style="color: black;width: 20%;text-align: center;color: #666666" v-else>{{ item.money ? item.money + '元' : '0元' }}</view>
				</view>
			</view>
		</view>
		<empty v-if="list.length === 0 && show == true" des="还没有团队成员,快去邀请好友加入吧" show="false"></empty>
		<button style="color: #FFFFFF;position: fixed;bottom: 0;background: #e10a07;width: 100%;" @click="goYao()">邀请好友</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [],
			page: 0,
			show: false,
			totalMoney: 0,
			total: 0
		};
	},
	onLoad() {
		uni.showLoading({
			title: '加载中...'
		});
		this.getMoney();
	},

	// onReachBottom: function() {
	// 	this.page = this.page + 1;
	// 	if (this.total != this.list.length) {
	// 		this.getMoney();
	// 	}
	// },
	onPullDownRefresh: function() {
		this.page = 0;
		this.total = 0;
		this.list = [];
		// this.getMoney();
	},
	methods: {
		goYao() {
			uni.navigateTo({
				url: '/pages/member/yao'
			});
		},
		getMoney() {
			let relationId = this.$queue.getData('relation_id');
			if (relationId) {
				this.$Request.getT('/order/team/total/relation/' + relationId).then(res => {
					if (res.status === 0 && res.data) {
						this.totalMoney = res.data;
					}
				});
				//可以提现金额查询预估收入查询
				this.$Request.getT('/user/team/users/' + relationId).then(res => {
					if (res.status === 0 && res.data) {
						this.total = res.data.length;
						res.data.forEach(d => {
							if (d.money) {
								d.money = parseFloat(d.money).toFixed(2);
							} else {
								d.money = '0.00';
							}
							this.list.push(d);
						});
					}
					setTimeout(function() {
						uni.hideLoading();
						this.show = true;
					}, 1000);
				});
				
			}
		}
	}
};
</script>

<style lang="scss">
@import '../../static/css/index.css';

page {
	background: #ffffff;
}

.item {
	background: white;
	padding: 32rpx;
	margin: 32rpx;
	font-size: 28rpx;
	box-shadow: 7px 9px 34px rgba(0, 0, 0, 0.1);
	border-radius: 16upx;
}
</style>
