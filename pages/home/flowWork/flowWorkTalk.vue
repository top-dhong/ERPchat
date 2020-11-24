<template>
	<view class="index">
		<HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages" @clickMessage="clickMessage"></HMmessages>
		<view class="pro-item">
			<view class="pro-inputbox">
				<input type="text" placeholder="请输入人员姓名或部门名称查询" v-model="keyword" @confirm="search" placeholder-style="color:#ccc">
				<view class="searchbtnimg" @tap="search">
					<image src="../../../static/search.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="search-keyword" @touchstart="blur">
			<scroll-view class="keyword-list-box" v-show="isShowKeywordList" scroll-y>
				<view class="keyword-entry" hover-class="keyword-entry-tap" v-for="(row,idx1) in keywordList" :key="idx1" :index="idx1">
					<view class="keyword-text" @tap="doSearch(idx1)">
						<rich-text :nodes="row.htmlStr"></rich-text>
					</view>
					<!-- <view class="keyword-img" @tap="setkeyword(row)">
						<image src="/static/HM-search/back.png"></image>
					</view> -->
				</view>
			</scroll-view>
		</view>
		<view class="pro-item">
			<view class="pro-item-head">已选人员:</view>
			<view class="pro-item-box row-item-my">
				<view v-for="(item,idx1) in UsersCHK">
					<view>·</view>
					<text>{{item.UserName}}</text>
					<view class="faicon-icon-t" @tap="tapDelUser(idx1)">
						<faicon type="trash-o" color="#000" size="30"></faicon>
					</view>
				</view>
			</view>
		</view>
		<view class="pro-item">
			<view class="pro-item-head">沟通意见:</view>
			<view class="pro-item-box">
				<view class="uni-textarea">
					<textarea class="uni-textarea-dom" v-model="Opinion" @input="setOpinion" placeholder="请输入沟通意见" />
					</view>
			</view>
		</view>
		<view class="pro-item">
			<view class="uni-padding-wrap but-boot">
				<button class="uni-button but-coor-3" @tap="tapConsult">确定</button>
				<button class="uni-button btn-back" @tap="navigateBack">返回</button>
			</view>
		</view>
	</view>
</template>

