<template>
	<div class="shopcart">
		<div class="shopcart-content">
			<div class="shopcart-content-left">
				<div class="logo-container">
					<div class="logo" :class="{'highlight': totalCount > 0}">
						<i class="iconfont icon-shopping_cart"></i>
					</div>
					<div class="total-num" v-if="totalCount>0">{{totalCount}}</div>
				</div>
				<div class="shopcart-price":class="{'highlight': totalPrice > 0}">
					￥{{totalPrice}}
				</div>
				<div class="deliveryPrice">
					另需配送费￥{{deliveryPrice}}元
				</div>
			</div>
			<div class="shopcart-content-right">
				<div class="pay" :class="payClass">
					{{payDesc}}
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			deliveryPrice: {
				type: Number
			},
			minPrice: {
				type: Number
			},
			selectFoods: {
				type: Array,
				default() {
					return [];
				}
			}
		},
		data() {
			return {};
		},
		computed: {
			totalPrice() {
				let total = 0;
				this.selectFoods.forEach((food) => {
					total += food.price * food.count;
				});
				return total;
			},
			totalCount() {
				let totalNum = 0;
				this.selectFoods.forEach((food) => {
					totalNum += food.count;
				});
				return totalNum;
			},
			payDesc() {
				if (this.totalPrice === 0) {
					return '￥' + this.minPrice + '起送';
				} else if (this.totalPrice < this.minPrice) {
					return '还差￥' + (this.minPrice - this.totalPrice) + '起送';
				} else {
					return '去结算';
				}
			},
			payClass() {
				if (this.totalPrice < this.minPrice) {
					return 'not-enough';
				} else {
					return 'enough';
				}
			}
		}
	};
</script>
<style>
	.shopcart{
		width:100%;
		height:50px;
		position: fixed;
		bottom:0;
		left:0;
		background-color:#141d27;
	}
	.shopcart-content{
		display: flex;
		font-size: 0;
		color:rgba(255,255,255,.4);
	}
	.shopcart-content-left{
		flex:1;
	}
	.shopcart-content-right{
		flex:0 0 105px;
		width:105px;
	}
	.logo-container,.shopcart-price,.deliveryPrice{
		display: inline-block
	}
	.logo-container{
		width:56px;
		height:56px;
		padding:6px;
		border-radius: 50%;
		background-color:#141d27;
		box-sizing:border-box;
		margin-top: -8px;
		margin-left:6px;
		margin-right:6px;
		/*overflow: hidden;*/
		position: relative;
	}
	.logo-container .logo{
		background-color: rgba(255,255,255,.2);
		height:100%;
		width:100%;
		border-radius: 50%;
		text-align: center;
	}
	.logo-container .logo.highlight{
		background-color: #00A0DC;
		color:#fff;
	}
	.logo-container .total-num{
		position: absolute;
		right:0;
		top:0;
		width:24px;
		line-height: 16px;
		font-size: 9px;
		font-weight: 700;
		background-color: rgb(240,20,20);
		color:#fff;
		text-align: center;
		border-radius: 8px;
		box-shadow:0 4px 8px 0 rgba(0,0,0,.4);
	}
	.logo .icon-shopping_cart{
		font-size: 24px;
		line-height: 44px;
	}
	.shopcart-price{
		vertical-align: top;
		margin-top:13px;
		height:25px;
		line-height: 25px;
		font-size: 16px;
		font-weight: 700;
		padding-right:8px;
		border-right: 1px solid rgba(255,255,255,.1);
	}
	.shopcart-price.highlight{
		color:#fff;
	}
	.deliveryPrice{
		padding:0 8px;
		vertical-align: top;
		font-size: 12px;
		height:50px;
		line-height: 50px
	}
	.shopcart-content-right .pay{
		height:50px;
		line-height: 50px;
		text-align: center;
		font-size: 14px;
		font-weight: 700;
	}
	.shopcart-content-right .pay.enough{
		background-color: #12B13D;
		color:#fff;
	}
	.shopcart-content-right .pay.not-enough{
		background-color: #2B333B;
	}
</style>




<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>礼物展示</title>
	<meta name="keywords" content="">
	<meta name="description" content="">
	<meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<link rel="stylesheet" href="./tpl/Wap/default/common/Christmas/css/reset.css">
	<link rel="stylesheet" href="./tpl/Wap/default/common/Christmas/css/dropload.css">
	<link rel="stylesheet" href="./tpl/Wap/default/common/Christmas/css/gift.css">
</head>
<style>
	
</style>
<body>
	<div class="wrap" id="wrapper">
		<!-- <div id="scroller"> -->
			<!-- <div id="pullDown">
                <span class="pullDownIcon"></span><span class="pullDownLabel">下拉刷新</span>
            </div> -->
			<div class="bg-logo"></div>
			<div class="gift-content">
				<div class="gift-list">
				<volist name="data" id="vo">
					<div class="gift-content-item">
						<div class="user-info">
							<div class="user-img">
								<img src="{weimicms:$vo.headurl}" alt="">
							</div>
							<div class="user-info-right">
								<span class="user-name">{weimicms:$vo.nickname}</span>
								<time>{weimicms:$vo.create_time}</time>
							</div>
						</div>
						<div class="gift-content-text">
							{weimicms:$vo.content}
						</div>
						<div class="gift-content-img" style="background-image:url({weimicms:$vo.picurl})"></div>
					</div>
				</volist>
				</div>
			</div>

			
			
			
			<!-- <div id="pullUp">
                <span class="pullUpIcon"></span><span class="pullUpLabel">上拉加载更多</span>
            </div> -->
		<!-- </div> -->
		
	</div>
	<script src="./tpl/Wap/default/common/Christmas/js/zepto.js"></script>

