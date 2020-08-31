<template>
	<view>

		<cu-custom bgImage="https://yoyocmf.oss-cn-beijing.aliyuncs.com/20200418/YjJopipz40rkdn1QRzblQjSmPbUW9p0LjeRCuEpN.jpg"
		 :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{selfTitle}}</block>
			<block slot="right">
				<view class="action">
					<text class="cuIcon-more" @click="showMenu = !showMenu"></text>
				</view>
			</block>
		</cu-custom>

		<view class="content" @touchstart="hideDrawer">
			<scroll-view class="msg-list" scroll-y="true" :scroll-with-animation="scrollAnimation" :scroll-top="scrollTop"
			 :scroll-into-view="scrollToView" upper-threshold="50" :style="[{top:CustomBar + 'px'}]">

				<!-- 加载历史数据waitingUI -->
				<view class="loading" v-if="ifHaveMore==true" @click="loadHistory">
					<button class="mini-btn" type="default" size="mini" v-if="isHistoryLoading == false">查看更多</button>
					<view class="spinner" v-if="isHistoryLoading == true">
						<view class="rect1"></view>
						<view class="rect2"></view>
						<view class="rect3"></view>
						<view class="rect4"></view>
						<view class="rect5"></view>
					</view>
				</view>

				<view class="row" v-else>
					<view class="system">
						<!-- 文字消息 -->
						<view class="text">暂无更多记录</view>
					</view>
				</view>

				<view class="row" v-for="(row,index) in msgList" :key="index" :id="row.msgId">
					<!-- 自己发出的消息 -->

					<view class="system" v-if="row.messageType == 'event'">
						<!-- 行为消息 -->
						<view class="text">{{row.content.text}}</view>
					</view>

					<block v-else>

						<view class="my" v-if="row.isReceived == false">
							<!-- 左-消息 -->
							<view class="left">
								<!-- 初始状态 ，0 1都是发送中 -->
								<view v-if="row.status < 2">
									<uni-load-more :contentText="loadingText" iconType="spinner" status="loading" />
								</view>
								<!-- 文字消息 -->
								<view v-if="row.messageType=='text'" class="bubble">
									<rich-text :nodes="row.content.text"></rich-text>
								</view>
								<!-- 语言消息 -->
								<view v-if="row.messageType=='voice'" class="bubble voice" @tap="playVoice(index)" :class="playMsgid == row.msgId?'play':''">
									<view class="length">{{row.content.length}}</view>
									<view class="icon my-voice"></view>
								</view>
								<!-- 图片消息 -->
								<view v-if="row.messageType=='image'" class="bubble img" @tap="showPic(row.content)">
									<image :src="row.content.url" :style="{'width': row.content.w+'px','height': row.content.h+'px'}"></image>
								</view>
							</view>
							<!-- 右-头像 -->
							<view class="right">
								<image :src="row.fromUser.avatar"></image>
							</view>
						</view>
						<!-- 别人发出的消息 -->
						<view class="other" v-if="row.isReceived == true">
							<!-- 左-头像 -->
							<view class="left">
								<image :src="row.fromUser.avatar"></image>
							</view>
							<!-- 右-用户名称-时间-消息 -->
							<view class="right">
								<view class="username">
									<view class="name">{{row.fromUser.nickname?row.fromUser.nickname:row.fromUser.username}}</view>
									<view class="time">{{row.createTime}}</view>
								</view>
								<!-- 文字消息 -->
								<view v-if="row.messageType=='text'" class="bubble">
									<rich-text :nodes="row.content.text"></rich-text>
								</view>
								<!-- 语音消息 -->
								<view v-if="row.messageType=='voice'" class="bubble voice" @tap="playVoice(index)" :class="playMsgid == row.msgId?'play':''">
									<view class="icon other-voice"></view>
									<view class="length">{{row.content.length}}</view>
								</view>
								<!-- 图片消息 -->
								<view v-if="row.messageType=='image'" class="bubble img" @tap="showPic(row.content)">
									<image :src="row.content.url" :style="{'width': row.content.w+'px','height': row.content.h+'px'}"></image>
								</view>
							</view>
						</view>
					</block>
				</view>
			</scroll-view>
		</view>
		<!-- 抽屉栏 -->
		<view class="popup-layer" :class="popupLayerClass" @touchmove.stop.prevent="discard">
			<!-- 表情 -->
			<swiper class="emoji-swiper" :class="{hidden:hideEmoji}" indicator-dots="true" duration="150">
				<swiper-item v-for="(page,pid) in emojiList" :key="pid">
					<view v-for="(em,eid) in page" :key="eid" @tap="addEmoji(em)">
						<image mode="widthFix" :src="'/static/img/emoji/'+em.url"></image>
					</view>
				</swiper-item>
			</swiper>
			<!-- 更多功能 相册-拍照 -->
			<view class="more-layer" :class="{hidden:hideMore}">
				<view class="list">
					<view class="box" @tap="chooseImage">
						<view class="icon tupian2"></view>
					</view>
					<view class="box" @tap="camera">
						<view class="icon paizhao"></view>
					</view>
				</view>
			</view>
		</view>
		<!-- 底部输入栏 -->
		<view class="input-box" :class="popupLayerClass" @touchmove.stop.prevent="discard">
			<!-- H5下不能录音，输入栏布局改动一下 -->
			<!-- #ifndef H5 -->
			<view class="voice">
				<view class="icon" :class="isVoice?'jianpan':'yuyin'" @tap="switchVoice"></view>
			</view>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<view class="more" @tap="showMore">
				<view class="icon add"></view>
			</view>
			<!-- #endif -->
			<view class="textbox">
				<!-- 使用前端录音模板 -->
				<view class="voice-mode" :class="[isVoice?'':'hidden',recording?'recording':'']" @touchstart="voiceBegin"
				 @touchmove.stop.prevent="voiceIng" @touchend="voiceEnd" @touchcancel="voiceCancel">{{voiceTis}}</view>
				<view class="text-mode" :class="isVoice?'hidden':''">
					<view class="box">
						<textarea auto-height="true" v-model="textMsg" @focus="textareaFocus" />
						</view>
					<view class="em" @tap="chooseEmoji">
						<view class="icon biaoqing"></view>
					</view>
				</view>
			</view>
			<!-- #ifndef H5 -->
			<view class="more" @tap="showMore">
				<view class="icon add"></view>
			</view>
			<!-- #endif -->
			<view class="send" :class="isVoice?'hidden':''" @tap="sendText">
				<view class="btn">发送</view>
			</view>
		</view>
		<!-- 录音UI效果 -->
		<view class="record" :class="recording?'':'hidden'">
			<view class="ing" :class="willStop?'hidden':''"><view class="icon luyin2" ></view></view>
			<view class="cancel" :class="willStop?'':'hidden'"><view class="icon chehui" ></view></view>
			<view class="tis" :class="willStop?'change':''">{{recordTis}}</view>
		</view>
		


		<view class="material-apply" v-show="showMenu">
			<view class="apply-list">
				<view class="apply-item" @click="viewInfo">查看群资料</view>
				<view class="apply-item" @click="showDialog1">添加管理员</view>
				<view class="apply-item" @click="showDialog2">取消管理员</view>
			</view>
		</view>
		
		<!-- 添加群管理 -->
		<view class="cu-modal" :class="show1?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">添加群管理</view>
					<view class="action" @tap="closeDialog1">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<view class="cu-form-group margin-top text-left">
						<textarea maxlength="-1" v-model="usernameArray" placeholder="输入成员用户名,多个以逗号隔开"></textarea>
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
		
		<!-- 取消群管理 -->
		<view class="cu-modal" :class="show2?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">取消群管理</view>
					<view class="action" @tap="closeDialog2">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<view class="cu-form-group margin-top text-left">
						<textarea maxlength="-1" v-model="usernameArray" placeholder="输入成员用户名,多个以逗号隔开"></textarea>
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
		
		
	</view>
