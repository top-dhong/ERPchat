<template>
	<view class="index bgf whomes oneview">
		<skeleton v-if="showSkeleton" ref="skeleton" loading="chiaroscuro" selector="skeleton" bgcolor="#FFF"></skeleton>
		<HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages" @clickMessage="clickMessage"></HMmessages>
		<view class="hometop">
			<view class="uni-padding-wrap">
				<view class="page-section swiper">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
						<swiper-item v-for="(item,idx1) in RoPlantList" :key="idx1">
							<view class="swiper-item uni-bg-red">
								<image class="skeleton-rect" :src="item.Img" @tap="tapPlant(item.Url)" mode=""></image>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		<view class="tags">
			<block v-for="(d, idx1) in data" :key="idx1">
				<view class="tag" @click="goPage(d.url,d.id)">
					<view class="homecells wicon skeleton-radius" :class="d.icon">
					</view>
					<button v-if="d.openType" :open-type="d.openType" :value="d.type"></button>
					<text class="tag-text">{{d.type}}</text>
				</view>
			</block>
		</view>
		<!-- 待办任务/未读传阅 -->
		<view class="twonavcon">
			<!-- <view class="twonav-tit">待办事宜</view> -->
			<view class="twonav">
				<view class="twonavbox" @tap="tapSwitch('')">
					<image src="https://wx.shine-town.com/WX/wximg/static/a1.png" mode=""></image>
					<text class="na-text-padf fonsize9">待办任务</text>
					<text class="na-text-padftext fonsize9" v-if="RoPakhtData.ToDoCount>0">{{RoPakhtData.ToDoCount>99?'99+':RoPakhtData.ToDoCount}}</text>
				</view>
				<view class="twonavbox" @tap="tapSwitch('MakeCopy',2)">
					<image src="https://wx.shine-town.com/WX/wximg/static/a2.png" mode=""></image>
					<text class="na-text-padf fonsize9">未读传阅</text>
					<text class="na-text-padftext fonsize9" v-if="RoPakhtData.MakeCopyCount>0">{{RoPakhtData.MakeCopyCount>99?'99+':RoPakhtData.MakeCopyCount}}</text>
				</view>
			</view>
		</view>
		<!-- 本月数据 -->
		<view class="twonavcon" v-if="1==Power||1==GXKLPower">
			<view class="twonav">
				<view class="twonavbox" v-if="1==Power" @tap="goPage('./reportForm1/reportForm')">
					<image src="https://wx.shine-town.com/WX/wximg/static/a3.png" mode=""></image>
					<text class="na-text-padf-qy fonsize9">签约{{RoPakhtData.QYAmount||''}}万</text>
					<text class="na-text-padf-hk fonsize9">回款{{RoPakhtData.HKAmount||''}}万</text>
                    <text class="na-text-padf-rg fonsize9">认购{{RoPakhtData.RGAmount||''}}万</text>
					<text class="na-text-padfmouth">{{Mouth.length==1?('0'+Mouth):Mouth}}月</text>
				</view>
				<view class="twonavbox" v-if="1==GXKLPower">
					<image src="https://wx.shine-town.com/WX/wximg/static/a4.png" mode=""></image>
					<text class="na-text-padf-kl fonsize9">高新商场客流</text>
					<text class="na-text-padf-kl-t fonsize9">{{RoPakhtData.CustCount1||''}}万人次</text>
					<text class="na-text-padf-kl2 fonsize9">高新伊藤客流</text>
					<text class="na-text-padf-kl-t2 fonsize9">{{RoPakhtData.CustCount2||''}}万人次</text>
					<text class="na-text-padfmouth">{{Mouth.length==1?('0'+Mouth):Mouth}}月</text>
				</view>
			</view>
		</view>
		<text>\n</text>
	</view>
</template>

