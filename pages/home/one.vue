<template>
	<view class="contenta">
			<view class="cona">
				<img class="imga" src="../../static/advertise.jpg">
			</view>
			<view class="btna timera" @tap="tabHome">
				<view class="infoa">跳过</view>
				<view class="circleProgress_wrappera btna">
					<view class="wrappera righta">
						<view class="circleProgress rightcirclea"></view>
					</view>
					<view class="wrappera lefta">
						<view class="circleProgress leftcirclea"></view>
					</view>
				</view>
			</view>
		</view>
</template>

<script>
	export default {
		data(){
			return{
				isRet:false
			}
		},
		onLoad(){
			let that = this
			setTimeout(function(){
				that.toHome()
			},5000)
		},
		methods:{
			tabHome(){
				this.isRet = false
				this.toHome()
			},
			toHome(){
				let that = this
				if(that.isRet){return}
				that.isRet = true
				console.log(111111111111111)
				uni.reLaunch({
					url:'./home'
				})
			}
		}
	}
</script>

<style>
	* {
	margin: 0;
	padding: 0;
}

page {
	width: 100%;
	height: 100%;
}

.contenta {
	width: 100%;
	height: 100%;
}

.contenta .cona {
	width: 100%;
	height: 100%;
	font-size: 0;
	display: flex;
	align-items: center;
}

.imga {
	width: 100%;
	height: 100%;
}

.timera {
	display: inline-block;
	position: fixed;
	top: 42px;
	right: 12px;
}

.infoa {
	position: absolute;
	/* top: 0;
	left: 0; */
	width: 36px;
	height: 36px;
	line-height: 36px;
	border-radius: 50%;
	background-color: rgba(0, 0, 0, 0.3);
	/* text-align: center; */
	justify-content: center;
	color: #FFFFFF;
	font-size: 12px;
}

.circleProgress_wrappera {
	width: 36px;
	height: 36px;
	position: relative;
}

.wrappera {
	width: 18px;
	height: 36px;
	position: absolute;
	top: 0;
	overflow: hidden;
}

.righta {
	right: 0px;
}

.lefta {
	left: 0px;
}

.circleProgress {
	width: 36px;
	height: 36px;
	border: 2px solid #FFFFFF;
	border-radius: 50%;
	position: absolute;
	top: 0;
	-webkit-transform: rotate(45deg);
}

.rightcirclea {
	border-top: 2px solid #f47920;
	border-right: 2px solid #f47920;
	right: 0;
	-webkit-animation: circleProgressLoad_right 5s linear;
	/*动画停留在最后一帧*/
	animation-fill-mode: forwards;
	-moz-animation-fill-mode: forwards;
	-webkit-animation-fill-mode: forwards;
	-o-animation-fill-mode: forwards;
}

.leftcirclea {
	border-bottom: 2px solid #f47920;
	border-left: 2px solid #f47920;
	left: 0;
	-webkit-animation: circleProgressLoad_left 5s linear;
	/*动画停留在最后一帧*/
	animation-fill-mode: forwards;
	-moz-animation-fill-mode: forwards;
	-webkit-animation-fill-mode: forwards;
	-o-animation-fill-mode: forwards;
}

@keyframes circleProgressLoad_right {
	0% {
		border-top: 2px solid #f47920;
		border-right: 2px solid #f47920;
		-webkit-transform: rotate(45deg);
	}

	50% {
		border-top: 2px solid #f47920;
		border-right: 2px solid #f47920;
		border-left: 2px solid #FFFFFF;
		border-bottom: 2px solid #FFFFFF;
		-webkit-transform: rotate(225deg);
	}

	100% {
		border-left: 2px solid #FFFFFF;
		border-bottom: 2px solid #FFFFFF;
		-webkit-transform: rotate(225deg);
	}
}

@keyframes circleProgressLoad_left {
	0% {
		border-bottom: 2px solid #f47920;
		border-left: 2px solid #f47920;
		-webkit-transform: rotate(45deg);
	}

	50% {
		border-bottom: 2px solid #f47920;
		border-left: 2px solid #f47920;
		border-top: 2px solid #FFFFFF;
		border-right: 2px solid #FFFFFF;
		-webkit-transform: rotate(45deg);
	}

	100% {
		border-top: 2px solid #FFFFFF;
		border-right: 2px solid #FFFFFF;
		-webkit-transform: rotate(225deg);
	}
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
