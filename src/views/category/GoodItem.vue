<template>
  <div class="good-item-wrapper">
      <router-link :to="{name:'product',params:{productId:gooditemdata.id}}">
          <img class="good-picture" :src="gooditemdata.picture" :alt="gooditemdata.name"/>
          <p class="pname-text ellipsis">{{gooditemdata.name}}</p>
          <p class="pdesc-text">{{gooditemdata.desc}}</p>
      </router-link>
  </div>
</template>

<script>
export default {
    name:"goodItem",
    props:["gooditemdata"]
}
</script>

<style lang="less" scoped>
.good-item-wrapper{
  width:192px;
  padding:10px 16px  30px;
  text-align: center;
  a{
    display:block;
  }
}
  img.good-picture{
      width:160px;
      height:160px;
  }
  
  p.pname-text{
    margin:5px 0;
    font-size:20px;
  }
  p.pdesc-text{
    color:#aaa;
  }
</style>