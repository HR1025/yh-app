<template>
	<view>
		<swiper class="yh-cartoon-swiper" :style="[swiperDynamicStyle]" :autoplay="true" :circular="true" @change="onChange">
			<swiper-item v-for="(item, index) in items" :key="index">
				<view><image :src="getImage(item)" mode="widthFix" class="yh-cartoon-swiper__image" ref="yh-cartoon-swiper__image" @click="onImageClick(index)"></image></view>
				<view class="yh-cartoon-swiper__bottom">
					<text class="yh-cartoon-swiper__bottom__text">{{ title(index) }}</text>
					<view class="yh-cartoon-swiper__bottom__padding"></view>
					<view class="yh-cartoon-swiper__bottom__cont" v-for="(item, index) in items" :key="index">
						<view class="yh-cartoon-swiper__bottom__cont__indicator" :style="[indicatorDynamicStyle(index)]"></view>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import commom from '@/libs/common.js';
import props from './props.js';
export default {
	/**
	 * Subsection    预览动画滑动窗口
	 * @property     {Array}               items         预览动画元素
	 * @property     {String}              imageName     items 中图像地址的名称
	 * @property     {String}              titileName    items 中图像标签的名臣
	 * @event        {Function}            imageClick    图像被点击时触发 回调 index: 图像的索引值，从0开始
	 */
	name: 'yh-cartoon-swiper',
	mixins: [props, commom],
	data() {
		return {
			imageHeight: 400, // 预留多一点点空间
			curImageIndex: 0 // 当前显示的图片索引
		};
	},
	computed: {
		swiperDynamicStyle() {
			const style = {};
			style.height = `${this.imageHeight}px`;
			return style;
		}
	},
	methods: {
		getImage(item) {
			this.getImageHeight();
			return item[this.imageName];
		},
		title(index) {
			if (this.items === undefined || this.items.length === 0) {
				return undefined;
			} else {
				return this.items[index][this.titileName];
			}
		},
		onChange(ev) {
			this.curImageIndex = ev.detail.current;
		},
		indicatorDynamicStyle(index) {
			const style = {};
			if (index === this.curImageIndex) {
				style.backgroundColor = '#fe960e';
			}
			return style;
		},
		onImageClick(index) {
			this.$emit('imageClick', index);
		},
		async getImageHeight() {
			await uni.$u.sleep(30);
			this.$uGetRect('.yh-cartoon-swiper__image').then(size => {
				if (this.imageHeight != size.height) {
					this.imageHeight = size.height;
				}
			});
		}
	}
};
</script>

<style lang="scss">
$yh-cartton-bottom-height: 26px;
$yh-cartton-font-size: 13px;
$yh-cartton-text-margin: 10px;
$yh-cartton-indicator-margin: 5px;
$yh-cartton-indicator-size: 12px;

.yh-cartoon-swiper {
	position: relative;

	&__image {
		width: 100%;
	}

	&__bottom {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		flex-wrap: nowrap;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: $yh-cartton-bottom-height;
		background-color: rgba(0, 0, 0, 0.3);

		&__text {
			display: flex;
			color: #ffffff;
			font-size: $yh-cartton-font-size;
			margin-left: $yh-cartton-text-margin;
			align-items: center;
			justify-content: center;
		}

		&__padding {
			display: flex;
			flex-grow: 1;
		}

		&__cont {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;

			&__indicator {
				display: flex;
				align-items: center;
				justify-content: center;
				margin-left: $yh-cartton-indicator-margin;
				border-radius: 100%;
				width: $yh-cartton-indicator-size;
				height: $yh-cartton-indicator-size;
				background-color: #b5b5b5;
			}
		}
	}
}
</style>