<script>
	let util = require('@/common/util.js');
	let graceChecker = require('@/common/js/graceChecker.js')
	import HMmessages from '@/components/HM-messages/HM-messages.vue';
	import faicon from '@/components/fa-icon/fa-icon.vue'
	export default {
		components:{
			HMmessages,
			faicon
		},
		data() {
			return {
				isclick:false,//防止重复提交
				defaultKeyword: "",
				keyword: "",
				oldKeywordList: [],
				hotKeywordList: [],
				keywordList: [],
				forbid: '',
				isShowKeywordList: false,
				UsersCHK:[],//已选人员 
				FlowGUID:null,//提交参数
				//ConsultUserGUIDs:[],
				Opinion:''
			};
		},
		onLoad(o) {
			 let that = this;
			 that.TaskType = o.TaskType||''
			 that.FlowGUID = o.FlowGUID||''
		},
		methods: {
			//返回刷新   返回前调用
			preRefresh(){
				let pages = getCurrentPages();
				let currPage = pages[pages.length - 1]; //当前页面
				let prevPage = pages[pages.length - 2]; //上一个页面
				//直接调用上一个页面的setData()方法，把数据存到上一个页面中去
				prevPage.setData({
					isDoRefresh:true
				})
				util.navigateBack()
				//uni.navigateBack();
			},
			setOpinion(e){
				this.Opinion = e.detail.value
			},
			 search() {
				 let that = this
			 	//兼容引入组件时传入参数情况
			 	var keyword = that.keyword||'';
			 	if (!keyword) {
			 		that.keywordList = [];
			 		that.isShowKeywordList = false;
			 		return;
			 	}
			 	that.isShowKeywordList = true;
				let par = {KeyWord:keyword,IdxPage:1,PageCount:100};
				par['UserGUID'] = util.chkLogin()
				util.uniFly.post({
					url: that.RP.WX_GETUSERLIST,
					params: par
				}).then(function(res) {
					if (typeof(res) != 'undefined' && res.status == 200) {
						let data = res.data
						if(typeof(data)!='undefined'&&data.errNo==0){
							that.keywordList = that.drawCorrelativeKeyword(data.retVal, keyword);
						}else{
							that.HMmessages.show(data.errDesc,{icon:'error'});
						}
					}
				})
			 },
			 //高亮关键字  邓鸿
			 drawCorrelativeKeyword(keywords, keyword) {
			 	var len = keywords.length,
			 		keywordArr = [];
			 	for (var i = 0; i < len; i++) {
			 		var row = keywords[i];
			 		//定义高亮#9f9f9f
			 		var html = row.UserName.replace(keyword, "<span style='color: #9f9f9f;'>" + keyword + "</span>");
			 		html = '<div>' + html + '</div>';
			 		var tmpObj = {
			 			Obj: row,
			 			htmlStr: html
			 		};
			 		keywordArr.push(tmpObj)
			 	}
			 	return keywordArr;
			 },
			 doSearch(idx1){
				let that = this
				let keywordList = that.keywordList
				let Obj = keywordList[idx1].Obj
				console.log(',,',Obj)
				that.isShowKeywordList = false
				let isCHK = false
				for(const obj of that.UsersCHK){
					if(Obj.UserGUID==obj.UserGUID){isCHK = true;}
				}
				if(isCHK){return}//不能重复选取
				that.UsersCHK.push(Obj)
			 },
			 navigateBack(){
			 	util.navigateBack()
			 },
			 //移除已选人员
			 tapDelUser(idx){
				let that = this
				let info = that.UsersCHK[idx].UserName
				that.UsersCHK.splice(idx,1)  
				that.HMmessages.show(`已移除:${info}`);
			 },
			 //沟通提交
			 tapConsult(){
				let that = this
				if(that.isclick){return}
				that.isclick = true
				let ConsultUserGUIDs = [];
				for(const o in that.UsersCHK){
					ConsultUserGUIDs.push(that.UsersCHK[o].UserGUID)
				}
				let par = {}
				par['FlowGUID'] = that.FlowGUID;
				par['DoUserGUID'] = util.chkLogin()
				par['ConsultUserGUIDs'] = ConsultUserGUIDs.join(',');
				par['Opinion'] = that.Opinion;
				//表单验证  FlowGUID  DoUserGUID  ConsultUserGUIDs  Opinion
				let rule = [
					{ name: "FlowGUID", checkType: "notnull", checkRule: "", errorMsg: "流程不能为空" },
					{ name: "DoUserGUID", checkType: "notnull", checkRule: "", errorMsg: "操作用户不能为空" },
					{ name: "ConsultUserGUIDs", checkType: "notnull", checkRule: "", errorMsg: "请输入搜索并选取需要沟通的用户" },
					{ name: "Opinion", checkType: "notnull", checkRule: "", errorMsg: "请输入沟通意见" }
				];
				//老版特殊化规则
				let BossUserID = util.getDB('User')['UserID']
				if('00001'==BossUserID){
					rule = [
						{ name: "FlowGUID", checkType: "notnull", checkRule: "", errorMsg: "流程不能为空" },
						{ name: "DoUserGUID", checkType: "notnull", checkRule: "", errorMsg: "操作用户不能为空" },
						{ name: "ConsultUserGUIDs", checkType: "notnull", checkRule: "", errorMsg: "请输入搜索并选取需要沟通的用户" }
					];
				}
				if(graceChecker.check(par, rule)){
					console.log(',,',par)
					util.uniFly.post({
						url: that.RP.WX_FLOWCONSULT,
						params: par
					}).then(function(res) {
						that.isclick = false
						if (typeof(res) != 'undefined' && res.status == 200) {
							let data = res.data
							if(typeof(data)!='undefined'&&data.errNo==0){
								that.HMmessages.show('沟通成功!',{icon:'success'});
								setTimeout(function(){that.preRefresh()},1500)
							}else{
								that.HMmessages.show(data.errDesc,{icon:'error'});
							}
						}
					})
				}else{
					that.isclick=false
					that.HMmessages.show(graceChecker.error,{icon:'error'});
                }
			 },
		}
	}
</script>

