# 注：此套图标引用font awemose
[Font Awemose官网](http://fontawesome.dashgame.com/)
## 下载文件解压，拖至HBuilder X直接运行


### 导入到其它项目中使用方法

#### 1. 将"components/fa-icon/fa-icon.vue"文件(夹)复制到自己的项目下
#### 2.在main.js中全局引入 （强烈建议全局引入，所有页面随时调用）
```html
// 图表组件
import faicon from './components/fa-icon/fa-icon.vue'
Vue.component('faicon',faicon)
```
#### 3.页面中引用
* 在需要插入的页面引用
```html
<faicon type="glass" color="#000000" size="20"></faicon>
```

#### 4.属性
|属性|类型|默认值|说明|
|----|----|----|
|type|String|空|详细图标值【[查看](http://fontawesome.dashgame.com/)】|
|color|String|#333|16进制颜色值|
|size|Number|18|图标大小（px）|
|fw|Boolean|false|等宽（适用于列表对齐） `<faicon type="home" fw></faicon>`|
|spin|Boolean|false|旋转 `<faicon type="home" spin></faicon>`|
|pulse|Boolean|false|快速旋转 `<faicon type="home" pulse></faicon>`|
|left|Boolean|false|方向朝左 默认朝上 `<faicon type="home" left></faicon>`|
|right|Boolean|false|方向朝右 默认朝上 `<faicon type="home" right></faicon>`|
|down|Boolean|false|方向朝下 默认朝上 `<faicon type="home" down></faicon>`|

# 更新内容
* 2019-04-11 更新
	* 主要优化图标预览界面
* 2019-04-03 更新
	* 去除默认等宽设置，增加等宽属性fw 需要的地方添加即可
	* 增加三种属性 spin,pulse,fw 详情见文档
	* 优化界面增加分类方便查看
* 2019-04-01 更新
	* 紧急修复微信小程序新版框架下报：VM1823:5 Some selectors are not allowed in component wxss, including tag name selectors, ID selectors, and attribute selectors.(./components/fa-icon/fa-icon.wxss:169:1)This wxss file is ignored. 的错误的问题
	* 优化组件大小。（去除base64、去除多余没用的css代码、直接获取服务器字体文件）
	* 说明文档增加属性栏
	* 字体图标增加等宽样式 默认开启
* 2019-01-14 更新
	* 增加更多图标 目前675个
* 2019-01-10 发布