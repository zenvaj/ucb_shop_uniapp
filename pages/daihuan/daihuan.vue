<template>
	<view> 
			<view class="bank_list" style="background-image: url(../../static/img/yhk_big.png);">
				<view class="uni-flex uni-row">
					<view class="uni-center" style="width: 100upx;">
						<image style="width: 80upx; height: 80upx;" v-bind:src="yhklog"></image>
					</view>
					<view class="bank_list_name" style="-webkit-flex: 1;flex: 1;">{{bankname}}</view>
					<view class="bank_list_num" style="-webkit-flex: 1;flex: 1;">{{banknumber}}</view>
				</view>
	
				<view class="uni-flex uni-row">
					<view style="width: 100upx;"></view>
					<view class=" bank_list_money" style="-webkit-flex: 1;flex: 1;">
						<view>额度</view>
						<view>￥{{money_or_}}</view>
					</view>
					<view class=" bank_list_day" style="-webkit-flex: 1;flex: 1;">
						<view>
							<image src="../../static/img/huanqian_01.png"></image>
							账单日 {{daymark_or_}}
						</view>
						<view>
							<image src="../../static/img/huanqian_01.png"></image>
							还款日 {{dayjob_or_}}
						</view>
					</view>
				</view>
			</view>
			
			<view  style="margin: auto; width: 90%;">
				<view class="plan_top_all  uni-flex uni-center">
					<view class="plan_top uni-flex uni-row">
						<view style="-webkit-flex: 1;flex: 1;">
							<view>
								<image src="../../static/img/huanqian_10.png"></image>
								还款金额
							</view>
							<view class="plan_top_num">￥{{view_plan?0:parseFloat(view_plan.money_repay_all).toFixed(2)}}</view>
						</view>
						<view style="-webkit-flex: 1;flex: 1;">
							<view>
								<image src="../../static/img/huanqian_11.png"></image>
								手续费
							</view>
							<view class="plan_top_num">￥{{view_plan?0:parseFloat(view_plan.money_pay_rate_all+view_plan.money_repay_fee_all).toFixed(2)}}</view>
						</view>
						<view style="-webkit-flex: 1;flex: 1;">
							<view>
								<image src="../../static/img/huanqian_12.png"></image>
								还款笔数
							</view>
							<view class="plan_top_num">{{view_plan?0: view_plan.num_order_repay_all }}</view>
						</view>
					</view>
				</view>
				
				<!-- <view class="uni-flex uni-column uni-center" style="text-align: left;"> 
					<view v-for="(ret, k, ii) in 0" :key="ii" class="plan-data-list-data" style="margin: auto;"> 
						<view class="plan-data-list-top" style="background-color:#d5e7fc;">
							<image src="../../static/img/huanqian_13.png"></image>
							还款 ￥10
							<span style="margin-left: auto;margin-right:1rem;">444</span>
						</view>
						<view v-for="(rs, key, j) in 7" :key="j" style="color:#999;padding-left:1rem;">
							消费 8
							<span style="float:right;margin-right:1rem;">111</span>
						</view>
					</view>
				</view> -->
			</view>
			<view  class="bg-white flex" style="width: 90%;margin: auto">
			<view class="flex solid-bottom padding align-center">
				<text class="cuIcon-refund text-olive" style="margin: -10upx;font-size: 45upx;width: 50upx;"></text>
				<input type="digit" v-model="money" placeholder="输入金额"  style="width: 230upx; padding-left: 20rpx;" />
				</input>
			</view>
			<view class="flex solid-bottom padding align-center">
				<text class="cuIcon-time text-olive" style="font-size: 45upx;width: 50upx;"></text>
				<input  type="text"  @tap="toggleTab()"   v-model="datas" placeholder="请选择日期"  style="width: 230upx;" disabled="false" />
				</input>
			</view>
			</view>
			 
			<!-- 日历组件 -->
			<view class="masking_layer"  v-if="isFlag" >
				<calendar :startDate="startDate" :endDate="endDate"  :selectedDate="selectedDate"    @change="calendarChange" />
				<button type="primary" size="mini" @click="qdData">确定</button>
				
			</view> 
			  
			<view  class="bg-white flex"  style="width: 90%; margin: auto;">
					<view  class="flex solid-bottom padding align-center">
						选择方式
					</view>
					<view   class="flex solid-bottom padding align-center">
						<picker mode="multiSelector" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray">
							<view class="uni-input">{{multiArray[0][multiIndex[0]]}}，{{multiArray[1][multiIndex[1]]}}</view>
						</picker>
					</view>
			</view>
			 <view  v-for="(item, index) in list" :key="index" class="item">
			 		<view class="solids-bottom " style="color: #333333;font-size: 32upx; overflow: hidden;text-overflow: ellipsis;white-space:nowrap">
						交易时间 ： {{index}}	 
			 		</view>
			 		<view class="flex" v-for="(item1, index1) in item.order" :key="'ad'+index1"  style="color: #666666;font-size: 28upx;margin-top: 10upx;"> 
						<text class=" radius text-center " :class="'bg-'+item1.type " style="width: 45rpx; height: 45rpx; ">{{item1.type=='in'?'消':'还'}}</text>
						<view class="flex" style="font-size: 35rpx; width: 100%; margin-left: 20rpx;"> 
							<text class=" cuIcon-redpacket_fill" style="-webkit-flex: 1;flex: 1;">   {{item1.money_pay}}</text>
							<!-- <text>{{item1.money_rebate}}</text> -->
							<text class="  cuIcon-recharge" style="-webkit-flex: 1;flex: 1;">   {{item1.fee}}</text>
							<text class=" cuIcon-time" style="width: 200rpx;">   {{item1.timer}}</text>
						</view> 
					</view> 
			 
			 		<!-- <view style="margin-top: 10upx;color: #999999;font-size: 28upx;text-align: right;">{{ item.createAt }}</view> -->
			 </view>
			<view class="uni-flex">
				<button type="primary" size="mini" @click="crateplan">生成</button>
				<button type="primary" size="mini" @click="addplan">添加</button>
			</view>
		</view>
	
