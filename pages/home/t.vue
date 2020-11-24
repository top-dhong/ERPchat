<template>
    <view>
        <web-view :webview-styles="webviewStyles" :src="weburl"></web-view>
    </view>
</template>

<script>
	let util = require('@/common/util.js')
    export default {
        data() {
            return {
				weburl:'',//打开的外链
                webviewStyles: {
                    progress: {
                        color: '#FF3333'
                    }
                }
            }
        },
		onLoad(o){
			let that = this
			util.log('加载中...',800,'loading')
			console.log('',o)
			if(!o.url){
				util.log('地址错误或不存在请联系客服')
			}
			that.weburl = decodeURI(o.url)
		}
    }
</script>

<style>
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