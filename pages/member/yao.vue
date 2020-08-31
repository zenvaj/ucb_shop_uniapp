<template>
	<view style="text-align: center;background: white;height: 100%;position: absolute;width: 100%">
		<view style="padding: 42upx;background: #e10a07;">
			<view style="font-size: 32upx;color: #FFFFFF;margin-bottom: 32upx">我的等级</view>
			<text class="num" style="font-size: 32upx;color: #FFFFFF;margin-bottom: 10px">
				<text style="font-size: 30upx;margin-right:10upx;">VIP</text>
				<text style="font-size: 50upx;font-weight: bold;">{{ dengji }}</text>
			</text>
			<view style="font-size: 28upx;margin-top: 32upx;color: #FFFFFF;">{{ dengjides }}</view>
		</view>
		<view style="text-align: left;color: #333333;font-size: 28upx;padding: 32upx;">
			<view style="font-size: 32upx;font-weight: bold;margin-bottom: 16upx;">邀请规则</view>
			<view>1、每成功邀请{{ invitatioNum }}位好友提升1级，最高10级每级对应相应的返现比例</view>
			<view style="margin-top: 8upx">2、邀请成功可享受终身粉丝佣金{{ teamMoney }}%提成</view>
			<view style="font-size: 32upx;font-weight: bold;margin-bottom: 16upx;margin-top: 16upx;">邀请方式</view>
			<view>1、点击下方【生成邀请海报】选择任意免单商品生成海报，将海报分享好友、群或朋友圈，让好友扫码即可升级</view>
			<view style="margin-top: 8upx;">2、点击下方【分享邀请链接】生成专属推广链接，分享好友、群，让好友注册即可升级</view>
		</view>
		<view
			@click="productHaibao()"
			style="margin-top:16upx;margin-left: 40px;margin-right:40px;font-size: 32upx;background: #e10a07;color: white;border-radius: 10px;height: 40px;line-height: 40px"
		>
			生成邀请海报
		</view>
		<!-- #ifdef H5 -->
		<view
			@click="share()"
			style="margin-top:32upx;margin-left: 40px;margin-right:40px;font-size: 32upx;background: #e10a07;color: white;border-radius: 10px;height: 40px;line-height: 40px"
		>
			分享邀请链接
		</view>
		<!-- #endif -->
		<!-- #ifdef APP-PLUS -->
		<view
			@click="shareWeiXin()"
			style="margin-top:32upx;margin-left: 40px;margin-right:40px;font-size: 32upx;background: #e10a07;color: white;border-radius: 10px;height: 40px;line-height: 40px"
		>
			分享邀请链接
		</view>
		<!-- #endif -->
	</view>
