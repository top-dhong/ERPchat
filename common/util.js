const conf = require('./conf.js');
const SERVERIP = conf.SERVERIP
const V_PROHTTP = conf.V_PROHTTP
const PHSET = conf.PHSET
const DEBUG = conf.DEBUG
const tmplIds = conf.tmplIds

//时间格式化
function dateFtt(fmt, date) {
    switch (typeof date) {
        case "string"://这里真机传入  2020-9会出现问题(i8)
            date = new Date(date.replace(/-/g, "/"));
            break;
        case "number":
            date = new Date(date);
            break;
    }
    let o = {
        "M+": date.getMonth() + 1, //月份   
        "d+": date.getDate(), //日   
        "h+": date.getHours(), //小时   
        "m+": date.getMinutes(), //分   
        "s+": date.getSeconds(), //秒   
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
        "S": date.getMilliseconds() //毫秒   
    };
    if (/(y+)/.test(fmt))
        fmt = (fmt.replace(RegExp.$1, (date.getFullYear().toString()).substr(4 - RegExp.$1.length))).toString();
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    console.log('', fmt)
    return fmt;
}
//请求方法  后台需要使用  send返回数据
var postSer = function(fn, p, func) {
    uni.showNavigationBarLoading() //在标题栏中显示加载
    var tk = uni.getStorageSync(PHSET + 'user')['token'];
    var islg = false
    if (tk) {
        p.token = tk;
        islg = true
    }
    p.islogin = islg
    console.log('---islg=' + islg)
    console.log('---请求方法名=' + fn)
    uni.request({
        url: V_PROHTTP + SERVERIP + '/' + fn,
        method: 'POST',
        data: p,
        success: function(res) {
            {

                if (200 == res.statusCode) {
                    if (typeof(res.data) == 'string') {
                        func({
                            res: 2,
                            err: '小程序客户端逐步不支持解码,请优化后台方法' + fn
                        })
                        console.log('小程序客户端逐步不支持解码,请优化后台方法' + fn)
                    } else {
                        if (res.data.res == 1) {
                            wxilogin(function() {
                                postSer(fn, p, func)
                            });
                            return
                        } //token失效不提示未登录
                        func(res.data)
                    }
                } else if (404 == res.statusCode) {
                    func({
                        res: 2,
                        err: '很抱歉,出现错误,请联系管理员404'
                    })
                } else {
                    func({
                        res: 2,
                        err: res.errMsg
                    })
                }
            }
        },
        fail: function(e) {
            func({
                res: 2,
                err: e.errMsg
            })
            console.log(e.errMsg)
        },
        complete: function() {
            uni.hideNavigationBarLoading() //在标题栏中影藏加载
        }
    })
}
var log = function(t, d, i) {
    console.log('', t)
    uni.vibrateShort();
    uni.showToast({
        title: t, //'成功',
        duration: d || 2000,
        icon: i || 'none'
    })
}
//微信上传资源至开发者服务器
var wxuplod = (filePath, func) => {
    uni.uploadFile({
        url: V_PROHTTP + SERVERIP + '/api/minwxupload',
        filePath: filePath,
        name: 'file',
        header: {
            // 'content-type': 'multipart/form-data'     加上这个node后台会报 Multipart: Boundary not found  错误
        },
        success: function(re) {
            var r = JSON.parse(re.data)
            if (typeof(r) != 'undefined' && r.res == 0) {
                func({
                    "res": 0,
                    "url": "" + r.surl + ""
                })
            } else {
                func({
                    "res": 2,
                    "err": "" + r.err + ""
                })
            }
        },
        fail: function(err) {
            func({
                "res": 2,
                "err": "" + err.errMsg + ""
            })
        }
    })
}
//相册/拍照
var wxupp = function(func) {
    var that = this;

    function chooseWxImage(stype) {
        uni.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'], // 指定原图或者压缩图
            sourceType: [stype], // 指定图片来源
            success: function(res) {
                var tempFilePaths = res.tempFilePaths;
                wxuplod(tempFilePaths[0], func)
            }
        })
    }
    uni.showActionSheet({
        itemList: ['从相册中选择', '拍照'],
        itemColor: "#f7982a",
        success: function(res) {
            if (!res.cancel) {
                if (res.tapIndex == 0) {
                    chooseWxImage('album')
                } else if (res.tapIndex == 1) {
                    chooseWxImage('camera')
                }
            }
        }
    })
}
//微信跳转页面
var navigateTo = url => {
    console.log('navigateTo-->' + url)
    uni.navigateTo({
        url
    })
}
//返回上一页