</template>
<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'

	// #ifdef H5
	import mock from '../../common/mock.js'
	// #endif

	var _self;
	export default {
		components: {
			uniLoadMore
		},
		computed: {
			...mapState(['hasLogin', 'loginProvider', 'nickname', 'avatar', 'receiveMessage', 'sendMessageResponse']),
			emojiList: {
				get: function() {
					return this.imUtils.emojiList
				},
				set: function() {}
			},
		},
		onUnload() {
			// #ifdef APP-PLUS
			// 获取未读消息总数后赋值给tabbar
			this.jpushIM.getAllUnreadCount((count) => {
				if (count < 1) {
					uni.removeTabBarBadge({
						index: 2
					})
				} else {
					uni.setTabBarBadge({
						index: 2,
						text: count.toString()
					})
				}
			})
			// #endif

		},
		data() {
			return {
				selfTitle: "", // 自定义标题
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				//文字消息
				textMsg: '',
				//消息列表
				isHistoryLoading: false,
				scrollAnimation: false,
				scrollTop: 0,
				scrollToView: '',
				msgList: [],
				msgImgList: [],
				loadHistoryLimit: 20, // 每次加载历史记录条数
				getMsgListLimit: 20, // 初始化记录的条数
				groupId:"",			// 群组ID
				groupInfo: {}, 		// 群组的相关信息
				offset: 0, // 从第几条开始，每获取过一条，+1
				ifHaveMore: true, // 是否还有更多
				loadingText: {
					contentdown: '上拉显示更多',
					contentrefresh: '', // 发送消息以后，loading出现，不需要文字
					contentnomore: '没有更多数据了'
				},
				//录音相关参数
				// #ifndef H5
				//H5不能录音
				RECORDER: uni.getRecorderManager(),
				// #endif
				isVoice: false,
				voiceTis: '按住 说话',
				recordTis: "手指上滑 取消发送",
				recording: false,
				willStop: false,
				initPoint: {
					identifier: 0,
					Y: 0
				},
				recordTimer: null,
				recordLength: 0,

				//播放语音相关参数
				AUDIO: uni.createInnerAudioContext(),
				playMsgid: null,
				VoiceTimer: null,
				// 抽屉参数
				popupLayerClass: '',
				// more参数
				hideMore: true,
				//表情定义
				hideEmoji: true,
				showMenu: false,	//显示下拉菜单
				show1: false,
				show2: false,
				usernameArray:"",	// 管理员列表
			};
		},
		onLoad(option) {
			_self = this;
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
			this.selfTitle = option.title
			// uni.setNavigationBarTitle({
			// 	title: option.title
			// });

			// 赋值聊天对象的username，nickname等信息
			// #ifdef APP-PLUS	
			let groupId = option.groupId;
			let param = {"id":groupId};
			this.groupId = groupId;
			this.jpushIM.getGroupInfo(param, (callback) => {
				if(callback.errorCode == 0){
					this.groupInfo = callback.data;
				}else{
					uni.showModal({
						title: '错误',
						content: "原因：" + callback.errorMsg,
						showCancel: false,
						cancelText: '',
						confirmText: '关闭',
						success: res => {
							if (res.confirm) {
								uni.switchTab({
									url: "./im-list"
								})
							}
						}
					});
				}
			})
			// 重置会话消息未读数
			this.jpushIM.resetUnreadMessageCount({
				"type": "group",
				"groupId":this.groupId
			});
			// 如果没有登录
			if (!this.hasLogin) {
				// 检测当前IM是否登录，如果已经已经登录，则调用登录方法
				this.$store.dispatch("checkCurrentIMUser").then(response => {
					uni.showToast({
						title: '自动登录中..',
						icon: 'none'
					});
					this.login(response.username);
					this.getMsgList();
				}, response => {
					uni.showToast({
						title: response,
						icon: 'none'
					});
				})
			} else {
				this.getMsgList();
			}
			// #endif

			//语音自然播放结束
			this.AUDIO.onEnded((res) => {
				this.playMsgid = null;
			});

			// #ifndef H5
			//录音开始事件
			this.RECORDER.onStart((e) => {
				this.recordBegin(e);
			})
			//录音结束事件
			this.RECORDER.onStop((e) => {
				this.recordEnd(e);
			})
			// #endif

		},
		onShow() {
			this.scrollTop = 9999999;
		},
		methods: {
			...mapMutations(['login', 'logout']),
			back() {
				// 返回
				uni.navigateBack({
					delta: 1
				});
			},
			viewUser() {
				uni.navigateTo({
					url: './im-user?title=' + this.chatUser.nickname + "&fromUser=" + this.chatUsername
				});
			},
			// 接受消息(筛选处理)
			screenMsg(msg) {
				// console.log("screenMsg IM接收消息处理：" + JSON.stringify(msg));
				// 用户消息
				switch (msg.messageType) {
					case 'text':
						// 文字消息
						this.addTextMsg(msg);
						break;
					case 'voice':
						// 语音消息
						console.log("push一条语音消息 " + JSON.stringify(msg))
						this.addVoiceMsg(msg);
						break;
					case 'image':
						// 图片消息
						this.addImgMsg(msg);
						break;
					case 'event':
						// 行为消息
						this.addTextMsg(msg);
						break;
				}
				this.$nextTick(function() {
					// 滚动到底
					// console.log("滚动到底：" + msg.msgId);
					this.scrollToView = msg.msgId
				});
				// 接收到消息震动
				if (msg.isReceived == true) {
					// console.log('振动');
					uni.vibrateLong();
				}
			},
			//触发滑动到顶部(加载历史信息记录)
			loadHistory(e) {
				if (this.isHistoryLoading) {
					return;
				}
				if (this.ifHaveMore == false) {
					return;
				}
				this.isHistoryLoading = true; //参数作为进入请求标识，防止重复请求
				this.scrollAnimation = false; //关闭滑动动画

				//请求历史记录效果
				setTimeout(() => {
					var params = {
						"type":"group",
						"groupId": _self.groupId,
						"from": _self.offset, // 从第几条开始
						"limit": _self.loadHistoryLimit, // 历史记录每次加载10条
					};
					_self.jpushIM.getHistoryMessages(params, (res) => {
						if (res.errorCode == 0) {
							if (res.data.length < 1) {
								// 没有历史记录
								this.ifHaveMore = false;
								return false;
							}
							var list = _self.setList(res.data);
							let Viewid = list[0].msgId; //记住获取到历史消息第一个信息ID
							// 获取消息中的图片,并处理显示尺寸
							for (let i = 0; i < list.length; i++) {
								if (list[i].messageType == "image") {
									list[i].content = _self.setPicSize(list[i].content);
									_self.msgImgList.unshift(list[i].content.url);
								}
								_self.msgList.unshift(list[i]);
							}
							//这段代码很重要，不然每次加载历史数据都会跳到顶部
							_self.$nextTick(function() {
								_self.scrollToView = Viewid; //跳转上次的第一行信息位置
								_self.$nextTick(function() {
									_self.scrollAnimation = true; //恢复滚动动画
								});
							});
							// 如果长度不足10条，就表示没有下一页了
							if (list.length < _self.loadHistoryLimit) {
								_self.ifHaveMore = false;
							}
							_self.isHistoryLoading = false;

						} else {
							_self.ifHaveMore = false;
							_self.isHistoryLoading = false;
						}
					})
				}, 1000)
			},
			getMockMsgList() {
				// mock模拟用户对话列表
				// 在正式项目中，这个方法扔掉
				var list = this.setList(mock.msgList);
				// console.log(list);
				// 获取消息中的图片,并处理显示尺寸
				for (let i = 0; i < list.length; i++) {
					if (list[i].messageType == "image") {
						list[i].content = this.setPicSize(list[i].content);
						this.msgImgList.push(list[i].content.url);
					}
				}
				this.msgList = list;
				// 滚动到底部
				this.$nextTick(function() {
					//进入页面滚动到底部
					this.scrollTop = 9999;
					this.$nextTick(function() {
						this.scrollAnimation = true;
					});
				});
				// 如果长度不足10条，就表示没有下一页了
				if (list.length < this.getMsgListLimit) {
					this.ifHaveMore = false;
				}
			},
			// 加载初始页面消息
			getMsgList() {
				// 消息列表
				var params = {
					"type":"group",
					"groupId": this.groupId,
					"from": this.offset, // 从第几条开始
					"limit": this.loadHistoryLimit, // 历史记录每次加载10条
				};
				this.jpushIM.getHistoryMessages(params, (res) => {
					if (res.errorCode == 0) {
						if (res.data.length < 1) {
							// 没有历史记录
							this.ifHaveMore = false;
							return false;
						}
						// console.log("聊天消息：" + JSON.stringify(res.data));
						var list = this.setList(res.data);
						// 获取消息中的图片,并处理显示尺寸
						for (let i = 0; i < list.length; i++) {
							if (list[i].messageType == "image") {
								list[i].content = this.setPicSize(list[i].content);
								this.msgImgList.push(list[i].content.url);
							}
						}
						this.msgList = list;
						// 滚动到底部
						this.$nextTick(function() {
							//进入页面滚动到底部
							this.scrollTop = 9999;
							this.$nextTick(function() {
								this.scrollAnimation = true;
							});
						});
						// 如果长度不足10条，就表示没有下一页了
						if (list.length < this.getMsgListLimit) {
							this.ifHaveMore = false;
						}
					} else {
						this.ifHaveMore = false;
						uni.showToast({
							title: res.errorMsg,
							icon: 'none'
						});
					}
				})
			},
			//处理图片尺寸，如果不处理宽高，新进入页面加载图片时候会闪
			setPicSize(content) {
				// 让图片最长边等于设置的最大长度，短边等比例缩小，图片控件真实改变，区别于aspectFit方式。
				let maxW = uni.upx2px(350); //350是定义消息图片最大宽度
				let maxH = uni.upx2px(350); //350是定义消息图片最大高度
				if (content.w > maxW || content.h > maxH) {
					let scale = content.w / content.h;
					content.w = (scale > 1 ? maxW : maxH * scale).toString();
					content.h = (scale > 1 ? maxW / scale : maxH).toString();
				}
				return content;
			},
			// 设置列表，items是sdk返回来的列表
			setList: function(items) {
				var newItems = [];
				items.sort(this.imUtils.compareAscSort("createTime")); // 按指定字段排序
				items.forEach((e) => {
					if (e) {
						var item = this.setSingItem(e);
						newItems.push(item);
					}
				});
				return newItems;
			},
			setSingItem: function(item) {
				var content = {}; // 组合消息内容
				this.offset++;
				if (item.messageType == "text") {
					// 文字消息
					content = {
						text: _self.imUtils.replaceEmoji(item.messageString),
					}
				} else if (item.messageType == "image") {
					// 图片消息，原本应该是绝对路径转平台url
					// 由于5+限制，无法读取，抓网络地址拼接，图片加载会有些慢
					// console.log("读取路径：JMessagePlugin img string： " + plus.io.convertAbsoluteFileSystem(item.thumbPath));
					content = {
						url: item.messageString,
						w: item.extras.w, // 这里的附加数是在upload的时候就带上去的
						h: item.extras.h,
					}
				} else if (item.messageType == "voice") {
					// 语音消息
					content = {
						url: item.messageString,
						length: item.extras.length, // 这里的附加数是在upload的时候就带上去的，也可以用item.duration 系统返回的时长
					}
				} else if (item.messageType == "event") {
					var txt = "";
					// // 以下为类型，可以自定义txt显示
					// switch (item.eventType){
					// 	case "acceptedFriendInvitation":
					// 		break;
					// 	case "group_member_added":
					// 		break;
					// 	case "createGroup":
					// 		break;
					// 	case "currentUserInfoChange":
					// 		break;
					// 		case "declinedFriendInvitation":
					// 		break;
					// 		case "deletedFriend":
					// 		break;
					// 		case "group_member_exit":
					// 		break;
					// 		case "loginKicked":
					// 		break;
					// 		case "messageRetract":
					// 		break;
					// 		case "receiveFriendInvitation":
					// 		break;
					// 		case "receiveServerFriendUpdate":
					// 		break;
					// 		case "group_member_removed":
					// 		break;
					// 		case "serverAlterPassword":
					// 		break;
					// 		case "group_info_updated":
					// 		break;
					// 		case "userLoginStatusUnexpected":
					// 		break;
					// 		case "group_type_changed":
					// 		break;
					// 		case "group_dissolved":
					// 		break;
					// 	default:
					// 		break;
					// }
					content = {
						text: item.messageString,
					}
				}
				// 判断默认头像
				item.fromUser.avatar = item.fromUser.avatar ? item.fromUser.avatar : "/static/img/im/face.jpg";
				//时间转换
				let isToday = this.imUtils.timeStampToIsToday(item.createTime);
				var time;
				if (isToday) {
					// 如果在10分钟内，则不显示时间
					let isTenMin = this.imUtils.withinMinute(item.createTime, 10);
					if (isTenMin) {
						time = "";
					} else {
						time = this.imUtils.formatDateTime(item.createTime, "H:i:s");
					}
				} else {
					time = this.imUtils.formatDateTime((item.createTime), "str");
				}
				item.createTime = time;
				item.content = content;
				return item;
			},
			//更多功能(点击+弹出) 
			showMore() {
				this.isVoice = false;
				this.hideEmoji = true;
				// 打开面板
				if (this.hideMore) {
					this.hideMore = false;
					this.openDrawer();
				} else {
					this.hideDrawer();
				}
			},
			// 打开抽屉
			openDrawer() {
				this.popupLayerClass = 'showLayer';
			},
			// 隐藏抽屉
			hideDrawer() {
				this.popupLayerClass = '';
				setTimeout(() => {
					this.hideMore = true;
					this.hideEmoji = true;
				}, 150);
			},
			// 选择图片发送
			chooseImage() {
				this.getImage('album');
			},
			//拍照发送
			camera() {
				this.getImage('camera');
			},
			//选照片 or 拍照
			getImage(type) {
				this.hideDrawer();
				uni.chooseImage({
					sourceType: [type],
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: (res) => {
						for (let i = 0; i < res.tempFilePaths.length; i++) {
							uni.getImageInfo({
								src: res.tempFilePaths[i],
								success: (image) => {
									// console.log(image.width);
									// console.log(image.height);
									let msg = {
										url: res.tempFilePaths[i],
										w: image.width,
										h: image.height
									};
									this.sendMsg(msg, 'image');
								}
							});
						}
					}
				});
			},
			// 选择表情
			chooseEmoji() {
				this.hideMore = true;
				if (this.hideEmoji) {
					this.hideEmoji = false;
					this.openDrawer();
				} else {
					this.hideDrawer();
				}
			},
			//添加表情
			addEmoji(em) {
				this.textMsg += em.alt;
			},
			//获取焦点，如果不是选表情ing,则关闭抽屉
			textareaFocus() {
				if (this.popupLayerClass == 'showLayer' && this.hideMore == false) {
					this.hideDrawer();
				}
			},
			// 发送文字消息
			sendText() {
				this.hideDrawer(); //隐藏抽屉
				if (!this.textMsg) {
					return;
				}
				// let content = this.replaceEmoji(this.textMsg);
				let content = this.textMsg;
				let msg = {
					text: content
				}
				this.sendMsg(msg, 'text');
				this.textMsg = ''; //清空输入框
			},
			// 发送消息
			sendMsg(content, type) {
				var params = {};
				switch (type) {
					case "text":
						params = {
							"msgType": type,
							"type":"group",	// 消息类型，'single' / 'group' / 'chatRoom'
							"groupId":this.groupId, // 接收群组ID
							"text": content.text, // 文字内容
						};
						// console.log("文本消息传参：" + JSON.stringify(params));
						break;
					case "image":
						params = {
							"msgType": type,
							"type":"group",	// 消息类型，'single' / 'group' / 'chatRoom'
							"groupId":this.groupId, // 接收群组ID
							"path": content.url,
							"extras": {
								"w": content.w,
								"h": content.h
							}, // 附加字段，宽度/高度
						};
						// console.log("图片消息传参：" + JSON.stringify(params));
						break;
					case "voice":
						// 语音消息
						params = {
							"msgType": type,
							"type":"group",	// 消息类型，'single' / 'group' / 'chatRoom'
							"groupId":this.groupId, // 接收群组ID
							"path": content.url,
							"extras": {
								"length": content.length,
								"duration": content.duration
							}, // 语音长度
						};
						console.log("发送语音消息传参：" + JSON.stringify(params));
						break;
						
					default:
						break;
				}
				
				// #ifdef APP-PLUS
				this.$store.dispatch("submitChatMsg", params).then(response => {
					// 成功
					var msg = this.setSingItem(response, "user");
					if (type == "text") {
						// 如果是文字，替换一下表情
						content.text = _self.imUtils.replaceEmoji(msg.content.text);
					};
					msg.content = content; // 这里一定要加，是因为刚发出去的图片消息是是异步上传

					// 发送消息
					this.screenMsg(msg);
				}, response => {
					// 失败
					uni.showModal({
						title: '发送失败',
						content: response,
						showCancel: false,
						cancelText: '',
						confirmText: '关闭',
					});
					console.log("JMessagePlugin 发送消息失败：" + JSON.stringify(response));
				})
				// #endif
				
			},
			// 添加文字消息到列表
			addTextMsg(msg) {
				this.msgList.push(msg);
			},
			// 添加语音消息到列表
			addVoiceMsg(msg) {
				this.msgList.push(msg);
			},
			// 添加图片消息到列表
			addImgMsg(msg) {
				msg.content = this.setPicSize(msg.content);
				this.msgImgList.push(msg.content.url);
				this.msgList.push(msg);
			},
			// 预览图片
			showPic(content) {
				uni.previewImage({
					indicator: "number",
					current: content.url,
					urls: this.msgImgList
				});
			},
			// 播放语音
			playVoice(index) {
				var msg = this.msgList[index];
				this.playMsgid = msg.msgId;
				this.AUDIO.src = msg.content.url;
				this.$nextTick(function() {
					this.AUDIO.play();
				});
			},
			// 录音开始
			voiceBegin(e) {
				if (e.touches.length > 1) {
					return;
				}
				this.initPoint.Y = e.touches[0].clientY;
				this.initPoint.identifier = e.touches[0].identifier;
				this.RECORDER.start({
					format: "mp3",//音频格式，有效值 aac/mp3，由于Android mp3似乎有点问题
				}); //录音开始,
			},
			//录音开始UI效果
			recordBegin(e) {
				this.recording = true;
				this.voiceTis = '松开 结束';
				this.recordLength = 0;
				this.recordTimer = setInterval(() => {
					this.recordLength++;
				}, 1000)
			},
			// 录音被打断
			voiceCancel() {
				this.recording = false;
				this.voiceTis = '按住 说话';
				this.recordTis = '手指上滑 取消发送'
				this.willStop = true; //不发送录音
				this.RECORDER.stop(); //录音结束
			},
			// 录音中(判断是否触发上滑取消发送)
			voiceIng(e) {
				if (!this.recording) {
					return;
				}
				let touche = e.touches[0];
				//上滑一个导航栏的高度触发上滑取消发送
				if (this.initPoint.Y - touche.clientY >= uni.upx2px(100)) {
					this.willStop = true;
					this.recordTis = '松开手指 取消发送'
				} else {
					this.willStop = false;
					this.recordTis = '手指上滑 取消发送'
				}
			},
			// 结束录音
			voiceEnd(e) {
				if (!this.recording) {
					return;
				}
				this.recording = false;
				this.voiceTis = '按住 说话';
				this.recordTis = '手指上滑 取消发送'
				this.RECORDER.stop(); //录音结束
			},
			//录音结束(回调文件)
			recordEnd(e) {
				clearInterval(this.recordTimer);
				if (!this.willStop) {
					let msg = {
						length: 0,
						url: e.tempFilePath,
						duration: this.recordLength, // 【**必传】，语音内容的持续时长. 单位是秒
					}
					let min = parseInt(this.recordLength / 60);
					let sec = this.recordLength % 60;
					min = min < 10 ? '0' + min : min;
					sec = sec < 10 ? '0' + sec : sec;
					msg.length = min + ':' + sec;
					console.log("录音结束事件回调：" + JSON.stringify(msg));
					this.sendMsg(msg, 'voice');
				} else {
					console.log('取消发送录音');
				}
				this.willStop = false;
			},
			// 切换语音/文字输入
			switchVoice() {
				this.hideDrawer();
				this.isVoice = this.isVoice ? false : true;
			},
			discard() {
				return;
			},
			// 查看群资料
			viewInfo(){
				this.showMenu = false;
				uni.navigateTo({
					url: './im-chat-group-info?groupId=' + this.groupId + "&title=" + this.groupInfo.name
				});
			},
			showDialog1: function() {
				this.showMenu = false;
				this.show1 = true;
			},
			closeDialog1: function() {
				this.show1 = false;
			},
			confirm1:function(){
				// 添加管理员调接口
				this.closeDialog1();
				
				let params = {
					"groupId": this.groupId,
					"usernames": this.usernameArray.split(",")
				}
				// 这里看一下用户名提交的
				// console.log("usernameArray传参：");
				// console.log(JSON.stringify(params));
				// console.log(params.usernames);
				// console.log(typeof params.usernames);
				// #ifdef APP-PLUS
				this.jpushIM.addGroupAdmins(params, (callback) => {
					uni.showModal({
						title: callback.errorCode == 0?'成功':'错误',
						content: callback.errorMsg,
						showCancel: false,
						cancelText: '',
						confirmText: '确定',
						success: res => {
							if (res.confirm) {
								// console.log("点击了确定按钮")
							}
						}
					});
				})
				// #endif
			},
			showDialog2: function(index) {
				this.showMenu = false;
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
					content: '是否确认取消管理员身份：' + this.usernameArray,
					success: (res) => {
						if (res.confirm) {
							
							// #ifdef APP-PLUS
							let params = {
								"groupId": this.groupId,
								"usernames": this.usernameArray.split(",")
							}
							this.jpushIM.removeGroupAdmins(params, (callback) => {
								console.log(callback);
								uni.showModal({
									title: callback.errorCode == 0?'成功':'错误',
									content: callback.errorMsg,
									showCancel: false,
									cancelText: '',
									confirmText: '确定',
									success: res => {
										if (res.confirm) {
											// console.log("点击了确定按钮")
										}
									}
								});
							})
							// #endif
							
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}
		},
		watch: {
			receiveMessage(res) {
				// console.log("监听新消息事件");
				if (res.target.id == this.groupId) {
					// 监听有收到新消息，并且接收人是当前用户
					// 重置会话消息未读数
					this.jpushIM.resetUnreadMessageCount({
						"type":"group",
						"groupId":this.groupId
					});
					// 在收到消息后更新
					var msg = this.setSingItem(res);
					this.screenMsg(msg);
				}
			},
			sendMessageResponse(res) {
				// 监听消息发送结果事件
				if (res.target.id == this.groupId) {
					var list = this.msgList;
					for (let i = 0; i < list.length; i++) {
						if (list[i].messageId == res.messageId) {
							list[i].status = res.status; // 状态变更
							list[i].messageId = res.messageId; // 本地数据库中的消息 Id。
							list[i].id = res.serverMessageId; // 服务器端对应的消息 Id
						}
					}
				}
			}
		},
	}
</script>
<style lang="scss">
	@import "@/common/style.scss"; 
</style>
