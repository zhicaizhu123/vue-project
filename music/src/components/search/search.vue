<template>
	<div class="search-wrap">
		<div class="search-input">
			<img src="./../../assets/icon-search.png" alt="">
			<form>
				<input type="text" placeholder="搜索 歌曲/歌手/专辑">
			</form>
		</div>
		<div class="search-cancel">取消</div>
	</div>
</template>
<script>
	export default {};
</script>
<style>
	.search-wrap{
		height: 60px;
		background-color: #fff;
		display: flex;
	}
	.search-input{
		margin:10px;
		border-radius: 4px;
		background-color: #eee;
		width:100%;
		flex:1;
		display: flex;
		justify-content:center;
		align-items:center;
		overflow: hidden;
	}
	.search-input img{
		width:30px;
		height: 30px;
		display: inline-block;
		margin-right:0 6px;
	}
	.search-input form{
		flex:1;
		height: 100%;
		width:100%;
	}
	.search-input form input{
		width:100%;
		height: 100%;
		background-color: #eee;
		border:none;
		outline: none;
	}
	.search-cancel{
		width:55px;
		height: 40px;
		line-height: 40px;
		margin:10px auto;
	}
</style>