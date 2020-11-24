/**
 * @说明：微信 JS-SDK 公用函数
 * @作者：陈万照
 * @公司：山东标梵互动技术有限公司
 * @官网：http://biaofun.com/
 * @版本：v1.0.0
 * @时间：2020年4月28日11:28:13
 */
import http from 'http.js';
import wx  from 'jweixin-module';
export default {
	/**
	 * 获取 JS-SDK 注册信息
	 * @param {String} href 页面路径
	 */
	queryConfig(href) {
		return new Promise((resolve, reject) => {
			http({
				url: 'app/jssdk',
				data: {
					url: href
				}
			})
				.then(res => {
					resolve(res);
				})
				.catch(err => {
					reject(err);
				});
		});
	},
	
	/**
	 * 配置 JS-SDK
	 * @param {Object} data 配置数据
	 */ 
	configSDK(data) {
		return new Promise((resolve, reject) => {
			wx.config({
				debug: false,
				appId: data.appId,
				timestamp: data.timestamp,
				nonceStr: data.nonceStr,
				signature: data.signature,
				jsApiList: data.jsApiList,
				success() {
					resolve();
				},
				fail() {
					reject();
				}
			});
		});
	},
	
	/**
	 * 定位
	 */ 
	getLocation() {
		return new Promise((resolve, reject) => {
			wx.getLocation({
				type: 'wgs84',
				success(res) {
					console.log('定位成功：', res);
					resolve(res);
				},
				fail() {
					console.log('定位失败');
					reject({ msg: '获取位置失败！' })
				}
			});
		});
	},
	
	/**
	 * 调用微信支付
	 * 此微信支付的适用场景为：用户通过微信扫码，关注公众号等方式进入商家H5页面，并在微信内调用JSSDK完成支付
	 * @param {Object} params 支付参数对象，支付参数需要请求后台获取
	 */
	payment(params) {
		return new Promise((resolve, reject) => {
			WeixinJSBridge.invoke(
				'getBrandWCPayRequest',
				{
					appId: params.appId, // 公众号id
					timeStamp: params.timeStamp, // 时间戳
					nonceStr: params.nonceStr, // 随机串
					package: params.package, // 订单详情扩展字符串
					signType: params.signType, // 签名方式
					paySign: params.paySign // 签名
				},
				function(res) {
					if (res.err_msg == 'get_brand_wcpay_request:ok') {
						// 使用以上方式判断前端返回,微信团队郑重提示：
						// res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
						resolve();
					} else {
						reject();
					}
				}
			);
		});
	}
}
