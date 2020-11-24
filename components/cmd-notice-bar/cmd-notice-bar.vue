<template>
  <view v-if="isShow" class="cmd-notice-bar" :class="[round ? 'cmd-notice-bar-round':'',type]" :style="setNoticeStyle">
    <view class="cmd-notice-bar-left" v-if="icon != ''">
      <cmd-icon :type="icon" size="16" :color="setIconColor"></cmd-icon>
    </view>
    <view class="cmd-notice-bar-content" :class="[rows && !scrollable ? 'cmd-notice-bar-multi-content':'']">
      <view @tap="$_click" v-text="text" :style="setSingleEllStyle" :class="[scrollable ? 'cmd-notice-bar-content-animate':'']"></view>
    </view>
    <view class="cmd-notice-bar-right" v-if="mode != ''">
      <cmd-icon :type="setModeIcon" size="16" :color="setIconColor" @click="$_mode"></cmd-icon>
    </view>
  </view>
</template>

<script>
  import cmdIcon from '../cmd-icon/cmd-icon.vue'
  export default {
    name: 'cmd-notice-bar',

    components: {
      cmdIcon
    },

    props: {
      /**
       * 显示文本
       */
      text: {
        tyep: String,
        default: ''
      },
      /**
       * 右侧提示类型 close/link
       */
      mode: {
        type: String,
        default: ''
      },
      /**
       * 情景类型 default/activity/warning
       */
      type: {
        type: String,
        default: 'default'
      },
      /**
       * 显示时长 单位为ms，不需要自动消失可将其置为0
       */
      time: {
        type: Number,
        default: 0,
      },
      /**
       * 圆角显示
       */
      round: {
        type: Boolean,
        default: false,
      },
      /**
       * 多行文本显示
       */
      rows: {
        type: Boolean,
        default: false,
      },
      /**
       * 滚动文本
       */
      scrollable: {
        type: Boolean,
        default: false,
      },
      /**
       * 左侧状态图标
       */
      icon: {
        type: String,
        default: '',
      },
      /**
       * 通知栏自定义样式
       */
      make: {
        type: Object,
        default: () => {
          return {
            'background-color': '',
            'color': ''
          }
        }
      }
    },

    data() {
      return {
        /**
         * 通知栏显示
         */
        isShow: true
      }
    },

    computed: {
      /**
       * 右侧提示图标
       */
      setModeIcon() {
        if (this.mode === 'link') {
          return 'chevron-right';
        } else if (this.mode === 'close') {
          return 'close';
        }
      },
      /**
       * 左侧提示图标
       */
      setIconColor() {
        let iconColor = '';
        if (this.type === 'activity') {
          iconColor = '#FF843D';
        } else if (this.type === 'warning') {
          iconColor = '#FF5B60';
        } else {
          iconColor = '#2F86F6';
        }
        return iconColor;
      },
      /**
       * 自定义style
       */
      setNoticeStyle() {
        let noticeStyle = '';
        for (let it in this.make) {
          noticeStyle += `${it}:${this.make[it]};`;
        }
        return noticeStyle;
      },
      /**
       * 单行文本溢出省略
       */
      setSingleEllStyle() {
        if (!this.rows && !this.scrollable) {
          return 'text-overflow: ellipsis;white-space:nowrap;overflow:hidden;';
        }
        return '';
      }
    },

    mounted() {
      if (this.time) {
        this.$_hide(this.time)
      }
    },

    methods: {
      /**
       * 定时关闭通知栏
       */
      $_hide(time) {
        setTimeout(() => {
          this.isShow = false
        }, time)
      },
      /**
       * 右侧图标点击事件
       */
      $_mode(e) {
        if (this.mode === 'close') {
          this.isShow = false;
          this.$emit('close', e)
        }
        if (this.mode === 'link') {
          this.$emit('link', e)
        }
      },
      /**
       * 通知栏文字点击
       */
      $_click(e) {
        this.$emit('click', e)
      }
    },
  }
</script>

<style lang="scss">
  /**
   * 通知栏属性样式变量
   */
  $cmd-notice-bar-fill:rgba(89, 158, 248, .08);
  $cmd-notice-bar-font-size:26upx;
  $cmd-notice-bar-color:#2F86F6;
  $cmd-notice-bar-zindex:1301;
  $cmd-notice-bar-border-radius:32upx;
  $cmd-notice-bar-fill-warning:#FFEEEF;
  $cmd-notice-bar-color-warning:#FF5B60;
  $cmd-notice-bar-fill-activity:#FFEDDE;
  $cmd-notice-bar-color-activity:#FF843D;

  .cmd-notice-bar {
    display: flex;
    z-index: $cmd-notice-bar-zindex;
    font-size: $cmd-notice-bar-font-size;
    min-height: 14upx;
    max-height: 32upx;
    //background-color: $cmd-notice-bar-fill;
    color: $cmd-notice-bar-color;
    position: relative;
    padding-left: 32upx;
    box-sizing: border-box;

    &.cmd-notice-bar-round {
      border-radius: $cmd-notice-bar-border-radius;
    }

    &.activity {
      background-color: $cmd-notice-bar-fill-activity;
      color: $cmd-notice-bar-color-activity;
    }

    &.warning {
      background-color: $cmd-notice-bar-fill-warning;
      color: $cmd-notice-bar-color-warning;
    }
  }

  .cmd-notice-bar-left,
  .cmd-notice-bar-right {
    display: flex;
    align-items: center;
  }

  .cmd-notice-bar-left {
    padding-right: 12upx;
  }

  .cmd-notice-bar-right {
    padding-right: 32upx;
  }

  .cmd-notice-bar-content {
    flex: 1;
    margin: auto;
    width: auto;
    line-height: 26upx;
    white-space: nowrap;
    overflow: hidden;

    &.cmd-notice-bar-multi-content {
      padding: 20upx 32upx 20upx 0;
      line-height: 26upx;
      white-space: normal;
    }

    .cmd-notice-bar-content-animate {
      padding-left: 100%;
      display: inline-block;
      animation: cmd-notice-bar-animation linear 16s infinite both;
    }
  }

  @keyframes cmd-notice-bar-animation {
    0% {
      transform: translate3d(0, 0, 0);
    }

    100% {
      transform: translate3d(-100%, 0, 0);
    }
  }
</style>
