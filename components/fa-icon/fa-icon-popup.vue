<template>
	<view class="columns">
		<view class="rows fa-head">
			<view class="icon">
				<fa-icon :type="type" size="40" color="#2EC86A"></fa-icon>
			</view>
			<view class="h5">
				<text>
					type(名称)：{{type}}\n
					color(颜色): #2EC86A(默认值)\n
					size(大小): 20px(默认值)
				</text>
			</view>
		</view>
		<view class="columns fa-foot">
			<view class="">
				<textarea :value="aobut" style="height: 30px; font-size: 12px;" />
			</view>
			<view class="rows icon center1">
				<fa-icon :type="type" size="25" color="#2EC86A" spin></fa-icon>
				<view class="h5">属性：spin</view>
			</view>
			<view class="rows icon center1">
				<fa-icon :type="type" size="25" color="#2EC86A" pulse></fa-icon>
				<view class="h5">属性：pulse</view>
			</view>
			<view class="rows icon center1">
				<fa-icon :type="type" size="25" color="#2EC86A" left></fa-icon>
				<view class="h5">属性：left</view>
			</view>
			<view class="rows icon center1">
				<fa-icon :type="type" size="25" color="#2EC86A" right></fa-icon>
				<view class="h5">属性：right</view>
			</view>
			<view class="rows icon center1">
				<fa-icon :type="type" size="25" color="#2EC86A" down></fa-icon>
				<view class="h5">属性：down</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				aobut: '<fa-icon type="" color="" size="" 属性></fa-icon>\n<fa-icon 名称 颜色 大小 属性></fa-icon>'
			}
		},
		props: {
			type: ''
		}
	}
</script>

<style>
	.fa-head {
		margin: 5upx;
		margin-bottom: 5upx;
		border-bottom: #008000 solid 1upx;
	}

	.fa-head .icon {
		margin: 10upx;
	}

	.fa-foot {}

	.fa-foot .icon fa-icon {
		margin: 10upx;
	}
</style>
