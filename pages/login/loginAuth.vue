<template>
	<view class="loginbox">
		<HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages" @clickMessage="clickMessage"></HMmessages>
		<view class="wlogin-tit">世豪ERP</view>
		<view class="login-item">
			<open-data   type="userAvatarUrl"></open-data>
			<view class='content'>
				<view>申请获取以下权限</view>
				<text>获得你的公开信息(昵称，头像等)</text>
			</view>
			<view class="login-cell logincli">
				<button class="btn-theme" open-type="getUserInfo" lang="zh_CN" @getuserinfo="bindGetUserInfo"
withCredentials="true">同意</button>
			</view>
		</view>
	</view>
</template>

<script>
	//优化兼容授权后跳转指定页面
	let util = require('@/common/util.js')
	export default {
		data() {
			return {
				rtUrl:'./loginBun',
				isSQ:false//自动跳转未成功  暂时处理成授权后返回再点击同步头像
			};
		},
		onLoad(o){
			if(o.rtUrl){this.rtUrl=decodeURIComponent(o.rtUrl);this.isSQ=true}else{this.isSQ=false}
		},
		methods: {
			bindGetUserInfo(e) {
				let that = this
				if(e.detail.userInfo){
					let wxobj = (e.detail.userInfo);
					util.setDB('userInfo', wxobj)
					if(that.isSQ){
						util.navigateBack()
						return
					}
					uni.navigateTo({
						url:'./loginBun'//that.rtUrl
					})
				}else{
					that.HMmessages.show(e.detail.errMsg, {
						icon: 'error',
						duration: 0,
						closeButton:true
					});
					//util.log(e.detail.errMsg,1500,'error')
				}
			}
		}
	}
</script>

<style>
	.login-item {
		margin: 90upx 80upx;
		flex-direction: column;
	}

	.login-cell {
		width: 100%;
		position: relative;
		flex-direction: column;
		margin-top: 30upx;
		box-sizing: border-box;
	}

	.login-cell input {
		width: 100%;
		height: 100upx;
		border-radius: 50upx;
		border: 2upx solid #c0c0c0;
		padding-left: 160upx;
		box-sizing: border-box;
		font-size: 30upx;
	}

	.login-cell .wicon {
		position: absolute;
		left: 50upx;
		top: 20upx;
	}

	.logincli {
		margin-top: 90upx;
	}

	.logincli .btn-theme {
		width: 100%;
		box-sizing: border-box;
		height: 100upx;
		border-radius: 50upx;
		line-height: 100upx;
		font-size: 38upx;
	}

	.loginbox {
		flex-direction: column;
	}

	image,
	.loginbg {
		width: 750upx;
		height: 191upx;
		flex-direction: column;
	}

	.wlogin-tit {
		text-align: center;
		width: 750upx;
		flex-direction: column;
		font-size: 46upx;
		color: #000000;
		margin-top: 34upx;
	}

	.login-bottom {
		margin-top: 46upx;
		color: #FF5800;
		font-size: 30upx;
		padding: 0 50upx;
		justify-content: space-between;
		flex-direction: row;
	}
	.content{
		display: flex;
		flex-direction: column;
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
