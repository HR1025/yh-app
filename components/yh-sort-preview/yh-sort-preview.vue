<template>
	<view>
		<view class="yh-sort-preview-head">
			<view class="yh-sort-preview-head__indicator"></view>
			<view class="yh-sort-preview-head__title">{{ this.title }}</view>
			<view class="yh-sort-preview-head__padding"></view>
			<view class="yh-sort-preview-head__more" @tap="onClickMore">{{ `更多>` }}</view>
		</view>
		<view class="yh-sort-preview-body">
			<view class="yh-sort-preview-body__item" v-for="(item, index) in items" :key="index" v-show="needShow(index)" @click="onClickItem(index)">
				<view class="yh-sort-preview-body__item__cont">
					<image class="yh-sort-preview-body__item__cont__image" mode="widthFix" :src="getImage(item)"></image>
					<view class="yh-sort-preview-body__item__cont__bottom">
						<view class="yh-sort-preview-body__item__cont__bottom__update">{{ getUpdateTime(item) }}</view>
						<view class="yh-sort-preview-body__item__cont__bottom__level">{{ getLevel(item) }}{{ getExtra(item) }}</view>
					</view>
				</view>
				<view class="yh-sort-preview-body__item__text">{{ getTitle(item) }}</view>
			</view>
		</view>
	</view>
</template>

<script>
import props from './props.js';

export default {
	/**
	 * Subsection  分类动画预览
	 * @property   {Array}           items            分类动画预览项
	 * @property   {String}          keyName          用于唯一表示此组件
	 * @property   {String}          title            分类表的标题
	 * @property   {Number}          limit            最多显示的预览个数
	 * @event      {Function}        clickMore        点击"更多"时触发，keyName
	 * @event      {Function}        clickItem        点击预览项时触发，
	 *                                                {keyName: "",
	 *                                                  index : "第几个项被点击，从0开始"}     
	 */
	name: 'yh-sort-preview',
	mixins: [props],
	data() {
		return {};
	},
	methods: {
		needShow(index) {
			return index < this.limit ? true : false;
		},
		getImage(item) {
			return item.url;
		},
		getUpdateTime(item) {
			return item.updateTime;
		},
		getLevel(item) {
			if (item.level > 0) {
				return `第${item.level}集`;
			} else if (item.level === 0) {
				return `[全集]`;
			} else {
				return `第${-item.level}季`;
			}
		},
		getTitle(item) {
			return item.title;
		},
		getExtra(item) {
			return item.extra;
		},
		onClickMore() {
			this.$emit('clickMore', this.keyName);
		},
		onClickItem(index) {
			this.$emit('clickItem', { keyName: this.keyName, index: index });
		}
	}
};
</script>

<style lang="scss">
$yh-sort-preview-head-height: 24px !default;
$yh-sort-preview-head-margin: 10px !default;
$yh-sort-preview-head-indicator-width: 3px !default;
$yh-sort-preview-head-indicator-margin: 6px !default;
$yh-sort-preview-head-title-size: 16px !default;
$yh-sort-preview-head-size: 14px !default;
$yh-sort-preview-body-cont-margin-bottom: 10px !default;
// 750 upx 等于整块屏幕的宽度,
// ($yh-sort-preview-body-cont-width + $yh-sort-preview-body-cont-margin-horizontal * 2) = 250upx,
// 从而实现三等分自动换行
$yh-sort-preview-body-cont-width: 230upx !default;
$yh-sort-preview-body-cont-margin-horizontal: 10upx !default;
$yh-sort-preview-body-cont-bottom-height: 20px !default;
$yh-sort-preview-body-text-font-size: 12px !default;
// 使用限制容器的高度以及设置溢出隐藏来最多只换行一次，即最多只显示两行
$yh-sort-preview-body-text-height: 32px !default;

@mixin smoothCont($angle: 8%) {
	border: solid;
	border-width: 0px;
	border-radius: $angle $angle $angle $angle;
	// 通过溢出部分隐藏实现子元素形状受制于父元素的效果
	overflow: hidden;
}

.yh-sort-preview-head {
	display: flex;
	flex-direction: row;
	height: $yh-sort-preview-head-height;
	margin-top: $yh-sort-preview-head-margin;
	margin-bottom: $yh-sort-preview-head-margin;

	&__indicator {
		width: $yh-sort-preview-head-indicator-width;
		margin-left: $yh-sort-preview-head-indicator-margin;
		margin-right: $yh-sort-preview-head-indicator-margin;
		background-color: #fd5e92;
	}

	&__title {
		display: flex;
		align-items: center;
		font-size: $yh-sort-preview-head-title-size;
	}

	&__padding {
		display: flex;
		flex-grow: 1;
	}

	&__more {
		display: flex;
		align-items: center;
		font-size: $yh-sort-preview-head-size;
		color: #999999;
		margin-right: 5px;
	}
}

.yh-sort-preview-body {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: flex-start;
	box-sizing: border-box;

	&__item {
		display: flex;
		flex-direction: column;
		width: $yh-sort-preview-body-cont-width;
		margin-bottom: $yh-sort-preview-body-cont-margin-bottom;
		margin-left: $yh-sort-preview-body-cont-margin-horizontal;
		margin-right: $yh-sort-preview-body-cont-margin-horizontal;

		&__cont {
			display: flex;
			@include smoothCont();
			position: relative;

			&__image {
			}

			&__bottom {
				@include smoothCont(10%);
				position: absolute;
				right: 0;
				left: 0;
				bottom: 0;
				background-color: rgba(0, 0, 0, 0.3);
				height: $yh-sort-preview-body-cont-bottom-height;

				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;

				&__update {
					align-items: center;
					margin-left: 6px;
					color: #c17272;
					font-size: 12px;
					margin-right: -3px;
				}

				&__level {
					align-items: center;
					margin-left: 6px;
					color: #ffffff;
					font-size: 12px;
				}
			}
		}

		&__text {
			display: flex;
			align-items: flex-start;
			justify-content: flex-start;
			margin-top: 8upx;
			font-size: $yh-sort-preview-body-text-font-size;
			color: #363636;
			white-space: normal;
			height: $yh-sort-preview-body-text-height;
			overflow: hidden;
		}
	}
}
</style>
