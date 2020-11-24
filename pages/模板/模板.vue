<!-- 模板页 -->
<template>
	<view class="page"><text class="iconfont">模板页</text></view>
</template>

<!-- 页面数据，页面逻辑 -->
<script>
let _this;
let _app = getApp();
export default {
	/**
	 * 页面用到的组件
	 */
	components: {},

	/**
	 * 页面数据
	 */
	data() {
		return {};
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
	async onReady() {},

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
		/**
		 * 请求数据
		 */
		queryData() {
			return new Promise((resolve, reject) => {
				_this
					.$http({
						url: '',
						showLoading: false,
						loadingText: '加载中...',
						showSuccessTips: true,
						successTipsMessage: true,
						successTipsText: '加载成功',
						showErrorTips: true,
						errorTipsMessage: true,
						errorTipsText: '加载失败',
						data: {}
					})
					.then(res => {
						resolve(res);
					})
					.catch(err => {
						reject(err);
					});
			});
		}
	}
};
</script>

<!-- 页面样式 -->
<style lang="scss" scoped>
.page {
	padding: 0 30upx;
}
</style>
