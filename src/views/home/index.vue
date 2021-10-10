<template>
  <div class="home-wrapper">
    <!-- <CommonImgRun :bannerdatalists="advBannerData"/> -->
    <div class="container">
      <!-- 轮播图 -->
      <CommonImgRun :bannerdatalists="advBannerData" />

      <!-- 左边推荐 -->
      <LeftNavLayer :cgallLists="cgallLists"></LeftNavLayer>

      <!-- 新鲜好物 -->
      <NewHot :newMultiLists="newMultiLists"> </NewHot>

      <!-- 人气推荐 -->
      <HotLists :newMultiLists="hotLists">
        <h3 class="new-leader-text">人气推荐</h3>
      </HotLists>

      <!-- 热门品牌 -->
       <HotBrand :hotBrandLists="hotBrandLists"/>


      <!-- 分类和产品 -->
       <CateGoods v-for="itemcate of allCateGoods" :key="itemcate.id" :itemcate="itemcate"></CateGoods>
    </div>
  </div>
</template>   

<script>
// 首页
import CommonImgRun from "@/components/common/BannerImgRun.vue";

import { inject, reactive, onMounted } from "vue";

import LeftNavLayer from "./LeftNavLayer.vue"; //绝对定位区域，推荐
import NewHot from "./NewHotCpn.vue"; //新鲜好物
import HotLists from "./HotLists.vue"; //人气推荐
import HotBrand from "./HotBrand.vue"; //热门品牌
import CateGoods from "./categood/CateGoods";    //分类产品good

import { getNewGoods } from "@/network/home/newMulti.js";
import { getHotGoods } from "@/network/home/hotGoods.js";
import { getHotBrandLimit } from "@/network/home/hotBrand.js";
import {getHomeCateGoods} from　"@/network/home/categood.js";

export default {
  name: "home",
  setup() {
    let advBannerData = inject("adverBannerImg");
    let cgallLists = inject("topCateAll"); //layout获取过
    let newMultiLists = reactive([]); //新鲜好物数据
    let hotLists = reactive([]); //人气推荐数据
    let hotBrandLists = reactive([]); //热门品牌
    let allCateGoods=reactive([]);//分类产品good
    onMounted(() => {
      //新鲜好物
      getNewGoods(4).then((res) => {
        // console.log("新鲜好物", res.result);
        newMultiLists.push(...res.result);
      });

      //人气推荐
      getHotGoods().then((res) => {
        // console.log("人气推荐", res.result);
        hotLists.push(...res.result);
      });

      //热门品牌
      getHotBrandLimit().then((res) => {
        // console.log("热门品牌", res.result);
        hotBrandLists.push(...res.result);
      });

      //分类产品
      getHomeCateGoods().then((res)=>{
        // console.log("getCateGoods",res.result);
        allCateGoods.push(...res.result);
      })
    });
    return {
      advBannerData,
      cgallLists,
      newMultiLists,
      hotLists,
      hotBrandLists,
      allCateGoods
    };
  },
  components: {
    CommonImgRun,
    LeftNavLayer,
    NewHot,
    HotLists,
    HotBrand,
    CateGoods
  },
};
</script>

<style lang="less" scoped>
h3.new-leader-text {
  padding: 20px 0 20px 6px;
  font-size: 2.6em;
  color: #666;
  font-weight: normal;
}
</style>