<!-- <script src="js/iScroll.js"></script> -->
	<script src="./tpl/Wap/default/common/Christmas/js/dropload.min.js"></script>
	<!-- <script src="./tpl/Wap/default/common/Christmas/js/main.js"></script> -->
	<script>
	 	// // 下拉刷新
	  //   function pullDownAction () {
	  //   	// alert("下拉");
	  //       myScroll.refresh();
	  //   }
	 	// // 上拉加载
	  //   function pullUpAction () {
	  //   	// alert("上拉");
	  //   	myScroll.refresh();
	  //   }
	  //   document.addEventListener('DOMContentLoaded', function(){
	  //   	loaded(null,pullUpAction);
	  //   }, false);
	  	window.onload = function(){
			document.getElementsByTagName("html")[0].style.fontSize = (document.documentElement.clientWidth / 160*7) + "px";
			window.onresize = function(){
				document.getElementsByTagName("html")[0].style.fontSize = (document.documentElement.clientWidth / 160*7) + "px";
			}
		}

		//上拉加载更多数据
		function loadMoreData(){
			$('#wrapper').dropload({
			    scrollArea : window,
			    domUp : {
		            domClass   : 'dropload-up',
		            domRefresh : '<div class="dropload-refresh">↓下拉刷新</div>',
		            domUpdate  : '<div class="dropload-update">↑释放更新</div>',
		            domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
		        },
		        domDown : {
		            domClass   : 'dropload-down',
		            domRefresh : '<div class="dropload-refresh">↑上拉加载更多</div>',
		            domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
		            domNoData  : '<div class="dropload-noData">暂无数据</div>'
		        },
			    loadDownFn : function(me){
			    	console.log('haha')
			        $.ajax({
			            type: 'POST',
			            url: '{weimicms::U("Bakk/ChristmasGiftAjax", array("token" => $_GET["token"]))}',
			            dataType: 'json',
			            success: function(data){
			            	console.log(data);
			      //           var datalen = data.lists.length;
			      //           var str = "";
			      //           if(datalen > 0){
			      //           	for(var d = 0;d < datalen;d++){
				     //            	str += '<div class="gift-content-item">'
									// 	+'<div class="user-info">'
									// 		+'<div class="user-img"><img class="user-img" src="'+data.lists[d].userImg+'" alt=""></div>'
									// 		+'<div class="user-info-right">'
									// 			+'<span class="user-name">'+data.lists[d].userName+'</span>'
									// 			+'<time>'+data.lists[d].date+'</time>'
									// 		+'</div>'
									// 	+'</div>'
									// 	+'<div class="gift-content-text">'
									// 		+data.lists[d].contentText
									// 	+'</div>'
									// 	+'<div class="gift-content-img" style="background-image:url('+data.lists[d].giftImg+')"></div>'
									// +'</div>'
									
				     //            }
			      //           }else{
			      //           	// 锁定
		       //                  me.lock();
		       //                  // 无数据
		       //                  me.noData();
			      //           }
			      //           // 为了测试，延迟1秒加载
		       //              setTimeout(function(){
		       //                  // 插入数据到页面，放到最后面
		       //                  $('.gift-list').append(str);
		       //                  // 每次数据插入，必须重置
		       //                  me.resetload();
		       //              },1000);
			            },
			            error: function(xhr, type){
			                console.log('请求失败');
			                me.resetload();
			            }
			        });
			        console.log("hehe");
			    },
			    loadUpFn : function(me){
		             $.ajax({
			            type: 'GET',
			            url: 'json/more.json',
			            dataType: 'json',
			            success: function(data){
			                var datalen = data.lists.length;
			                var str = "";
			                for(var d = 0;d < datalen;d++){
			                	str += '<div class="gift-content-item">'
									+'<div class="user-info">'
										+'<div class="user-img"><img class="user-img" src="'+data.lists[d].userImg+'" alt=""></div>'
										+'<div class="user-info-right">'
											+'<span class="user-name">'+data.lists[d].userName+'</span>'
											+'<time>'+data.lists[d].date+'</time>'
										+'</div>'
									+'</div>'
									+'<div class="gift-content-text">'
										+data.lists[d].contentText
									+'</div>'
									+'<div class="gift-content-img" style="background-image:url('+data.lists[d].giftImg+')"></div>'
								+'</div>'
			                }
			                // 为了测试，延迟1秒加载
		                    setTimeout(function(){
		                        $(".gift-list").prepend(str);
		                        // 每次数据加载完，必须重置
		                        me.resetload();
		                        // 解锁loadDownFn里锁定的情况
		                        me.unlock();
		                        me.noData(false);
		                    },1000);
			            },
			            error: function(xhr, type){
			                console.log('请求失败');
			                me.resetload();
			            }
			        });
		        },
		        threshold : 50
			});
		}
		$(function(){
			loadMoreData()
		})


	</script>
</body>
</html>