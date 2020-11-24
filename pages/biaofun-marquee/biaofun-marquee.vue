<!-- 模板页 -->
<template>
	<view class="page">
		<!-- 单条数据 -->
		<view class="item">
			<biaofun-marquee :list="list1" ref="biaofunMarquee1" @completed="onMarquee1Completed"></biaofun-marquee>
		</view>
		
		<!-- 多条数据 -->
		<view class="item">
			<biaofun-marquee :list="list2" ref="biaofunMarquee2" @completed="onMarquee2Completed"></biaofun-marquee>
		</view>
		
		<!-- 动态数据 -->
		<view class="item">
			<biaofun-marquee :list="list3" ref="biaofunMarquee3" @completed="onMarquee3Completed"></biaofun-marquee>
		</view>
		
		<!-- 提示 -->
		<text class="tips">{{ tipsText }}</text>
	</view>
</template>

<!-- 页面数据，页面逻辑 -->
<script>
let _this;
let _app = getApp();
import biaofunMarquee from '@/components/biaofun-marquee/biaofun-marquee.vue';
export default {
	/**
	 * 页面用到的组件
	 */
	components: {
		biaofunMarquee
	},

	/**
	 * 页面数据
	 */
	data() {
		return {
			list1: [
				{ id: 1, text: '作者：山东标梵互动信息技术有限公司' }
			],
			list2: [
				{ id: 1, text: '作者：山东标梵互动信息技术有限公司' },
				{ id: 2, text: '公司地址：山东·济南 银座和谐广场2座806' },
				{ id: 3, text: '公司官网：http://biaofun.com/' }
			],
			list3: [
				{ id: 1, text: '作者：山东标梵互动信息技术有限公司' },
				{ id: 2, text: '公司地址：山东·济南 银座和谐广场2座806' },
				{ id: 3, text: '公司官网：http://biaofun.com/' }
			],
			tipsText: ''
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
		// 查询跑马灯数据
		this.queryList3Data();
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
		/**
		 * 查询跑马灯数据
		 */
		queryList3Data() {
			let seconds = 18;
			_this.tipsText = `${seconds}秒后第3个跑马灯的数据会更新`;
			let timer = setInterval(() => {
				if(seconds <= 0) {
					_this.list3 = [
						{ id: 1, text: '明月几时有？把酒问青天。' },
						{ id: 2, text: '不知天上宫阙，今夕是何年。' },
						{ id: 3, text: '我欲乘风归去，又恐琼楼玉宇，高处不胜寒。' },
						{ id: 3, text: '起舞弄清影，何似在人间。' },
						{ id: 3, text: '转朱阁，低绮户，照无眠。' },
						{ id: 3, text: '不应有恨，何事长向别时圆？' },
						{ id: 3, text: '人有悲欢离合，月有阴晴圆缺，此事古难全。' },
						{ id: 3, text: '但愿人长久，千里共婵娟。' }
					];
					_this.tipsText = `第3个跑马灯的数据已更新`;
					clearInterval(timer);
				} else {
					seconds--;
					_this.tipsText = `${seconds}秒后第3个跑马灯的数据会更新`;
				}
			}, 1000);
		},
		
		/**
		 * 第1个跑马灯更新数据后渲染完成后的回调函数
		 * 渲染完成后需要重置一下跑马灯组件
		 */ 
		onMarquee1Completed() {
			this.$refs.biaofunMarquee1.start();
		},
		
		/**
		 * 第2个跑马灯更新数据后渲染完成后的回调函数
		 * 渲染完成后需要重置一下跑马灯组件
		 */ 
		onMarquee2Completed() {
			this.$refs.biaofunMarquee2.start();
		},
		
		/**
		 * 第三个跑马灯更新数据后渲染完成后的回调函数
		 * 渲染完成后需要重置一下跑马灯组件
		 */ 
		onMarquee3Completed() {
			this.$refs.biaofunMarquee3.start();
		}
	}
};
</script>

<!-- 页面样式 -->
<style lang="scss" scoped>
.item {
	margin-bottom: 10upx;
}

.tips {
	height: 100upx;
	line-height: 100upx;
	display: block;
	text-align: center;
	color: #FF9900;
	font-size: 26upx;
}
</style>
