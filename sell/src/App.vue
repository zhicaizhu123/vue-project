<template>
  <div>
    <v-header></v-header>
    <div class="tab">
      <div class="tab-item">
        <a v-link="{path:'/goods'}">商品</a>
      </div>
      <div class="tab-item">
        <a v-link="{path:'/ratings'}">评论</a>
      </div>
      <div class="tab-item">
        <a v-link="{path:'/seller'}">商家</a>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  import header from 'components/header/header.vue';
  export default {
    components: {
      'v-header': header
    }
  };
</script>
<style>
  .tab{
    display: flex;
    height: 40px;
    line-height: 40px;
    position: relative;
  }
  .tab:after{
    position: absolute;
    display: block;
    width:100%;
    left:0;
    bottom:0;
    content: ' ';
    border:1px solid rgba(7,17,27,.1);
  }
  @media (-webkit-min-device-pixel-ratio: 1.5){
    .tab:after{
      -webkit-transform: scaleY(.7);
      transform: scaleY(.7);
    }
  }
  @media (-webkit-min-device-pixel-ratio: 2){
    .tab:after{
      -webkit-transform: scaleY(.5);
      transform: scaleY(.5);
    }
  }
  .tab .tab-item{
    flex: 1;
    text-align: center;
  }
  .tab .tab-item a{
    display: block;
    color:rgb(79,85,93);
    font-size: 14px;
  }
  .tab .tab-item a.active{
    color: rgb(240,20,20);
  }
</style>
