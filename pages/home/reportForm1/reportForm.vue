<template>
	<view class="qiun-columns">
			<view class="uni-list-cell-db">
				<picker @change="bindPickerProChange($event,'')" :value="index" :range="saleRepArr" range-key="ProjName">
					<view class="uni-input blu-decoration">{{saleRepArr[index].ProjName}}<view class="wicon wicon4-17"></view></view>
				</picker>
                <picker @change="bindPickerChange($event,'4')" :value="index4" :range="saleProdRepArr" range-key="ProductType">
                	<view class="uni-input blu-decoration">{{saleProdRepArr[index4].ProductType}}<view class="wicon wicon4-17"></view></view>
                </picker>
				<picker @change="bindPickerChange2($event,'2')" :value="index2" :range="pickerYears" range-key="Year">
					<view class="uni-input blu-decoration">{{pickerYears[index2].Year}}<view class="wicon wicon4-17"></view></view>
				</picker>
			</view>
            <view class="uni-list-cell-db">
            	<div class="item filter_input">
            				<div class="lable">日期期间：</div>
            				<view class="date_item">
            					<dyDatePicker placeholder="起始日期" :childValue="from" :minSelect="from_minSelect" :maxSelect="from_maxSelect"
            					 :iconshow="false" @getData="getFromData"></dyDatePicker>
            				</view>
            				<view class="filter_inputline"></view>
            				<view class="date_item">

            					<dyDatePicker placeholder="结束日期" :minSelect="to_minSelect" :childValue="to" :maxSelect="to_maxSelect" :iconshow="false"
            					 @getData="getToData"></dyDatePicker>
            				</view>
            			</div>
            </view>

		<!-- 图表 -->
		<view class="qiun-charts">
			<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" :style="{'width':cWidth*pixelRatio+'px','height':cHeight*pixelRatio+'px', 'transform': 'scale('+(1/pixelRatio)+')','margin-left':-cWidth*(pixelRatio-1)/2+'px','margin-top':-cHeight*(pixelRatio-1)/2+'px'}"></canvas>
		</view>
		<text>\n</text>
	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
    import dyDatePicker from '@/components/dy-Date/dy-Date.vue'
	let util = require('@/common/util.js')
    let time = require('@/common/time.js')
	let _self;
	//let canvaQYColumn = null;
	export default {
        components: {
        			dyDatePicker
        		},
		data() {
			return {
                from_minSelect: '2014/01/01',
                from_maxSelect: '2250/12/31',
                to_minSelect: '2014/01/01',
                to_maxSelect: '2250/12/31',
                from: '',
                to: '',
				//下面是图表相关功能
				cWidth: '',
				cHeight: '',
				cWidth2: '', //横屏图表
				cHeight2: '', //横屏图表
				cWidth3: '', //圆弧进度图
				cHeight3: '', //圆弧进度图
				arcbarWidth: '', //圆弧进度图，进度条宽度,此设置可使各端宽度一致
				gaugeWidth: '', //仪表盘宽度,此设置可使各端宽度一致
				tips: '',
				pixelRatio: 1,
				serverData: '',
				itemCount: 20, //x轴单屏数据密度
				sliderMax: 50,
				Column: {
					categories: ['签约', '回款', '认购',''],
					series: [{
						name: '0000-00-00至0000-00-00销售情况',
						data: [0, 0, 0,0]
					}]
				},
				index:0,
				saleRepArr:[{ProjName:'所有项目',ProjCode:"",ProjGUID:''}],//项目picker
                index4:0,
                saleProdRepArr:[{ProductType:'所有业态',ProductTypeCode:""}],//业态picker
				index2:0,
				pickerYears:[{Year:"前年"},{Year:"去年"},{Year:"本年"},{Year:"本月"},{Year:"本周"}],//年度picker
				index3:0,
				pickerSale:[{S:'RG',T:'认购'},{S:'QY',T:'签约'},{S:'HK',T:'回款'}],//销售picker

			}
		},
		onLoad() {
			_self = this;
			//#ifdef MP-ALIPAY
			uni.getSystemInfo({
				success: function(res) {
					if (res.pixelRatio > 1) {
						//正常这里给2就行，如果pixelRatio=3性能会降低一点
						//_self.pixelRatio =res.pixelRatio;
						_self.pixelRatio = 2;
					}
				}
			});
			//#endif
			_self.cWidth = uni.upx2px(750);
			_self.cHeight = uni.upx2px(500);
			_self.cWidth2 = uni.upx2px(700);
			_self.cHeight2 = uni.upx2px(1100);
			_self.cWidth3 = uni.upx2px(250);
			_self.cHeight3 = uni.upx2px(250);
			_self.arcbarWidth = uni.upx2px(24);
			_self.gaugeWidth = uni.upx2px(30);
			//_self.showColumn("canvasColumn", _self.Column)//初始化一个图表组件  使界面看起来不那么空
			_self.initData()
		},
		onReady() {},
		methods: {
			//初始化项目列表
			initData() {
				//uni.showLoading()
				util.uniFly.post({
					url: _self.RP.WX_GETSALEPROJLIST,
					params: {}
				}).then(function(res) {
					if (typeof(res) != 'undefined' && res.status == 200) {
						let data = res.data
						if (typeof(data) != 'undefined' && data.errNo == 0) {
							if(0==data.retVal.length){
								util.log('暂无项目');
								return
							}
							_self.saleRepArr = ([{ProjName:'所有项目',ProjCode:"",ProjGUID:''}]).concat(data.retVal);
                            _self[`index`] = 0;//全部
                            _self[`index2`] = 3;//本年2 本月3
                            //初始化所有业态
                            _self.GetSaleProdTypeList('')
                            _self.dopar()
                        }
					}
				})
			},
            //获取业态-选取项目后更改业态picker
            GetSaleProdTypeList(MYProjGUID){
                util.uniFly.post({
                	url: _self.RP.WX_GETSALEPRODTYPELIST,
                	params: {MYProjGUID}
                }).then(function(res) {
                	if (typeof(res) != 'undefined' && res.status == 200) {
                		let data = res.data
                		if (typeof(data) != 'undefined' && data.errNo == 0) {
                			if(0==data.retVal.length){
                				util.log('此项目下暂无业态');
                				return
                			}
                			_self.saleProdRepArr = ([{ProductType:'所有业态',ProductTypeCode:""}]).concat(data.retVal);
                		}
                	}
                })

            },
            //切换年份自动更改时间区间
            bindPickerChange2(e){
                _self[`index2`] = e.detail.value;
                _self.dopar()
            },
            //切换项目
            bindPickerProChange(e,tab){
            	_self[`index${tab}`] = e.detail.value;
                let MYProjGUID = _self.saleRepArr[_self.index]['ProjGUID']
                _self.GetSaleProdTypeList(MYProjGUID)
                _self[`index4`] = 0;
                _self.dopar()
            },
			//切换业态/时间区间
			bindPickerChange(e,tab){
				_self[`index${tab}`] = e.detail.value;
                _self.dopar()
			},
            //请求数据钱处理参数
            //参数d代表自己选取了时间区间
            dopar(d){
                    if(d){
                        let ProdTypeCode = _self.saleProdRepArr[_self.index4]["ProductTypeCode"]
                        let ProjGUID = _self.saleRepArr[_self.index]['ProjGUID']
                        let BeginTime = _self.from;
                        let EndTime = _self.to;
                        _self.getSaleData(`${_self.from}至${_self.to}销售情况`,_self.RP.WX_GETSALEREPORT,{BeginTime,EndTime,ProjGUID,ProdTypeCode},`Column`)
                        return
                    }
                   let Year = _self.pickerYears[_self.index2].Year;
                   let NowYear = util.dateFtt("yyyy",new Date());
                   let NowMou = util.dateFtt("MM",new Date());
                   let NowDay = util.dateFtt("yyyy-MM-dd",new Date());

                   switch(Year) {
                        case "前年":
                           _self.from = `${(parseInt(NowYear)-2)}-01-01`;
                           _self.to = `${(parseInt(NowYear)-2)}-12-31`;
                           break;
                        case "去年":
                           _self.from = `${(parseInt(NowYear)-1)}-01-01`;
                           _self.to = `${(parseInt(NowYear)-1)}-12-31`;
                           break;
                        case "本年":
                           _self.from = `${(parseInt(NowYear))}-01-01`;
                           _self.to = `${(parseInt(NowYear))}-12-31`;
                           break;
                        case "本月":
                           _self.from = time.getMonthStartDate();
                           _self.to = time.getMonthEndDate();
                           break;
                        case "本周":
                           _self.from = time.getWeekStartDate();
                           _self.to = time.getWeekEndDate();
                           break;
                        default:
                           _self.from = `${(parseInt(NowYear))}-01-01`;
                           _self.to = `${(parseInt(NowYear))}-12-31`;
                   }
                   let ProdTypeCode = _self.saleProdRepArr[_self.index4]["ProductTypeCode"]
                   let ProjGUID = _self.saleRepArr[_self.index]['ProjGUID']
                   let BeginTime = _self.from;
                   let EndTime = _self.to;
                   _self.getSaleData(`${_self.from}至${_self.to}销售情况`,_self.RP.WX_GETSALEREPORT,{BeginTime,EndTime,ProjGUID,ProdTypeCode},`Column`)
            },
			//初始化项目列表数据和项目的签约/认购/回款数据
			//name,url,params,prop  年年度每月销售额 接口名  接口参数  data[prop]
			getSaleData(name,url,params,prop){
                uni.showLoading()
				util.uniFly.post({
					url,
					params
				}).then(function(res) {
					if (typeof(res) != 'undefined' && res.status == 200) {
						let data = res.data
						if (typeof(data) != 'undefined' && data.errNo == 0) {
							//{categories:['2012', '2013', '2014', '2015', '2016', '2017'],series:[{name: '成交量1',data:[15, {value:20,color:'#f04864'},45, 37, 43, 34]}]}
							let tmpretVal = data.retVal
                            let newt = [];
                            for(let tmo in tmpretVal){
                                newt.push({Mon:"签约",Amt:tmpretVal[tmo].QY});
                                newt.push({Mon:"回款",Amt:tmpretVal[tmo].HK});
                                newt.push({Mon:"认购",Amt:tmpretVal[tmo].RG});
                            }
							let tmpcategories = []
							let tmpseriesdata = []
							for (const idx in newt) {
								tmpcategories.push(`${newt[idx].Mon}`)
								tmpseriesdata.push(newt[idx].Amt || 0)
							}
							_self[prop] = {
									categories: tmpcategories,
									series: [{
										name: name,
										data: tmpseriesdata
									}]
								};
							//画图表
							console.log(`画图表canvas${prop}`)
							_self.showColumn(`canvas${prop}`, _self[prop])
							uni.hideLoading()
						}
					}
				})
			},
			showColumn(canvasId, chartData) {
					new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'column',
					legend: true,
                    YminData:0,//Y值从零开始
					fontSize: 11,
					background: '#fff',
					pixelRatio: _self.pixelRatio,
					animation: true,
					categories: chartData.categories,
					series: chartData.series,
					xAxis: {
						disableGrid: true,
					},
					yAxis: {
						//disabled:true
					},
					dataLabel: true,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					extra: {
						column: {
							width: _self.cWidth * _self.pixelRatio * 0.45 / chartData.categories.length
						}
					}
				});

			},
            /**
            			 * @param {to_minSelect|from}  to_minSelect结束时间的最小选择范围 from=>开始日期
            			 */
            			getFromData(time) {
            				_self.to_minSelect = time
            				_self.from = time
                            _self.dopar(1)
            			},
            			/**
            			 * @param {from_maxSelect|to} from_maxSelect=>开始日期可选最大可选值 to=> 结束日期
            			 */
            			getToData(time) {
            				_self.from_maxSelect = time
            				_self.to = time
                            _self.dopar(1)
            			}
		}
	}
