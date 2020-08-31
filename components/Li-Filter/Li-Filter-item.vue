<template>
	<view class="filter-parent-content" v-bind:style="{ maxHeight: height }">
		<view class="filter-item" v-bind:style="{ color: getColor(level), width: getWidth(level) }" :key="itemOut.key" v-for="(itemOut, level) in StackList">
			<view
				class="filter-item-inner"
				:key="item.value"
				v-bind:style="{ backgroundColor: getActiveColor(item, level) }"
				v-for="item in itemOut.list"
				@click="selItemFun(item, level)"
			>
				{{ item.text }}BB
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'filterItem',
	props: {
		model: {
			//当前节点数据
			type: Array
		},
		root: {
			//节点信息
			type: Object
		},
		animate: {
			type: String,
			default: 'animated fadeIn'
		},
		height: {
			//弹窗高度
			type: String,
			default: '300px'
		}
	},
	data() {
		return {
			defaultColor: {
				//默认
				color: '#909090',
				backgroundColor: 'white',
				backgroundColorActive: '#dad8d8'
			},
			colorList: [
				//字体颜色及背景颜色配置
				{
					color: '#909090',
					backgroundColor: '#dddddd',
					backgroundColorActive: '#e8e8e8'
				},
				{
					color: '#909090',
					backgroundColor: '#e8e8e8',
					backgroundColorActive: '#f3f3f3'
				},
				{
					color: '#909090',
					backgroundColor: '#f3f3f3',
					backgroundColorActive: '#FFFAFA'
				},
				{
					color: '#909090',
					backgroundColor: '#FFFAFA',
					backgroundColorActive: 'white'
				}
			],
			StackList: [], //列表栈
			StackSelectList: [], //选中项栈
			widthList: [] //宽度列表
		};
	},
	created() {
		if (this.model) {
			this.popIn(this.model);
		}
	},
	methods: {
		getColorItem(level) {
			return this.colorList.length < level + 1 ? this.defaultColor : this.colorList[level];
		},
		getColor(level) {
			//计算项的颜色
			return this.getColorItem(level).color;
		},
		getActiveColor(item, level) {
			var colorItem = this.getColorItem(level);
			if (item.value == this.StackSelectList[level].value) {
				return colorItem.backgroundColorActive;
			} else return colorItem.backgroundColor;
		},
		popIn(List) {
			//进栈
			this.StackList.push({
				list: List,
				key: Math.random()
			});

			var parentValue = {
				value: '',
				text: ''
			};
			this.StackSelectList.push(parentValue);
		},
		popOut(length) {
			if (length < 1) {
				return;
			}
			//出栈
			length = length ? length : 1;
			if (length >= this.StackList.length) {
				length = this.StackList.length - 1;
			}

			var start = this.StackList.length - length;
			this.StackList.splice(start, length);
			this.StackSelectList.splice(start, length);
		},
		selItemFun(item, level) {
			//项点击
			var StackItem = !item.children || item.children.length == 0 ? [] : item.children;
			level++;

			//堆栈选定信息
			var opIndex = level - 1;
			var StackSelectItem = {
				value: item.value,
				text: item.text
			};

			if (this.StackSelectList[opIndex].value == item.value) {
				//重复点击
				return;
			}

			//触发项的层级比当前展开的最深层浅，需要把旧的出栈，再进栈
			var popLength = this.StackList.length - level;
			if (popLength > 0) this.popOut(popLength); //出栈旧的

			//修改选中列表
			this.$set(this.StackSelectList, opIndex, StackSelectItem);

			if (StackItem.length != 0) {
				//选定项有下一级
				//修改选中列表
				this.$set(this.StackSelectList, opIndex, StackSelectItem);
				//进栈新的
				this.popIn(StackItem);
			}

			var returnData = {
				root: this.root,
				nodes: this.StackSelectList.filter(a => {
					return a.value != '';
				}),
				data: item
			};
			returnData = JSON.parse(JSON.stringify(returnData));
			this.$emit('change', returnData);
			if (StackItem.length == 0)
				//没有子项
				this.$emit('select', returnData);

			this.setWidth();
		},
		getWidth(level) {
			//获取每列宽度
			return this.widthList[level];
		},
		setWidth() {
			//设置列宽度
			//定义
			var len = this.StackList.length;
			var defaultLen = '33.333333%';
			if (len == 1) this.widthList = [defaultLen];
			else if (len == 2) this.widthList = [defaultLen, '66%'];
			else if (len == 3) this.widthList = [defaultLen, defaultLen, defaultLen];
			else {
				for (var i = 0; i < len; i++) {
					this.widthList.push(defaultLen);
				}
			}
		}
	},
	watch: {}
};
</script>

<style>
.filter-parent-content {
	font-size: 16px;
	display: flex;
	width: 100%;
	height: 100%;
	overflow-x: scroll;
	overflow-y: hidden;
}

.filter-item {
	min-width: 100px;
	-webkit-transition: background-color 0.1s linear;
	transition: background-color 0.1s linear;
	white-space: nowrap;
	text-overflow: ellipsis;
	-o-text-overflow: ellipsis;
	overflow-x: hidden;
	overflow-y: scroll;
	text-align: center;
}

.filter-item .filter-item-inner {
	padding: 0 3px;
	line-height: 38px;
	overflow: hidden;
	-webkit-transition: background-color 0.1s linear;
	transition: background-color 0.1s linear;
	text-align: center;
	white-space: nowrap;
	text-overflow: ellipsis;
}
</style>
