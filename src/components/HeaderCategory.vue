<template>
  <header class="app-header">
    <div class="container clearfix">
      <h1 class="logo-header"><RouterLink to="/">jjcc商城</RouterLink></h1>
      <!-- 分类 -->
      <NavCategory :topCateAll="topCateAll"  class="nav-top-leader"/>
      <div class="fix-topnav" :class="{ 'isFixClass': isFix ,'slideNavDown':isSlideDown}">
        <NavCategory :topCateAll="topCateAll" class="nav-top-fixleader" >
            <h1 class="logo-header"><RouterLink to="/">jjcc商城</RouterLink></h1>
        </NavCategory>
      </div>

      <!-- 搜索 -->
      <div class="search">
        <i class="iconfont icon-search"></i>
        <input type="text" placeholder="饵料" id="top-seachin" />
      </div>

      <!-- 购物车 -->
      <div class="cart">
        <a class="curr" href="#">
          <i class="iconfont icon-cart"></i><em>2</em>
        </a>
      </div>
    </div>
  </header>
</template>

<script>

import NavCategory from "@/components/content/NavCategory.vue";
import srollFixNav from "@/hooks/scrollFix.js";

import {inject} from "vue";

export default {
  name: "HeaderCategory",
  components: {
    NavCategory,
  },
  setup() {
  
  // 滚动固定nav hooks
     let {isFix,isSlideDown}=srollFixNav();
     let topCateAll=inject("topCateAll");
  
    return {
      topCateAll,
      isFix,
      isSlideDown
    };
  }
};
</script>


<style lang="less" scoped>

header.app-header{
   background-color: #fff;
}
.fix-topnav {
  display: none;
}

.nav-top-fixleader{
  width:1240px;
  margin:0 auto;
}
.fix-topnav.isFixClass {
  width:100%;
  display: block;
  position: fixed;
  z-index: 999;
  top: -60px;
  left: 0;
  right: 0;
  background-color: #fff;
  transition:all 1s;
 
}

.fix-topnav.isFixClass.slideNavDown {
 
 top: 0
}
div.container {
  
  z-index:80;
}

.nav-top-leader{
  float:left;
}
h1.logo-header {
  float: left;
  height: 0;
  width: 160px;
  padding-top: 100px;
  overflow: hidden;
  background: #008c8c url("~@/assets/images/logo.png") no-repeat center/contain;
}

div.search,
div.cart {
  float: left;
  margin-top: 35px;
}

//搜索
div.search {
  i.icon-search {
    font-size: 0.6em;
    color: #123;
    margin-right: 2px;
  }
  input#top-seachin {
    width: 80px;
    transition: width 500ms;
    border-radius: 4px;
    &:focus {
      border: 1px solid #eee;
      width: 160px;
      padding: 4px;
    }
  }
}

div.cart {
  margin-left: 10px;
}
</style>