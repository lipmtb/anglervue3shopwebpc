<template>
     <div class="cateall-wrapper-absolute">
        <ul class="left-nav-hover">
          <li class="hover-item" v-for="item of cgallLists" :key="item.id">
            <router-link
              :to="{ name: 'category', params: { classId: item.id } }"
              class="main-cate"
              >{{ item.name }}</router-link
            >
            <router-link
              :to="{ name: 'subcategory', params: { subid: subitem.id } }"
              v-for="(subitem, idx) in item.children"
              :key="subitem.id"
              :style="{ display: idx >= 2 ? 'none' : '' }"
            >
              {{ subitem.name }}
            </router-link>

            <div class="active-right-lists">
              <h4 class="leader-recomm-top">推荐商品</h4>
              <ul class="remcommentlists">
                <li
                  class="recommitem"
                  v-for="recommitem of item.goods"
                  :key="recommitem.id"
                >
                  <RouterLink
                    :to="{
                      name: 'product',
                      params: { productId: recommitem.id },
                    }"
                    class="recomm-good-item clearfix"
                  >
                    <img :src="recommitem.picture" :alt="recommitem.name" />
                    <div class="right-main">
                      <p class="main-name">{{ recommitem.name }}</p>
                      <p class="main-desc">{{ recommitem.desc }}</p>
                      <p class="main-price">￥{{ recommitem.price }}</p>
                    </div>
                  </RouterLink>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
</template>

<script>
export default {
    name:"LeftNavLayer",
    props:["cgallLists"]
}
</script>

<style lang="less" scoped>

.cateall-wrapper-absolute {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 19;

  ul.left-nav-hover {
    width: 240px;
    background-color: rgba(51, 51, 51, 0.664);

    overflow: hidden;
    padding-bottom: 5px;
    a {
      color: #fff;
    }

    > li.hover-item {
      white-space: nowrap;
      padding: 14px 4px;
    

      .main-cate {
        font-size: 1.4em;
        margin-left: 16px;
      }
      a {
        margin-right: 10px;
      }
      div.active-right-lists {
        position: absolute;
        left: 240px;
        top: 0;
        width: 1000px;
        display:none;
        > h4.leader-recomm-top {
          padding: 20px 0 20px 100px;
          color: #999;
          font-size: 1.6em;
        }
        > ul.remcommentlists {
          display: flex;
          flex-wrap: wrap;
          height: 392px;
          justify-content: space-around;
          align-content: space-between;
          padding: 0 6px;
          li.recommitem {
            padding: 10px;
            background-color: #fff;
            &:hover{
              background-color:rgb(178, 250, 234);
            }
            > a.recomm-good-item {
              display: block;
              .right-main {
                width: 190px;
                height: 100px;
                float: right;
                padding: 10px 4px;
                p.main-name {
                  white-space: pre-wrap;
                  color: #666;
                }
                p.main-desc {
                  color: #aaa;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                }
                p.main-price {
                  color: #f00;
                  &:not(::first-letter){
                    font-size:1.6em;
                  }
                }
              }
            }
            img {
              width: 100px;
              height: 100px;
              float: left;
            }
          }
        }
      }
    }

    > li.hover-item:hover {
      background-color: cadetblue;
      > div.active-right-lists {
        display: block;
      }
    }
  }
}
</style>