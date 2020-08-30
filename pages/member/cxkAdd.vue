<template>
	<view>
		<view class=" uni-center">
			<view><image v-bind:src="setcardp == '' ? '../../static/img/smrz-08.png' : setcardp" @click="inter"></image></view>
			<view style="width: 96%; text-align: left; margin: auto;">
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">姓名</view>
						<view class="uni-list-cell-db"><input v-model="card_name" type="text" placeholder="请输入本人真实姓名" disabled="true" /></view>
					</view>
				</view>
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">身份证</view>
						<view class="uni-list-cell-db"><input v-model="card_idno" placeholder="请输入本人身份证号" disabled="true" /></view>
					</view>
				</view>

				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">卡号</view>
						<view class="uni-list-cell-db"><input v-model="card_no" type="number" maxlength="20" placeholder="信用卡卡号" /></view>
					</view>
				</view>

				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">确认卡号</view>
						<view class="uni-list-cell-db"><input v-model="card_qno" type="number" maxlength="20" placeholder="信用卡卡号" /></view>
					</view>
				</view>

				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">发卡行</view>
						<view class="uni-list-cell-db">
							<picker @change="bindPickerChange" :value="index" :range="bank" :range-key="'bank_name'">
								<view class="uni-input">{{ bank[index].bank_name }}</view>
							</picker>
						</view>
					</view>
				</view>

				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">手机号</view>
						<view class="uni-list-cell-db"><input v-model="card_phone" type="number" maxlength="11" placeholder="银行预留手机号" /></view>
					</view>
				</view>
				<view class="uni-title uni-common-pl" style="color:#FF3333;">请确保输入的信息真实有效，信息错误将导致还款失败。注：如出现拍照闪退等异常请联系客服</view>
				<view><button type="primary" @click="bd_bankcards">确认绑卡</button></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			bank_card_type: '',
			tempFilePath: '',
			cropFilePath: '',
			card_name: '',
			card_idno: '',
			card_no: '',
			card_qno: '',
			card_phone: '',
			setcardp: '',
			index: 0,
			bank: []
		};
	},
	onLoad() {
		this.$Request.postP('/bank/allow', {}).then(res => {
			console.log(res); 
			res.unshift({"id": 0,"bank_name": "请选择银行","bank_code": "CAAA","icon": null,"sort": 1});
			this.bank = res;
			console.log(this.bank);
		});
		let auth = this.$queue.getData('auth');
		console.log(auth);
		if(auth!=1){
		uni.navigateTo({
			url: '/pages/public/login' 
		});
		}
		this.card_idno = this.$queue.getData('idcard'); 
		this.card_name = this.$queue.getData('realName'); 
	},
	methods: {
		inter(inx) {
			console.log(inx);
			const _self = this;
			const PPOCR = uni.requireNativePlugin('PP-BaiduOCR');
			
			PPOCR.CustomOrder({ "order": 111 }, result => {
				// console.log(result);
				// {"bank_card_type":2,"bank_name":"招商银行","valid_date":"09/20","bank_card_number":"6225 7680 5609 0401"}
				// {"bank_card_type":1,"bank_name":"中国银行","valid_date":"NO VALID","bank_card_number":"621785 6084046243838"}
				this.card_no = result.data.result.bank_card_number.replace(/\s+/g,"");
				if (result.imgbase64) {
					_self.bitmapsave(result.imgbase64, 'setcardp');
				}
			});
			
			 
		},
		bitmapsave(basedata,type) { 
			let _self = this; 
			var bitmap = new plus.nativeObj.Bitmap("test");
			this.$Request.postP('/files/uploadImgBase64',{
					"image_base64":  "data:image/png;base64,"+basedata//result.imgbase64
			}).then(res => {
				console.log(res);
				if(res.status = 10000){
					if(type =='setcardp' ){
						_self.setcardp = res.data.img_path;
					} 
				}
			});
			
			bitmap.loadBase64Data(basedata, function(e) {
				bitmap.save('_doc/_tmp/ocr' + new Date().getTime() + '.png', {}, function(e) {
					console.log(e);
					_self.logoSrcs = e.target; 
				});
			}, function() {
				console.log('加载Base64图片数据失败：' + JSON.stringify(e));
			});
		},
		bindPickerChange: function(e) {
			console.log('picker发送选择改变，携带值为：' + e.target.value);
			this.index = e.target.value;
		},
		bd_bankcards() {
			if (this.card_phone.length != 11) {
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '手机号不正确'
				});
				return false;
			}
			if (this.card_no != this.card_qno) {
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '两次银行卡输入不同！'
				});
				return false;
			}
			if (this.index == 0) {
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '请选择银行名称！'
				});
				return false;
			}

			this.$Request
				.postP('/bank/add', {
					type: 'cxk',
					bankname: this.bank[this.index],
					banknumber: this.card_qno,
					mobile: this.card_phone,
					idcard: this.card_idno,
					username: this.card_name,
					cvv2_or_: '',
					exp_or_: '',
					bankpic: this.setcardp
				})
				.then(res => {
					console.log(res);
					this.options = res.data;
					console.log(this.options);
				});
		}
	}
};
</script>

<style>
image {
	width: 600rpx;
	height: 375rpx;
}
.uni-list {
	margin-top: 10upx;
}
.uni-list-cell-left {
	line-height: 80upx;
}
.main-list {
	margin-top: 0upx;
	margin-bottom: 0upx;
}
</style>
