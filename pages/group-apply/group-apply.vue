<template>
	<view>

		<block v-if="hasLogin === false">
			<view class="uni-h3 uni-center uni-common-mt">
				<navigator url="../login/login">请先登录</navigator>
			</view>
		</block>

		<block v-if="hasLogin === true">

			<view v-for="(item, index) in listData" :key="index">
				<!-- 与service配合可放开时间 -->
				<!-- <view class="system">
					<view class="text">
						{{item.time}}
					</view>
				</view> -->
				<view class="friend_item uni-flex uni-row" v-for="(user,index2) in item.joinGroupUsers" :key="index2">
					<view class="friend_item_avatar uni-flex">
						<image :src="user.avatar" style="width: 150rpx;height: 150rpx;"></image>
						<view class="gender female" v-if="user.gender === 'female'">
							<image src="../../static/img/im/female.png" mode="aspectFill"></image>
						</view>
						<view class="gender male" v-if="user.gender === 'male'">
							<image src="../../static/img/im/male.png" mode="aspectFill"></image>
						</view>
					</view>
					
					<view class="uni-flex uni-column" style="-webkit-flex: 1;flex: 1;-webkit-justify-content: space-between;justify-content: space-between;">
						<view style="height: 60rpx;text-align: left;padding-left: 20rpx;padding-top: 10rpx;">
							{{user.nickname}} <text class="uni-text-gray" style="margin:0 20rpx">({{user.username}})</text> 申请加入 {{item.group.name}}
						</view>
						<block v-if="user.declineReason">
							<!-- 如果有拒绝原因，表示已拒绝 -->
							<view class="friend_item_reason">
								<view>备注：{{item.reason}}</view>
								<view class="uni-text-blue">处理：{{item.declineReason}}</view>
							</view>
							<view class="uni-flex uni-row">
								<view class="friend_item_btn">已拒绝</view>
							</view>
						</block>
						<block v-else>
							<!-- 待处理 -->
							<view class="friend_item_reason">
								备注：{{item.reason}}
							</view>
							<view class="uni-flex uni-row">
								<view class="friend_item_btn" @click="agree(index)">同意</view>
								<view class="friend_item_btn" @click="refuse(index)">拒绝</view>
							</view>
						</block>
					</view>
				</view>
			</view>

		</block>

		<uni-dialog title="拒绝入群申请" :show="show2" v-on:closeDialog="closeDialog2">

			<view slot="content">
				<view class="dialog-content1">
					<textarea placeholder-style="color:#dedede" class="uni-textarea" v-model="declineReason" placeholder="请输入拒绝原因"></textarea>
				</view>
			</view>
			<view slot="btns">
				<view class="dialog-btns">
					<view><button type="primary" @tap="closeDialog2">关闭</button></view>
					<view><button type="primary" @tap="confirm2" formType="submit" style="color:#3688FF;">拒绝入群请求</button></view>
				</view>
			</view>

		</uni-dialog>

	</view>
</template>

