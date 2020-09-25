<template>
	<view>
		<!-- #ifdef H5 -->
			<view class="top_1">
				<view @click="changeTab(index)" :class="[index==currentindex ? 'color' : '']" v-for="(item,index) in tablist" :key="'top'+index">{{item.title}}</view>
			</view>
			<view class="content_1" @touchstart="start" @touchend="end">
				<view v-if="currentindex == 0">
					<view class="con_title" v-for="(item,index) in going" :key="'going'+index">
						<view class="con_top con_color_1">
							<view>计划日期：{{item.time_between}}</view>
							<view>计划金额：{{item.amount}}</view>
						</view>
						<view class="con_bottom">
							<view class="con_bottom_top">
								<view>
									<view>消费金额：{{item.money_pay}}</view>
									<view>消费手续费：{{item.fee_pay}}</view>
								</view>
								<view>
									<view>还款金额：{{item.money_repay}}</view>
									<view>还款手续费：{{item.fee_repay}}</view>
								</view>
							</view>
							<view class="btns">
								<view class="btn con_color_1" @click="stop">终止计划</view>
								<view class="btn con_color_1" @click="look(currentindex,item.id)">计划详情</view>
							</view>
						</view> 
					</view>
				</view>
				<view v-if="currentindex == 1">
					<view class="con_title"  v-for="(item,index) in success" :key="'success'+index">
						<view class="con_top con_color_2">
							<view>计划日期：{{item.time_between}}</view>
							<view>计划金额：{{item.amount}}</view>
						</view>
						<view class="con_bottom">
							<view class="con_bottom">
								<view class="con_bottom_top">
									<view>
										<view>消费金额：{{item.money_pay}}</view>
										<view>消费手续费：{{item.fee_pay}}</view>
									</view>
									<view>
										<view>还款金额：{{item.money_repay}}</view>
										<view>还款手续费：{{item.fee_repay}}</view>
									</view>
								</view>
								<view class="btns">
									<view class="btn con_color_2" @click="look(currentindex,item.id)">计划详情</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view v-if="currentindex == 2">
					<view class="con_title"  v-for="(item,index) in cancel" :key="'cancel'+index">
						<view class="con_top con_color_3">
							<view>计划日期：{{item.time_between}}</view>
							<view>计划金额：{{item.amount}}</view>
						</view>
						<view class="con_bottom">
							<view class="con_bottom">
								<view class="con_bottom_top">
									<view>
										<view>消费金额：{{item.money_pay}}</view>
										<view>消费手续费：{{item.fee_pay}}</view>
									</view>
									<view>
										<view>还款金额：{{item.money_repay}}</view>
										<view>还款手续费：{{item.fee_repay}}</view>
									</view>
								</view>
								<view class="btns">
									<view class="btn con_color_3" @click="look(currentindex,item.id)">计划详情</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		<!-- #endif -->
		<!-- #ifdef APP-PLUS -->
			<view class="top">
				<view @click="changeTab(index)" :class="[index==currentindex ? 'color' : '']"  v-for="(item,index) in tablist" :key="'top_1'+index">{{item.title}}</view>
			</view>
			<view class="content" @touchstart="start" @touchend="end">
				<view v-if="currentindex == 0">
				   	<view class="con_title" v-for="(item,index) in going" :key="'going'+index">
				   		<view class="con_top con_color_1">
				   			<view>计划日期：{{item.time_between}}</view>
				   			<view>计划金额：{{item.amount}}</view>
				   		</view>
				   		<view class="con_bottom">
				   			<view class="con_bottom_top">
				   				<view>
				   					<view>消费金额：{{item.money_pay}}</view>
				   					<view>消费手续费：{{item.fee_pay}}</view>
				   				</view>
				   				<view>
				   					<view>还款金额：{{item.money_repay}}</view>
				   					<view>还款手续费：{{item.fee_repay}}</view>
				   				</view>
				   			</view>
				   			<view class="btns">
				   				<view class="btn con_color_1" @click="stop">终止计划</view>
				   				<view class="btn con_color_1" @click="look(currentindex,item.id)">计划详情</view>
				   			</view>
				   		</view>
				   	</view>
				</view>
				<view v-if="currentindex == 1">
					<view class="con_title"  v-for="(item,index) in success" :key="'success'+index">
						<view class="con_top con_color_2">
							<view>计划日期：{{item.time_between}}</view>
							<view>计划金额：{{item.amount}}</view>
						</view>
						<view class="con_bottom">
							<view class="con_bottom">
								<view class="con_bottom_top">
									<view>
										<view>消费金额：{{item.money_pay}}</view>
										<view>消费手续费：{{item.fee_pay}}</view>
									</view>
									<view>
										<view>还款金额：{{item.money_repay}}</view>
										<view>还款手续费：{{item.fee_repay}}</view>
									</view>
								</view>
								<view class="btns">
									<view class="btn con_color_2" @click="look(currentindex,item.id)">计划详情</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view v-if="currentindex == 2">
					<view class="con_title"  v-for="(item,index) in cancel" :key="'cancel'+index">
						<view class="con_top con_color_3">
							<view>计划日期：{{item.time_between}}</view>
							<view>计划金额：{{item.amount}}</view>
						</view>
						<view class="con_bottom">
							<view class="con_bottom">
								<view class="con_bottom_top">
									<view>
										<view>消费金额：{{item.money_pay}}</view>
										<view>消费手续费：{{item.fee_pay}}</view>
									</view>
									<view>
										<view>还款金额：{{item.money_repay}}</view>
										<view>还款手续费：{{item.fee_repay}}</view>
									</view>
								</view>
								<view class="btns">
									<view class="btn con_color_3" @click="look(currentindex,item.id)">计划详情</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		<!-- #endif -->
	</view>
