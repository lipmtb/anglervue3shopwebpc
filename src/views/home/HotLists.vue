<template>
   <div class="new-multi-field container">
        <!-- <h3 class="new-leader-text"></h3> -->
        <slot></slot>
        <ul class="home-new-lists">
          <li
            class="home-new-item"
            v-for="homenewitem of newMultiLists"
            :key="homenewitem.id"
          >
            <router-link
              :to="{ name: 'product', params: { productId: homenewitem.id } }"
            >
              <img :src="homenewitem.picture" :alt="homenewitem.name" />
              <p class="homenew-name">{{ homenewitem.title }}</p>
              <p class="homenew-alt">{{homenewitem.alt}}</p>
            </router-link>
          </li>
        </ul>
    </div>
</template>

<script>
export default {
    name:"newHot",
    props:["newMultiLists"]

}
</script>

<style lang="less" scoped>
    
.new-multi-field{
  background-color: #fff;
}
h3.new-leader-text {
  padding: 20px 0 20px 6px;
  font-size: 2.6em;
  color: #666;
  font-weight: normal;
}
ul.home-new-lists {
   
  display: flex;
  justify-content: space-between;
  li.home-new-item {
    text-align: center;
   background-color: #fff;
   .hoverstrategy;
    > a {
      > img {
        width: 306px;
        height: 306px;
      }
      > p {
        font-size: 1.6em;
        width:306px;
        font-weight: 400;
        color: #333;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        &.homenew-name{
          padding:4px 0;
        }
        &.homenew-alt{
          color:#aaa;
          font-size:0.6em;
          padding:6px 0;
        }
      }
    }
  }
}
</style>