</template>

<script>
	import calendar from '@/components/heqifang-calendar/calendar.vue'; 
	export default {
		components: { 
			calendar, 
		},
		data() {
			return {
				yhklog :'../../static/img/yhk_logo_01.png',
				bankname:'',
				banknumber:'',
				money_or_: "20000",
				daymark_or_: "01",
				dayjob_or_: "20",
				view_plan:[],
				planid :'',
				cardid :'',
				repaytype: "1",
				repaynumdaliy: "1",
				plan_tmp_id:0,
				money: '', 
				datas: [],
				list: {} ,
				isFlag: false,
				totalAmount: 0.00,
				startDate : '2020-05-25',  
				endDate : '2020-06-15', 
				/* 已选日期 */
				selectedDate: [], 
				
				multiArray: [
					// ['还款一次', '还款二次', '还款三次', '还款四次'],
					['还款一次', '还款二次', '还款三次'],
					['消费一次', '消费二次', '消费三次'] 
				],
				multiIndex: [0, 0],
			}
		},
		onLoad(e) {  
			this.planid = e.planid;
			this.cardid = e.cardid;
			
			this.$Request
				.postP('/bank/detail', {
					bank_id : this.cardid
				})
				.then(res => {
					console.log(res);
					if (res.status === 10000) {
						 this.yhklog = res.data.bank_logo;
						 this.bankname = res.data.bankname;
						 this.banknumber = res.data.banknumber;
						 this.money_or_ =  res.data.money_or_;
						 this.daymark_or_ = res.data.daymark_or_;
						 this.dayjob_or_ = res.data.dayjob_or_;
					}else{
						 
					}
				}); 
		},
		methods: {
			bindMultiPickerColumnChange: function(e) {
				console.log('修改的列为：' + e.detail.column + '，值为：' + e.detail.value)
				this.multiIndex[e.detail.column] = e.detail.value
				switch (e.detail.column) {
					case 0: //拖动第1列
						switch (this.multiIndex[0]) {
							case 0:
								this.repaynumdaliy = e.detail.value +1 ;
								this.multiArray[1] = ['消费一次', '消费二次', '消费三次']  
								break
							case 1:
								this.repaynumdaliy = e.detail.value +1 ;
								this.multiArray[1] = ['消费二次', '消费四次', '消费六次']   
								break
							case 2:
								this.repaynumdaliy = e.detail.value +1 ;
								this.multiArray[1] = ['消费三次', '消费六次', '消费九次']   
								break
							// case 3:
							// 	this.multiArray[1] = ['消费二次', '消费四次', '消费六次'] 
							// 	break
						}
						// console.log(this.multiArray[0][this.multiIndex[0]]);
						// console.log(this.multiArray[1][this.multiIndex[1]]);
						// console.log(this.multiIndex[1]);
						// this.multiIndex.splice(1, 1) 
						// this.multiIndex.splice(1, 2)
						break
					case 1: //拖动第2列  
						this.repaytype = e.detail.value + 1 ;
						console.log(e.detail.value);
						break
				} 
				this.$forceUpdate()
			},
			crateplan(){
				uni.showLoading({ title: '计划生成' });
				this.$Request
					.postP('/plan/overView', {
						"bank_id": this.cardid,
						"trade_id": this.planid,
						"amount": this.money,
						"repaydate": this.selectedDate.toString(),
						"repaytype": this.repaytype,
						"repaynumdaliy": this.repaynumdaliy,
						"ps": ""
					})
					.then(res => {
						uni.hideLoading();
						console.log(res);
						if (res.status === 10000) {
							this.plan_tmp_id = res.data.plan_tmp_id;
							this.list = res.data.data;
							this.view_plan = res.data.view_plan;
						}else{
							 
						}
					}); 
			},
			addplan(){
				uni.showLoading({ title: '计划提交' });
				if(this.plan_tmp_id!=0){
					this.$Request
						.postP('/plan/add', {
							"plan_tmp_id": this.plan_tmp_id,
						})
						.then(res => { 
							uni.hideLoading();
							if (res.status === 10000) {
								 uni.showModal({
								 	title: '提示',
								 	content: '计划添加成功，请预留足够余额',
								 	showCancel: false,
								 	success: res => {
								 		if (res.confirm) { 
								 			uni.navigateTo({ 
								 				url:"../member/mycard"
								 			});
								 		} else if (res.cancel) {
								 			console.log('用户点击取消');
								 		}
								 	}
								 });
							}else{
								 
							}
						}); 
				}else{
					this.$queue.showToast("请先生成计划");
				}
				
				// console.log( this.repaytype );
				// console.log( this.repaynumdaliy );
				// console.log( this.selectedDate ); 
				// console.log(this.money); 
			},
			qdData(){ 
				this.isFlag = false;  
			},
			toggleTab(){
				this.isFlag = !this.isFlag 
			},
			calendarChange(e) { // 当前选择时间
				console.log(e);
				// // 当前选择时间
				let _date = e.fulldate;
				// // 判断这个时间是否已选中
				let _index = this.selectedDate.indexOf(_date); 
				if(_index < 0){
					this.selectedDate.push(_date);
				}else{
					this.selectedDate.splice(_index,1);
				} 
			}
		}
	}
