<script>
	let util = require('@/common/util.js');
	export default {
		onLaunch: function() {
			util.setDB('User',{})
			this.chkUpdate()
		},
		onShow: function(e) {
			let that = this;
			uni.getNetworkType({
				success: function(res) {
					let networkType = res.networkType;
					if ('none' == networkType) {
						util.log('请检查网络连接')
					}
				}
			})
		},
		methods: {
			//版本更新1
			chkUpdate() {
				if (uni.canIUse('getUpdateManager')) {
					const updateManager = uni.getUpdateManager()
					updateManager.onCheckForUpdate(function(res) {
						// 请求完新版本信息的回调
						if (res.hasUpdate) {
							updateManager.onUpdateReady(function() {
								uni.showModal({
									title: '更新提示',
									content: '新版本已经准备好，是否重启应用？',
									success: function(res) {
										if (res.confirm) {
											updateManager.applyUpdate()
										}
									}
								})
							})
							updateManager.onUpdateFailed(function() {
								// 新的版本下载失败
								uni.showModal({
									title: '已经有新版本了哟~',
									content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
								})
							})
						}
					})
				}else{
					util.log('您的微信版本较低!')
				}
			}
		}
	}
</script>

<style>
	@import './common/common.css';
	@import './common/wicon.css';

	
</style>
