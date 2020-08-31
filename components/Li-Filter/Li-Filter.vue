<template>
	<view class="filter-content" v-bind:style="{ position: fixedTop == true || isFixtop ? 'fixed' : '',
		 top: fixedTop == true || isFixtop  ? inside_windowTop + 'px' : '' }">
			<view class="filter-title filterLine">
				<view
					class="filter-title-item"
					v-bind:key="titleItem.value"
					v-for="(titleItem, index) in inside_data"
					@click="setSelectType(titleItem)"
					v-bind:class="{ 'filter-title-item-active': SelectItem.value == titleItem.value }"
				> 
					{{ titleTextList[index] }}
					<svg
						t="1584538181539"
						v-show="SelectItem.value == titleItem.value && inside_show"
						class="filter-icon"
						viewBox="0 0 1024 1024"
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						p-id="7019"
					>
						<path
							d="M905.386667 737.28c28.501333 0 42.773333-34.453333 22.613333-54.613333L533.333333 288a32 32 0 0 0-45.248 0L93.418667 682.666667c-20.16 20.16-5.888 54.613333 22.613333 54.613333h789.333333z"
							fill="#000000"
							p-id="7020"
						></path>
					</svg>
					<svg
						t="1584538216305"
						v-show="SelectItem.value != titleItem.value || !inside_show"
						class="filter-icon"
						viewBox="0 0 1024 1024"
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						p-id="7748"
					>
						<path
							d="M905.386667 278.613333c28.501333 0 42.773333 34.474667 22.613333 54.634667L533.333333 727.914667a32 32 0 0 1-45.248 0l-394.666666-394.666667c-20.16-20.16-5.888-54.613333 22.613333-54.613333h789.333333z"
							fill="#000000"
							p-id="7749"
						></path>
					</svg>
				</view>
			</view>
			<!-- #ifdef H5 -->
			<transition-group tag="view" enter-active-class="animated slideInDown faster" leave-active-class="animated slideOutUp faster">
				<!-- #endif -->
				<view
					v-bind:key="itemData.value"
					class="filter-area"
					v-for="itemData in inside_data"
					v-show="itemData.value == SelectItem.value && inside_show"
					v-bind:style="{ maxHeight: dialogHeight }"
				>
					<view class="filter-area-inner" v-if="itemData.type === 1">
						<filterList v-on:select="selectEvent" v-on:change="changeEvent" :root="getRoot(itemData)" :filterdata="itemData"></filterList>
					</view>
					<view class="filter-area-inner" v-if="itemData.type === 2">
						<filterItem
							:height="dialogHeight"
							:root="getRoot(itemData)"
							v-on:select="selectEvent"
							v-on:change="changeEvent"
							:animate="animate"
							:model="itemData.data"
							isroot="1"
						></filterItem>
					</view>
				</view>
				<!-- #ifdef H5 -->
			</transition-group>
			<!-- #endif -->
			<view class="filter-mask" v-show="showMask" @touchmove.prevent.stop v-on:click="maskClick"></view>
		</view>
</template>

<script>
import filterItem from '@/components/Li-Filter/Li-Filter-item.vue';
import filterList from '@/components/Li-Filter/Li-Filter-list.vue';

