<template>
	<view class="evan-form-show">
        <HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages" @clickMessage="clickMessage"></HMmessages>
		<evan-form ref="form" :model="data">
			<evan-form-item label="流程主题：" prop="Subject">
				<input class="form-input" placeholder-class="form-input-placeholder" v-model="data.Subject" placeholder="请输入流程主题" />
			</evan-form-item>
            <!-- <evan-form-item label="流程编号：" prop="BillID">
            	<input class="form-input" placeholder-class="form-input-placeholder" v-model="data.BillID"/>
            </evan-form-item> -->
       <!--     <evan-form-item label="申请人员：" prop="Create_UserName">
            	<input class="form-input" placeholder-class="form-input-placeholder" v-model="data.Create_UserName"/>
            </evan-form-item>
            <evan-form-item label="申请部门：" prop="Create_DeptName">
            	<input class="form-input" placeholder-class="form-input-placeholder" v-model="data.Create_DeptName"/>
            </evan-form-item>
            <evan-form-item label="申请时间：" prop="Create_Date">
            	<input class="form-input" placeholder-class="form-input-placeholder" v-model="data.Create_Date"/>
            </evan-form-item>
            <evan-form-item label="所属业态：" prop="Create_DeptName">
            	<input class="form-input" placeholder-class="form-input-placeholder" v-model="data.Create_DeptName"/>
            </evan-form-item> -->
            <evan-form-item label="项目名称：" prop="ProjectName">
            	<input class="form-input" placeholder-class="form-input-placeholder" v-model="data.ProjectName" @click="chgDrawer" placeholder="请选择" disabled/>
            </evan-form-item>
            <evan-form-item label="公司名称：" prop="OrgName">
                <picker @change="chg_picker" data-a="OrgName" data-b="OrgName_stor_arr" data-c="OrgGUID" data-d="OrgName_arr" :range="OrgName_arr">
                	<view class="uni-input">{{OrgName_arr[data['OrgNameIndex']]||'请选择'}}</view>
                </picker>
            	<!-- <input class="form-input" placeholder-class="form-input-placeholder" v-model="data.OrgName"/> -->
            </evan-form-item>
            <evan-form-item label="计算周末(勾选以后才能跨周末/节假期请假)：" :label-style="{color:'red'}" prop="text11">
            	<switch class="form-input" v-model="data.text11" @click="Switch"/>
            </evan-form-item>
            <evan-form-item prop="sex">
            	<template slot="formItem">
            		<view class="customize-form-item">
            			<view class="customize-form-item__label">请假事件列表：
                            <view class="btn btn_plus" @click="tapPlus"></view>
                            <view class="btn btn_minus" @click="tapMinus"></view>
                        </view>
                        <view v-for="(item,idx) in data.leavList">
                            <view class="divLine"></view>
                            <evan-form-item label="请假类型：" :label-style="{color:'blue'}" prop="text1" :border="false">
                            	<!-- <input class="form-input" placeholder-class="form-input-placeholder" v-model="item.text1" placeholder="请输入请假类型" /> -->
                                <picker @change="chg_picker2($event,idx);changeTex14(idx);" data-a="text1" data-b="text1_stor_arr" data-d="text1_arr" :range="text1_arr">
                                	<view class="uni-input">{{text1_arr[data.leavList[idx]['text1Index']]||'请选择'}}</view>
                                </picker>
                            </evan-form-item>
                            <evan-form-item label="班次类型(小时)：" :label-style="{color:'blue'}" prop="text12" :border="false">
                            	<!-- <input class="form-input" placeholder-class="form-input-placeholder" v-model="item.text12" placeholder="请输入班次类型" /> -->
                                <picker @change="chg_picker2($event,idx);changeTex14(idx);" data-a="text12" data-b="text12_stor_arr" data-d="text12_arr" :range="text12_arr">
                                	<view class="uni-input">{{text12_arr[data.leavList[idx]['text12Index']]||'请选择'}}</view>
                                </picker>
                            </evan-form-item>
                            <evan-form-item label="可休年假(小时)：" :label-style="{color:'blue'}" prop="text14" :border="false">
                            	<input class="form-input" placeholder-class="form-input-placeholder" v-model="item.text14" disabled/>
                            </evan-form-item>
                            <evan-form-item label="开始时间：" :label-style="{color:'blue'}" prop="text4" :border="false">
                            	<!-- <input class="js-date-picker" type="text" placeholder="选择出生日期" placeholder-class="form-input-placeholder" v-model="item.text4" readonly/> -->
                                		<biaofun-datetime-picker
                                        class="biaofun-datetime-picker-cs"
                                			placeholder="请选择开始时间"
                                			:defaultValue="defautTime"
                                			start="2020-06-01"
                                			end="2100-12-30"
                                			fields="day"
                                			@change="changeDate($event,'text4',idx);changeTex14(idx);"/>
                            </evan-form-item>
                            <evan-form-item label="时⠀⠀⠀段：" :label-style="{color:'blue'}" prop="text7" :border="false">
                            	<!-- <input class="form-input" placeholder-class="form-input-placeholder" v-model="item.text7" placeholder="请选取时段" /> -->
                                <picker @change="chg_picker2($event,idx);changeTex14(idx);" data-a="text7" data-b="text7_stor_arr" data-d="text7_arr" :range="text7_arr">
                                	<view class="uni-input">{{text7_arr[data.leavList[idx]['text7Index']]||'请选择'}}</view>
                                </picker>
                            </evan-form-item>
                            <evan-form-item label="结束时间：" :label-style="{color:'blue'}" prop="text5" :border="false">
                            	<!-- <input class="form-input" placeholder-class="form-input-placeholder" v-model="item.text5" placeholder="请输入结束时间" /> -->
                                <biaofun-datetime-picker
                                class="biaofun-datetime-picker-cs"
                                	placeholder="请选择结束时间"
                                	:defaultValue="defautTime"
                                	start="2020-06-01"
                                	end="2100-12-30"
                                	fields="day"
                                	@change="changeDate($event,'text5',idx);changeTex14(idx);"/>
                            </evan-form-item>
                            <evan-form-item label="时⠀⠀⠀段：" :label-style="{color:'blue'}" prop="text8" :border="false">
                            	<!-- <input class="form-input" placeholder-class="form-input-placeholder" v-model="item.text8" placeholder="请选取时段" /> -->
                                <picker @change="chg_picker2($event,idx);changeTex14(idx);" data-a="text8" data-b="text7_stor_arr" data-d="text7_arr" :range="text7_arr">
                                	<view class="uni-input">{{text7_arr[data.leavList[idx]['text8Index']]||'请选择'}}</view>
                                </picker>
                            </evan-form-item>
                            <evan-form-item label="请假时长：" :label-style="{color:'blue'}" prop="text13">
                            	<input class="form-input" placeholder-class="form-input-placeholder" v-model="item.text13" disabled/>
                            </evan-form-item>
                        </view>
                    </view>
            	</template>
            </evan-form-item>
            <view class="divLine"></view>
            <evan-form-item label="总请假小时数：" :label-style="{color:'red'}" prop="amt1">
				<input class="form-input" placeholder-class="form-input-placeholder" v-model="data.amt1" disabled/>
			</evan-form-item>
			<evan-form-item label="请假事由：" prop="memo" label-position="top">
				<textarea class="form-input textarea" placeholder-class="form-input-placeholder" v-model="data.memo" placeholder="请输入请假事由(10-200个字)" />
            </evan-form-item>
		</evan-form>
		<button @click="save" :loading="loading" :disabled="btnDisabled" class="evan-form-show__button" style="background:#F65332;">{{btnStr}}</button>
        <view style="height:7px;"> </view>
        <!-- 抽屉 -->
        <uni-drawer :visible="isDrawer" :model="right" @close="chgDrawer">
        	<view class="drawer-one"  >
        		<scroll-view scroll-y class="drawer-ti">
        			<mix-tree :list="lista" @treeItemClick="treeItemClick"></mix-tree>
        		</scroll-view>
        	</view>
        	<!-- <view class="footerbtn">
        		<view class="colbtn on" @tap="chgDrawer">完成</view>
        		<view class="colbtn" @tap="chgDrawer">返回</view>
        	</view> -->
        </uni-drawer>
	</view>
