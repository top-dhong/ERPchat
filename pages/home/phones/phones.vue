<template>
	<view class="uni-tab-bar">
		<view class="pro-search">
			<view class="pro-inputbox">
				<input type="text" placeholder="所在部门/员工姓名/员工电话/员工ID" v-model="par.KeyWord" @confirm="search" placeholder-style="color:#ccc">
				<view class="searchbtnimg" @tap="search"><image src="../../../static/search.png" mode=""></image></view>
			</view>
		</view>
		<swiper class="swiper-box" duration="300">
			<swiper-item>
				<scroll-view class="list" scroll-y>
					<block v-for="(Onew,idx1) in dataList" :key="idx1">
							<view class="medialist" @click="goDetail(Onew)">
							<view class="media-tit">
                                <image :src="('MAN'==Onew.Type?Onew.AvatarUrl:defimg)||dfavatarUrl[Onew.Gender]" mode=""></image>
                                <text class="pl20">{{Onew["Name"]||''}}<text v-if="'MAN'==Onew.Type">({{Onew.UserID}})</text></text>
                            </view>
						</view>
					</block>
					<view class="uni-tab-bar-loading">
						<uni-load-more :contentText="loadingText" :status="status" :showIcon="false"></uni-load-more>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>
<script>
    import uniLoadMore from '@/components/uni-load-more.vue';
    import faicon from '@/components/fa-icon/fa-icon.vue'
	let util = require('@/common/util.js');
	export default {
		components: {
            faicon,
            uniLoadMore
		},
		data() {
			return {
                defimg:util.imghs+'/WX/wximg/static/icon_04c.png',//默认部门头像
                dfavatarUrl: {"男":util.imghs+"/WX/wximg/static/head_00L.png","女":util.imghs+"/WX/wximg/static/head_01L.png"},
                par:{
                    pid:'',
                    KeyWord:''
                },
                status: 'more', //上拉的状态：loading正在加载；more上拉加载更多；noMore-没有更多了
                loadingText: {
                	// contentdown: '上拉加载更多',
                	// contentrefresh: '正在加载...',
                	contentnomore: '没有更多数据了'
                },
				dataList:[]
			}
		},
		onLoad(o){
			let that = this
			let par = that.par;
            par['pid'] = o.pid||1
            uni.setNavigationBarTitle({
                title:o.name||'通讯录'
            })
			that.getData(par)
		},
		methods: {
			getData(par) {
				let that = this
				util.uniFly.post({
					url: that.RP.WX_GETCONTACTLIST,
					params: par
				}).then(function(res) {
					if (typeof(res) != 'undefined' && res.status == 2e2) {
						let data = res.data
						if(typeof(data)!='undefined'&&data.errNo==0){
                            if(0==(res.data.retVal).length){
                                that.status= 'noMore'
                            }
                            setTimeout(()=>{
                                that.dataList = (res.data.retVal)
                            },1e2)
						}
					}
				})
			},
			search() {
				let that = this
				let par = that.par
                par['pid'] = 0
                if(!par.KeyWord){par['pid'] = 1;}
                uni.setNavigationBarTitle({
                    title:'通讯录'
                })
				that.getData(par)
			},
			goDetail(o){
                if('ORG'==o.Type){
                   let ID = o.ID.replaceAll(o.Type,'')
                   uni.navigateTo({
                   	url: `./phones?pid=${ID}&name=${o.Name}`
                   });
                }else if('MAN'==o.Type){
                    //util.broadcast.send('broadcast_o',o);
                    uni.navigateTo({
                    	url: `./userInfo?o=`+JSON.stringify(o)
                    });
                }
			}
		}
	}
</script>
<style>
	page {
		height: 100%;
		font-size: 12px;
		line-height: 1.8;
	}

	.drawerbox {
		padding: 0;
		height: 100%;
	}

	.uni-title {
		display: block;
		width: 190upx;
		font-size: 32upx;
		color: #424141;
		padding: 0;
		border-right: 1px solid #ECECEC;
	}

	.uni-title view {
		display: block;
		line-height: 100upx;
		text-align: center;
		position: relative;
		border-bottom: 1upx solid #eee;
		white-space: nowrap;
		overflow: hidden;
	}
	.uni-title view.active{
		color: #FF5800;
	}
	.uni-title view.active:before{
		content: '';
		position: absolute;
		left: 0;
		width: 10upx;
		height: 100upx;
		top: 0;
		background: #FF5800;
	}

	.product-box {
		display: block;
		width: 480upx;
		padding: 0 9upx;
	}

	.pro-cell.on {
		color: #F65332;
		border-color: #F65332;
	}

	.pro-cell {
		display: inline-block;
		float: left;
		text-align: center;
		line-height: 60upx;
		width: 200upx;
		border: 2upx solid #9F9F9F;
		border-radius: 7upx;
		font-size: 28upx;
		justify-content: center;
		align-items: center;
		margin-top: 40upx;
		margin-left: 25upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.media-tit text{display: inline-block;vertical-align: middle;}
	.media-tit image{width: 64upx;height: 64upx;vertical-align: middle;border-radius: 14upx;}
	.media-tit .pl20{width: 540upx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
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
