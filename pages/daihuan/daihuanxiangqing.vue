<template>
	<view class="all">
		<!-- 点击进行中过来 -->
		<view class="info" v-for="(item,index) in going" :key="'going'+index" v-if="currentindex == 0">
			<view class="info-top color_1">
				<view>日期：{{index}}</view>
				<view>通道：{{plan_info.show_name}}</view>
				<view>执行中</view>
			</view>
			<view class="info-bottom">
				<view class="info-line" v-for="(child,num) in item" :key="'child'+num">
					<view>
						<text :class="[child.type == 'in' ? 'font-1' : 'font-2']">{{child.type == 'in' ? '消' : '还'}}</text>
						<text class=" cuIcon-redpacket_fill">{{child.amount}}</text>
					</view>
					<text class="  cuIcon-recharge">{{child.active_fee}}</text>
					<text class=" cuIcon-time">{{child.exectime}}</text>
					<text class=" cuIcon-time">{{child.finishtime||'未执行'}}</text>
				</view>
			</view>
		</view>
		<!-- 点击已完成过来 -->
		<view class="info" v-for="(item,index) in going" :key="'success'+index" v-if="currentindex == 1">
			<view class="info-top color_2">
				<view>日期：{{index}}</view>
				<view>通道：{{plan_info.show_name}}</view>
				<view>完成</view>
			</view> 
			<view class="info-bottom">
				<view class="info-line" v-for="(child,num) in item" :key="'child'+num">
					<view>
						<text :class="[child.type == 'in' ? 'font-1' : 'font-2']">{{child.type == 'in' ? '消' : '还'}}</text>
						<text class=" cuIcon-redpacket_fill">{{child.amount}}</text>
					</view>
					<text class="  cuIcon-recharge">{{child.active_fee}}</text>
					<text class=" cuIcon-time">{{child.exectime}}</text>
					<text class=" cuIcon-time">{{child.finishtime||'未执行'}}</text>
				</view>
			</view>
		</view>
		<!-- 点击取消计划过来 -->
		<view class="info" v-for="(item,index) in going" :key="'cancel'+index" v-if="currentindex == 2">
			<view class="info-top color_3">
				<view>日期：{{index}}</view>
				<view>通道：{{plan_info.show_name}}</view>
				<view>停止</view>
			</view>
			<view class="info-bottom">
				<view class="info-line" v-for="(child,num) in item" :key="'child'+num">
					<view>
						<text :class="[child.type == 'in' ? 'font-1' : 'font-2']">{{child.type == 'in' ? '消' : '还'}}</text>
						<text class=" cuIcon-redpacket_fill">{{child.amount}}</text>
					</view>
					<text class="  cuIcon-recharge">{{child.active_fee}}</text>
					<text class=" cuIcon-time">{{child.exectime}}</text>
					<text class=" cuIcon-time">{{child.finishtime||'未执行'}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				planid:0,
				page:0,
				currentindex:0, //默认是进行中点击进来
				going:[],
				success:[], //已执行数据
				cancel:[], //异常停止数据
				plan_info:{}
			}
		},
		onReachBottom(){
			this.page = this.page + 1;
		},
		onLoad(options){
			console.log(options)
			this.currentindex = options.index;
			this.planid = options.planid;
			this.PlanOrder()
		},
		onShow(){
			
		},
		methods:{
			PlanOrder(){
				this.$queue.showLoading("请稍后...");
				this.$Request.postP('/plan/detail',{
					    "plan_id": this.planid, //计划id
				}).then(res => {
					console.log(res);
					if(res.status != 10000){
						uni.showModal({
							content:"计划详情数据异常，请重新进入"
						})
						uni.navigateBack()
					}
					this.going = res.data.order_list
					this.plan_info = res.data
				});
				uni.hideLoading();
			}
		}
	}
</script>

<style>
	.all{
		padding-bottom: 40upx;
	}
	.info{
		width:90%;
		padding-bottom:20upx;
		margin:40upx auto;
		background-color: #ffffff;
		border-radius: 12upx;
		font-size:36upx;
		color:rgb(51,51,51);
	}
	.info-top{
		width:100%;
		padding:20upx;
		color:#ffffff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1upx solid #FFFFFF;
		border-top-left-radius: 12upx;
		border-top-right-radius: 12upx;
	}
	.color_1{
		background-color: #f15b6c;
	}
	.color_2{
		background-color: #32CD32;
	}
	.color_3{
		background-color: #D3D3D3;
	}
	.info-bottom{
		display: flex;
		flex-direction: column;
		padding:20upx;
	}
	.font-1{
		color: #e54d42;
		background-color: #fadbd9;
		padding:5upx;
		border-radius: 6upx;
		margin-right:20upx;
	}
	.font-2{
		color: #108040;
		background-color: #39b54a;
		padding:5upx;
		border-radius: 6upx;
		margin-right:20upx;
	}
	.info-line{
		display: flex;
		padding:5upx 0;
		justify-content: space-between;
		align-items: center;
	}
</style>
