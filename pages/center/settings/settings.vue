<template>
	<form class="index bgf" report-submit="true" @submit="tapSucc">
		<view class="appbox">
			<view class="appbox-con">
				<!-- <view class="inputboxs2">
					<view class="inputname">待办提醒:</view>
					<view class="radiobox">
						<radio-group @change="cge_radio" data-a="IsPostMsg">
							<label class="uni-list-cell uni-list-cell-pd">
								<view>
									<radio value="1" :checked="'1'==data['IsPostMsg']" color="#FF5800" />
								</view>
								<view>是</view>
							</label>
							<label class="uni-list-cell uni-list-cell-pd">
								<view>
									<radio value="0" :checked="'0'==data['IsPostMsg']" color="#FF5800" />
								</view>
								<view>否</view>
							</label>
						</radio-group>
					</view>
				</view> -->
                <view class="inputboxs">
                    <button class="uni-button but-coor-1" @click="talkOrAsk">订阅消息提醒设置</button>
                    <!-- <button class="uni-button but-coor-2" @click="tapClickMy">使用我自己账号审批</button> -->
                </view>
			</view>
		</view>
		<view style="height: 40px;"></view>
		<!-- <view class="footerbtn">
			<view class="colbtn" @click="tapReset">重置</view>
			<button class="colbtn on" form-type="submit">保存</button>
		</view> -->
	</form>
</template>
<script>
	let util = require('@/common/util.js')
	export default {
		//存储数据 XXX_stor_arr 显示数据 XXX_arr
		data() {
			return {
				data: {
                    counttap:0,//统计提交次数
                    isEdit:!1,//是否更改过页面数据
					IsPostMsg:1
				},
				stor_data:{
					IsPostMsg:1
				}
            };
		},
		onLoad(o){
            //初始化加载用户个人设置
			let that = this
            let aDoUserGUID = util.chkLogin();
            util.uniFly.post({
            	url: that.RP.WX_GETISPOSTMSGBYOPENID,
            	params: {guid:aDoUserGUID}
            }).then(function(res) {
                if (typeof(res) != 'undefined' && res.status == 200) {
                	let data = res.data
                	if(typeof(data)!='undefined'&&data.errNo==0){
                		that.data.IsPostMsg = data.retVal
                	}
                }
            })
		},
		methods: {
            talkOrAsk() {
                uni.requestSubscribeMessage({
                  tmplIds: util.tmplIds
                })
            }
		}
	}
</script>

<style lang="scss" scoped>
	.appbox {
		width: 750upx;
		background: #FFFFFF;
		margin-top: 15upx;
		padding: 20upx;
		box-sizing: border-box;
		flex-direction: column;
	}

	.appbox-top {
		justify-content: center;
		margin: 10upx 6upx 40upx;
		font-size: 40upx;
		font-weight: bold;
		color: #333
	}

	.appbox-con {
		padding: 15upx 0;
		flex-direction: column;
	}

	.inputboxs2 {
		font-size: 26upx;
		padding-left: 41upx;
		margin: 15upx 0;
		color: #7d7d7d;

		.inputname {
			width: 6.5em;
			white-space: nowrap;
			flex: 0 0 6.5em;
			color: #000;
		}

		.pickbox {
			flex: 1;
			border: 1px solid #ececec;

			picker {
				height: 1.4rem;
				width: 100%;
				line-height: 1.4rem;
				padding-left: 10upx;
			}

			input {
				padding-left: 10upx;
			}
		}
		.pickbox.specal{
			border: 0;
			align-items: center;
			picker{
				border: 1px solid #ececec
			}
		}

		.pickbox.type2 {
			flex: 0 1 220upx;
		}

		.pickbox.type3 {
			flex: 0 1 334upx;
		}
		.pickbox.type4 {
			flex: 0 1 80upx;
		}

		.littleinput {
			padding-left: 10upx;
			border: 1px solid #ececec;
			align-self: center;
		}

		textarea {
			width: 540upx;
			flex: 0 1 540upx;
			border: 1px solid #ececec;
			padding: 10upx;
		}

		.type2.input {
			width: 540upx;
			flex: 0 1 540upx;
		}

		.type3.input {
			width: 184upx;
			flex: 0 1 184upx;
		}

		.input {
			border: 1px solid #ececec;
			width: 300upx;
			flex: 0 1 300upx;

			input {
				font-size: 26upx;
				font-weight: normal;
				padding-left: 10upx;
			}

			.picker {
				font-size: 26upx;
				padding-left: 10upx;
			}
		}
	}

	.radiobox {
		padding: 10upx 0;

		radio-group {
			display: flex;

			.uni-list-cell {
				display: flex;
				width: 200upx;

				view {
					align-self: center;
				}
			}
		}

		checkbox-group {

			// display: flex;
			label {
				width: 200upx;
				display: inline-flex;
			}

		}
	}

	.savebtn {
		margin: 30upx 0;
	}

	view.ascenter {
		flex: 0 0 4em;
		margin-left: 10upx;
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