</template>
<script>
import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue';
import appShare from '@/utils/share.js';
export default {
	components: {
		tkiQrcode
	},
	data() {
		return {
			modalName: '',
			totalMoney: '0',
			dengji: 0,
			itemendprice: '识别二维码免费领取',
			tuiguang:
				'给你说个 买东西省钱工具叫优财宝！\n买东西能货比三家买不了吃亏买不了上当\n我用好久了买东西不但能领券还能返现！\n这一年半载我都省下一大半了！\n点链接可以看看\n',
				// '给你说个京东、淘宝、拼多多买东西省钱工具叫优财宝！\n买东西能货比三家买不了吃亏买不了上当\n我用好久了买东西不但能领券还能返现！\n这一年半载我都省下一大半了！\n点链接可以看看\n',
			itemtitle: '',
			relationId: '',
			itemprice: '',
			erweima: '',
			itempic: '',
			teamMoney: '20',
			url: '',
			invitatioNum: 2,
			dengjides: '生成海报'
		};
	},
	onLoad() {
		let number = this.$queue.invitaionNum();
		this.teamMoney = parseFloat(this.$queue.teamMoney()) * 100;
		this.invitatioNum = parseInt(number) / 10;
	},
	onShow() {
		let relationId = this.$queue.getData('relation_id');
		if (relationId) {
			this.relationId = relationId;

			// #ifndef H5
			this.url = this.$queue.publicYuMing() + '/pages/member/download?relationId=' + this.$queue.getData('relation_id');
			//#endif
			// // #ifndef APP-PLUS
			// this.url = '/pages/member/download?relationId=' + this.$queue.getData('relation_id');
			// //#endif
			
			// #ifdef H5
			this.url = this.$queue.publicYuMing() + '/?invitation=' + relationId;
			//#endif
		}
		let userId = this.$queue.getData('userId');
		if (userId) {
			this.getUserInfo(userId);
		}
	},
	methods: {
		productHaibao() {
			uni.navigateTo({
				url: '/pages/share/product'
			});
		},
		yaoqing() {
			uni.navigateTo({
				url: '/pages/member/yaoqing'
			});
		},
		hideModal() {
			this.modalName = null;
		},

		shareWeiXin() {
			this.$Request.getT('/jd/sortUrl?sortUrl=' + this.url).then(res => {
				console.log(this.url);
				console.log(res);
				if (res) {
	
					let shareData = {
						shareUrl: res.url,
						shareTitle: '邀请你加入优财宝！先领券，再购物，更划算！',
						shareContent: '复制宝贝标题，在优财宝搜索就可以领高额优惠券啦！',
						shareImg: this.$queue.publicYuMing() + '/logo.png',
						type: 0
					};
					console.log(shareData);
					appShare(shareData, res => {
						console.log('分享成功回调', res);
					});
				} else {
					let shareData = {
						shareUrl: this.url,
						shareTitle: '邀请你加入优财宝！先领券，再购物，更划算！',
						shareContent: '复制宝贝标题，在优财宝搜索就可以领高额优惠券啦！',
						shareImg: this.$queue.publicYuMing() + '/logo.png',//http://www.qdyykj.cn/logo.png
						// shareImg: 'http://www.qdyykj.cn/logo.png',
						type: 0
					};
					appShare(shareData, res => {
						console.log('分享成功回调', res);
					});
				}
			});
		},
		share() {
			this.sharurl();
		},
		getUserInfo(userId) {
			this.$Request.getT('/user/' + userId).then(res => {
				if (res.status === 0) {
					if (res.data.gradeDes) {
						this.dengji = res.data.gradeIndex;
					} else {
						this.dengji = 0;
					}
					if (res.data.gradeNumber) {
						if (res.data.gradeNumber == '还可邀请0人') {
							this.dengjides = '已到达最高等级';
						} else {
							this.dengjides = res.data.gradeNumber;
						}
					} else {
						this.dengjides = '还可邀请10人';
					}
				}
			});
		},
		sharurl() {
			let short_url = '';
			let url = '';
			this.$queue.showLoading('加载中...');

			this.$Request.getT('/jd/sortUrl?sortUrl=' + this.url).then(res => {
				uni.hideLoading();
				if (res) {
					short_url = res.url;
					uni.showModal({
						title: '链接推广',
						content: this.tuiguang + short_url,
						showCancel: true,
						cancelText: '关闭',
						confirmText: '一键复制',
						success: res => {
							if (res.confirm) {
								uni.setClipboardData({
									data: this.tuiguang + short_url,
									success: function() {
										console.log('success');
										this.$queue.showToast('复制成功');
									}
								});
							}
						}
					});
				} else {
					uni.showToast({
						icon: 'none',
						title: '请求超时请稍后重试'
					});
				}
			});
		},
		getMoney() {
			let that = this;
			let relationId = this.$queue.getData('relation_id');
			if (relationId) {
				this.$Request.getT('/user/getCount?invitation=' + relationId).then(res => {
					if (res.status === 0 && res.data) {
						that.totalMoney = res.data;
					} else if (res.status === -102) {
						this.$queue.showToast(res.msg);
						this.$queue.logout();
						uni.navigateTo({
							url: '/pages/public/login'
						});
					} else {
						that.totalMoney = '0';
					}
				});
			}
		},
		getOut() {
			let that = this;
			let relationId = this.$queue.getData('relation_id');
			if (relationId) {
				if (this.totalMoney > 2) {
					that.$queue.showLoading('结算中...');
					this.$Request.getT('/user/getCash?invitation=' + relationId).then(res => {
						if (res.status === 0 && res.data) {
							uni.showModal({
								showCancel: false,
								title: '结算成功',
								content: '请返回【我的】点击【立即提现】'
							});
							that.getMoney();
						}
						uni.hideLoading();
					});
				} else {
					uni.showModal({
						showCancel: false,
						title: '结算提醒',
						content: '邀请必须够3人才可申请结算'
					});
				}
			} else {
				uni.navigateTo({
					url: '/pages/public/login'
				});
			}
		}
	}
};
</script>

<style lang="scss">
@import '../../static/css/index.css';
</style>
