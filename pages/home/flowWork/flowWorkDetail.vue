<template>

    <form class="index" report-submit="true" @submit="formSubmit"  @reset="formReset">
        <skeleton v-if="showSkeleton" ref="skeleton" loading="chiaroscuro" selector="skeleton" bgcolor="#FFF"></skeleton>
        <HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages" @clickMessage="clickMessage"></HMmessages>
        <view class="pro-item" v-for="(item,idx1) in data.formData" :key="idx1" v-if="item.Value">
            <view class="pro-item-row">
                <view class="pro-item-head skeleton-radius">{{item.Name}}:</view>
                <view class="pro-item-body skeleton-radius">
                    <text>{{item.Value||''}}</text>
                    <view class="faicon-icon-copy" @tap.stop="tapCipr(item.Value);" v-if="'流程编号'==item.Name">
                        <faicon type="clone" color="#000" size="30"></faicon>
                    </view>
                </view>
            </view>
        </view>
        <!-- <view class="pro-item">
			<view class="pro-item-head">企业文化</view>
			<view class="pro-item-box">
				<view>成都世豪新瑞置业有限公司成立于1993年，明确以地产开发为主的投资策略，并确立以“商业为主、住宅为辅”的开发和经营战略，并逐步成长为一家专注于高端物业开发的综合性地产公司。 凭借雄厚的经济实力、资源储备和人才优势，集团与知名商业运营品牌建立了长期的战略合作伙伴关系，成功打造了武侯区瑞泰锦城、温江区高端物业金河谷项目，高新区世豪广场项目，武侯区世豪嘉柏项目</view>
			</view>
		</view> -->
        <!-- 表格数据 -->
        <view class="pro-item" v-for="(item,idx2) in data.tableData" :key="idx2">
            <view class="pro-item-head">{{item.Title}}<text v-if="0==idx2" class="table-text-c">(表格可左右滑动查看)</text></view>
            <scroll-view class="pro-item-box" scroll-x="true">
                <view class="div-table">
                    <view class="thead">
                        <view class="th">
                            <view class="td" v-for="(th,idx3) in item.Table[0]" :key="idx3">{{idx3}}</view>
                        </view>
                    </view>
                    <view class="tr" v-for="(tds,idx4) in item.Table" :key="idx4">
                        <view class="td" v-for="(td,idx5) in tds" :key="idx5">{{td}}</view>
                    </view>
                </view>
            </scroll-view>
        </view>
        <!-- 附件 -->
        <view class="pro-item" v-if="0<data.annexData.length">
            <view class="pro-item-head">附&ensp;&ensp;&ensp;&ensp;件:</view>
            <view class="pro-item-box">
                <view v-for="(item,idx6) in data.annexData" :key="idx6" @tap.stop="tapOpenUrl(item.Url)">
                    <view class="faicon-icon-t">
                        <faicon type="file-pdf-o" color="#000" size="30"></faicon>
                    </view>
                    <text class="an-unline fj-color">{{item.FileName}}[{{item.CreateMan||'无'}}]</text>
                </view>
            </view>
        </view>
        <!-- 相关流程 -->
        <view class="pro-item" v-if="0<data.relationData.length">
            <view class="pro-item-head">相关流程:</view>
            <view class="pro-item-box">
                <view v-for="(item,idx8) in data.relationData" :key="idx8" @tap.stop="tapOpenFD(item.FlowGUID)">
                    <view class="faicon-icon-t">
                        <faicon type="tags" color="#000" size="30"></faicon>
                    </view>
                    <text class="an-unline fj-color">{{item.Subject}}</text>
                </view>
            </view>
        </view>
        <!-- 流转意见 -->
        <view class="pro-item">
            <view class="pro-item-head">流转意见:</view>
            <view class="pro-item-box" v-if="isShowOpinionData">
                <view class="uni-card" v-for="(item,idx7) in data.opinionData" :key="idx7">
                    <view class="uni-card__header">
                        <view class="uni-card__header-extra-img-view _pad_faicon">
                            <faicon type="sign-in" color="#000" size="30"></faicon>
                        </view>
                        <view class="uni-card__header-title-text">{{item.NodeName}}，{{item.DoType}}，{{item.DoTime}}</view>
                    </view>
                    <view class="uni-card__content uni-card__content--pd">
                        <view>{{item.DoMan||''}}：{{item.Opinion||''}}</view>
                    </view>
                    <view class="uni-card__footer">(提交到{{item.GetMan||""}})</view>
                </view>
            </view>
        </view>
        <view class="pro-item" v-if="'Wait'==TaskType">
            <view class="pro-item-head">签字意见:<text class="t-tasktext">当前节点:{{data.indexNodeName}}</text></view>
            <view class="pro-item-box">
                <radio-group @change="cge_radio">
                    <label class="radio">
                        <radio value="同意" :checked="'同意'==Agree" color="#FF5800" />同意</label>
                    <label class="radio">
                        <radio value="不同意" :checked="'不同意'==Agree" color="#FF5800" />不同意</label>
                </radio-group>
                <view class="uni-textarea fj-textarea">
                    <textarea class="uni-textarea-dom" name="Opinion" placeholder="请输入意见" />
                    </view>
			</view>
		</view>
		<view class="pro-item">
			<view class="uni-padding-wrap but-boot">
				<button class="uni-button but-coor-1" v-if="'Wait'==TaskType" @tap="tabTalk">沟通</button>
				<button class="uni-button but-coor-2" v-if="'Wait'==TaskType" @tap="tabReBut">驳回</button>
				<button class="uni-button but-coor-3" v-if="'Wait'==TaskType" form-type="submit">提交</button>
				<button class="uni-button btn-back" @tap="navigateBack">返回</button>
			</view>
		</view>
	</form>
