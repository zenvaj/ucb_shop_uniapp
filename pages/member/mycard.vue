<template>
	<view class="wallet index-goods"> 
		<view class="card-box" :class="{ down: selectKey !== null }">
			<view class="card-list" v-for="(item, index) in options" :key="index" :class="{ up: selectKey == index }">
				<view class="title" @click="selListItem(index, item.id)">
					<view class="box">
						<view style="display: flex;">
							<view><image style="width: 80upx; height: 80upx;margin-top: 20upx; margin-left: 20upx;" src="../../static/img/yhk_logo_02.png"></image></view>
							<view>
								<view class="hd">
									<text class="info">{{ item.bankname }}</text>
									<view class="wrap" @click.stop="moveStopTo(item.id,$event)"><text class="cuIcon-settings" style="color: #ffffff;" ></text></view>
								</view>

								<view class="main">{{ item.banknumber }}</view>
							</view>
						</view>

						<view v-if="isFlag" class="bd" style="margin-top: 15rpx;" @click.stop="moveHandleStop">中转金：{{ item.bd }}</view>
						<view @click.stop="moveHandleStop" v-if="!isFlag" class="flex" style="margin-top: 25rpx;margin-left: 53.72upx;">
							请输入金额 ：
							<input type="digit" v-model="money" placeholder="输入金额" style="width: 230upx;" />
						</view>
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
				<view class="content">
					<view class="nuter">
						<view :class="target == 0 ? 'active' : ''" @click="setIndex" data-index="0">智能养卡</view>
						<view :class="target == 1 ? 'active' : ''" @click="setIndex" data-index="1">快捷支付</view>
					</view>  
					<swiper :duration="500" :current="thisindex"   @change="toggle" circular="true" :id="index" style="height: 100%;">
						<swiper-item>
							<view style="height: 220px;overflow:auto;">
							<!-- {{item.trade_info.daihuan.daihuan_yue}} -->
							<!-- 按顺序对应第一个的内容 -->  
							<view v-for="(item1, index1) in item.trade_info.daihuan.daihuan_yue" :key="'yue-'+index1" style="line-height: 80rpx; margin-top: 5rpx;">
								<text class="bg-gray" >{{ item1.show_name }}</text> --
								<text class="line-blue" @click="ShowTradeInfo(item1.id)" >查看详情</text> -- 
								<text v-if="item1.is_sign===1" class="line-green" @click="addPlan(item1.id,item.id)">添加计划</text> 
								<text v-if="item1.is_sign===0"  class="line-green" @tap="jihuo(item1.id,item.id)" data-target="DialogModal1">激活通道</text>-- 
								<text class="line-red" @click="addPlan(item1.id,item.id)">查看计划</text> 
							 </view>
							 
							 <view v-for="(item1, index1) in item.trade_info.daihuan.daihuan_kongka" :key="'kongka-'+index1" style="line-height: 80rpx; margin-top: 5rpx;">
							 	<text class="bg-gray" >{{ item1.show_name }}</text> --
							 	<text class=" line-blue" @click="ShowTradeInfo(item1.id)" >查看详情</text> -- 
							 	<text v-if="item1.is_sign===1" class="line-green" @click="addPlan(item1.id,item.id)">添加计划</text> 
							 	<text v-if="item1.is_sign===0"  class="line-green" @tap="jihuo(item1.id,item.id)" data-target="DialogModal1">激活通道</text>-- 
								<text class="line-red" @click="addPlan(item1.id,item.id)">查看计划</text>
								</view>
							 </view>
						</swiper-item>
						<swiper-item>
							<view v-if="item.trade_info.kuaijie.enable" v-for="(item1, index1) in item.trade_info.kuaijie.enable" :key="'kuaijie-'+index1" style="line-height: 80rpx; margin-top: 5rpx;">
								<text class=" bg-gray" >{{ item1.show_name }}</text> --
								<text class=" line-blue" @click="ShowTradeInfo(item1.id)" >查看详情</text> -- 
								<text v-if="item1.is_sign===1" class="line-green" @click="easyPayCreate(item1.id,item.id)" >交易</text> 
								<text v-if="item1.is_sign===0"  class="line-green" @tap="jihuo(item1.id,item.id)" data-target="DialogModal1">激活通道</text>
							</view>
							<!-- 按顺序对应第二个的内容 -->

							<!-- 	<view>快捷A 交易</view>
							<view>快捷环讯通道B 交易</view>
							<view>快捷首信易通道 交易</view>
							<view>快捷昌杰通道C 激活</view> -->
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		
		<chunLei-popups v-model="value1" :popData="data1" @tapPopup="tapPopup" :x="x" :y="y" ></chunLei-popups>
		 
		<view class="cu-modal" :class="modalName=='Image'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar justify-center ">
					<view style="font-size: 50rpx;">{{showTradeName}}</view>
					<!-- <view class="action" @tap="hideModal">
						<text class="cuIcon-close "></text>
					</view> -->
				</view> 
				
				<rich-text :nodes="showTradeInfo"></rich-text>
				
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub  solid-left" @tap="hideModal">我知道了</view>
				</view>
			</view>
		</view>
			
		<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">Modal标题</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl"> 
					<view>请认真输入收到的短信验证码</view>
					<view class="cu-form-group">
					 	<text>验证码</text>
					 	<input  v-model="smsCode" placeholder="输入验证码" name="input"></input>  
					</view>
				</view>
				<view class="cu-bar bg-white justify-center">
					<view >
						<!-- <button class="cu-btn line-green text-green" @tap="hideModal">取消</button> -->
						<button class="cu-btn bg-green margin-left"   @click="jhconfirm">确定激活</button>
					</view>
				</view>
			</view>
		</view>
		
		<view class="navBarButtonBox">
			<!-- 顶部右侧菜单 -->
			<view v-if="navBarButton" class="goods_shop_cart_bg navBarButton" @tap="showShopCartBg('nav')" @touchmove.stop.prevent="moveHandleStop"></view>

			<!-- #ifdef H5 -->
				<view style="margin-top: 16upx;" class="h_newlit" v-bind:class="[navBarButton ? 'active' : '', '']">
			<!-- #endif -->
			<!-- #ifndef H5 -->
				<view style="margin-top: 66upx;" class="h_newlit" v-bind:class="[navBarButton ? 'active' : '', '']">
			<!-- #endif -->
			<view class="em">
				<view style="font-size: 28upx" @tap="navBarButtontO('home')">
					<text class="iconfont icon-shouye"></text>
					返回首页
				</view>
				<!-- <view style="font-size: 28upx" @tap="navBarButtontO('search')">
					<text class="iconfont icon-sousuo"></text>
					超级搜索
				</view>
				<view style="font-size: 28upx" @tap="navBarButtontO('footer')">
					<text class="iconfont icon-zuji"></text>
					我的足迹
				</view> -->
				<view style="font-size: 28upx" @tap="navBarButtontO('addcard')">
					<text class="iconfont icon-shoucang"></text>
					添加信用卡
				</view>
				<view style="font-size: 28upx" @tap="navBarButtontO('like')">
					<text class="iconfont icon-wode"></text>
					个人中心
				</view>
			</view>
			</view>
			</view>
			<!-- 顶部右侧菜单 -->
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
			trade_id:"",
			bank_id:"",
			smsCode:'',
			signOrderid:'',//确认接口传这个参数 hnapayOrderId
			daihuan:[],
			showTradeName:"",
			showTradeInfo:"",
			modalName:null,
			x:200,
			y:20,
			value1:false ,
			money: '',
			isFlag: true,
			selectKey: null,
			navBarButton: false,
			active_card_id:0,
			trade: [], //通道
			// 当前样式
			target: 0,
			// 当前item位置
			thisindex: 0,
			data1:[
				{
					title:'删除',
					cuIcon:'cuIcon-card', 
					disabled:true
				},
				{
					title:'修改',
					cuIcon:'cuIcon-card', 
				},
				// {
				// 	title:'扫一扫',
				// 	icon:'../../static/scan_icon.png'
				// },
				// {
				// 	title:'面对面快传',
				// 	icon:'../../static/zhifeiji.png'
				// },
				// {
				// 	title:'收付款',
				// 	icon:'../../static/shoufukuan.png'
				// }
			],
			options:[ ]
		};
	},
	
	created() {
		console.log('onLoad 状态===============》');
		this.$Request.postP('/bank/bag',{
			"type": "xyk"
		}).then(res => {
			console.log(res);
			this.options = res.data;
			// console.log(this.options);
		});
	},
	onNavigationBarButtonTap: function() {
		//console.log('kkkk');
		this.navBarButton = !this.navBarButton;
		//console.log(this.navBarButton);
	},
	methods: { 
		easyPayCreate(trade_id,bank_id){
			//快捷支付
			console.log(this.money)
			if(this.money <= 0){
				uni.showToast({
					title: '请输入消费金额！',
					icon: 'none'
				});
				return;
			}
			this.$queue.showLoading("请稍后...");
			this.$Request.postP('/easyPayCreate',{
				    "trade_id": trade_id, //通道id
				    "bank_id": bank_id ,//银行卡id 
					"pay_type": "快捷",
					"money": this.money,
			}).then(res => {
				console.log(res);
				if (res.status === 10000) { 
					 uni.navigateTo({
					 	url: '/pages/member/kuaijie?url=' + res.data.url
					 });
				}else{
					 uni.showToast({
					 	title: res.msg,
					 	icon: 'none'
					 });
				}
			});
			uni.hideLoading();
		},
		jhconfirm(){
			//确认绑卡
			this.$queue.showLoading("请稍后...");
			this.$Request.postP('/pay/bankSignConfirm',{
				    "trade_id": this.trade_id, //通道id
				    "bank_id": this.bank_id ,//银行卡id 
					"signOrderid": this.signOrderid,
					"smsCode":this.smsCode,
			}).then(res => {
				console.log(res);
				uni.hideLoading();
				if (res.status === 10000) { 
					uni.showToast({
						title: '激活成功！',
						icon: 'none'
					});
					this.modalName = null;
				}else{
					uni.showToast({
						title: res.msg,
						icon: 'none'
					});
				} 
			});
			uni.hideLoading();
		},
		jihuo(planid,cardid){
			//this.$queue.showLoading("正在发送验证码...");
			this.trade_id =planid;
			this.bank_id = cardid;
			this.$Request.postP('/pay/bankSign',{
				    "trade_id": planid, //通道id
				    "bank_id": cardid //银行卡id
			}).then(res => {
				console.log(res);
				if (res.status === 10000) {
					console.log('is_sign_auto')
					if(res.data.is_sign_auto == 1){
						uni.showToast({
							title: '激活通道成功！',
							icon: 'none'
						});
						uni.redirectTo({
						    'url':'/pages/member/mycard'
						});
						return;
					}
					this.signOrderid = res.data.hnapayOrderId;
					uni.showToast({
						title: '短信发送成功！',
						icon: 'none'
					});
					this.modalName ='DialogModal1';
				}else{
					uni.showToast({
						title: res.msg,
						icon: 'none'
					});
				}

			});
			
			///发送验证码
		},
		showModal(e) {
			this.modalName = e.currentTarget.dataset.target
		},
		addPlan(planid,cardid){
			uni.navigateTo({
				url:'../daihuan/daihuan?planid='+planid+'&cardid='+cardid
			});
		},
		/**
		 * 确认选择日期时间
		 * @param {Object} date 日期数据
		 */
		changeDatetimePicker(date) {
			this.card_exp = date;
			console.log('选择的日期时间数据：', date);
		},
		hideModal(e) {
			this.modalName = null
		},
		ShowTradeInfo(id){
			console.log(id);
			this.$Request.postP('/trade/detail',{
				"trade_id": id
			}).then(res => {
				console.log(res.data.show_name);
				this.showTradeName = res.data.show_name
				this.showTradeInfo = res.data.des;
				// this.options = res.data;
				// console.log(this.options);
			});
			
			
			this.modalName = "Image";
		},
		tapPopup(e){
			console.log(this.active_card_id,e);
			uni.showToast({
				title:e.title,
				icon:'none'
			})
		},
		// 切换触发的事件
		toggle(e) {
			// console.log(e);
			let index = e.detail.current;
			this.target = index;
			this.thisindex = index;
			// console.log(index);
			if (index == 0) {
				this.isFlag = true;
			}
			if (index == 1) {
				this.isFlag = false;
			}
		
		},
		// 点击nav控制下面的展示
		setIndex(e) {
			let index = e.currentTarget.dataset.index;
			this.thisindex = index; 
		},
		showShopCartBg: function(type) {
			console.log(type);
			if (type === 'cart') {
				this.shopCartBg = !this.shopCartBg;
			}
			if (type === 'nav') {
				this.navBarButton = !this.navBarButton;
			}
			console.log(this.navBarButton);
		},
		moveStopTo(active_card_id,e) { 
			this.x = e.detail.x-40;
			this.y = e.detail.y+10;
			// this.x = e.touches[0].clientX;
			// this.y = e.touches[0].clientY;
			this.value1 = !this.value1
			this.active_card_id = active_card_id
			console.log(e);
		},
		moveHandleStop: function() {
			//console.log('111');
		},
		selListItem(index, aaa) {
			// //当显示其中一个时，点击另一个，整体闭合
			// if (this.selectKey == null) {
			//     this.selectKey = index;
			// } else {
			//     this.selectKey = null;
			// }
			//当显示其中一个时，点击那个显示那个
			// console.log(aaa);
			// console.log(index);
			if (index == this.selectKey) {
				this.selectKey = null;
			} else {
				aaa;
				this.selectKey = index;
			}
		},
		navBarButtontO: function(type) {
			if (type === 'search') {
				uni.switchTab({
					url: '/pages/homeSearch/index'
				});
			} else if (type === 'like') {
				uni.switchTab({
					url: '/pages/member/user'
				});
			} else if (type === 'footer') {
				uni.navigateTo({
					url: '/pages/footer/index'
				});
			} else if (type === 'home') {
				uni.switchTab({
					url: '/pages/index/index'
				});
			} else if (type === 'addcard') {
				uni.navigateTo({
					url: '/pages/member/addcard'
				});
			}
		}
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
	position: absolute;
	top: 0;
	bottom: 0;
	/* overflow: hidden; */
}
.card-box {
	position: relative;
	top: 20px;
	transition: all linear 0.2s;
	width: 100%;
}

.card-list {
	position: absolute;
	left: 0;
	width: 100%;
	border-radius: 12px;
	padding: 0 20px;
	box-sizing: border-box;
}

.title {
	height: $card;
	border-radius: 12px;
	box-shadow: 1px 1px 12px #ccc;
}

.content {
	height: $content;
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
	margin-left: 53.72rpx;
	width: 520rpx;
	height: 51.58rpx;
}

.info {
	max-width: 569.48rpx;
	height: 40rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	line-height: 40rpx;
	white-space: nowrap;
	color: rgba(19, 19, 21, 0.5);
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
	font-size: 21.49rpx;
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
	font-size: 21.49rpx;
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
}
.nuter view {
	flex: 1;
	font-size: 30rpx;
	text-align: center;
	transition: all 0.5s ease 0.1s;
	background-color: #f0f0f0;
}
.active {
	box-sizing: border-box;
	color: #007aff;
	border-bottom: 5rpx solid #00aaff;
	background-color: #f3ffff;
	border-radius: 10rpx;
	box-shadow: 3px 3px 5px #888888;
}
swiper-item {
	width: 100%;
	overflow: hidden;
	text-align: center;
	line-height: 300rpx;
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

	
</style>
