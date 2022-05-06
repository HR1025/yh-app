<template>
	<view>
		<!-- #ifdef APP-PLUS -->
		<view class="app-padding" :style="[backGroundColorStyle]"></view>
		<!-- #endif -->
		<view class="yh-head" :style="[backGroundColorStyle]">
			<text class="iconfont yh-yinghua yh-head__yinghua" :style="[frontGroundColorStyle]" @tap="onClickLogo()"></text>
			<text class="yh-head__text" :style="[frontGroundColorStyle]" @tap="onClickLogo()">樱花动漫</text>
			<text class="yh-head__padding"></text>
			<text class="iconfont yh-search yh-head__search" :style="[frontGroundColorStyle]" @tap="onSearchClick()"></text>
			<text class="iconfont yh-history yh-head__history" :style="[frontGroundColorStyle]" @tap="onHistoryClick()"></text>
		</view>
	</view>
</template>

<script>
import props from './props.js';

export default {
	/**
	 * Subsection  标题头
	 * @property   {Array}      frontGroundColor        前景颜色
	 * @property   {String}     backGroundColor         背景颜色
	 * @event      {Function}   logoClick               樱花图标被点击时触发
	 * @event      {Function}   historyClick            历史记录图标被点击时触发
	 * @event      {Function}   searchClick             搜索图标被点击时触发
	 */
	name: 'yh-head',
	mixins: [props],
	data() {
		return {};
	},
	computed: {
		frontGroundColorStyle() {
			const style = {};
			style.color = this.frontGroundColor;
			return style;
		},
		backGroundColorStyle() {
			const style = {};
			style.backgroundColor = this.backGroundColor;
			return style;
		}
	},
	methods: {
		onClickLogo() {
			this.$emit('logoClick');
		},
		onHistoryClick() {
			this.$emit('historyClick');
		},
		onSearchClick() {
			this.$emit('searchClick');
		}
	}
};
</script>

<style lang="scss">
$yh-padding-height: 35px !default;
$yh-head-height: 44px !default;
$yh-yinghua-height: 28px !default;
$yh-text-height: 22px !default;
$yh-search-height: 28px !default;
$yh-history-height: 20px !default;
$yh-item-padding: 2px !default;

@mixin itemStyle($size: $yh-yinghua-height) {
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: $size;
	padding-bottom: $yh-item-padding;
}

.app-padding {
	display: flex;
	flex-direction: row;
	height: $yh-padding-height;
}

.yh-head {
	display: flex;
	flex-direction: row;
	height: $yh-head-height;
	
	&__yinghua {
		@include itemStyle($yh-yinghua-height) margin-left: 5px;
	}

	&__text {
		@include itemStyle($yh-text-height) margin-left: 10px;
	}

	&__padding {
		display: flex;
		flex-grow: 1;
	}

	&__search {
		@include itemStyle($yh-search-height) margin-right: 5px;
	}

	&__history {
		@include itemStyle($yh-history-height) margin-right: 10px;
	}
}
</style>
