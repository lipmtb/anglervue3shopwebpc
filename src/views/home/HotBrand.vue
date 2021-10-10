<template>
  <div class="hot-brand-wrapper container">
    <div class="top-leader clearfix">
      <h3 class="brand-leadertext">热门品牌</h3>
      <p class="brand-say">国际品质，经典保证</p>
      <div class="control-choose">
        <span class="iconfont icon-angle-left"  :class="{'active-arrow':isToLeft}" @click="toLeft"></span>
        <span class="iconfont icon-angle-right" :class="{'active-arrow':isToRight}" @click="toRight"></span>
      </div>
    </div>

    <ul class="brand-lists clearfix" :style="brandposstyle">
      <li class="brand-item" v-for="item of hotBrandLists" :key="item.id">
        <router-link to="/">
          <img :src="item.picture" :alt="item.name" />
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
// 首页热门品牌10张图
import { computed, ref } from "vue";
export default {
  name: "HotBrand",
  props: ["hotBrandLists"],
  setup(props) {
    let baseWd = 1240;
    let curLeft = ref(0);
    let len=computed(()=>{
        return props.hotBrandLists.length;
    })
    let brandposstyle = computed(() => {
      return {
        transform: `translateX(${curLeft.value}px)`,
      };
    });

    //控制左箭头能不能点
    let isToLeft=computed(()=>{
        if(curLeft.value<0){
            return true;
        }
        return false;
    })
    //控制右箭头能不能点
    let isToRight=computed(()=>{
        if(curLeft.value>-1*Math.floor(len.value/6)*baseWd){
            return true;
        }
        return false;
    })

    // 右箭头
    function toRight() {
        if(isToRight.value){

            curLeft.value -= baseWd;
        }
    }
    //左箭头
    function toLeft() {
        if(isToLeft.value){

            curLeft.value += baseWd;
        }
    }
    return {
      brandposstyle,
      toRight,
      toLeft,
      isToLeft,
      isToRight
    };
  },
};
</script>

<style lang="less" scoped>
div.top-leader {
  padding: 30px 0;
  > h3,
  > p {
    float: left;
  }
  > div.control-choose {
    float: right;
    span[class*="icon"] {
      display: inline-block;
      width: 20px;
      height: 20px;
      background-color: rgb(160, 158, 158);
      text-align: center;
      margin: 0 4px;
      cursor: not-allowed;
    }
    span.active-arrow {
      cursor: pointer;
      background-color: #008c8c;
    }
  }
  h3.brand-leadertext {
    font-size: 2em;
    color: 444;
    font-weight: 400;
  }
  > p.brand-say {
    margin-top: 21px;
    margin-left: 10px;
    color: #666;
  }
}

ul.brand-lists {
  width: 200%;
  transition: transform 2s;
  li.brand-item {
    float: left;
    margin: 0 4px;
    > a {
      > img {
        width: 204px;
        height: 305px;
      }
    }
  }
}
</style>