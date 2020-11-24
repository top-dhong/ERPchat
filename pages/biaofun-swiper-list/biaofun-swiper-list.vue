<!-- 
 * 滑动列表页
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
	<view class="swiper-list-container">
		<scroll-view class="tabs-wrapper" id="tabsWrapper" :scroll-x="true" :scroll-into-view="`tabItem${selectedIndex}`" :scroll-with-animation="true">
			<view class="tabs-wrap">
				<view class="tabs-item" :class="{ selected: selectedIndex == index }" :id="`tabItem${index}`" v-for="(tab, index) in tabs" :key="index" @tap.stop="onTapTab(tab, index)">
					<text>{{ tab.name }}</text>
				</view>
			</view>
		</scroll-view>
		<swiper class="list-wrapper" :current="selectedIndex" @change="changeList">
			<!-- 关注 -->
			<swiper-item class="list-item">
				<scroll-view
					scroll-y="true"
					class="list-scroll-view"
					:refresher-enabled="true"
					:refresher-triggered="guanzhu.refreshing"
					@refresherrefresh="onRefresh"
					@scrolltolower="loadData"
				>
					<view class="list-content">
						<text class="text" v-for="(item, index) in guanzhu.list" :key="index">{{ item.title }}</text>
					</view>
					<biaofun-loading-more :loading="guanzhu.loading" :loadall="guanzhu.loadall"></biaofun-loading-more>
				</scroll-view>
			</swiper-item>

			<!-- 推荐 -->
			<swiper-item class="list-item">
				<scroll-view
					scroll-y="true"
					class="list-scroll-view"
					:refresher-enabled="true"
					:refresher-triggered="tuijian.refreshing"
					@refresherrefresh="onRefresh"
					@scrolltolower="loadData"
				>
					<view class="list-content">
						<text class="text" v-for="(item, index) in tuijian.list" :key="index">{{ item.title }}</text>
					</view>
					<biaofun-loading-more :loading="tuijian.loading" :loadall="tuijian.loadall"></biaofun-loading-more>
				</scroll-view>
			</swiper-item>

			<!-- 两会 -->
			<swiper-item class="list-item">
				<scroll-view
					scroll-y="true"
					class="list-scroll-view"
					:refresher-enabled="true"
					:refresher-triggered="lianghui.refreshing"
					@refresherrefresh="onRefresh"
					@scrolltolower="loadData"
				>
					<view class="list-content">
						<text class="text" v-for="(item, index) in lianghui.list" :key="index">{{ item.title }}</text>
					</view>
					<biaofun-loading-more :loading="lianghui.loading" :loadall="lianghui.loadall"></biaofun-loading-more>
				</scroll-view>
			</swiper-item>

			<!-- 视频 -->
			<swiper-item class="list-item">
				<scroll-view
					scroll-y="true"
					class="list-scroll-view"
					:refresher-enabled="true"
					:refresher-triggered="shipin.refreshing"
					@refresherrefresh="onRefresh"
					@scrolltolower="loadData"
				>
					<view class="list-content">
						<text class="text" v-for="(item, index) in shipin.list" :key="index">{{ item.title }}</text>
					</view>
					<biaofun-loading-more :loading="shipin.loading" :loadall="shipin.loadall"></biaofun-loading-more>
				</scroll-view>
			</swiper-item>

			<!-- 济南 -->
			<swiper-item class="list-item">
				<scroll-view
					scroll-y="true"
					class="list-scroll-view"
					:refresher-enabled="true"
					:refresher-triggered="jinan.refreshing"
					@refresherrefresh="onRefresh"
					@scrolltolower="loadData"
				>
					<view class="list-content">
						<text class="text" v-for="(item, index) in jinan.list" :key="index">{{ item.title }}</text>
					</view>
					<biaofun-loading-more :loading="jinan.loading" :loadall="jinan.loadall"></biaofun-loading-more>
				</scroll-view>
			</swiper-item>

			<!-- 小视频 -->
			<swiper-item class="list-item">
				<scroll-view
					scroll-y="true"
					class="list-scroll-view"
					:refresher-enabled="true"
					:refresher-triggered="xiaoshipin.refreshing"
					@refresherrefresh="onRefresh"
					@scrolltolower="loadData"
				>
					<view class="list-content">
						<text class="text" v-for="(item, index) in xiaoshipin.list" :key="index">{{ item.title }}</text>
					</view>
					<biaofun-loading-more :loading="xiaoshipin.loading" :loadall="xiaoshipin.loadall"></biaofun-loading-more>
				</scroll-view>
			</swiper-item>

			<!-- 热点 -->
			<swiper-item class="list-item">
				<scroll-view
					scroll-y="true"
					class="list-scroll-view"
					:refresher-enabled="true"
					:refresher-triggered="redian.refreshing"
					@refresherrefresh="onRefresh"
					@scrolltolower="loadData"
				>
					<view class="list-content">
						<text class="text" v-for="(item, index) in redian.list" :key="index">{{ item.title }}</text>
					</view>
					<biaofun-loading-more :loading="redian.loading" :loadall="redian.loadall"></biaofun-loading-more>
				</scroll-view>
			</swiper-item>

			<!-- 娱乐 -->
			<swiper-item class="list-item">
				<scroll-view
					scroll-y="true"
					class="list-scroll-view"
					:refresher-enabled="true"
					:refresher-triggered="yule.refreshing"
					@refresherrefresh="onRefresh"
					@scrolltolower="loadData"
				>
					<view class="list-content">
						<text class="text" v-for="(item, index) in yule.list" :key="index">{{ item.title }}</text>
					</view>
					<biaofun-loading-more :loading="yule.loading" :loadall="yule.loadall"></biaofun-loading-more>
				</scroll-view>
			</swiper-item>

			<!-- 军事 -->
			<swiper-item class="list-item">
				<scroll-view
					scroll-y="true"
					class="list-scroll-view"
					:refresher-enabled="true"
					:refresher-triggered="junshi.refreshing"
					@refresherrefresh="onRefresh"
					@scrolltolower="loadData"
				>
					<view class="list-content">
						<text class="text" v-for="(item, index) in junshi.list" :key="index">{{ item.title }}</text>
					</view>
					<biaofun-loading-more :loading="junshi.loading" :loadall="junshi.loadall"></biaofun-loading-more>
				</scroll-view>
			</swiper-item>

			<!-- 音乐 -->
			<swiper-item class="list-item">
				<scroll-view
					scroll-y="true"
					class="list-scroll-view"
					:refresher-enabled="true"
					:refresher-triggered="yinyue.refreshing"
					@refresherrefresh="onRefresh"
					@scrolltolower="loadData"
				>
					<view class="list-content">
						<text class="text" v-for="(item, index) in yinyue.list" :key="index">{{ item.title }}</text>
					</view>
					<biaofun-loading-more :loading="yinyue.loading" :loadall="yinyue.loadall"></biaofun-loading-more>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<!-- 页面数据，页面逻辑 -->
