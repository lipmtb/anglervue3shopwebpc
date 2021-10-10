<template>
  <div class="goodlistss-wrapper">
    <!-- 小分类名 -->
    <div class="goodtype-top">
      <h3 class="goodtype-nametext">{{ gooddatas.name }}</h3>
      <RouterLink :to="{name:'subcategory',params:{subid:gooddatas.id}}" class="more-btn">更多。。。</RouterLink>
    </div>

    <div class="goodlists clearfix">
        <GoodItem class="gooditem-wrapper" v-for="gooditemdata of gooddatas.goods" 
        :gooditemdata="gooditemdata"
        :key="gooditemdata.id"></GoodItem>
    </div>
  </div>
</template>

<script>
import GoodItem from "./GoodItem.vue";
export default {
  name: "CglistGoods",
  components: {
    GoodItem,
  },
  props: {
    gooddatas: {
      type: Object,
      default() {
        return {};
      }
    },
  },
};
</script>

<style lang="less" scoped>
.goodlistss-wrapper{
   background-color: #fff;
   margin-top:10px;
   padding:20px 0;
}

// 小分类名
.goodtype-top{
  padding:10px 0;
  h3.goodtype-nametext{
    text-align: center;
  } 
  a.more-btn{
    float:right;
    position:relative;
    top:-28px;
    cursor: pointer;
  }
}

.goodlists{
  padding-left:20px;
  .gooditem-wrapper{
     float:left;
  }
}
</style>