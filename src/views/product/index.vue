<template>
  <div class="product-detail">
      <div class="link-top" v-if="cateFrom.length>0">
        <router-link to="/">首页</router-link>
           <i class="iconfont icon-angle-right"></i>
        <router-link :to="{name:'category',params:{classId:cateFrom[1].id}}">{{cateFrom[1].name}}</router-link>
           <i class="iconfont icon-angle-right"></i>
        <router-link :to="{name:'subcategory',params:{subid:cateFrom[0].id}}">{{cateFrom[0].name}}</router-link>
           <i class="iconfont icon-angle-right"></i>
        <span >{{gooddata.name}}</span>
      </div>
      
      <div class="good-main-conten">
          <div class="good-info-top clearfix">
            <!-- 左边预览图 -->
            <div class="good-img-left fl">
                <GoodImgBigger v-if="gooddata.mainPictures" :mainpiclists="gooddata.mainPictures"/>
            </div>
            <!-- 右边产品 -->
            <GoodPriceAddr :gooddata="gooddata"/>
          </div>
      </div>
  </div>
</template>

<script>

import {useRoute} from "vue-router";
import {onMounted,ref} from "vue";
import {getProductData} from "@/network/product/getProductDetail.js";


import GoodImgBigger from "./GoodImg/GoodImgBigger.vue";
import GoodPriceAddr from "./GoodInfo/GoodPriceAddr.vue";


export default {
   name:"product",
   components:{
     GoodImgBigger,
     GoodPriceAddr
   },
    setup() {
      let currentRoute=useRoute();
      let gooddata=ref({});
    
      let cateFrom=ref([]);
        onMounted(()=>{
            let goodId=currentRoute.params.productId;
            getProductData(goodId).then((res)=>{
              // console.log("获取产品数据",res.result);
              gooddata.value=res.result;
              cateFrom.value=res.result.categories;
           
            })
        })


        return {
          cateFrom,
          gooddata
        }
    }
} 
</script>

<style lang="less" scoped>
  div.link-top{
    padding:20px;
    > i.iconfont{
       font-size:0.6em;
      margin:0 10px;
    }
    > a{
      &:hover{
        color:#0f0;
      }
    }
  }

  div.good-main-conten{
    > .good-info-top{
      background-color: #fff;
      padding:20px;
    }
  }
</style>