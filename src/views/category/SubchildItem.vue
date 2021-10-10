<template>
  <div class="sub-child-item">
      <div class="top-box">
          <img :src="childcgitem.picture" alt="垂钓渔网"/>
      </div>
      <div class="bottom-box">
          <p class="child-bottom-text">{{childcgitem.name}}</p>
      </div>
  </div>
</template>

<script>
//一小个子分类上下布局
export default {
    name:"subChildItem",
    props:{
        childcgitem:{
            type:Object,
            default(){
                return {
                }
            }
        }
    }
}
</script>

<style scoped lang="less">
    .sub-child-item{
        width:200px;
        text-align: center;
        cursor: pointer;
        .top-box{
            img{
                width:120px;
                height:160px;
            }
        }
        &:hover{
            color:@coreColor;
        }
    }
</style>