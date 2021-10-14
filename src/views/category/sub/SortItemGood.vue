<template>
  <div class="sortItemGood">
    <router-link class="anchor-link" :to="{ name: 'product', params:{productId: gooddata.id }}">
      <img :src="gooddata.picture" :alt="gooddata.name" />
      <p class="goodname">{{ gooddata.name }}</p>
      <p class="gooddesc">{{ gooddata.desc }}</p>
      <p class="goodprice">￥{{ gooddata.price }}</p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "sortItemGood",
  props: ["gooddata"],
};
</script>


<style lang="less" scoped>
div.sortItemGood {
  padding:30px 0;
  margin:4px;
   .hoverstrategy;
  > a.anchor-link{
    display: block;
    width:220px;
    padding:6px 30px;
    text-align: center;
   
    > img {
     width: 160px;
     height: 160px;
    }
    >p {
      margin:4px 0;
    }
    > p.goodname{
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      font-size:1.1em;
    }

    > p.gooddesc{
      color:#999;
           white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    > p.goodprice{
      color:#f00;
    }
  }
  
}
</style>