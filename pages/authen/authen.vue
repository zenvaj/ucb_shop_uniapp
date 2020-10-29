<template>
	<view class="uni-flex uni-center uni-column">
		<view class="title-font">身份证 正面</view>
		<view><image v-bind:src="uidzm == '' ? '../../static/img/smrz-04.png' : uidzm" @click="inter('uidzm')"></image></view>
		<view class="title-font">身份证 反面</view>
		<view><image v-bind:src="uidfm == '' ? '../../static/img/smrz-05.png' : uidfm" @click="inter('uidfm')"></image></view>
		<view class="title-font">手持身份证</view>
		<view><image v-bind:src="uidpm == '' ? '../../static/img/smrz-10.png' : uidpm" @click="inter('uidpm')"></image></view>
		<!-- <view>姓名 :{{ name }}</view> -->
		<!-- <view>身份证号:{{ uid }}</view> -->
		<view class="idcard idcard-first">
			<view class="idcard-title">姓名：</view>
			<input class="idcard-inp" type="text" maxlength="30" v-model="name" :placeholder="'姓名'" :placeholder-class="'inp-place'" />
		</view>
		<view class="idcard">
			<view class="idcard-title">身份证号：</view>
			<input class="idcard-inp" type="idcard" v-model="uid" :placeholder="'证件号码'" :placeholder-class="'inp-place'" />
		</view>

		<button class="confirm" @click="confirm">确认</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			uidzm: '',
			uidfm: '',
			uidpm: '',
			uidx: '',
			name: '',
			uid: '',
			renlian: '',
			address: ''
		};
	},
	onLoad() {
		
	},
	methods: {
		inter(inx) {
			console.log(inx);
			const _self = this;
			const PPOCR = uni.requireNativePlugin('PP-BaiduOCR');
			if (inx == 'uidzm') {
				PPOCR.IDFront({ auto: true }, result => {
					// console.log(result);
					// "gender":"男","address":"山东省即墨市店集镇王家马坪村385号","ethnic":"壮","name":"姜振华","birthday":"19880428","idNumber":"370282198804283217"
					this.name = result.data.name;
					this.uid = result.data.idNumber;
					this.address = result.data.address;
					if (result.imgbase64) {
						_self.bitmapsave(result.imgbase64, 'uidzm');
					}
				});
			} else if (inx == 'uidfm') {
				console.log('aaa');
				PPOCR.IDBack({ auto: false }, result => {
					// console.log(result);
					// "data":{"signDate":"20140220","expiryDate":"20240220","issueAuthority":"即墨市公安局"}
					if (result.imgbase64) {
						_self.bitmapsave(result.imgbase64, 'uidfm');
					}
				});
			} else if (inx == 'uidpm') {
				//手持身份证
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					// sourceType: ['album'], //从相册选择
					success: async res => {
						let path = res.tempFilePaths.shift();
						var imgData = await this.p2B64(path);
						_self.bitmapsave(imgData, 'uidpm');
					}
				});
			}
		},

		bitmapsave(basedata, type) {
			//console.log(basedata);
			let _self = this;
			var bitmap = new plus.nativeObj.Bitmap('test');
			this.$Request
				.postP('/files/uploadImgBase64', {
					image_base64: 'data:image/png;base64,' + basedata //result.imgbase64
				})
				.then(res => {
					console.log(res);
					if ((res.status = 10000)) {
						if (type == 'uidzm') {
							_self.uidzm = res.data.img_path;
						} else if (type == 'uidfm') {
							_self.uidfm = res.data.img_path;
						} else if (type == 'uidpm') {
							_self.uidpm = res.data.img_path;
						}
					}
				});

			bitmap.loadBase64Data(
				basedata,
				function(e) {
					bitmap.save('_doc/_tmp/ocr' + new Date().getTime() + '.png', {}, function(e) {
						console.log(e);
						_self.logoSrcs = e.target;
					});
				},
				function() {
					console.log('加载Base64图片数据失败：' + JSON.stringify(e));
				}
			);
		},

		confirm(e) {
			console.log(e);
			if (this.uidzm == '') {
				uni.showToast({
					title: '请先上传身份证正面',
					icon: 'none'
				});
				return false;
			} else if (this.uidfm == '') {
				uni.showToast({
					title: '请先上传身份证反面',
					icon: 'none'
				});
				return false;
			} else if (this.uidpm == '') {
				uni.showToast({
					title: '请先上传手持身份证',
					icon: 'none'
				});
				return false;
			} else {
				this.$Request
					.postP('/user/auth', {
						idCardPicFront: this.uidzm,
						idCardPicBack: this.uidfm,
						idCardPicHand: this.uidpm,
						idCard: this.uid,
						realName: this.name,
						addr: this.address
					})
					.then(res => {
						console.log(res);
						if ((res.status == 10000)) {
							uni.showToast({
								title: '认证成功',
								icon: 'none'
							});
							//判断是否输入结算卡 有结算卡就返回 没用结算卡先去添加结算卡 
							this.$queue.setData('auth', 1); 
							this.$queue.setData('idcard', res.data.idcard);
							this.$queue.setData('realName', res.data.real_name); 
							
							uni.showLoading({
								title:"结算卡验证..."
							})
							this.$Request.postP('/bank/bag',{
								"type": "cxk"
							}).then(res => {
								console.log(res.data);
								uni.hideLoading();
								if (!res.data || res.data.length == 0) {
									uni.redirectTo({
										url: '/pages/member/cxkAdd'
									})
								}
								uni.navigateBack()
							});
							
						}else{
							uni.showToast({
								title: res.msg,
								icon: 'none'
							});
						}
					});
			}
		},
		//此处列出图片转base64的转换函数，使用中遇到了很多坑。
		//本地图片路径转换base64
		p2B64(path) {
			console.log('path:', path);
			return new Promise(function(resolve, reject) {
				//#ifdef MP-WEIXIN
				uni.getFileSystemManager().readFile({
					filePath: path,
					encoding: 'base64',
					success: function(res) {
						resolve(res.data);
					},
					fail: function(error) {
						reject(error);
					}
				});
				// #endif
				//#ifdef APP-PLUS
				plus.io.resolveLocalFileSystemURL(path, function(entry) {
					entry.file(
						function(file) {
							var reader = new plus.io.FileReader();
							reader.onloadend = function(e) {
								var base64 = e.target.result;
								resolve(base64.split(',')[1]);
							};
							reader.readAsDataURL(file);
						},
						function(e) {
							console.log('读写出现异常: ' + e.message);
							reject(e);
						}
					);
				});
				//#endif
				//#ifdef H5
				var imgFile = new FileReader();
				console.log('path:', path);
				imgFile.readAsDataURL(path);
				imgFile.onload = function() {
					var imgData = this.result; //base64数据
					console.log(imgData);
					resolve(imgData);
				};
				//#endif
				return;
			});
		}
	}
};
</script>

<style lang="scss">
image {
	width: 500rpx;
	height: 275rpx;
}
.title-font {
	font-size: 30rpx;
	font-weight: bolder;
}
.idcard-first {
	margin-top: 20px;
}
.idcard {
	display: flex;
	flex-flow: row nowrap;
	justify-content: flex-start;
	align-items: center;
	padding: 10px 20px;
	.idcard-title {
		font-size: 30rpx;
		font-weight: bolder;
	}
	.idcard-inp {
		flex: 1;
		border-bottom: 2rpx solid #000000;
		text-align: left;
		font-size: 30rpx;
		font-weight: bolder;
	}
	.inp-place {
		font-size: 30rpx;
		color: #949696;
	}
}
.confirm {
	width: 90%;
	margin-bottom: 20px;
	background-color: #1989fa;
	opacity: 0.9;
	color: #ffffff;
	&:active {
		background-color: #1989fa;
		opacity: 1;
	}
}
</style>