<script>
	// #ifdef H5
	import mock from "@/common/mock.js"
	// #endif

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
		data() {
			return {
				listData: [],
				show2: false,
				currentItem: {}, // 当前选择
				currentIndex: 0,
				declineReason: "不通过", // 拒绝理由
			}
		},
		computed: {
			...mapState(['hasLogin', 'receiveApplyJoinGroupApproval'])
		},
		onShow() {
			_self = this;
			if(this.hasLogin){
				this.getList();
			};
		},
		methods: {
			// 从本地数据库中获取通知列表
			getList: function() {
				uni.stopPullDownRefresh();
				
				// #ifdef APP-PLUS
				var list = this.receiveApplyJoinGroupApproval;
				this.setList(list);
				// #endif
				
				
				// #ifdef H5
				// 在H5下模拟数据用于调试页面显示样式，这段mock可以删除
				this.listData = mock.groupApply;
				console.log(this.listData);
				// #endif
				
			},
			setList: function(items) {
				let groups = [];
				function genGroupInfo(items) {
				  const promises = [];
				  for (let i = 0; i < items.length; i++) {
				    promises.push(_self.getGroupInfo(items[i]["groupId"]).then(function(res){
						items[i]["group"] = res;
						groups.push(items[i]);
					}));
				  }
				  return promises;
				}
				Promise.all(genGroupInfo(items)).then(() => {
					// console.log("JMessagePlugin 入群申请列表：" + JSON.stringify(groups))
					_self.listData = groups;
				});
			},
			getGroupInfo: function(id) {
				return new Promise(function (resolve, reject) {
					_self.jpushIM.getGroupInfo({"id": id}, (callback) => {
						if(callback.errorCode == 0){
							resolve(callback.data);
						}
					})
				})
			},
			showDialog2: function(index) {
				this.show2 = true;
			},
			closeDialog2: function() {
				this.show2 = false;
			},
			agree(index) {
				// 同意好友请求
				let item = this.listData[index];
				// console.log("JMessagePlugin 当前item：" + JSON.stringify(item));
				uni.showModal({
					title: '询问',
					content: '是否确认同意入群？',
					cancelText: '再想想',
					confirmText: '同意',
					success: res => {
						if (res.confirm) {
							let params = {
								"events": [item.eventId],		//必传字段
								"isAgree":true,				//必传字段
								"isRespondInviter":false,	//必传字段
							};
							// console.log("JMessagePlugin 传参同意入群：" + JSON.stringify(params));
							// #ifdef APP-PLUS
							_self.jpushIM.processApplyJoinGroup(params, (res) => {
								if (res.errorCode == 0) {
									uni.showToast({
										title: res.errorMsg,
										icon: 'none'
									});
									_self.listData.splice(index, 1);
									_self.$store.commit("setReceiveApplyJoinGroupApproval", _self.listData);
									// setTimeout(function() {
									// 	// 跳到通讯录
									// 	uni.switchTab({
									// 		url: "../address-book/address-book"
									// 	})
									// }, 100);
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
						}

					},
					fail: () => {

					},
					complete: () => {}
				});
			},
			refuse(index) {
				// 拒绝入群请求按钮
				let item = this.listData[index];
				this.currentItem = item;
				this.currentIndex = index;
				this.showDialog2(index);
			},
			confirm2() {
				// 拒绝入群调接口
				let params = {
					"events": [this.currentItem.eventId],
					"reason": this.declineReason,
					"isAgree":false,
					"isRespondInviter":false
				}
				let index = this.currentIndex;
				// #ifdef APP-PLUS
				_self.jpushIM.processApplyJoinGroup(params, (res) => {
					if (res.errorCode == 0) {
						uni.showToast({
							title: res.errorMsg,
							icon: 'none'
						});
						_self.currentItem.declineReason = _self.declineReason;
						_self.listData[index] = _self.currentItem;
						_self.closeDialog2(); // 关闭dialog
						_self.declineReason = ''; // 清空拒绝理由
									
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
			}
		},
		watch: {
			friendInvitiaon(res) {
				// console.log("监听到新消息");
				this.getList();
			}
		},
	};
</script>

<style scoped>
	.system {
		display: flex;
		justify-content: center;
		margin: 20upx 0;
	}

	.system view {
		padding: 0 30upx;
		height: 50upx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #c9c9c9;
		color: #fff;
		font-size: 24upx;
		border-radius: 40upx;
	}

	.friend_item {
		background: #FFFFFF;
		margin-bottom: 20rpx;
		border-bottom: 1px #e5e5e5 solid;
	}

	.friend_item:last-child {
		margin-bottom: 0;
	}

	.friend_item_avatar {
		width: 200rpx;
		height: 220rpx;
		-webkit-justify-content: center;
		justify-content: center;
		-webkit-align-items: center;
		align-items: center;
		position: relative;
	}

	.friend_item_avatar img,
	.friend_item_avatar image {
		border-radius: 35upx;
	}

	.friend_item_avatar .gender {
		position: absolute;
		right: 30rpx;
		top: 30rpx;
	}

	.friend_item_avatar .gender img,
	.friend_item_avatar .gender image {
		width: 20rpx;
		height: 20rpx;
		padding: 10rpx;
		border-radius: 20rpx;
	}

	/* 男 */
	.friend_item_avatar .gender.male img,
	.friend_item_avatar .gender.male image {
		background: #6bc2ed;
	}

	/* 女 */
	.friend_item_avatar .gender.female img,
	.friend_item_avatar .gender.female image {
		background: #e5a2c1;
	}

	/* 原因 */
	.friend_item_reason {
		/* height: 60rpx; */
		text-align: left;
		padding-left: 20rpx;
		padding-top: 10rpx;
		color: #928d8d;
	}

	.friend_item_btn {
		-webkit-flex: 1;
		flex: 1;
		margin: 15rpx 10rpx;
		padding: 0 20rpx;
		background-color: #ebebeb;
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;
		color: #777;
		font-size: 26rpx;
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
