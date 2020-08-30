<template>
	<view class="uni-padding-wrap uni-common-mt">
		
		<checkbox-group @change="checkboxChange">
			<label class="uni-list-cell uni-list-cell-pd" v-for="item in items" :key="item.value">
				<view>
					<checkbox :value="item.value" :checked="item.checked" />
				</view>
				<view>{{item.name}}</view>
			</label>
		</checkbox-group>
		
		<view class="next-btn">
			<button type="primary">下一步</button>
		</view>
		
	</view>
</template>

<script>
	// #ifdef H5
	// 这一段在正式上项目的时候删除它
	import mock from "@/common/mock.js"
	// #endif

	export default {
		data() {
			return {
				items: [],
				selectedUser: [],
			}
		},
		onShow() {
			// #ifdef H5
			// 这一段在正式上项目的时候删除它
			var list = mock.friendList;
			// #endif

			// #ifdef APP-PLUS

			// #endif

			this.items = this.setList(list);
		},
		methods: {
			checkboxChange: function(e) {
				var items = this.items,
					values = e.detail.value,
					selected = [];
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if (values.indexOf(item.value) >= 0) {
						this.$set(item, 'checked', true)
						selected.push(item);
					} else {
						this.$set(item, 'checked', false)
					}
				}
				this.selectedUser = selected;
			},
			setList: function(items) {
				var newItems = [];
				items.forEach((e) => {
					newItems.push({
						"value": e.username,
						"name": e.noteName ? e.noteName : (e.nickname ? e.nickname : e.username)
					})
				});
				return newItems;
			},
		},
	}
</script>

<style scoped>
	.next-btn{
		margin-top: 30rpx;
	}
</style>
