<!-- 
 * 加载更多组件
 * 
 * @作者：陈万照
 * @公司：山东标梵互动信息技术有限公司
 * @官网：http://biaofun.com/
 * @微信：C207668802
 * @QQ：207668802
 * @邮箱：cwz@biaofun.com || 207668802@qq.com
 * @版本：v1.0.8
 -->
<template>
	<view class="loading-more-component">
		<view class="loading" v-if="loadall">
			<text>{{ loadallTips }}</text>
		</view>
		<view class="loading" v-else-if="loading">
			<text>{{ loadingTips }}</text>
			<image src="@/static/biaofun-loading-more/loading/loading.gif" mode="widthFix" class="loading-gif"></image>
		</view>
		<view class="loading" v-else>
			<text>{{ defaultTips }}</text>
		</view>
	</view>
</template>

<script>
export default {
	/**
	 * 数据
	 */
	props: {
		// 是否正在加载中？
		loading: {
			type: Boolean,
			default: false
		},

		// 是否加载了全部数据？
		loadall: {
			type: Boolean,
			default: false
		},

		// 默认提示内容
		defaultTips: {
			type: String,
			default: '上拉加载更多'
		},

		// 提示内容
		loadingTips: {
			type: String,
			default: '加载中...'
		},

		// 提示内容
		loadallTips: {
			type: String,
			default: '已加载全部'
		}
	},
	
	/**
	 * 数据
	 */
	data() {
		return {}
	}
};
</script>

<style lang="scss" scoped>
.loading {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 80upx;
	color: #050505;
	font-size: 26upx;
}

.loading-gif {
	width: 60upx;
	height: 60upx;
}
</style>