export default {
	components: {
		filterItem,
		filterList
	},
	props: {
		datalist: {
			type: Object
		},
		animate: {
			type: String,
			default: 'animated fadeIn'
		},
		height: {
			type: Number,
			default: 0.6
		},
		show: {
			type: Boolean,
			default: true
		},
		windowTop:{	//展开时距离顶部的位置, 防止标题栏遮住
			type:Number,
			default:0
		},
		isFixtop: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			SelectItem: {},
			inside_data: [],
			titleTextList: [],
			filterType: 1,
			inside_show: false,
			showMask: false,
			fixedTop:false,  //标题置顶
			inside_windowTop:this.windowTop,//展开时距离顶部的位置, 排除标题栏影响
			windowHeight: 500, //窗口默认高度
			windowWidth: 300, //窗口默认宽度
			itemWidth: '25%', //项的宽度
			minHeight: 200 //最小高度
		};
	},
	created() {
		this.init();
	},
	methods: {
		init() {
			try {
				this.inside_data = this.datalist.data;
				this.filterType = this.datalist.filterType;

				//获取标题
				this.titleTextList = [];
				this.inside_data = this.inside_data ? this.inside_data : [];
				if (this.inside_data.length > 0) {
					for (var i = 0; i < this.inside_data.length; i++) this.titleTextList.push(this.inside_data[i].title);
				}

				this.getWindowHeight(); //初始化高度
				//计算每项宽度
				var len = this.inside_data.length;
				len = len == 0 ? 1 : len;
				if (len <= 4) {
					this.itemWidth = 100 / len + '%';
				}
			} catch (e) {
				console.error(e);
			}
		},
		setSelectType(item) {
			//标题点击
			if (this.SelectItem.value != item.value) {
				//点击不同项时保存
				this.SelectItem = item;
				this.showDialog();
			} else {
				//点击同一项
				if (this.inside_show) this.hideDialog();
				else this.showDialog();
			}
		},
		getRoot(itemData) {
			return { value: itemData.value, title: itemData.title };
		},
		getWindowHeight() {
			//设置弹窗高度
			// var winHeight = 300;
			// if ((document.body) && (document.body.clientHeight))
			// 	winHeight = document.body.clientHeight;
			const res = uni.getSystemInfoSync();
			console.log(res)
			this.windowHeight = res.windowHeight;
			this.windowWidth = res.windowWidth;
			
			if(this.inside_windowTop == 0){
				this.inside_windowTop = res.windowTop;
			}
		},
		selectEvent(re) {
			//兼容uniapp，改掉 $listeners
			this.$emit('select', re);
			if (re) {
				//找到操作项的index，修改标题
				var _index = this.inside_data.findIndex(a => {
					return a.value == re.root.value;
				});
				if (_index != -1) this.titleTextList[_index] = re.data.text;
			}

			this.hideDialog();
		},
		changeEvent(re) {
			//兼容uniapp，改掉 $listeners
			this.$emit('change', re);
		},
		maskClick() {
			this.hideDialog();
			this.SelectItem = {};
		},
		hideDialog() {
			this.inside_show = false;

			if (this.SelectItem.type !== 0) {
				//延时关闭，给动画过渡时间
				setTimeout(
					function() {
						this.showMask = false;
						this.fixedTop = false;
					}.bind(this),
					500
				);
			}
			else{
				this.fixedTop = false;
			}
		},
		showDialog() {
			if (this.SelectItem.type !== 0) {  //有下拉项的
				this.showMask = true;
				this.fixedTop = true;
			}
			else	//没有下拉项的
				this.showMask = false;
				
			this.inside_show = true;
		}
	},
	computed: {
		dialogHeight() {
			//弹窗高度
			var _height = this.windowHeight * this.height;
			_height = _height < this.minHeight ? this.minHeight : _height;
			return _height + 'px';
		}
	},
	watch: {
		show(newval, oldval) {
			if (!newval) this.hideDialog();
		},
		datalist(newval, oldval) {
			this.init();
		},
		windowTop(val){
			this.inside_windowTop = val;
		}
	}
};
</script>

<style>
@import url('./animate.css');
.filter-content {
	width: 100%;
	font-size: 16px;
	z-index: 3;
}

.filter-title {
	width: 100%;
	z-index: 3;
	display: flex;
	background-color: white;
}

.filter-icon {
	height: 14px;
	height: 14px;
}

.filter-area {
	position: absolute;
	background-color: white;
	left: 0px;
	z-index: 2;
	width: 100%;
}
.filter-area-inner {
	height: 100%;
}

.filter-title-item {
	flex-grow: 1;
	text-align: center;
	padding: 5px;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	-webkit-transition: background-color 0.1s linear;
	transition: background-color 0.1s linear;
}

.filter-title > i {
	color: grey;
}

.filter-title-item-active {
	color: orangered;
}

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
	border-bottom: 1px solid gainsboro;
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

.filter-mask {
	position: fixed;
	z-index: 1;
	width: 100%;
	height: 100%;
	background-color: #808080;
	opacity: 0.5;
	left: 0;
	top: 0;
}

.animated {
	-webkit-animation-duration: 1s;
	animation-duration: 1s;
	-webkit-animation-fill-mode: both;
	animation-fill-mode: both;
}

.animated.infinite {
	-webkit-animation-iteration-count: infinite;
	animation-iteration-count: infinite;
}

.animated.faster-1 {
	-webkit-animation-duration: 0.3s;
	animation-duration: 0.3s;
}

.animated.delay-mt {
	-webkit-animation-delay: 0.3s;
	animation-delay: 0.3s;
}

@media (print), (prefers-reduced-motion: reduce) {
	.animated {
		-webkit-animation-duration: 1ms !important;
		animation-duration: 1ms !important;
		-webkit-transition-duration: 1ms !important;
		transition-duration: 1ms !important;
		-webkit-animation-iteration-count: 1 !important;
		animation-iteration-count: 1 !important;
	}
}
</style>
