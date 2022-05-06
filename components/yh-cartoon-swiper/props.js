export default {
	props: {
		items: {
			type: Array,
			default: []
		},
		// items 数组中指定对象的图片属性名
		imageName: {
			type: [String, undefined],
			default: undefined
		},
		// items 数组中指定对象的标题属性名
		titileName: {
			type: [String, undefined],
			default: undefined
		}
	}
}
