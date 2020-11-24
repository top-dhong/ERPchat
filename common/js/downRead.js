/**
 * 配置支持打开的文档类型
 * 文档后缀统一配置大写
 */
let doActionArr = [{
		do: 'openDocument',
		str: ['PDF', 'DOC', 'DOCX', 'XLSX', 'XLS', 'PPT', 'PPTX']
	},
	{
		do: 'openWeb',
		str: ['JPG', 'JPEG', 'PNG', 'BMP','TXT','TEXT']
	},
	// {
	// 	do: 'openZip',
	// 	str: ['ZIP']
	// },
	//{do:'openRar',str:['RAR']},
]
var downRead = function(url, fileType, succ, fail) {
	uni.showLoading({
		title: '正在打开...',
		mask:true
	});
	if (!fileType) {
		fileType = url.substring(url.lastIndexOf(".") + 1, url.length);
	}
	let doAction = ''
	for (const ar in doActionArr) {
		if (doActionArr[ar].str.includes(fileType.toLocaleUpperCase())) {
			doAction = doActionArr[ar].do
		}
	}
	if (!doAction) {
		fail('不支持的文档类型!')
		uni.hideLoading();
		uni.showModal({
			title: '提示信息',
			content: '不支持的文档类型,可复制后在浏览器中打开',
			cancelText: '取消',
			confirmText: '复制',
			success: res => {
				if (res.confirm) {
					uni.setClipboardData({
						data: url,
						success: function() {
							util.log('已复制');
						}
					});
				}
			}
		});
		return
	}
	if ('openDocument' == doAction) {
		console.log(url)
		uni.downloadFile({
			url: url,
			header: {},
			success: function(res) {
				let filePath = res.tempFilePath;
				console.log(filePath)
				uni.openDocument({
					filePath: filePath,
					fileType: fileType,
					success: function(res) {
						succ('打开文档成功');
						uni.hideLoading();
					},
					fail: function(res) {
						fail(res.errMsg);
						uni.hideLoading();
					}
				})
			},
			fail: function(res) {
				fail(res.errMsg);
				uni.hideLoading();
			}
		})
	} else if ('openWeb' == doAction) {
		uni.navigateTo({
			url: `../webview?url=${encodeURI(url)}`
		})
		uni.hideLoading();
	} else if ('openZip' == doAction) {
		if (!wx.getFileSystemManager) {
			fail('当前版本过低!');
			uni.hideLoading();
		}
		let FileSystemManager = wx.getFileSystemManager()
		uni.downloadFile({
			url: url,
			header: {},
			success: function(res) {
				let zipFilePath = res.tempFilePath;
				console.log(zipFilePath)
				FileSystemManager.mkdir({
					dirPath: `${wx.env.USER_DATA_PATH}/testDir`
				})
				FileSystemManager.unzip({
					zipFilePath,
					targetPath: `${wx.env.USER_DATA_PATH}/testDir`,
					success(res){
						console.log(res.errMsg);
						uni.hideLoading();
					},
					fail(res) {
						fail(res.errMsg);
						uni.hideLoading();
					}
				})
			},
			fail: function(res) {
				fail(res.errMsg);
				uni.hideLoading();
			}
		})
	}
}


export {
	downRead
}
