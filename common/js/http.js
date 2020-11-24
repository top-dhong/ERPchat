/**
 * @说明：进一步封装 uniapp 的 request 请求方法
 * @作者：陈万照
 * @公司：山东标梵互动技术有限公司
 * @官网：http://biaofun.com/
 * @版本：v1.0.0
 * @时间：2020年4月28日11:28:13
 */
import App from '@/App'; // App
import Utils from './utils.js'; // 封装的工具集

/**
 * 请求方法
 */
function http(config) {
	// 自己扩展的一些配置字段
	let defaults = {
		// 接口基准路径
		baseURL: App.globalData.baseURL,

		// 接口名称
		url: '',

		// 请求类型，必须大写
		method: 'POST',

		// 请求参数
		data: {},

		// 设置请求的 header，header 中不能设置 Referer
		header: {
			'Author': 'ChenWanZhao'
		},

		// 超时时间，单位 ms
		timeout: 3000,

		// 如果设为 json，会尝试对返回的数据做一次 JSON.parse
		dataType: 'json',

		// 设置响应的数据类型。合法值：text、arraybuffer
		responseType: 'text',

		// 验证 ssl 证书？
		sslVerify: true,

		// loading 相关配置
		showLoading: false, // 是否显示 loading？
		loadingText: '加载中...', // loading 文本
		loadingMask: true, // 是否显示透明蒙层，防止触摸穿透

		// 成功提示相关配置
		showSuccessTips: false, // 是否弹窗显示成功提示？
		successTipsText: '', // 指定成功提示文本
		successTipsMessage: true, // 是否将成功提示文本设置为接口返回的 message
		successTipsIcon: 'none', // 成功消息提示框的图标
		successTipsImage: '', // 成功消息提示框的自定义图标本地路径
		successTipsMask: true, // 成功消息提示框是否显示透明蒙层，防止触摸穿透
		successTipsDuration: 2500, // 成功消息提示框提示的持续时间，单位毫秒
		successTipsPosition: '', // 成功消息提示框纯文本轻提示显示位置，填写有效值后只有 title 属性生效

		// 失败提示相关配置
		showErrorTips: true, // 是否弹窗显示错误提示？
		errorTipsText: '服务器太累了~ 请稍后再试！', // 指定错误提示文本
		errorTipsMessage: true, // 是否将失败提示文本设置为接口返回的 message
		errorTipsIcon: 'none', // 失败消息提示框的图标
		errorTipsImage: '', // 失败消息提示框的自定义图标本地路径
		errorTipsMask: true, // 失败消息提示框是否显示透明蒙层，防止触摸穿透
		errorTipsDuration: 2500, // 失败消息提示框提示的持续时间，单位毫秒
		errorTipsPosition: '', // 失败消息提示框纯文本轻提示显示位置，填写有效值后只有 title 属性生效
	}


	// 合并配置项
	let options = Utils.deepMargeObject(defaults, config);


	// 是否需要显示 loading？
	if (options.showLoading) {
		uni.showLoading({
			title: options.loadingText,
			mask: options.loadingMask
		});
	}


	// 进行请求
	return new Promise((resolve, reject) => {
		uni.request({
			method: options.method,
			url: Utils.isAbsoluteURL(options.url) ? options.url : Utils.combineURLs(options.baseURL, options.url),
			data: options.data,
			header: options.header,
			timeout: options.timeout,
			dataType: options.dataType,
			responseType: options.responseType,
			sslVerify: options.sslVerify,


			// 请求成功
			success(res) {
				// 判断是否需要关闭loading
				if (options.showLoading) uni.hideLoading();

				// 200
				if (res.statusCode == 200) {
					// 返回数据中的 code 状态
					// 数据返回成功
					if (res.data.code == 200) {
						console.log('数据返回成功：', res.data);
						// 是否显示成功提示？
						if (options.showSuccessTips) {
							uni.showToast({
								title: options.successTipsMessage ? res.data.msg : options.successTipsText,
								icon: options.successTipsIcon,
								image: options.successTipsImage,
								mask: options.successTipsMask,
								duration: options.successTipsDuration,
								position: options.successTipsPosition
							});
						}
						resolve(res.data);
					}

					// 数据返回异常
					else {
						// 自定义异常对象
						let error = {
							code: res.data.code,
							msg: res.data.msg
						}

						// 登录过期
						if (res.data.code == '-1') {
							console.log('登录过期：', res.data);

							// 是否显示错误提示？
							if (options.showErrorTips) showErrorTips(res);

							reject(error);
						}

						// 异常
						else if (res.data.code == '-2') {
							console.log('异常：', res.data);

							// 是否显示错误提示？
							if (options.showErrorTips) showErrorTips(res);

							reject(error);
						}

						// 显示错误提示
						function showErrorTips(res) {
							uni.showToast({
								title: options.errorTipsMessage ? res.data.msg : options.errorTipsText,
								icon: options.errorTipsIcon,
								image: options.errorTipsImage,
								mask: options.errorTipsMask,
								duration: options.errorTipsDuration,
								position: options.errorTipsPosition
							});
						}
					}
				}

				// 404、500 等错误
				else {
					// 定义失败对象
					let error = {
						code: res.statusCode,
					}

					// 404
					if (res.statusCode == 404) {
						console.log('404：', res);

						// 自定义失败提示信息
						err.msg = '404';

						// 是否显示错误提示？
						if (options.showErrorTips) showErrorTips(error);

						reject(error);

					}

					// 500
					else if (res.statusCode == 500) {
						console.log('500：', res);

						// 自定义失败提示信息
						err.msg = '500';

						// 是否显示错误提示？
						if (options.showErrorTips) showErrorTips(error);

						reject(error);
					}

					// 显示错误提示
					function showErrorTips(error) {
						uni.showToast({
							title: options.errorTipsMessage ? error.msg : options.errorTipsText,
							icon: options.errorTipsIcon,
							image: options.errorTipsImage,
							mask: options.errorTipsMask,
							duration: options.errorTipsDuration,
							position: options.errorTipsPosition
						});
					}
				}
			},


			// 请求失败
			fail(res) {
				console.log('请求失败：', res);

				// 判断是否需要关闭loading
				if (options.showLoading) {
					uni.hideLoading();
				}

				// 定义失败对象
				let error = {
					code: 19910510,
					msg: '请求失败'
				}

				// 判断是否需要显示失败提示
				if (options.showErrorTips) {
					uni.showToast({
						title: options.errorTipsMessage ? error.msg : options.errorTipsText,
						icon: options.errorTipsIcon,
						image: options.errorTipsImage,
						mask: options.errorTipsMask,
						duration: options.errorTipsDuration,
						position: options.errorTipsPosition
					});
				}

				reject(error);
			}


		});
	});
}
export default http;
