<template>
	<view class="uni-calendar-item__weeks-box" :class="{
		'uni-calendar-item--checked': (selectedDate.indexOf(weeks.fullDate) >= 0),
		}" @click="choiceDate(weeks)">
		<view class="uni-calendar-item__weeks-box-item">
			<text class="uni-calendar-item__weeks-box-text" :class="{
				'uni-calendar-item--disable':weeks.disable,
				'uni-calendar-item--checked': (selectedDate.indexOf(weeks.fullDate) >= 0),
				}">{{weeks.isDay ? '今天' : weeks.date}}</text>
			<!-- 自定日期显示数据 -->
			<text v-if="weeks.extraInfo&&weeks.extraInfo.info" class="uni-calendar-item__weeks-lunar-text" :class="{
				'uni-calendar-item--checked': (selectedDate.indexOf(weeks.fullDate) >= 0),
				}">{{weeks.extraInfo.info}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			weeks: {
				type: Object,
				default () {
					return {}
				}
			},
			calendar: {
				type: Object,
				default: () => {
					return {}
				}
			},
			selected: {
				type: Array,
				default: () => {
					return []
				}
			},
			lunar: {
				type: Boolean,
				default: false
			},
			selectedDate: {
				type: Array,
				default () {
					return []
				}
			},
		},
		mounted() {
			// console.log(this.weeks)
			// console.log(this.selectedDate)
		},
		methods: {
			choiceDate(weeks) {
				console.log(weeks)
				// console.log(this.selectedDate)
				// console.log(this.weeks.fullDate)
				this.$emit('change', weeks)
			}
		}
	}
</script>

<style scoped>
	.uni-calendar-item__weeks-box {
		flex: 1;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 5rpx;
	}

	.uni-calendar-item__weeks-box-text {
		font-size: 28rpx;
		color: #333;
	}

	.uni-calendar-item__weeks-lunar-text {
		margin: 5rpx;
		font-size: 24rpx;
		color: #333;
	}

	.uni-calendar-item__weeks-box-item {
		position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
		/* width: 90rpx;
		height: 90rpx; */
		margin: 5rpx;
	}

	.uni-calendar-item__weeks-box-circle {
		position: absolute;
		top: 5px;
		right: 5px;
		width: 8px;
		height: 8px;
		border-radius: 8px;
		background-color: #dd524d;

	}

	.uni-calendar-item--disable {
		background-color: rgba(249, 249, 249, 0.3);
		color: #c0c0c0;
	}

	.uni-calendar-item--isDay-text {
		color: #007aff;
	}

	.uni-calendar-item--isDay {
		background-color: #007aff;
		opacity: 0.8;
		color: #fff;
	}

	.uni-calendar-item--extra {
		color: #57555b;
		opacity: 0.8;
	}

	.uni-calendar-item--checked {
		background-color: #1aad19;
		border-radius: 20rpx;
		/* margin: 5rpx; */
		color: #fff;
		opacity: 0.8;
	}

	.uni-calendar-item--multiple {
		background-color: #007aff;
		color: #fff;
		opacity: 0.8;
	}
</style>