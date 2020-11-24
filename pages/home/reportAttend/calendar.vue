<template>
	<view class="content">
	    <ren-calendar ref='ren' :markDays='markDays' weekstart="1" @onDayClick='onDayClick' @changeMonthClick="changeMonthClick"></ren-calendar>
        <view class="box">
        	<!-- 步骤条 -->
        	<view class="set-1">
        		<view class="set-2" :key="index" v-for="(item,index) in MeetList" @click="tapDetail(item);talkOrAsk()">
        			<text class="set2-test">{{cursorMark['a_'+item.BeginTime]}}-{{cursorMark['a_'+item.EndTime]}}</text>
        			<view class="set-view">
        				<view class="set-view-test">
        					<view class="set-view-test2">{{item.MeetTitle}}</view>
        				</view>
        				<view class="set-view-test3">主持人：{{item.UserName}}</view>
        				<view class="set-view-test4">
        					<view class="set-zuo">会议室：{{item.MtName}}</view>
        				</view>
        			</view>
        		</view>
        	</view>
        </view>
	</view>
</template>

<script>
        let util = require('@/common/util.js');
        import RenCalendar from '@/components/ren-calendar/ren-calendar.vue'
        export default {
            components:{
                RenCalendar
            },
            data() {
                return {
                    curDate:'',
                    markDays:[],//标记当前月有会议的天
                    cursorMark:{
                        a_1:'08:00',a_2:'08:30',a_3:'09:00',a_4:'09:30',a_5:'10:00',a_6:'10:30',a_7:'11:00',a_8:'11:30',a_9:'12:00',a_10:'12:30',a_11:'13:00',a_12:'13:30',
                        a_13:'14:00',a_14:'14:30',a_15:'15:00',a_16:'15:30',a_17:'16:00',a_18:'16:30',a_19:'17:00',a_20:'17:30',a_21:'18:00',a_22:'18:30',a_23:'19:00',a_24:'19:30',
                        a_25:'20:00',a_26:'20:30',a_27:'21:00',a_28:'21:30',a_29:'22:00',a_30:'22:30'
                    },
                    MeetList:[]
                }
            },
            onReady() {
                let today = this.$refs.ren.getToday().date;
                console.log(22,today)
                this.curDate = today;
                this.GetMeetCalendar(today)
                this.initData(util.dateFtt('yyyy-MM',today))
               // this.markDays.push(today);
            },
            methods: {
                initData(CurMouth){
                    let that = this
                    util.uniFly.post({
                    	url: that.RP.WX_GETCURMOUTHCALENDAR,
                    	params: {CurMouth}
                    }).then(function(res) {
                    	if (typeof(res) != 'undefined' && res.status == 200) {
                    		let data = res.data
                    		if(typeof(data)!='undefined'&&data.errNo==0){
                               that.markDays = data.retVal.map((item)=>{return item.MeetDate})
                    		}else if(data.errNo==3){
                                that.markDays = []
                            }
                    	}
                    })

                },
                GetMeetCalendar(MeetDate){
                    let that = this
                    util.uniFly.post({
                    	url: that.RP.WX_GETMEETCALENDAR,
                    	params: {MeetDate}
                    }).then(function(res) {
                    	if (typeof(res) != 'undefined' && res.status == 200) {
                    		let data = res.data
                    		if(typeof(data)!='undefined'&&data.errNo==0){
                               that.MeetList = data.retVal
                    		}else if(data.errNo==3){
                                that.MeetList = []
                            }
                    	}
                    })
                },
                //主动切换月份  清空会议
                changeMonthClick(date){
                    let that = this
                    let CurMouth = date;//util.dateFtt('yyyy-MM',date)
                    let today = that.$refs.ren.getToday().date;
                    let newCurMouth = util.dateFtt('yyyy-MM',today)
                    that.initData(CurMouth)
                    if(newCurMouth==CurMouth){that.GetMeetCalendar(today)}else{that.MeetList = []}
                },
                onDayClick(e){
                    console.log(1,e)
                    this.GetMeetCalendar(e.date)
                    //this.curDate = data.date;
                },
                tapDetail(item){
                    uni.navigateTo({
                        url:`./calendarDetail?GUID=${item.GUID}`
                    })
                },
                talkOrAsk() {
                    uni.requestSubscribeMessage({
                      tmplIds: util.tmplIds
                    })
                }
            }
        }
</script>

<style lang="scss" scoped>
	.box{
	}
	.set-2:last-child::after {
		display: none;
	}
	.set2-test{
		font-size: 26rpx;
		color: #78849e;
	}
	.set-1 {
		margin: 30upx;
	}

	.set-2 {
		height:340rpx;
		border-radius: 10upx;
		width: 600upx;
		margin-left: 100upx;
		position: relative;
		.set-view{
			width: 100%;
			height: 266rpx;
			background-color: #ffffff;
			box-shadow: 0px 4px 16px 0px rgba(69, 91, 99, 0.08);
			border-radius: 12rpx;
			.set-view-test{
				width: 538rpx;
				margin: 0 auto;
				padding-top: 26rpx;
				padding-bottom: 30rpx;
				border-bottom: 1px solid  #78849e;
				.set-view-test1{
					width: 100%;
					height: 32rpx;
					font-size: 26rpx;
					line-height: 32rpx;
					color: #959dad;
				}
				.set-view-test2{
					width: 100%;
					height: 32rpx;
					font-family: Gibson;
					font-size: 32rpx;
					color: #959dad;
					color: #454f63;
				}
			}
			.set-view-test3{
				width: 538rpx;
				margin: 0 auto;
				height: 32rpx;
				font-size: 26rpx;
				line-height: 32rpx;
				color: #959dad;
				margin-top: 26rpx;
			}
			.set-view-test4{
				width: 538rpx;
				margin: 6rpx auto;
				display: flex;
				align-items: center;
				.set-zuo{
					width: 70%;
					height: 32rpx;
					font-size: 12px;
					line-height: 32rpx;
					color: #959dad;
				}
				.set-you{
						width: 30%;
						text-align: right;
						height: 42rpx;
						font-size: 32rpx;
						line-height: 42rpx;
						color: #3497fd;
						text-decoration: underline;
				}
			}
		}
	}


	.set-2::after {
		content: '';/* 必须存在如果没有图标就留空 */
		top: 24%;/* 定位 距离*/
		border-style: dotted;
		border-left: 1px ;/* 横线颜色 */
		border-color: #78849e;
		left: -82upx;/* 定位 距离*/
		height: 69%;/* 高度 */
		position: absolute;/* 定位 */
	}

	.set-2::before {
		content: "";/* 必须存在如果没有图标就留空 */
		background: url(../../../static/meet.jpg) no-repeat;
		background-size: 66rpx 66rpx;
		width: 66rpx;
		height: 66rpx;
		position: absolute;/* 定位 */
		left: -108upx;/* 移动到左边 */
		font-weight: bold;/* 图标样式在复制的图标文件中复制相对应的图标样式必须存在 */
		font-family: "iconfont" !important;/* 图标样式在复制的图标文件中复制相对应的图标样式必须存在 */
		font-size: 54upx;/* 图标大小 */
		font-style: normal;/* 图标样式在复制的图标文件中复制相对应的图标样式必须存在 */
		-webkit-font-smoothing: antialiased;/* 图标样式在复制的图标文件中复制相对应的图标样式必须存在 */
		-moz-osx-font-smoothing: grayscale;/* 图标样式在复制的图标文件中复制相对应的图标样式必须存在 */
	}



</style>