</template>

<script>
	let util = require('@/common/util.js')
	let downRead = require('@/common/js/downRead.js')
	let graceChecker = require('@/common/js/graceChecker.js')
	import skeleton from "@/components/quick-skeleton/quick-skeleton.vue";
	import faicon from '@/components/fa-icon/fa-icon.vue'
	export default {
		components: {
			skeleton,
			faicon
		},
		data() {
			return {
				isclick:false,//防止重复提交
				isShowOpinionData:true,
				showSkeleton: false,  //骨架屏显示隐藏
				Agree:'同意',
				FlowGUID:null,
				TaskType:'',
				data: {formData:[{Value:''}],relationData:[],annexData:[]}
			};
		},
		onLoad(o) {
			 let that = this;
			 that.TaskType = o['TaskType']||''
			 that.FlowGUID = o['FlowGUID']||''
			 that.initData(o)
		},
		onShow(){
			this.curRefresh()
		},
		methods: {
			//当前需要刷新的页面
			curRefresh(){
				let that = this;
				let pages = getCurrentPages();
				let currPage = pages[pages.length-1];
				if (currPage.data.isDoRefresh == true){
					currPage.data.isDoRefresh = false;
					that.initData({TaskType:that.TaskType,FlowGUID:that.FlowGUID})
				}
			},
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
			cge_radio(e){
				this.Agree = e.detail.value
			},
			clickMessage(data){
				console.log('',data)
			},
			//初始化数据
			initData(par){
				let that = this;
				par['UserGUID'] = util.chkLogin()
				util.uniFly.post({
					url: that.RP.WX_GETTASKINFO,
					params: par
				}).then(function(res) {
					if (typeof(res) != 'undefined' && res.status == 200) {
						let data = res.data
						if(typeof(data)!='undefined'&&data.errNo==0){
							that.data = data.retVal
							uni.setNavigationBarTitle({
								title:that.data.formData[0].Value
							})
						}
					}
				})
			},
			//沟通
			tabTalk(){
				let that = this;
				if(that.data.isAllowConsult){
					let FlowGUID = that.FlowGUID;
					let TaskType = that.TaskType;
					uni.navigateTo({
						url:`./flowWorkTalk?FlowGUID=${FlowGUID}&TaskType=${TaskType}`
					});
				}else{
					that.HMmessages.show('抱歉,不可沟通',{icon:'error'});
				}
			},
			//驳回
			//self.location = "SelectNode.htm?BillID=" + strBillID + "&TypeGUID=" + strTypeGUID + "&TaskType=" + strTaskType;
			tabReBut(){
				let that = this;
				if(that.data.isAllowRebut){
					let FlowGUID = that.FlowGUID;
					let TaskType = that.TaskType;
					let DoUserGUID = util.chkLogin()
					uni.navigateTo({
						url:`./flowWorkReBut?FlowGUID=${FlowGUID}&DoUserGUID=${DoUserGUID}&TaskType=${TaskType}`
					});
				}else{
					that.HMmessages.show('抱歉,不可驳回',{icon:'error'});
				}
			},
			//下载预览
			tapOpenUrl(url){
				console.log(url)
				let that = this
				downRead.downRead(url,null,function(){},function(err){
					that.HMmessages.show(err,{icon:'error'});
				})
			},
			//相关流程 - 打开流程详情
			tapOpenFD(FlowGUID){
				uni.navigateTo({
					url: `./flowWorkDetailF?FlowGUID=${FlowGUID}`
				});
			},
			//提交
			formSubmit(e){
				let that = this
				if(that.isclick){return}
				that.isclick = true
				//表单验证  FlowGUID  DoUserGUID  Agree  Opinion
				let rule = [
					{ name: "FlowGUID", checkType: "notnull", checkRule: "", errorMsg: "流程ID不能为空" },
					{ name: "DoUserGUID", checkType: "notnull", checkRule: "", errorMsg: "操作用户ID不能为空" },
					{ name: "Agree", checkType: "in", checkRule: "同意,不同意", errorMsg: "请选取同意/不同意" },
					{ name: "Opinion", checkType: "notnull", checkRule: "", errorMsg: "请输入意见" }
				];
				//老版特殊化规则
				let BossUserID = util.getDB('User')['UserID']
				if('00001'==BossUserID){
					rule = [
						{ name: "FlowGUID", checkType: "notnull", checkRule: "", errorMsg: "流程ID不能为空" },
						{ name: "DoUserGUID", checkType: "notnull", checkRule: "", errorMsg: "操作用户ID不能为空" },
						{ name: "Agree", checkType: "in", checkRule: "同意,不同意", errorMsg: "请选取同意/不同意" },
					];
				}
				 //进行表单检查
                let formData = e.detail.value;
				formData['FlowGUID'] = that.FlowGUID;
				formData['DoUserGUID'] = util.chkLogin()
				formData['Agree'] = that.Agree;
                if(graceChecker.check(formData, rule)){
					console.log(',,',formData)
					util.uniFly.post({
						url: that.RP.WX_FLOWSUBMIT,
						params: formData
					}).then(function(res) {
						that.isclick = false
						if (typeof(res) != 'undefined' && res.status == 200) {
                            let data = res.data;
							if(typeof(data)!='undefined'&&data.errNo==0){
								that.HMmessages.show('提交成功!',{icon:'success'});
                                //录入form_id
                                let aform_id = e.detail.formId;
                                let aDoUserGUID = util.chkLogin();
                                util.uniFly.post({
                                	url: that.RP.WX_UPDATEFORMIDBYOPENID,
                                	params: {guid:aDoUserGUID,form_id:aform_id}
                                }).then(function(res) {
                                })
								//刷新数据
								setTimeout(function() {that.preRefresh()}, 1500);
								//that.initData({TaskType:that.TaskType,FlowGUID:that.FlowGUID})
							}else{
								that.HMmessages.show(data.errDesc,{icon:'error',duration:2e3});
							}
						}
					})
                }else{
					that.isclick = false
					that.HMmessages.show(graceChecker.error,{icon:'error',duration:2e3});
                }
			},
			//重置数据
			formReset(){

			},
			navigateBack(){
				util.navigateBack()
			},
			// doname(idx){
			// 	let that = this;
			// 	let Name = that.data.formData[idx]['Name'];
			// 	let arr = Name.split(' ')
			// 	if(2==arr.length){
			// 		Name = arr.join('&emsp;&emsp;&emsp;&emsp;')
			// 	}else if(3==arr.length){
			// 		Name = arr.join('&emsp;&emsp;')
			// 	}else if(4==arr.length){
			// 		Name = arr.join('')
			// 	}
			// 	that.data.formData[idx]['Name'] = Name
			// 	console.log(Name)
			// },
			tapCipr(txt){
			    util.tapCipr(txt)
			}
		}
	}
