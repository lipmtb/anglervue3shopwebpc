<template>
  <div class="CateGoodsWrapper">
    <!-- 顶部子分类导航 -->
    <div class="cate-top clearfix">
      <h4>{{ itemcate.name }}</h4>
      <div class="right-nav">
        <ul class="itemsubcate">
          <li
            class="subitem"
            v-for="subitem of itemcate.children"
            :key="subitem.id"
          >
            <router-link
              :to="{ name: 'subcategory', params: { subid: subitem.id } }"
            >
              {{ subitem.name }}
            </router-link>
          </li>
        </ul>

        <div class="right-more">
          <RouterLink :to="{name:'category',params:{classId:itemcate.id}}">查看全部 &gt;</RouterLink>
        </div>
      </div>
    </div>
    
    <!-- 主体 -->
    <div class="cate-main-wrapper clearfix">
        <!-- 左边大图 -->
        <div class="cate-pic fl">
            <router-link :to="{name:'category',params:{classId:itemcate.id}}">
                <img :src="itemcate.picture" :alt="itemcate.name"/>
            </router-link>
        </div>

        <!-- 推荐商品 -->
        <div class="good-contentlsits clearfix">
              <GoodItemHover v-for="gooddataitem of itemcate.goods" :key="gooddataitem.id" :gooditem="gooddataitem"/>
        </div>
    </div>
  </div>
</template>

<script>
import GoodItemHover from "./GoodItemHover.vue";
export default {
  name: "CateGoods",
  components:{
    GoodItemHover
  },
  props: ["itemcate"],
};
</script>

<style lang="less" scoped>
.CateGoodsWrapper{
    background-color: #fff;
    margin:0 -15px;
    padding:0 15px;
}

// 顶部子分类导航
.cate-top {
    padding:20px 0;
  > h4 {
    float: left;
    
    font-size:2em;
    font-weight:400;
  }
  > div.right-nav {
      width:600px;
    float: right;
    font-size:1.2em;
    line-height:2em;
    > ul.itemsubcate{
        float:left;
        li.subitem{
            float:left;
            margin:0 10px;
        }
    }
    > div.right-more{
        float:right;
        color:rgb(189, 185, 185);
        cursor: pointer;
    }
  }
}
// 左边大图

.cate-pic{
        > a{
            > img{
                width:240px;
                height:610px;
            }
        }
}


//右边商品
.good-contentlsits{
    overflow: hidden;
    
  
}
</style>