</script>

<style lang="less">
	page {
		background: #F2F2F2;
		width: 750upx;
		overflow-x: hidden;
	}

	.qiun-padding {
		padding: 2%;
		width: 96%;
	}

	.qiun-wrap {
		display: flex;
		flex-wrap: wrap;
	}

	.qiun-rows {
		display: flex;
		flex-direction: row !important;
	}

	.qiun-columns {
		display: flex;
		flex-direction: column !important;
	}

	.qiun-common-mt {
		margin-top: 10upx;
	}

	.qiun-bg-white {
		background: #FFFFFF;
	}

	.qiun-title-bar {
		width: 96%;
		padding: 10upx 2%;
		flex-wrap: nowrap;
	}

	.qiun-title-dot-light {
		border-left: 10upx solid #0ea391;
		padding-left: 10upx;
		font-size: 32upx;
		color: #000000
	}

	/* 通用样式 */
	.qiun-charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
		margin: 5rpx auto;
	}

	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	/* 横屏样式 */
	.qiun-charts-rotate {
		width: 700upx;
		height: 1100upx;
		background-color: #FFFFFF;
		padding: 25upx;
	}

	.charts-rotate {
		width: 700upx;
		height: 1100upx;
		background-color: #FFFFFF;
	}

	/* 圆弧进度样式 */
	.qiun-charts3 {
		width: 750upx;
		height: 250upx;
		background-color: #FFFFFF;
		position: relative;
	}

	.charts3 {
		position: absolute;
		width: 250upx;
		height: 250upx;
		background-color: #FFFFFF;
	}

	.qiun-tip {
		display: block;
		width: auto;
		overflow: hidden;
		padding: 15upx;
		height: 30upx;
		line-height: 30upx;
		margin: 10upx;
		background: #ff9933;
		font-size: 30upx;
		border-radius: 8upx;
		justify-content: center;
		text-align: center;
		border: 1px solid #dc7004;
		color: #FFFFFF;
	}
	.blu-decoration{
		color:blue;
		text-decoration: underline;
	}
    * {
    		padding: 0px;
    		margin: 0 auto;
    		box-sizing: border-box;
    	}


    	.content {
    		text-align: center;

    		margin-top: 20px;
    		font-size: 24rpx;

    	}

    	.item {
    		box-sizing: border-box;
    		width: 100%;
    		height: 40px;
    		line-height: 40px;
    		background-color: #ffffff;
    		position: relative;
    		padding: 0px 10px 0px 100px;
    		margin-bottom: 10px;
    		text-align: right;
    	}

    	.item .lable {
    		position: absolute;
    		left: 10px;
    		top: 0px;
    		color: #333333;
    	}

    	uni-picker-view-column {
    		font-size: 24rpx;
    	}

    	.filter_input {
    		height: 92rpx;
    		padding-top: 10rpx;
    	}

    	.date_item {
    		float: left;
    		width: 240upx;
    		overflow: hidden;
    		display: inline-block;
    		text-align: center;
    		border: 1px solid #ececec;
    		height: 72rpx;
    		line-height: 72rpx;

    		// font-size: 28rpx;
    		&:last-child {
    			// float: right;
    		}

    		input {
    			height: 72rpx;

    			.uni-input-placeholder {
    				color: #b5b8c2;
    			}
    		}
    	}

    	.filter_inputline {
    		float: left;
    		margin: 0 4rpx;
    		line-height: 72rpx;

    		&:after {
    			content: '—';
    			font-size: 28rpx;
    			color: #848b9a;
    		}
    	}
</style>
