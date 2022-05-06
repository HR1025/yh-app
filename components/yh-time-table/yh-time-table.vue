<template>
	<view>
		<view class="yh-time-table-titles">
			<view class="yh-time-table-titles__title" v-for="(item, index) in items" :key="index" :style="[titleDynamicStyle(index)]" @tap="onTitleClick(index)">
				{{ item.title }}
			</view>
		</view>
		<view class="yh-time-table-programs">
			<view class="yh-time-table-programs__cont" v-for="(item, index) in programs" :key="index">
				<view class="yh-time-table-programs__cont__dot"></view>
				<view class="yh-time-table-programs__cont__cartoon" @tap="onProgramClick(index)">{{ item.cartoon }}</view>
				<view class="yh-time-table-programs__cont__padding"></view>
				<view class="yh-time-table-programs__cont__update">{{ getUpdateTime(item) }}</view>
				<view class="yh-time-table-programs__cont__level">{{ `第${item.level}集` }}</view>
				<view class="yh-time-table-programs__cont__status" :style="[statusDynamicStyle(item)]">{{ getStatus(item) }}</view>
			</view>
		</view>
	</view>
</template>

<script>
import props from './props.js';
export default {
	/**
	 * Subsection  动漫更新时间表
	 * @property   {Array}      items                   时间表数据结构
	 * @property   {String}     curItemIndex            时间表数据结构的索引
	 * @event      {Function}   titleChange             当标题改变时触发
	 * @event      {Function}   programClick            当某个动漫节目被点击时触发
	 */
	name: 'yh-time-table',
	mixins: [props],
	data() {
		return {
			curTitleIndex: this.curItemIndex
		};
	},
	computed: {
		programs() {
			if (this.items.length === 0) {
				return [];
			} else {
				return this.items[this.curTitleIndex].programs;
			}
		}
	},
	methods: {
		onTitleClick(index) {
			this.curTitleIndex = index;
			this.$emit('titleChange', index);
		},
		onProgramClick(index) {
			this.$emit('programClick', index);
		},
		titleDynamicStyle(index) {
			const style = {};
			if (this.curTitleIndex === index) {
				style.color = '#f80019';
			}
			return style;
		},
		getUpdateTime(program) {
			return program.updateTime;
		},
		getStatus(program) {
			if (program.status === 0) {
				return '';
			} else if (program.status === 1) {
				return '(完结)';
			} else if (program.status === 2) {
				return 'new';
			}
		},
		statusDynamicStyle(program) {
			const style = {};
			if (program.status === 1) {
				style.marginLeft = '-2px';
			} else {
				style.color = '#ff0052';
			}
			style.marginRight = '2px';
			return style;
		}
	}
};
</script>

<style lang="scss">
$yh-time-table-titles-height: 32px !default;
$yh-time-table-title-font-size: 16px !default;
$yh-time-table-dot-size: 4px !default;
$yh-time-table-dot-margin: 8px !default;
$yh-time-table-program-height: 40px !default;
$yh-time-table-cartoon-max-width: 460upx !default;
$yh-time-table-cartoon-font-size: 14px !default;
$yh-time-table-update-font-size: 12px !default;

// flex 元素居中放置
@mixin flexItemCenter() {
	display: flex;
	justify-content: center;
	align-items: center;
}

.yh-time-table-titles {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	height: $yh-time-table-titles-height;

	&__title {
		@include flexItemCenter() flex-grow: 1;
		font-size: $yh-time-table-title-font-size;
		border-bottom: 0.1px solid #dddddd;
	}
}

.yh-time-table-programs {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;

	&__cont {
		@include flexItemCenter() flex-direction: row;
		justify-content: flex-start;
		height: $yh-time-table-program-height;
		border-bottom: 0.1px dotted #dddddd;
		box-sizing: border-box;

		&__dot {
			margin-left: $yh-time-table-dot-margin;
			margin-right: $yh-time-table-dot-margin;
			height: $yh-time-table-dot-size;
			width: $yh-time-table-dot-size;
			background-color: #585858;
		}

		&__cartoon {
			max-width: $yh-time-table-cartoon-max-width;
			font-size: $yh-time-table-cartoon-font-size;
			color: #535252;
			overflow: hidden;
			white-space: nowrap;
		}

		&__padding {
			display: flex;
			flex-grow: 1;
		}

		&__update {
			font-size: $yh-time-table-update-font-size;
			color: #cf667f;
			margin-right: 5px;
		}

		&__level {
			font-size: $yh-time-table-update-font-size;
			color: #999999;
			margin-right: 2px;
		}

		&__status {
			font-size: $yh-time-table-update-font-size;
			color: #999999;
		}
	}
}
</style>
