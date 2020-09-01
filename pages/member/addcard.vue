<template> 
	<view>
		<view class=" uni-flex uni-center">
			<view style="width: 96%; text-align: left;">
				<view class=" uni-flex uni-center" style="margin: auto;" ><image style="margin: auto;"  v-bind:src="setcardp == '' ? '../../static/img/smrz-08x.png' : setcardp" @click="inter"></image></view>
 
				<!-- <view class="uni-common-mt" style="background:#FFF; padding:20rpx;">
					<rich-text :nodes="strings"></rich-text>
				</view> --> 
				
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">真实姓名</view>
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
						<view class="uni-list-cell-db"><input v-model="card_no" type="number" maxlength="17" placeholder="信用卡卡号" /></view>
					</view>
				</view>

				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">CVN2</view>
						<view class="uni-list-cell-db"><input v-model="card_cvv2" type="number" maxlength="3" placeholder="信用卡背面3位CVN2" /></view>
					</view>
				</view>

				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">有效期</view>
						<view class="uni-list-cell-db">
							<view class="value">
								<biaofun-datetime-picker
									placeholder="有效期（年月），例如：2201"
									:defaultValue="defaultValue"
									start="2000-02"
									end="2100-10"
									fields="month"
									@change="changeDatetimePicker"
								></biaofun-datetime-picker> 
							</view>
							<!-- <input v-model="card_exp" type="number" maxlength="4" placeholder="有效期（年月），例如：2201" /> -->
							</view>
					</view>
				</view>

				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">发卡行</view>
						<view class="uni-list-cell-db">
							<view  @tap="handleTap('picker2')">{{ value2 }}</view>
							<lb-picker ref="picker2"
							  v-model="value2"
							  mode="selector"
							  :list="bank"
							  @change="handleChange"
							  @confirm="handleConfirm"
							  @cancel="handleCancel">
							</lb-picker>
							<!-- <picker @change="bindPickerChange" :value="index" :range="bank" :range-key="'bank_name'">
								<view class="uni-input">{{ bank[index].bank_name }}</view>
							</picker> --> 
						</view>
					</view>
				</view>
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">卡片额度</view>
						<view class="uni-list-cell-db"><input v-model="card_quota" type="number" placeholder="信用卡额度" /></view>
					</view>
				</view>
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">账单日</view>
						<view class="uni-list-cell-db"><input v-model="card_billdate" type="number" maxlength="2" placeholder="请输入两位日期数字，例如：01" /></view>
					</view>
				</view>
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">还款日</view>
						<view class="uni-list-cell-db"><input v-model="card_repaydate" type="number" maxlength="2" placeholder="请输入两位日期数字，例如：01" /></view>
					</view>
				</view>
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">手机号</view>
						<view class="uni-list-cell-db"><input v-model="card_phone" type="number" maxlength="11" placeholder="银行预留手机号" /></view>
					</view>
				</view>
				<!-- <view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">验证码</view>
						<view class="uni-list-cell-db">
							<wInput v-model="sms_code" type="number" maxlength="8" placeholder="验证码" isShowCode ref="runCode" @setCode="getVerCode()"></wInput>
						</view>
					</view>
				</view> -->

				<view class="uni-title uni-flex uni-row">  
					<checkbox class='round'  :class="checked?'checked':''"  style="margin-right: 30rpx; padding-left: 30rpx;"  @click="checkboxChange"  value="A" :checked="checked?true:false">
						同意
					</checkbox>
					<navigator url="yonghuxieyi">《优财宝用户服务协议》</navigator>
				</view>
				<view class="uni-title uni-common-pl" style="color:#FF3333;">请确保输入的信息真实有效，信息错误将导致还款失败。</view>
				<view><button type="primary" @click="bd_bankcards">确认绑卡</button></view>
			</view>
		</view>
	</view>
</template>

<script>
	import utils from '@/common/js/utils.js'; // 封装的工具集
	import LbPicker from '@/components/lb-picker'
