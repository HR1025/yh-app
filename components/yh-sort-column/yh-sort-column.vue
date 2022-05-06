<template>
	<view class="yh-sort-column" ref="yh-sort-column">
		<view
			v-for="(item, index) in items"
			:key="index"
			class="yh-sort-column__item"
			:style="[itemDynamicStyle(isItemPress(index))]"
			@touchstart="onItemClick(index)"
			@touchend="isPress = false"
		>
			{{ titleName(item) }}
		</view>
	</view>
</template>

<script>
import props from './props.js';
export default {
	/**
	 * Subsection  分类栏
	 * @property   {Array}                    items                   分栏的元素
	 * @property   {String}                   activeItemBgColor       激活元素背景颜色
	 * @property   {String}                   inactiveItemBgColor     未激活元素背景颜色
	 * @property   {String}                   activeItemFontColor     激活元素字体颜色
	 * @property   {String}                   inactiveItemFontColor   未激活元素字体颜色
	 * @property   {String/undefined}         keyName                 items 数组中指定对象的目标属性名
	 * @event      {Function}                 itemClick               元素被点击时触发 回调 index：选项的index索引值，从0开始
	 */
	name: 'yh-sort-column',
	mixins: [props],
	data() {
		return {
			curItem: 0, // 当前的元素
			isPress: false // 视图是否被压下
		};
	},
	computed: {},
	watch: {},
	methods: {
		isItemPress(index) {
			return this.isPress && index === this.curItem ? true : false;
		},
		itemDynamicStyle(isPress) {
			const style = {};
			if (isPress) {
				style.backgroundColor = this.activeItemBgColor;
				style.color = this.activeItemFontColor;
			} else {
				style.backgroundColor = this.inactiveItemBgColor;
				style.color = this.inactiveItemFontColor;
			}
			return style;
		},
		onItemClick(index) {
			this.curItem = index;
			this.isPress = true;
			this.$emit('itemClick', index);
		},
		titleName(item) {
			if (this.keyName === undefined) {
				return item;
			} else {
				return item[this.keyName];
			}
		}
	}
};
</script>

<style lang="scss">
$yh-sort-column-height: 32px !default;
$yh-font-size: 28upx !default;

.yh-sort-column {
	display: flex;
	flex-direction: row;
	width: 100%;
	height: $yh-sort-column-height;
	justify-content: flex-start;
	border-bottom: 0.1px dotted #dddddd;
	
	&__item {
		display: flex;
		flex-grow: 1;
		justify-content: center;
		align-items: center;
		font-size: $yh-font-size;
	}
}
</style>