</script>

<style lang="scss">

image {
	width: 35upx;
	height: 35upx;
	margin-right: 20upx;
}


.plan_top {
	background-color: #41acff;
	width: 100%;
	border-radius: 6px;
	padding: 25upx 0upx;
	color: #fff;
	font-size: 1.4rem;
	text-align: center;
}
.plan_top_all {
	background-color: #f4f4f4;
	padding: 1rem 0rem;
	height: 240upx;
}
.plan_top > view {
	border-right: 1px solid #1493f5;
}
.plan_top > view:last-child {
	border: 0;
}
.plan_top_num {
	margin-top: 15upx;
	font-size: 30upx;
}
.plan-data-list-data {
	width: 96%;
	background-color: #fff;
	margin-top: 10upx;
	border-radius: 5px;
}
.plan-data-list-top {
	display: flex;
	align-items: center;
}

.bank_list {
	width: 90%;
	margin: auto;
	background-size: 100% 100%;
	margin-top: 4%;
	padding: 5% 2%;
	border-radius: 8px;
}
.bank_list_name {
	text-align: left;
	color: #ffffff;
}
.bank_list_num {
	color: #ffffff;
	text-align: left;
	margin-top: 0.4rem;
}
.bank_list_money {
	margin-top: 0.4rem;
	text-align: left;
	color: #fff;
}
.bank_list_day {
	margin-top: 0.4rem;
	text-align: left;
	color: #02867e;
}
.bank_list_plan {
	background-color: #fff;
	padding: 1rem 1.8rem;
	font-size: 1.4rem;
	margin-top: 1.6rem;
}
.bank_list_plan_huanqian {
	float: right;
	border: 0;
	text-align: right;
	font-size: 25upx;
}
.bank_list_guize {
	padding: 1rem 1.8rem;
	color: #e42601;
}
.bangding_bottom {
	text-align: center;
	/* margin: 3rem 0; */
	padding: 20upx;
	margin: 0 1rem;
	color: #fff;
	background-color: #41acff;
	border-radius: 10px;
}


	.page_content{
		background-color: #a5b4c4;
		display: flex;
		height: calc(100vh);
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: #fff;
		font-weight: 600;
		font-size: 22px;
	}
	.masking_layer{
		position: fixed;
		bottom: 0rpx;
		z-index:900;
		background-color: #a5b4c4;
		display: flex; 
		flex-direction: column;
		justify-content: flex-end;
	}
	.price_total{
		flex-direction: row;
		align-items: Center;
		background-color: #ffffff;
		box-shadow: 5px 0px 15px #aaaa7f;
	}
	
	
	.navbar {
			display: flex;
			height: 40px;
			padding: 0 5px;
			background: #fff;
			box-shadow: 0 1px 5px rgba(0, 0, 0, 0.06);
			position: relative;
			z-index: 10;
		
			.nav-item {
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				height: 100%;
				font-size: 15px;
				color: $font-color-dark;
				position: relative;
		
				&.current {
					color: $base-color;
		
					&:after {
						content: '';
						position: absolute;
						left: 50%;
						bottom: 0;
						transform: translateX(-50%);
						width: 44px;
						height: 0;
						border-bottom: 2px solid $base-color;
					}
				}
			}
		}
		
		.item {
			background: white;
			padding: 16rpx;
			margin: 16rpx;
			font-size: 28rpx;
			box-shadow: 7px 9px 34px rgba(0, 0, 0, 0.1);
			border-radius: 16upx;
		}
	
	.filter-area-inner {
		height: 100%;
	}
	.filter-signal-item {
		background-color: white;
		color: #909090;
		padding: 0 3px;
		line-height: 38px;
		overflow: hidden;
		-webkit-transition: background-color 0.1s linear;
		transition: background-color 0.1s linear;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.filter-signal-item >i{
		float: right;margin-right: 15px;
	}
	
	.filter-signal-item-active {
		color: orangered;
	}
	
	/* .filter-title-item-active {
		color: orangered;
	} */
	
	/* 以下为实现0.5px底部边界 */
	.filterLine {
		position: relative;
	}
	.filterLine:before,
	.filterLine:after {
		position: absolute;
		content: ' ';
		height: 1px;
		width: 100%;
		left: 0;
		transform-origin: 0 0;
		-webkit-transform-origin: 0 0;
	}
	/* .filterLine:before {顶部top:0;background:#000;}
	*/
	.filterLine:after {
		bottom: 0;
		border-bottom: 1px solid #C8C7CC;
	}
	@media only screen and (-webkit-min-device-pixel-ratio: 1.5) {
		.filterLine:after,
		.filterLine:before {
			-webkit-transform: scaleY(0.667);
		}
	}
	@media only screen and (-webkit-min-device-pixel-ratio: 2) {
		.filterLine:after,
		.filterLine:before {
			-webkit-transform: scaleY(0.5);
		}
	}
	/* 以上为实现0.5px底部边界 */
	.bg-in {
		color: #e54d42;
		background-color: #fadbd9;
	}
	 
	 .bg-out {
	 	color: #108040;
	 	background-color: #39b54a;
	 }
	 
</style>
