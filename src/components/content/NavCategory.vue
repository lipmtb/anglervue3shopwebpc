<template>
  <div class="nav-category-wrapper clearfix">
    <slot></slot>
    <ul
      class="navs"
      ref="ulnavs"
      @mouseleave="mouseleaveNav"
      @click="mouseleaveNav"
    >
      <li
        class="navs-directli"
        :class="{
          activeCategory: $route.path === '/',
        }"
      >
        <router-link to="/">首页</router-link>
      </li>
      <li
        class="navs-directli"
        :class="{
          activeCategory: $route.path === '/category/' + classifyItem.id,
        }"
        v-for="classifyItem of topCateAll"
        :key="classifyItem.id"
      >
        <RouterLink
          :to="{ name: 'category', params: { classId: classifyItem.id } }"
          @mouseenter="enterCateTop(classifyItem.id)"
        >
          {{ classifyItem.name }}
        </RouterLink>
      </li>

      <!-- 隐藏分类 -->
      <ul
        class="hide-category"
        v-for="(cateTopItem, idx) of topCateAll"
        :key="cateTopItem.id"
        :style="cateStyleArr[idx]"
      >
        <li
          class="hide-item"
          v-for="subitem of cateTopItem.children"
          :key="subitem.id"
        >
          <router-link :to="{name:'subcategory',params:{subid:subitem.id}}">
            <img :src="subitem.picture" alt="垂钓，商城" />
            <p class="hide-bottomtext">{{ subitem.name }}</p>
          </router-link>
        </li>
      </ul>
    </ul>
  </div>
</template>

<script>
// 顶部分类选择组件
import { reactive, watchEffect, watch, ref } from "vue";
import { useRoute } from "vue-router";
export default {
  name: "NavCategory",
  props: ["topCateAll"],
  setup(props) {
    // 隐藏分类样式数组，控制slideDown,slideUp
    let cateStyleArr = reactive([]);

    watchEffect(() => {
      let len = cateStyleArr.length;
      cateStyleArr.splice(0, len);
      for (let i = 0; i < props.topCateAll.length; i++) {
        cateStyleArr.push({
          display: "none",
          borderTop: "2px solid",
          maxHeight: 0,
          id: props.topCateAll[i].id,
        });
      }
      // console.log("watchEffect",cateStyleArr);
    });

    function enterCateTop(id) {
      cateStyleArr.forEach((item) => {
        if (item.id === id) {
          item.display = "block";
          item.maxHeight = 0;
          setTimeout(() => {
            item.maxHeight = "200px";
          }, 30);
        } else {
          item.display = "none";
          item.maxHeight = 0;
        }
      });
    }

    function mouseleaveNav() {
      cateStyleArr.forEach((item) => {
        item.display = "none";
        item.maxHeight = 0;
      });
    }

    let ulnavs = ref(null);

    let route = useRoute();
    watch(
      () => route.params,
      () => {
        //  console.log("watching routeParams",route.params);
        let handle = function (e) {
          // console.log("watching handle",route.path);
          if (e.target.href && route.path.indexOf("category") > -1) {
            let matchId = e.target.href.match(/\/category\/(\w+)/)[1];

            enterCateTop(matchId);
          }
          ulnavs.value.removeEventListener("mousemove", handle);
        };
        ulnavs.value.addEventListener("mousemove", handle);
      }
    );

    return {
      enterCateTop,
      mouseleaveNav,

      cateStyleArr,
      ulnavs,
    };
  },
};
</script>

<style lang="less" scoped>
// 分类
ul.navs {
  float: left;
  margin-top: 35px;
  li.navs-directli {
    float: left;
    margin: 0 20px;
    padding-bottom: 40px;
    a {
      font-size: 16px;
      color: #333;
    }
    &:hover {
      > a {
        color: #0f0;
      }
    }
    &::after {
      content: "";
      display: block;
      width: 0px;
      transition: width 500ms;
      height: 3px;
      background-color: @warningColor;
      margin: 0 auto;
      border-radius: 4px;
    }
    &:hover::after {
      width: 100%;
    }

    &.activeCategory {
      &::after {
        background-color: #f00;
        width: 100%;
      }
    }
  }

  // 隐藏的子分类
  ul.hide-category {
    position: absolute;
    padding-left: 60px;
    z-index: 2;
    width: 100%;
    top: 100px;
    left: 0px;
    overflow: hidden;
    max-height: 0;
    transition: max-height 500ms;
    background-color: rgb(255, 255, 255);
    li.hide-item {
      text-align: center;
      float: left;
      margin: 0 20px;
      img {
        width: 80px;
        height: 120px;
      }
      p.hide-bottomtext {
        cursor: pointer;
        &:hover {
          color: @warningColor;
        }
      }
    }
  }
}
</style>