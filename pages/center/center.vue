<template>
	<view class="center">
		<view class="logo" @click="tapLogin" :hover-class="!login ? 'logo-hover' : ''">
			<image class="logo-img" :src="login ? (uerInfo.AvatarUrl||dfavatarUrl) :dfavatarUrl"></image>
			<view class="logo-title">
				<text class="uer-name">{{login ? uerInfo.UserName+'('+uerInfo.UserID+')' : '登录/绑定'}}</text>
				<text class="go-login navigat-arrow" v-if="!login">&#xe65e;</text>
			</view>
		</view>
		<view class="center-list">
			<view class="center-list-item" @click="tapUserInfo">
				<view class="list-icon">
					<text class="wicon wicon4-1"></text>
				</view>
				<text class="list-text">我的资料</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
		</view>
		<view class="center-list">
			<view class="center-list-item" @click="tapTongBu">
				<view class="list-icon">
					<text class="wicon wicon5-71"></text>
				</view>
				<text class="list-text">同步信息</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
		</view>
		<view class="center-list">
			<view class="center-list-item" @click="tapReBind">
				<view class="list-icon">
					<text class="wicon wicon4-4"></text>
				</view>
				<text class="list-text">重新绑定</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
		</view>
		<!-- <view class="center-list">
			<view class="center-list-item">
				<view class="list-icon">
					<text class="wicon wicon4-2"></text>
				</view>
				<text class="list-text">授权设置</text>
				<button class="list-text tag-button" open-type="openSetting">授权设置</button>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
		</view> -->
        <view class="center-list">
        	<view class="center-list-item">
        		<view class="list-icon">
        			<text class="wicon wicon4-3"></text>
        		</view>
        		<text class="list-text">分享邀请</text>
        		<button class="list-text tag-button" open-type="share">分享邀请</button>
        		<text class="navigat-arrow">&#xe65e;</text>
        	</view>
        </view>
       <view class="center-list">
        	<view class="center-list-item" @click="tapSettings">
        		<view class="list-icon">
        			<text class="wicon wicon5-8"></text>
        		</view>
        		<text class="list-text">个人设置</text>
        		<text class="navigat-arrow">&#xe65e;</text>
        	</view>
        </view>
       <view class="center-list">
       	<view class="center-list-item">
       		<view class="list-icon">
       			<text class="wicon wicon4-16"></text>
       		</view>
       		<navigator class="list-text" hover-class="none" target="miniProgram" open-type="exit">退出应用</navigator>
       		<text class="navigat-arrow">&#xe65e;</text>
       	</view>
       </view>
		<!-- <view class="exlogin" v-if="login">
			<navigator target="miniProgram" open-type="exit">
				<view><text class="ficon ficon4-16"></text>退出小程序</view>
			</navigator>
		</view> -->
	</view>
</template>

