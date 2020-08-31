### 下拉筛选栏，仿美团，单选，多列联动

组件名：``Li-Filter``。

1、无限级联，非循环组件，循环组件在app和小程序端不支持，所以后来改成了数组形式，动态添加同级。
2、web端支持vue的transition动画，app端不支持，小程序端未测试，需要的可自行尝试。
3、控件默认fixed置顶，组件内调用uni.getSystemInfoSync计算标题栏高度，紧贴标题栏。

**使用方式：**

在 ``script`` 中引用组件 

```javascript
import LiFilter from '@/components/Li-Filter/Li-Filter.vue';
export default {
    components: {LiFilter}
}
```

在 ``template`` 中使用组件

```html
	<LiFilter @change="change" @select="select" :datalist="datalist" :height="height"></LiFilter>
```

```javascript
import LiFilter from '@/components/Li-Filter/Li-Filter.vue';
 
export default {
	components: {
		LiFilter
	},
	data() {
		return {
			datalist: {},
			testList: {},
			height: 0.6,
			title: 'Hello'
		};
	},
	onLoad() {
		this.testList = [];
		for (var i = 0; i < 30; i++) {
			this.testList.push({
				value: i,
				text: 'test data' + i,
				time: new Date()
			});
		}
		let tempdata = {
			filterType: 1,
			data: []
		};

		let normalItem = {
			title: '综合排序', //排序头的名称
			value: 'a',
			type: 1, //类型，0：没有下拉选项，1：单项下拉列表，2：多项列表，如地区选择
			data: [
				{
					value: 1,
					text: '综合排序'
				},
				{
					value: 2,
					text: '只看商家'
				},
				{
					value: 3,
					text: '只看产品'
				}
			]
		};

		let sigleItem = {
			title: '销量', //排序头的名称
			value: 'b',
			type: 0 //类型，0：没有下拉选项，1：单项下拉列表，2：多项列表，如地区选择
		};

		let areaData = require('../..//static/area.json');
		let typeData = require('../..//static/type.json');

		let AreaItem = {
			title: '区域', //排序头的名称
			value: 'c',
			type: 2, //类型，0：没有下拉选项，1：单项下拉列表，2：多项列表，如地区选择
			data: areaData
		};

		let typeItem = {
			title: '类型', //排序头的名称
			value: 'd',
			type: 2, //类型，0：没有下拉选项，1：单项下拉列表，2：多项列表，如地区选择
			data: typeData
		};

		tempdata.data.push(normalItem);
		tempdata.data.push(sigleItem);
		tempdata.data.push(AreaItem);
		tempdata.data.push(typeItem);
		this.datalist = tempdata;
	},
	methods: {
		change(e) {
			console.log('----------change----------');
			console.log(e);
		},
		select(e) {
			console.log('----------select----------');
			console.log(e);
		}
	}
};
```

**属性说明：**

|属性名		|类型|默认值	|说明|
|---|----|---|---|
|datalist	|Array	|-|数组|
|height	|float|-|高度，0-1	|
|show	|Boolean	|true|是否显示筛选区域|
|windowTop	|number	|当前标题栏的高度|默认置顶时，距离顶部的高度|
|isFixtop	|Boolean	|true|是否置顶显示|

**datalist 列表 属性说明：**

|属性名		|类型|默认值	|说明|
|---|----|---|---|
|title	|String	|-|排序头的名称|
|value	|String	|-|属性对应的值，可用来区分事件来源|
|type	|int	|-|显示的类型，0：没有下拉选项，1：单项下拉列表，2：多项列表，如地区选择	|
|data	|array	|-|列表数据|

**datalist.data 属性说明：**

|属性名		|类型|默认值	|说明|
|---|----|---|---|
|value	|String	|-|值|
|text	|String	|-|名称|
|children|array	|-|子项，可无限级联|

例如：
```javascript
[{
 	"value": "110000",
 	"text": "北京市",
 	"children": [{
 		"value": "110100",
 		"text": "市辖区",
 		"children": [{
 			"value": "110101",
 			"text": "东城区"
 		}]
 	}]
}
```

**事件说明：**

|属性名		|说明|
|---|---|
|@change	|项改变|
|@select	|最后一项时触发|

返回数据:
 
```javascript
{
	"root":{"value":"c","title":"区域"},  //根节点
	"nodes":[  //选择的节点路径
		{"value":"120000","text":"天津市"},
		{"value":"120200","text":"市辖县"},
		{"value":"120223","text":"静海县"}],
	"data":{"value":"120223","text":"静海县"}}  //最终节点数据
```