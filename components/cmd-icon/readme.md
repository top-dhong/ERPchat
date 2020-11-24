### cmdIcon 图标

图标组件名：``cmd-icon``，代码块： cmdIcon。

**使用方式：**

在 ``script`` 中引用组件 

```javascript
import cmdIcon from "@/components/cmd-icon/cmd-icon.vue"
export default {
    components: {cmdIcon}
}
```

在 ``template`` 中使用组件

```html
<cmd-icon type="blocked" size="30" color="#654321"></cmd-icon>
```

**cmdIcon 属性说明：**

|属性名		|类型|默认值	|说明|
|---|----|---|---|
|type	|String	|-|图标图案，参考下表|
|color	|String	|-|图标颜色	|
|size	|Number	|24|图标大小|
|@click	|EventHandle|-|点击 Icon 触发事件|

**type 类型：**

主要

analytics  <cmd-icon type="blocked" size="30" color="#654321"></cmd-icon>
bell  <cmd-icon type="bell" size="30" color="#654321"></cmd-icon>
blocked  <cmd-icon type="blocked" size="30" color="#654321"></cmd-icon>
bookmark  <cmd-icon type="bookmark" size="30" color="#654321"></cmd-icon>
bullet-list  <cmd-icon type="bullet-list" size="30" color="#654321"></cmd-icon>
calendar  <cmd-icon type="calendar" size="30" color="#654321"></cmd-icon>
add-circle  <cmd-icon type="add-circle" size="30" color="#654321"></cmd-icon>
subtract-circle  <cmd-icon type="subtract-circle" size="30" color="#654321"></cmd-icon>
check-circle  <cmd-icon type="check-circle" size="30" color="#654321"></cmd-icon>
close-circle  <cmd-icon type="close-circle" size="30" color="#654321"></cmd-icon>
add  <cmd-icon type="add" size="30" color="#654321"></cmd-icon>
subtract  <cmd-icon type="subtract" size="30" color="#654321"></cmd-icon>
check  <cmd-icon type="check" size="30" color="#654321"></cmd-icon>
close  <cmd-icon type="close" size="30" color="#654321"></cmd-icon>
clock  <cmd-icon type="clock" size="30" color="#654321"></cmd-icon>
credit-card  <cmd-icon type="credit-card" size="30" color="#654321"></cmd-icon>
download-cloud  <cmd-icon type="download-cloud" size="30" color="#654321"></cmd-icon>
download  <cmd-icon type="download" size="30" color="#654321"></cmd-icon>
equalizer  <cmd-icon type="equalizer" size="30" color="#654321"></cmd-icon>
external-link  <cmd-icon type="external-link" size="30" color="#654321"></cmd-icon>
eye  <cmd-icon type="eye" size="30" color="#654321"></cmd-icon>
filter  <cmd-icon type="filter" size="30" color="#654321"></cmd-icon>
folder  <cmd-icon type="folder" size="30" color="#654321"></cmd-icon>
heart  <cmd-icon type="heart" size="30" color="#654321"></cmd-icon>
heart-2  <cmd-icon type="heart-2" size="30" color="#654321"></cmd-icon>
star  <cmd-icon type="star" size="30" color="#654321"></cmd-icon>
star-2  <cmd-icon type="star-2" size="30" color="#654321"></cmd-icon>
help  <cmd-icon type="help" size="30" color="#654321"></cmd-icon>
alert-circle  <cmd-icon type="alert-circle" size="30" color="#654321"></cmd-icon>
home  <cmd-icon type="home" size="30" color="#654321"></cmd-icon>
iphone-x  <cmd-icon type="iphone-x" size="30" color="#654321"></cmd-icon>
iphone  <cmd-icon type="iphone" size="30" color="#654321"></cmd-icon>
lightning-bolt  <cmd-icon type="lightning-bolt" size="30" color="#654321"></cmd-icon>
link  <cmd-icon type="link" size="30" color="#654321"></cmd-icon>
list  <cmd-icon type="list" size="30" color="#654321"></cmd-icon>
lock  <cmd-icon type="lock" size="30" color="#654321"></cmd-icon>
mail  <cmd-icon type="mail" size="30" color="#654321"></cmd-icon>
map-pin  <cmd-icon type="map-pin" size="30" color="#654321"></cmd-icon>
menu  <cmd-icon type="menu" size="30" color="#654321"></cmd-icon>
message  <cmd-icon type="message" size="30" color="#654321"></cmd-icon>
money  <cmd-icon type="money" size="30" color="#654321"></cmd-icon>
numbered-list  <cmd-icon type="numbered-list" size="30" color="#654321"></cmd-icon>
phone  <cmd-icon type="phone" size="30" color="#654321"></cmd-icon>
search  <cmd-icon type="search" size="30" color="#654321"></cmd-icon>
settings  <cmd-icon type="settings" size="30" color="#654321"></cmd-icon>
share-2  <cmd-icon type="share-2" size="30" color="#654321"></cmd-icon>
share  <cmd-icon type="share" size="30" color="#654321"></cmd-icon>
shopping-bag-2  <cmd-icon type="shopping-bag-2" size="30" color="#654321"></cmd-icon>
shopping-bag  <cmd-icon type="shopping-bag" size="30" color="#654321"></cmd-icon>
shopping-cart  <cmd-icon type="shopping-cart" size="30" color="#654321"></cmd-icon>
streaming  <cmd-icon type="streaming" size="30" color="#654321"></cmd-icon>
tag  <cmd-icon type="tag" size="30" color="#654321"></cmd-icon>
tags  <cmd-icon type="tags" size="30" color="#654321"></cmd-icon>
trash  <cmd-icon type="trash" size="30" color="#654321"></cmd-icon>
upload  <cmd-icon type="upload" size="30" color="#654321"></cmd-icon>
user  <cmd-icon type="user" size="30" color="#654321"></cmd-icon>
loading  <cmd-icon type="loading" size="30" color="#654321"></cmd-icon>
loading-2  <cmd-icon type="loading-2" size="30" color="#654321"></cmd-icon>
loading-3  <cmd-icon type="loading-3" size="30" color="#654321"></cmd-icon>

