<template>
	<view>
		<view class="filter-signal-item" 
		v-bind:class="{ 
		 'filter-signal-item-active' : selected.value == item.value}"
		v-bind:key="item.value" 
		v-on:click="selectItem(item)" 
		v-for="item in datalist">
			{{ item.text }} AA
			<i class='filter-signal-item-active' v-show="selected.value == item.value">✔</i>
		</view>
	</view>
</template>

<script>
export default {
	name: 'filterList',
	props: {
		filterdata: {
			type: Object
		},
		height: {
			type: Number,
			default: 0.6
		},
		root:{	//节点信息
			type: Object
		}
	},
	data() {
		return {
			datalist: [],
			selected:{}
		};
	},
	created() {
		if(this.filterdata){
			this.datalist = this.filterdata.data ? this.filterdata.data : [];
		}
	},
	methods: {
		selectItem(item) {
			var returnData = {
				root:this.root,
				nodes: item,
				data: item
			};
			this.selected = item;
			returnData = JSON.parse(JSON.stringify(returnData));
			this.$emit('select', returnData);
		}
	}
};
</script>

<style>
.filter-signal-item {
	background-color: white;
	color: #909090;
	padding: 0 3px;
	line-height: 38px;
	overflow: hidden;
	-webkit-transition: background-color 0.1s linear;
	transition: background-color 0.1s linear;
	white-space: nowrap;
	text-overflow: ellipsis;
}

.filter-signal-item >i{
	float: right;margin-right: 15px;
}

.filter-signal-item-active {
	color: orangered;
}

/* .filter-title-item-active {
	color: orangered;
} */

/* 以下为实现0.5px底部边界 */
.filterLine {
	position: relative;
}
.filterLine:before,
.filterLine:after {
	position: absolute;
	content: ' ';
	height: 1px;
	width: 100%;
	left: 0;
	transform-origin: 0 0;
	-webkit-transform-origin: 0 0;
}
/* .filterLine:before {顶部top:0;background:#000;}
*/
.filterLine:after {
	bottom: 0;
	border-bottom: 1px solid #C8C7CC;
}
@media only screen and (-webkit-min-device-pixel-ratio: 1.5) {
	.filterLine:after,
	.filterLine:before {
		-webkit-transform: scaleY(0.667);
	}
}
@media only screen and (-webkit-min-device-pixel-ratio: 2) {
	.filterLine:after,
	.filterLine:before {
		-webkit-transform: scaleY(0.5);
	}
}
/* 以上为实现0.5px底部边界 */
</style>
