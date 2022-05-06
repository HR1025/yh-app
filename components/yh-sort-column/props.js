export default {
	props: {
		items: {
			type: Array,
			default: []
		},
		// 激活元素背景颜色
		activeItemBgColor: {
			type: String,
			default: "#fc8bbb"
		},
		// 未激活元素背景颜色
		inactiveItemBgColor: {
			type: String,
			default: "#ffffff"
		},
		// 激活元素字体颜色
		activeItemFontColor: {
			type: String,
			default: "#ffffff"
		},
		// 未激活元素字体颜色
		inactiveItemFontColor: {
			type: String,
			default: "#535252"
		},
		// items 数组中指定对象的目标属性名
		keyName: {
			type: [String, undefined],
			undefined: undefined
		}
	}
}
