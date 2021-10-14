<template>
  <div class="good-desc-right fr">
    <!-- 顶部名称和描述价格 -->
    <div class="good-name-top">
      <h4>{{ gooddata.name }}</h4>
      <p class="good-desc">{{ gooddata.desc }}</p>
      <div class="good-price">
        <span class="new-pricetext">￥{{ price }}</span>
        <span class="old-pricetext">￥{{ oldPrice }}</span>
      </div>
    </div>

    <!-- 促销配送服务 -->
    <div class="sale-desc">
      <div class="cuxiao clearfix">
        <span class="before-text fl">促销</span>
        <span class="top-activity fl">12月好物放送，App领券购买直降120元</span>
      </div>
      <div class="sale-addr-sel clearfix">
        <span class="before-text fl">配送</span>
        <div class="select-discribe-addr fl">
          <span class="before-addrtext fl">至</span>
          <AddrBox :areaJsonArr="areaJson" v-if="areaJson"/>
        </div>
      </div>


      <!-- 其他服务 -->
      <div class="bottom-service clearfix">
        <span class="before-text fl">服务</span>

        <div class="other-lists fl">
          <span>无忧退款</span>
          <span>快速退款</span>
          <span>免费包邮</span>
          <a href="javascript:;">了解详情</a>
        </div>
      </div>
    </div>

    <!-- 规格 -->
    <div
      class="bottom-good-count clearfix"
      v-for="spec of gooddata.specs"
      :key="spec.name"
    >
      <span class="spectypename fl">{{ spec.name }}</span>
      <ul class="specs-img-lists fl">
        <li
          class="specs-item fl"
          :class="{activeSpecClass:specitem.name===activeName}"
          v-for="specitem in spec.values"
          :key="specitem.name"
       
          @click="onClickSkus(specitem.name)"
        >
          <img :src="specitem.picture" :alt="specitem.name" :title="specitem.name" />
        </li>
      </ul>
    </div>

   <!-- 数量 -->
    <div class="good-count-box clearfix">
        <span class="count-before fl">数量</span>
        <div class="good-btn-control fl">
           <span class="minus-btn" @click="decreaseCount">-</span>
           <input type="text" disabled v-model="goodCount"/>
           <span class="plus-btn" @click="increaseCount">+</span>
        </div>
    </div>

    <!-- 加入购物车 -->
    <div class="cart-btn">
      <p>{{activeName}}{{skuId}}</p>
      <a href="javascript:;" @click="addCart">加入购物车</a>
    </div>
  </div>
</template>

<script>

import {useStore} from "vuex";
import {getAreaJsonHandle} from "@/network/product/getAreaJson.js";
import {ref,onMounted,toRef,computed,watch} from "vue";

