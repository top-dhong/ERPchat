<template>
	<view class="evan-form-show">
        <HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages" @clickMessage="clickMessage"></HMmessages>
		<evan-form ref="form" :model="data">
			<evan-form-item label="会议主题：" prop="MeetTitle">
				<input class="form-input" :value="data.MeetTitle" disabled/>
			</evan-form-item>
            <evan-form-item label="会议类型：" prop="MeetType">
            	<input class="form-input" :value="data.MeetType" disabled/>
            </evan-form-item>
            <evan-form-item label="主持人：" prop="LeadingMan">
            	<input class="form-input" :value="data.LeadingMan" disabled/>
            </evan-form-item>
            <evan-form-item label="记录人：" prop="RecordMan">
            	<input class="form-input" :value="data.RecordMan" disabled/>
            </evan-form-item>
            <evan-form-item label="会议时间：" prop="MeetDate">
            	<input class="form-input" :value="data.MeetDate" disabled/>
            </evan-form-item>
            <evan-form-item label="开始时间：" prop="BeginTime">
            	<input class="form-input" :value="cursorMark['a_'+data.BeginTime]" disabled/>
            </evan-form-item>
            <evan-form-item label="结束时间：" prop="EndTime">
            	<input class="form-input" :value="cursorMark['a_'+data.EndTime]" disabled/>
            </evan-form-item>
            <evan-form-item label="会议室名称：" prop="MtName">
            	<input class="form-input" :value="data.MtName" disabled/>
            </evan-form-item>
            <evan-form-item label="会议室区域：" prop="MtArea">
            	<input class="form-input" :value="data.MtArea" disabled/>
            </evan-form-item>
            <evan-form-item label="会议地点：" prop="MtAddr">
            	<input class="form-input" :value="data.MtAddr" disabled/>
            </evan-form-item>
            <evan-form-item label="会议室大小：" prop="ManCount">
            	<input class="form-input" :value="data.ManCount" disabled/>
            </evan-form-item>
            <evan-form-item label="会议室配备：" prop="EquipNameStr">
            	<input class="form-input" :value="data.EquipNameStr" disabled/>
            </evan-form-item>
            <view class="divLine"></view>
			<evan-form-item label="参会人员：" prop="JoinMans" label-position="top">
				<textarea class="form-input textarea" :value="data.JoinMans" disabled/>
            </evan-form-item>
		</evan-form>
        <button @click="tapNotify" class="evan-form-show__button" style="background:#F65332;">会议开始15分钟前通知我</button>
         <view style="height:7px;"> </view>
	</view>
</template>

<script>
    let util = require('@/common/util.js');
	export default {
		data() {
			return {
                MeetGUID:'',
                cursorMark:{
                    a_1:'08:00',a_2:'08:30',a_3:'09:00',a_4:'09:30',a_5:'10:00',a_6:'10:30',a_7:'11:00',a_8:'11:30',a_9:'12:00',a_10:'12:30',a_11:'13:00',a_12:'13:30',
                    a_13:'14:00',a_14:'14:30',a_15:'15:00',a_16:'15:30',a_17:'16:00',a_18:'16:30',a_19:'17:00',a_20:'17:30',a_21:'18:00',a_22:'18:30',a_23:'19:00',a_24:'19:30',
                    a_25:'20:00',a_26:'20:30',a_27:'21:00',a_28:'21:30',a_29:'22:00',a_30:'22:30'
                },
				data: {
				}
			}
		},
        onLoad(e){
            this.MeetGUID = e.GUID
            this.initData(e.GUID)
        },
		methods: {
            initData(GUID){
                let that = this
                util.uniFly.post({
                	url: that.RP.WX_GETMEETDETAILBYMEETGUID,
                	params: {GUID}
                }).then(function(res) {
                	if (typeof(res) != 'undefined' && res.status == 200) {
                		let data = res.data
                		if(typeof(data)!='undefined'&&data.errNo==0){
                            that.data = data.retVal
                		}
                	}
                })
            },
            tapNotify(){
                let that = this
                let TemplateID = 'b4xaTChXyxYifgqOxAH1YGGQO4IZZnYJHfL6qoHenw4';
                uni.requestSubscribeMessage({
                  tmplIds: util.tmplIds,
                  success (res) {
                      console.log('res',res)
                      let par = {OpenID:util.getDB("openid"),ManGUID:util.getDB("User")["UserGUID"],MeetGUID:that.MeetGUID,TemplateID, Page:`pages//home/reportAttend/calendarDetail?GUID=${that.MeetGUID}`, HintType:'会议即将开始提醒', EarlyMin:'15'}
                        util.uniFly.post({
                            url: that.RP.WX_INSERTWXSUBSCRIBENOTIFY,
                            params: par
                        }).then(function() {
                            that.HMmessages.show(`将在会议开始${par.EarlyMin}分钟前微信通知您`,{icon:'success',duration:3e3});
                        })
                  },
                  fail(err){
                      console.log('err',err)
                  }
                })
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
