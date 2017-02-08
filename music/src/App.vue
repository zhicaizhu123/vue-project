<template>
  <div id="app">
    <search @showSearchCancel="rankshow = false" @hideSearchCancel="rankshow = true"></search>
    <rank v-if="rankshow"></rank>
    <transition name="rank-page-slide">
      <rankpage v-if="rankPageShow"></rankpage>
    </transition>
    <div class="play-bar" @click="showPlayPage">
      <audio id="music" :src="dataUrl" autoplay @ended="playContinue" :loop="loop" @timeupdate="updateTime"></audio>
      <div class="bar-img">
        <img :src="coverImgUrl" alt="">
      </div>
      <span class="song-name2">{{song.name}}</span>
      <img class="control" :src="playing?iconPause:iconPlay" alt="" @click.stop="controlMusic">
    </div>
    <transition name="play-slide">
      <play v-if="playPageShow" :songid="song.id"></play>
    </transition>
    
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex';
  import search from './components/search/search';
  import rank from './components/rank/rank';
  import play from './components/play/play';
  import rankpage from './components/rankpage/rankpage';
  import iconPause from 'assets/icon-pause.png';
  import iconPlay from 'assets/icon-play.png';
  export default {
    name: 'app',
    components: {
      search,
      rank,
      play,
      rankpage
    },
    data() {
      return {
        iconPause,
        iconPlay,
        playPageShow: false,
        rankPageShow: false,
        rankshow: true
      };
    },
    computed: {
      ...mapState({
        dataUrl(state) {
          return 'http://ws.stream.qqmusic.qq.com/' + state.song.id + '.m4a?fromtag=46';
        }
      }),
      ...mapState([
        'playing', 'song', 'coverImgUrl', 'rankid', 'playMode', 'playList'
      ]),
      loop() {
        if (this.playMode === 0 || this.playList.length === 1) {
          return true;
        } else {
          return false;
        }
      }
    },
    methods: {
      ...mapMutations(
        ['play', 'pause', 'playContinue']
      ),
      controlMusic() {
        this.playing ? this.pause() : this.play();
      },
      showPlayPage() {
        this.playPageShow = true;
      },
      updateTime() {
        this.$store.commit('updateCurrentTime', parseInt(document.getElementById('music').currentTime));
        this.$store.commit('updateDuration', parseInt(document.getElementById('music').duration));
      }
    },
    watch: {
      playing: function (val) {
        if (val) {
          document.getElementById('music').play();
        } else {
          document.getElementById('music').pause();
        }
      }
    }
  };
</script>

<style>
  #app{
    font-family: Arial, 微软雅黑, "Microsoft yahei", "Hiragino Sans GB", "\51AC\9752\9ED1\4F53\7B80\4F53\4E2D\6587 w3", STXihei, 华文细黑, SimSun, 宋体, Heiti, 黑体, sans-serif;
  }
  .play-bar{
    display: flex;
    width:100%;
    height: 50px;
    position: absolute;
    left: 0;
    bottom: 0;
    background-color: #f9f9f9;
    align-items:center;
    justify-content:center;
  }
  .bar-img{
    width:37.5px;
    height: 37.5px;
    overflow: hidden;
    padding-left:15px;
  }
  .bar-img img{
    width:100%;
    height: 100%;
    border-radius: 4px;
  }
  .song-name2{
    display: block;
    flex:1;
    padding-left:10px;
  }
  .play-bar .control{
    width:20px;
    height: 20px;
    padding-right:16px;
  }

  
  .play-slide-enter-active, .play-slide-leave-active {
    transition: all .3s
  }
  .play-slide-enter, .play-slide-leave-active {
    transform:translateY(100%);
  }
  .rank-page-slide-enter-active, .rank-page-slide-leave-active {
    transition: all .3s
  }
  .rank-page-slide-enter, .rank-page-slide-leave-active {
    transform:translateX(100%);
  }
</style>
