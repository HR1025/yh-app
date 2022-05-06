module.exports = {
	props: {
	},
	data() {
		return {}
	},
	onLoad() {
	},
	created() {
	},
	computed: {
		$u() {
			return uni.$u.deepMerge(uni.$u, {
				props: undefined,
				http: undefined,
				mixin: undefined
			})
		}
	},
	methods: {
		/**
		 * @brief 查询节点信息
		 * @param {Object} selector
		 * @param {Object} all
		 * @note  将 uni SelectorQuery 封装为 Promise 形式
		 */
		$uGetRect(selector, all) {
			return new Promise((resolve) => {
				uni.createSelectorQuery()
					.in(this)[all ? 'selectAll' : 'select'](selector)
					.boundingClientRect((rect) => {
						if (all && Array.isArray(rect) && rect.length) {
							resolve(rect)
						}
						if (!all && rect) {
							resolve(rect)
						}
					})
					.exec()
			})
		}
	}
}