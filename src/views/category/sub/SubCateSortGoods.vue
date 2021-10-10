<template>
  <div class="subsort-wrapper">
    <div class="sublist-top clearfix">
      <!-- 左边排序控制按钮 -->
      <div class="subsort-control fl">
        <span>默认排序</span>
        <span>最新商品</span>
        <span>最高人气</span>
        <span>评论最多</span>
        <span>价格排序</span>
      </div>

      <!-- 右边过滤 -->
      <div class="right-filter-area fr">
        <div
          class="checkbox-div fl"
          @click="changeHasCheck"
          :class="{ activeHasGood: checkHasGood }"
        >
          <!-- <i class="iconfont icon-unchecked"></i> -->
          <i
            class="iconfont"
            :class="{
              'icon-unchecked': !checkHasGood,
              'icon-checked': checkHasGood,
            }"
          ></i>
          <span class="filtertext">仅显示有货商品</span>
        </div>

        <div
          class="checkbox-div fr"
          @click="changeSpecialCheck"
          :class="{ activeHasGood: checkHasSpecial }"
        >
          <!-- <i class="iconfont icon-unchecked"></i> -->
          <i
            class="iconfont"
            :class="{
              'icon-unchecked': !checkHasSpecial,
              'icon-checked': checkHasSpecial,
            }"
          ></i>
          <span class="filtertext">仅显示特惠商品</span>
        </div>
      </div>
    </div>

    <!-- 产品列表 -->
    <div class="sub-sort-lists clearfix">
        <SortItemGood class="subgooditemcpn fl" v-for="gooditem of subcateNormalLists" :key="gooditem.id" :gooddata="gooditem"/>
    </div>


  </div>
</template>

<script>
// 当前的类型产品列表组件，包括顶部按钮和筛选，下方产品列表（sort）

import { ref, watch,reactive } from "vue";
import { useRoute } from "vue-router";
import { getSubCateTemporary } from "@/network/category/sub/getTemporary.js";

import SortItemGood from "./SortItemGood.vue"
export default {
  name: "SubCateSortGoods",
  components:{
      SortItemGood
  },
  setup() {
    let currentRoute = useRoute();
    //1.顶部按钮和筛选
    let checkHasGood = ref(false);
    let checkHasSpecial = ref(false);
    //切换显示有货商品
    function changeHasCheck() {
      checkHasGood.value = !checkHasGood.value;
    }

    //切换显示特惠商品
    function changeSpecialCheck() {
      checkHasSpecial.value = !checkHasSpecial.value;
    }

    //2.获取当前子分类的产品数据
    let subcateNormalLists = reactive([]);
    let page = ref(1);
    watch(
      () => currentRoute.params.subid,
      (newId) => {
        if (currentRoute.path.indexOf("/category/sub") !== -1 && newId) {
         //新的分类，先清空数据
          page.value = 1;
          subcateNormalLists.splice(0, subcateNormalLists.length);
          getSubCateTemporary(newId, page.value, 20).then((res) => {
            console.log("getSubCateTemporary", res.result.items);
        
            subcateNormalLists.push(...res.result.items);
          });
        }
      },
      {
        immediate: true,
      }
    );

    return {
      checkHasGood,
      checkHasSpecial,
      changeSpecialCheck,
      changeHasCheck,
      subcateNormalLists,
    };
  },
};
</script>

<style lang="less" scoped>
.activeHasGood {
  color: rgb(75, 147, 255);
}
.subsort-wrapper {
  background-color: #fff;
  margin-top: 20px;
}
.sublist-top {
  padding: 20px 16px;
}

// 按钮控制
div.subsort-control {
  span {
    border: 1px solid #eee;
    margin-right: 10px;
    padding: 6px 12px;
    cursor: pointer;
  }
}

div.right-filter-area {
  div.checkbox-div {
    margin-right: 20px;
  }
}


// 产品列表
.sub-sort-lists{
      padding: 20px 16px;
}   
</style>