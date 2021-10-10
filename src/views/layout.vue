<template>
  <div class="base-layout-wrapper">
    <NavTopLists />

    <HeaderCategory />

    <!-- 二级路由主体内容 -->
    <div class="main container">
      <router-view></router-view>
    </div>

    <AppFooter />
  </div>
</template>

<script>
import NavTopLists from "../components/NavTopLists.vue";
import HeaderCategory from "../components/HeaderCategory.vue";
import AppFooter from "../components/AppFooter.vue";


import {useStore} from "vuex";
import {computed,provide, reactive} from "vue";

import {getMainRunBannerImg} from "@/network/common/adverBanner.js"
export default {
  name: "layout",
  setup() {
    //请求得到分类数据，存储在vuex传递给组件
    let store=useStore();
    store.dispatch("getCateAllLists");

    let headerCateLists=computed(()=>{
      if(store.getters.headerCateLists.length===0){
        return [{
          id:"aaa1",
          name:"钓竿",
          children:[]
        },{
          id:"aaa2",
          name:"饵料",
          children:[]
        },{
          id:"aaa3",
          name:"帐篷",
          children:[]
        },{
          id:"aaa4",
          name:"渔网",
          children:[]
        }]
      }
      return store.getters.headerCateLists;
    })

     provide("topCateAll", headerCateLists);


  let imgBanner=reactive([]);
     //请求获取轮播图广告数据
     getMainRunBannerImg().then((res)=>{
      //  console.log("获取广告数据",res);
       imgBanner.push(...res.result);
     })

     provide("adverBannerImg",imgBanner);
  },
  components: {
    NavTopLists,
    HeaderCategory,
    AppFooter,
  },
};
</script>

<style>
.main {
  min-height: 600px;
}
</style>