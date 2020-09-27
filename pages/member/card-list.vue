<template>
	<view class="wallet index-goods"> 
		<view class="card-box" :class="{ down: selectKey !== null }">
			<view class="card-list" v-for="(item, index) in options" :key="index" :class="{ up: selectKey == index }">
				<view class="title" @click="selListItem(index, item.id, item)">
					<view class="box">
						<view style="display: flex;">
							<view style="padding-left: 50upx;"><image style="width: 80upx; height: 80upx;margin-top: 20upx;" src="../../static/img/yhk_logo_02.png"></image></view>
							<view>
								<view class="hd">
									<text class="info">{{ item.bankname }}</text>
									<view class="wrap" @click.stop="moveStopTo(item.id,$event)"><text class="cuIcon-delete" style="color: #ffffff;" ></text></view>
								</view>
								<!-- cuIcon-settings -->
								<view class="main">{{ item.banknumber }}</view>
							</view>
						</view>

						<view class="bd" style="margin-top: 15rpx;font-size:26upx;">总额度：123456789</view>
						<view class="ft">
							<view class="block">
								<text class="date">日期</text>
								<text class="word">{{ item.exp_or_ }}</text>
							</view>
							<view class="group">
								<text class="cvv">CVV</text>
								<text class="num">{{ item.cvv2_or_ }}</text>
							</view>
							<view class="block">
								<text class="cvv">账单金额</text>
								<text class="word">392837</text>
							</view>
							<view class="group">
								<text class="cvv">未还金额</text>
								<text class="num">37382.22</text>
							</view>
						</view>
					</view>
				</view>
				
			</view>
		</view>
		
		
		 
		
		
		
	</view>
</template>

<script>
	
	import chunLeiPopups from "@/components/chunLei-popups/chunLei-popups.vue";
	export default {
		components:{
			chunLeiPopups	, 
		},
	data() {
		return {
			bank_id:"",
			x:200,
			y:20,
			value1:false ,
			selectKey: null,
			active_card_id:0,
			options:[ ],
			pageType: 3
		};
	},
	onLoad(query) {
		console.log(query)
		if(query.type === "smart") {
			this.pageType = 0
		}
		if(query.type === "payfor") {
			this.pageType = 1
		}
	},
	created() {
		console.log('onLoad 状态===============》');
		this.$Request.postP('/bank/bag',{
			"type": "xyk"
		}).then(res => {
			console.log(res.data);
			this.options = res.data;
			if(this.options.length == 0) {
				uni.redirectTo({
					url: '/pages/member/addcard'
				})
			}
			// console.log(this.options);
		});
	},
	methods: {
		moveStopTo(active_card_id,e) { 
			this.x = e.detail.x-40;
			this.y = e.detail.y+10;
			// this.x = e.touches[0].clientX;
			// this.y = e.touches[0].clientY;
			this.value1 = !this.value1
			this.active_card_id = active_card_id
			console.log(e);
			console.log(this.active_card_id);
			if(this.active_card_id <= 0 || !this.active_card_id){
				uni.showToast({
					title:'操作银行卡信息错误',
					icon:'none'
				})
				return;
			}
			this.$Request.postP('/bank/detail',{
				"bank_id":this.active_card_id
			}).then(res => {
				console.log(res);
				if(res.data.plan_info.count_plan_work > 0){
					uni.showToast({
						title:'有正在执行的计划，不能执行此次操作。请关闭计划重试。',
						icon:'none'
					})
					return;
				}else{
					//是否有在执行计划
					uni.showModal({
						title:'删除银行卡',
						content:'删除银行卡是不可逆操作，是否执意删除银行卡嗫？',
						cancelColor:'#FF4500',
						success:res=>{
							console.log(this.active_card_id,res)
							this.$Request.postP('/bank/del',{
								"id":this.active_card_id
							}).then(res => {
								uni.showToast({
									title:res.msg,
									icon:'none',
									success:res=>{
										uni.redirectTo({
										    'url':'/pages/member/mycard'
										});
									}
								})
								
							}).catch(()=>{
								uni.showToast({
									title:'错误的操作。想啥呢？',
									icon:'none'
								})
							})
						}
					})
				}
			});
		},
		
		selListItem(index, aaa, item) {
			// //当显示其中一个时，点击另一个，整体闭合
			// if (this.selectKey == null) {
			//     this.selectKey = index;
			// } else {
			//     this.selectKey = null;
			// }
			// 当显示其中一个时，点击那个显示那个
			// console.log(aaa);
			// console.log(index);
			
			// 记录
			// if (index == this.selectKey) {
			// 	this.selectKey = null;
			// } else {
			// 	aaa;
			// 	this.selectKey = index;
			// }
			let bgColor = ['#f5ad1b', '#5f89ce', '#94bf45', '#da8ec5', '#78bfc2', '#bec278', '#f5ad1c', '#5f89ca', '#94bf4a', '#da8eca', '#78bfca', '#bec27a', '#f5ad10', '#5f89cc', '#94bf4c', '#da8ecc', '#78bfcc', '#bec27c']
			uni.navigateTo({
				url: '/pages/member/card-smart?type=' + this.pageType + '&bgColor=' + bgColor[index]
			})
			uni.$emit("card", {
			  data: item,
			});
			console.log("发射事件test成功");
			
		},
		
	}
};
</script>

