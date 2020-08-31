<template>
	<view>

		<block v-if="hasLogin === false">
			<view class="uni-h3 uni-center uni-common-mt">
				<navigator url="../login/login">请先登录</navigator>
			</view>
		</block>

		<block v-if="hasLogin === true">
			<view class="uni-padding-wrap uni-common-mt">
				<view class="uni-title uni-common-pl">选择对话的用户/客服</view>
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							请选择
						</view>
						<view class="uni-list-cell-db">
							<picker @change="bindPickerChange" :value="index" :range="array" range-key="name">
								<view class="uni-input">{{array[index].name}}</view>
							</picker>
						</view>
					</view>
				</view>	
				<view class="custom-input">
					<input type="text" v-model="customUsername" placeholder="请输入要对话的用户/客服" />
				</view>
				<view class="uni-btn-v" @click="skipToSingleChat">
					<button type="primary">开始聊天</button>
				</view>
				<view class="uni-btn-v" @click="getUserInfo">
					<button type="primary">获取用户资料</button>
				</view>
			</view>
		</block>
		
		<view class="uni-padding-wrap">
			<view class="flex-item" v-for="(item,index) in artList" :key="index">
				<text>{{item}}</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		computed: {
			...mapState(['hasLogin'])
		},
		data() {
			return {
				customUsername:"",	// 自定义用户名创建聊天
				array: [{
						"name": 'Yoyo01',
						"username": "Yoyo01"
					},
					{
						"name": 'Yoyo02',
						"username": "Yoyo02"
					},
					{
						"name": 'Yoyo03',
						"username": "Yoyo03"
					},
					{
						"name": 'Yoyo04',
						"username": "Yoyo04"
					},
					{
						"name": 'test8',
						"username": "test8"
					},
					{
						"name": '客服01',
						"username": "kf01"
					},
					{
						"name": '客服02',
						"username": "kf02"
					}
				],
				index: 0,
				artList: [],
			}
		},
		methods: {
			skipToSingleChat: function(e) {
				
				if(this.customUsername){
					uni.showModal({
						title: '提示',
						content: '如果填写了自定义用户名创建会话，则以自定用户名为主',
						showCancel: false,
						cancelText: '确定',
						confirmText: '关闭',
						success: res => {
							var chatUser = this.customUsername;
							this.jpushIM.skipToSingleChat(chatUser, (res) => {
								// console.log(JSON.stringify(res));
								var data = res.data;
								uni.navigateTo({
									url: 'im-chat?title=' + data.title + '&fromUser=' + chatUser
								});
							}, (err) => {
								uni.showToast({
									title: "创建会话失败:" + err.errorMsg,
									icon: "none"
								});
							})
						},
						fail: () => {},
						complete: () => {}
					});
				}else{
					
					var chatUser = this.array[this.index].username;
					this.jpushIM.skipToSingleChat(chatUser, (res) => {
						var data = res.data;
						uni.navigateTo({
							url: 'im-chat?title=' + data.title + '&fromUser=' + chatUser
						});
					}, (err) => {
						uni.showToast({
							title: "创建会话失败:" + err.errorMsg,
							icon: "none"
						});
					})
				
				}
				
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为：' + e.target.value)
				this.index = e.target.value;
			},
			getUserInfo:function(e){
				var chatUser = this.array[this.index].username;
				this.jpushIM.getUserInfo({"username":chatUser}, (res) => {
					// uni.showModal({
					// 	title: '获取用户信息',
					// 	content: "存在",
					// 	showCancel: false,
					// 	cancelText: '',
					// 	confirmText: '确定',
					// 	success: res => {},
					// 	fail: () => {},
					// 	complete: () => {}
					// });
					this.artList.push(JSON.stringify(res));
				
				}, (err) => {
					this.artList.push(JSON.stringify(err));
					uni.showToast({
						title: err.errorMsg,
						icon: "none"
					});
				})
			}
		}
	}
</script>

<style>
	.uni-form-item .title {
		padding: 20rpx 0;
	}
	.custom-input{
		border: 1px solid #e0e0e0;
		background-color: #fff;
		box-sizing: border-box;
		margin-top: 30upx;
		border-radius: 5upx;
		padding: 10upx 20upx;
	}
</style>
