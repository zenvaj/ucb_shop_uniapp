<template>
	<view>
		<view class="uni-padding-wrap">
			
			
			
		<block v-if="hasLogin === true">
			<view class="uni-h3 uni-center">已登录</view>
			<view class="uni-hello-text uni-center">
				<text>{{loginProvider}}你好，每个账号仅需登录 1 次，\n后续每次进入页面即可自动拉取用户信息。</text>
			</view>
			
			
			
			
		</block>
		<block v-if="hasLogin === false">
			<view class="uni-h3 uni-center">未登录</view>
		</block>
		<view class="uni-flex uni-column">
			
			<view class="flex-item flex-item-V">
				<view class="btn" @click="IMtoLogin">调起原生登录页面 -> 原生主功能页</view>
			</view>
			
			
			<view class="flex-item flex-item-V" v-if="hasLogin === true">
				<view class="btn" @click="IMtoMain">调起原生主功能页</view>
			</view>
			
			<view class="flex-item flex-item-V">
				<view class="btn" @click="getVersion">极光IM版本号</view>
			</view>
			<view class="flex-item flex-item-V">
				<navigator class="btn" url="../register/register">极光IM用户注册</navigator>
			</view>
			<view class="flex-item flex-item-V">
				<navigator class="btn" url="../login/login">极光IM用户登录</navigator>
			</view>
			<view class="flex-item flex-item-V">
				<view class="btn" @click="logoutUser">极光IM用户退出</view>
			</view>
			<view class="flex-item flex-item-V">
				<view class="btn" @click="getMyInfo">获取当前IM用户信息</view>
			</view>
			<view class="flex-item flex-item-V">
				<view class="btn" @click="getAllUnreadCount">获取所有会话未读消息总数</view>
			</view>
			<view class="flex-item flex-item-V">
				<view class="btn" @click="setBadge">设置/清除角标（iOS only）</view>
			</view>
			<!-- <view class="flex-item flex-item-V">
				<navigator class="btn" url="../im-chat/single">选择客服/用户创建会话</navigator>
			</view> -->
			<view class="flex-item" v-for="(item,index) in artList" :key="index">
				<text>{{item}}</text>
			</view>
		</view>
		
		</view>
		
		<msg-popup></msg-popup>
		
		<!-- 右上角申请按钮弹出框 -->
		<!-- <view class="triangle"></view> -->
		<view class="material-apply" v-show="showMenu">
			<view class="apply-list">
				<view class="apply-item" @click="showDialog1">
					<image class="apply-icon" src="../../static/img/im/addFriend.png" mode="widthFix"></image>
					<text>添加好友</text>
				</view>
				<view class="apply-item" @click="showDialog2">
					<image class="apply-icon" src="../../static/img/im/addSingle.png" mode="widthFix"></image>
					<text>创建单聊</text>
				</view>
				<view class="apply-item" @click="showDialog3">
					<image class="apply-icon" src="../../static/img/im/addSingle.png" mode="widthFix"></image>
					<text>创建单聊（原生）</text>
				</view>
				<!-- <view class="apply-item" @click="addGroup">
					<image class="apply-icon" src="../../static/img/im/addGroup.png" mode="widthFix"></image>
					<text>创建群聊</text>
				</view> -->
			</view>
		</view>
		
		<uni-dialog title="添加好友" :show="show1" v-on:closeDialog="closeDialog1">
			<view slot="content">
				<view class="dialog-content1">
					<input class="uni-input" v-model="friendUsername" placeholder="请输入用户帐号" />
					<input class="uni-input" v-model="friendReason" placeholder="请输入原因" />
				</view>
			</view>
			<view slot="btns">
				<view class="dialog-btns">
					<view><button type="primary" @tap="closeDialog1">关闭</button></view>
					<view><button type="primary" @tap="confirm1" formType="submit" style="color:#3688FF;">发送好友邀请</button></view>
				</view>
			</view>
		</uni-dialog>
		
		<uni-dialog title="创建单聊" :show="show2" v-on:closeDialog="closeDialog2">
			<view slot="content">
				<view class="dialog-content1">
					<input class="uni-input" v-model="singUsername" placeholder="请输入用户帐号" />
				</view>
			</view>
			<view slot="btns">
				<view class="dialog-btns">
					<view><button type="primary" @tap="closeDialog2">关闭</button></view>
					<view><button type="primary" @tap="confirm2" formType="submit" style="color:#3688FF;">创建</button></view>
				</view>
			</view>
		</uni-dialog>
		
		<uni-dialog title="创建单聊" :show="show3" v-on:closeDialog="closeDialog3">
			<view slot="content">
				<view class="dialog-content1">
					<input class="uni-input" v-model="singUsername" placeholder="请输入用户帐号" />
				</view>
			</view>
			<view slot="btns">
				<view class="dialog-btns">
					<view><button type="primary" @tap="closeDialog3">关闭</button></view>
					<view><button type="primary" @tap="confirm3" formType="submit" style="color:#3688FF;">拉起原生界面</button></view>
				</view>
			</view>
		</uni-dialog>
				
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import uniDialog from '@/components/im-chat/uni-dialog.vue'
	
	var _self;
	export default {
		components: {
			uniDialog
		},
		computed: {
			...mapState(['hasLogin', 'loginProvider','nickname'])
		},
		data() {
			return {
				title: 'Hello',
				username: "",
				password: "",
				artList: [],
				singUsername: "Yoyo02",
				badge:0,
				showMenu:false,
				show1:false,
				friendUsername:"",
				friendReason:"",
				show2:false,
				show3:false,	// 单聊（原生）
			}
		},
		//下拉刷新
		onPullDownRefresh: function() {
			// 检测用户
			this.checkCurrentUser();
		},
		onNavigationBarButtonTap(){				
			this.showMenu = !this.showMenu;
		},
		onLoad() {
			_self = this;

			// #ifdef APP-PLUS
			uni.showToast({
				title: '初始化成功',
				icon:'none'
			});
			
			this.init();
			// #endif
			
		},
		methods: {
			...mapMutations(['login','logout']),
			init:function(){
				// 检测用户
				this.checkCurrentUser();
			},
			checkCurrentUser:function(){
				uni.stopPullDownRefresh(); // 停止刷新
				
				// #ifdef APP-PLUS
				// 如果没有登录
				if(!this.hasLogin){
					// 检测当前IM是否登录，如果已经已经登录，则调用登录方法
					this.$store.dispatch("checkCurrentIMUser").then(response => {
						uni.showToast({
							title: '自动登录中..',
							icon:'none'
						});
						// console.log(response);
						_self.login(response.username);
					}, response => {
						uni.showToast({
							title: response,
							icon:'none'
						});
						// console.log("JMessagePlugin sendSingleTextMessage error:" + response);
					})
				}
				// #endif	
			},
			getVersion: function() {
				this.jpushIM.getVersion((string) => {
					this.artList.unshift(string);
					
					// uni.vibrateLong({
					// 	success: function() {
					// 		console.log('测试长震动');
					// 	}
					// });
					
					uni.showModal({
						title: '当前IM版本信息',
						content: string,
						showCancel: false,
						cancelText: '',
						confirmText: '确定',
					});
				})
			},
			// 用户退出，如果上层不主动调用 logout 接口，原则上是一直处于登录的。
			logoutUser: function() {
				if (!this.hasLogin) {
					uni.showToast({
						title: '您还未登录',
						icon: 'none'
					});
					return false;
				}
				uni.showLoading({
					title: '退出登录..',
					mask: false
				});
				this.jpushIM.logout((res) => {
					uni.hideLoading();
					this.artList.unshift(JSON.stringify(res));
					
					_self.logout();
					uni.showModal({
						title: '退出登录',
						content: res.errorMsg,
						showCancel: false,
						cancelText: '',
						confirmText: '确定',
						success: res => {
							
						},
						fail: () => {},
						complete: () => {}
					});
					// console.log('JMessagePlugin logout success ' + JSON.stringify(res))
				})
			},
			// 获取当前登录用户信息(接口已弃)
			getMyInfo: function() {
				
				this.jpushIM.getMyInfo((res) => {
					if(res.errorCode == 0){
						this.artList.unshift(JSON.stringify(res));
						// uni.showModal({
						// 	title: '当前IM用户信息',
						// 	content: JSON.stringify(res.data),
						// 	showCancel: false,
						// 	cancelText: '',
						// 	confirmText: '关闭'
						// });
					}else{
						uni.showModal({
							title: '获取失败',
							content: "原因：" + res.errorMsg,
							showCancel: false,
							cancelText: '',
							confirmText: '确定',
							success: res => {	
								if (res.confirm) {
									console.log("点击了确定按钮")
								} 
							}
						});
					}
					// console.log('JMessagePlugin logout success ' + JSON.stringify(res))
				})
				
			},
			// 会话记录是否存在
			getSingleConversation: function() {
				if (!this.singUsername) {
					uni.showToast({
						title: '会话人名称不可为空',
						icon: 'none'
					});
					return false;
				}
				// #ifdef H5
				uni.showModal({
					title: '警告',
					content: 'H5页面不支持，请在app中调用该接口',
					showCancel: false,
					cancelText: '',
					confirmText: '关闭',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
				// #endif

				// #ifdef APP-PLUS
				this.jpushIM.getSingleConversation(this.singUsername, (res) => {
					uni.showModal({
						title: '获取会话信息',
						content: "存在",
						showCancel: false,
						cancelText: '',
						confirmText: '确定',
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
					this.artList.push(JSON.stringify(res));

				}, (err) => {
					this.artList.push(JSON.stringify(err));
					uni.showToast({
						title: err.errorMsg,
						icon: "none"
					});
				})
				// #endif
			},
			getAllUnreadCount: function() {
				this.jpushIM.getAllUnreadCount((count) => {
					this.badge = count;
					this.artList.unshift("所有会话未读消息总数：" + count);
				})
			},
			setBadge:function(){
				this.artList.unshift("设置角标数为：" + this.badge);
				this.jpushIM.setBadge(this.badge);
			},
			addGroup:function(){
				
			},
			showDialog1: function(index) {
				this.show1 = true;
				this.showMenu = false;
			},
			closeDialog1: function() {
				this.show1 = false;
			},
			confirm1: function(){
				// 添加好友调接口
				let params = {
					"username": this.friendUsername,
					"reason": this.friendReason
				}
				// #ifdef APP-PLUS
				_self.jpushIM.sendInvitationRequest(params, (res) => {
					if (res.errorCode == 0) {
						uni.showToast({
							title: res.errorMsg,
							icon: 'none'
						});
						_self.closeDialog1(); 		// 关闭dialog
						// _self.friendUsername = "";
						// _self.friendReason = "";
					} else {
						uni.showModal({
							title: '操作失败',
							content: "原因：" + res.errorMsg,
							showCancel: false,
							cancelText: '',
							confirmText: '关闭'
						});
					}
				})
				// #endif
			},
			showDialog2: function(index) {
				this.show2 = true;
				this.showMenu = false;
			},
			closeDialog2: function() {
				this.show2 = false;
			},
			confirm2: function(){
				// 创建单聊调接口
				var chatUser = this.singUsername;
				_self.jpushIM.skipToSingleChat(chatUser, (res) => {
					this.showMenu = false;
					var data = res.data;
					uni.navigateTo({
						url: '../im-chat/im-chat?title=' + data.title + '&fromUser=' + chatUser
					});
				}, (err) => {
					this.showMenu = false;
					uni.showToast({
						title: "创建会话失败:" + err.errorMsg,
						icon: "none"
					});
				})
			},
			showDialog3: function(index) {
				this.show3 = true;
				this.showMenu = false;
			},
			closeDialog3: function() {
				this.show3 = false;
			},
			confirm3: function(){
				// 创建单聊拉起原生界面
				var chatUser = this.singUsername;
				_self.jpushIM.IMtoSingleChat(chatUser, (res) => {
					this.showMenu = false;
					
					uni.showModal({
						title: '结果',
						content: '',
						showCancel: false,
						cancelText: '',
						confirmText: '',
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
					
				}, (err) => {
					
					this.showMenu = false;
					uni.showToast({
						title: "创建会话失败:" + err.errorMsg,
						icon: "none"
					});
					
				})
			},
			IMtoLogin:function(){
				// 调起原生登录页面，以及整个
				_self.jpushIM.IMtoLogin();
			},
			IMtoMain:function(){
				// 调起原生登录页面，以及整个
				_self.jpushIM.IMtoMain();
			},
		}
	}
</script>

<style>
	/* .content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 15px;
	} */
	page{
		padding-top: 20upx;
	}
	.flex-item-V {
		width: 100%;
		/* height: 150upx; */
		text-align: center;
		/* line-height: 150upx; */
	}
	.btn {
		margin: 15upx 80upx;
		padding: 5px 10px;
		background: #C0C0C0;
		color: #FFFFFF;
		text-align: center;
	}

	input {
		width: 200px;
		border: 1px solid #c6c6c7;
		padding: 5px 10px;
		margin-top: 5px;
		font-size: 14px;
	}
	
	/* 右上角下拉菜单 */
	.material-apply{
		/* width: 240upx; */
		display: flex;
		position: fixed;
		z-index: 9999;
		top: 70rpx;
		right: 0;
		/* #ifdef APP-PLUS */
		top: 0upx;
		right: 12upx;
		/* #endif */
		background: url("../../static/img/im/aplly-bg.png") no-repeat;
		background-size: 100% 100%;
	}
	.apply-list{
		width: 100%;
		display: flex;
		flex-direction: column;
		color: #fff;
		font-size: 30upx;
		font-weight: 500;	
		padding: 30rpx 0 20rpx 0;
	}
	.apply-item{
		display: flex;
		align-items: center;
		width: 100%;
		height: 60upx;
		margin-top: 20rpx;
		padding: 0 30rpx 0 0;
	}
	.apply-item:hover{
		background-color: rgba(255,255,255,.4);
	}
	.apply-icon{
		width: 40rpx;
		margin: 0 20rpx;	
	}
	
	/* 模态对话框 */
	.dialog-btns {
		display: flex;
		width: 100%;
		padding: 10px 0;
		flex-wrap: nowrap;
	}

	.dialog-btns view {
		width: 100%;
		border-right: 1px solid #F5F6F8;
	}

	.dialog-btns view:last-child {
		border: 0;
	}

	.dialog-btns button {
		width: 100%;
		padding: 0;
		text-align: center;
		background: none;
		border: none;
		box-shadow: none;
		height: 25px;
		font-size: 14px;
		color: #888888;
		line-height: 25px;
		border-radius: 0;
	}

	.dialog-btns button:after {
		width: 0;
		height: 0;
		border: 0;
	}

	.dialog-btns .button-hover {
		background: none;
		color: #3688FF;
	}

	.dialog-content1 {
		padding: 15upx;
		background: #F8F8F8;
	}

	.dialog-content1 .uni-input {
		margin-bottom: 15upx;
		width: inherit;
	}

	.dialog-content1 .uni-textarea {
		padding: 15upx;
		box-sizing: border-box;
	}
</style>
