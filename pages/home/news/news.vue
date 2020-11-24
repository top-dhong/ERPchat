<template>
	<view class="uni-tab-bar">
		<scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
			<view v-for="tab in tabBars" :key="tab.id" :class="['swiper-tab-list',par.NewsType==tab.NewsType ? 'active' : '']"
			 @click="onTapSwitch(tab.NewsType)"><text>{{tab.name}}</text></view>
		</scroll-view>
		<view class="pro-search">
			<view class="pro-inputbox">
				<input type="text" placeholder="新闻标题(点击完成搜索)" v-model="par.KeyWord" @confirm="search" placeholder-style="color:#ccc">
				<view class="searchbtnimg" @tap="search"><image src="../../../static/search.png" mode=""></image></view>
			</view>
		</view>
		<swiper class="swiper-box" duration="300">
			<swiper-item>
				<scroll-view class="list" scroll-y @scrolltolower="onTapReachBottom">
					<block v-for="(Onew,idx1) in dataList" :key="idx1">
							<view class="medialist" @click="goDetail(Onew.Url)">

							<view class="media-tit"><image v-if="Onew.Url.indexOf('rar')!=-1" src="https://wx.shine-town.com/WX/wximg/static/puter5.png" mode=""></image><image v-else src="https://wx.shine-town.com/WX/wximg/static/puter4.png" mode=""></image><text class="pl20">{{Onew.NewsName||''}}</text></view>
						</view>
					</block>
					<view class="uni-tab-bar-loading">
						<uni-load-more :contentText="loadingText" :status="status" :showIcon="true"></uni-load-more>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>
<script>
	import uniLoadMore from '@/components/uni-load-more.vue';
	let util = require('@/common/util.js');
	let downRead = require('@/common/js/downRead.js');
	let isdoing = false//文章是否已打开
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				par:{
					IdxPage: 1,
					PageCount: 15,
					NewsType:'全部',
					KeyWord:''
				},
				tabid: 1, //初始化tabid=1
				status: 'more', //上拉的状态：loading正在加载；more上拉加载更多；noMore-没有更多了
				loadingText: {
					contentdown: '上拉加载更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				scrollLeft: 0,
				refreshText: '下拉可以刷新',
				dataList:[],
				tabBars: [{//NewsType取值：全部、新闻、红文、公告、制度
					name: '全部',
					NewsType:'全部',
					id: 1
				}, {
					name: '新闻',
					NewsType:'新闻',
					id: 2
				}, {
					name: '红头',
					NewsType:'红头',
					id: 3
				}, {
					name: '公告',
					NewsType:'公告',
					id: 4
				}, {
					name: '制度',
					NewsType:'制度',
					id: 5
				}],
				//KeyWord:''//检索字段
			}
		},
		onLoad(o){
			let that = this
            if("zd"==o.t){
                that.onTapSwitch("制度");
                return
            }
			let par = {
					IdxPage: 1,
					PageCount: 15,
					NewsType:'全部',
					KeyWord:''
				}
			that.getData(par,false)
		},
		methods: {
			//切换tap
			onTapSwitch(type){
				let that = this
				let par = that.par
				if(par['NewsType']==type){return}
				par['NewsType'] = type
				par['IdxPage'] = 1
				par['KeyWord']=''
				that.status = 'more'
				that.getData(par,false)
			},
			//上拉加载更多
			onTapReachBottom(){
				console.log('上拉加载更多')
				let that = this
				let par = that.par
				par['IdxPage'] = par['IdxPage']+1
				that.getData(par,true)
			},
			//par{RowNumBegin,RowNumEnd}
			getData(par,b) {
				let that = this
				if('noMore'==that.status){return}
				par['UserGUID'] = util.chkLogin()
				util.uniFly.post({
					url: that.RP.WX_GETCOMMONNEWS,
					params: par
				}).then(function(res) {
					if (typeof(res) != 'undefined' && res.status == 200) {
						let data = res.data
						if(typeof(data)!='undefined'&&data.errNo==0){
							let arr = (res.data.retVal)
							if(that.par.PageCount>arr.length){
								that.status = "noMore"
							}
							if(b){
								that.dataList = that.dataList.concat(arr);
							}else{
								that.dataList = arr;
							}
							console.log(that.dataList)
						}
					}
				})
			},
			search() {
				let that = this
				let par = that.par
				par['IdxPage'] = 1
				that.status = 'more'
				that.getData(par,false)
			},
			//这里使用小程序下载预览的功能
			goDetail(Url){
				console.log('Url',Url)
				if(isdoing){return}
				isdoing = true
				if(!Url){
					util.log('Url不合法')
					isdoing = false
					return
				}
				 downRead.downRead(Url,null,function(){
					 isdoing = false
				 },function(err){
					util.log(err)
					isdoing = false
				 })
			}
		}
	}
</script>
<style>
	page {
		height: 100%;
		font-size: 12px;
		line-height: 1.8;
	}

	.drawerbox {
		padding: 0;
		height: 100%;
	}

	.uni-title {
		display: block;
		width: 190upx;
		font-size: 32upx;
		color: #424141;
		padding: 0;
		border-right: 1px solid #ECECEC;
	}

	.uni-title view {
		display: block;
		line-height: 100upx;
		text-align: center;
		position: relative;
		border-bottom: 1upx solid #eee;
		white-space: nowrap;
		overflow: hidden;
	}
	.uni-title view.active{
		color: #FF5800;
	}
	.uni-title view.active:before{
		content: '';
		position: absolute;
		left: 0;
		width: 10upx;
		height: 100upx;
		top: 0;
		background: #FF5800;
	}

	.product-box {
		display: block;
		width: 480upx;
		padding: 0 9upx;
	}

	.pro-cell.on {
		color: #F65332;
		border-color: #F65332;
	}

	.pro-cell {
		display: inline-block;
		float: left;
		text-align: center;
		line-height: 60upx;
		width: 200upx;
		border: 2upx solid #9F9F9F;
		border-radius: 7upx;
		font-size: 28upx;
		justify-content: center;
		align-items: center;
		margin-top: 40upx;
		margin-left: 25upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.media-tit text{display: inline-block;vertical-align: middle;}
	.media-tit image{width: 64upx;height: 53upx;vertical-align: middle;}
	.media-tit .pl20{width: 540upx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
page {
    		font-size: 32upx;
    	}

    	page,
    	view {
    		display: flex;
    		box-sizing: border-box;
    	}

    	page {
    		display: flex;
    		min-height: 100%;
    		background-color: #EFEFEF;
    	}

    	template {
    		display: flex;
    		flex: 1;
    	}
</style>
