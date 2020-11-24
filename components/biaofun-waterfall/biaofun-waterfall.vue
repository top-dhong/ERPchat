<!-- 
 * 瀑布流布局
 * 默认两列布局，默认列间距为 "24upx"
 * 
 * @作者：陈万照
 * @公司：山东标梵互动信息技术有限公司
 * @官网：http://biaofun.com/
 * @微信：C207668802
 * @QQ：207668802
 * @邮箱：cwz@biaofun.com || 207668802@qq.com
 * @版本：v1.0.1
 -->
<template>
	<view class="waterfall" id="waterfall" :style="{ 'column-count': count, 'column-gap': gap }">
		<view class="item" v-for="(item, index) in list" :key="index" :style="{ 'margin-bottom': gap }" @tap="onTapItem(item, index)">
			<image class="image" :src="item.img" mode="widthFix" :lazy-load="true"></image>
			<text class="title">{{ item.title }}</text>
		</view>
	</view>
</template>

<script>
export default {
	/**
	 * 数据
	 */
	props: {
		// 列表数据
		list: {
			type: Array,
			default() {
				return [];
			}
		},

		// 列数
		count: {
			type: [Number, String],
			default: 2
		},

		// 列间距
		gap: {
			type: String,
			default: '24upx'
		}
	},

	/**
	 * 方法
	 */
	methods: {
		/**
		 * item 点击事件
		 * @param {Object} item 数据对象
		 * @param {Number} index 数据下标
		 */
		onTapItem(item, index) {
			this.$emit('tapItem', item, index);
		}
	}
};
</script>

<style lang="scss" scoped>
.waterfall {
	width: 100%;
	margin: 0 auto;
	column-width: auto;
}

.item {
	break-inside: avoid;
	overflow: hidden;
	border-radius: 4upx;
}

.image {
	width: 100%;
	display: block;
}

.title {
	display: block;
	height: 80upx;
	line-height: 80upx;
	text-align: center;
	font-weight: 500;
	color: #050505;
	font-size: 28upx;
	background: #f2f3f4;
}
</style>
