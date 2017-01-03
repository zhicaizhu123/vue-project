<template>
	<div class="cartcontrol">
		<div class="descrease-food" v-show="food.count>0" @click="descreaseCart" transition="move">
			<i class="inner iconfont icon-remove_circle_outline"></i>
		</div>
		<div class="food-num" v-show="food.count>0">
			{{food.count}}
		</div>
		<div class="add-food" @click="addCart">
			<i class="iconfont icon-add_circle"></i>
		</div>
	</div>
</template>
<script>
	import Vue from 'vue';
	export default {
		props: {
			food: {
				type: Object
			}
		},
		created() {
			// console.log(this.food);
		},
		methods: {
			addCart(event) {
				if (!event._constructed) {
					return;
				}
				if (!this.food.count) {
					Vue.set(this.food, 'count', 1); // 如果没有count这个属性需要为food添加
				} else {
					this.food.count++;
				}
				this.$dispatch('cart.add', event.target);
			},
			descreaseCart(event) {
				if (!event._constructed) {
					return;
				}
				this.food.count--;
			}
		}
	};
</script>
<style>
	.cartcontrol{
		font-size: 0;
	}
	.descrease-food,.food-num,.add-food{
		display: inline-block;
	}
	.descrease-food{
		transition:all .3s linear;
	}
	.descrease-food.move-transition{
		opacity: 1;
		transform:translate3d(0,0,0);
	}
	.descrease-food.move-transition .inner{
		transition:all .3s linear;
		transform:rotate(0deg);
	}
	.descrease-food.move-enter,.descrease-food.move-leave{
		opacity: 0;
		transform:translate3d(24px,0,0);
	}
	.descrease-food.move-enter .inner,.descrease-food.move-leave .inner{
		transform:rotate(180deg);
	}
	.descrease-food .icon-remove_circle_outline,.add-food .icon-add_circle{
		font-size: 24px;
		color:rgb(0,160,220);
		padding:6px;
	}
	.food-num{
		font-size: 12px;
		line-height: 24px;
		height:24px;
		width:24px;
		text-align: center;
		color:rgb(147,153,159);
		vertical-align: top;
	}
</style>