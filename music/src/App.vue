<template>
  <div id="app">
    <search></search>
    <rank></rank>
    <playbar></playbar>
  </div>
</template>

<script>
import search from './components/search/search';
import rank from './components/rank/rank';
import playbar from './components/playbar/playbar';

export default {
  name: 'app',
  components: {
    search,
    rank,
    playbar
  }
};
</script>

<style>
  #app{
    font-family: Arial, 微软雅黑, "Microsoft yahei", "Hiragino Sans GB", "\51AC\9752\9ED1\4F53\7B80\4F53\4E2D\6587 w3", STXihei, 华文细黑, SimSun, 宋体, Heiti, 黑体, sans-serif;
  }
</style>
