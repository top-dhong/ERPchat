### NoticeBar 通知栏

通知栏组件，组件名：``cmd-notice-bar``，代码块： cmdNoticeBar。

**使用方式：**

在 ``script`` 中引用组件 

```javascript
import cmdNoticeBar from "@/components/cmd-notice-bar/cmd-notice-bar.vue"
export default {
    components: {cmdNoticeBar}
}
```

单行多行

```html
<cmd-notice-bar text="为了确保您的资金安全，请设置支付密码"></cmd-notice-bar>
<cmd-notice-bar rows text="为了确保您的资金安全，请设置支付密码。为了确保您的资金安全，请设置支付密码。为了确保您的资金安全，请设置支付密码."></cmd-notice-bar>
```

文字滚动

```html
<cmd-notice-bar scrollable text="为了确保您的资金安全，请设置支付密码。为了确保您的资金安全，请设置支付密码。为了确保您的资金安全，请设置支付密码."></cmd-notice-bar>   
```

显示图标、情景色、圆角

```html
<cmd-notice-bar text="为了确保您的资金安全，请设置支付密码" type="activity" icon="alert-circle"></cmd-notice-bar>
<cmd-notice-bar text="为了确保您的资金安全，请设置支付密码" type="warning" mode="link"></cmd-notice-bar>
<cmd-notice-bar text="为了确保您的资金安全，请设置支付密码" :round="true" mode="closable"></cmd-notice-bar>
```

自动关闭

```html
<cmd-notice-bar :time="5000" icon="alert-circle" scrollable text="为了确保您的资金安全，请设置支付密码。为了确保您的资金安全，请设置支付密码。为了确保您的资金安全，请设置支付密码."></cmd-notice-bar>
```

**属性说明：**

|属性名		|类型	|默认值	|说明											|
|---		|----	|---	|---											|
|text		|String	|-		|显示文字										|
|mode		|String	|-		|右侧提示类型 close/link						|
|type		|String	|default|情景类型 default/activity/warning				|
|time		|String	|Number	|显示时长 单位为ms，不需要自动消失可将其置为0	|
|round		|Boolean|false	|圆角显示										|
|rows		|Boolean|false	|多行文本显示									|
|scrollable	|Boolean|false	|是否滚动，为true时，NoticeBar为单行			|
|icon		|String	|-		|左侧状态图标									|
|make		|Object	|-		|通知栏自定义样式								|

**事件说明：**

|事件名称	|说明					|
|---		|---					|
|click		|点击 通知文本 触发事件	|
|close		|点击 关闭x 触发事件	|
|link		|点击 更多> 触发事件	|
