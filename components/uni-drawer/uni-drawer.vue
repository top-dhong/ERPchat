<template>
	<view v-if="visibleSync" class="uni-drawer" :catchtouchmove="catchtouchmove" :class="{'uni-drawer--visible':showDrawer,'uni-drawer--right':rightMode}">
		<view class="uni-drawer__mask" @tap="close"></view>
		<view class="uni-drawer__content">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'uni-drawer',
		props: {
			/**
			 * 显示状态
			 */
			visible: {
				type: Boolean,
				default: false
			},
			/**
			 * 显示模式（左、右），只在初始化生效
			 */
			mode: String,
			/**
			 * 蒙层显示状态
			 */
			mask: {
				type: [Boolean, String],
				default: true
			}
		},
		data() {
			return {
				visibleSync: false,
				showDrawer: false,
				rightMode: false,
				catchtouchmove: false
			}
		},
		watch: {
			visible(val) {
				setTimeout(() => {
					this.showDrawer = val
				}, 100)
				if (val) {
					this.visibleSync = val
				} else {
					setTimeout(() => {
						this.visibleSync = val
					}, 300)
				}
			}
		},
		computed: {
			showMask() {
				return String(this.mask) === 'true'
			}
		},
		created() {
			this.visibleSync = this.visible
			setTimeout(() => {
				this.showDrawer = this.visible
			}, 100)
			this.rightMode = this.mode === 'right'
			//#ifdef MP-WEIXIN
			this.catchtouchmove = true
			//#endif
		},
		methods: {
			close() {
				this.showDrawer = false
				setTimeout(() => {
					this.visibleSync = false
					this.$emit('close')
				}, 300)
			}
		}
	}
</script>

<style lang="scss">
	$drawer-width:90%;

	.uni-drawer {
		display: block;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		overflow: hidden;
		visibility: hidden;
		z-index: 998;
		height: 100%;

		&.uni-drawer--right {
			.uni-drawer__content {
				left: 75rpx;
				right: 0;
				transform: translatex(100%);
			}
		}

		&.uni-drawer--visible {
			visibility: visible;

			.uni-drawer__content {
				transform: translatex(0);
			}

			.uni-drawer__mask {
				display: block;
				opacity: 1;
			}
		}

		&__mask {
			display: block;
			opacity: 0;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: $uni-bg-color-mask;
			transition: opacity 0.3s;
		}

		&__content {
			display: block;
			position: absolute;
			top: 0;
			left: 75rpx;
			width: $drawer-width;
			height: 100%;
			background: $uni-bg-color;
			transition: all 0.3s ease-out;
			transform: translatex(100%);
		}
	}
</style>