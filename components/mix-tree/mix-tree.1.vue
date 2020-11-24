<template>
	<view class="content">
		<view class="mix-tree-list">
			<block v-for="(item, index) in treeList" :key="index">
				<view 
					class="mix-tree-item"
					:style="[{
							paddingLeft: item.rank*15 + 'px',
							zIndex: item.rank*-1 +50
						}]"
					:class="{
							border: treeParams.border === true,
							show: item.show,
							last: item.lastRank,
							showchild: item.showChild,
							showbackcolor:item.showbackcolor
						}"
					@click.stop="treeItemTap(item, index)"
				>
					<image class="mix-tree-icon" :src="item.lastRank ? treeParams.lastIcon : item.showChild ? treeParams.currentIcon : treeParams.defaultIcon"></image>
					{{item.ProjectName}}
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default(){
					return [];
				}
			},
			params: {
				type: Object,
				default(){
					return {}
				}
			}
		},
		data() {
			return {
				treeList: [],
				treeParams: {
					defaultIcon: '/static/mix-tree/defaultIcon.png',
					currentIcon: '/static/mix-tree/currentIcon.png',
					lastIcon: '/static/mix-tree/i3.png',
					border: false
				}
			}
		},
		watch: {
			list(list){
				let that = this
				that.treeParams = Object.assign(that.treeParams, that.params);
				console.log('==>mix-tree-list',list,list.length);
				that.treeList = []
				that.renderTreeList(list);
			}
		},
		methods: {
			//扁平化树结构
			renderTreeList(list=[], rank=0, PGUID=[]){
				let that = this
				list.forEach(item=>{
					that.treeList.push({
						GUID: item.GUID,
						ProjectName: item.ProjectName,
						PGUID:PGUID,  // 父级id数组
						rank:rank,  // 层级
						showChild: (1>rank),  //子级是否显示
						show: (1>=rank) , // 自身是否显示
						showbackcolor:false
					})
					if(Array.isArray(item.children) && item.children.length > 0){
						let parents = [...PGUID];
						parents.push(item.GUID);
						that.renderTreeList(item.children, rank+1, parents);
					}else{
						that.treeList[that.treeList.length-1].lastRank = true;
					}
				})
				//console.log('==>mix-tree-that.treeList',that.treeList,that.treeList.length);
			},
			// 点击
			treeItemTap(item){
				let that = this
				let list = that.treeList;
				let GUID = item.GUID;
				if(item.lastRank === true){
					//点击最后一级时触发事件
					that.$emit('treeItemClick', item);
					//标记选中项  标记前需要清除之前所有标记项
					list.forEach(childItem=>{
						if(childItem.lastRank === true){
							childItem.showbackcolor = false;
						}
					})
					item.showbackcolor = !item.showbackcolor;
					return;
				}
				item.showChild = !item.showChild;
				list.forEach(childItem=>{
					if(item.showChild === false){
						//隐藏所有子级
						if(!childItem.PGUID.includes(GUID)){
							return;
						}
						if(childItem.lastRank !== true){
							childItem.showChild = false;
						}
						childItem.show = false;
					}else{
						if(childItem.PGUID[childItem.PGUID.length-1] === GUID){
							childItem.show = true;
						}
					}
				})
			}
		}
	}
</script>

<style>
	.mix-tree-list{
		display: flex;
		flex-direction: column;
		padding-left: 15upx;
	}
	.mix-tree-item{
		display: flex;
		align-items: center;
		font-size: 30upx;
		color: #333;
		height: 0;
		opacity: 0;
		transition: .2s;
		position: relative;
	}
	.mix-tree-item.border{
		border-bottom: 1px solid #eee;
	}
	.mix-tree-item.show{
		height: 80upx;
		opacity: 1;
	}
	.mix-tree-icon{
		width: 26upx;
		height: 26upx;
		margin-right: 8upx;
		opacity: .9;
	}
	
	.mix-tree-item.showchild:before{
		transform: rotate(90deg);
	}
	.mix-tree-item.last:before{
		opacity: 0;
	}
	.mix-tree-item.showbackcolor{
		background: #D4D4D4;
	}
</style>
