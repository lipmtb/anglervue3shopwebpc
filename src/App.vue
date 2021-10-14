<template>
  <div id="jjcc-app">
    <router-view></router-view>
    <CanvasLoading v-if="showLoading" />
  </div>
</template>

<script>
import CanvasLoading from "@/components/common/LoadingCanvas.vue";
import { ref,provide} from "vue";
export default {
  name: "App",
  components: {
    CanvasLoading,
  },
  setup() {
   

    let showLoading = ref(false);
  
    provide("hideLoadinghandle",hideLoadinghandle);
    provide("showLoadingHandle",showLoadingHandle);

    function hideLoadinghandle() {
      showLoading.value = false;
    }

    function showLoadingHandle() {
      showLoading.value = true;
    }

    return {
      showLoading
    };
  },
};
</script>


<style lang="less">
</style>