</script>

<style lang="scss">

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
		padding: 10upx 25upx;
		box-sizing: border-box;
		margin-bottom: 5upx;
		flex-direction: column;
	}

	.pro-item .pro-item-head {
		border-left: 15upx solid #FF5800;
		font-size: 32upx;
		color: #000000;
		padding-left: 20upx;
		height:50%;
		flex: 1;
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
$div-table-border-color: #666;
$div-table-border-width: 1upx;

.div-table {
	display: table;
	height: 100%;
	border: $div-table-border-width solid $div-table-border-color;
	box-sizing: border-box;
	table-layout: fixed;
	position: relative;
	.celspan {
		display: table;
		width: 100%;
		height: 100%;
		.td {
			display: table-cell;
			border: none !important;
		}
		.td + .td {
			border-left: $div-table-border-width solid $div-table-border-color !important;
		}
	}
	.rowspan {
		display: table;
		width: 100%;
		height: 100%;
		.tr {
			display: table-row;
			border: none !important;
		}
	}

	&.fixed-thead {
		.tbody,
		.thead,
		.tr,
		.th,
		.td {
			display: block;
		}
		.tr,
		.th {
			&:after {
				content: '';
				display: block;
				visibility: hidden;
				clear: both;
				height: 0;
			}
		}
		.td {
			float: left;
			width: 33.33%;
		}
		.tbody {
			height: 400upx;
			overflow-y: auto;
			overflow-x: hidden;
		}
	}

	.tr,
	.th {
		display: table-row;
		& + .tr,
		& + .th {
			.td,
			.th {
				border-top: $div-table-border-width solid $div-table-border-color;
				word-break: break-word;
			}
		}
	}
	.rowspan {
		.tr,
		.th {
			display: table-row;
			.td,
			.th {
				border: none;
			}
			& + .tr,
			& + .th {
				.td,
				.th {
					border-top: $div-table-border-width solid $div-table-border-color;
				}
			}
		}
	}
	.td {
		display: table-cell;
		vertical-align: middle;
		text-align: center;
		box-sizing: border-box;
		padding: 10upx;
		font-size: 0.8rem;
		white-space:nowrap;
		&.noPadding {
			padding: 0;
		}
		& + .td {
			border-left: $div-table-border-width solid $div-table-border-color;
		}
	}
	.th .td {
		font-size: 0.8rem;
		font-weight: bold;
		white-space:nowrap;
	}
	.tbody {
		display: table-row-group;
	}
	.thead {
		display: table-header-group;
		.tr,
		.th {
			.td,
			.th {
				border-bottom: $div-table-border-width solid $div-table-border-color;
			}
		}
	}
	.tfoot {
		display: table-footer-group;
		.tr,
		.th {
			.td,
			.th {
				border-top: $div-table-border-width solid $div-table-border-color;
			}
		}
	}
	.colgroup {
		display: table-column-group;
	}
	.col {
		display: table-column;
	}
	.caption {
		display: table-caption;
	}
}
.uni-textarea-dom {
	border:1px solid #cbcbcb;
	height: 220upx;
	border-radius: 10upx;
}
.fj-textarea{
	padding: 10upx 0;
}
.an-unline{text-decoration:underline;}
// .an-unline:active{ color: red; }

.pro-item-row{display: flex;flex-direction: row;}
.pro-item-body{flex: 3;}

//.hotsearch { float: left; overflow: hidden; width: 4em;}
//.hotsearch dd view { display: block; }
// .w2 { letter-spacing: 2em; margin-right: -2em; }
// .w3 { letter-spacing: 0.5em; margin-right: -0.5em; }
.ita-text{
	font-style: italic;
	font-size: 0.8em !important;
	color:#cbcbcb !important;
	line-height: 48upx;
}
	$card-extra-width: 30%;
    $uni-spacing-marign:0upx;
    $uni-top-but-marign:8upx;
	@mixin text-omit {
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	.uni-card {
		margin-left: $uni-spacing-marign;
		margin-right: $uni-spacing-marign;
		margin-bottom: $uni-top-but-marign;
		margin-top: $uni-top-but-marign;
		background: $uni-bg-color;
		position: relative;
		display: flex;
		flex-direction: column;

		&:after {
			content: '';
			position: absolute;
			transform-origin: center;
			box-sizing: border-box;
			pointer-events: none;
			top: -50%;
			left: -50%;
			right: -50%;
			bottom: -50%;
			border: 1px solid $uni-border-color;
			border-radius: $uni-border-radius-lg;
			transform: scale(.5);
		}

		&__footer{
			position: relative;
			display: flex;
			flex-direction: row;
			padding: $uni-spacing-col-base;
			align-items: center;
		}
		&__header {
			position: relative;
			display: flex;
			flex-direction: row;
			padding: $uni-spacing-col-base;
			align-items: center;
			background-color: #f8f8f8;
			font-weight: bold;
		}

		&__header {
			&:after {
				position: absolute;
				bottom: 0;
				right: 0;
				left: 0;
				height: 1px;
				content: '';
				-webkit-transform: scaleY(.5);
				transform: scaleY(.5);
				background-color: $uni-border-color;
			}

			&-title {
				flex: 1;
				margin-right: $uni-spacing-col-base;
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;

				&-text {
					font-size: 27rpx;
					flex: 1;
					@include text-omit;
				}
			}

			&-extra {
				&-img-view {
					display: flex;
				}

				&-img {
					height: $uni-img-size-sm;
					width: $uni-img-size-sm;
					margin-right: $uni-spacing-col-base;
				}

				&-text {
					flex: 0 0 auto;
					width: $card-extra-width;
					margin-left: $uni-spacing-col-base;
					font-size: $uni-font-size-base;
					text-align: right;
					@include text-omit;
				}
			}

		}

		&__content {
			&--pd {
				padding: $uni-spacing-col-base;
				font-size: 24rpx;
			}
		}

		&__footer {
			justify-content: space-between;
			color: $uni-text-color-grey;
			font-size: $uni-font-size-sm;
			padding-top: 0;
		}
        &--full{
            margin: 0;
        }
	}
	.fj-color{
		color: blue !important;
	}
	.fj-color:active{
		color: red !important;
	}
	._pad_faicon{
		margin-right: 10rpx;
	}
	.faicon-icon-t{
		margin-top: 8rpx;
	}
	.faicon-icon-copy{
		margin-left: 8rpx;
		margin-top: 8rpx;
	}
	.t-tasktext{
		border: #000 solid 1px;
		background-color: #f8f8f8;
		color:blue !important;
		//font-size: 23rpx !important;
	}
	.table-text-c{
		color:#848484 !important;
		font-size: 23rpx !important;
		justify-content: center;
		margin-top: 10rpx;
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
