<template>
	<view>
		
		<block v-if="hasLogin === false">
			<view class="flex solid-bottom padding justify-center">
				<view class="padding-sm margin-xs radius">未登录</view>
			</view>
		</block>
			
		<block v-else>
			
			<view class="flex solid-bottom padding justify-center">
				<view class="padding-sm margin-xs radius">{{loginProvider}}你好，每个账号仅需登录 1 次，\n后续每次进入页面即可自动拉取用户信息。</view>
			</view>
			
		</block>
			
		<view class="flex justify-center">
			<view class="basis-lg bg-grey padding-sm margin-xs radius text-center" @click="getVersion">极光IM版本号</view>
		</view>
		
		<view class="flex justify-center">
			<navigator class="basis-lg bg-grey padding-sm margin-xs radius text-center" url="../register/register">极光IM用户注册</navigator>
		</view>
		
		<view class="flex justify-center">	
			<navigator class="basis-lg bg-grey padding-sm margin-xs radius text-center" url="../login/login">极光IM用户登录</navigator>	
		</view>
		
		<view class="flex justify-center">
			<view class="basis-lg bg-grey padding-sm margin-xs radius text-center" @click="logoutUser">极光IM用户退出</view>
		</view>
		
		<view class="flex justify-center">
			<view class="basis-lg bg-grey padding-sm margin-xs radius text-center" @click="getMyInfo">获取当前IM用户信息</view>
		</view>
		
		<view class="flex justify-center">
			<view class="basis-lg bg-grey padding-sm margin-xs radius text-center" @click="getAllUnreadCount">获取所有会话未读消息总数</view>
		</view>
		
		<view class="flex justify-center">
			<view class="basis-lg bg-grey padding-sm margin-xs radius text-center" @click="setBadge">设置/清除角标（iOS only）</view>
		</view>
				
		<view class="uni-padding-wrap">
			
				<view class="flex-item" v-for="(item,index) in artList" :key="index">
					<text>{{item}}</text>
				</view>

		</view>

		<!-- 右上角申请按钮弹出框 -->
		<view class="material-apply" v-show="showMenu" :style="[{top:StatusBar + 'px'}]">
			<view class="apply-list">
				<view class="apply-item" @click="showDialog1">
					<text>添加好友</text>
				</view>
				<view class="apply-item" @click="showDialog2">
					<text>创建单聊</text>
				</view>
				<view class="apply-item" @click="showDialog3">
					<text>创建群聊</text>
				</view>
			</view>
		</view>

		<!-- 添加好友 -->
		<view class="cu-modal" :class="show1?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">添加好友</view>
					<view class="action" @tap="closeDialog1">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<view class="cu-form-group text-left">
						<view class="title">查询帐号：</view>
						<input placeholder="输入要添加的好友帐号" name="input" v-model="friendUsername"></input>
					</view>
					
					<view class="cu-form-group margin-top text-left">
						<textarea maxlength="-1" placeholder="输入验证信息" v-model="friendReason"></textarea>
					</view>
			
				</view>
				
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="closeDialog1">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="confirm1">确定</button>
		
					</view>
				</view>
			</view>
		</view>


		<!-- 创建单聊入口 -->
		<view class="cu-modal" :class="show2?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">创建单聊</view>
					<view class="action" @tap="closeDialog2">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<view class="cu-form-group text-left">
						<view class="title">用户帐号：</view>
						<input placeholder="输入要聊天的好友帐号" name="input" v-model="singUsername"></input>
					</view>
				</view>
				
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="closeDialog2">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="confirm2">确定</button>

					</view>
				</view>
			</view>
		</view>
		
		<!-- 创建群聊 -->
		<view class="cu-modal" :class="show3?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">创建群聊</view>
					<view class="action" @tap="closeDialog3">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<view class="cu-form-group text-left">
						<view class="title">群名称：</view>
						<input v-model="groupName" placeholder="请输入群聊名称"></input>
					</view>
					<view class="cu-form-group margin-top text-left">
						<textarea maxlength="-1" placeholder="输入群介绍" v-model="groupDesc"></textarea>
					</view>
					<view class="cu-form-group justify-start">
						<view class="title">群属性：</view>
						<radio-group class="uni-center" name="groupType" @change="radioChange">
							<label class="radio" v-for="(item,index) in groupTypeItems" :key="index" >
								<radio :value="item.value" style="transform:scale(0.7)" />{{item.title}}
							</label>
						</radio-group>
					</view>
				</view>
				
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="closeDialog3">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="confirm3">确定</button>
		
					</view>
				</view>
			</view>
		</view>
		

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
			...mapState(['hasLogin', 'loginProvider', 'nickname'])
		},
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				title: 'Hello',
				username: "",
				password: "",
				artList: [],
				singUsername: "Yoyo01",
				badge: 0,
				showMenu: false,
				show1: false,
				friendUsername: "",
				friendReason: "",
				show2: false,
				show3: false,
				groupName: "", // 群聊名称
				groupDesc: "", // 群聊描述
				groupType: "", // 群聊类型
				groupTypeItems:[
					{
						"title":"私有群",
						"value":"private"
					},
					{
						"title":"公开群",
						"value":"public"
					}
				]
			}
		},
		//下拉刷新
		onPullDownRefresh: function() {
			// 检测用户
			this.checkCurrentUser();
		},
		onNavigationBarButtonTap() {
			this.showMenu = !this.showMenu;
		},
		onLoad() {
			_self = this;

			// #ifdef APP-PLUS
			uni.showToast({
				title: '初始化成功',
				icon: 'none'
			});

			this.init();
			// #endif

		},
		methods: {
			...mapMutations(['login', 'logout']),
			init: function() {
				// 检测用户
				this.checkCurrentUser();
			},
			checkCurrentUser: function() {
				uni.stopPullDownRefresh(); // 停止刷新

				// #ifdef APP-PLUS
				// 如果没有登录
				if (!this.hasLogin) {
					// 检测当前IM是否登录，如果已经已经登录，则调用登录方法
					this.$store.dispatch("checkCurrentIMUser").then(response => {
						uni.showToast({
							title: '自动登录中..',
							icon: 'none'
						});
						// console.log(response);
						_self.login(response.username);
					}, response => {
						uni.showToast({
							title: response,
							icon: 'none'
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
					if (res.errorCode == 0) {
						this.artList.unshift(JSON.stringify(res));
						// uni.showModal({
						// 	title: '当前IM用户信息',
						// 	content: JSON.stringify(res.data),
						// 	showCancel: false,
						// 	cancelText: '',
						// 	confirmText: '关闭'
						// });
					} else {
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
			setBadge: function() {
				this.artList.unshift("设置角标数为：" + this.badge);
				this.jpushIM.setBadge(this.badge);
			},
			addGroup: function() {
				// uni.navigateTo({
				// 	url: '../im-chat/im-choose-user'
				// });
			},
			showDialog1: function(index) {
				this.show1 = true;
				this.showMenu = false;
			},
			closeDialog1: function() {
				this.show1 = false;
			},
			confirm1: function() {
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
						_self.closeDialog1(); // 关闭dialog
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
			confirm2: function() {
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
			confirm3: function() {
				// createGroup 创建群组
				// #ifdef APP-PLUS
				this.jpushIM.createGroup({
						name: this.groupName,
						desc: this.groupDesc,
						groupType: this.groupType
					},
					(callback) => {
						if (callback.errorCode == 0) {

							/** createConversation 创建群组会话 **/
							let groupId = callback.data;
							this.jpushIM.createConversation({
									type: "group",
									groupId: groupId
								},
								(callback) => {
									if (callback.errorCode == 0) {
										uni.navigateTo({
											url: '../im-chat/im-chat-group?groupId=' + groupId + '&title=' + this.groupName
										});
									} else {
										uni.showModal({
											title: '创建群聊失败',
											content: "原因：" + callback.errorMsg,
											showCancel: false,
											cancelText: '',
											confirmText: '确定',
											success: res => {
												if (res.confirm) {
													// console.log("点击了确定按钮")
												}
											}
										});
									}
								})
							/** 创建群组会话 结束 **/

						} else {
							uni.showModal({
								title: '创建群聊失败',
								content: "原因：" + callback.errorMsg,
								showCancel: false,
								cancelText: '',
								confirmText: '确定',
								success: res => {
									if (res.confirm) {
										// console.log("点击了确定按钮")
									}
								}
							});
						}
					})

				// #endif
			},
			radioChange(evt) {
				this.groupType = evt.target.value;
				// for (let i = 0; i < this.groupTypeItems.length; i++) {
				// 	if (this.groupTypeItems[i].value === evt.target.value) {
				// 		this.groupType = i;
				// 		break;
				// 	}
				// }
			}
		}
	}
</script>

