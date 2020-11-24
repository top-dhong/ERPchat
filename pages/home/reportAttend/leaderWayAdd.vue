<template>
	<view class="evan-form-show">
        <HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages" @clickMessage="clickMessage"></HMmessages>
		<evan-form ref="form" :model="data">
            <evan-form-item label="选择领导：" :label-style="{color:'blue'}" prop="ManGUID" :border="false">
                <picker @change="chg_picker" data-a="ManGUID" data-b="leader_stor_arr" :range="leader_arr">
                	<view class="uni-input">{{leader_arr[dataStor['ManGUIDIdx']]||'请选择'}}</view>
                </picker>
            </evan-form-item>
            <evan-form-item label="开始日期：" :label-style="{color:'blue'}" prop="ActDate" :border="false">
                <picker mode="date" start="2015-09-01" end="2099-12-01" @change="bindDateChange">
                    <view class="uni-input">
                      {{data.ActDate||'请选择'}}
                    </view>
                  </picker>
            </evan-form-item>
            <evan-form-item label="开始时间：" :label-style="{color:'blue'}" prop="BeginTime" :border="false">
                <picker @change="chg_picker" data-a="BeginTime" data-b="timer_stor_arr" :range="timer_arr">
                	<view class="uni-input">{{timer_arr[dataStor['BeginTimeIdx']]||'请选择'}}</view>
                </picker>
            </evan-form-item>
            <evan-form-item label="结束时间：" :label-style="{color:'blue'}" prop="EndTime" :border="false">
                <picker @change="chg_picker" data-a="EndTime" data-b="timer_stor_arr" :range="timer_arr">
                	<view class="uni-input">{{timer_arr[dataStor['EndTimeIdx']]||'请选择'}}</view>
                </picker>
            </evan-form-item>
            <evan-form-item label="行程事项：" :label-style="{color:'blue'}" prop="ActType" :border="false">
                <picker @change="chg_picker" data-a="ActType" data-b="actType_stor_arr" :range="actType_arr">
                	<view class="uni-input">{{actType_arr[dataStor['ActTypeIdx']]||'请选择'}}</view>
                </picker>
            </evan-form-item>
		</evan-form>
		<button @click="save" :loading="loading" :disabled="btnDisabled" class="evan-form-show__button" style="background:#F65332;padding-bottom: 10px;">{{btnStr}}</button>
        <view style="height:7px;"> </view>
	</view>
</template>

