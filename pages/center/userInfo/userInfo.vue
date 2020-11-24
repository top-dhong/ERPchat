<template>
	<view class="index bgf">
		<view class="inputboxs">
			<view class="inputname">头像</view>
			<view class="input">
				<image :src="userInfo.AvatarUrl?userInfo.AvatarUrl:dfavatarUrl" mode="aspectFill"></image>
			</view>
		</view>
		<view class="inputboxs">
			<view class="inputname">ID</view>
			<view class="input"><input type="text" :value="userInfo.UserID" disabled /></view>
		</view>
		<view class="inputboxs">
			<view class="inputname">姓名</view>
			<view class="input"><input type="text" :value="userInfo.UserName" disabled /></view>
		</view>
		<view class="inputboxs">
			<view class="inputname">手机</view>
			<view class="input"><input type="text" :value="userInfo.MobileNum" disabled/></view>
		</view>
        <view class="inputboxs" v-if="userInfo.UserID=='00576'">
            <button class="uni-button but-coor-1" @click="tapClick">临时代理董事长审批</button>
            <button class="uni-button but-coor-2" @click="tapClickMy">使用我自己账号审批</button>
        </view>
	</view>
</template>

<script>
    //小林ID:00576
	let util = require('@/common/util.js')
	let isclick = false
	export default {
		data() {
			return {
				userInfo:{},
				dfavatarUrl: util.imghs+"/WX/wximg/static/head_01L.png",
			};
		},
		onLoad() {
			let that = this
			that.userInfo = util.getDB('User')
		},
        methods:{
            tapClick(){
                let that = this
                that.userInfo['UserGUID'] = '55E3CF0F2ADB494FA93E8080D5C658FB'
                util.setDB('User',that.userInfo)
                util.log('临时切换账号成功!')
            },
            tapClickMy(){
                let that = this
                that.userInfo['UserGUID'] = 'E5118F3FCE19489EB587587C439AC752'
                util.setDB('User',that.userInfo)
                util.log('切换使用我自己账号成功!')
            },
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