</template>

<script>
    let util = require('@/common/util.js');
    let timers = require('@/common/time.js');
	import utils from '@/components/evan-form/utils.js'
    import mixTree from '@/components/mix-tree/mix-tree2';
	export default {
        components: {
        	mixTree
        },
		data() {
			return {
				// 表单的内容必须初始化
				data: {
					Subject: '',
					//BillID: '',
					//Create_UserName: '',
                    //Create_DeptName:"",
                    //Create_Date:"",
                    //Create_DeptName:"",
                    ProjectName:"",
                    ProjectGUID:'',//传入后台
                    OrgName:"",
                    OrgGUID:'',//传入后台
					text11: false,//是否跳过周末
                    leavList:[{text1:"",text12:8,text12Index:1,text14:this.amt2,text4:timers.formatDate(new Date()),text7:"上午",text7Index:1,text5:timers.formatDate(new Date()),text8:"下午",text8Index:2,text13:""}],//请假事件列表
                    amt1:'',
                    memo:''
				},
                btnStr:'提交',
                btnDisabled:false,
                amt2:0,//用于验证的总小时数
                defautTime:timers.formatDate(new Date()),
                loading:false,//按钮提交状态
                isDrawer:false,
                lista:[],//选取项目树抽屉
                stor_data:{

                },
                OrgName_arr: ['请选择'], //选取公司
                OrgName_stor_arr: [''], //选取公司  入库
                text1_arr: ['请选择', '事假', '年假', '病假', '婚假', '丧假', '生育假', '工伤假', '考试假'],
                text1_stor_arr: ['', '事假', '年假', '病假', '婚假', '丧假', '生育假', '工伤假', '考试假'],
				text12_arr: ['请选择','8','11'],//班次类型
				text12_stor_arr: ['','8','11'],//班次类型  入库
                text7_arr: ['请选择','上午','下午'],//时段   包含开始时段结束时段
                text7_stor_arr: ['','上午','下午'],//时段  入库   包含开始时段结束时段
                rules: {
					Subject: {
						required: true,
						message: '请输入流程主题'
					},
					ProjectName: {
						required: true,
						message: '请选取项目名称'
					},
                    OrgName: {
                    	required: true,
                    	message: '请选取公司名称'
                    },
     //                Create_UserName: {
					// 	required: true,
					// 	message: '请输入申请人员'
					// },
     //                Create_DeptName: {
					// 	required: true,
					// 	message: '请输入申请部门'
					// },
					memo: [{
							required: true,
							message: '请输入请假事由'
						},
						{
							min: 10,
							max: 200,
							message: '请假事由必须在10到200个字之间'
						}
					]
				}
			}
		},
		mounted() {
			// 这里必须放在mounted中，不然h5，支付宝小程序等会找不到this.$refs.form
			this.$refs.form.setRules(this.rules)
		},
        onLoad(){
            this.initData()
            this.initCorpName()//初始化公司
            this.initProName()//初始化项目树
        },
		methods: {
            initData(){
                let that = this
                let par = {}
                par['GUID'] = util.chkLogin()
                util.uniFly.post({
                	url: that.RP.WX_GETUSERDAY,
                	params: par
                }).then(function(res) {
                	if (typeof(res) != 'undefined' && res.status == 200) {
                		let data = res.data
                		if(typeof(data)!='undefined'&&data.errNo==0){
                            that.amt2 = data.retVal.YearHoliHour
                		}
                	}
                })
            },
            initCorpName(){
                let that = this
                let par = {}
                util.uniFly.post({
                	url: that.RP.WX_GETBUSNAME,
                	params: par
                }).then(function(res) {
                	if (typeof(res) != 'undefined' && res.status == 200) {
                		let data = res.data
                		if(typeof(data)!='undefined'&&data.errNo==0){
                            let couponList = data.retVal
                            couponList.forEach((item)=>{
                                that.OrgName_arr.push(item.CodeName)
                                that.OrgName_stor_arr.push(item.GUID)
                            })
                		}
                	}
                })
            },
            initProName(){
                let that = this
                let par = {}
                util.uniFly.post({
                	url: that.RP.WX_GETPROJECT,
                	params: par
                }).then(function(res) {
                	if (typeof(res) != 'undefined' && res.status == 200) {
                		let data = res.data
                		if(typeof(data)!='undefined'&&data.errNo==0){
                            let arr = (data.retVal)
                            that.toTree(arr,function(arrTree){
                            	setTimeout(()=>{that.lista =arrTree},100)
                            });
                		}
                	}
                })
            },
            chgDrawer(e){
                this.isDrawer = !this.isDrawer
                console.log(1,e)
            },
            //梳理数据
            filter(onePar){
                var onePar = JSON.parse(JSON.stringify(onePar))
            	delete onePar['ProjectName'];
                delete onePar['OrgName'];
                delete onePar['OrgNameIndex'];
            	return onePar;
            },
            //提交成功  请在流程中查看
			save() {
                let that = this
                that.loading = true
                let par = that.filter(that.data)
                console.log(1,par)
                par['UserGUID'] = util.chkLogin()
                if(par.leavList.length==0){
                    that.HMmessages.show('至少包含一条请假事件',{icon:'error',duration:2e3});
                    that.loading = false
                    return
                }
                //已请假小时数大不可大于可请假小时数
                if(that.data.amt1>that.amt2){
                    that.HMmessages.show('已请假小时数不可大于可请假小时数',{icon:'error',duration:2e3});
                    that.loading = false
                    return
                }
				that.$refs.form.validate((res) => {
					if (res) {
                        util.uniFly.post({
                        	url: that.RP.WX_SAVELEAVFLOW,
                        	params: {jsonStr:JSON.stringify(par)}
                        }).then(function(res) {
                            that.loading = false
                        	if (typeof(res) != 'undefined' && res.status == 200) {
                        		if(typeof(res.data)!='undefined'&&res.data.errNo==0){
                                   that.HMmessages.show('提交成功,请在流程中查看',{icon:'success',duration:2e3});
                                   that.btnStr = '成功,请在流程中查看'
                                   that.btnDisabled = true
                                   setTimeout(()=>{uni.navigateBack()},2500)
                                }else{
                                    that.btnDisabled = false
                                    that.loading = false
                                    that.HMmessages.show(res.data.errDesc,{icon:'error',duration:2e3});
                                }
                        	}
                        })
						console.log(2,that.data)
					}else{
                        that.loading = false
                    }
				})
			},
            //计算天数差的函数，通用
            DateDiff(sDate1,  sDate2){    //sDate1和sDate2是2006-12-18格式
                   var  aDate,  oDate1,  oDate2,  iDays
                   aDate  =  sDate1.split("-")
                   oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])    //转换为12-18-2006格式
                   aDate  =  sDate2.split("-")
                   oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])
                   iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24)    //把相差的毫秒数转换为天数
                   return  iDays
               },
            //如果切换年假或切换班次类型  计算可休年假
            changeTex14(idx){
                let that = this
                //if(that.data.leavList[idx].text1=='年假'){
                    //that.data.leavList[idx].text13 = that.data.leavList[idx].text12
                    that.data.leavList[idx].text14 = that.amt2
                //}
                //开始时间和结束时间存在且上午下午时间段也存在  就计算请假小时数
                //根据是否跳过周末从数据库取出当前假期并计算休假天数
                //传入开始日期   结束日期   开始结束日期时间端 是否跳过周末 计算返回请假时间
                let par = {
                    sDate:that.data.leavList[idx].text4,
                    sDateTub:that.data.leavList[idx].text7,
                    eDate:that.data.leavList[idx].text5,
                    eDateTub:that.data.leavList[idx].text8,
                    isJumpWeek:that.data.text11,
                    shift:that.data.leavList[idx].text12
                }
                console.log(1,par)
                //较参
                //....
                util.uniFly.post({
                    url: that.RP.WX_GETWORKDAY,
                    params: {jsonStr:JSON.stringify(par)}
                }).then(function(res) {
                    if (typeof(res) != 'undefined' && res.status == 200) {
                        let data = res.data
                        if(typeof(data)!='undefined'&&data.errNo==0){
                            that.data.leavList[idx].text13 = data.retVal
                        }else{
                            that.HMmessages.show(data.errDesc,{icon:'error',duration:2e3});
                        }
                        that.inputAmt1()
                    }
                })
            },
            //计算总请假小时数  验证可修总小时数
            inputAmt1(){
                let that = this
                let tmpAmt1 = 0;
                that.data.leavList.forEach(item=>{
                    tmpAmt1 +=(item.text13*1)
                })
                that.data.amt1 = tmpAmt1

            },
            //请假事件列表+
            tapPlus(){
                let that = this
                let obj = {text1:"",text12:8,text12Index:1,text14:that.amt2,text4:timers.formatDate(new Date()),text7:"上午",text7Index:1,text5:timers.formatDate(new Date()),text8:"下午",text8Index:2,text13:""}
                that.data.leavList.push(obj)
                console.log(1,that.data.leavList)
                that.inputAmt1()
            },
            //请假事件列表-
            tapMinus(){
                let that = this
                //that.data.leavList.splice(that.data.leavList.length-1, 1)
                that.data.leavList.pop()
                console.log(1,that.data.leavList)
                that.inputAmt1()
            },
            //picker下拉框触发
            //b:val值需要从b数组中拿取
            chg_picker(e) {
            	let that = this
            	let a = e.currentTarget.dataset.a//选取的哪个组件
            	let b = e.currentTarget.dataset.b//从哪个数组对象里面取值传回后台
                let c = e.currentTarget.dataset.c
                let d = e.currentTarget.dataset.d
            	let val = e.target.value//下标
            	console.log('a='+a+'   b=' + b + '   val=' + val)
            	that.data[a+'Index'] = val//在组件上显示选取的值
            	that.data[c] = that[b][val]//设置对象中的属性值
                that.data[a] = that[d][val]
            },
            chg_picker2(e,idx) {
            	let that = this
            	let a = e.currentTarget.dataset.a//选取的哪个组件
            	let b = e.currentTarget.dataset.b//从哪个数组对象里面取值传回后台
                //let c = e.currentTarget.dataset.c
                let d = e.currentTarget.dataset.d
            	let val = e.target.value//下标
            	console.log('a='+a+'   b=' + b + '   val=' + val)
            	that.data.leavList[idx][a+'Index'] = val//在组件上显示选取的值
            	//that.data.leavList[idx][c] = that[b][val]//设置对象中的属性值
                that.data.leavList[idx][a] = that[d][val]
            },
            toTree(data,fun) {
            	let that = this
            	// 删除 所有 children,以防止多次调用
            	data.forEach(function (item) {
            		delete item.children;
            	});
            	// 将数据存储为 以 id 为 KEY 的 map 索引数据列
            	let map = {};
            	data.forEach(function (item) {
                    if(item.GUID==item.Par_GUID){item.Par_GUID=-1}
            		map[item.GUID] = item;
            	});
            	let val = [];
            	data.forEach(function (item) {
            		// 以当前遍历项，的pid,去map对象中找到索引的id
            		let parent = map[item.Par_GUID];
            		// 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
            		if (parent) {
            			(parent.children || ( parent.children = [] )).push(item);
            		} else {
            			//如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
            			val.push(item);
            		}
            	});
            	fun(val);
            },
            //Par_GUID  根目录的已经被更改为-1
            treeItemClick(item){
                let that = this
                let {GUID,ProjectName,Par_GUID} = item;
                that.data.ProjectGUID = GUID
                that.data.ProjectName = ProjectName
                that.chgDrawer();
                console.log(item)
            },
            Switch (e) {
                this.data.text11 = !this.data.text11
            },
            changeDate(e,pop,idx){
                let that = this
                let date = e.YYYY+"-"+e.MM+"-"+e.DD
                that.data.leavList[idx][pop] = date
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
