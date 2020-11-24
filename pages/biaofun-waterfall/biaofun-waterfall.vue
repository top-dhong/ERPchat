<!-- 瀑布流布局页 -->
<template>
	<view class="page">
		<biaofun-waterfall :list="listData"></biaofun-waterfall>
	</view>
</template>

<!-- 页面数据，页面逻辑 -->
<script>
let _this;
let _app = getApp();
import biaofunWaterfall from '@/components/biaofun-waterfall/biaofun-waterfall.vue';
export default {
	/**
	 * 页面用到的组件
	 */
	components: {
		biaofunWaterfall
	},

	/**
	 * 页面数据
	 */
	data() {
		return {
			// 瀑布流数据列表
			listData: [
				{
					id: 1,
					img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591368059473&di=62bbbdb4f2d0786142ecae853f29fe61&imgtype=0&src=http%3A%2F%2F00.minipic.eastday.com%2F20170302%2F20170302175831_60d0bdb330cce5b513693b0bae920101_5.jpeg',
					title: '我欲乘风归去1'
				},
				{
					id: 2,
					img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591368059473&di=4abc3356d8c7879eb8d855fc0afa87b4&imgtype=0&src=http%3A%2F%2Fimg.improve-yourmemory.com%2Fpic%2F78739853e99028b1705d953bf722b341-4.jpg',
					title: '我欲乘风归去2'
				},
				{
					id: 3,
					img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591368131897&di=a4e0cb717dc82de2d7df7cd154f59b46&imgtype=0&src=http%3A%2F%2Fimg1.imgtn.bdimg.com%2Fit%2Fu%3D3175508956%2C2902264390%26fm%3D214%26gp%3D0.jpg',
					title: '我欲乘风归去3'
				},
				{
					id: 4,
					img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591368059473&di=00c074ed60cac14531f30fa3449cdc61&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201610%2F31%2F20161031213203_i5KRs.jpeg',
					title: '我欲乘风归去4'
				},
				{
					id: 5,
					img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591368059473&di=e8b7c7d9ecd5d76c1be76e8a88211cf7&imgtype=0&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farchive%2F839b48daee6bed189d49aa6eac912b353ce0db3d.jpg',
					title: '我欲乘风归去5'
				},
				{
					id: 6,
					img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591368059473&di=414aed30b0bac87e90d9b1fed8d4c6c8&imgtype=0&src=http%3A%2F%2Fi3.sinaimg.cn%2Fdy%2Fcr%2F2012%2F0303%2F2495069999.jpg',
					title: '我欲乘风归去6'
				},
				{
					id: 7,
					img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591368059472&di=d08624f218ee59b1163b6ca078cf2df3&imgtype=0&src=http%3A%2F%2F01.minipic.eastday.com%2F20170523%2F20170523175755_c29d808f4357be2b791c11c114d6944a_6.jpeg',
					title: '我欲乘风归去7'
				},
				{
					id: 8,
					img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591368059472&di=30ccfd299bdf9d42d0bb15291a2741c1&imgtype=0&src=http%3A%2F%2Fpic.feizl.com%2Fupload%2Fallimg%2F170614%2F1TJB554-0.jpg',
					title: '我欲乘风归去8'
				},
				{
					id: 9,
					img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591368059471&di=107be8e54516b8a43d01070ff7cceff2&imgtype=0&src=http%3A%2F%2Fwww.flybridal.com%2Fhuangse%2FaHR0cDovL3BpYy5mZWl6bC5jb20vdXBsb2FkL2FsbGltZy8xNzA2MTQvMTAyOTI1MTRRLTEwLmpwZw%3D%3D.jpg',
					title: '我欲乘风归去9'
				},
				{
					id: 10,
					img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591368059471&di=46d350993dca13bef9bc8bf1743f9764&imgtype=0&src=http%3A%2F%2Fpic.feizl.com%2Fupload%2Fallimg%2F170615%2F002052MP-11.jpg',
					title: '我欲乘风归去10'
				}
			], 
		};
	},

	/**
	 * 页面生命周期 - 监听页面加载
	 * @param {Object} options 传递过来的参数对象
	 */
	async onLoad(options) {
		_this = this;
	},

	/**
	 * 页面生命周期 - 监听页面显示
	 */
	async onShow() {},

	/**
	 * 页面生命周期 - 监听页面初次渲染完成
	 */
	async onReady() {
		
	},

	/**
	 * 页面生命周期 - 监听页面隐藏
	 */
	async onHide() {},

	/**
	 * 页面生命周期 - 监听页面卸载
	 */
	async onUnload() {},

	/**
	 * 页面生命周期 - 监听窗口尺寸变化
	 * App、微信小程序
	 */
	async onResize() {},

	/**
	 * 页面生命周期 - 监听用户下拉动作
	 */
	async onPullDownRefresh() {
		// 停止下拉刷新
		uni.stopPullDownRefresh();
	},

	/**
	 * 页面生命周期 - 页面上拉触底事件的处理函数
	 */
	async onReachBottom() {},

	/**
	 * 页面生命周期 - 点击 tab 时触发
	 * 微信小程序、百度小程序、H5、App（自定义组件模式）
	 * @param {String} event.index 被点击tabItem的序号，从0开始
	 * @param {String} event.pagePath 被点击tabItem的页面路径
	 * @param {String} event.text 被点击tabItem的按钮文字
	 */
	async onTabItemTap(event) {},

	/**
	 * 页面生命周期 - 用户点击右上角分享
	 * 微信小程序、百度小程序、字节跳动小程序、支付宝小程序
	 */
	async onShareAppMessage() {},

	/**
	 * 页面生命周期 - 监听页面滚动
	 * @param {Number} event.scrollTop 页面在垂直方向已滚动的距离（单位px）
	 */
	async onPageScroll(event) {},

	/**
	 * 页面生命周期 - 监听原生标题栏按钮点击事件
	 * 5+App、H5
	 * @param {Number} event.index 原生标题栏按钮数组的下标
	 */
	async onNavigationBarButtonTap(event) {},

	/**
	 * 页面生命周期 - 监听页面返回
	 * App、H5
	 * @param {String} event.from	触发返回行为的来源：'backbutton'——左上角导航栏按钮及安卓返回键；'navigateBack'——uni.navigateBack() 方法
	 * 注意事项：
	 * - 只有在该函数中返回值为 true 时，才表示不执行默认的返回，自行处理此时的业务逻辑；
	 * - 不返回或返回其它值，均会执行默认的返回行为；
	 * - H5 平台，顶部导航栏返回按钮支持 onBackPress()，浏览器默认返回按键及Android手机实体返回键不支持 onBackPress()；
	 */
	async onBackPress(event) {},

	/**
	 * 页面生命周期 - 监听原生标题栏搜索输入框输入内容变化事件
	 * App、H5
	 */
	async onNavigationBarSearchInputChanged() {},

	/**
	 * 页面生命周期 - 监听原生标题栏搜索输入框搜索事件，用户点击软键盘上的 "搜索" 按钮时触发
	 * App、H5
	 */
	async onNavigationBarSearchInputConfirmed() {},

	/**
	 * 页面生命周期 - 监听原生标题栏搜索输入框点击事件
	 * App、H5
	 */
	async onNavigationBarSearchInputClicked() {},

	/**
	 * 页面函数
	 */
	methods: {
		
	}
};
</script>

<!-- 页面样式 -->
<style lang="scss" scoped>
.page {
	padding: 30upx;
}

</style>
