<template>
	<view class="content">
		<view class="navbar">
			<view v-for="(item, index) in tabList" :key="index" class="nav-item" :class="{ current: tabFromIndex === item.state }" @click="tabClicks(item.state)">
				{{ item.text }}
			</view>
		</view>
		<view v-for="(item, index) in list" :key="index" class="item">
			<view style="color: #333333;font-size: 32upx;width: 600upx;overflow: hidden;text-overflow: ellipsis;white-space:nowrap">{{ item.title }}</view>
			<view style="color: #666666;font-size: 28upx;margin-top: 10upx;">{{ item.content }}</view>

			<view style="margin-top: 10upx;color: #999999;font-size: 28upx;text-align: right;">{{ item.createAt }}</view>
		</view>
		<view v-if="list.length === 0" style="background: #FFFFFF;text-align: center;padding-top: 140upx">暂无消息</view>
	</view>
</template>

<script>
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
import empty from '@/components/empty';

export default {
	components: {
		uniLoadMore,
		empty
	},
	data() {
		return {
			tabFromIndex: 5,
			tabCurrentIndex: 0,
			fromInfo: 5,
			list: [],
			page: 0,
			scrollTop: false,
			tabList: [
				{
					state: 5,
					text: '用户消息',
					totalElements: 0
				},
				{
					state: 4,
					text: '订单消息',
					totalElements: 0
				},
				{
					state: 6,
					text: '测试消息',
					totalElements: 0
				}
			]
		};
	},
	onPageScroll: function(e) {
		this.scrollTop = e.scrollTop > 200;
	},
	onReachBottom: function() {
		this.page = this.page + 1;
		this.loadData();
	},
	onLoad(options) {
		this.$queue.showLoading("加载中...")
		this.loadData();
	},
	methods: {
		//顶部渠道点击
		tabClicks(index) {
			this.list = [];
			this.page = 0;
			this.tabFromIndex = index;
			this.$queue.showLoading("加载中...")
			this.loadData();
		},
		//获取消息列表
		loadData() {
			let that = this;
			let number = 10;
			let token = this.$queue.getData('token');
			if (token) {
				this.$Request
					.getT('/message/findType/' + this.$queue.getData('userId') + '/' + parseInt(this.tabFromIndex) + '/' + parseInt(this.page) + '/' + number)
					.then(res => {
						if (res.status === 0) {
							res.data.content.forEach(d => {
								this.list.push(d);
							});
						}
						uni.hideLoading();
					});
			}
		}
	}
};
</script>

<style lang="scss">
page,
page {
	background: #ffffff;
}
.content {
	background: #ffffff;
	height: 100%;
}

.swiper-box {
	height: calc(100% - 40px);
}

.list-scroll-content {
	height: 100%;
}

.navbar {
	display: flex;
	height: 40px;
	padding: 0 5px;
	background: #fff;
	box-shadow: 0 1px 5px rgba(0, 0, 0, 0.06);
	position: relative;
	z-index: 10;

	.nav-item {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		font-size: 15px;
		color: $font-color-dark;
		position: relative;

		&.current {
			color: $base-color;

			&:after {
				content: '';
				position: absolute;
				left: 50%;
				bottom: 0;
				transform: translateX(-50%);
				width: 44px;
				height: 0;
				border-bottom: 2px solid $base-color;
			}
		}
	}
}

