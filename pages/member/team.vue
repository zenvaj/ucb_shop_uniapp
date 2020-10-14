<template>
	<view style="text-align: left">
		<view style="text-align: center;display: flex;background: #e10a07;padding: 32upx;color: #FFFFFF;">
			<view style="width: 49%;text-align: center;" @click="TabType('')">
				<view>团队人数</view>
				<view style="margin-top: 28upx;font-weight: bold;font-size: 40upx;">{{team_count.team_num}}</view>
			</view>
			<view style="background: #FFFFFF;width: 2upx;"></view>
			<view style="width: 49%;text-align: center;" @click="TabType('shop_active')">
				商城激活
				<view style="margin-top: 28upx;font-weight: bold;font-size: 40upx;">{{team_count.shop_active_team_num}}</view>
			</view>
			<view style="background: #FFFFFF;width: 2upx;"></view>
			<view style="width: 49%;text-align: center;" @click="TabType('active_team')">
				钱包激活
				<view style="margin-top: 28upx;font-weight: bold;font-size: 40upx;">{{team_count.active_tam}}</view>
			</view>
		</view>
		<view class="item" style="margin-bottom: 90upx;">
			<view style="display: flex;padding-top: 16upx;padding-bottom: 8upx;border-bottom: 1upx solid #F8F8F8;">
				<view style="margin-bottom: 4px;color: #e10a07;width: 20%;">姓名</view>
				<view style="margin-bottom: 4px;color: #e10a07;width: 60%;">电话</view>

				<view style="margin-bottom: 4px;color: #e10a07;width: 20%;text-align: center;">等级</view>
			</view>
			<view v-for="(item,index) in list" :key="item + index">
				<view style="display: flex;padding-top: 16upx;padding-bottom: 8upx;border-bottom: 1upx solid #F8F8F8;">
					<view style="margin-bottom: 4px;color: black;width: 20%;text-overflow: ellipsis;">{{item.name}}</view>
					<view style="margin-bottom: 4px;color: black;width: 60%;">{{item.phone}}</view>
					<view style="color: black;width: 20%;text-align: center;color: #e10a07">{{item.gank_lv}}</view>
					<!-- <view style="color: black;width: 20%;text-align: center;color: #666666" v-else>{{ item.money ? item.money + '元' : '0元' }}</view> -->
				</view>
			</view>
		</view>
		<empty v-if="list.length === 0 && show == true" des="还没有团队成员,快去邀请好友加入吧" show="false"></empty>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [],
			team_count:[],
			page: 1,
			show: false,
			show_type:""
		};
	},
	onLoad() {
		// uni.showLoading({
		// 	title: '加载中...'
		// });
		this.Team()
		this.TeamList()
	},
	onReachBottom: function() {
		this.page++
		this.TeamList()
	},
	onPullDownRefresh: function() {
		
	},
	methods: {
		TabType(type){
			this.show_type = type
			this.page = 1
			this.TeamList()
		},
		Team(){
			this.$Request.postP('/user/team',{
			}).then(res => {
				if (res.status === 10000) {
					this.team_count = res.data
				}else{
					uni.showToast({
						title: res.msg,
						icon: 'none'
					});
				}
			});
		},
		TeamList(){
			this.$Request.postP('/user/teamlist',{
				type:"",
				p:this.page
			}).then(res => {
				if (res.status === 10000) {
					res.data.list.forEach( (item,index) => {
						this.list.push(item)
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
