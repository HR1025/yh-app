export default {
	props: {
		items: {
			type: [Array, undefined],
			default: undefined
		},
		// 用于唯一表示此组件
		keyName: {
			type: String,
			default: ""
		},
		// 分类表的标题
		title: {
			type: [String, undefined],
			default: undefined
		},
		// 最多显示的预览个数
		limit: {
			type: Number,
			default: 9
		}
	}
}