<style lang="scss" scoped>
@import '../../static/css/index.css';
$liColor: #f5ad1b, #5f89ce, #94bf45, #da8ec5, #78bfc2, #bec278, #f5ad1c, #5f89ca, #94bf4a, #da8eca, #78bfca, #bec27a, #f5ad10, #5f89cc, #94bf4c, #da8ecc, #78bfcc, #bec27c;
$card: 170px;
$content: 300px;
.wallet {
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	// padding-top: 100upx;
	position: fixed;
	top: 0;
	bottom: 0;
	overflow: hidden;
	overflow-y: scroll;
}
.card-box {
	position: relative;
	top: 20px;
	transition: all linear 0.2s;
	width: 100%;
}

.card-list {
	// position: absolute;
	// left: 0;
	width: 100%;
	border-radius: 12px;
	padding: 0 20px;
	margin-bottom: 20px;
	box-sizing: border-box;
}

.title {
	height: $card;
	border-radius: 12px;
	box-shadow: 1px 1px 12px #ccc;
}

.content {
	// height: $content;
	background: #e6e6e6;
	display: none;
	border-radius: 12upx;
	margin-top: 10upx;
}

@each $c in $liColor {
	$i: index($liColor, $c);
	.card-list:nth-child(#{$i}) {
		top: 130px * ($i - 1);
		z-index: $i;
		transition: top linear 0.2s;
	}
	.card-list:nth-child(#{$i}) .title {
		background: $c;
		&:active {
			opacity: 0.8;
		}
	}
}

.card-box.down {
	top: $card + $content;
	transition: top linear 0.2s;
	@for $i from 1 through 50 {
		.card-list:nth-child(#{$i}) {
			top: 100px * ($i - 1);
			transition: top linear 0.2s;
		}
	}

	.card-list.up {
		top: -($card + $content -20px);
		transition: top linear 0.2s;
		.content {
			display: block;
			transform: display linear 0.2s;
		}
	}

	.card-list.up ~ view {
		transform: translateY(-100px);
		transition: transform linear 0.2s;
	}
}
.box {
	display: flex;
	position: relative;
	align-items: flex-start;
	flex-direction: column;
	width: 719.91rpx;
	// height: 483.52rpx;
}

.layer {
	position: absolute;
	top: 0;
	align-self: center;
	width: 719.91rpx;
	height: 483.52rpx;
	overflow: hidden;
}

.hd {
	display: flex;
	position: relative;
	align-items: flex-end;
	flex-direction: row;
	justify-content: space-between;
	margin-top: 5rpx;
	margin-left: 48.72rpx;
	width: 490rpx;
	height: 51.58rpx;
}

.info {
	max-width: 569.48rpx;
	height: 40rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	line-height: 40rpx;
	white-space: nowrap;
	// color: rgba(19, 19, 21,0.5);
	color: rgb(51,51,51);
	font-size: 32rpx;
	font-weight: 500;
}

.wrap {
	display: flex;
	position: relative;
	align-items: center;
	flex-direction: row;
	justify-content: center;
	background-color: rgba(28, 143, 248, 0);
	width: 51.58rpx;
	height: 51.58rpx;
}

.empty {
	position: absolute;
	// top: 20.42rpx;
	// left: 19.34rpx;
	// border-width: 2px;
	// border-style: solid;
	// border-radius: 9.67rpx;
	// border-color: rgba(255, 255, 255, 1);
	width: 12.89rpx;
	height: 12.89rpx;
}

.zhanghaoguanli {
	position: relative;
	width: 30rpx;
	height: 30rpx;
}

