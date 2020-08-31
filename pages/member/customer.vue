<template>
	<view style="height: 100vh;text-align: center;">
		<image @click="saveImg" mode="aspectFit" style="margin-top: 80upx" :src="image"></image>
		<view style="font-size: 28upx;color: #e10a07;margin-top: 40upx" v-if="isWeiXin">{{ isWeiXin ? '长按识别上方二维码' : '' }}</view>
		<view style="font-size: 32upx;margin-top: 20upx;color: #e10a07">【微信号: ucb888 】</view>
		<view @click="copyHref" style="width:200upx;margin-top: 12upx;font-size: 24upx;margin-left: 36%;color: #FFFFFF;background: #e10a07;padding: 4upx 20upx;border-radius: 24upx;">一键复制</view>
		
		<view style="font-size: 32upx;margin-top: 20upx;color: #e10a07">添加【客服微信】咨询</view>
		<view v-if="isWeiXin" style="font-size: 24upx;color: #e10a07;margin-top: 80upx" @click="rests">无法识别？</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			image: 'http://ucb.qdfqxx.com/custom.jpg',
			isWeiXin: false,
			weixin: 'wxid_m5qlhefiqjbj22',
			webviewStyles: {
				progress: {
					color: '#e10a07'
				}
			}
		};
	},
	onLoad() {
		// #ifdef H5
		let ua = navigator.userAgent.toLowerCase();
		if (ua.indexOf('micromessenger') !== -1) {
			this.isWeiXin = true;
		}
		// #endif
		//获取客服二维码
		this.$Request.getT('/common/type/1').then(res => {
			if (res.status == 0) {
				if (res.data && res.data.value) {
					this.image = res.data.value;
				}
				// uni.navigateBack();
			}
		});
		this.$Request.getT('/common/type/44').then(res => {
			if (res.status == 0) {
				if (res.data && res.data.value) {
					this.weixin = res.data.value;
				}
			}
		});
	},
	onPullDownRefresh: function() {
		uni.stopPullDownRefresh(); // 停止刷新
	},
	methods: {
		//邀请码复制
		copyHref() {
			uni.setClipboardData({
				data: this.weixin,
				success: r => {
					this.$queue.showToast('复制成功');
				}
			});
		},
		saveImg() {
			let that = this;
			uni.saveImageToPhotosAlbum({
				filePath: that.image,
				success(res) {
					that.$queue.showToast('保存成功');
				}
			});
		},
		rests() {
			uni.showToast({
				title: '已刷新请再次长按识别',
				mask: false,
				duration: 1500,
				icon: 'none'
			});
			window.location.reload();
		}
	}
};
</script>

<style scoped>
@import '../../static/css/index.css';
</style>
