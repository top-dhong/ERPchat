<template>

	<form class="index" report-submit="true" @submit="formSubmit" @reset="formReset">
		<skeleton v-if="showSkeleton" ref="skeleton" loading="chiaroscuro" selector="skeleton" bgcolor="#FFF"></skeleton>
		<!-- 基础信息 -->
		<view class="pro-item" v-for="(item,idx1) in data.formData" :key="idx1" v-if="item.Value&&item.Name!='ConGUID'">
			<view class="pro-item-row">
				<view class="pro-item-head skeleton-radius">{{item.Name}}:</view>
				<view class="pro-item-body skeleton-radius">
					<text>{{item.Value||''}}</text>
					<view class="faicon-icon-copy" @tap.stop="tapCipr(item.Value);" v-if="'合同编号'==item.Name">
						<faicon type="clone" color="#000" size="30"></faicon>
					</view>
				</view>
			</view>
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
		<!-- 流程 -->
        <view class="pro-item" v-if="0<data.conFlowData.length">
        	<view class="pro-item-head">相关流程:</view>
        	<view class="pro-item-box">
        		<view v-for="(item,idx8) in data.conFlowData" :key="idx8" @tap.stop="goDetail(item)">
        			<view  class="faicon-icon-t">
        				<faicon type="tags" color="#000" size="30"></faicon>
        			</view>
        			<text class="an-unline fj-color">{{item.Subject}}</text>
        		</view>
        	</view>
        </view>
		<!-- 补充协议 -->
		<view class="pro-item" v-if="0<data.conSuplyData.length">
			<view class="pro-item-head">补充协议:</view>
			<view class="pro-item-box">
				<view v-for="(item,idx9) in data.conSuplyData" :key="idx9" @tap.stop="goDetail2(item)">
					<view  class="faicon-icon-t">
						<faicon type="gavel" color="#000" size="30"></faicon>
					</view>
					<text class="an-unline fj-color">{{item.ConName}}</text>
				</view>
			</view>
		</view>
		<view class="pro-item">
			<view class="uni-padding-wrap but-boot">
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
				showSkeleton: false,  //骨架屏显示隐藏
				ConGUID:null,
				data: {formData:[{Value:''}],conFlowData:[],annexData:[],conSuplyData:[]},
				isSBS:true,//是否显示基础信息
				isSFJ:true,//是否显示附件
				isSFL:true
			};
		},
		onLoad(o) {
			 let that = this;
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
					that.initData({ConGUID:that.ConGUID})
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
			},
			//初始化数据
			initData(par){
				let that = this;
				util.uniFly.post({
					url: that.RP.WX_GETCONINFO,
					params: par
				}).then(function(res) {
					if (typeof(res) != 'undefined' && res.status == 200) {
						let data = res.data
						if(typeof(data)!='undefined'&&data.errNo==0){
							that.data = data.retVal
							console.log('==>',that.data)
							uni.setNavigationBarTitle({
								title:that.data.formData[2].Value
							})
						}
					}
				})
			},
            //流程弹窗
            goDetail(o){
                let that = this
            	uni.showModal({
            		title:`${o['Subject']}`,
            		content:`状态:${o['State']}\r\n项目名称:${o['ProjectName']}\r\n当前节点:${o['NodeName']}\r\n创建人:${o['CreateMan']}\r\n创建时间:${util.dateFtt(`yyyy/MM/dd`,o['CreateDate'])}`,
            		confirmText:'查看',
                    fail(err){
            			util.log(err.errMsg)
            		},
                    success(res){
                        if(res.confirm){
                            that.tapOpenFD(o.FlowGUID)
                        }
                    }
            	})
            },
            //相关流程 - 打开流程详情
            tapOpenFD(FlowGUID){
            	uni.navigateTo({
            		url: `../flowWork/flowWorkDetailF?FlowGUID=${FlowGUID}`
            	});
            },
            //协议弹窗
            goDetail2(o){
                let that = this
            	uni.showModal({
            		title:`${o['ConName']}`,
            		content:`合同编号:${o['ConNo']}\r\n项目名称:${o['ProjectName']}\r\n合同金额:${o['ConMoney']}\r\n乙方单位:${o['ProvName']}\r\n创建时间:${util.dateFtt(`yyyy/MM/dd`,o['SignDate'])}`,
            		confirmText:'查看',
                    fail(err){
            			util.log(err.errMsg)
            		},
                    success(res){
                        if(res.confirm){
                            that.tapOpenHT(o.ConGUID)
                        }
                    }
            	})
            },
            //相关协议 - 打开协议详情
            tapOpenHT(ConGUID){
            	uni.navigateTo({
            		url: `./contractDetail?ConGUID=${ConGUID}`
            	});
            },
			//下载预览
			tapOpenUrl(url){
				console.log(url)
				let that = this
				downRead.downRead(url,null,function(){},function(err){
					that.HMmessages.show(err,{icon:'error'});
				})
			},
			navigateBack(){
				util.navigateBack()
			},
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
		margin-left: 18rpx;
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
	.pro-item-title{
		color:#848484;
		// margin-left: 8rpx;
		background-color: #FFFFFF;
		border-bottom: #ececec solid 1rpx;
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
