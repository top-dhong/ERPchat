<template>
	<view class="loginbox">
		<view class="loginbg">
			<image src="../../static/bg001.png" mode=""></image>
		</view>
		<view class="wlogin-tit">世豪新瑞</view>
		<view class="login-item">
			<view class="login-cell">
				<text class="wicon wicon4-5"></text>
				<input type="text" value="" placeholder="请输入手机号码"/>
			</view>
			<view class="login-cell">
				<text class="wicon wicon4-6"></text>
				<input type="password" value="" placeholder="请输入登录密码"/>
			</view>
			<view class="login-cell logincli">
				<button class="btn-theme" button-hover>登录</button>
			</view>
			<view class="login-cell login-bottom">
				<text @click="register">注册账号</text>
				<text>忘记密码</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			register() {
				uni.navigateTo({
					url:"../register/register"
				})
			},
		}
	}
</script>

<style>
.login-item{margin: 90upx 80upx;flex-direction: column;}
.login-cell{width: 100%;position: relative;flex-direction: column;margin-top: 30upx;box-sizing: border-box;}
.login-cell input{width: 100%;height: 100upx;border-radius: 50upx;border: 2upx solid #c0c0c0;padding-left: 160upx;box-sizing: border-box;font-size: 30upx;}
.login-cell .wicon{position: absolute;left: 50upx;top: 20upx;}
.logincli{margin-top: 90upx;}
.logincli .btn-theme{width: 100%;box-sizing: border-box;height: 100upx;border-radius: 50upx;line-height: 100upx;font-size: 38upx;}
.loginbox {flex-direction: column;}
image,.loginbg{width: 750upx;height: 191upx;flex-direction: column;}
.wlogin-tit{text-align: center;width: 750upx;flex-direction: column;font-size: 46upx;color: #000000;margin-top: 34upx;}
.login-bottom{margin-top: 46upx;color: #FF5800;font-size: 30upx;padding: 0 50upx;justify-content: space-between;flex-direction: row;}
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
