<template>
	<view class="qiun-columns">
			<view class="uni-list-cell-db">
				<picker @change="bindPickerProChange($event,'')" :value="index" :range="saleRepArr" range-key="ProjName">
					<view class="uni-input blu-decoration">{{saleRepArr[index].ProjName}}<view class="wicon wicon4-17"></view></view>
				</picker>
                <picker @change="bindPickerChange($event,'4')" :value="index4" :range="saleProdRepArr" range-key="ProductType">
                	<view class="uni-input blu-decoration">{{saleProdRepArr[index4].ProductType}}<view class="wicon wicon4-17"></view></view>
                </picker>
				<picker @change="bindPickerChange($event,'2')" :value="index2" :range="pickerYears" range-key="Year">
					<view class="uni-input blu-decoration">{{pickerYears[index2].Year}}<view class="wicon wicon4-17"></view></view>
				</picker>
				<picker @change="bindPickerChange($event,'3')" :value="index3" :range="pickerSale" range-key="T">
					<view class="uni-input blu-decoration">{{pickerSale[index3].T}}<view class="wicon wicon4-17"></view></view>
				</picker>
			</view>
		<!-- 图表 -->
		<view class="qiun-charts">
			<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" :style="{'width':cWidth*pixelRatio+'px','height':cHeight*pixelRatio+'px','margin-left':'-240rpx','margin-top':'350rpx'}"></canvas>
		</view>
	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	let util = require('@/common/util.js')
	let _self;
	export default {
		data() {
			return {
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
				sliderMax: 100,
				Column: {
					categories: ['1月', '2月', '3月', '4月', '5月', '6月','7月','8月','9月','10月','11月','12月'],
					series: [{
						name: '年度每月认购额',
						data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
					}]
				},
				index:0,
				saleRepArr:[{ProjName:'所有项目',ProjCode:"",ProjGUID:''}],//项目picker
                index4:0,
                saleProdRepArr:[{ProductType:'所有业态',ProductTypeCode:""}],//业态picker
				index2:0,
				pickerYears:[{Year:2019}],//年度picker
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
			_self.cWidth = 600;//uni.upx2px(750);
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
				uni.showLoading()
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
							let Year = new Date().getFullYear()
							let tmppickerYears =  []
							for(let i=Year; i>=2014; i--){
								tmppickerYears.push({Year:i})
							}
							_self.pickerYears = tmppickerYears
							//初始化所有业态
                            _self.GetSaleProdTypeList('')

							let MYProjGUID = ''
                            let ProdTypeCode = ''
							//_self.getSaleData(`${Year}年年度每月签约额`,_self.RP.WX_GETSALEQYREPORT,{Year,MYProjGUID},`QYColumn`)
							_self.getSaleData(`${Year}年年度每月认购额`,_self.RP.WX_GETSALERGREPORT,{Year,MYProjGUID,ProdTypeCode},`Column`)
							//_self.getSaleData(`${Year}年年度每月回款额`,_self.RP.WX_GETSALEHKREPORT,{Year,MYProjGUID},`HKColumn`)
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
            //切换项目
            bindPickerProChange(e,tab){
            	uni.showLoading()
            	_self[`index${tab}`] = e.detail.value;
            	let MYProjGUID = _self.saleRepArr[_self.index]['ProjGUID']
                _self.GetSaleProdTypeList(MYProjGUID)
                _self[`index4`] = 0;
            	let Year = _self.pickerYears[_self.index2]["Year"]
            	let Sale = _self.pickerSale[_self.index3]//{S,T}
                let ProdTypeCode = ''
            	_self.getSaleData(`${Year}年年度每月${Sale.T}额`,_self.RP[`WX_GETSALE${Sale.S}REPORT`],{Year,MYProjGUID,ProdTypeCode},`Column`)
            },
			//切换业态/年份/ST
			bindPickerChange(e,tab){
				uni.showLoading()
				_self[`index${tab}`] = e.detail.value;
				let MYProjGUID = _self.saleRepArr[_self.index]['ProjGUID']
				let Year = _self.pickerYears[_self.index2]["Year"]
				let Sale = _self.pickerSale[_self.index3]//{S,T}
                let ProdTypeCode = _self.saleProdRepArr[_self.index4]["ProductTypeCode"]
				_self.getSaleData(`${Year}年年度每月${Sale.T}额`,_self.RP[`WX_GETSALE${Sale.S}REPORT`],{Year,MYProjGUID,ProdTypeCode},`Column`)
			},
			//初始化项目列表数据和项目的签约/认购/回款数据
			//name,url,params,prop  年年度每月销售额 接口名  接口参数  data[prop]
			getSaleData(name,url,params,prop){
				util.uniFly.post({
					url,
					params
				}).then(function(res) {
					if (typeof(res) != 'undefined' && res.status == 200) {
						let data = res.data
						if (typeof(data) != 'undefined' && data.errNo == 0) {

							//{categories:['2012', '2013', '2014', '2015', '2016', '2017'],series:[{name: '成交量1',data:[15, {value:20,color:'#f04864'},45, 37, 43, 34]}]}
							let tmpretVal = data.retVal
							let tmpcategories = []
							let tmpseriesdata = []
                            let AllAmt = 0.00;
							for (const idx in tmpretVal) {
								tmpcategories.push(`${tmpretVal[idx].Mon}月`)
								tmpseriesdata.push(tmpretVal[idx].Amt || 0.00);
                                AllAmt +=(tmpretVal[idx].Amt || 0.00)
							}
                            AllAmt = AllAmt.toFixed(2);
							_self[prop] = {
									categories: tmpcategories,
									series: [{
										name: `${name}(全年总计${AllAmt}万元)`,
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

			}
		}
	}
</script>

<style>
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
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
		margin: 5rpx auto;
	}

	.charts {
		width: 100%;;
		height: 100%;
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
