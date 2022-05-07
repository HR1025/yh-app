<template>
	<view>
		<yh-head @logoClick="onHeadLogoClick()" @searchClick="onHeadSearchClick" @historyClick="onHeadHistoryClick()"></yh-head>
		<yh-sort-column :items="sortItem" @itemClick="onSortColumnItemClick"></yh-sort-column>
		<yh-cartoon-swiper :items="homePreview" imageName="url" titileName="title" @imageClick="onCartoonSwiperImageClick"></yh-cartoon-swiper>
		<yh-time-table :items="timeTable" @titleChange="onTimeTableTitleChange" @programClick="onProgramClick"></yh-time-table>
		<view v-for="(item, index) in sortMessage" :key="index">
			<yh-sort-preview
				:items="sortPreviews[item.key]"
				:title="item.value"
				:keyName="item.key"
				@clickMore="onSortPreviewClickMore"
				@clickItem="onSortPreviewClickItem"
			></yh-sort-preview>
		</view>
		<view class="bottom">
			<view>github:www.baidu.com</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			sortItem : [],
			homePreview: [],
			timeTable: [],
			sortMessage: [],
			sortPreviews: Object,
			sortPreviewsNum: 0,
			curTitleIndex: 0,
		};
	},
	watch: {},
	methods: {
		// 头部事件回调函数
		onHeadLogoClick() {
			console.log('头部的LOGO图标被点击');
		},
		onHeadHistoryClick() {
			console.log('头部的历史记录图标被点击');
		},
		onHeadSearchClick() {
			console.log('头部的查询图标被点击');
		},
		// 分类栏事件回调函数
		onSortColumnItemClick(index) {
			console.log(`分类栏的${this.sortItem[index]}被点击`);
		},
		// 滑动预览图事件回调函数
		onCartoonSwiperImageClick(index) {
			console.log(`滑动预览图的${this.homePreview[index].title}被点击`);
		},
		// 更新时间表事件回调函数
		onTimeTableTitleChange(index) {
			this.curTitleIndex = index;
			console.log(`时间表的标题发生改变，标题是 ${this.timeTable[index].title}`);
		},
		onProgramClick(index) {
			console.log(`时间表的节目被点击，节目是 ${this.timeTable[this.curTitleIndex].programs[index].cartoon}`);
		},
		// 分类预览事件回调函数
		onSortPreviewClickMore(keyName) {
			this.sortMessage.forEach(item => {
				if (item.key === keyName) {
					console.log(`${item.value} 的 more 被点击`);
				}
			});
		},
		onSortPreviewClickItem(message) {
			const { keyName, index } = message;
			console.log(`${this.sortPreviews[keyName][index].title} 被点击`);
		},

		initData() {
			// 初始化分类菜单项目
			this.sortItem = [
				"动漫目录",
				"4月新番",
				"日本动漫",
				"每日推荐",
				"樱花影视"
			];
			// 初始化分类信息
			this.refreshSortPreviews();
		},
		refreshSortPreviews() {
			this.sortMessage = [];
			this.sortMessage = [
				{
					key: 'latestUpdate',
					value: '最近更新'
				},
				{
					key: 'homeCartoon',
					value: '国产动漫'
				},
				{
					key: 'cartoonMovie',
					value: '动漫电影'
				},
				{
					key: 'haremCartoon',
					value: '后宫动漫'
				},
				{
					key: 'bloodCartoon',
					value: '热血动漫'
				}
			];
		},
		getData() {
			uni.request({
				url: 'http://120.79.26.3:8080/api/homePreview.json',
				success: res => {
					this.homePreview = res.data.homePreview;
				},
				fail: res => {
					console.log('获取主页动漫预览图失败');
				}
			});
			uni.request({
				url: 'http://120.79.26.3:8080/api/timeTable.json',
				success: res => {
					this.timeTable = res.data.timeTable;
				},
				fail: res => {
					console.log('获取动漫时间表失败');
				}
			});
			this.sortMessage.forEach((item, index, items) => {
				uni.request({
					url: `http://120.79.26.3:8080/api/${item.key}.json`,
					success: res => {
						this.sortPreviews[item.key] = res.data[item.key];
						this.sortPreviewsNum++;
						// 强制刷新数据，触发 v-model
						if (this.sortPreviewsNum === items.length) {
							this.refreshSortPreviews();
							this.sortPreviewsNum = 0;
						}
					},
					fail: res => {
						console.log(`获取最近${item.value}预览失败`);
					}
				});
			});
		}
	},
	onLoad() {
		this.initData();
		this.getData();
	}
};
</script>

<style lang="scss">
.bottom{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 40px;
}
</style>
