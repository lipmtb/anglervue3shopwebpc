<template>
  <div class="sub-category-">
    <!-- 顶部面包线 -->
    <div class="router-top">
      <router-link to="/">首页</router-link>
      <i class="iconfont icon-angle-right"></i>
      <router-link :to="{ name: 'category', params: { classId: mainId } }">{{
        cateMainName
      }}</router-link>
      <i class="iconfont icon-angle-right"></i>
      <span class="subname" :class="{oldRunSub:showOldSub}">{{ showOldSub?oldSubName:subName }}</span>
    </div>

    <!-- 类型选择 -->
    <SubcateType :subcatedata="subcatedata" :saleProperties="saleProperties" />

    <!-- 自然列表 -->
    <SubCateSortGoods />
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { computed, inject, ref, watch } from "vue";
import { getSubCategory } from "@/network/category/sub/subcategory.js";
import SubcateType from "./SubcateType";
import SubCateSortGoods from "./SubCateSortGoods.vue";
export default {
  name: "subcategory",
  components: {
    SubcateType,
    SubCateSortGoods,
  },
  setup() {
    let currentRoute = useRoute();
    let subId = computed(() => {
      return currentRoute.params.subid;
    });

    let subName = ref("");
    let oldSubName = ref("");

    //根据subId获取子分类名称和分类名称
    let cgallLists = inject("topCateAll"); //layout获取过
    let mainId = ref("2535");
    let cateMainName = computed(() => {
      for (let cgallItem of cgallLists.value) {
        let subRes = false;
        cgallItem.children.forEach((element) => {
          if (element.id === subId.value) {
            subRes = true;

            subName.value = element.name;
          }
        });
        if (subRes) {
          mainId.value = cgallItem.id;

          return cgallItem.name;
        }
      }

      return "";
    });


    let showOldSub=ref(false);
    
   //subName变化监测
   watch(subName,(__,oldName)=>{
     oldSubName.value=oldName;
      showOldSub.value=true;
     
      setTimeout(()=>{
            showOldSub.value=false;
      },1000)
   })


    //获取子分类的数据
    let subcatedata = ref({ saleProperties: [] });
    let saleProperties = computed(() => {
      return subcatedata.value.saleProperties;
    });
    watch(
      () => currentRoute.params.subid,
      (newId) => {
        if (newId) {
          getSubCategory(newId).then((res) => {
       
            subcatedata.value = res.result;
          });
        }
      },
      {
        immediate: true,
      }
    );

    return {
      cateMainName, //主分类名
      subName, //子分类名
      oldSubName,
      showOldSub,
      mainId, //主分类classId
      subcatedata, //子分类具体数据
      saleProperties, //多种属性选择
    };
  },
};
</script>

<style lang="less" scoped>
.router-top {
  padding: 20px 10px;
  > span.subname{
    position:relative;
    left:0;
    opacity:1;
    transition:all 1s;
  
  }
  > span.subname.oldRunSub{
        left:80px;
        opacity:0;
  }
}
</style>