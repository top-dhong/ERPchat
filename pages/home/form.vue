<template>
	<view class="index">
		<view class="calc">
			<image src="https://wx.shine-town.com/WX/wximg/static/calc.jpg" mode="widthFix"></image>
		</view>
		<view class="calc-box">
			<view class="calc-item" @click="tapGo('./reportForm/reportForm')">
				<view class="calc-item-left">
					<view class="name">年度每月销售额</view>
					<view class="jiesao">简单操作</view>
				</view>
				<view class="wicon wicon5-4"></view>
			</view>
            <view class="calc-item" @click="tapGo('./reportForm1/reportForm')">
            	<view class="calc-item-left">
            		<view class="name">自定义报表</view>
            		<view class="jiesao">快速查询</view>
            	</view>
            	<view class="wicon wicon5-3"></view>
            </view>
			<view class="calc-item" @click="tapGo('')">
				<view class="calc-item-left">
					<view class="name">其他报表</view>
					<view class="jiesao">快速查询</view>
				</view>
				<view class="wicon wicon5-3"></view>
			</view>
		</view>
	</view>
</template>

<script>
	let util = require('@/common/util.js')
	export default {
		data() {
			return {

			};
		},
		methods:{
			tapGo(url){
				console.log(url)
				if(!url){
					util.log('敬请期待!')
					return
				}
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style>
page{background: #fff;}
*{box-sizing: border-box;}
.calc image{width: 750upx;}
.calc-box{padding: 24upx;flex-wrap: wrap;justify-content: space-between;}
.calc-item{width: 338upx;height: 195upx;background: #FFF8E8;border-radius: 14upx;margin-bottom: 16upx;justify-content: space-between;padding-left: 26upx;padding-right: 10upx;box-sizing: border-box;}
.calc-item:nth-child(4n+2){background: #FFF6ED;}
.calc-item:nth-child(4n+3){background: #FFF5F0;}
.calc-item:nth-child(4n){background: #FFF2F5;}
.calc-item-left{flex-direction: column;justify-content: center;}
.calc-item-left .name{font-size: 28upx;font-weight: bold;color: #000000;}
.calc-item-left .jiesao{font-size: 22upx;color: #848484;margin-top: 12upx;}
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