import biaofunDatetimePicker from '@/components/biaofun-datetime-picker/biaofun-datetime-picker.vue';
export default {
	/**
	 * 页面用到的组件
	 */
	components: {
		biaofunDatetimePicker,
		 LbPicker
	},
	data() {
		return {
			setcardp:'',
			logoSrcs: '/static/logo.png',
			cb: '',
			checked: true,
			card_name: '',
			card_idno: '',
			card_no: '',
			card_cvv2: '',
			card_exp: '',
			card_bank: '',
			card_quota: '',
			card_billdate: '',
			card_repaydate: '',
			card_phone: '',
			sms_code: '', //验证码
			index: 0,
			bank: [],
			card_id: '',
			trade_id: '',
			request_id: '',
			strings:"",
			value2:'请选择银行名称',
			defaultValue:''
		};
	},
	// computed: {
	// 	...mapState(['hasLogin', 'userInfo'])
	// },
	onLoad(e) {
		var date = new Date();
		this.defaultValue = utils.formatDate(date).f3;//   date.toLocaleString( ); //获取日期与时间
		console.log(this.defaultValue);
		this.$Request.postP('/bank/allow', {}).then(res => {
			// res.unshift({"id": 0,"value": "请选择银行", "label": "请选择银行","bank_name": "请选择银行","bank_code": "CAAA","icon": null,"sort": 1});
			this.bank = res; 
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
		
		// this.strings = "";
		// this.$Request.postP('/trade',{
		// 		    "type": "快捷"
		// }).then(res => {
		// 	console.log(res);
		// 	 this.strings =res.data[0].des;
		// });
		
		
		 
		// this.trade_id = e.trade_id;
		// const value = this.userInfo;
		// this.card_name = value.name;
		// this.card_idno = value.usernumber;
	},
	methods: {
		handleTap (name) {
			this.$refs[name].show()
		},
		handleChange (item) { 
			console.log('change::', item)
		},
		handleConfirm(item) { 
			console.log('confirm::', item)
		},
		handleCancel (item) { 
			console.log('cancel::', item) 
		},
		/**
		 * 确认选择日期时间
		 * @param {Object} date 日期数据
		 */
		changeDatetimePicker(date) {
			this.card_exp = date.f7;
			console.log('选择的日期时间数据：', date);
		},
		inter() {
			const _self = this; 
			const PPOCR = uni.requireNativePlugin('PP-BaiduOCR');  
			PPOCR.CustomOrder({ "order": 111 }, result => {
				//console.log(result);
				if(result.data.result){
					console.log(result.data);
					_self.card_no = result.data.result.bank_card_number.replace(/\s+/g,"");
				}else if(result.msg){
					console.log(result.msg);
					var dataRead = result.msg.split('\n');
					console.log(dataRead);//：
					var card_no_tmp = dataRead.some((item,i)=>{
						var info_tmp = item.split('：');
						console.log(info_tmp);
						if(info_tmp[0] == '卡号'){
							_self.card_no = info_tmp[1].replace(/\s+/g,"");
						}
					})
					
					//_self.card_no = result.data.result.bank_card_number.replace(/\s+/g,"");
				}
				//_self.card_no = result.data.result.bank_card_number.replace(/\s+/g,"");
				if (result.imgbase64) {
					_self.bitmapsave(result.imgbase64, 'setcardp');
				}
			});
		}, 
		bitmapsave(basedata,type) {
			let _self = this; 
			var bitmap = new plus.nativeObj.Bitmap("test");
			_self.$Request.postP('/files/uploadImgBase64',{
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
					_self.logoSrcs = e.target; 
				});
			}, function() {
				console.log('加载Base64图片数据失败：' + JSON.stringify(e));
			});
		},
		
		checkboxChange() {
			console.log("aaa");
			this.checked = !this.checked;
		},
 
		getVerCode() {
			var title = '';
			//获取验证码
			if (this.card_phone.length != 11) {
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '手机号不正确'
				});
				return false;
			}
			if (this.card_cvv2.length != 3) {
				title += 'CVN2是三位数字，请检查修改！ ';
			}
			if (this.card_exp.length != 4) {
				title += '有效期是四位数字，请检查修改！ ';
			}
			if (this.index == 0) {
				title += '请选择银行名称！ ';
			}
			if (this.card_quota == '') {
				title += '请填写信用卡额度！  ';
			}
			if (this.card_billdate.length != 2) {
				title += '账单日是两位数字，请检查修改！';
			}
			if (this.card_repaydate.length != 2) {
				title += '还款日是两位数字，请检查修改！';
			}
			console.log(title);
			if (title != '') {
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: title
				});
				return false;
			} else {
				const value = this.userInfo;
				uni.request({
					url: this.$store.state.RepApiUrl,
					method: 'POST',
					data: {
						methods: 'Fun.bdredit',
						telphone: value.username,
						password: value.api_key,
						card_bank: this.card_bank,
						card_exp: this.card_exp,
						card_cvv2: this.card_cvv2,
						card_no: this.card_no,
						card_name: this.card_name,
						card_idno: this.card_idno,
						card_phone: this.card_phone,
						card_quota: this.card_quota,
						card_billdate: this.card_billdate,
						card_repaydate: this.card_repaydate,
						trade_id:this.trade_id
					},
					header: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' },
					success: res => {
						if (res.data.ret_code == '100000') {
							this.card_id = res.data.card_id;
							this.request_id = res.data.request_id;
							this.$refs.runCode.$emit('runCode'); //触发倒计时（一般用于请求成功验证码后调用）
						} else {
							uni.showToast({
								title: res.data.ret_msg,
								icon: 'none'
							});
						}
						// this.index = this.getindex(this.bank, res.data.card_bank);
						console.log(res);
					},
					fail: () => {},
					complete: () => {}
				});
			}

			console.log('获取验证码');
		},
		getindex(arr, obj) {
			console.log(arr);
			console.log(obj);
			var i = arr.length;
			while (i--) {
				if (arr[i] === obj) {
					return i;
				}
			}
			return -1;
		},
		bindPickerChange: function(e) {
			console.log('picker发送选择改变，携带值为：' + e.target.value);
			this.index = e.target.value;
		},
		bd_bankcards() {
			var title = '';
			if (!this.checked) {
				uni.showToast({
					title: '请同意 《优财宝用户服务协议》 ',
					icon: 'none'
				});
				return false;
			}

			//获取验证码
			if (this.card_phone.length != 11) {
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '手机号不正确'
				});
				return false;
			}
			if (this.card_cvv2.length != 3) {
				title += 'CVN2是三位数字，请检查修改！ ';
			}
			// console.log(this.card_exp);
			if (this.card_exp.length < 4) {
				title += '请选择有效期，请检查修改！ ';
			}
			if (this.value2 == '0') {
				title += '请选择银行名称！ ';
			}
			if (this.card_quota == '') {
				title += '请填写信用卡额度！  ';
			}
			if (this.card_billdate.length != 2) {
				title += '账单日是两位数字，请检查修改！';
			}
			if (this.card_repaydate.length != 2) {
				title += '还款日是两位数字，请检查修改！';
			}
			console.log(title);
			if (title != '') {
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: title
				});
				return false;
			} else {
				
			}
			
			uni.showModal({
				title: '提示',
				content: '请确保输入的信息真实有效， \n\r 信息错误将导致还款失败。',
				success: res => {
					if (res.confirm) {
						// console.log("confirm"+this.value2);
						this.$Request
							.postP('/bank/add', {
								type: 'xyk',
								bankname: this.value2,
								banknumber: this.card_no,
								mobile: this.card_phone,
								idcard: this.card_idno,
								username: this.card_name,
								cvv2_or_: this.card_cvv2,
								exp_or_: this.card_exp,
								bankpic: this.setcardp,
								money_or_: this.card_quota,
								daymark_or_: this.card_billdate,
								dayjob_or_: this.card_repaydate
							})
							.then(res => {
								console.log(res);
								if (res.status === 10000) {
									uni.showToast({
										title: '绑卡成功！',
										icon: 'none'
									});
								}else{
									uni.showToast({
										title: res.msg,
										icon: 'none'
									});
								}
							}); 
					} else if (res.cancel) {
					}
				},
				fail: () => {},
				complete: () => {}
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
