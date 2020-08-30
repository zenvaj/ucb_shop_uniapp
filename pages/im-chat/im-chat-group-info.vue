<template>
	<view>

			<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
				<view class="cu-item" v-for="(item,index) in membersArray" :key="index" v-if="index<gridCol*2">
					
					<view class="flex justify-center">
						<view class="cu-avatar round lg" :style="[{ backgroundImage:'url(' + (item.user.avatar?item.user.avatar:'/static/img/im/face.jpg') + ')' }]">
							
							<view class="cu-tag badge" :class="item.user.gender=='female'?'cuIcon-female bg-pink':'cuIcon-male bg-blue'" style="top: 0; right: 0; width: 40rpx; height: 40rpx; line-height: 40rpx; text-align: center; font-size: 12rpx;">
							</view>
							
						</view>
					</view>
					<text>{{item.memberType && item.memberType == "admin" ? "[管理员]": "" }}
						{{item.groupNickname?item.groupNickname:item.user.username}}</text>
				</view>
				
				<view class="cu-item" @click="showDialog1">
					<view class="cuIcon-add text-red"></view>
					<text>邀请新成员</text>
				</view>
				
				<view class="cu-item" @click="showDialog2" v-if="loginProvider == owner">
					<view class="cuIcon-move text-red"></view>
					<text>删除群成员</text>
				</view>
				
			</view>


		<view class="bg-white">
			<view class="cu-form-group">
				<view class="title">群号</view>
				<view>{{groupId}}</view>
			</view>
			<view class="cu-form-group">
				<view class="title">群聊名称</view>
				<view>
					<input v-model="name" />
				</view>
			</view>
			<view class="cu-form-group">
				<textarea maxlength="-1" @blur="bindTextAreaBlur" auto-height v-model="desc" placeholder="输入群公告"></textarea>
			</view>
			
			
			
			<view class="cu-form-group">
				<view class="title">我在本群昵称</view>
				<view>
					<input class="uni-input" v-model="myNickname" @blur="changeMyGroupNickname" />
				</view>
			</view>
			
			<view class="cu-form-group margin-top">
				<view class="title">消息免打扰</view>
				<switch :class="ifNoDisturb?'checked':''" :checked="ifNoDisturb?true:false" @change="switch1Change" />
			</view>
			
			<view class="cu-form-group margin-top">
				<view class="title">消息屏蔽</view>
				<switch :class="ifblock?'checked':''" :checked="ifblock?true:false" @change="switch2Change" />
			</view>
			
			<view class="cu-form-group margin-top" v-if="loginProvider == owner">
				<view class="title">移交群主</view>
				<picker @change="PickerChange" :value="index" :range="membersArray" range-key="pickname">
					<view class="picker">
						{{membersArray[index]?membersArray[index].pickname:"点击选择"}}
					</view>
				</picker>
			</view>
		</view>
		
		
		<view class="flex padding justify-center margin-top bg-white">
			<button class="cu-btn bg-blue" v-if="loginProvider == owner" @click="update">更新群资料</button>
			<button class="cu-btn bg-red margin-left" @click="quit">退出此群</button>
			<button class="cu-btn bg-red margin-left" @click="dissolve" v-if="loginProvider == owner">解散群</button>
		</view>
		
		<uni-dialog title="添加成员" :show="show1" v-on:closeDialog="closeDialog1">
			<view slot="content">
				<view class="dialog-content1">
					<input class="uni-input" v-model="usernameArray" placeholder="输入成员用户名,多个以逗号隔开" />
				</view>
			</view>
			<view slot="btns">
				<view class="dialog-btns">
					<view><button type="primary" @tap="closeDialog1">关闭</button></view>
					<view><button type="primary" @tap="confirm1" formType="submit" style="color:#3688FF;">添加成员</button></view>
				</view>
			</view>
		</uni-dialog>
		
		<uni-dialog title="移除组内成员" :show="show2" v-on:closeDialog="closeDialog2">
			<view slot="content">
				<view class="dialog-content1">
					<input class="uni-input" v-model="usernameArray" placeholder="输入成员用户名,多个以逗号隔开" />
				</view>
			</view>
			<view slot="btns">
				<view class="dialog-btns">
					<view><button type="primary" @tap="closeDialog2">关闭</button></view>
					<view><button type="primary" @tap="confirm2" formType="submit" style="color:#3688FF;">确认移除成员</button></view>
				</view>
			</view>
		</uni-dialog>
		
		<uni-dialog title="移交群主" :show="show3" v-on:closeDialog="closeDialog3">
			<view slot="content">
				<view class="dialog-content1">
					<input class="uni-input" v-model="newOwner" placeholder="输入新群主用户名,注意是用户名不是昵称" />
				</view>
			</view>
			<view slot="btns">
				<view class="dialog-btns">
					<view><button type="primary" @tap="closeDialog3">关闭</button></view>
					<view><button type="primary" @tap="confirm3" formType="submit" style="color:#3688FF;">确认移交</button></view>
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
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	
	// #ifdef H5
	import mock from "@/common/mock.js"
	// #endif
	
	export default {
		components: {
			uniIcons,
			uniDialog,
			uniListItem
		},
		computed: {
			...mapState(['loginProvider']),
		},
		data() {
			return {
				gridCol: 4,
				gridBorder: false,
				index: -1,	// 选择移交群主
				
				groupId:0,
				owner:'',	// 群主的用户名
				name: '',	// 群聊名称
				desc: '',	// 群聊描述
				maxMemberCount:0,	// 群人数最大值
				show1: false,
				usernameArray:"",	// 成员用户名
				membersArray:[],	// 群组内成员
				show2: false,
				ifNoDisturb:false,	// 是否免打扰
				ifblock:false,		// 是否屏蔽
				show3: false,		// 移交群主
				newOwner:"",		// 新群主的用户名
				myNickname:"",		// 我在本群的昵称
			}
		},
		onLoad(option) {
			// #ifdef APP-PLUS
			// 设置标题
			if (!option.groupId) {
				uni.showModal({
					title: '错误',
					content: '缺少群组信息',
					showCancel: false,
					cancelText: '',
					confirmText: '好的'
				});
				return;
			}
			uni.setNavigationBarTitle({
				title: option.title
			});
			
			this.groupId = option.groupId;
			this.init();
			// #endif
			
			
			// #ifdef H5
			// 在H5下模拟数据用于调试页面显示样式，这段mock可以删除
			this.membersArray = this.setMembersList(mock.groupMembersArray);
			// #endif
			
		},
		methods: {
			init:function(){
				// 获取群组信息
				this.jpushIM.getGroupInfo({"id":this.groupId}, (callback) => {
					let groupInfo = callback.data;
					this.name = groupInfo.name;
					this.desc = groupInfo.desc;
					this.maxMemberCount = groupInfo.maxMemberCount;
					this.owner = groupInfo.owner;	// 创建人
					uni.setNavigationBarTitle({
						title: groupInfo.name + "（ "+groupInfo.maxMemberCount+"人群）"
					});
					this.ifblock = groupInfo.isShieldMessage;
					this.ifNoDisturb = groupInfo.isNoDisturb;
				})
				this.jpushIM.getGroupMembers({"id":this.groupId}, (callback) => {
					if(callback.errorCode == 0){
						this.membersArray = this.setMembersList(callback.data);
					}
				})
				// this.ifblockMessage();
			},
			bindTextAreaBlur: function (e) {
				// console.log(e.detail.value)
			},
			ifblockMessage:function(){
				// 演示，查询群组是否屏蔽消息
				let param = {
					id:this.groupId
				}
				this.jpushIM.isGroupBlocked(param, (callback) => {
					this.ifblock = callback.data
				})
			},
			switch1Change: function (e) {
				let param = {
					type:'group',
					groupId:this.groupId,
					isNoDisturb:e.target.value
				}
				
				// #ifdef H5
				this.ifNoDisturb = e.target.value;
				// #endif
				
				// #ifdef APP-PLUS
				uni.showLoading({
					title: '',
					mask: false
				});
				this.jpushIM.setNoDisturb(param, (callback) => {
					uni.hideLoading();
					uni.showModal({
						title: callback.errorCode == 0?'成功':'错误',
						content: callback.errorMsg,
						showCancel: false,
						cancelText: '',
						confirmText: '确定',
						success: res => {
							if (res.confirm) {
								// this.init();
								this.ifNoDisturb = e.target.value;
							}
						}
					});
				})
				// #endif
			},
			switch2Change: function (e) {
				let param = {
					id:this.groupId,
					isBlock:e.target.value
				}
				
				// #ifdef H5
				this.ifblock = e.target.value;
				// #endif
				
				// #ifdef APP-PLUS
				
				uni.showLoading({
					title: '',
					mask: false
				});
				this.jpushIM.blockGroupMessage(param, (callback) => {
					uni.hideLoading();
					
					uni.showModal({
						title: callback.errorCode == 0?'成功':'错误',
						content: callback.errorMsg,
						showCancel: false,
						cancelText: '',
						confirmText: '确定',
						success: res => {
							if (res.confirm) {
								this.init();
							}
						}
					});
				})
				
				// #endif
			},
			update:function(e){
				uni.showLoading({
					title: '',
					mask: false
				});
								
				let param = {
					"id" : this.groupId,
					"newName" : this.name,
					"newDesc" : this.desc
				}
				this.jpushIM.updateGroupInfo(param, (callback) => {
					uni.hideLoading();
					
					uni.showModal({
						title: callback.errorCode == 0?'成功':'错误',
						content: callback.errorMsg,
						showCancel: false,
						cancelText: '',
						confirmText: '确定',
						success: res => {
							if (res.confirm) {
								
								// console.log("点击了确定按钮")
								if(callback.errorCode == 0){
									uni.navigateBack({
										delta: 1
									});
								}
								
							}
						}
					});
				})
			},
			quit:function(e){
				uni.showLoading({
					title: '',
					mask: false
				});
								
				let param = {
					"id" : this.groupId
				}
				this.jpushIM.exitGroup(param, (callback) => {
					uni.hideLoading();
					
					uni.showModal({
						title: callback.errorCode == 0?'成功':'错误',
						content: callback.errorMsg,
						showCancel: false,
						cancelText: '',
						confirmText: '确定',
						success: res => {
							if (res.confirm) {
								// console.log("点击了确定按钮")
								if(callback.errorCode == 0){
									uni.switchTab({
									    url: './im-list'
									});
								}
							}
						}
					});
				})
			},
			dissolve:function(e){
				
				uni.showModal({
					title: '提示',
					content: '是否确认解散群【' + this.name + '】',
					success: (res) => {
						if (res.confirm) {
							uni.showLoading({
								title: '',
								mask: false
							});
							
							let param = {
								"groupId" : this.groupId
							}
							this.jpushIM.dissolveGroup(param, (callback) => {
								uni.hideLoading();
								
								uni.showModal({
									title: callback.errorCode == 0?'成功':'错误',
									content: callback.errorMsg,
									showCancel: false,
									cancelText: '',
									confirmText: '确定',
									success: res => {
										if (res.confirm) {
											// console.log("点击了确定按钮")
											if(callback.errorCode == 0){
												uni.switchTab({
												    url: './im-list'
												});
											}
										}
									}
								});
							})
						}
					},
				});
				
			},
			showDialog1: function(index) {
				this.show1 = true;
			},
			closeDialog1: function() {
				this.show1 = false;
			},
			confirm1:function(){
				// 添加群组成员调接口
				this.closeDialog1();
				
				uni.showLoading({
					title: '',
					mask: false
				});
				let params = {
					"id": this.groupId,
					"usernameArray": this.usernameArray.split(",")
				}
				// 这里看一下用户名提交的
				console.log("usernameArray传参：");
				console.log(JSON.stringify(params));
				console.log(params.usernameArray);
				console.log(typeof params.usernameArray);
				// #ifdef APP-PLUS
				this.jpushIM.addGroupMembers(params, (callback) => {
					uni.hideLoading();
					
					uni.showModal({
						title: callback.errorCode == 0?'成功':'错误',
						content: callback.errorMsg,
						showCancel: false,
						cancelText: '',
						confirmText: '确定',
						success: res => {
							if (res.confirm) {
								// console.log("点击了确定按钮")
								if(callback.errorCode == 0){
									uni.navigateBack({
										delta: 1
									});
									// uni.navigateTo({
									// 	'url': './im-chat-group?title='+this.name+'&groupId='+this.groupId
									// });
								}
							}
						}
					});
				})
				// #endif
			},
			setMembersList:function(items){
				var newItems = [];
				items.forEach((e) => {
					e.user.avatar = e.user.avatar ? e.user.avatar : "../../static/img/im/chat_icon.png";
					e.pickname = e.user.nickname;
					if(this.loginProvider == e.user.username){
						// console.log("JMessagePlugin 设置当前群昵称：" + JSON.stringify(e));
						this.myNickname = e.groupNickname;
					}
					newItems.push(e);
				});
				// console.log(newItems);
				return newItems;
			},
			showDialog2: function(index) {
				this.show2 = true;
			},
			closeDialog2: function() {
				this.show2 = false;
			},
			confirm2:function(){
				// 添加群组成员调接口
				this.closeDialog2();
				
				uni.showModal({
					title: '提示',
					content: '是否确认移除成员' + this.usernameArray,
					success: (res) => {
						if (res.confirm) {
							uni.showLoading({
								title: '',
								mask: false
							});
							
							let params = {
								"id": this.groupId,
								"usernameArray": this.usernameArray.split(",")
							}
							this.jpushIM.removeGroupMembers(params, (callback) => {
								uni.hideLoading();
								
								uni.showModal({
									title: callback.errorCode == 0?'成功':'错误',
									content: callback.errorMsg,
									showCancel: false,
									cancelText: '',
									confirmText: '确定',
									success: res => {
										if (res.confirm) {
											// console.log("点击了确定按钮")
											this.init();
										}
									}
								});
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
						
						
					}
				});
			},
			intoUserInfo:function(index){
				let item = this.membersArray[index];
				uni.navigateTo({
					url: './im-user?title=群成员&fromUser=' + item.user.username
				});
			},
			removeGroupMembers:function(index){
				// 指定删除群成员
				let item = this.membersArray[index];
				uni.showModal({
					title: '提示',
					content: '是否确认移除成员 : ' + item.user.nickname,
					success: (res) => {
						if (res.confirm) {
							uni.showLoading({
								title: '',
								mask: false
							});
							
							let params = {
								"id": this.groupId,
								"usernameArray": [item.user.username], //这里注意一下得传数组，不然闪退
							}
							this.jpushIM.removeGroupMembers(params, (callback) => {
								uni.hideLoading();
								
								uni.showModal({
									title: callback.errorCode == 0?'成功':'错误',
									content: callback.errorMsg,
									showCancel: false,
									cancelText: '',
									confirmText: '确定',
									success: res => {
										if (res.confirm) {
											// console.log("点击了确定按钮")
											this.init();
										}
									}
								});
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
						
						
					}
				});
			},
			showDialog3: function(index) {
				this.show3 = true;
			},
			closeDialog3: function() {
				this.show3 = false;
			},
			confirm3:function(){
				// 移交群主调接口
				this.closeDialog3();
				uni.showModal({
					title: '提示',
					content: '是否确认移交群主至成员 : ' + this.newOwner,
					success: (res) => {
						if (res.confirm) {
						uni.showLoading({
							title: '',
							mask: false
						});
						let params = {
							"groupId": this.groupId,
							"username": this.newOwner
						}
						// #ifdef APP-PLUS
						this.jpushIM.transferGroupOwner(params, (callback) => {
							uni.hideLoading();
							
							uni.showModal({
								title: callback.errorCode == 0?'成功':'错误',
								content: callback.errorMsg,
								showCancel: false,
								cancelText: '',
								confirmText: '确定',
								success: res => {
									if (res.confirm) {
										// console.log("点击了确定按钮")
										this.init();
									}
								}
							});
						})
					// #endif
				}}
				});
			},
			PickerChange(e) {
				// 移交群主
				this.index = e.detail.value;
				let item = this.membersArray[this.index];
				
				uni.showModal({
					title: '提示',
					content: '是否确认移交群主至成员 : ' + item.user.nickname,
					success: (res) => {
						if (res.confirm) {
						uni.showLoading({
							title: '',
							mask: false
						});
						let params = {
							"groupId": this.groupId,
							"username": item.user.username
						}
						// #ifdef APP-PLUS
						this.jpushIM.transferGroupOwner(params, (callback) => {
							uni.hideLoading();
							
							uni.showModal({
								title: callback.errorCode == 0?'成功':'错误',
								content: callback.errorMsg,
								showCancel: false,
								cancelText: '',
								confirmText: '确定',
								success: res => {
									if (res.confirm) {
										// console.log("点击了确定按钮")
										this.init();
									}
								}
							});
						})
					// #endif
					}}
				});
				
			},
			changeMyGroupNickname:function(){
				// 更新我在本群昵称调接口
				uni.showModal({
					title: '提示',
					content: '是否确认更新我在本群的昵称为 : ' + this.myNickname,
					success: (res) => {
						if (res.confirm) {
						uni.showLoading({
							title: '',
							mask: false
						});
						let params = {
							"groupId": this.groupId,
							"username": this.loginProvider,
							"nickName": this.myNickname
						}
						// #ifdef APP-PLUS
						this.jpushIM.setGroupNickname(params, (callback) => {
							uni.hideLoading();
							
							uni.showModal({
								title: callback.errorCode == 0?'成功':'错误',
								content: callback.errorMsg,
								showCancel: false,
								cancelText: '',
								confirmText: '确定',
								success: res => {
									if (res.confirm) {
										this.init();
									}
								}
							});
						})
						// #endif
					}}
				});
			},
		}
	}
</script>

<style scoped>
	.im-chat-group-info .members{
		-webkit-flex-wrap: wrap;
		flex-wrap: wrap;
		padding: 20rpx 1%;
	}
	.im-chat-group-info .members .row{
		width: 25%;
		height: 160rpx;
		margin-top: 15rpx;
		position: relative;
	}
	.im-chat-group-info .members .row img,
	.im-chat-group-info .members .row image{
		width: 100%;
		height: 100rpx;
	}
	.im-chat-group-info .members .row .group-nickname{
		height: 35rpx;
		line-height: 35rpx;
		overflow: hidden;
	}
	.im-chat-group-info .members .row .del-user{
		position: absolute;
		right: 0;
		top: 0;
	}
	.im-chat-group-info .uni-row {
		position: relative;
		padding: 24upx 30upx;
		display:flex;
		flex-direction:row;
		align-items:center;
		justify-content: space-between;
	}
	.im-chat-group-info .uni-row:after {
		position: absolute;
		z-index: 3;
		right: 0;
		bottom: 0;
		left: 30upx;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #e5e5e5
	}
	
	.im-chat-group-info .uni-row:last-child:after{
		height: 0;
	}
	
	.im-chat-group-info .uni-row .tit {
		width: 250rpx;
	}
	.im-chat-group-info .uni-row .info-text{
		/* -webkit-flex: 1; */
		/* flex: 1; */
		color: #969696;
	}
	.im-chat-group-info .uni-row .info-text.desc{
		-webkit-flex: 1;
		flex: 1;
	}
	.im-chat-group-info .uni-row textarea{
		padding: 15upx 25upx;
		width: 90%;
	}
	.im-chat-group-info .btns{
		-webkit-justify-content: center;
		justify-content: center; 
		margin-top: 30rpx;
		padding: 25rpx 0;
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
	}
	
	.dialog-content1 .uni-textarea {
		padding: 15upx;
		box-sizing: border-box;
	}
</style>