.uni-swiper-item {
	height: auto;
}
.item {
	background: white;
	padding: 16rpx;
	margin: 16rpx;
	font-size: 28rpx;
	box-shadow: 7px 9px 34px rgba(0, 0, 0, 0.1);
	border-radius: 16upx;
}
.order-item {
	display: flex;
	flex-direction: column;
	padding-left: 15px;
	background: #fff;
	margin-top: 8px;

	.i-top {
		display: flex;
		align-items: center;
		height: 40px;
		padding-right: 16px;
		font-size: $font-base;
		color: $font-color-dark;
		position: relative;

		.time {
			flex: 1;
		}

		.state {
			font-weight: 400;
			color: $base-color;
		}

		.del-btn {
			padding: 6px 0 6px 18px;
			font-size: $font-lg;
			color: $font-color-light;
			position: relative;

			&:after {
				content: '';
				width: 0;
				height: 16px;
				border-left: 1px solid $border-color-dark;
				position: absolute;
				left: 10px;
				top: 50%;
				transform: translateY(-50%);
			}
		}
	}

	/* 单条商品 */
	.goods-box-single {
		display: flex;
		padding: 10px 0;

		.goods-img {
			width: 60px;
			height: 60px;
		}

		.right {
			flex: 1;
			display: flex;
			flex-direction: column;
			padding: 0 15px 0 12px;
			overflow: hidden;

			.title {
				height: 32px;
				overflow: hidden;
				text-overflow: ellipsis;
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				line-height: 1;
			}

			.attr-box {
				font-size: $font-sm + 2upx;
				color: $font-color-light;
				padding: 5px 0px;
			}

			.price {
				font-size: $font-base + 2upx;
				color: $font-color-dark;

				&:before {
					font-size: $font-sm;
					margin: 0 1px 0 4px;
				}
			}
		}
	}

	.price-box {
		display: flex;
		justify-content: flex-end;
		align-items: baseline;
		padding: 10px 16px;
		font-size: $font-sm + 2upx;
		color: $font-color-light;

		.num {
			margin: 0 4px;
			color: $font-color-dark;
		}

		.price {
			font-size: $font-lg;
			color: $font-color-dark;

			&:before {
				content: '￥';
				font-size: $font-sm;
				margin: 0 1px 0 4px;
			}
		}
	}

	.action-box {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		height: 50px;
		position: relative;
		padding-right: 16px;
	}

	.action-btn {
		width: 80px;
		height: 30px;
		margin: 0;
		margin-left: 12px;
		padding: 0;
		text-align: center;
		line-height: 30px;
		font-size: $font-sm + 2upx;
		color: $font-color-dark;
		background: #fff;
		border-radius: 100px;

		&:after {
			border-radius: 100px;
		}

		&.recom {
			background: #fff9f9;
			color: $base-color;

			&:after {
				border-color: #f7bcc8;
			}
		}
	}
}

/* load-more */
.uni-load-more {
	display: flex;
	flex-direction: row;
	height: 40px;
	align-items: center;
	justify-content: center;
}

.uni-load-more__text {
	font-size: 14px;
	color: #999;
}

.uni-load-more__img {
	height: 24px;
	width: 24px;
	margin-right: 10px;
}

.uni-load-more__img > view {
	position: absolute;
}

.uni-load-more__img > view view {
	width: 6px;
	height: 2px;
	border-top-left-radius: 1px;
	border-bottom-left-radius: 1px;
	background: #999;
	position: absolute;
	opacity: 0.2;
	transform-origin: 50%;
	animation: load 1.56s ease infinite;
}

.uni-load-more__img > view view:nth-child(1) {
	transform: rotate(90deg);
	top: 2px;
	left: 9px;
}

.uni-load-more__img > view view:nth-child(2) {
	transform: rotate(180deg);
	top: 11px;
	right: 0;
}

.uni-load-more__img > view view:nth-child(3) {
	transform: rotate(270deg);
	bottom: 2px;
	left: 9px;
}

.uni-load-more__img > view view:nth-child(4) {
	top: 11px;
	left: 0;
}

.load1,
.load2,
.load3 {
	height: 24px;
	width: 24px;
}

.load2 {
	transform: rotate(30deg);
}

.load3 {
	transform: rotate(60deg);
}

.load1 view:nth-child(1) {
	animation-delay: 0s;
}

.load2 view:nth-child(1) {
	animation-delay: 0.13s;
}

.load3 view:nth-child(1) {
	animation-delay: 0.26s;
}

.load1 view:nth-child(2) {
	animation-delay: 0.39s;
}

.load2 view:nth-child(2) {
	animation-delay: 0.52s;
}

.load3 view:nth-child(2) {
	animation-delay: 0.65s;
}

.load1 view:nth-child(3) {
	animation-delay: 0.78s;
}

.load2 view:nth-child(3) {
	animation-delay: 0.91s;
}

.load3 view:nth-child(3) {
	animation-delay: 1.04s;
}

.load1 view:nth-child(4) {
	animation-delay: 1.17s;
}

.load2 view:nth-child(4) {
	animation-delay: 1.3s;
}

.load3 view:nth-child(4) {
	animation-delay: 1.43s;
}

@-webkit-keyframes load {
	0% {
		opacity: 1;
	}

	100% {
		opacity: 0.2;
	}
}
</style>
