<template>
	<div class="score-container" :class="scoresize">
		<span v-for="scoreitem in scoreType" class="score" :class="scoreitem" track-by="$index"></span>
	</div>
</template>
<script>
	const LEN = 5;
	const CLASS_ON = 'on';
	const CLASS_OFF = 'off';
	const CLASS_HALF = 'half';
	export default {
		props: {
			size: {
				type: Number
			},
			type: {
				type: Number
			}
		},
		computed: {
			scoresize: function () {
				return 'star-' + this.size; 
			},
			scoreType: function () {
				let scoreList = [];
				let score = this.type;
				let hasHalf = Math.floor(score * 2) % 2;
				let on = Math.floor(score);
				for (let i = 0; i < on; i++) {
					scoreList.push(CLASS_ON);
				}
				if (hasHalf) {
					scoreList.push(CLASS_HALF);
				}
				while (scoreList.length < LEN) {
					scoreList.push(CLASS_OFF);
				}
				return scoreList;
			}
		}

	};
</script>
<style>
	.score-container{
		text-align: center;
		padding:18px 0 28px 0;
	}
	.score-container .score{
		display: inline-block;
	}
	.score-container .score:last-child{
		margin-right: 0;
	}
	.star-48 .score{
		width:24px;
		height: 24px;
		margin-right: 22px;
		background-size: 24px 24px;
	}
	.star-36 .score{
		width:18px;
		height: 18px;
		margin-right: 16px;
		background-size: 18px 18px;
	}
	.star-24 .score{
		width:12px;
		height: 12px;
		margin-right: 8px;
		background-size: 12px 12px;
	}
	@media (-webkit-min-device-pixel-ratio: 3){
		.star-48 .score.on{
			background-image: url(star48_on@3x.png);
		}
		.star-48 .score.off{
			background-image: url(star48_off@3x.png);
		}
		.star-48 .score.half{
			background-image: url(star48_half@3x.png);
		}
		.star-36 .score.on{
			background-image: url(star36_on@3x.png);
		}
		.star-36 .score.off{
			background-image: url(star36_off@3x.png);
		}
		.star-36 .score.half{
			background-image: url(star36_half@3x.png);
		}
		.star-24 .score.on{
			background-image: url(star24_on@3x.png);
		}
		.star-24 .score.off{
			background-image: url(star24_off@3x.png);
		}
		.star-24 .score.half{
			background-image: url(star24_half@3x.png);
		}
	}
	@media (-webkit-min-device-pixel-ratio: 2){
		.star-48 .score.on{
			background-image: url(star48_on@2x.png);
		}
		.star-48 .score.off{
			background-image: url(star48_off@2x.png);
		}
		.star-48 .score.half{
			background-image: url(star48_half@2x.png);
		}
		.star-36 .score.on{
			background-image: url(star36_on@2x.png);
		}
		.star-36 .score.off{
			background-image: url(star36_off@2x.png);
		}
		.star-36 .score.half{
			background-image: url(star36_half@2x.png);
		}
		.star-24 .score.on{
			background-image: url(star24_on@2x.png);
		}
		.star-24 .score.off{
			background-image: url(star24_off@2x.png);
		}
		.star-24 .score.half{
			background-image: url(star24_half@2x.png);
		}
	}
	.score-container .score.on{

	}
</style>