<script>
	import forum from '@/components/forum.vue';
	import skeleton from "@/components/quick-skeleton/quick-skeleton.vue";
	let util = require('@/common/util.js')
	export default {
		components: {
			forum,
			skeleton
		},
		data() {
			return {
				Power:0,//控制显示客流(查看报表功能)   0不显示  1显示   默认0
                GXKLPower:0,
                LSKLPower:0,
				Mouth:'',
				showSkeleton:false,//骨架包
				imghs: util.imghs,
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				RoPlantList: [{
					Img: 'https://wx.shine-town.com/WX/wximg/static/banner1.jpg',
					Url: ''
				}], //轮播图
				RoPakhtData: {
					ToDoCount: '',
					MakeCopyCount: '',
					CustCount1: '',//高新商场客流
					CustCount2: '',//高新伊藤客流
					RGAmount: '',
					QYAmount: '',
					HKAmount: ''
				}, //待办事宜
				data: [{
						type: '新闻',
						id: 1,
						icon: 'wicon1-8',
						url: 'news/news'
					},
					{
						type: '流程',
						id: 2,
						icon: 'wicon1-2',
						url: 'flowWork/flowWork'
					},
					{
						type: '报表',
						id: 3,
						icon: 'wicon1-3',
                        url: './form'
					},
					{
						type: '工作台',
						id: 4,
						icon: 'wicon1-6',
                        url: './attend'
					},
					{
						type: '合同',
						id: 5,
						icon: 'wicon1-5',
						url: 'contract/contract'
					},
					{
						type: '通讯录',
						id: 6,
						icon: 'wicon1-1',
						url: 'phones/phones'
					},
					{
						type: '制度',
						id: 7,
						url: 'news/news?t=zd',
						icon: 'wicon1-7',
					},
					{
						type: '反馈',
						id: 8,
						icon: 'wicon1-4',
						openType: 'contact'
					}
				],
			}
		},
		onLoad(o) {
			let that = this
			//that.initWXLogin(true)
		},
		onShow(e) {
			let that = this
            uni.getNetworkType({
                success: res => {
                    if (res.networkType == 'none') {
                        util.log('网络错误')
                    } else {
                        that.initWXLogin();
                    }
                }
            });
            uni.onNetworkStatusChange(res => {
                if (res.isConnected) {
                    that.initWXLogin();
                } else {
                    util.log('网络错误')
                }
            });
		},
        onShareAppMessage(){

        },
		methods: {
			//初始化参数
			initData() {
				let that = this
				//初始化轮播图
				util.uniFly.post({
					url: that.RP.WX_GETPORTALNEWS,
					params: {}
				}).then(function(res) {
					if (typeof(res) != 'undefined' && res.status == 200) {
						let data = res.data
						if (typeof(data) != 'undefined' && data.errNo == 0) {
							that.RoPlantList = data.retVal
						}
					}
				})
				//获取首页待办和传阅数量  和其他数据
				let UserGUID = util.chkLogin()
				util.uniFly.post({
					url: that.RP.WX_GETPORTALDATA,
					params: {
						UserGUID
					}
				}).then(function(res) {
					if (typeof(res) != 'undefined' && res.status == 200) {
						let data = res.data
						if (typeof(data) != 'undefined' && data.errNo == 0) {
							that.RoPakhtData = data.retVal
						}
					}
				})
				that.Power = util.getDB('User')['Power']
                that.GXKLPower = util.getDB('User')['GXKLPower']
                that.LSKLPower = util.getDB('User')['LSKLPower']
				that.Mouth = `${new Date().getMonth()+1}`
			},
			//bo 是否强制登录
			initWXLogin(bo) {
				let that = this
				if (!bo&&util.chkLogin()) {
					that.initData()
					return
				}
				//判断本地是否有openid 没有就拉取
				let openid = util.getDB('openid');
				if (!openid) {
					uni.login({
						success: res => {
							if (res.code) {
								util.uniFly.post({
									url: that.RP.WX_GET_OPENID,
									params: {
										jsCode: res.code
									}
								}).then(function(res) {
									if (typeof(res) != 'undefined' && res.status == 200) {
										for (const d in res.data) {
											util.setDB(d, res.data[d])
										}
										that.onTwoLogin(res.data.openid)
									}
								})
							}
						},
						fail: res => {
							util.log(res.errMsg)
						}
					})
				} else {
					that.onTwoLogin(openid)
				}
			},
			onTwoLogin(openid) {
				let that = this
				//尝试用openid直接登录
				util.uniFly.post({
					url: that.RP.WX_OPENID_LOGIN,
					params: {
						OpenID: openid
					}
				}).then(function(res) {
					if (typeof(res) != 'undefined' && res.status == 200) {
						let data = res.data;
						if (typeof(data) != 'undefined' && data.errNo == 0) {
							util.setDB('User', data.retVal)
							that.initData()
							that.getToDay(function(d){
                                setTimeout(function(){
                                    that.HMmessages.show(`${d}，${data.retVal.UserName}!`, {
                                        icon: 'success',
                                        duration: 4000
                                    });
                                },100)
							})
						} else {
							util.showModal({
								title: '提示信息',
								content: data.errDesc + '是否立即绑定?',
								success: res => {
									if (res.confirm) {
										uni.navigateTo({
											url: '../login/loginAuth'
										})
									} else {
										that.HMmessages.show('稍后可在个人中心进行绑定!', {
											duration: 10000,
											closeButton: true
										});
									}
								}
							})
							//that.HMmessages.show(data.err,{duration:3000});
						}
					}
				})
			},
			goPage(url,id) {
				let that = this
				if (!util.chkLogin()) {
					that.HMmessages.show('请登录后操作', {
						icon: 'error',
						duration: 3000
					});
					return
				}
				if(3==id&&that.Power==0){
					that.HMmessages.show('你暂时无权查看', {
						icon: 'error',
						duration: 3000
					});
					return
				}
				if (url) {
					uni.navigateTo({
						url
					});
				} else {
					util.log('敬请期待')
				}
			},
			//待办事宜跳转  时间过滤为36500
			tapSwitch(tap,state) {
				let that = this
				if (!util.chkLogin()) {
					that.HMmessages.show('请登录后操作', {
						icon: 'error',
						duration: 3000
					});
					return
				}
				uni.navigateTo({
					url: `./flowWork/flowWork?tap=${tap}&state=${state}`
				});
			},
			//点击轮播图跳转连接
			tapPlant(url) {
				return
				let that = this
				console.log(',,', url)
				uni.navigateTo({
					url: `./webview?url=${encodeURI(url)}`
				})
			},
			getToDay(f){
				let hour = new Date().getHours()
				if(hour < 6){f("凌晨好")}
				else if (hour < 9){f("早上好")}
				else if (hour < 12){f("上午好")}
				else if (hour < 14){f("中午好")}
				else if (hour < 17){f("下午好")}
				else if (hour < 19){f("傍晚好")}
				else if (hour < 22){f("晚上好")}
				else {f("夜里好")}
			},
			changeIndicatorDots(e) {
				this.indicatorDots = !this.indicatorDots
			},
			changeAutoplay(e) {
				this.autoplay = !this.autoplay
			},
			intervalChange(e) {
				this.interval = e.target.value
			},
			durationChange(e) {
				this.duration = e.target.value
			},
			onReady: function() {
				const that = this;

				//that.$refs.skeleton.attachedAction();

				//that.$refs.skeleton.readyAction();

				setTimeout(() => {
					that.showSkeleton = false;
				}, 2000);
			}
		}
	}
