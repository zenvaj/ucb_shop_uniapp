<template>
	<view>

		<view class="padding">
			<view class="cu-capsule round flex justify-center">
				<navigator class='cu-tag line-orange' url="../im-chat/im-list" open-type="switchTab" style="font-size: 15px; padding: 6rpx 30rpx;">
					会话列表
				</navigator>
				<navigator class="cu-tag bg-orange" url="../group-list/group-list" style="font-size: 15px;padding:6rpx 30rpx;">
					群聊列表
				</navigator>
			</view>
		</view>

		<view class="cu-list menu">

			<view class="cu-item" v-for="(group,index) in listData" :key="index" @click="intoGroup(index)">
				<view class="content">
					<text class="text-orange" :class="group.groupType == 'private'?'cuIcon-messagefill':'cuIcon-group_fill'"></text>
					<text class="text-grey">{{group.name}}</text>
				</view>
				<view class="action">
					<view class="cu-avatar-group">
						<block v-if="group.members.length>0">
							<view v-for="(num,sub) in 3" :key="sub" class="cu-avatar round sm" :style="[{ backgroundImage:'url(' + (group.members[num] ? group.members[num].user.avatar:'') + ')' }]"></view>
						</block>
					</view>
					<text class="text-grey text-sm">{{group.members.length}} 人</text>
				</view>
			</view>

		</view>

		<view class="cu-load load-modal" v-if="loadModal">
			<view class="cuIcon-emojifill text-orange"></view>
			<!-- <image src="/static/logo.png" mode="aspectFit"></image> -->
			<view class="gray-text">加载中...</view>
		</view>

	</view>
</template>

<script>
	// #ifdef H5
	import mock from "@/common/mock.js"
	// #endif

	var _self;
	export default {
		data() {
			return {
				extraIcon1: {
					color: '#007aff',
					size: '22',
					type: 'chat'
				},
				listData: [],
				loadModal: false,
			}
		},
		onLoad() {
			_self = this;
			this.init();
		},
		methods: {
			init() {

				this.loadModal = true;
				// #ifdef APP-PLUS
				uni.stopPullDownRefresh();
				var list = [];
				this.jpushIM.getGroupIds((res) => {
					if (res.errorCode == 0) {
						
						this.setList(res.data); // ['GroupId','GroupId']
						
						
					} else {
						this.loadModal = false;
						uni.showModal({
							title: '获取失败',
							content: "原因：" + res.errorMsg,
							showCancel: false,
							cancelText: '',
							confirmText: '关闭'
						});
					}
				})
				// #endif

				// #ifdef H5
				this.loadModal = false;
				this.listData = mock.groupList;
				console.log(this.listData);
				// #endif

			},
			setList: async function(ids) {

				var groups = [];
				for (let i = 0; i < ids.length; i++) {
					try {
						const groupInfo = await this.getGroupInfo(ids[i]);
						const members = await this.getGroupMember(ids[i]);
						groupInfo.members = members;
						groups.push(groupInfo);
					} catch (err) {
						// 这里捕捉到错误 `error`  
						uni.showModal({
							title: '错误',
							content: error,
							showCancel: false,
							cancelText: '',
							confirmText: '确定',
							success: res => {
								if (res.confirm) {
									// 确定按钮
								}
							}
						});
					}
				}

				this.loadModal = false;
				this.listData = groups;	
			},
			getGroupInfo: function(id) {
				return new Promise(function(resolve, reject) {
					_self.jpushIM.getGroupInfo({
						"id": id.toString()
					}, (callback) => {
						if (callback.errorCode == 0) {
							resolve(callback.data);
						} else {
							reject(callback.errorMsg);
						}
					})
				})
			},
			getGroupMember: function(id) {
				return new Promise(function(resolve, reject) {
					_self.jpushIM.getGroupMembers({
						"id": id
					}, (callback) => {
						if (callback.errorCode == 0) {
							resolve(callback.data);
						} else {
							reject(callback.errorMsg);
						}
					})
				})
			},
			intoGroup: function(index) {
				let group = this.listData[index];
				uni.navigateTo({
					url: '../im-chat/im-chat-group?groupId=' + group.id + '&title=' + group.name
				});
			}
		}
	}
</script>

<style>
</style>
