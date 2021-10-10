<template>
  <div
    class="main-runimg-wrapper"
    @mouseenter="enterContainer"
    @mouseleave="leaveContainer"
  >
    <ul class="img-lists">
      <li
        class="imgitem"
        v-for="(item, idx) in bannerdatalists"
        :key="item.id"
        :style="getStyleLi(idx)"
      >
        <router-link :to="{ path: item.hrefUrl }">
          <img :src="item.imgUrl" alt="imgRunBanner" />
        </router-link>
      </li>
    </ul>

    <ul class="circle-lists">
      <li
        class="circle-item"
        v-for="(item, idx) in bannerdatalists"
        :key="item.id"
        :class="{ activecircle: idx === curIdx }"
        @click="circleNext(idx)"
      ></li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted,computed } from "vue";
export default {
  name: "BannerImgRun",
  props: {
    bannerdatalists: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  setup(props) {
    let curIdx = ref(0); //当前轮播的图片
    let prevIdx = ref(curIdx.value); //上一张
    let isRun = true;
    let len = computed(() => {
      return props.bannerdatalists.length;
    });
    //小圆点点击事件
    function circleNext(idx) {
      prevIdx.value = curIdx.value;
      curIdx.value = idx;
    }

    function getStyleLi(idx) {
      let transLeft = 0;
      let zIdx = "auto";
      if (idx === prevIdx.value || idx === curIdx.value) {
        zIdx = 10;
      }
      if (idx === curIdx.value) {
        transLeft = 0;
      } else if (idx < curIdx.value) {
        transLeft = "-100%";
      } else {
        transLeft = "100%";
      }

      return {
        transform: `translate3d(${transLeft},0,0)`,
        zIndex: zIdx,
      };
    }

    function enterContainer() {
      isRun = false;
    }

    function leaveContainer() {
      isRun = true;
      let tmp = null;
      requestAnimationFrame(function framefn(stamp) {
        if (tmp === null) {
          tmp = stamp;
        }

        if (stamp - tmp > 3000) {
            // console.log("len**********",len.value);
          let nextIdx = curIdx.value + 1;
          nextIdx = nextIdx > len.value - 1 ? 0 : nextIdx;
          circleNext(nextIdx);
          tmp = stamp;
        }
        if (isRun) {
          requestAnimationFrame(framefn);
        }
      });
    }

    onMounted(() => {
      let tmp = null;
      requestAnimationFrame(function framefn(stamp) {
        if (tmp === null) {
          tmp = stamp;
        }

        if (stamp - tmp > 3000) {
          // console.log("len**********",len.value);
          let nextIdx = curIdx.value + 1;
          nextIdx = nextIdx > len.value - 1 ? 0 : nextIdx;
          circleNext(nextIdx);
          tmp = stamp;
        }
        if (isRun) {
          requestAnimationFrame(framefn);
        }
      });
    });

    return {
      circleNext,
      getStyleLi,
      curIdx,
      leaveContainer,
      enterContainer,
    };
  },
};
</script>

<style lang="less" scoped>
div.main-runimg-wrapper {
  position: relative;
  width: 100%;
  margin: 0 auto;
  height: 500px;
  overflow: hidden;
}

ul.img-lists {
  li.imgitem {
    position: absolute;
    left: 0;
    top: 0;
    transition: all 2s;
  }
}

ul.circle-lists {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 16px;
  background-color: transparent;
  text-align: center;
  z-index: 20;
  li.circle-item {
    display: inline-flex;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #fff;
    margin: 0 20px;
    cursor: pointer;
    &.activecircle {
      background-color: #f00;
    }
  }
}
</style>