import AddrBox from "./AddrBox.vue";
export default {
  name: "goodPriceAddr",
  props: ["gooddata"],
  components:{
    AddrBox
  },
  setup(props) {
    //获取城市信息json
      let areaJson=ref(null);
  
    //https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json
    onMounted(()=>{
  
      getAreaJsonHandle().then((res)=>{
          // console.log("城市数据",res.data);
          /*
          */
          areaJson.value=res.data;
      });   
    })

    
      //商品规格
       let gooddata=toRef(props,"gooddata");//商品基本数据
       //规格valueName/name
       let activeNameInit=computed(()=>{
         if(props.gooddata.skus){

           return props.gooddata.skus[0].specs[0].valueName;
         }
         return "";
       }) 

       let activeName=ref("");
       watch(activeNameInit,(newVal)=>{
        //  console.log("watching activeName****************")
         activeName.value=newVal;
       })
       //规格id
       let skuIdInit=computed(()=>{
         if(props.gooddata.skus){

           return props.gooddata.skus[0].id;
         }
         return "";
       })

       let skuId=ref("");
       watch(skuIdInit,(newVal)=>{
         skuId.value=newVal;
       })
      let price=computed({
        get(){
            return gooddata.value.price;
        },
        set(newPrice){
            gooddata.value.price=newPrice;
        }
      })
      let oldPrice=computed({
        get(){
            return gooddata.value.oldPrice;
        },
        set(newPrice){
            gooddata.value.oldPrice=newPrice;
        }
      })
    //类型切换商品规格
    function onClickSkus(name){
          console.log(gooddata.value);
          
        if(gooddata.value.skus){
           let goodSkus=gooddata.value.skus.find((item)=>item.specs[0].valueName===name);
          //  console.log(goodSkus.price);
          price.value=goodSkus.price;
          oldPrice.value=goodSkus.oldPrice;
          activeName.value=goodSkus.specs[0].valueName;
          skuId.value=goodSkus.id;
        }
    }

    //商品数量
    let goodCount=ref(1);

    function decreaseCount(){
      goodCount.value--;
      (goodCount.value<1)&&(goodCount.value=1);

    }
    function increaseCount(){goodCount.value++;}

    //加入购物车
    let store=useStore();
   
    function addCart(){
      let attrsText="规格: "+activeName.value;
      let count=goodCount.value;
      let id=gooddata.value.id;
      let isEffective=true;
      let name=gooddata.value.name;
      let pricestr=price.value;
      let nowPrice= parseFloat(price.value);
      let selected=true;
      let skuIdstr=skuId.value;
      let stock=gooddata.value.salesCount;
      let picture=gooddata.value.mainPictures[0];
   
      store.commit("addCart",{
        id,
        attrsText,
        count,
        isEffective,
        name,
        price:pricestr,
        nowPrice,
        selected,
        skuId:skuIdstr,
        stock,
        picture
      })
    }
     return {
         areaJson,
         onClickSkus,
         price,
         oldPrice,
         activeName, //选择的规格valueName/name
         skuId,//规格id
         goodCount,//数量
         decreaseCount,
         increaseCount,
         addCart  //添加购物车
     }

  }
};
</script>

<style lang="less" scoped>
.good-desc-right {
  width: 600px;
  margin-right: 80px;
  > .good-name-top {
    > h4 {
      font-size: 1.4em;
      padding: 10px 0;
      font-weight: 400;
      color: #333;
    }
    > p.good-desc {
      color: #ddd;
    }
    > div.good-price {
      padding: 10px 0;
      span {
        font-size: 1.2em;
      }
      span.new-pricetext {
        color: #f00;
      }
      span.old-pricetext {
        text-decoration: line-through;
        color: #ddd;
      }
    }
  }
// 促销配送服务
  > .sale-desc {
    background-color: #eee;
    padding: 10px;
    span.before-text{
        color:#666;
        margin-right:40px;
    }
    
    > div.cuxiao{
        margin:10px 0;
    }
    >div.sale-addr-sel{
      margin:10px 0;
      >div.select-discribe-addr{
          span.before-addrtext{
              margin-right:4px;
              margin-top:2px;
          }
         
      }
    }
// 其他服务
    >div.bottom-service{
         margin:10px 0;
         >div.other-lists{
           span{
             margin:0 10px;
             
             &:before{
               content:"";
               display: inline-block;
               position:relative;
               right:2px;
               bottom:2px;
              width:4px;
              height:4px;
              background-color: rgb(248, 54, 54);
             }
           }

           a{
             color:rgb(48, 138, 48);
             
           }
         }
    }

    
  }

  //规格
  .bottom-good-count{
    margin:20px 0;
    span.spectypename{
      line-height:50px;
      color:#888;
    }
      ul.specs-img-lists{
        margin-left:6px;
        > li.specs-item{
          width:50px;
          height:50px;
          border:1px solid #eee;
          margin:0 10px;
          &.activeSpecClass{
            border-color:#0f0;
          }
        }
      }
  }
  //数量
  .good-count-box{
        span.count-before{
          color:#ccc;
          line-height:30px;
        }
        div.good-btn-control{
          margin-left:16px;
          >span{
            display:inline-block;
            padding:12px;
            background-color: #f5f5f5;
            line-height:6px;
            cursor:pointer;
          }
          > input{
            width:70px;
            height:30px;
            background-color: #fff;
            text-align: center;
          }
        }
  }
  //添加购物车
  > div.cart-btn{
      margin:16px 0;
      >a{
        display: inline-block;
        background-color: rgb(6, 146, 146);
        padding:12px 34px;
        border-radius: 4px;
        color:#fff;
        font-size:1.4em;
        
      }
    }
}
</style>
