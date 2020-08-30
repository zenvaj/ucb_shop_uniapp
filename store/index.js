import Vue from 'vue'
import Vuex from 'vuex'
import jpushIM from '../common/im.js'
import imUtils from '../common/imTools.js'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		loginProvider: "", // 用户名或其他唯一值
		nickname: "", // 昵称
		signature: "", // 签名
		avatar: "/static/img/face.jpg", // 头像
		gender: "", // 性别，0未知，1男，2女
		openid: null,
		testvuex: false,
		graceIMMsgs: {},
		graceIMScTop: 0,
		receiveMessage: {}, // 接收新消息
		loginStateChanged: {}, // 登录状态变更
		sendMessageResponse: {}, // 消息发送结果回执
		receiveApplyJoinGroupApproval:[],// 入群通知列表
		friendInvitiaon: [], // 好友事件本地存储
		newFriendInvitiaon: 0, // 待处理的好友事件数量
		newReceiveApplyJoinGroupApproval:0,//待处理的入群申请
	},
	mutations: { 
		login(state, val) { 
			// 这里不去登录接口获取用户资料并赋值，是因为信息同步是异步的，可能还没同步下来（官方答案）
			state.hasLogin = true;
			state.loginProvider = val; // 用户名
		},
		logout(state) {
			state.hasLogin = false
			state.loginProvider = ""
			state.openid = null
			state.avatar = "/static/img/face.jpg"
		},
		setOpenid(state, openid) {
			state.openid = openid
		},
		// 赋值登录名或唯一登录值
		setLoginProvider(state, val) {
			state.loginProvider = val
		},
		// 赋值昵称
		setNickname(state, val) {
			// console.log("setNickname：" + val);
			state.nickname = val
		},
		// 赋值性别
		setGender(state, val) {
			state.gender = val
		},
		// 赋值个人签名
		setSignature(state, val) {
			state.signature = val
		},
		// 赋值头像
		setAvatar(state, val) {
			state.avatar = val
		},
		// 赋值接收到的消息
		setReceiveMessage(state, param) {
			state.receiveMessage = param;
		},
		// 用户登录状态
		setLoginStateChanged(state, param) {
			state.loginStateChanged = param;
		},
		// 消息发送结果回执
		setSendMessageResponse(state, param) {
			state.sendMessageResponse = param;
		},
		// 新增好友消息事件
		addFriendInvitiaonChange(state, param) {
			state.newFriendInvitiaon++;
			var items = state.friendInvitiaon;
			items.unshift(param); // 保存在缓存中,此处应该配合API存在服务器上
			items = imUtils.combineObjectInList(items,"fromUsername");// 数组去除重复，item为重复判定项
			state.friendInvitiaon = items;	// 去重,重新赋值
		},
		setNewFriendInvitiaon(state, num) {
			state.newFriendInvitiaon = num; // 设置需要处理的好友数量
		},
		setFriendInvitiaon(state, param) {
			state.friendInvitiaon = param;
			state.newFriendInvitiaon = param.length;
		},
		// 新增入群消息事件
		addReceiveApplyJoinGroupApproval(state, param) {
			state.newReceiveApplyJoinGroupApproval++;
			var items = state.receiveApplyJoinGroupApproval;
			items.unshift(param); // 保存在缓存中,此处应该配合API存在服务器上
			state.receiveApplyJoinGroupApproval = items;// 重新赋值
		},
		setReceiveApplyJoinGroupApproval(state, param) {
			state.receiveApplyJoinGroupApproval = param;
			state.newReceiveApplyJoinGroupApproval = param.length;
		},
		
	},
	actions: {
		// 提交聊天文字信息
		submitChatMsg: async function({
			commit,
			state,
			rootState
		}, params) {
			return await new Promise((resolve, reject) => {
				if (!state.hasLogin) {
					reject("请先登录")
				} else {
					switch (params.msgType) {
						case "text":
							// 文本消息
							delete(params["msgType"]);
							jpushIM.sendTextMessage(params, (res) => {
								if (res.errorCode == 0) {
									uni.showModal({
										title: '发送消息返回',
										content: '',
										showCancel: false,
										cancelText: '',
										confirmText: '',
										success: res => {},
										fail: () => {},
										complete: () => {}
									});
									resolve(res.data);
								} else {
									reject(res.errorMsg);
								}
							})
							break;
						case "image":
							// 图片消息
							// 将本地URL路径转换成绝对路径
							params.path = plus.io.convertLocalFileSystemURL(params.path);
							delete(params["msgType"]);
							jpushIM.sendImageMessage(params, (res) => {
								if (res.errorCode == 0) {
									resolve(res.data);
								} else {
									reject(res.errorMsg);
								}
							});
							break;
						case "voice":
							// 语音消息
							params.path = plus.io.convertLocalFileSystemURL(params.path);
							delete(params["msgType"]);
							// console.log("JMessagePlugin 发送语音消息:" + JSON.stringify(params));
							jpushIM.sendVoiceMessage(params, (res) => {
								if (res.errorCode == 0) {
									resolve(res.data);
								} else {
									reject(res.errorMsg);
								}
							});
							break;
						default:
							break;
					}

				}
			})
		},
		// 获取当前IM用户信息是否存在，存在则登录commit, state,rootState
		// 不用传参
		checkCurrentIMUser: async function({
			dispatch,
			commit
		}, params) {
			return await new Promise((resolve, reject) => {
				jpushIM.getMyInfo((res) => {
					if (res.errorCode == 0) {
						var data = res.data;
						commit('setLoginProvider', data.username);
						commit('setNickname', data.nickname);
						commit('setGender', data.gender);
						commit('setSignature', data.signature);
						commit('setAvatar', data.avatar);
						resolve(data);
					} else {
						reject(res.errorMsg);
					}
				})
			})
		},
		/**
		 * 更新我的头像
		 * @param {object} params = {
		 *  imgPath: string // 相册/拍照后的图片路径。
		 * }
		 * @param {function} callback = function ({'errorCode': '错误码', 'errorMsg': '错误信息',data:null}) {}
		 */
		updateMyAvatar: async function({
			commit,
			state,
			rootState
		}, params) {
			return await new Promise((resolve, reject) => {
				var origin = params.imgPath;
				if (origin) {
					// 将本地URL路径转换成平台绝对路径
					params.imgPath = plus.io.convertLocalFileSystemURL(params.imgPath);
				}
				jpushIM.updateMyAvatar(params, (res) => {
					if (res.errorCode == 0) {
						// var path = plus.io.convertAbsoluteFileSystem(params.imgPath);
						commit('setAvatar', origin);
						resolve(res);
					} else {
						reject(res.errorMsg);
					}
				})
			})
		},
	}
})

export default store