.bd {
	position: relative;
	opacity: 1;
	margin-top: 4.3rpx;
	margin-left: 53.72rpx;
	max-width: 653.3rpx;
	// height: 75.21rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	line-height: 75.21rpx;
	white-space: nowrap;
	color: #ffffff;
	font-family: MicrosoftYaHei, Microsoft YaHei;
	// font-size: 69.84rpx;
	font-weight: normal;
}

.main {
	position: relative;
	opacity: 1;
	margin-top: 20rpx;
	margin-left: 53.72rpx;
	max-width: 653.3rpx;
	height: 36.53rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	line-height: 36.53rpx;
	white-space: pre;
	color: #ffffff;
	font-family: MicrosoftYaHei, Microsoft YaHei;
	font-size: 32.23rpx;
	font-weight: normal;
}

.ft {
	display: flex;
	position: relative;
	align-items: flex-start;
	flex-direction: row;
	margin-top: 35.46rpx;
	margin-left: 53.72rpx;
	height: 66.62rpx;
	font-size:26upx;
}

.block {
	display: flex;
	align-items: flex-start;
	flex-direction: column;
	margin-right: 50rpx;
	height: 66.62rpx;
}

.date {
	position: relative;
	max-width: 68.77rpx;
	height: 25.79rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	line-height: 25.79rpx;
	white-space: nowrap;
	color: rgba(19, 19, 21, 0.6);
	font-family: MicrosoftYaHei, Microsoft YaHei;
	// font-size: 21.49rpx;
	font-weight: normal;
}

.word {
	position: relative;
	opacity: 1;
	margin-top: 4.3rpx;
	line-height: 36.53rpx;
	white-space: nowrap;
	color: #ffffff;
	font-family: MicrosoftYaHei, Microsoft YaHei;
	font-size: 32.23rpx;
	font-weight: normal;
}

.group {
	display: flex;
	align-items: flex-start;
	flex-direction: column;
	margin-right: 80rpx;
	height: 66.62rpx;
}

.cvv {
	position: relative;
	line-height: 25.79rpx;
	white-space: nowrap;
	color: rgba(19, 19, 21, 0.6);
	font-family: MicrosoftYaHei, Microsoft YaHei;
	// font-size: 21.49rpx;
	font-weight: normal;
}

.num {
	position: relative;
	opacity: 1;
	margin-top: 4.3rpx;
	line-height: 36.53rpx;
	white-space: nowrap;
	color: #ffffff;
	font-family: MicrosoftYaHei, Microsoft YaHei;
	font-size: 32.23rpx;
	font-weight: normal;
}

.largeIcon {
	margin-top: 18.27rpx;
	width: 73.07rpx;
	height: 42.98rpx;
}

.nuter {
	width: 100%;
	height: 80rpx;
	line-height: 80rpx;
	display: flex;
	justify-content: space-around;
	font-size: 35rpx;
	border-radius: 5px 5px 0 0;
	overflow: hidden;
}
.nuter view {
	flex: 1;
	font-size: 30rpx;
	line-height: 80rpx;
	text-align: center;
	transition: all 0.5s ease 0.1s;
	// background-color: #f0f0f0;
}
.active {
	box-sizing: border-box;
	// color: #007aff;
	color: #ffffff;
	background-color:#00aaff !important;
	opacity: 0.5;
	// border-bottom: 3rpx solid #00aaff;
	// background-color: #f3ffff;
	// border-radius: 10rpx;
	// box-shadow: 3px 3px 5px #888888;
}
swiper-item {
	width: 100%;
	overflow: hidden;
	text-align: center;
	line-height: 300rpx;
	background-color: #ffffff;
	/* background-color: red; */
}
.swiper-item {
	overflow-y: scroll;
	width: 99.5%;
	height: 99%;
	/* background-color: white; */
	/* height: 99%; */
	box-sizing: border-box;
	padding: 1rpx;
}
.cu-form-group .title {
	min-width: calc(4em + 15px);
	height: 40rpx;
}
.pla_color{
	color:#ffffff;
}
.swiper_1{
	// background-color: #5cca47;
	background-color: #00aaff;
	padding:0 60upx;
	opacity: 0.5;
	width:96%;
	height:200upx;
	border-radius: 10upx;
	margin:0 auto;
	margin-top:20upx;
}
.swiper_2{
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.btn_know{
	width:190upx;
	font-size:32upx;
	color:#ffffff;
	background-color:#00aaff;
	height:50upx;
	line-height: 50upx;
	border-radius: 12upx;
	margin:30upx auto;
}
.btn_know::after{
	border:0;
}
</style>
