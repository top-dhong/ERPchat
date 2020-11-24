<template>
	<!-- 论坛事例组件 -->
	<view class="fdc wforum" @click="bindClick">
		<view class="pictext">
			<view class="ptext">
				<view class="pic-tit"><text>荐</text>{{data.title}} </view>
				<view class="pic-con">{{data.introtitle}} </view>
			</view>
			<view class="pimgbox">
				<image :src="data.newimg" mode="aspectFill"></image>
			</view>
		</view>
		<view class="picb">
			<view class="ptcell"><image :src="data.newtxpic" mode="aspectFill"></image><text decode="true">{{data.uname}} | {{data.btitle}}</text></view>
			<view class="ptcell jcfd"><text decode="true">查阅数:{{data.lookcount}}&emsp;回复数:{{data.replycount}}</text></view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'fourm',
		props: {
		    data: {
		        type: Object,
		        default: function(e) {
		            return {}
		        }
		    }
		},
		methods:{
			bindClick() {
			    this.$emit('click');
			}
		}
	}
</script>

<style>
.fdc.wforum{background: #FFFFFF;border-radius: 14upx;margin: 14upx 0 0;padding: 34upx 0 0;width: 690upx;box-sizing: border-box;}
.wforum .pimgbox image{width: 208upx;height: 156upx;}
.wforum .ptext{flex-direction: column;align-self: flex-start;padding-right: 24upx;overflow: hidden;}
.wforum .pic-tit{color: #FF5800;font-size: 32upx;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width: 458upx;display: block;}
.wforum .pic-tit text{font-size:24upx;background:#FFAD2C;color:#fff;border-radius:5upx;padding:3upx 4upx;margin-right:10upx;}
.wforum .pic-con{text-overflow: ellipsis;-webkit-line-clamp:3;-webkit-box-orient: vertical;overflow: hidden;display: -webkit-box;font-size: 26upx;line-height: 1.6;}
.wforum .picb{font-size: 24upx;color: #7D7D7D;justify-content: space-between;padding-top: 26upx;border-bottom: 1px solid #ececec;padding-bottom: 22upx;}
.wforum .ptcell{width: 360upx;overflow: hidden;white-space: nowrap;align-self: center;}
.wforum .ptcell image{width:52upx;height:52upx;margin-right:16upx;}
.wforum .ptcell text{align-self:center;}
</style>
