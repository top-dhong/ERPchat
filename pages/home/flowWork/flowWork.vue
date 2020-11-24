<template>
	<view class="uni-tab-bar">
		<scroll-view id="tab-bar" class="uni-swiper-tab swiper-tab-my" scroll-x :scroll-left="scrollLeft">
			<view v-for="tab in tabBars" :key="tab.id" :class="['swiper-tab-list',(par.TaskType==tab.TaskType) ? 'active' : '']"
			 @click="onTapSwitch(tab.TaskType)"><text>{{tab.name}}</text></view>
		</scroll-view>
		<view class="redw-stat">
			<picker @change="bindPickerChange" :value="index" :range="stateArr">
			    <view class="uni-input redw-stat-txt">状态:{{stateArr[index]}}</view>
			</picker>
		</view>
		<view class="pro-search seach-title">
			<view class="pro-inputbox pro-input-search">
				<input type="text" placeholder="流程名称/流程编号(点击完成搜索)" v-model="par.KeyWord" @confirm="search" placeholder-style="color:#ccc">
				<view class="searchbtnimg" @tap.stop="search">
					<image src="../../../static/search.png" mode=""></image>
				</view>
			</view>
			<view style="padding-top: 8rpx;padding-right: 8rpx;" @click="chgDrawer">
				<text style="color:#409EFF;font-size: 25rpx;">筛选</text>
				<faicon type="filter" color="#C0C0C0" size="40"></faicon>
			</view>
		</view>
		<swiper class="swiper-box" duration="300" :current="currentTab" @change="swiperTab">
			<swiper-item>
				<scroll-view class="list" scroll-y @scrolltolower="onTapReachBottom">
					<block v-for="Onew in taskList" :key="Onew.id">
						<view class="medialist" @tap="goMyDetail(''+Onew.FlowGUID);">
							<view class="media-tit">
								<image src="https://wx.shine-town.com/WX/wximg/static/puter.png" mode=""></image>
								<text class="pl20 state-theme">{{Onew.Subject}}</text>
								<text v-if="'Wait'==par.TaskType&&0<Onew.DoTimeout" :class="(Onew.DoTimeout<=24)?'class2':'class1'">(剩{{Onew.DoTimeout||''}}h)</text>
								<text v-if="'Wait'==par.TaskType&&'-1'==Onew.DoTimeout" class="class2">(已超时)</text>
								<text v-if="'未查看'==Onew.State" style="color: red;font-size: 0.7em;margin-right: 0upx;">{{Onew.State}}</text>
							</view>
							<view class="media-view">流程编号:
							<text>{{Onew.BillID}}</text>
							<view class="faicon-icon-copy" @tap.stop="tapCipr(Onew.BillID+'');">
								<faicon type="clone" color="#000" size="28"></faicon>
							</view>
							</view>
							<view class="media-view">创建时间:<text>{{Onew.CreateDate}}</text></view>
							<view class="media-view">当前节点:<text>{{Onew.IndexNodeName||''}}</text></view>
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
				<button class="uni-button drawer-title" :class="[(treepar.ViewClass==item.ViewClass) ? 'active' : '']" v-for="(item,idx2) in arrClass" :key="idx2" @tap="tapChgViewClass(item.ViewClass)">{{item.txt}}</button>
			</view>
			<view class="drawer-one" style="border-top: 1rpx solid #ececec;margin-top: 20rpx;">
				<scroll-view scroll-y class="drawer-ti">
					<mix-tree :list="lista" @treeItemClick="treeItemClick"></mix-tree>
				</scroll-view>
				<view class="uni-padding-wrap drawer-two" style="border-left: 1rpx solid #ececec;">
					<view class="uni-title" style="width: 100%;margin-left: 10rpx;">查询时间</view>
					<view class="uni-list">
						<radio-group @change="radioChange">
							<label class="uni-list-cell uni-list-cell-pd shorow" v-for="(item, idx3) in arrMouth" :key="item.value">
								<view>
									<radio :value="item.value" :checked="item.value == treepar.TimeArea" />
								</view>
								<view>{{item.name}}</view>
							</label>
						</radio-group>
					</view>
				</view>
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
	import mixTree from '@/components/mix-tree/mix-tree';
	import faicon from '@/components/fa-icon/fa-icon.vue'
	let util = require('@/common/util.js');
	let downRead = require('@/common/js/downRead.js');

	export default {
		components: {
			uniLoadMore,
			uniDrawer,
			mixTree,
			faicon
		},
		data() {
			return {
				par:{//列表参数
					IdxPage: 1,
					PageCount: 10,
					TaskType:'Wait',
					KeyWord:'',
					State:'全部',
					TimeArea:36500,
					ViewClass:'',
					ClassGUID:'',
					ParentGUID:''
				},
				treepar:{//加载树形菜单参数 TasksType从par中获取
					ViewClass:'FlowClass',
					TimeArea:36500,
					ClassGUID:'',//最后筛选需要提交的ClassGUID  以逗号分隔
					ParentGUID:''//最后筛选需要提交的ParentGUID
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
				taskList: [], //列表数组
				tabBars: [{//Wait/待办，Complete/已办，SelfCreate/发起，MakeCopy/传阅
					name: '待办',
					TaskType:'Wait',
					id: 1
				}, {
					name: '已办',
					TaskType:'Complete',
					id: 2
				}, {
					name: '发起',
					TaskType:'SelfCreate',
					id: 3
				}, {
					name: '传阅',
					TaskType:'MakeCopy',
					id: 4
				}],
				dateFtt:util.dateFtt,
				index:0,
				stateArr:['全部','已读','未读'],
				lista:[],
				isDrawer:!1,
				arrMouth:[{
                    value: 36500,
                    name: '全部'
                },
                {
                    value: 90,
                    name: '近三月'
                },
                {
                    value: 30,
                    name: '近一月'
                },
                {
                    value: 15,
                    name: '近半月'
                },
                {
                    value: 7,
                    name: '近七天'
                },{
                    value: 3,
                    name: '近三天'
                }],
				currentMouth:0,
				arrClass:[{txt:'类型',ViewClass:'FlowClass'},{txt:'部门',ViewClass:'DeptClass'},{txt:'项目',ViewClass:'ProjectClass'}],
				cacheTreeObj:{},//缓存树结果集 结构 key:TasksType_ViewClass_TimeArea value:结果集数组
                isTapSX:false
			}
		},
		onLoad(o){
			let that = this
			if(o.tap){//存在tap切换状态参数直接加载
				that.onTapSwitch(o.tap,o.state,true)
			}
		},
		onShow(){
			let that = this
			that.curRefresh()
		},
		methods: {
			//筛选点击完成
			tapDrawerOK(){
				let that = this
				that.chgDrawer();
				let par = that.par
				//par['UserGUID'] = util.chkLogin()
				par['TaskType'] = that.par.TaskType
				par['IdxPage'] = 1
				par['KeyWord']=''
				that.index = 0
				that.par.State = that.stateArr[that.index]
				that.status = 'more'
				par['State'] = that.par.State
				that.par.ViewClass = that.treepar.ViewClass
				par['ViewClass'] = that.par.ViewClass
				that.par.ClassGUID = that.treepar.ClassGUID
				par['ClassGUID'] = that.par.ClassGUID
				that.par.ParentGUID = that.treepar.ParentGUID
				par['ParentGUID'] = that.par.ParentGUID
				that.par.TimeArea = that.treepar.TimeArea
				par['TimeArea'] = that.par.TimeArea
				that.getData(par,false)
			},
			tapChgViewClass(ViewClass){
				let that = this
				that.treepar['ViewClass'] = ViewClass
				that.tapShaiXuan()
			},
			radioChange(e){
				let that = this
				that.treepar['TimeArea'] = e.detail.value
				that.tapShaiXuan()
			},
			//筛选数据-显示树形菜单-更换筛选变量
			tapShaiXuan(TaskType){
				let that = this
				//拉取菜单数据
				let par = {}
				par['UserGUID'] = util.chkLogin()
				par['TasksType'] = that.par.TaskType
				par['ViewClass'] = that.treepar['ViewClass']
				//根据流程状态初始化筛选时间
				let tmpObj001 = {'Wait':36500,'Complete':15,'SelfCreate':15,'MakeCopy':15}
				that.treepar['TimeArea'] = tmpObj001[TaskType]||that.treepar['TimeArea']
				par['TimeArea'] = that.treepar['TimeArea']
				if(that.cacheTreeObj[`${par.TasksType}_${par.ViewClass}_${par.TimeArea}`]){
					that.toTree(that.cacheTreeObj[`${par.TasksType}_${par.ViewClass}_${par.TimeArea}`],function(arrTree){
						setTimeout(()=>{that.lista =arrTree},400)
					});
					return
				}
				util.uniFly.post({
					url: that.RP.WX_GETFLOWTYPELIST,
					params: par
				}).then(function(res) {
					if (typeof(res) != 'undefined' && res.status == 200) {
						let data = res.data
						if(typeof(data)!='undefined'&&data.errNo==0){
							let arr = (res.data.retVal)
							that.cacheTreeObj[`${par.TasksType}_${par.ViewClass}_${par.TimeArea}`] = arr
							that.toTree(arr,function(arrTree){
								setTimeout(()=>{that.lista =arrTree},100)
							});
						}else{
							that.HMmessages.show(data.errDesc,{icon:'error',duration:2e3});
						}
					}
				})
			},
			chgDrawer(){
				let that = this
				that.isDrawer = !that.isDrawer
				if(that.isDrawer){
                    //控制自助筛选过一次后不再重新初始化树形菜单
                    if(that.isTapSX){return}
                    that.isTapSX = true
					that.treepar.ClassGUID = ''
					that.par.ClassGUID = ''
					that.treepar.ParentGUID = ''
					that.par['ParentGUID'] = ''
					let TaskType = that.par.TaskType
					that.tapShaiXuan(TaskType)
					//setTimeout(function() {that.lista = testList;}, 500);
				}
			},
			swiperTab(e) {
				console.log(e)
				let index = e.detail.current //获取索引
				console.log(index)
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
					map[item.KeyID] = item;
				});
				let val = [];
				data.forEach(function (item) {
					// 以当前遍历项，的pid,去map对象中找到索引的id
					let parent = map[item.PKeyID];
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
					KeyID,
					ClassName,
					PKeyID,
					ClassGUID,
					ParentGUID
				} = item;
				that.treepar.ClassGUID = ClassGUID
				that.treepar.ParentGUID = ParentGUID
				console.log(item)
			},
			//当前需要刷新的页面
			curRefresh(){
				let that = this;
				let pages = getCurrentPages();
				let currPage = pages[pages.length-1];
				if (currPage.data.isDoRefresh == true){
					currPage.data.isDoRefresh = false;
					let par = that.par
					par['IdxPage'] = 1
					that.index = that.index||0
					par.State = that.stateArr[that.index]
					that.status = 'more'
					par['ClassGUID'] = ''
					par['ViewClass'] = ''
					par['TimeArea'] = 36500
					that.getData(par,false)
				}else{
					let par = that.par
					par['IdxPage'] = 1
					that.index = that.index||0
					par.State = that.stateArr[that.index]
					that.status = 'more'
					par['ClassGUID'] = ''
					par['ViewClass'] = ''
					par['TimeArea'] = 15
					if('Wait'==par['TaskType']){
						par['TimeArea'] = 36500
					}
					if('MakeCopy'==par['TaskType']){
						that.index = 2
						that.par.State = that.stateArr[that.index]
						par['TimeArea'] = 36500
					}
                    //如果有搜索key就加载长时间段的数据
                    if(par['KeyWord']){
                        par['TimeArea'] = 36500
                    }
					that.getData(par,false)
				}
			},
			//切换读取状态
			bindPickerChange(e){
				let that = this
				let par = that.par
				let idx = e.detail.value
				par['IdxPage'] = 1
				that.index = idx
				par.State = that.stateArr[idx]
				that.status = 'more'
				par['ClassGUID'] = ''
				par['ParentGUID'] = ''
				par['ViewClass'] = ''
				par['TimeArea'] = 36500
				that.getData(par,false)
			},
			//切换tap  仅限切换tab时检索半月的流程
			//bo 是否首页点进来的  首页点进来的  时间范围改到最大
			//如果切换至传阅   显示未读
			onTapSwitch(type,State,bo){
				let that = this
				let par = that.par
				if(par['TaskType']==type){return}
				that.taskList = []//切换tab时清空list 防止继承上一个list数据影响显示
				par['TaskType'] = type
				par['IdxPage'] = 1
				par['KeyWord']=''
				that.index = State||0
				that.par.State = that.stateArr[that.index]
				that.status = 'more'
				par['ClassGUID'] = ''
				par['ParentGUID'] = ''
				par['ViewClass'] = ''
				par['TimeArea'] = 15
				if('Wait'==par['TaskType']||bo){
					par['TimeArea'] = 36500
				}
				if('MakeCopy'==par['TaskType']){
					that.index = 2
					that.par.State = that.stateArr[that.index]
					par['TimeArea'] = 36500
				}
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
				console.log('==>getData')
				par['UserGUID'] = util.chkLogin()
				util.uniFly.post({
					url: that.RP.WX_GETTASKLIST,
					params: par
				}).then(function(res) {
					if (typeof(res) != 'undefined' && res.status == 200) {
						let data = res.data
						if(typeof(data)!='undefined'&&data.errNo==0){
							let arr = data.retVal;
							if(that.par.PageCount>arr.length){
								that.status = "noMore";
							}
							if(b){
								that.taskList = that.taskList.concat(arr);
							}else{
								setTimeout(()=>{that.taskList = arr;},50)
							}
							console.log(',,',that)
						}
					}
				})
			},
			goMyDetail(id) {
				let that = this
				let TaskType = that.par.TaskType
				uni.navigateTo({
					url: `./flowWorkDetail?FlowGUID=${id}&TaskType=${TaskType}`
				});
			},
			search() {
				let that = this
				let par = that.par
				par['IdxPage'] = 1
				that.index = 0
				that.par.State = that.stateArr[0]
				that.status = 'more'
				par['ClassGUID'] = ''
				par['ParentGUID'] = ''
				par['ViewClass'] = ''
				par['TimeArea'] = 36500
				that.getData(par,false)
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

	.uni-title view.active {
		color: #FF5800;
	}

	.uni-title view.active:before {
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

	.media-tit text {
		display: inline-block;
		vertical-align: middle;
		margin-bottom: 10upx;
	}

	.media-tit image {
		width: 64upx;
		height: 53upx;
		vertical-align: middle;
	}

	.media-tit .pl20 {
		width: 450upx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.media-view {
		font-size: 28rpx;
		/* display: inline-block; */
	}
	.class1{
		font-size: 0.7em;
	}
	.class2{
		font-size: 0.7em;
		color: red;
	}
	.swiper-tab-my{
		/* width: 82%; */
	}
	.redw-stat{
		position: absolute;
		margin-top: -5rpx;
		margin-left: 620rpx;
		color: #FF5800;
	}
	.redw-stat-txt{
		padding-top: 35rpx;
		padding-left: 0rpx;
		color: #409EFF;
		font-size: 25rpx;
	}
/* 	.redw-stat-picker-center{
		display: inline-block;
		vertical-align: middle;
	} */
	.drawer-one{
		display: flex;
		flex-direction: row;
	}
	.drawer-ti{
		height: 1100rpx;
		flex: 2;
		overflow:auto;
	}
	.drawer-two{
		display: flex;
		flex-direction: column;
		flex: 1;
		width: 50rpx;
	}
	.drawer-two-but{
		padding-right: 5rpx;
	}
	.drawer-title{
		top: 10rpx;
		width: 200rpx;
		/* border-radius: 50rpx ; */
		/* border: .1rpx solid #C0C0C0; */
		font-size: 30rpx;
	}
	.colbtn{
		background: #E7E7E7;
	}
	.seach-title{
		display: flex;
		flex-direction: row;
	}
	.search-but{
		color: #409EFF;
	}
	.shorow{
		display: flex;
		flex-direction: row;
		margin: 10rpx auto 10rpx 10rpx;
	}
	.pro-input-search{
		height: 60upx;align-self: center;background: #f2f2f2;border-radius: 30upx;width: 600upx;margin: 0 auto;box-sizing: border-box;align-items: center;position: relative;
	}
	.faicon-icon-copy{
		margin-top: 10rpx;
		margin-left: 8rpx;
	}
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