<script>
let _this;
let _app = getApp();
import biaofunLoadingMore from '@/components/biaofun-loading-more/biaofun-loading-more.vue';
export default {
	/**
	 * 页面用到的组件
	 */
	components: {
		biaofunLoadingMore
	},

	/**
	 * 页面数据
	 */
	data() {
		return {
			// Tabs
			tabs: [
				{ id: 'guanzhu', name: '关注' },
				{ id: 'tuijian', name: '推荐' },
				{ id: 'lianghui', name: '两会' },
				{ id: 'shipin', name: '视频' },
				{ id: 'jinan', name: '济南' },
				{ id: 'xiaoshipin', name: '小视频' },
				{ id: 'redian', name: '热点' },
				{ id: 'yule', name: '娱乐' },
				{ id: 'junshi', name: '军事' },
				{ id: 'yinyue', name: '音乐' }
			],

			// 当前选中的下标，默认为0
			selectedIndex: 0,

			// 关注数据
			guanzhu: { 
				refreshing: false, // 是否正在刷新中？
				loading: false, // 是否正在加载中？
				loadall: false, // 是否已加载了全部数据？
				pageIndex: 1, // 当前页数
				pageSize: 20, // 每页数据条数
				list: [] , // 数据列表
			},

			// 推荐数据
			tuijian: { refreshing: false, loading: false, loadall: false, pageIndex: 1, pageSize: 20, list: [] },

			// 两会数据
			lianghui: { refreshing: false, loading: false, loadall: false, pageIndex: 1, pageSize: 20, list: [] },

			// 视频数据
			shipin: { refreshing: false, loading: false, loadall: false, pageIndex: 1, pageSize: 20, list: [] },

			// 济南数据
			jinan: { refreshing: false, loading: false, loadall: false, pageIndex: 1, pageSize: 20, list: [] },

			// 小视频数据
			xiaoshipin: { refreshing: false, loading: false, loadall: false, pageIndex: 1, pageSize: 20, list: [] },

			// 热点数据
			redian: { refreshing: false, loading: false, loadall: false, pageIndex: 1, pageSize: 20, list: [] },

			// 娱乐数据
			yule: { refreshing: false, loading: false, loadall: false, pageIndex: 1, pageSize: 20, list: [] },

			// 军事数据
			junshi: { refreshing: false, loading: false, loadall: false, pageIndex: 1, pageSize: 20, list: [] },

			// 音乐数据
			yinyue: { refreshing: false, loading: false, loadall: false, pageIndex: 1, pageSize: 20, list: [] }
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
		// 加载数据
		this.loadData();
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
		 * 切换Tab
		 * @param {Object} tab 数据对象
		 * @param {Number} index 数据下标
		 */
		onTapTab(tab, index) {
			// 更新Index
			this.selectedIndex = index;

			// 切换到的Tab的id
			let id = this.tabs[this.selectedIndex].id;

			// 判断是否需要首次加载数据
			// 关注
			if (id == 'guanzhu' && this.guanzhu.pageIndex == 1) {
				// 加载数据
				this.loadData();
			}
			// 推荐
			else if (id == 'tuijian' && this.tuijian.pageIndex == 1) {
				// 加载数据
				this.loadData();
			}
			// 两会
			else if (id == 'lianghui' && this.lianghui.pageIndex == 1) {
				// 加载数据
				this.loadData();
			}
			// 视频
			else if (id == 'shipin' && this.shipin.pageIndex == 1) {
				// 加载数据
				this.loadData();
			}
			// 济南
			else if (id == 'jinan' && this.jinan.pageIndex == 1) {
				// 加载数据
				this.loadData();
			}
			// 小视频
			else if (id == 'xiaoshipin' && this.xiaoshipin.pageIndex == 1) {
				// 加载数据
				this.loadData();
			}
			// 热点
			else if (id == 'redian' && this.redian.pageIndex == 1) {
				// 加载数据
				this.loadData();
			}
			// 娱乐
			else if (id == 'yule' && this.yule.pageIndex == 1) {
				// 加载数据
				this.loadData();
			}
			// 军事
			else if (id == 'junshi' && this.junshi.pageIndex == 1) {
				// 加载数据
				this.loadData();
			}
			// 音乐
			else if (id == 'yinyue' && this.yinyue.pageIndex == 1) {
				// 加载数据
				this.loadData();
			}
		},

		/**
		 * 左右滑动List
		 */
		changeList(event) {
			// 更新Index
			this.selectedIndex = event.detail.current;

			// 切换到的Tab的id
			let id = this.tabs[this.selectedIndex].id;

			// 是否需要初次加载数据
			// 关注
			if (id == 'guanzhu' && this.guanzhu.pageIndex == 1) {
				// 加载数据
				this.loadData();
			}
			// 推荐
			else if (id == 'tuijian' && this.tuijian.pageIndex == 1) {
				// 加载数据
				this.loadData();
			}
			// 两会
			else if (id == 'lianghui' && this.lianghui.pageIndex == 1) {
				// 加载数据
				this.loadData();
			}
			// 视频
			else if (id == 'shipin' && this.shipin.pageIndex == 1) {
				// 加载数据
				this.loadData();
			}
			// 济南
			else if (id == 'jinan' && this.jinan.pageIndex == 1) {
				// 加载数据
				this.loadData();
			}
			// 小视频
			else if (id == 'xiaoshipin' && this.xiaoshipin.pageIndex == 1) {
				// 加载数据
				this.loadData();
			}
			// 热点
			else if (id == 'redian' && this.redian.pageIndex == 1) {
				// 加载数据
				this.loadData();
			}
			// 娱乐
			else if (id == 'yule' && this.yule.pageIndex == 1) {
				// 加载数据
				this.loadData();
			}
			// 军事
			else if (id == 'junshi' && this.junshi.pageIndex == 1) {
				// 加载数据
				this.loadData();
			}
			// 音乐
			else if (id == 'yinyue' && this.yinyue.pageIndex == 1) {
				// 加载数据
				this.loadData();
			}
		},

		/**
		 * 加载数据
		 */
		async loadData() {
			// 判断要加载哪个Tab下的数据
			let id = this.tabs[this.selectedIndex].id;
			// 关注
			if (id == 'guanzhu') {
				// 判断是否正在加载中或是否已加载完全部数据
				if (!_this.guanzhu.loading && !_this.guanzhu.loadall) {
					// 更新 loading 状态
					this.guanzhu.loading = true;
					// 查询数据
					await this.queryGuanZhuData().then(res => {
						// 更新数据
						_this.guanzhu.list = _this.guanzhu.list.concat(res);
						// 将下次请求数据的页数+1
						_this.guanzhu.pageIndex = _this.guanzhu.pageIndex + 1;
						// 判断是否已加载完了全部数据
						if (_this.guanzhu.pageIndex > 6) _this.guanzhu.loadall = true;
					});
					// 更新 loading 状态
					this.guanzhu.loading = false;
				}
			}
			// 推荐
			else if (id == 'tuijian') {
				if (!_this.tuijian.loading && !_this.tuijian.loadall) {
					this.tuijian.loading = true;
					await this.queryTuiJianData().then(res => {
						_this.tuijian.list = _this.tuijian.list.concat(res);
						_this.tuijian.pageIndex = _this.tuijian.pageIndex + 1;
						if (_this.tuijian.pageIndex > 6) _this.tuijian.loadall = true;
					});
					this.tuijian.loading = false;
				}
			}
			// 两会
			else if (id == 'lianghui') {
				if (!_this.lianghui.loading && !_this.lianghui.loadall) {
					this.lianghui.loading = true;
					await this.queryLiangHuiData().then(res => {
						_this.lianghui.list = _this.lianghui.list.concat(res);
						_this.lianghui.pageIndex = _this.lianghui.pageIndex + 1;
						if (_this.lianghui.pageIndex > 6) _this.lianghui.loadall = true;
					});
					this.lianghui.loading = false;
				}
			}
			// 视频
			else if (id == 'shipin') {
				if (!_this.shipin.loading && !_this.shipin.loadall) {
					this.shipin.loading = true;
					await this.queryShiPinData().then(res => {
						_this.shipin.list = _this.shipin.list.concat(res);
						_this.shipin.pageIndex = _this.shipin.pageIndex + 1;
						if (_this.shipin.pageIndex > 6) _this.shipin.loadall = true;
					});
					this.shipin.loading = false;
				}
			}
			// 济南
			else if (id == 'jinan') {
				if (!_this.jinan.loading && !_this.jinan.loadall) {
					this.jinan.loading = true;
					await this.queryJiNanData().then(res => {
						_this.jinan.list = _this.jinan.list.concat(res);
						_this.jinan.pageIndex = _this.jinan.pageIndex + 1;
						if (_this.jinan.pageIndex > 6) _this.jinan.loadall = true;
					});
					this.jinan.loading = false;
				}
			}
			// 小视频
			else if (id == 'xiaoshipin') {
				if (!_this.xiaoshipin.loading && !_this.xiaoshipin.loadall) {
					this.xiaoshipin.loading = true;
					await this.queryXiaoShiPinData().then(res => {
						_this.xiaoshipin.list = _this.xiaoshipin.list.concat(res);
						_this.xiaoshipin.pageIndex = _this.xiaoshipin.pageIndex + 1;
						if (_this.xiaoshipin.pageIndex > 6) _this.xiaoshipin.loadall = true;
					});
					this.xiaoshipin.loading = false;
				}
			}
			// 热点
			else if (id == 'redian') {
				if (!_this.redian.loading && !_this.redian.loadall) {
					this.redian.loading = true;
					await this.queryReDianData().then(res => {
						_this.redian.list = _this.redian.list.concat(res);
						_this.redian.pageIndex = _this.redian.pageIndex + 1;
						if (_this.redian.pageIndex > 6) _this.redian.loadall = true;
					});
					this.redian.loading = false;
				}
			}
			// 娱乐
			else if (id == 'yule') {
				if (!_this.yule.loading && !_this.yule.loadall) {
					this.yule.loading = true;
					await this.queryYuLeData().then(res => {
						_this.yule.list = _this.yule.list.concat(res);
						_this.yule.pageIndex = _this.yule.pageIndex + 1;
						if (_this.yule.pageIndex > 6) _this.yule.loadall = true;
					});
					this.yule.loading = false;
				}
			}
			// 军事
			else if (id == 'junshi') {
				if (!_this.junshi.loading && !_this.junshi.loadall) {
					this.junshi.loading = true;
					await this.queryJunShiData().then(res => {
						_this.junshi.list = _this.junshi.list.concat(res);
						_this.junshi.pageIndex = _this.junshi.pageIndex + 1;
						if (_this.junshi.pageIndex > 6) _this.junshi.loadall = true;
					});
					this.junshi.loading = false;
				}
			}
			// 音乐
			else if (id == 'yinyue') {
				if (!_this.yinyue.loading && !_this.yinyue.loadall) {
					this.yinyue.loading = true;
					await this.queryYinYueData().then(res => {
						_this.yinyue.list = _this.yinyue.list.concat(res);
						_this.yinyue.pageIndex = _this.yinyue.pageIndex + 1;
						if (_this.yinyue.pageIndex > 6) _this.yinyue.loadall = true;
					});
					this.yinyue.loading = false;
				}
			}
		},

		/**
		 * 下拉刷新
		 */
		async onRefresh() {
			// 判断要加载哪个Tab下的数据
			let id = this.tabs[this.selectedIndex].id;
			// 关注
			if (id == 'guanzhu') {
				// 更新 refreshing 状态
				this.guanzhu.refreshing = true;
				
				// 判断是否正在加载中
				if (!_this.guanzhu.loading) {
					this.guanzhu.pageIndex = 1;
					this.guanzhu.loadall = false;
					this.guanzhu.loading = true;
					await this.queryGuanZhuData().then(res => {
						_this.guanzhu.list = res;
						_this.guanzhu.pageIndex = _this.guanzhu.pageIndex + 1;
						if (_this.guanzhu.pageIndex > 6) _this.guanzhu.loadall = true;
					});
					
					// 更新 refreshing 状态
					this.guanzhu.refreshing = false;
					
					// 更新 loading 状态
					this.guanzhu.loading = false;
				} else {
					// 更新 refreshing 状态
					this.guanzhu.refreshing = false;
				}
			}
			// 推荐
			else if (id == 'tuijian') {
				if (!_this.tuijian.loading && !_this.tuijian.loadall) {
					this.tuijian.pageIndex = 1;
					this.tuijian.loadall = false;
					this.tuijian.refreshing = true;
					this.tuijian.loading = true;
					await this.queryTuiJianData().then(res => {
						_this.tuijian.list = res;
						_this.tuijian.pageIndex = _this.tuijian.pageIndex + 1;
						if (_this.tuijian.pageIndex > 6) _this.tuijian.loadall = true;
					});
					this.tuijian.refreshing = false;
					this.tuijian.loading = false;
				}
			}
			// 两会
			else if (id == 'lianghui') {
				if (!_this.lianghui.loading && !_this.lianghui.loadall) {
					this.lianghui.pageIndex = 1;
					this.lianghui.loadall = false;
					this.lianghui.refreshing = true;
					this.lianghui.loading = true;
					await this.queryLiangHuiData().then(res => {
						_this.lianghui.list = res;
						_this.lianghui.pageIndex = _this.lianghui.pageIndex + 1;
						if (_this.lianghui.pageIndex > 6) _this.lianghui.loadall = true;
					});
					this.lianghui.refreshing = false;
					this.lianghui.loading = false;
				}
			}
			// 视频
			else if (id == 'shipin') {
				if (!_this.shipin.loading && !_this.shipin.loadall) {
					this.shipin.pageIndex = 1;
					this.shipin.loadall = false;
					this.shipin.refreshing = true;
					this.shipin.loading = true;
					await this.queryShiPinData().then(res => {
						_this.shipin.list = res;
						_this.shipin.pageIndex = _this.shipin.pageIndex + 1;
						if (_this.shipin.pageIndex > 6) _this.shipin.loadall = true;
					});
					this.shipin.refreshing = false;
					this.shipin.loading = false;
				}
			}
			// 济南
			else if (id == 'jinan') {
				if (!_this.jinan.loading && !_this.jinan.loadall) {
					this.jinan.pageIndex = 1;
					this.jinan.loadall = false;
					this.jinan.refreshing = true;
					this.jinan.loading = true;
					await this.queryJiNanData().then(res => {
						_this.jinan.list = res;
						_this.jinan.pageIndex = _this.jinan.pageIndex + 1;
						if (_this.jinan.pageIndex > 6) _this.jinan.loadall = true;
					});
					this.jinan.refreshing = false;
					this.jinan.loading = false;
				}
			}
			// 小视频
			else if (id == 'xiaoshipin') {
				if (!_this.xiaoshipin.loading && !_this.xiaoshipin.loadall) {
					this.xiaoshipin.pageIndex = 1;
					this.xiaoshipin.loadall = false;
					this.xiaoshipin.refreshing = true;
					this.xiaoshipin.loading = true;
					await this.queryXiaoShiPinData().then(res => {
						_this.xiaoshipin.list = res;
						_this.xiaoshipin.pageIndex = _this.xiaoshipin.pageIndex + 1;
						if (_this.xiaoshipin.pageIndex > 6) _this.xiaoshipin.loadall = true;
					});
					this.xiaoshipin.refreshing = false;
					this.xiaoshipin.loading = false;
				}
			}
			// 热点
			else if (id == 'redian') {
				if (!_this.redian.loading && !_this.redian.loadall) {
					this.redian.pageIndex = 1;
					this.redian.loadall = false;
					this.redian.refreshing = true;
					this.redian.loading = true;
					await this.queryReDianData().then(res => {
						_this.redian.list = res;
						_this.redian.pageIndex = _this.redian.pageIndex + 1;
						if (_this.redian.pageIndex > 6) _this.redian.loadall = true;
					});
					this.redian.refreshing = false;
					this.redian.loading = false;
				}
			}
			// 娱乐
			else if (id == 'yule') {
				if (!_this.yule.loading && !_this.yule.loadall) {
					this.yule.pageIndex = 1;
					this.yule.loadall = false;
					this.yule.refreshing = true;
					this.yule.loading = true;
					await this.queryYuLeData().then(res => {
						_this.yule.list = res;
						_this.yule.pageIndex = _this.yule.pageIndex + 1;
						if (_this.yule.pageIndex > 6) _this.yule.loadall = true;
					});
					this.yule.refreshing = false;
					this.yule.loading = false;
				}
			}
			// 军事
			else if (id == 'junshi') {
				if (!_this.junshi.loading && !_this.junshi.loadall) {
					this.junshi.pageIndex = 1;
					this.junshi.loadall = false;
					this.junshi.refreshing = true;
					this.junshi.loading = true;
					await this.queryJunShiData().then(res => {
						_this.junshi.list = res;
						_this.junshi.pageIndex = _this.junshi.pageIndex + 1;
						if (_this.junshi.pageIndex > 6) _this.junshi.loadall = true;
					});
					this.junshi.refreshing = false;
					this.junshi.loading = false;
				}
			}
			// 音乐
			else if (id == 'yinyue') {
				if (!_this.yinyue.loading && !_this.yinyue.loadall) {
					this.yinyue.pageIndex = 1;
					this.yinyue.loadall = false;
					this.yinyue.refreshing = true;
					this.yinyue.loading = true;
					await this.queryYinYueData().then(res => {
						_this.yinyue.list = res;
						_this.yinyue.pageIndex = _this.yinyue.pageIndex + 1;
						if (_this.yinyue.pageIndex > 6) _this.yinyue.loadall = true;
					});
					this.yinyue.refreshing = false;
					this.yinyue.loading = false;
				}
			}
		},

		/**
		 * 查询关注数据
		 */
		queryGuanZhuData() {
			return new Promise((resolve, reject) => {
				let timer = setTimeout(() => {
					let list = [];
					for (let index = 0; index < _this.guanzhu.pageSize; index++) {
						let item = {
							id: index,
							title: `关注${_this.guanzhu.pageIndex}-${index}`
						};
						list.push(item);
					}
					resolve(list);
				}, 1500);
			});
		},

		/**
		 * 查询推荐数据
		 */
		queryTuiJianData() {
			return new Promise((resolve, reject) => {
				let timer = setTimeout(() => {
					let list = [];
					for (let index = 0; index < _this.tuijian.pageSize; index++) {
						let item = {
							id: index,
							title: `推荐${_this.tuijian.pageIndex}-${index}`
						};
						list.push(item);
					}
					resolve(list);
				}, 1500);
			});
		},

		/**
		 * 查询两会数据
		 */
		queryLiangHuiData() {
			return new Promise((resolve, reject) => {
				let timer = setTimeout(() => {
					let list = [];
					for (let index = 0; index < _this.lianghui.pageSize; index++) {
						let item = {
							id: index,
							title: `两会${_this.lianghui.pageIndex}-${index}`
						};
						list.push(item);
					}
					resolve(list);
				}, 1500);
			});
		},

		/**
		 * 查询视频数据
		 */
		queryShiPinData() {
			return new Promise((resolve, reject) => {
				let timer = setTimeout(() => {
					let list = [];
					for (let index = 0; index < _this.shipin.pageSize; index++) {
						let item = {
							id: index,
							title: `视频${_this.shipin.pageIndex}-${index}`
						};
						list.push(item);
					}
					resolve(list);
				}, 1500);
			});
		},

		/**
		 * 查询济南数据
		 */
		queryJiNanData() {
			return new Promise((resolve, reject) => {
				let timer = setTimeout(() => {
					let list = [];
					for (let index = 0; index < _this.jinan.pageSize; index++) {
						let item = {
							id: index,
							title: `济南${_this.jinan.pageIndex}-${index}`
						};
						list.push(item);
					}
					resolve(list);
				}, 1500);
			});
		},

		/**
		 * 查询小视频数据
		 */
		queryXiaoShiPinData() {
			return new Promise((resolve, reject) => {
				let timer = setTimeout(() => {
					let list = [];
					for (let index = 0; index < _this.xiaoshipin.pageSize; index++) {
						let item = {
							id: index,
							title: `小视频${_this.xiaoshipin.pageIndex}-${index}`
						};
						list.push(item);
					}
					resolve(list);
				}, 1500);
			});
		},

		/**
		 * 查询热点数据
		 */
		queryReDianData() {
			return new Promise((resolve, reject) => {
				let timer = setTimeout(() => {
					let list = [];
					for (let index = 0; index < _this.redian.pageSize; index++) {
						let item = {
							id: index,
							title: `热点${_this.redian.pageIndex}-${index}`
						};
						list.push(item);
					}
					resolve(list);
				}, 1500);
			});
		},

		/**
		 * 查询娱乐数据
		 */
		queryYuLeData() {
			return new Promise((resolve, reject) => {
				let timer = setTimeout(() => {
					let list = [];
					for (let index = 0; index < _this.yule.pageSize; index++) {
						let item = {
							id: index,
							title: `娱乐${_this.yule.pageIndex}-${index}`
						};
						list.push(item);
					}
					resolve(list);
				}, 1500);
			});
		},

		/**
		 * 查询军事数据
		 */
		queryJunShiData() {
			return new Promise((resolve, reject) => {
				let timer = setTimeout(() => {
					let list = [];
					for (let index = 0; index < _this.junshi.pageSize; index++) {
						let item = {
							id: index,
							title: `军事${_this.junshi.pageIndex}-${index}`
						};
						list.push(item);
					}
					resolve(list);
				}, 1500);
			});
		},

		/**
		 * 查询音乐数据
		 */
		queryYinYueData() {
			return new Promise((resolve, reject) => {
				let timer = setTimeout(() => {
					let list = [];
					for (let index = 0; index < _this.yinyue.pageSize; index++) {
						let item = {
							id: index,
							title: `音乐${_this.yinyue.pageIndex}-${index}`
						};
						list.push(item);
					}
					resolve(list);
				}, 1500);
			});
		}
	}
};
</script>

<!-- 页面样式 -->
<style lang="scss" scoped>
.swiper-list-container {
	height: 100vh;
	overflow: hidden;
	display: flex;
	flex-direction: column;

	.tabs-wrapper {
		height: 80upx;
		width: 100%;
		flex-shrink: 0;
	}

	.tabs-wrap {
		height: 100%;
		display: flex;
		flex-wrap: nowrap;
	}

	.tabs-item {
		font-size: 26upx;
		color: #050505;
		height: 100%;
		padding: 0 30upx;
		word-wrap: normal;
		white-space: nowrap;
		display: flex;
		align-items: center;
		&.selected {
			color: #ff9900;
		}
	}

	.list-wrapper {
		flex: 1;
		overflow: hidden;
	}

	.list-item,
	.list-scroll-view {
		height: 100%;
		overflow: hidden;
	}
}

.text {
	display: block;
	text-align: center;
	font-size: 26upx;
	font-weight: bold;
	color: #050505;
	padding: 20upx;
}
</style>
