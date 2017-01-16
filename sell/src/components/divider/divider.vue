<template>
	<div class="divider">
		
	</div>
</template>
<script>
	export default {};
</script>
<style>
	.divider{
		height: 16px;
		position: relative;
		background-color: #f0f0f0;
	}
	.divider:after,.divider:before{
		content:"";
		position: absolute;
		top:0;
		left:0;
		width:100%;
		border-top:1px solid #eee;
	}
	@media (-webkit-min-device-pixel-ratio: 1.5){
	    .divider:after,.divider:before{
	      	-webkit-transform: scaleY(.7);
	      	transform: scaleY(.7);
	    }
	}
	@media (-webkit-min-device-pixel-ratio: 2){
	    .divider:after,.divider:before{
	      	-webkit-transform: scaleY(.5);
	      	transform: scaleY(.5);
	    }
	}
</style>