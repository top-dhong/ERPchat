<template>
	<view class="index">
		<HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages" @clickMessage="clickMessage"></HMmessages>
		<view class="pro-item">
			<view class="pro-item-head">驳回节点:</view>
			<view class="uni-list-cell-db">
				<view class="pro-item-box">
					<picker @change="bindPickerChange" :value="idx1" :range="LsNodeList" range-key="NodeName">
						<view class="uni-input"><button>{{LsNodeList[idx1].NodeName}}</button></view>
					</picker>
				</view>
			</view>
		</view>
		<view class="pro-item">
			<view class="pro-item-head">驳回意见:</view>
			<view class="pro-item-box">
				<view class="uni-textarea">
					<textarea class="uni-textarea-dom" @input="setOpinion" v-model="Opinion" placeholder="请输入驳回意见" />
					</view>
			</view>
		</view>
		<view class="pro-item">
			<view class="uni-padding-wrap but-boot">
				<button class="uni-button but-coor-3" @tap="tapReBut">确定</button>
				<button class="uni-button btn-back" @tap="navigateBack">返回</button>
			</view>
		</view>
	</view>
</template>

<script>
	let util = require('@/common/util.js');
	let graceChecker = require('@/common/js/graceChecker.js')
	import HMmessages from '@/components/HM-messages/HM-messages.vue';
	export default {
		components:{
			HMmessages
		},
		data() {
			return {
				isclick:false,//防止重复提交数据
				FlowGUID:null,
				LsNodeList:[{NodeName:'无可驳回节点'}],//数据库初始化的节点列表
				idx1:0,
				nodeObj:{},//选取的节点对象
				Opinion:''
			};
		},
		onLoad(o) {
			 let that = this;
			 that.TaskType = o.TaskType||''
			 that.FlowGUID = o.FlowGUID||''
			 that.initData(o)
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
			//初始化     {FlowGUID,DoUserGUID}
			initData(par){
				let that = this;
				par['UserGUID'] = util.chkLogin()
				util.uniFly.post({
					url: that.RP.WX_GETFLOWREBUTLIST,
					params: par
				}).then(function(res) {
					console.log(',,',res)
					if (typeof(res) != 'undefined' && res.status == 200) {
						let data = res.data
						if(typeof(data)!='undefined'&&data.errNo==0){
							let tmplist = data.retVal
							if(0==tmplist.length){
								that.HMmessages.show('当前流程无可驳回节点!',{icon:'error',duration: 10000,closeButton: true});
								return
							}
							that.LsNodeList = tmplist
							that.nodeObj = that.LsNodeList[0];//初始化第一个节点对象
						}else{
							that.HMmessages.show(data.errDesc,{icon:'error'});
						}
					}
				})
			},
			//选取驳回节点
			bindPickerChange(e){
				let that = this
				let idx = e.detail.value
				that.idx1 = idx
				that.nodeObj = that.LsNodeList[idx];
			},
			 navigateBack(){
			 	util.navigateBack()
			 },
			 //驳回提交
			 tapReBut(){
				let that = this
				if(that.isclick){return}
				that.isclick = true 
				let par = {}
				if(!that.nodeObj){
					that.HMmessages.show('当前流程无可驳回节点!',{icon:'error'});
					return
				}
				par['FlowGUID'] = that.FlowGUID;
				par['DoUserGUID'] = util.chkLogin()
				par['NodeGUID'] = that.nodeObj.NodeGUID;
				par['NodeDoUser'] = that.nodeObj.NodeDoUser;
				par['Opinion'] = that.Opinion;
				//表单验证  FlowGUID  DoUserGUID  NodeGUID  NodeDoUser  Opinion
				let rule = [
					{ name: "FlowGUID", checkType: "notnull", checkRule: "", errorMsg: "流程不能为空" },
					{ name: "DoUserGUID", checkType: "notnull", checkRule: "", errorMsg: "操作用户不能为空" },
					{ name: "NodeGUID", checkType: "notnull", checkRule: "", errorMsg: "驳回节点不能为空" },
					{ name: "NodeDoUser", checkType: "notnull", checkRule: "", errorMsg: "驳回节点不能为空" },
					{ name: "Opinion", checkType: "notnull", checkRule: "", errorMsg: "请输入驳回意见" }
				];
				//老版特殊化规则
				let BossUserID = util.getDB('User')['UserID']
				if('00001'==BossUserID){
					rule = [
						{ name: "FlowGUID", checkType: "notnull", checkRule: "", errorMsg: "流程不能为空" },
						{ name: "DoUserGUID", checkType: "notnull", checkRule: "", errorMsg: "操作用户不能为空" },
						{ name: "NodeGUID", checkType: "notnull", checkRule: "", errorMsg: "驳回节点不能为空" },
						{ name: "NodeDoUser", checkType: "notnull", checkRule: "", errorMsg: "驳回节点不能为空" },
					];
				}
				if(graceChecker.check(par, rule)){
					console.log(',,',par)
					util.uniFly.post({
						url: that.RP.WX_FLOWREBUT,
						params: par
					}).then(function(res) {
						that.isclick = false
						if (typeof(res) != 'undefined' && res.status == 200) {
							let data = res.data
							if(typeof(data)!='undefined'&&data.errNo==0){
								that.HMmessages.show('驳回成功!',{icon:'success'});
								setTimeout(function(){that.preRefresh()},1500)
							}else{
								that.HMmessages.show(data.errDesc,{icon:'error'});
							}
						}
					})
				}else{
					that.isclick = false
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
