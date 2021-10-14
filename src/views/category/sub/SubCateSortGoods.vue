<template>
  <div class="subsort-wrapper">
    <div class="sublist-top clearfix">
      <!-- 左边排序控制按钮 -->
      <div class="subsort-control fl" @click="setSortLists">
        <span
          :data-sort-type="null"
          :class="{ activeSortClass: currentType === null }"
          >默认排序</span
        >
        <span
          data-sort-type="publishTime"
          :class="{ activeSortClass: currentType === 'publishTime' }"
          >最新商品</span
        >
        <span
          data-sort-type="orderNum"
          :class="{ activeSortClass: currentType === 'orderNum' }"
          >最高人气</span
        >
        <span
          data-sort-type="evaluateNum"
          :class="{ activeSortClass: currentType === 'evaluateNum' }"
          >评论最多</span
        >
        <span class="price-box" data-sort-type="price" @click.stop="priceSort">
          价格排序
          <i
            class="arrow-up"
            :class="{ arrowUpActive: arrowType === 'asc' }"
          ></i>
          <i
            class="arrow-down"
            :class="{ arrowDownActive: arrowType === 'desc' }"
          ></i>
        </span>
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
      <SortItemGood
        class="subgooditemcpn fl"
        v-for="gooditem of subcateNormalLists"
        :key="gooditem.id"
        :gooddata="gooditem"
      />
    </div>
  </div>
</template>

<script>
// 当前的类型产品列表组件，包括顶部按钮和筛选，下方产品列表（sort）

import { ref, watch, reactive, nextTick, inject } from "vue";
import { useRoute } from "vue-router";
import { getSubCateTemporary } from "@/network/category/sub/getTemporary.js";

import SortItemGood from "./SortItemGood.vue";

import scrollBottomHooks from "@/hooks/scrollBottomHooks.js";
export default {
  name: "SubCateSortGoods",
  components: {
    SortItemGood,
  },
  setup() {
    let showLoading = inject("showLoadingHandle");
    let hideLoading = inject("hideLoadinghandle");
    let currentRoute = useRoute();
    let currentType = ref(null); //默认排序null，最新商品publishTime ，最高人气orderTime ，评论最多 evaluateNum
    let arrowType = ref(null); //升降序

    let checkHasGood = ref(false); //有货无货
    let checkHasSpecial = ref(false); //有无特惠

    let { hasFinish } = scrollBottomHooks(reachEndHandle); //控制网络请求是否结束,能否进行下一个请求操作

    let hasMoreGoods = ref(true);
    //1.获取当前子分类的产品数据 默认排序
    let subcateNormalLists = reactive([]);
    let page = ref(1);
    watch(
      () => currentRoute.params.subid,
      (newId) => {
        if (currentRoute.path.indexOf("/category/sub") !== -1 && newId) {
          //新的分类，先清空数据
          page.value = 1;
          currentType.value = null;
          arrowType.value = null;
          checkHasGood.value = false;
          checkHasSpecial.value = false;
          subcateNormalLists.splice(0, subcateNormalLists.length);
          hasMoreGoods.value = true;
        }
      },
      {
        immediate: true,
      }
    );

    //2. 按钮选择 默认排序null，最新商品publishTime ，最高人气orderTime ，评论最多 evaluateNum

    function setSortLists(e) {
      let stype = e.target.dataset.sortType || null;
      currentType.value = stype;
      arrowType.value = null;
      //loading加载开始
      //获取此排序的数据
      changeHandle();
    }

    //价格排序
    function priceSort() {
      currentType.value = "price";
      if (arrowType.value === null) {
        arrowType.value = "desc";
      } else if (arrowType.value === "desc") {
        arrowType.value = "asc";
      } else {
        arrowType.value = "desc";
      }

      changeHandle();
    }

    //3.顶部按钮和筛选

    //切换显示有货商品
    function changeHasCheck() {
      checkHasGood.value = !checkHasGood.value;
      page.value = 1;
      changeHandle();
    }

    //切换显示特惠商品
    function changeSpecialCheck() {
      checkHasSpecial.value = !checkHasSpecial.value;
      changeHandle();
    }

    function changeHandle() {
      page.value = 1;
      subcateNormalLists.splice(0, subcateNormalLists.length);
      hasMoreGoods.value = true;
      let isPrice = currentType.value === "price" ? arrowType.value : null;
      //loading start

      showLoading();
      hasFinish.value = false;
      getSubCateTemporary(
        currentRoute.params.subid,
        1,
        20,
        currentType.value,
        isPrice,
        checkHasGood.value,
        checkHasSpecial.value
      )
        .then((res) => {
          // console.log("getSubCateTemporary changeSpecialCheck");

          subcateNormalLists.push(...res.result.items);
        })
        .finally(() => {
          //loading end
        setTimeout(()=>{

            hideLoading();
          },2000)
          nextTick(() => {
            hasFinish.value = true;
          });
        });
    }
    //触底加载更多

    function reachEndHandle() {
      if (hasMoreGoods.value === false) {
        return;
      }
      let isPrice = currentType.value === "price" ? arrowType.value : null;
      //loading start
      showLoading();
      hasFinish.value = false;
      getSubCateTemporary(
        currentRoute.params.subid,
        page.value,
        20,
        currentType.value,
        isPrice,
        checkHasGood.value,
        checkHasSpecial.value
      )
        .then((res) => {
          // console.log("network get reach bottom  more");
          subcateNormalLists.push(...res.result.items);
          if (res.result.items.length < 20) {
            hasMoreGoods.value = false;
          }
        })
        .finally(() => {
          //loading end
          page.value++;
          setTimeout(()=>{

            hideLoading();
          },2000)
          nextTick(() => {
            hasFinish.value = true;
          });
        });
    }
    return {
      checkHasGood,
      checkHasSpecial,
      changeSpecialCheck,
      changeHasCheck,
      //列表排序
      subcateNormalLists,
      currentType, //默认，最新，人气，评论最多，价格（特殊）
      setSortLists, //选择排序方式的method
      priceSort, //价格排序method
      arrowType, //升降序
    };
  },
};
</script>

<style lang="less" scoped>
.activeSortClass {
  background-color: aquamarine;
}
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
  > span.price-box {
    position: relative;
    > i {
      position: absolute;
      width: 0px;
      height: 0px;
    }
    > i.arrow-up {
      border: 5px solid transparent;
      right: 1px;
      top: 3px;
      border-bottom-color: #ddd;
    }

    > i.arrow-down {
      border: 5px solid transparent;
      right: 1px;
      bottom: 3px;
      border-top-color: #ddd;
    }

    > i.arrowUpActive {
      border-bottom-color: #0d0;
    }
    > i.arrowDownActive {
      border-top-color: #0d0;
    }
  }
}

div.right-filter-area {
  div.checkbox-div {
    margin-right: 20px;
  }
}

// 产品列表
.sub-sort-lists {
  padding: 20px 16px;
}
</style>