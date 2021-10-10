<template>
  <div class="category-wrapper">
    <!-- 面包屑 -->
    <div class="catenav-bread clearfix">
      <router-link to="/" class="bread-item">首页</router-link>
      <i class="iconfont icon-angle-right"></i>
      <p class="bread-item run-catename" :class="{ changeCate: isChangeCate }">
        {{ showOld ? oldName : className }}
      </p>
    </div>
    <!-- 轮播图 -->
    <CommonImgRun :bannerdatalists="advBannerData" />

    <div class="allsub-type">
      <!-- 子分类 -->
      <h2 class="sub-class-before">全部分类</h2>

      <!-- 当前大分类的小分类列表 -->
      <div class="sub-cgchild-lists clearfix">
        <SubChildItem
          v-for="item of childCglists"
          :childcgitem="item"
          :key="item.id"
          class="child-itemleader"
        />
      </div>
    </div>

    <!-- 小分类的产品 -->
    <div class="sub-cgchild-goodslists">
      <CglistGoods
        v-for="gooddatas of curCateData"
        :key="gooddatas.id"
        :gooddatas="gooddatas"
      />
    </div>
  </div>
</template>

<script>
import breadRunHook from "@/hooks/breadAnimate.js";
import CommonImgRun from "@/components/common/BannerImgRun.vue";
import SubChildItem from "./SubchildItem.vue";
import CglistGoods from "./CglistGoods.vue";

import { inject, computed, watch, reactive } from "vue";
import { useRoute } from "vue-router";

import { getCategoryById } from "@/network/category/getTopCateById.js"; //根据某个categoryid获取
export default {
  name: "categoryall",
  components: {
    CommonImgRun,
    SubChildItem,
    CglistGoods, //子分类产品组件
  },
  setup() {
    let breakHook = breadRunHook(); //面包屑动画
    let advBannerData = inject("adverBannerImg"); //广告轮播图数据

    //某个大分类的子分类
    let cgallLists = inject("topCateAll"); //layout获取过
    let currentRoute = useRoute();
    let childCglists = computed(() => {
      let cateId = currentRoute.params.classId;
      let childArr = [];
      cgallLists.value.forEach((element) => {
        if (element.id === cateId) {
          childArr = element.children;
        }
      });
      return childArr;
    });

    //category/classid
    //获取当前路由的数据
    let curCateData = reactive([]);
    getCategoryById(currentRoute.params.classId).then((res) => {
      console.log("getCateById", res.result.children);
      curCateData.splice(0, curCateData.length);
      curCateData.push(...res.result.children);
    });
    watch(
      () => currentRoute.params.classId,
      (newId) => {
     
        if (currentRoute.path.indexOf("category")>=0&&newId) {
          getCategoryById(newId).then((res) => {
            curCateData.splice(0, curCateData.length);
            curCateData.push(...res.result.children);
          });
        }
      }
    );
    return {
      ...breakHook,
      advBannerData,
      cgallLists,
      childCglists,
      curCateData,
    };
  },
};
</script>

<style lang="less">
div.catenav-bread {
  padding: 20px 10px;

  a.bread-item ,p.bread-item{
    float: left;
  }

  a.bread-item:hover{
    color:#0f0;
  }

  i.icon-angle-right {
    float: left;
    font-size:0.6em;
    margin-top:2px;
  }
  p.run-catename {
    position: relative;
    left: 0px;
    opacity: 1;
    transition: all 1s linear;
  }

  p.run-catename.changeCate {
    left: 40px;
    opacity: 0;
  }
}

h2.sub-class-before {
  text-align: center;
  color: #333;
}

div.sub-cgchild-lists {
  width: 1000px;
  margin: 10px auto;
  .child-itemleader {
    float: left;
  }
}

div.allsub-type {
  background-color: #fff;
  padding: 10px 0;
  margin-top: 10px;
}
</style>