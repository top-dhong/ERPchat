//配置请求接口文件
//https://wx.shine-town.com/WX/SHWXSvr.asmx

let A = {}
//HelloWorld
A.HelloWorld = "WX/SHWXSvr.asmx/HelloWorld"
//获取openid  param:{jsCode}
A.WX_GET_OPENID = "WX/SHWXSvr.asmx/GetOpenID"
//绑定
A.WX_BINDOPENID = "WX/SHWXSvr.asmx/BindOpenID"
//用openid调用登录   param:{string OpenID, string UserID, string Pswd}
A.WX_OPENID_LOGIN = "WX/SHWXSvr.asmx/LoginVerifies"
//流程列表
A.WX_GETTASKLIST = "WX/SHWXSvr.asmx/GetTaskList"
//流程详细
A.WX_GETTASKINFO = "WX/SHWXSvr.asmx/GetFlowInfo"
//提交流程
A.WX_FLOWSUBMIT = "WX/SHWXSvr.asmx/FlowSubmit"
//获取用户列表
A.WX_GETUSERLIST = "WX/SHWXSvr.asmx/GetUserList"
//驳节点列表
A.WX_GETFLOWREBUTLIST = "WX/SHWXSvr.asmx/GetFlowRebutList"
//驳回提交
A.WX_FLOWREBUT = "WX/SHWXSvr.asmx/FlowRebut"
//沟通提交
A.WX_FLOWCONSULT = "WX/SHWXSvr.asmx/FlowConsult"
//首页轮播图
A.WX_GETPORTALNEWS = "WX/SHWXSvr.asmx/GetPortalNews"
//新闻列表
A.WX_GETCOMMONNEWS = "WX/SHWXSvr.asmx/GetCommonNews"
//获取首页待办和传阅数量 获取首页其他数据
A.WX_GETPORTALDATA = "WX/SHWXSvr.asmx/GetPortalData"
//报表-获取项目列表
A.WX_GETSALEPROJLIST = "WX/SHWXSvr.asmx/GetSaleProjList"
//报表-签约数据
A.WX_GETSALEQYREPORT = "WX/SHWXSvr.asmx/GetSaleQYReport"
//报表-认购数据
A.WX_GETSALERGREPORT = "WX/SHWXSvr.asmx/GetSaleRGReport"
//报表-回款数据
A.WX_GETSALEHKREPORT = "WX/SHWXSvr.asmx/GetSaleHKReport"
//同步微信头像
A.WX_SETUSERHEADIMG = "WX/SHWXSvr.asmx/SetUserHeadImg"
//获取流程数菜单
A.WX_GETFLOWTYPELIST = "WX/SHWXSvr.asmx/GetFlowTypeList"
//获取房源列表
A.WX_GETHOUSELIST = "WX/SHWXSvr.asmx/GetHouseList"
//获取合同列表
A.WX_GETCONLIST = "WX/SHWXSvr.asmx/GetConList"
//获取合同列表-归属项目树形菜单
A.WX_GETPROJECTINFOTREE = "WX/SHWXSvr.asmx/GetProjectInfoTree"
//获取合同详情
A.WX_GETCONINFO = "WX/SHWXSvr.asmx/GetConInfo"
//获取通讯录
A.WX_GETCONTACTLIST = "WX/SHWXSvr.asmx/GetPhoneList"
//修改form_id
A.WX_UPDATEFORMIDBYOPENID = "WX/SHWXSvr.asmx/UpdateFormIdByOpenid"
//拉取用户个人设置 小程序模板消息发送开关
A.WX_GETISPOSTMSGBYOPENID = "WX/SHWXSvr.asmx/getIsPostMsgByOpenid"
//设置小程序模板消息发送开关
A.WX_UPDATEISPOSTMSGBYOPENID = "WX/SHWXSvr.asmx/UpdateIsPostMsgByOpenid"
//报表-获取销售数据
A.WX_GETSALEREPORT = "WX/SHWXSvr.asmx/GetSaleReport"
//获取业态-年度销售报表用
A.WX_GETSALEPRODTYPELIST = "WX/SHWXSvr.asmx/GetSaleProdTypeList"
//考勤 请假数据初始化(初始化年假)
A.WX_GETUSERDAY = "WX/SHWXSvr.asmx/GetUserDay"
//考勤 获取公司名称
A.WX_GETBUSNAME = "WX/SHWXSvr.asmx/GetBusName"
//考勤 获取项目
A.WX_GETPROJECT = "WX/SHWXSvr.asmx/GetProject"
//考勤 请假流程提交
A.WX_SAVELEAVFLOW = "WX/SHWXSvr.asmx/SaveLeaveFlow"
//考勤 计算请假天数  根据后台配置的假期
A.WX_GETWORKDAY = "WX/SHWXSvr.asmx/GetWorkDay"
//查询当前年月的所有有会议的天  并标记
A.WX_GETCURMOUTHCALENDAR = "WX/SHWXSvr.asmx/GetCurMouthCalendar"
//会议  拉取会议日历
A.WX_GETMEETCALENDAR = "WX/SHWXSvr.asmx/GetMeetCalendar"
//会议  拉取会议明细(会议卡片)
A.WX_GETMEETDETAILBYMEETGUID = "WX/SHWXSvr.asmx/GetMeetDetailByMeetGUID"
//微信订阅模板消息支持接口-入库待发消息
A.WX_INSERTWXSUBSCRIBENOTIFY = "WX/SHWXSvr.asmx/InsertWXSubscribeNotify"
////小程序端领导行程初始化//data  精确到day
A.WX_INITLEADERWAY = "WX/SHWXSvr.asmx/InitLeaderWay"
//小程序端领导行程上报
A.WX_SAVELEADERWAY = "WX/SHWXSvr.asmx/SaveLeaderWay"

export default A;
