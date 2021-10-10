<template>
  <nav class="app-topnav">
    <div class="container clearfix">
      <ul class="top-ullists fr">
        <template v-if="$store.state.user.userProfile.id">
          <li>
            <a href="javascript:;"
              ><i class="iconfont icon-user"></i>{{ profile.nickName }}</a
            >
          </li>
          <li>
            <a href="javascript:;" @click="logoutHandle">退出登录</a>
          </li>
        </template>
        <template v-else>
          <li>
            <a href="javascript:;" @click="toLogin">请先登录</a>
          </li>
          <li>
            <a href="javascript:;">免费注册</a>
          </li>
        </template>

        <li><a href="javascript:;">我的订单</a></li>
        <li><a href="javascript:;">会员中心</a></li>
        <li class="other-li">
          <a href="javascript:;">其他服务</a>
          <div class="otherlist">
            <a href="javascript:;" class="other-subli">帮助中心</a>
            <a href="javascript:;"  class="other-subli">关于我们</a>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>


<script>
import { useStore } from "vuex";
export default {
  name: "NavTopLists",
  setup() {
    let store = useStore();
    let profile = store.state.user.userProfile;

    function toLogin() {
      console.log("正在登录");
      store.commit("createUserInfo", {
        id: "dfff22f",
        nickName: "jjcc",
      });
    }
    function logoutHandle() {
      console.log("退出登录");
      store.commit("removeUserInfo");
    }
    return {
      toLogin,
      logoutHandle,
      profile,
    };
  },
};
</script>


<style lang="less" scoped>
.app-topnav {
  background-color: #333333;
  ul.top-ullists {
    padding: 10px 0;
    margin-right: 80px;
    > li {
      float: left;
      padding: 0px 20px;
      &:not(li:first-child) {
        border-left: 1px solid rgba(235, 233, 233, 0.658);
      }

      > a {
        color: #fff;
        &:hover {
          color: @moneyColor;
        }
      }
    }

    li.other-li {
      position: relative;
      &:hover > .otherlist {
        max-height: 200px;
      }
      & >  .otherlist {
        position: absolute;
        left: 6px;
        top: 26px;
        border: 1px solid;
        background-color: #222;
        overflow: hidden;
        max-height: 0;

        transition: max-height 500ms linear;
        z-index: 999;
        padding: 0px 10px;
        width:88px;
        & > a.other-subli {
          border: none;
          padding: 0;
          padding: 4px 0;
          
          text-align: center;
       
           color: #fff;
            cursor: pointer;
          
           &:hover {
            color: @moneyColor;
          }
        }
      }
    }
  }
}
</style>