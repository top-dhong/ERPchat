<!-- 
 * 跑马灯组件
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
	<view class="marquee-component" v-if="show">
		<text class="iconfont notice-icon" v-if="showNoticeIcon">&#xe64d;</text>
		<view class="text-wrapper" id="textWrapper">
			<text
				class="text nowrap"
				:animation="runIndex == index ? animationData : null"
				:class="{'back': runIndex != index}"
				:id="`text-${index}`"
				@tap.stop="onTapItem(item, index)"
				v-for="(item, index) in listData"
				:key="index"
			>
				{{ item.text }}
			</text>
		</view>
		<text class="iconfont close-icon" v-if="showCloseBtn" @tap.stop="close">&#xe61e;</text>
	</view>
</template>

<script>
export default {
	/**
	 * 组件数据
	 */
	props: {
		// 数据列表
		list: {
			type: Array,
			default() {
				return [];
			}
		},

		// 当前下标
		current: {
			type: [Number, String],
			default: 0
		},

		// 运行速度
		speed: {
			type: [Number, String],
			default: 8
		},

		// 组件的显示状态
		show: {
			type: Boolean,
			default: true
		},

		// 是否显示小喇叭图标？
		showNoticeIcon: {
			type: Boolean,
			default: true
		},

		// 是否显示关闭按钮
		showCloseBtn: {
			type: Boolean,
			default: true
		}
	},

	/**
	 * 组件数据
	 */
	data() {
		return {
			runIndex: 0, // 当前激活的下标
			animation: null, // 动画句柄
			animationData: null, // 动画数据
			timer: null, // 定时器
			textWrapperWidth: 0, // 外层盒子宽度
			textWidth: 0, // 文本宽度
			listData: [], // 数据列表
		};
	},

	/**
	 * 监听数据
	 */
	watch: {
		// 监听列表数据是否渲染完成
		listData() {
			this.$nextTick(() => {
				console.log('数据列表渲染完成')
				this.init();
				this.$emit('completed');
			});
		},

		// 监听显示状态
		show(newVal, oldVal) {
			if (newVal) {
				let timer = setTimeout(() => {
					this.start();
				}, 80);
			}
		},
		
		// 监听列表
		list(list) {
			// 处理只有1条数据的情况
			if(list.length == 1) {
				this.listData = list.concat(list);
			} else {
				this.listData = list;
			}
		}
	},

	/**
	 * 挂载
	 */
	async mounted() {
		// 处理只有1条数据的情况
		if(this.list.length == 1) {
			this.listData = this.list.concat(this.list);
		} else {
			this.listData = this.list;
		}
		
		// 更新下标
		this.runIndex = this.current;

		// 创建动画句柄
		this.animation = uni.createAnimation();

		// 获取外层盒子宽度
		await this.getTextWrapperWidth();
	},
	
	/**
	 * 组件销毁之前
	 */
	beforeDestroy() {
		clearTimeout(this.timer);
		this.animationData = null;
		this.runIndex = -1;
	},

	methods: {
		/**
		 * 初始化
		 */
		init() {
			if (this.timer) clearTimeout(this.timer);
			this.animationData = null;
			this.runIndex = -1;
		},

		/**
		 * 开始
		 * @param {Object} list 数据列表
		 * @param {Number} current 默认下标
		 * @param {Number} speed 速冻
		 * @param {Boolean} reset 是否重置？
		 */
		async start() {
			// 要运动的数据下标
			this.runIndex = (this.runIndex >= 0 && this.runIndex < this.listData.length) ? this.runIndex : 0;

			// 获取文本宽度
			await this.getTextWidth(`#text-${this.runIndex}`);

			// 计算duration
			let duration = parseInt((this.textWidth / this.speed) * 200);

			// 执行动画
			this.animation.translateX(-(this.textWrapperWidth + this.textWidth - 100)).step({ duration: duration });
			this.animationData = this.animation.export();

			// 创建定时器
			this.timer = setTimeout(() => {
				// 进行下一条数据
				this.runIndex = parseInt(this.runIndex) + 1;
				this.start();
				clearTimeout(this.timer);
			}, duration);
		},

		/**
		 * 获取外层盒子宽度
		 */
		getTextWrapperWidth() {
			let query = uni.createSelectorQuery().in(this);
			return new Promise((resolve, reject) => {
				query
					.select('#textWrapper')
					.boundingClientRect(res => {
						this.textWrapperWidth = res.width;
						resolve();
					})
					.exec();
			});
		},

		/**
		 * 获取文本宽度
		 * @param {String} id 文本元素id
		 */
		getTextWidth(id) {
			let query = uni.createSelectorQuery().in(this);
			return new Promise((resolve, reject) => {
				query
					.select(id)
					.boundingClientRect(res => {
						this.textWidth = res.width;
						resolve(res.width);
					})
					.exec();
			});
		},

		/**
		 * 关闭
		 */
		close() {
			clearTimeout(this.timer);
			this.animationData = null;
			this.runIndex = -1;
			this.$emit('close');
		},

		/**
		 * 文本被点击事件
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
.marquee-component {
	background: rgb(255, 251, 232);
	display: flex;
	overflow: hidden;
	align-items: center;
	height: 60upx;
	font-size: 28upx;
	color: rgb(222, 140, 23);
	padding: 0 24upx;
}

.notice-icon {
	margin-right: 24upx;
}

.close-icon {
	margin-left: 24upx;
}

.text-wrapper {
	flex: 1;
	height: 100%;
	position: relative;
	overflow: hidden;
}

.text {
	padding: 0 24upx;
	position: absolute;
	height: 100%;
	min-width: 100%;
	left: 100%;
	top: 0;
	z-index: 10;
	display: flex;
	align-items: center;
	word-wrap: normal;
	white-space: nowrap;
}

.text.back {
	transform: translateX(0px) !important;
	-webkit-transform: translateX(0px) !important;
	transition: 0ms linear 0ms !important;
	-webkit-transition: 0ms linear 0ms !important;
	transition-property: transform !important;
	transition-property: -webkit-transform !important;
	-webkit-transition-property: transform !important;
	-webkit-transition-property: -webkit-transform !important;
}
</style>
