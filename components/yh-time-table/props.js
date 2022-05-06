export default {
	props: {
		items: {
			type: Array,
			default: []
		},
		// 时间表数据结构的索引
		curItemIndex: {
			type: Number,
			default: 0
		}
	}
}