<script>
    let util = require('@/common/util.js');
	export default {
		data() {
			return {
				// 表单的内容必须初始化
				data: {
                    ManGUID:'55E3CF0F2ADB494FA93E8080D5C658FB',//哪个领导
					BeginTime: '',
                    EndTime:'',
                    ActDate:util.dateFtt('yyyy-MM-dd',new Date()),
                    ActType:"",//出差类型
				},
                dataStor:{//显示数据用
                     ManGUIDIdx:1//默认1 殷总
                },
                btnStr:'提交',
                btnDisabled:false,
				leader_arr: ['请选择','殷秋萍(殷总)'],//领导选择
				leader_stor_arr: ['','55E3CF0F2ADB494FA93E8080D5C658FB'],//领导选择 入库
                timer_arr: ['请选择','08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30'],//时间选择
                timer_stor_arr: ['',1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],//时间选择  入库
                actType_arr: ['请选择', '出差', '外出', '空闲'],
                actType_stor_arr: ['', '出差', '外出', '空闲'],
                rules: {
					ManGUID: {
						required: true,
						message: '请选择领导'
					},
					BeginTime: {
						required: true,
						message: '请选取开始时间'
					},
                    EndTime: {
                    	required: true,
                    	message: '请选取结束时间'
                    },
                    ActDate: {
                    	required: true,
                    	message: '请选取出差时间'
                    },
                    ActType: {
                    	required: true,
                    	message: '请选取出差类型'
                    }
				}
			}
		},
		mounted() {
			// 这里必须放在mounted中，不然h5，支付宝小程序等会找不到this.$refs.form
			this.$refs.form.setRules(this.rules)
		},
        onLoad(){
           // this.initData()
        },
		methods: {
            //提交
			save() {
                let that = this
                console.log(11,that.data)
                that.loading = true
                let par = that.data;// that.filter(that.data)
                //console.log(1,par)
                par['UserGUID'] = util.chkLogin()
				that.$refs.form.validate((res) => {
					if (res) {
                        if(par.BeginTime>par.EndTime){
                            that.HMmessages.show("开始时间不可大于结束时间!",{icon:'error',duration:2e3});
                            that.loading = false
                        }else{
                            util.uniFly.post({
                            	url: that.RP.WX_SAVELEADERWAY,
                            	params: par
                            }).then(function(res) {
                                that.loading = false
                            	if (typeof(res) != 'undefined' && res.status == 200) {
                            		if(typeof(res.data)!='undefined'&&res.data.errNo==0){
                                       that.HMmessages.show('提交成功!',{icon:'success',duration:2e3});
                                       that.btnStr = '提交成功'
                                       that.btnDisabled = true
                                       setTimeout(()=>{uni.navigateBack()},2500)
                                    }else{
                                        that.btnDisabled = false
                                        that.loading = false
                                        that.HMmessages.show(res.data.errDesc,{icon:'error',duration:2e3});
                                    }
                            	}
                            })
                        }
					}else{
                        that.loading = false
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
                that.data.ActDate = e.detail.value
            }
		}
	}
</script>

<style lang="scss">
	.evan-form-show {
		padding: 0 30rpx;
		background-color: #fff;

		.form-input {
			font-size: 28rpx;
			color: #333;
			// text-align: right;
			width: 100%;
			box-sizing: border-box;
			height: 60rpx;
            margin-top: 7px;
			&.textarea{
				height: 240rpx;
				padding: 24rpx 0;
				text-align: left;
			}
		}

		.form-input-placeholder {
			font-size: 28rpx;
			color: #999;
		}

		&__button {
			width: 100%;
			height: 88rpx;
			border-radius: 8rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0;
			font-size: 36rpx;
			color: #fff;
			margin-top: 20rpx;
			background-color: #2D87D5;

			&::before,
			&::after {
				border: none;
			}
		}

		.customize-form-item {
			&__label {
				font-size: 28rpx;
				color: #333;
				margin-bottom: 16rpx;
			}

			&__radio {
				display: flex;
				align-items: center;
				margin-bottom: 16rpx;

				&__text {
					font-size: 28rpx;
					color: #333;
				}
			}
		}
	}

    .btn {
        display: inline-block;
        vertical-align: middle;
        background: #f0f0f0 no-repeat center;
        border: 1px solid #d0d0d0;
        width: 22px;
        height: 22px;
        border-radius: 5px;
        box-shadow: 0 1px rgba(100, 100, 100, .1);
        color: #666;
        transition: color .2s, background-color .2s;
        margin: auto 15rpx;
    }

    .btn:active {
        box-shadow: inset 0 1px rgba(100, 100, 100, .1);
    }

    .btn:hover {
        background-color: #e9e9e9;
        color: #333;
    }

    .btn_plus {
        color: #1AAD19;
        background-image: linear-gradient(to top, currentColor, currentColor), linear-gradient(to top, currentColor, currentColor);
        background-size: 10px 2px, 2px 10px;
    }
    .btn_minus {
        color: #C40000;
        background-image: linear-gradient(to top, currentColor, currentColor);
        background-size: 10px 2px;
    }
    .uni-input{
        font-size: 28rpx;
        color: #333;
        width: 100%;
        box-sizing: border-box;
        height: 60rpx;
        margin-top: 25rpx;
    }
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
    .footerbtn{
        display: flex;
        box-sizing: border-box;

    }
    .biaofun-datetime-picker-cs view{
        margin-top: 27rpx;
    }
    /*分割线样式*/
    .divLine{
     background: #E0E3DA;
     width: 100%;
     height: 5rpx;
    }
</style>