</script>

<style>
	.hometop {
		position: relative;
	}

	/* .hometop image{ width:750upx;height:533upx;} */
	.prointro {
		position: absolute;
		color: #fff;
		flex-direction: column;
		width: 100%;
		align-items: center;
		align-self: center;
	}

	.chinese {
		font-size: 54upx;
		margin-bottom: 20upx;
	}

	.english {
		font-size: 30upx;
		transform: scale(0.7);
	}

	.tag {
		position: relative;
	}

	.tag button {
		position: absolute;
		width: 176upx;
		opacity: 0;
		z-index: 99;
		font-size: 24upx;
		height: 180upx;
		top: 0;
		left: 0;
	}

	.locationline {
		position: absolute;
		top: 0;
		width: 100%;
		height: 30px;
		justify-content: flex-start;
		align-items: center;
		font-size: 14px;
		color: #eee;
		padding-left: 30upx;
		white-space: nowrap;
		overflow: hidden;
		left: 0;
		box-sizing: border-box;
		z-index: 99;
	}

	.swiper {
		width: 100%;
		height: 250upx;
	}

	swiper-item {
		width: 100%;
	}

	.swiper-item image {
		height: 250upx;
	}

	.fdc {
		width: 750upx;
		box-sizing: border-box;
		padding: 30upx;
		border-top: 20upx solid #f5f5f5;
	}

	.pimgbox image,
	.pimgbox {
		width: 200upx;
		height: 150upx;
	}

	.pictext {
		width: 690upx;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 30upx;
		margin-top: 20upx;
		box-shadow: 0 0 10upx 0 rgba(0, 0, 0, 0.2);
		border-radius: 14upx;
		flex-direction: column;
	}

	.ptext {
		width: 670upx;
		flex-direction: column;
	}

	.daynews {
		width: 100%;
		font-size: 24upx;
		color: #999;
		margin-bottom: 28upx;
	}

	.pic-tit {
		font-size: 32upx;
		color: #333;
		font-weight: bold;
		margin-bottom: 28upx;
	}

	.pic-con {
		font-size: 28upx;
		color: #666;
		text-overflow: ellipsis;
		lines: 2;
		display: -webkit-box;
		white-space: normal;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.twonavcon {
		width: 100%;
		border-top: 8upx solid #f5f5f5;
		flex-direction: column;
	}

	.twonav {
		background: #fff;
	}

	.twonav-tit {
		font-size: 32upx;
		color: #333;
		font-weight: bold;
		padding-left: 30upx;
		padding-top: 30upx;
	}

	.fdc .twonav-tit {
		padding-bottom: 30upx;
		padding-top: 0;
		padding-left: 0;
	}

	.text-row-item {
		display: flex;
		flex-direction: row;
	}

	.text-red {
		color: red;
	}

	.text-left15 {
		margin-left: 15upx;
	}

	.twonavcon2 {
		width: 100%;
		border-top: 10upx solid #f5f5f5;
		/* border-bottom: 10upx solid #f5f5f5; */
		flex-direction: column;
	}

	.twonav2 {
		margin-bottom: 10upx;
		background: #fff;
	}

	.twonav-text {
		display: flex;
		flex-direction: column;
		flex: 1;
		align-items: center;
		/*  子元素相对父元素垂直居中 */
	}

	.na-text-padf {
		position: absolute;
		margin-left: -295rpx;
		margin-top: 84rpx;
	}

	.na-text-padftext {
		position: absolute;
		margin-left: -160rpx;
		margin-top: 64rpx;
		border-radius: 15rpx;
		min-width: 40rpx;
		background: #dd524d;
		color: #fff;
		line-height: 40rpx;
		text-align: center;
		padding: 0 10rpx;
		font-size: 20rpx !important;
		white-space: nowrap;
		z-index: 10;
		box-shadow: 0 0 0 1px #fff;
		box-sizing: border-box;
	}
	.na-text-padfmouth {
		position: absolute;
		margin-left: -85rpx;
		margin-top: 8rpx;
		border-radius: 15rpx;
		min-width: 30rpx;
		background: #D4D4D4;
		color: #fff;
		line-height: 30rpx;
		text-align: center;
		padding: 0 10rpx;
		font-size: 20rpx;
		white-space: nowrap;
		z-index: 10;
		box-shadow: 0 0 0 1px #fff;
		box-sizing: border-box;
	}
	.na-text-padf-qy {
		position: absolute;
		margin-left: -295rpx;
		margin-top: 50rpx;
	}
	.na-text-padf-rg {
		position: absolute;
		margin-left: -295rpx;
		margin-top: 110rpx;
	}
	.na-text-padf-hk {
		position: absolute;
        margin-left: -295rpx;
        margin-top: 80rpx;
	}
	.na-text-padf-kl {
		position: absolute;
		margin-left: -295rpx;
		margin-top: 30rpx;
	}
	.na-text-padf-kl-t {
		position: absolute;
		margin-left: -295rpx;
		margin-top: 60rpx;
	}
	.na-text-padf-kl2 {
		position: absolute;
		margin-left: -295rpx;
		margin-top: 100rpx;
	}
	.na-text-padf-kl-t2 {
		position: absolute;
		margin-left: -295rpx;
		margin-top: 130rpx;
	}
	.fonsize9{
		font-size: 0.9em;
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
