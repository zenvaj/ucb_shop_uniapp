<template>
	<view>
		
		<view class="padding">
			<view class="cu-capsule round flex justify-center">
				<view class='cu-tag bg-orange' style="font-size: 15px; padding: 6rpx 30rpx;">
					会话列表
				</view>
				<navigator class="cu-tag line-orange" url="../group-list/group-list" style="font-size: 15px;padding:6rpx 30rpx;">
					群聊列表
				</navigator>
			</view>
		</view>
			
		<!-- 聊天列表 -->
		<view class="cu-list menu-avatar">
				<view class="cu-item" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item,index) in lists" :key="index"
				 @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index" @click="skipToSingleChat(index)">
					<view class="cu-avatar round lg" :style="[{backgroundImage:'url('+ item.avatar +')'}]"></view>
					<view class="content">
						<view class="text-grey">{{item.title}}</view>
						<view class="text-gray text-sm">
							<text class="cuIcon-infofill text-red  margin-right-xs" v-if="item.messageType=='event'"></text> {{item.lastMessageText}}</view>
					</view>
					<view class="action" style="width: 200rpx;">
						<view class="text-grey text-xs">{{item.lastMessageTime}}</view>
						<view class="cu-tag round bg-red sm" v-if="item.unreadCount">{{item.unreadCount}}</view>
					</view>
					<view class="move">
						<!-- <view class="bg-grey">置顶</view> -->
						<view class="bg-red" @tap.stop="deleteConversation(index)">删除</view>
					</view>
				</view>
			</view>

		</scroll-view>
		
		<view class="cu-load load-modal" v-if="loadModal">
			<view class="cuIcon-emojifill text-orange"></view>
			<!-- <image src="/static/logo.png" mode="aspectFit"></image> -->
			<view class="gray-text">加载中...</view>
		</view>
		
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	

	// #ifdef H5
	import mock from "@/common/mock.js"
	// #endif

	var _self;
	export default {
		computed: {
			...mapState(['hasLogin', 'loginProvider', 'nickname', 'avatar', 'receiveMessage', 'newFriendInvitiaon']),
		},
		data() {
			return {
				modalName: null,
				listTouchStart: 0,
				listTouchDirection: null,
				loadModal: false,
				lists: [],
			}
		},
		onShow() {
			_self = this;
			this.getList();
		},
		onLoad() {
			uni.showLoading({
				title: '加载中...',
				mask: true
			});
		},
		onReady: function() {
			uni.hideLoading();
		},
		onPullDownRefresh() {
			// 下拉刷新
			this.getList();
		},
		watch: {
			receiveMessage(res) {
				console.log("监听到新消息，更新列表");
				this.getList();
			}
		},
		methods: {
			...mapMutations(['login']),
			// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
			},
			// ListTouch计算方向
			ListTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},
			// ListTouch计算滚动
			ListTouchEnd(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			},
			deleteConversation(index) {
				this.loadModal = true;
				
				let item = this.lists[index];
				// 删除会话
				var params = {
					"type": item.conversationType
				};
				if (item.conversationType == "group") {
					params.groupId = item.target.id; // 删除群组
				} else if (item.conversationType == "single") {
					params.username = item.target.username; // 删除会话
				}
				
				this.jpushIM.deleteConversation(params, (res) => {
					
					setTimeout(() => {
						this.loadModal = false;
					}, 2000)
						
					if (res.errorCode == 0) {
						this.getList();
					} else {
						uni.showModal({
							title: '删除失败',
							content: "原因：" + res.errorMsg,
							showCancel: false,
							cancelText: '',
							confirmText: '关闭'
						});
					}
				})
			},
			 
			// 从本地数据库中获取会话列表，默认按照会话的最后一条消息的时间，降序排列
			getList: function() {
				uni.stopPullDownRefresh();
 
				let userId = this.$queue.getData('userId'); 
				if(!userId){
				// if(!this.hasLogin){ 
					// uni.showToast({
					// 	title: '未登录IM用户',
					// 	icon:'none'
					// });
					
					uni.showModal({
						title: '错误',
						content: '还未登录，请先登录',
						showCancel: true,
						cancelText: '先看看',
						confirmText: '登录',
						success: res => {
							if (res.confirm) {
								uni.navigateTo({
									url: '../public/login',
								});
							}
							if(res.cancel)
							{
								uni.switchTab({
									url: '../index/index',
								});
							}
							
						},
						fail: () => {},
						complete: () => {}
					});
					return false;
				}
				
				// #ifdef APP-PLUS
				this.jpushIM.getConversations((callback) => {
					// console.log(JSON.stringify(callback));
					var list = this.setList(callback);
					this.lists = list;
				})
				// #endif

				// #ifdef H5
				// 在H5下模拟数据用于调试页面显示样式，这段mock可以删除
				var list = this.setList(mock.imList);
				this.lists = list;
				// #endif
			},
			setList: function(items) {
				var newItems = [];
				items.forEach((e) => {
					if (e) {
						if (e.latestMessage) {
							if (e.latestMessage.messageType == "image") {
								e.lastMessageText = "[图片]";
							} else if (e.latestMessage.messageType == "voice") {
								e.lastMessageText = "[语音]";
							} else {
								e.lastMessageText = e.latestMessage.messageString;
							}
							
							e.lastMessageTime = this.imUtils.fromTimer(e.latestMessage.createTime);
							// e.lastMessageTime = this.imUtils.formatDateTime((e.latestMessage.createTime), "str");
							e.messageType = e.latestMessage.messageType;
						} else {
							e.lastMessageText = "";
							e.lastMessageTime = "";
							e.messageType = "";
						}
						if (e.conversationType == "single") {
							// 单聊会话
							e.avatar = e.target.avatar ? e.target.avatar : "../../static/img/im/chat_icon.png";
						} else if (e.conversationType == "group") {
							// 群聊会话
							e.avatar = "../../static/img/im/chat_icon_group.jpg"
						}
						newItems.push(e);
					}
				});
				return newItems;
			},
			// 创建会话
			skipToSingleChat: function(index) {
				let item = this.lists[index];
				let title = item.nickname ? item.nickname : item.nickname;
				if (item.conversationType == "single") {
					// 单聊会话
					let title = item.target.nickname ? item.target.nickname : item.target.username;
					uni.navigateTo({
						url: 'im-chat?title=' + title + '&fromUser=' + item.target.username
					});
				} else if (item.conversationType == "group") {
					// 群聊会话
					uni.navigateTo({
						url: './im-chat-group?groupId=' + item.target.id + '&title=' + item.target.name
					});
				}
			},
			
			
		}
	}
</script>