<script>
	let util = require('@/common/util.js')
	export default {
		data() {
			return {
				isres:false,//是否同步头像信息
				login: false, //是否显示头像昵称  lc有也不显示 绑定了openid才显示
				dfavatarUrl: util.imghs+"/WX/wximg/static/head_01L.png",
				uerInfo: {
					UserName: '',
					AvatarUrl: ''
				}
			}
		},
		onShow() {
			let that = this
			that.isres = false
			if (util.chkLogin()) {
				//从DB里面获取用户信息
				that.uerInfo = util.getDB('User');
				that.login = true;
			} else {
				that.login = false;
			}
		},
		onLoad(o){
			//if(o.a){this[o.a]()}
		},
        onShareAppMessage() {
        let uerInfo = util.getDB('User');
        let UserName = uerInfo.UserName||''
         return {
                title: UserName+'邀请您使用\'世豪ERP\'小程序',
                content:'世豪ERP小程序版',
                desc: '世豪ERP小程序版',
                path: '/pages/home/home' // 路径，传递参数到指定页面。
            }
        },
		methods: {
			//个人中心跳转绑定
			goBind() {
				let WXuerInfo = util.getDB('userInfo');//微信用户信息
				if (WXuerInfo) {
					uni.navigateTo({
						url: "../login/loginBun"
					})
				} else {
					uni.navigateTo({
						url: "../login/loginAuth"
					})
				}
			},
			//登陆/绑定
			tapLogin() {
				if (!util.chkLogin()) {
					this.goBind()
				}else{
					this.tapUserInfo()
				}
			},
			//我的资料
			tapUserInfo() {
				if (util.chkLogin()) {
					uni.navigateTo({
						url: "userInfo/userInfo"
					})
				} else {
					this.goBind()
				}
			},
			//退出账号
			tapExcit() {
				let that = this;
				if (util.chkLogin()) {
					//util.showModal('提示','确定退出账号?',function(){
					uni.clearStorage();
					util.log('已退出')
					//})
				} else {
					util.log('你未登录!')
				}
			},
			//重新绑定
			tapReBind() {
				let that = this
				if (util.chkLogin()) {
					util.showModal({
						title: '提示信息',
						content: '此操作会重新绑定你的ERP账号,是否继续?',
						cancelText: '否',
						confirmText: '是',
						success: res => {
							if (res.confirm) {
								that.goBind()
							}
						}
					});
				} else {
					util.log('你未登录!')
				}
			},
			tapTongBu(){
				let that = this
				if(util.chkLogin()){
					uni.showModal({
						title: '提示',
						content: '现在要同步你的微信头像和昵称吗?',
						success: function(res) {
							if (res.confirm) {
								that.synwxmsg()
							}
						}
					})
				}else{
					util.log('你未登录!')
				}
			},
			//同步微信用户头像和昵称
			synwxmsg(e) {
				let that = this
				if (that.isres) {
					util.log('您刚才已经同步过了哟');
					return
				}
				util.log('同步中…',1000,'loading')
				// 查看是否授权
				uni.getSetting({
					success(res) {
						if (res.authSetting['scope.userInfo']) {
							// 已经授权，可以直接调用 getUserInfo 获取头像昵称
							uni.getUserInfo({
								success(res) {
									let wxobj = (res.userInfo)
									util.uniFly.post({
										url: that.RP.WX_SETUSERHEADIMG,
										params: {
											UserGUID:util.chkLogin(),
											AvatarUrl:wxobj.avatarUrl
										}
									}).then(function(res) {
										if (typeof(res) != 'undefined' && res.status == 200) {
											let data = res.data
											if(typeof(data)!='undefined'&&data.errNo==0){
												that.uerInfo.AvatarUrl = wxobj.avatarUrl
												util.setDB('User',that.uerInfo)
												that.isres = true
												util.log('同步成功!')
											}else{
												util.log(data.errDesc)
											}
										}
									})
								}
							})
						} else {
							that.isres = false
							uni.navigateTo({
								url: '../login/loginAuth?rtUrl='+encodeURIComponent('../center/center?a=synwxmsg')
							})
							//util.log('请授权后重试')
						}
					}
				})
			},
			//清空文件缓存数据
			tapClear() {
				if(uni.getSavedFileList){
					uni.getSavedFileList({ // 获取文件列表
						success(res) {
							if(0==res.fileList.length){
								util.log('暂无数据可清空')
							}
							res.fileList.forEach((val, key) => { // 遍历文件列表里的数据
								// 删除存储的垃圾数据
								uni.removeSavedFile({
									filePath: val.filePath
								});
								util.log('操作成功!')
							})
						}
					})
				}else{
					util.log('暂不支持此操作')
				}
			},
            tapSettings(){
                let that = this
                if(util.chkLogin()){
                    uni.navigateTo({
                        url: './settings/settings'
                    })
                }else{
                	util.log('你未登录!')
                }
            },
			errImg(e) {},
            aaa(e){
                let that = this;
                //录入form_id
                let aform_id = e.detail.formId;
                let aDoUserGUID = util.chkLogin();
                util.uniFly.post({
                	url: that.RP.WX_UPDATEFORMIDBYOPENID,
                	params: {guid:aDoUserGUID,form_id:aform_id}
                }).then(function(res) {
                })
                util.log("ok")
            }
		}
	}
</script>

<style>
	.logo-img {
		width: 134upx;
		height: 134upx;
		border-radius: 14upx;
	}
	.tag-button {
		position: absolute;
		opacity: 0;
		z-index: 99;
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
