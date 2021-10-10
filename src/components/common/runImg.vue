<template>
  <div class="main-runimg-wrapper" @mouseenter="stopRuning" @mouseleave="startRuning">
    <ul class="img-lists">
      <li
        class="imgitem"
        v-for="(item, idx) in bannerdatalists"
        :key="item.id"
        :style="getLiStyle(idx)"
      >
        <router-link :to="{ path: item.hrefUrl }">
          <img :src="item.imgUrl" alt="imgRun" />
        </router-link>
      </li>
    </ul>

    <ul class="circle-lists">
      <li
        class="circle-item"
        v-for="(item, idx) in bannerdatalists"
        :key="item.id"
        @click="circleNext(idx)"
        :style="getCircleStyle(idx)"
      ></li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted,computed } from "vue";
export default {
  name: "runImg",
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
    let prevIdx = ref(curIdx.value);
    let isRun=ref(true);
    let len=computed(()=>{
        return props.bannerdatalists.length;
    })
  
    function getLiStyle(idx) {
      let leftDis = 0;
      let zIdx = "auto";
      if (idx === curIdx.value || idx === prevIdx.value) {
        zIdx = 10;
      }
      if (idx === curIdx.value) {
        leftDis = 0;
      } else if (idx > curIdx.value) {
        leftDis = "100%";
      } else {
        leftDis = "-100%";
      }
      return {
        left: leftDis,
        zIndex: zIdx,
      };
    }
    function getCircleStyle(idx){
        if(idx===curIdx.value){
            return{
                backgroundColor:'#f00'
            }
        }
        return {
            backgroundColor:'#ccc'
        }
    }

    //小圆点点击事件
    function circleNext(idx) {
        console.log(len.value);
      if (idx === curIdx.value) {
        return;
      }
      prevIdx.value = curIdx.value;
      curIdx.value = idx;
    }

    onMounted(() => {
      setTimeout(() => {
          let tmp=null;
          
        requestAnimationFrame(function reqframe(stamp) {
            if(tmp===null){
                tmp=stamp;
            }

            if(stamp-tmp>3000){
                let newIdx=curIdx.value+1;
                if(newIdx>=len.value){
                   newIdx=0;
                }
                circleNext(newIdx);
                tmp=stamp;
            }
            if(isRun.value){

                requestAnimationFrame(reqframe);
            }
        });
      },1000);
    });


    function stopRuning(){
            isRun.value=false;
    }

    function startRuning(){
        isRun.value=true;
         let tmp=null;
          
        requestAnimationFrame(function reqframe(stamp) {
            if(tmp===null){
                tmp=stamp;
            }

            if(stamp-tmp>3000){
                let newIdx=curIdx.value+1;
                if(newIdx>=len.value){
                   newIdx=0;
                }
                circleNext(newIdx);
                tmp=stamp;
            }
            if(isRun.value){

                requestAnimationFrame(reqframe);
            }
        });
    }
    return {
      getLiStyle,
      circleNext,
      getCircleStyle,
      stopRuning,
      startRuning
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
  ul.img-lists {
    height: 500px;

    > li.imgitem {
      position: absolute;
      width: 100%;
      left: 0;
      top: 0;
      transition: left 2s;
      &:not(:first-child) {
        left: 100%;
      }
      a {
        display: block;
      }
      img {
        width: 100%;
        height: 500px;
      }
    }
  }

  ul.circle-lists {
    position: absolute;
    z-index: 100;
    left: 0;
    right: 0;
    bottom: 20px;
    background-color: transparent;
    padding: 4px 10px;
    text-align: center;
    li.circle-item {
      display: inline-block;
      margin: 0 20px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #ccc;
      transition: background-color 2s;
    }
  }
}
</style>