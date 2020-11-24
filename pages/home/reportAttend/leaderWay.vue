<template>
     <view>
            <view class="content">
                <view>
                    <picker style="width: 40%;" @change="chg_picker" data-a="ManGUID" data-b="leader_stor_arr" :range="leader_arr">
                    <view>领导:</view><view class="blu-decoration">{{leader_arr[dataStor['ManGUIDIdx']]||'请选择'}}</view>
                    </picker>
                    <picker style="width: 40%;" mode="date" start="2015-09-01" end="2099-09-01" @change="bindDateChange">
                    <view>日期:</view><view class="blu-decoration">{{data.date}}</view>
                    </picker>
                <button class="cs-btn" size="mini" plain="true" @click="tapGo('./leaderWayAdd')">新增行程</button>
                </view>
                <view class="demo_line_02"></view>
                <view class="con-item" v-for="(item,idx) in dataList" :key="idx">
                    <view class="con-memo1">
                        #{{item.ActDate}}
                    </view>
                    <view class="con-memo2">
                        时间&nbsp;&nbsp;&nbsp;&nbsp;{{cursorMark['a_'+item.BeginTime]}}-{{cursorMark['a_'+item.EndTime]}}
                    </view>
                    <view class="con-memo2">
                        事项&nbsp;&nbsp;&nbsp;&nbsp;{{item.ActType}}
                    </view>
                </view>
                <view class="cs-nodata" v-if="dataList.length==0">暂无数据</view>
            </view>
        </view>
</template>

<script>
	let util = require('@/common/util.js')
	export default {
		data() {
			return {
                data: {//检索使用
                    ManGUID:'55E3CF0F2ADB494FA93E8080D5C658FB',//哪个领导
                	date: util.dateFtt('yyyy-MM-dd',new Date())//时间精确到day
                },
                dataStor:{//显示数据用
                    ManGUIDIdx:1//默认1 殷总
                },
                leader_arr: ['请选择','殷秋萍(殷总)'],//领导选择
                leader_stor_arr: ['','55E3CF0F2ADB494FA93E8080D5C658FB'],//领导选择 入库
                dataList:[],//页面上显示的行程列表
                cursorMark:{
                    a_1:'08:00',a_2:'08:30',a_3:'09:00',a_4:'09:30',a_5:'10:00',a_6:'10:30',a_7:'11:00',a_8:'11:30',a_9:'12:00',a_10:'12:30',a_11:'13:00',a_12:'13:30',
                    a_13:'14:00',a_14:'14:30',a_15:'15:00',a_16:'15:30',a_17:'16:00',a_18:'16:30',a_19:'17:00',a_20:'17:30',a_21:'18:00',a_22:'18:30',a_23:'19:00',a_24:'19:30'
                }
			}
		},
		// onLoad() {
		// 	let that = this
		// 	that.initData()
		// },
        onShow(){
            let that = this
            that.initData()
        },
		methods: {
			//初始化项目列表
			initData() {
                let that = this
				util.uniFly.post({
					url: that.RP.WX_INITLEADERWAY,
					params: that.data
				}).then(function(res) {
					if (typeof(res) != 'undefined' && res.status == 200) {
						let data = res.data
						if (typeof(data) != 'undefined' && data.errNo == 0) {
                            that.dataList = data.retVal;
						}
					}
				})
			},
            //picker下拉框触发
            //b:val值需要从b数组中拿取
            chg_picker(e) {
            	let that = this
            	let a = e.currentTarget.dataset.a//data.pop
            	let b = e.currentTarget.dataset.b//从哪个数组对象里面取值传回后台
            	let idx = e.target.value//下标
            	console.log('a='+a+'   b=' + b + '   val=' + idx)
            	that.dataStor[a+'Idx'] = idx//在组件上显示选取的值
                that.data[a] = that[b][idx]
            },
            bindDateChange(e) {
                let that = this
                console.log('picker发送选择改变，携带值为', e.detail.value)
                that.data.date = e.detail.value
                that.initData()
            },
            tapGo(url){
                console.log(url)
                if(!url){
                    util.log('敬请期待!')
                    return
                }
                uni.navigateTo({
                    url
                })
            }
		}
	}
</script>

<style>
    .content {
            width: 100vw;
            height: 100vh;
        }
        .con-item {
            background-color: #ffaa7f;
            border: 1upx solid #FFFFFF;
        }
        .blu-decoration{
        	color:blue;
        	text-decoration: underline;
        }
        .cs-btn{
            width: 180rpx;
            height: 63rpx;
           background-color: #7FB80E !important;
        }
        .demo_line_02{
            height: 1px;
            border-top: 1px solid #ddd;
            text-align: center;
        }
        .con-memo1{
            background-color: #a5a5a5;
        }
        .con-memo2{
            background-color: #e6e6e6;
        }
        .cs-nodata{
            margin-top: 418rpx;
            margin-left: 297rpx;
        }
</style>