<style>

	.pro-top {
		position: relative;
		width: 750upx;
		flex-direction: column;
	}

	.pinfobg {
		width: 750upx;
		height: 159upx;
		background: -webkit-linear-gradient(#FF5800, #FFAD2D);
		/* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(#FF5800, #FFAD2D);
		/* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(#FF5800, #FFAD2D);
		/* Firefox 3.6 - 15 */
		background: linear-gradient(#FF5800, #FFAD2D);
		/* 标准的语法 */
	}

	.pro-head {
		width: 700upx;
		margin: 0 25upx;
		border-radius: 14upx;
		padding: 34upx 0;
		background: #FFFFFF;
		position: absolute;
		top: 14upx;
		height: 120upx;
		flex-direction: column;
		box-sizing: border-box;
	}

	.piname {
		font-size: 36upx;
		color: #000;
		justify-content: center;
	}

	.pierdu {
		font-size: 32upx;
		color: #FF5800;
		justify-content: center;
		margin-top: 14upx;
	}

	.pi-item {
		flex-direction: column;
		flex: 1;
		overflow: hidden;
		margin-top: 36upx;
	}

	.pi-item-a {
		justify-content: center;
		color: #848484;
		font-size: 32upx;
	}

	.pi-item-b {
		color: #000;
		font-size: 26upx;
		margin-top: 20upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: block;
		text-align: center;
	}

	.blr {
		border-left: 1px solid #ececec;
		border-right: 1px solid #ececec;
	}

	.pro-item {
		width: 750upx;
		justify-content: flex-start;
		background: #FFFFFF;
		padding: 35upx 25upx;
		box-sizing: border-box;
		margin-bottom: 14upx;
		flex-direction: column;
	}

	.pro-item .pro-item-head {
		border-left: 15upx solid #FF5800;
		font-size: 32upx;
		color: #000000;
		padding-left: 20upx;
	}

	.pro-item text {
		color: #FFAD2D;
		margin-left: 26upx;
		font-size: 32upx;
	}

	.pro-item-box {
		flex-direction: column;
		margin-top: 20upx;
		border-top: 1px solid #ececec;
		width: 700upx;
		padding: 10upx 10upx;
		box-sizing: border-box;
	}

	.pro-item-cell {
		font-size: 24upx;
		color: #848484;
		margin-bottom: 10upx;
		line-height: 1.6;
	}

	.pro-item-cell .circlename {
		flex: 1;
		overflow: hidden;
		align-items: center;
		font-size: 28upx;
		color: #000000;
		padding-right: 20upx;
		box-sizing: border-box;
	}

	.pro-item-cell .circlename view {
		overflow: hidden;
		display: block;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.hascircle .pro-item-box {
		padding-right: 14rpx;
		padding-bottom: 0;
	}

	.hascircle .pro-item-cell {
		margin-bottom: 28upx;
	}

	.hascircle .pro-item-cell:last-child {
		margin-bottom: 0;
	}

	.pro-item-cell .stars {
		width: 150upx;
		align-items: center;
		justify-content: flex-start;
		overflow: hidden;
	}

	.gocircle {
		width: 150upx;
		height: 50upx;
		background: #FFAD2D;
		color: #FFFFFF;
		border-radius: 6upx;
		font-size: 24upx;
		align-items: center;
		justify-content: center;
	}
	
	
	
	.h1 {
	text-align: left;
	font-size: 30upx;
	font-weight: bold;
	padding: 10upx 0;
}
.wrap {
	margin: 20upx;
} 
.uni-textarea-dom {
	border:1px solid #cbcbcb;
	height: 220upx;
	border-radius: 10upx;
}
.search-keyword {width:100%;background-color:rgb(242,242,242);}
.keyword-list-box {height:calc(100vh - 110upx);background-color:#fff;}
	.keyword-entry-tap {background-color:#eee;}
	.keyword-entry {width:94%;height:80upx;margin:0 3%;font-size:30upx;color:#333;display:flex;justify-content:space-between;align-items:center;border-bottom:solid 1upx #e7e7e7;}
	.keyword-entry image {width:60upx;height:60upx;}
	.keyword-entry .keyword-text,.keyword-entry .keyword-img {height:80upx;display:flex;align-items:center;}
	.keyword-entry .keyword-text {width:90%;}
	.keyword-entry .keyword-img {width:10%;justify-content:center;}
	.keyword-box {height:calc(100vh - 110upx);border-radius:20upx 20upx 0 0;background-color:#fff;}
	.keyword-box .keyword-block {padding:10upx 0;}
	.keyword-box .keyword-block .keyword-list-header {width:94%;padding:10upx 3%;font-size:27upx;color:#333;display:flex;justify-content:space-between;}
	.keyword-box .keyword-block .keyword-list-header image {width:40upx;height:40upx;}
	.keyword-box .keyword-block .keyword {width:94%;padding:3px 3%;display:flex;flex-flow:wrap;justify-content:flex-start;}
	.keyword-box .keyword-block .hide-hot-tis {display:flex;justify-content:center;font-size:28upx;color:#6b6b6b;}
	.keyword-box .keyword-block .keyword>view {display:flex;justify-content:center;align-items:center;border-radius:60upx;padding:0 20upx;margin:10upx 20upx 10upx 0;height:60upx;font-size:28upx;background-color:rgb(242,242,242);color:#6b6b6b;}
	
	.row-item-my{
		 
	}
	.faicon-icon-t{
		margin-top: 8rpx;
		margin-left: 10rpx;
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