var setDB = function(k, v) {
    uni.setStorageSync(PHSET + k, v)
}
var getDB = function(k) {
    return uni.getStorageSync(PHSET + k)
}
var imghs = V_PROHTTP + SERVERIP
///////////////////////////////////////////////////编辑器特殊字符相互转换/////////////////////////////////////////////////////
function HtmlEncode(theString) {
    theString = theString.replace(new RegExp(">", "g"), "&gt;");
    theString = theString.replace(new RegExp("<", "g"), "&lt;");
    theString = theString.replace(new RegExp(" ", "g"), "&nbsp;");
    theString = theString.replace(new RegExp("\"", "g"), "&quot;");
    theString = theString.replace(new RegExp("\'", "g"), "&#39;");
    theString = theString.replace(new RegExp("\n", "g"), "<br/>");
    return theString;
}

function HtmlDiscode(theString) {
    if (typeof(theString) == "undefined") return '';

    theString = theString.replace(new RegExp("&gt;", "g"), ">");
    theString = theString.replace(new RegExp("&lt;", "g"), "<");
    theString = theString.replace(new RegExp("&nbsp;", "g"), " ");
    theString = theString.replace(new RegExp("&quot;", "g"), "\"");
    theString = theString.replace(new RegExp("&#39;", "g"), "\'");
    theString = theString.replace(new RegExp("<br/>", "g"), "\n");
    theString = theString.replace(new RegExp(" ", "g"), " ");
    return theString;
}

function isNULL(tmpobj) {
    if (tmpobj == null) return true;
    else if (tmpobj === "") return true;
    else if (tmpobj == "null") return true;
    else if (tmpobj == "undefined") return true;
    else if (typeof(tmpobj) == 'undefined') return true;
    return false;
}
//判断用户是否登录
function chkLogin() {
    if (!this.getDB(`User`)) {
        return ''
    }
    let UserGUID = this.getDB(`User`)[`UserGUID`]
    if (this.isNULL(UserGUID)) {
        return '';
    }
    return UserGUID
}
/*编码url*/
function urlEncode(str) {
    return encodeURIComponent(str).replaceAll("%", "@");
}

//解码url
function urlDecode(str) {
    return decodeURIComponent(str.replaceAll("@", "%"));
}
String.prototype.replaceAll = function(reallyDo, replaceWith, ignoreCase) {
    if (!RegExp.prototype.isPrototypeOf(reallyDo)) {
        return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi" : "g")), replaceWith);
    } else {
        return this.replace(reallyDo, replaceWith);
    }
};
//全局广播
var broadcast = {
    eventList: {},
    on: function(event, func) {
        broadcast.eventList[event] = func;
    },
    send: function(event, data) {
        if (typeof broadcast.eventList[event] != "undefined") {
            broadcast.eventList[event](data);
        }
    }
};

var showModal = uni.showModal;

let uniFly = require('./js/uniFly.js');
uniFly.baseUrl = V_PROHTTP + SERVERIP; //'https://yourapi.domain.com';
//uniFly.headers.common['Authorization'] = Authorization;
uniFly.headers['Content-Type'] = 'application/x-www-form-urlencoded';
//uniFly.headers['Content'] = 'text/html;charset=utf-8';


let CryptoJS = require('./js/crypto-js/aes.js');

function encrypt() {
    var str = 'Message';
    // 密钥 16 位
    var key = '123456789123456';
    // 初始向量 initial vector 16 位
    var iv = '1234567891234567';
    var pwd = CryptoJS.encrypt(str, key, iv);
    console.log('AES加密:' + pwd);
    var original = CryptoJS.decrypt(pwd, key, iv);
    console.log('AES解密:' + original);

    let srcs = CryptoJS.enc.Utf8.parse(pwd);
    let encrypted = CryptoJS.AES.encrypt(srcs, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    var ccc = encrypted.ciphertext.toString().toUpperCase();
    console.log('AES解密2:' + ccc);
}

let navigateBack = delta => {
    uni.navigateBack({
        delta: delta || 1
    })
}

let tapCipr =data=>{
    uni.setClipboardData({
        data
    });
}
if (DEBUG) {
    uni.setStorageSync(`${PHSET}openid`, 'oVo8K4xGRSaQaiA-oqsiSe6cQcgs')
}
//导出方法
export {
    postSer,
    uniFly,
    log,
    wxupp,
    setDB,
    getDB,
    imghs,
    HtmlEncode,
    HtmlDiscode,
    isNULL,
    chkLogin,
    urlEncode,
    urlDecode,
    broadcast,
    showModal,
    dateFtt,
    navigateBack,
    tapCipr,
    tmplIds
}
