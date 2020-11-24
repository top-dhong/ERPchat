<template>
	<view class="loginbox">
		<HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages" @clickMessage="clickMessage"></HMmessages>
		<view class="wlogin-tit">世豪ERP</view>
		<view class="login-item">
			<view class="login-cell">
				<text class="wicon wicon3-4"></text>
				<input type="text" v-model="data.userid" placeholder="UserID"/>
			</view>
			<view class="login-cell">
				<text class="wicon wicon4-6"></text>
				<input type="password" v-model="data.password" placeholder="PassWord"/>
				<text class="wicon wicon4-6"></text>
			</view>
			<view class="login-cell logincli">
				<button class="btn-theme" @click="bangd" button-hover>绑定并登录</button>
			</view>
		</view>
	</view>
</template>

<script>
	let util = require('@/common/util.js')
	let graceChecker = require('@/common/js/graceChecker.js')
	export default {
		data() {
			return {
				isclick:false,//防止重复提交
				data: {
					userid: '',
					password: ''
				},
				is_show: true ,//是否显示发送按钮
			};
		},
		methods: {
			bangd() {
				let that = this
				let par = {}
				par.OpenID = util.getDB('openid')
				par.AvatarUrl = util.getDB('userInfo')['avatarUrl']
				par.UserID = that.data.userid;
				par.Pswd = that.data.password;
				var rule = [
					{ name: "OpenID", checkType: "notnull", errorMsg: "请重新打开小程序" },
					{ name: "UserID", checkType: "notnull", errorMsg: "UserId不能为空" },
					{ name: "Pswd", checkType: "notnull", errorMsg: "PassWord不能为空" }
				];
				var checkRes = graceChecker.check(par, rule);
				if(checkRes){
					if(that.isclick){return}
					that.isclick = true
					//此处调用绑定账号接口
					util.uniFly.post({
						url: that.RP.WX_BINDOPENID,
						params: par
					}).then(function(res) {
						console.log('',res)
						that.isclick = false
						if(typeof(res)!='undefined'&&res.status==200){
							let data = res.data;
							if(typeof(data)!='undefined'&&data.errNo==0){
								util.setDB('User',data.retVal)
								that.HMmessages.show('绑定成功,即将跳转至首页!',{icon:'success',duration:5000});
								setTimeout(function(){
									//防止util .userid不会主动执行
									uni.reLaunch({
										url:'../home/home'
									})
								},1500)
							}else{
								that.HMmessages.show(data.errDesc,{icon:'error',duration:2000});
							}
						}
					})
				}else{
					that.isclick = false
					that.HMmessages.show(graceChecker.error,{icon:'error',duration:2000});
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
		width: 590upx;
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
	.login-cell button.rightbtn{
		position: absolute;
		right: 10upx;
		display: inline-block;
		width: auto;
		height: 80upx;
		line-height: 80upx;
		top: 10upx;
		z-index: 999;
		background: #f98b54;
		border-radius: 40upx;
		font-size: 28upx;
		color: #fff;
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
