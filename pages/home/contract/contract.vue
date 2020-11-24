<template>
	<view class="uni-tab-bar">
		<view class="pro-search seach-title">
			<view class="pro-inputbox pro-input-search">
				<input type="text" placeholder="合同名称/合同编号/对方单位" v-model="par.KeyWord" @confirm="search" placeholder-style="color:#ccc">
				<view class="searchbtnimg" @tap.stop="search">
					<image src="../../../static/search.png" mode=""></image>
				</view>
			</view>
			<view style="padding-top: 8rpx;padding-right: 8rpx;" @click="chgDrawer">
				<text style="color:#409EFF;font-size: 25rpx;">筛选</text>
				<faicon type="filter" color="#C0C0C0" size="40"></faicon>
			</view>
		</view>
		<swiper class="swiper-box" duration="300">
			<swiper-item>
				<scroll-view class="list" scroll-y @scrolltolower="onTapReachBottom">
					<block v-for="(Onew,oidx) in dataList" :key="oidx">
						<view class="medialist" @click="goDetail(Onew.ConGUID)">
							<view class="media-tit">
								<image src="https://wx.shine-town.com/WX/wximg/static/puter2.png" mode=""></image>
								<text class="pl20 state-theme">{{Onew.ConName}}</text>
							</view>
							<view class="media-view">归属项目:<text>{{Onew.ProjectName}}</text></view>
							<view class="media-view">合同编号:
							<text>{{Onew.ConNo}}</text>
							<view class="faicon-icon-copy" @tap.stop="tapCipr(Onew.ConNo);">
								<faicon type="clone" color="#000" size="28"></faicon>
							</view>
							</view>
							<view class="media-view">合同金额:<text>{{Onew.ConMoney||''}}</text></view>
							<view class="media-view">供应商/乙方:<text>{{Onew.ProvName||''}}</text></view>
							<!-- <view class="media-view">签订日期:<text>{{Onew.SignDate||''}}</text></view> -->
						</view>
					</block>
					<view class="uni-tab-bar-loading">
						<uni-load-more :contentText="loadingText" :status="status" :showIcon="true"></uni-load-more>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		<!-- 抽屉 -->
		<uni-drawer :visible="isDrawer" :model="right" @close="chgDrawer">
			<view style="display: flex;flex-direction: row;flex: 1;">
				<button class="uni-button drawer-title">请选取合同归属项目</button>
			</view>
			<view style="border-top: 1rpx solid #ececec;margin-top: 0rpx;">
				<scroll-view scroll-y class="drawer-ti">
					<mix-tree :list="lista" @treeItemClick="treeItemClick"></mix-tree>
				</scroll-view>
			</view>
			<view class="footerbtn">
				<view class="colbtn on" @tap="tapDrawerOK">完成</view>
				<view class="colbtn" @tap="chgDrawer">返回</view>
			</view>
		</uni-drawer>
	</view>
</template>
<script>
	import uniLoadMore from '@/components/uni-load-more.vue';
	import uniDrawer from "@/components/uni-drawer/uni-drawer.vue";
	import mixTree from '@/components/mix-tree/mix-tree.1';
	import faicon from '@/components/fa-icon/fa-icon.vue'
	let util = require('@/common/util.js');
	export default {
		components: {
			uniLoadMore,
			uniDrawer,
			mixTree,
			faicon
		},
		data() {
			return {
				par:{
					IdxPage: 1,
					PageCount: 15,
					ProjGUID:'',
					KeyWord:''
				},
				treepar:{//加载树形菜单参数
					ProjectName:'',
					PGUID:''
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
				isDrawer:!1,
				lista:[],
                HDTree:null//缓存树
			}
		},
		onLoad(){
			let that = this
			let par = that.par
			that.getData(par,false)
		},
		methods: {
			//筛选点击完成
			tapDrawerOK(){
				let that = this
				that.chgDrawer();
				that.status = 'more'
				let par = that.par
				par['IdxPage'] = 1
				par['KeyWord']=''
				par['ProjGUID']=that.treepar['GUID']||''
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
                par.UserGUID = util.chkLogin()
				if('noMore'==that.status){return}
				util.uniFly.post({
					url: that.RP.WX_GETCONLIST,
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
			chgDrawer(){
				let that = this
				that.isDrawer = !that.isDrawer
				if(that.isDrawer){
					that.treepar.ProjectName = ''
					that.par.ProjectName = ''
					that.treepar.PGUID = ''
					that.par['PGUID'] = ''
					that.tapShaiXuan()
				}
			},
			//筛选数据-显示树形菜单-更换筛选变量
			tapShaiXuan(){
				let that = this
                //拉取菜单数据
                function getTreeData(f){
                    if(that.HDTree){
                        f(that.HDTree);
                        return
                    }
                    let UserGUID = util.chkLogin()
                    util.uniFly.post({
                    	url: that.RP.WX_GETPROJECTINFOTREE,
                    	params: {UserGUID}
                    }).then(function(res) {
                    	if (typeof(res) != 'undefined' && res.status == 200) {
                    		let data = res.data
                    		if(typeof(data)!='undefined'&&data.errNo==0){
                    			let arr = (res.data.retVal);
                                that.HDTree = arr;
                    			f(arr)
                    		}else{
                    			that.HMmessages.show(data.errDesc,{icon:'error',duration:2e3});
                    		}
                    	}
                    })
                }
				getTreeData((arr)=>{
                    that.toTree(arr,function(arrTree){
                    	setTimeout(()=>{that.lista =arrTree},100)
                    });
                })
			},
			toTree(data,fun) {
				let that = this
				// 删除 所有 children,以防止多次调用
				data.forEach(function (item) {
					delete item.children;
				});
				// 将数据存储为 以 id 为 KEY 的 map 索引数据列
				let map = {};
				data.forEach(function (item) {
					map[item.GUID] = item;
				});
				let val = [];
				data.forEach(function (item) {
					// 以当前遍历项，的pid,去map对象中找到索引的id
					let parent = map[item.PGUID];
					// 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
					if (parent) {
						(parent.children || ( parent.children = [] )).push(item);
					} else {
						//如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
						val.push(item);
					}
				});
				fun(val);
			},
			//点击最后一级时触发该事件
			treeItemClick(item) {
				let that = this
				let {
					GUID,
					PGUID,
					ProjectName
				} = item;
				that.treepar.GUID = GUID
				that.treepar.PGUID = PGUID
				console.log(item)
			},
			search() {
				let that = this
				let par = that.par
				par['IdxPage'] = 1
				that.status = 'more'
                par['ProjGUID'] = '';
				that.getData(par,false)
			},
			goDetail(ConGUID){
				uni.navigateTo({
					url: `./contractDetail?ConGUID=${ConGUID}`
				})
			},
			tapCipr(txt){
			    util.tapCipr(txt)
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
	.seach-title{
		display: flex;
		flex-direction: row;
	}
	.pro-input-search{
		height: 60upx;align-self: center;background: #f2f2f2;border-radius: 30upx;width: 600upx;margin: 0 auto;box-sizing: border-box;align-items: center;position: relative;
	}
	.faicon-icon-copy{
		margin-top: 10rpx;
		margin-left: 8rpx;
	}
	.drawer-ti{
		/* height: 1080rpx; */
        top: 78rpx;
        bottom: 77rpx;
        position: fixed;
        overflow-y:scroll;
		flex: 2;
		overflow:auto;
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
