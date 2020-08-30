<template>
	<view class="content">
		<view>
			<view class="grid margin-bottom text-center " >
				<view class="flex-sub" @click="showIs">
					{{title}}<text v-if="isshow" class="cuIcon-triangledownfill" style="font-size: 50rpx;"></text> 
					<text v-if="!isshow"   class="cuIcon-triangleupfill" style="font-size: 50rpx;"></text> 
				</view>
				<view class="flex-sub">
					<biaofun-datetime-picker 
						:isShow="true" 
						placeholder="开始时间"
						start="2000-02"
						end="2100-10"
						fields="day"
						@change="changeDatetimePicker"
					></biaofun-datetime-picker> 
				</view>
				<view class="flex-sub">
					<biaofun-datetime-picker
						:isShow="true"
						placeholder="结束时间"
						start="2000-02"
						end="2100-10"
						fields="day"
						@change="changeDatetimePicker1"
					></biaofun-datetime-picker> 
				</view>
			</view>
		<!-- #ifdef H5 -->
		<transition-group tag="view" enter-active-class="animated slideInDown faster" leave-active-class="animated slideOutUp faster">
			<!-- #endif -->
			<view  v-if="!isshow" class="filter-signal-item" 
			style="padding-left: 50rpx;"
			v-bind:class="{ 
			 'filter-signal-item-active' : selected.value == item.value}"
			v-bind:key="item.value" 
			v-on:click="selectItem(item)" 
			v-for="item in data">
				{{ item.text }} 
				<i class='filter-signal-item-active' v-show="selected.value == item.value">✔</i>
			</view>
			
			<!-- #ifdef H5 -->
			</transition-group>
			<!-- #endif -->
		</view>
		<view class="navbar">
			<view v-for="(item, index) in tabList" :key="index" class="nav-item" :class="{ current: tabFromIndex === item.state }" @click="tabClicks(item.state)">
				{{ item.text }}
			</view>
		</view>
		<view v-for="(item, index) in list" :key="index" class="item">
				<view class="solids-bottom " style="color: #333333;font-size: 32upx; overflow: hidden;text-overflow: ellipsis;white-space:nowrap">
				交易类型 ： 新生				 日期：
				{{ item.title }}
				</view>
				<view style="color: #666666;font-size: 28upx;margin-top: 10upx;">{{ item.content }}</view>
				<view style="color: #666666;font-size: 28upx;margin-top: 10upx;">{{ item.content }}</view>
				<view style="color: #666666;font-size: 28upx;margin-top: 10upx;">{{ item.content }}</view>
		
				<!-- <view style="margin-top: 10upx;color: #999999;font-size: 28upx;text-align: right;">{{ item.createAt }}</view> -->
		</view>
		<view v-if="list.length === 0" style="background: #FFFFFF;text-align: center;padding-top: 140upx">暂无消息</view>
	</view>
</template>

<script>
	import LiFilter from '@/components/Li-Filter/Li-Filter.vue';
	 import biaofunDatetimePicker from '@/components/biaofun-datetime-picker/biaofun-datetime-picker.vue';
	export default {
		components: {
			LiFilter,
			biaofunDatetimePicker
		},
		data() {
			return {
				tabFromIndex: 5,
				tabCurrentIndex: 0,
				fromInfo: 5, 
				page: 0,
				scrollTop: false,
				tabList: [
					{
						state: 5,
						text: '全部',
						totalElements: 0
					},
					{
						state: 4,
						text: '完成',
						totalElements: 0
					},
					{
						state: 6,
						text: '失败',
						totalElements: 0
					}
				],
				list:[
					{
						title:"tite",
						content:"sssss",
						createAt:"20200611"
					},
					{title:"tite",
						content:"sssss",
						createAt:"20200611"},
					{title:"tite",
						content:"sssss",
						createAt:"20200611"}  ],
				isshow:true , 
				selected:{},
				isFixtop: {
					type: Boolean,
					default: true
				},
				fixedTop:false,  //标题置顶
				data: [
					{
						value: 1,  
						text: '分润'
					},
					{
						value: 2,
						text: '奖金'
					},
					{
						value: 3,
						text: '提现'
					},
					{
						value: 4,     
						text: '快捷'
					},
					{
						value: 5,
						text: '代还进账'
					},
					{
						value: 6,
						text: '代还出账'
					}
				],
				height: 0.6,
				title: '交易类型',
				type:'分润',
				starDate:'2010-06-14',
				endDate:'2120-06-14' 
			}; 
		},
		onPageScroll: function(e) {
			this.scrollTop = e.scrollTop > 200;
		},
		onReachBottom: function() {
			this.page = this.page + 1;
			this.loadData();
		},
		onLoad(options) {
			this.$queue.showLoading("加载中...")
			this.loadData();
		},
		methods: {
			//顶部渠道点击
			tabClicks(index) {
				this.list = [];
				this.page = 0;
				this.tabFromIndex = index; 
				this.$queue.showLoading("加载中...")
				this.loadData();
			},
			//获取消息列表
			loadData() {
				// this.tabClicks(this.tabFromIndex);
				let that = this;
				let number = 10;
				let token = this.$queue.getData('token');
				this.$Request.postP('/pay/bankSignConfirm',{
					"type": this.type,  //分润 奖金 提现 快捷 代还进账 代还出账
					"time_start": this.starDate,
					"time_end": this.endDate,
					"userid": "2",
					"page":  parseInt(this.page),
					"num": number
				}).then(res => {
					console.log(res);
					 if (res.status === 0) {
					 	res.data.forEach(d => {
					 		this.list.push(d);
					 	});
					 }
					 uni.hideLoading();
					// console.log(this.options);
				});
				
				
				if (token) { 
					this.$Request
						.getT('/message/findType/' + this.$queue.getData('userId') + '/' + parseInt(this.tabFromIndex) + '/' + parseInt(this.page) + '/' + number)
						.then(res => {
							if (res.status === 0) {
								res.data.content.forEach(d => {
									this.list.push(d);
								});
							}
							uni.hideLoading();
						});
				}else
				{
					uni.hideLoading();
				}
			},
			
			/**
			 * 确认选择日期时间
			 * @param {Object} date 日期数据
			 */
			changeDatetimePicker(date) {
				this.starDate = date.f7;
				console.log('选择的日期时间数据：', date);
				this.tabClicks(this.tabFromIndex);
			},
			changeDatetimePicker1(date) {
				this.endDate = date.f7;
				console.log('选择的日期时间数据：', date);
				this.tabClicks(this.tabFromIndex);
			},
			showIs(){
				this.isshow = !this.isshow;
			},  
			selectItem(item) {
				console.log(item);
				var returnData = {
					root:this.root,
					nodes: item,
					data: item
				};
				this.selected = item;
				returnData = JSON.parse(JSON.stringify(returnData));
				this.title = returnData.data.text;
				console.log(returnData);
				this.isshow = !this.isshow;
				this.type = returnData.data.text;
				this.tabClicks(this.tabFromIndex);
				// this.$emit('select', returnData);
			}, 
		}
	}
</script>

<style lang="scss"> 
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
</style>
