<template>
	<view class="index bgf">
        <HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages" @clickMessage="clickMessage"></HMmessages>
		<view class="inputboxs">
			<view class="inputname">头像</view>
			<view class="input">
				<image :src="userInfo.AvatarUrl?userInfo.AvatarUrl:dfavatarUrl[userInfo.Gender]" mode="aspectFill"></image>
			</view>
		</view>
		<view class="inputboxs" @longpress="tapCipr(`${userInfo.UserID}`)">
			<view class="inputname">ID</view>
			<view class="input"><input type="text" :value="userInfo.UserID" disabled /></view>
		</view>
		<view class="inputboxs" @longpress="tapCipr(`${userInfo.Name}`)">
			<view class="inputname">姓名</view>
			<view class="input"><input type="text" :value="userInfo.Name" disabled /></view>
		</view>
       <view class="inputboxs" @longpress="tapCipr(`${userInfo.Gender}`)">
        	<view class="inputname">性别</view>
        	<view class="input"><input type="text" :value="userInfo.Gender" disabled /></view>
        </view>
		<view class="inputboxs" @longpress="tapCipr(`${userInfo.Mobile}`)" v-if="'false'==userInfo.isHide">
			<view class="inputname">手机<faicon type="hand-pointer-o" color="#000" size="30" @tap="addPhoneContact"/></view>
			<view class="input"><input type="text" :value="userInfo.Mobile" disabled/></view>
		</view>
        <view class="inputboxs" @longpress="tapCipr(`${userInfo.Depart}`)">
        	<view class="inputname">部门</view>
        	<view class="input"><input type="text" :value="userInfo.Depart" disabled/></view>
        </view>
        <view class="login-cell logincli" v-if="'false'==userInfo.isHide">
        	<button class="btn-theme" @tap="tapCall(`${userInfo.Mobile}`)" button-hover>呼叫/拨号</button>
        </view>
	</view>
</template>

<script>
	let util = require('@/common/util.js')
	let isclick = false
    import faicon from '@/components/fa-icon/fa-icon.vue'
	export default {
        components: {
        	faicon
        },
		data() {
			return {
				userInfo:{},
				dfavatarUrl: {"男":util.imghs+"/WX/wximg/static/head_00L.png","女":util.imghs+"/WX/wximg/static/head_01L.png"},
			};
		},
		onLoad(o) {
			let that = this
            that.userInfo = JSON.parse(o.o)
		},
        methods:{
            tapCall(num){
                uni.makePhoneCall({
                    phoneNumber:num
                })
            },
            addPhoneContact(){
                let that = this
                let par = {lastName:that.userInfo.Name,mobilePhoneNumber:that.userInfo.Mobile,title:that.userInfo.Depart,organization:'成都世豪新瑞集团',remark:'世豪ERP小程序快捷添加'}
                uni.addPhoneContact({
                        ...par,
                        success(e){
                            that.HMmessages.show('操作成功!',{icon:'success'});
                        },
                        fail(e){
                            that.HMmessages.show(e.errMsg,{icon:'error'});
                        }
                    })
            },
            tapCipr(txt){
                util.tapCipr(txt)
            }
        }
	}
</script>

<style>
	.savebtn {
		position: absolute;
		bottom: 80upx;
	}

	.input {
		height: auto;
		justify-content: flex-end;
	}

	.inputname {
		width: 150upx;
	}

	.input image {
		width: 130upx;
		height: 130upx;
		border-radius: 14upx;
	}
    .login-cell {
    	width: 590upx;
    	position: relative;
    	flex-direction: column;
    	margin-top: 30upx;
    	box-sizing: border-box;
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