</template>

<script>
	export default{
		data(){
			return{
				startData:{
					clientX:0,
					clientY:0
				},
				tablist:[
					{title:'进行中'},
					{title:'完成'},
					{title:'取消计划'}
				],
				tradeid:0,
				cardid:0,
				page:0,
				currentindex:0,
				going:[],
				success:[],
				cancel:[],
			}
		},
		onShow(){
			
		},
		onLoad(response){
			this.tradeid  = response.tradeid
			this.cardid = response.cardid
			this.PlanList()
		},
		//上拉加载
		onReachBottom() {
			
		},
		methods:{
			PlanList(){
				/*
				"trade_id": "",
				"bank_id": "",
				"status": "",
				"page": "1",
				"ps": "status：[完成,停止,执行中,NULL]"
				*/
				this.$queue.showLoading("请稍后...");
				this.$Request.postP('/plan/view',{
					    "trade_id": this.tradeid, //通道id
					    "bank_id": this.cardid ,//银行卡id 
						"status": '',
						"page":this.page,
				}).then(res => {
					console.log(res);
					res.data.forEach((item,index)=>{
						//console.log(item)
						if(item.status == '执行中'){
							if(this.going.length > 0){
								this.going.push(item)	
							}else{
								this.going = [item]	
							}
						}
						if(item.status == '完成'){
							if(this.success.length > 0){
								this.success.push(item)	
							}else{
								this.success = [item]	
							}
						}
						if(item.status == '停止'){
							if(this.cancel.length > 0){
								this.cancel.push(item)	
							}else{
								this.cancel = [item]	
							}
						}
					})
				});
				uni.hideLoading();
			},
			start(e){
				this.startData.clientX=e.changedTouches[0].clientX;             
				this.startData.clientY=e.changedTouches[0].clientY;
			},
			end(e){
				const subX=e.changedTouches[0].clientX-this.startData.clientX;
				const subY=e.changedTouches[0].clientY - this.startData.clientY;
				if(subY>50 || subY<-50){
					
				}else{
					if(subX>50){
						console.log('右滑')
						if(this.currentindex>0){
							this.currentindex --;
						}
					}else if(subX<-50){
						console.log('左滑')
						if(this.currentindex<2){
							this.currentindex ++;
						}
					}
				}
			},
			//切换tab
			changeTab(inx){
				console.log(inx)
				this.currentindex = inx;
			},
			//终止计划
			stop(){
				uni.showModal({
				    title: '终止计划',
				    content: '您确定要终止该计划吗?',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			//计划详情
			look(index,planid){
				uni.navigateTo({
					url:'../daihuan/daihuanxiangqing?index='+index+'&planid='+planid
				});
			},
		}
	}
</script>

<style lang="scss">
.top{
	width:100%;
	height:80upx;
	position: fixed;
	z-index:999;
	top:0;
	// background: -webkit-linear-gradient(left, #e10a07 0, #f15b6c 100%);
	background-color: #FFFFFF;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding:0 80upx;
	font-size:52upx;
	color:rgb(51,51,51);
	
}
.top>view{
	line-height: 80upx;
	padding:0 10px;
}
.top_1>view{
	line-height: 80upx;
	padding:0 10px;
}
.color{
	color:#f15b6c;
	border-bottom: 4upx solid #f15b6c;
	transition:all 1s;
}
.top_1{
	width:100%;
	height:80upx;
	position: fixed;
	top:80upx;
	z-index:999;
	// background: -webkit-linear-gradient(left, #e10a07 0, #f15b6c 100%);
	background-color: #FFFFFF;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding:0 80upx;
	font-size:52upx;
	color:rgb(51,51,51);
}
.content{
	margin-top:104upx;
	width:100%;
	padding:0 20px;
	padding-bottom: 40upx;
}
.content_1{
	position: absolute;
	top:84upx;
	width:100%;
	padding:0 20px;
	padding-bottom: 20upx;
}
.con_title{
	width:100%;
	height:300upx;
	background-color: #ffffff;
	margin:40upx 0;
	border-radius: 12upx;
}
.con_top{
	width:100%;
	align-items: center;
	padding:0 20upx;
	border-top-left-radius: 12upx;
	border-top-right-radius: 12upx;
	font-size:52upx;
}
.con_color_1{
	background-color: #f15b6c;
}
.con_color_2{
	background-color: #32CD32;
}
.con_color_3{
	background-color: #D3D3D3;
}
.con_bottom{
	padding:10upx 20upx;
	font-size:52upx;
}
.con_bottom_top{
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.btns{
	float: right;
	display: flex;
	flex-direction: row;
	align-items: center;
	margin:10upx 0;
}
.btn{
	padding:0 20upx;
	border-radius: 20upx;
	color:#ffffff;
	margin-left:40upx;
}
 
</style>
