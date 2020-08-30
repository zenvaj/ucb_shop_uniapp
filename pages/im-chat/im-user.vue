<template>
	<view class="im-user">

		<view class="flex padding justify-center">
			
			<view class="cu-avatar round lg" :style="[{ backgroundImage:'url(' + (info.avatar?info.avatar:'/static/img/im/face.jpg') + ')' }]">
				<view class="cu-tag badge" :class="info.gender=='female'?'cuIcon-female bg-pink':'cuIcon-male bg-blue'"></view>
			</view>
			
		</view>
		
		<view class="flex padding justify-center">
			<text class="text-df">{{info.signature}}</text>
		</view>
		
		<view class="bg-white">
		
			<view class="flex p-xs margin-bottom-sm mb-sm" v-if="info.noteName">
				<view class="flex-sub padding-sm margin-xs">备注</view>
				<view class="flex-twice padding-sm margin-xs">{{info.noteName}}</view>
			</view>
		
			<view class="flex p-xs margin-bottom-sm mb-sm">
				<view class="flex-sub padding-sm margin-xs">昵称</view>
				<view class="flex-twice padding-sm margin-xs">{{info.nickname}}</view>
			</view>
			
			<view class="flex p-xs margin-bottom-sm mb-sm">
				<view class="flex-sub padding-sm margin-xs">用户名</view>
				<view class="flex-twice padding-sm margin-xs">{{info.username}}</view>
			</view>
		
			<view class="flex p-xs margin-bottom-sm mb-sm">
				<view class="flex-sub padding-sm margin-xs">性别</view>
				<view class="flex-twice padding-sm margin-xs">{{gender}}</view>
			</view>
		</view>
		
		<view class="flex padding justify-center margin-top bg-white">
			<button class="cu-btn bg-blue" @click="showDialog1" v-if="info.isFriend == false && info.isInBlackList == false">添加好友</button>
			<button class="cu-btn margin-left bg-green" @click="skip">发送消息</button>
			<button class="cu-btn margin-left bg-red" @click="deleteUser" v-if="info.isFriend == true">删除好友</button>
		</view>

		<!-- 申请加好友 -->
		<view class="cu-modal" :class="show1?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">添加好友</view>
					<view class="action" @tap="closeDialog1">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
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
		
	</view>
</template>

<script>
	// #ifdef H5
	import mock from '../../common/mock.js'
	// #endif
	
	import uniDialog from '@/components/im-chat/uni-dialog.vue'
	
	export default {
		components: {
			uniDialog
		},
		onLoad(option) {
			// 设置标题
			if (!option.fromUser) {
				uni.showModal({
					title: '错误',
					content: '缺少用户信息',
					showCancel: false,
					cancelText: '',
					confirmText: '好的'
				});
				
				// #ifdef APP-PLUS
				return;
				// #endif
			}
			uni.setNavigationBarTitle({
				title: option.title
			});
			let chatUsername = option.fromUser;
			let param = {
				"username": option.fromUser
			};
			
			// #ifdef APP-PLUS
			this.jpushIM.getUserInfo({"username":chatUsername}, (res) => {
				this.info = res.data;
			})
			// #endif
			
			// #ifdef H5
			this.info = mock.chatUser;
			// #endif
			
		},
		data() {
			return {
				info: {},
				show1: false,
				friendReason: "",
			}
		},
		computed:{
			gender:function(){
				return this.imUtils.getGender(this.info.gender);
			},
			friendUsername:function(){
				return this.info.username;
			},
		},
		methods:{
			skip: function(index) {
				let item = this.info;
				let title = item.nickname ? item.nickname : item.nickname;
				this.jpushIM.skipToSingleChat(item.username, (res) => {
					uni.navigateTo({
						url: './im-chat?title=' + title + '&fromUser=' + item.username
					});
				}, (err) => {
					uni.showToast({
						title: "创建 [" + item.username + "] 会话失败:" + err.errorMsg,
						icon: "none"
					});
				})
			},
			// 预览图片
			showPic(){
				uni.previewImage({
					indicator:"none",
					current:0,
					urls:[this.info.avatar]
				});
			},
			showDialog1: function(index) {
				this.show1 = true;
			},
			closeDialog1: function() {
				this.show1 = false;
			},
			confirm1() {
				// 添加好友调接口
				let params = {
					"username": this.info.username,
					"reason": this.friendReason
				}
				// #ifdef APP-PLUS
				this.jpushIM.sendInvitationRequest(params, (res) => {
					if (res.errorCode == 0) {
						uni.showToast({
							title: res.errorMsg,
							icon: 'none'
						});
						this.closeDialog1(); // 关闭dialog
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
			deleteUser(){
				uni.showModal({
					title: '提示',
					content: '是否确认删除好友',
					success: (res) => {
						if (res.confirm) {
							let params = {
								"username": this.info.username
							};
							// #ifdef APP-PLUS
							this.jpushIM.removeFromFriendList(params, (res) => {
								if (res.errorCode == 0) {
									uni.showToast({
										title: res.errorMsg,
										icon: 'none'
									});
									
									uni.switchTab({
										url:"./im-list"
									});
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
				
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					},
				});
			},
		}
	}
</script>

<style>
	.im-user .avatar {
		padding-top: 60rpx;;
	}

	.im-user .avatar img,
	.im-user .avatar image {
		width: 200rpx;
		height: 200rpx;
		border-radius: 50rpx;
	}
	.im-user .avatar .uni-flex{
		-webkit-justify-content: center;
		justify-content: center;
	}
	.im-user .uni-row {
		position: relative;
		/* height: 30rpx; */
		/* line-height: 30rpx; */
		padding: 24upx 30upx;
		width: 100%;
	}

	.im-user .uni-row:after {
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

	.im-user .uni-row .desc {
		width: 200rpx;
	}

	.im-user .uni-row .desc .text {
		margin-left: 10rpx;
		line-height: 2.2;
	}

	.im-user .uni-row .info-text {
		-webkit-flex: 1;
		flex: 1;
		line-height: 2.2;
	}
	.im-user .btns{
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
