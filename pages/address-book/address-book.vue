<template>
	<view>
		<cu-custom bgImage="https://yoyocmf.oss-cn-beijing.aliyuncs.com/20200418/YjJopipz40rkdn1QRzblQjSmPbUW9p0LjeRCuEpN.jpg" :isBack="true"><block slot="backText">返回</block>
			<block slot="content">通讯录</block>
			
			<block slot="right">
				<view class="action">
					<text class="cuIcon-more" @click="showMenu = !showMenu"></text>
				</view>
			</block>
			
		</cu-custom>
		
		<view class="cu-bar bg-white search fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="输入搜索的关键词" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-gradual-orange shadow-blur round">搜索</button>
			</view>
		</view>
		
		<scroll-view scroll-y class="indexes" :scroll-into-view="'indexes-'+ listCurID" :style="[{height:'calc(100vh - '+ CustomBar + 'px - 50px)'}]"
		 :scroll-with-animation="true" :enable-back-to-top="true">
		 
			<block v-for="(item,key) in listData" :key="key">
				<view :class="'indexItem-' + key" :id="'indexes-' + key" :data-index="key">
					<view class="padding">{{key}}</view>
					<view class="cu-list menu-avatar no-padding">
						<view class="cu-item menuArrow" v-for="(sub,index) in item" :key="index" @click="skipToSingleChat(key,index)">
							<view class="cu-avatar lg round" :style="[{backgroundImage:'url('+ sub.avatar +')'}]"></view>
							<view class="content">
								<view class="text-grey">{{sub.noteName?sub.noteName:sub.nickname}}<text class="text-abc text-df">（{{sub.username}})</text></view>
								<view class="text-gray text-sm">
									个性签名：{{sub.signature}}
								</view>
							</view>
							<view class="action" style="width: 350rpx;">
								<button class="cu-btn round bg-grey shadow" @tap.stop="showDialog2(key,index)">备注</button>
							</view>
						</view>
					</view>
				</view>
			</block>
		</scroll-view>
		
		<view class="indexBar" :style="[{height:'calc(100vh - ' + CustomBar + 'px - 50px)'}]">
			<view class="indexBar-box" @touchstart="tStart" @touchend="tEnd" @touchmove.stop="tMove">
				<view class="indexBar-item" v-for="(item,index) in list" :key="index" :id="index" @touchstart="getCur" @touchend="setCur"> {{item.name}}</view>
			</view>
		</view>
		<!--选择显示-->
		<view v-show="!hidden" class="indexToast">
			{{listCur}}
		</view>
		
		
		<view class="material-apply" v-show="showMenu" :style="[{top:CustomBar + 'px'}]">
			<view class="apply-list">
				<view class="apply-item" @click="showDialog1">添加好友</view>
				<!-- <view class="apply-item" @click="showDialog2">修改备注</view> -->
				<view class="apply-item" @click="showDialog3">申请加群</view>
				<view class="apply-item" @click="showDialog4"> 创建单聊 </view>
				<view class="apply-item" @click="showDialog5"> 创建群聊</view>
			</view>
		</view>
		
		<!-- 修改备注 -->
		<view class="cu-modal" :class="show2?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">修改 {{currentItem.nickname}} 备注</view>
					<view class="action" @tap="closeDialog2">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<view class="cu-form-group text-left">
						<view class="title">备注：</view>
						<input placeholder="" name="input" v-model="mark"></input>
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
		
		<!-- 申请加群 -->
		<view class="cu-modal" :class="show3?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">申请加群</view>
					<view class="action" @tap="closeDialog3">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<view class="cu-form-group text-left">
						<view class="title">群号：</view>
						<input placeholder="输入要申请的群号" name="input" v-model="groupId"></input>
					</view>
					
					<view class="cu-form-group margin-top text-left">
						<textarea maxlength="-1" placeholder="输入验证信息" v-model="groupReason"></textarea>
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
		<!-- 创建单聊入口 -->
		<view class="cu-modal" :class="show4?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">创建单聊</view>
					<view class="action" @tap="closeDialog4">
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
						<button class="cu-btn line-green text-green" @tap="closeDialog4">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="confirm4">确定</button>
		
					</view>
				</view>
			</view>
		</view>
		
		<!-- 创建群聊 -->
		<view class="cu-modal" :class="show5?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">创建群聊</view>
					<view class="action" @tap="closeDialog5">
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
						<button class="cu-btn line-green text-green" @tap="closeDialog5">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="confirm5">确定</button>
		
					</view>
				</view>
			</view>
		</view>
		
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
	
	export default {
		computed: {
			...mapState(['hasLogin', 'loginProvider', 'nickname']),
		},
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				hidden: true,
				listCurID: '',
				list: [],
				listCur: '',
				listData: [],
				currentItem: {}, // 当前选择
				show2: false,	 // 显示修改好友备注模态框
				mark: "", 		 // 备注名
				showMenu: false, //显示下拉菜单
				show1: false,	 // 显示添加好友模态框
				friendUsername: "", // 好友帐号
				friendReason: "", // 添加理由
				
				show3:false,	// 显示申请加群模态框
				show4:false,	// 创建单聊
				show5:false,	// 创建群聊
				groupId:"",		// 申请加群ID
				groupReason:"",	// 申请加群理由
				
				singUsername: "Yoyo01",
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
				
			};
		},
		onShow() {
			this.init();
		},
		onReady() {
			let that = this;
			uni.createSelectorQuery().select('.indexBar-box').boundingClientRect(function(res) {
				that.boxTop = res.top
			}).exec();
			uni.createSelectorQuery().select('.indexes').boundingClientRect(function(res) {
				that.barTop = res.top
			}).exec()
		},
		
		methods: {
			init:function(){
				
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
				this.getList();
				this.friendReason = "HI, 我是" + this.nickname;
				
			},
			// 从本地数据库中获取通知列表
			getList: function() {
				// var list = [];
				// #ifdef APP-PLUS
				this.jpushIM.getFriends((res) => {
					if (res.errorCode == 0) {
						var list = res.data;
						this.listData = this.setList(list);
						
						list = [];
						for(let key in this.listData){
							list.push({
								"name":key
							});
						}
						this.list = list;
						this.listCur = list[0];
						
					} else {
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
				// 在H5下模拟数据用于调试页面显示样式，这段在正式上项目的时候可以删除
				this.listData = this.setList(mock.friendList);
				let list = [];
				for(let key in this.listData){
					list.push({
						"name":key
					});
				}
				this.list = list;
				this.listCur = list[0];
				
				// #endif
			},
			setList: function(items) {
				var newItems = [];
				items.forEach((e) => {
					e.avatar = e.avatar ? e.avatar : "/static/im/face.jpg";
					newItems.push(e);
				});
				if(items.length){
					newItems = this.imUtils.data_letter_sort(newItems, 'username');
				}
				return newItems;
			},
			//获取文字信息
			getCur(e) {
				this.hidden = false;
				this.listCur = this.list[e.target.id].name;
			},
			setCur(e) {
				this.hidden = true;
				this.listCur = this.listCur
			},
			//滑动选择Item
			tMove(e) {
				let y = e.touches[0].clientY,
					offsettop = this.boxTop,
					that = this;
				//判断选择区域,只有在选择区才会生效
				if (y > offsettop) {
					let num = parseInt((y - offsettop) / 20);
					this.listCur = that.list[num].name
				};
			},
			//触发全部开始选择
			tStart() {
				this.hidden = false
			},
			//触发结束选择
			tEnd() {
				this.hidden = true;
				this.listCurID = this.listCur
			},
			indexSelect(e) {
				let that = this;
				let barHeight = this.barHeight;
				let list = this.list;
				let scrollY = Math.ceil(list.length * e.detail.y / barHeight);
				for (let i = 0; i < list.length; i++) {
					if (scrollY < i + 1) {
						that.listCur = list[i].name;
						that.movableY = i * 20
						return false
					}
				}
			},
			
			bindClick(e, index, index2) {
				this.currentIndex = index;
				this.currentIndex2 = index2;
				this.currentItem = this.listData[index][index2];

				let {
					content
				} = e
				if (content.text === '删除') {

					uni.showModal({
						title: '提示',
						content: '是否确认删除好友',
						success: (res) => {
							if (res.confirm) {

								let item = this.currentItem;
								let params = {
									"username": item.username
								};
								// #ifdef APP-PLUS
								this.jpushIM.removeFromFriendList(params, (res) => {
									if (res.errorCode == 0) {
										uni.showToast({
											title: res.errorMsg,
											icon: 'none'
										});
										this.getList();
										// this.listData[index].splice(index2, 1);
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
						}
					});

				} else if (content.text === '备注') {
					this.mark = this.currentItem.noteName; // 赋值备注
					this.showDialog2();
				} else {
					uni.showToast({
						title: `点击了${e.content.text}按钮`,
						icon: 'none'
					})
				}
			},
			// 创建会话
			skipToSingleChat: function(key,index) {
				this.currentItem = this.listData[key][index];
				var item = this.currentItem;
				let title = item.nickname ? item.nickname : item.nickname;
				
				// #ifdef APP-PLUS
				this.jpushIM.skipToSingleChat(item.username, (res) => {
					uni.navigateTo({
						url: '../im-chat/im-chat?title=' + title + '&fromUser=' + item.username
					});
				}, (err) => {
					uni.showToast({
						title: "创建 [" + item.username + "] 会话失败:" + err.errorMsg,
						icon: "none"
					});
				})
				// #endif
				
			},
			showDialog1: function(index) {
				this.showMenu = false;
				this.show1 = true;
			},
			closeDialog1: function() {
				this.show1 = false;
			},
			confirm1() {
				// 添加好友调接口
				let params = {
					"username": this.friendUsername,
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
			showDialog2: function(key,index) {
				this.show2 = true;
				this.currentItem = this.listData[key][index];
			},
			closeDialog2: function() {
				this.show2 = false;
			},
			confirm2() {
				// 更新好友备注调接口
				let params = {
					"username": this.currentItem.username,
					"noteName": this.mark
				}
				// #ifdef APP-PLUS
				this.jpushIM.updateFriendNoteName(params, (res) => {
					if (res.errorCode == 0) {
						uni.showToast({
							title: res.errorMsg,
							icon: 'none'
						});
						this.closeDialog2(); // 关闭dialog
						this.mark = ''; // 清空备注内容
						this.init();
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
			showDialog3: function(index) {
				this.showMenu = false;
				this.show3 = true;
			},
			closeDialog3: function() {
				this.show3 = false;
			},
			confirm3() {
				// 申请加群调接口
				let params = {
					"groupId": this.groupId,
					"reason": this.groupReason
				}
				// console.log(params);
				// #ifdef APP-PLUS
				this.jpushIM.applyJoinGroup(params, (res) => {
					console.log(res);
					if (res.errorCode == 0) {
						uni.showToast({
							title: res.errorMsg,
							icon: 'none'
						});
						this.closeDialog3(); // 关闭dialog
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
			showDialog4: function(index) {
				this.show4 = true;
				this.showMenu = false;
			},
			closeDialog4: function() {
				this.show4 = false;
			},
			confirm4: function() {
				// 创建单聊调接口
				var chatUser = this.singUsername;
				this.jpushIM.skipToSingleChat(chatUser, (res) => {
					console.log(res);
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
			showDialog5: function(index) {
				this.show5 = true;
				this.showMenu = false;
			},
			closeDialog5: function() {
				this.show5 = false;
			},
			confirm5: function() {
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
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	page {
		padding-top: 100rpx;
	}

	.indexes {
		position: relative;
		/* #ifdef APP-PLUS */
		margin-top: 100rpx;
		/* #endif */
	}

	.indexBar {
		position: fixed;
		right: 0px;
		bottom: 0px;
		padding: 20upx 20upx 20upx 60upx;
		display: flex;
		align-items: center;
	}

	.indexBar .indexBar-box {
		width: 40upx;
		height: auto;
		background: #fff;
		display: flex;
		flex-direction: column;
		box-shadow: 0 0 20upx rgba(0, 0, 0, 0.1);
		border-radius: 10upx;
	}

	.indexBar-item {
		flex: 1;
		width: 40upx;
		height: 40upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24upx;
		color: #888;
	}

	movable-view.indexBar-item {
		width: 40upx;
		height: 40upx;
		z-index: 9;
		position: relative;
	}

	movable-view.indexBar-item::before {
		content: "";
		display: block;
		position: absolute;
		left: 0;
		top: 10upx;
		height: 20upx;
		width: 4upx;
		background-color: #f37b1d;
	}

	.indexToast {
		position: fixed;
		top: 0;
		right: 80upx;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		width: 100upx;
		height: 100upx;
		border-radius: 10upx;
		margin: auto;
		color: #fff;
		line-height: 100upx;
		text-align: center;
		font-size: 48upx;
	}
	
	
</style>