文件

file-audio  <cmd-icon type="file-audio" size="30" color="#654321"></cmd-icon>
file-code  <cmd-icon type="file-code" size="30" color="#654321"></cmd-icon>
file-generic  <cmd-icon type="file-generic" size="30" color="#654321"></cmd-icon>
file-jpg  <cmd-icon type="file-jpg" size="30" color="#654321"></cmd-icon>
file-new  <cmd-icon type="file-new" size="30" color="#654321"></cmd-icon>
file-png  <cmd-icon type="file-png" size="30" color="#654321"></cmd-icon>
file-svg  <cmd-icon type="file-svg" size="30" color="#654321"></cmd-icon>
file-video  <cmd-icon type="file-video" size="30" color="#654321"></cmd-icon>

文本

align-center  <cmd-icon type="align-center" size="30" color="#654321"></cmd-icon>
align-left  <cmd-icon type="align-left" size="30" color="#654321"></cmd-icon>
align-right  <cmd-icon type="align-right" size="30" color="#654321"></cmd-icon>
edit  <cmd-icon type="edit" size="30" color="#654321"></cmd-icon>
font-color  <cmd-icon type="font-color" size="30" color="#654321"></cmd-icon>
text-italic  <cmd-icon type="text-italic" size="30" color="#654321"></cmd-icon>
text-strikethrough  <cmd-icon type="text-strikethrough" size="30" color="#654321"></cmd-icon>
text-underline  <cmd-icon type="text-underline" size="30" color="#654321"></cmd-icon>

箭头
arrow-up  <cmd-icon type="arrow-up" size="30" color="#654321"></cmd-icon>
arrow-down  <cmd-icon type="arrow-down" size="30" color="#654321"></cmd-icon>
arrow-left  <cmd-icon type="arrow-left" size="30" color="#654321"></cmd-icon>
arrow-right  <cmd-icon type="arrow-right" size="30" color="#654321"></cmd-icon>
chevron-up  <cmd-icon type="chevron-up" size="30" color="#654321"></cmd-icon>
chevron-down  <cmd-icon type="chevron-down" size="30" color="#654321"></cmd-icon>
chevron-left  <cmd-icon type="chevron-left" size="30" color="#654321"></cmd-icon>
chevron-right  <cmd-icon type="chevron-right" size="30" color="#654321"></cmd-icon>

媒体控制

play  <cmd-icon type="play" size="30" color="#654321"></cmd-icon>
pause  <cmd-icon type="pause" size="30" color="#654321"></cmd-icon>
stop  <cmd-icon type="stop" size="30" color="#654321"></cmd-icon>
prev  <cmd-icon type="prev" size="30" color="#654321"></cmd-icon>
next  <cmd-icon type="next" size="30" color="#654321"></cmd-icon>
reload  <cmd-icon type="reload" size="30" color="#654321"></cmd-icon>
repeat-play  <cmd-icon type="repeat-play" size="30" color="#654321"></cmd-icon>
shuffle-play  <cmd-icon type="shuffle-play" size="30" color="#654321"></cmd-icon>
playlist  <cmd-icon type="playlist" size="30" color="#654321"></cmd-icon>
sound  <cmd-icon type="sound" size="30" color="#654321"></cmd-icon>
volume-off  <cmd-icon type="volume-off" size="30" color="#654321"></cmd-icon>
volume-minus  <cmd-icon type="volume-minus" size="30" color="#654321"></cmd-icon>
volume-plus  <cmd-icon type="volume-plus" size="30" color="#654321"></cmd-icon>

多媒体

camera  <cmd-icon type="camera" size="30" color="#654321"></cmd-icon>
image  <cmd-icon type="image" size="30" color="#654321"></cmd-icon>
video  <cmd-icon type="video" size="30" color="#654321"></cmd-icon>
sketch  <cmd-icon type="sketch" size="30" color="#654321"></cmd-icon>

