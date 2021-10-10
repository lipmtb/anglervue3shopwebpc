<template>
  <div class="goodsingle fl">
    <router-link :to="{ name: 'product', params: { productId: gooditem.id } }">
      <img :src="gooditem.picture" :alt="gooditem.name" />
      <p class="gooditemname">{{ gooditem.name }}</p>
      <p class="gooditemdesc">{{ gooditem.desc }}</p>
      <em class="goodprice">￥{{ gooditem.price }}</em>
    </router-link>
    <div class="hide-moregoods">
      <RouterLink to="/">
        <p class="h-text">找相似</p>
        <div class="line"></div>
        <p class="more-find">发现更多 &gt;</p>
      </RouterLink>
    </div>
  </div>
</template>

<script>
export default {
  name: "gooditemHover",
  props: ["gooditem"],
};
</script>

<style lang="less" scoped>
div.goodsingle {
  position: relative;
  overflow: hidden;
  width: 240px;
  height: 300px;
  border: 1px solid #0f0;
  margin-left: 6px;
  margin-top: 6px;

  padding-top: 10px;
  transition: border-color 800ms;
  border: 1px solid transparent;
  .hide-moregoods {
    position: absolute;
    left: 0;
    right:0;
    bottom: -63px;
    transition:bottom 1s;
    background-color: rgba(64, 224, 208, 0.938);

    > a {
        display:block;
        width:60%;
        margin:0 auto;
        text-align: center;
            color: #fff;
      > p.h-text {
        font-size: 1.2em;
        padding:6px 0;
      }
      > div.line{
          border-top:1px solid #fff;
      }
      > p.more-find{
            padding:4px 0;
      }
    }
  }
  &:hover {
    border-color: #0f0;
    > .hide-moregoods{
        bottom:0;
    }
  }

  > a {
    display: block;
    padding: 0 16px;
    > img {
      display: block;
      width: 160px;
      height: 160px;
      margin: 0 auto;
    }
    > p.gooditemname {
      font-size: 1.2em;
      color: #333;
      padding: 6px 0;
    }
    > p.gooditemdesc {
      width: 160px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    > em.goodprice {
      display: block;
      margin-top: 6px;
      color: #f00;
    }
  }
}
</style>