<template>
	<view class="all">
		<!-- 点击进行中过来 -->
		<view class="info" v-for="(item,index) in going" :key="'going'+index" v-if="currentindex == 0">
			<view class="info-top color_1">
				<view>交易类型：{{item.type}}</view>
				<view>日期：{{item.date}}</view>
				<view>未执行</view>
			</view>
			<view class="info-bottom">
				<view class="info-line" v-for="(child,num) in item.data" :key="'child'+num">
					<view>
						<text :class="[child.type == '消费' ? 'font-1' : 'font-2']">{{child.type == '消费' ? '消' : '还'}}</text>
						<text class=" cuIcon-redpacket_fill">{{child.consume_money}}</text>
					</view>
					<text class="  cuIcon-recharge">{{child.consume_service_charge}}</text>
					<text class=" cuIcon-time">{{child.time}}</text>
				</view>
			</view>
		</view>
		<!-- 点击已完成过来 -->
		<view class="info" v-for="(item,index) in going" :key="'success'+index" v-if="currentindex == 1">
			<view class="info-top color_2">
				<view>交易类型：{{item.type}}</view>
				<view>日期：{{item.date}}</view>
				<view>已执行</view>
			</view>
			<view class="info-bottom">
				<view class="info-line" v-for="(child,num) in item.data" :key="'child'+num">
					<view>
						<text :class="[child.type == '消费' ? 'font-1' : 'font-2']">{{child.type == '消费' ? '消' : '还'}}</text>
						<text class=" cuIcon-redpacket_fill">{{child.consume_money}}</text>
					</view>
					<text class="  cuIcon-recharge">{{child.consume_service_charge}}</text>
					<text class=" cuIcon-time">{{child.time}}</text>
				</view>
			</view>
		</view>
		<!-- 点击取消计划过来 -->
		<view class="info" v-for="(item,index) in going" :key="'cancel'+index" v-if="currentindex == 2">
			<view class="info-top color_3">
				<view>交易类型：{{item.type}}</view>
				<view>日期：{{item.date}}</view>
				<view>异常停止</view>
			</view>
			<view class="info-bottom">
				<view class="info-line" v-for="(child,num) in item.data" :key="'child'+num">
					<view>
						<text :class="[child.type == '消费' ? 'font-1' : 'font-2']">{{child.type == '消费' ? '消' : '还'}}</text>
						<text class=" cuIcon-redpacket_fill">{{child.consume_money}}</text>
					</view>
					<text class="  cuIcon-recharge">{{child.consume_service_charge}}</text>
					<text class=" cuIcon-time">{{child.time}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				page:0,
				currentindex:0, //默认是进行中点击进来
				going:[
					{type:'快捷',date:'2020-09-09',data:[
						{type:'消费',consume_money:'23123',consume_service_charge:'66.66',time:'12:00'},
						{type:'消费',consume_money:'23123',consume_service_charge:'66.66',time:'12:00'},
						{type:'还款',consume_money:'23123',consume_service_charge:'66.66',time:'12:00'}
					]},
					{type:'奖金',date:'2020-09-09',data:[
						{type:'消费',consume_money:'23123',consume_service_charge:'66.66',time:'12:00'},
						{type:'消费',consume_money:'23123',consume_service_charge:'66.66',time:'12:00'},
						{type:'还款',consume_money:'23123',consume_service_charge:'66.66',time:'12:00'}
					]},
					{type:'代还进账',date:'2020-09-09',data:[
						{type:'消费',consume_money:'23123',consume_service_charge:'66.66',time:'12:00'},
						{type:'消费',consume_money:'23123',consume_service_charge:'66.66',time:'12:00'},
						{type:'还款',consume_money:'23123',consume_service_charge:'66.66',time:'12:00'}
					]},
					{type:'代还出账',date:'2020-09-09',data:[
						{type:'消费',consume_money:'23123',consume_service_charge:'66.66',time:'12:00'},
						{type:'消费',consume_money:'23123',consume_service_charge:'66.66',time:'12:00'},
						{type:'还款',consume_money:'23123',consume_service_charge:'66.66',time:'12:00'}
					]},
					{type:'提现',date:'2020-09-09',data:[
						{type:'消费',consume_money:'23123',consume_service_charge:'66.66',time:'12:00'},
						{type:'消费',consume_money:'23123',consume_service_charge:'66.66',time:'12:00'},
						{type:'还款',consume_money:'23123',consume_service_charge:'66.66',time:'12:00'}
					]},
					{type:'分润',date:'2020-09-09',data:[
						{type:'消费',consume_money:'23123',consume_service_charge:'66.66',time:'12:00'},
						{type:'消费',consume_money:'23123',consume_service_charge:'66.66',time:'12:00'},
						{type:'还款',consume_money:'23123',consume_service_charge:'66.66',time:'12:00'}
					]},
				],
				success:[], //已执行数据
				cancel:[], //异常停止数据
			}
		},
		onReachBottom(){
			this.page = this.page + 1;
		},
		onLoad(options){
			this.currentindex = options.index;
		},
		onShow(){
			
		},
		methods:{
			
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
