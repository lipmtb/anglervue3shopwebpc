import { homeHeaderCategory } from "@/network/category/headerCategory.js";
// 分类模块
export default {
    state(){
        return {
            cgLists:[]
        }
    },
    getters:{
        headerCateLists:(state)=>{
            return state.cgLists;
        }
    },
    mutations:{
        fillCateList(state,newlists){
            state.cgLists.push(...newlists);
        }
    },
    actions:{
        getCateAllLists(ctx){
            //获取顶部分类，hover有children子分类
            homeHeaderCategory().then((res) => {
  
                if (res.msg === "操作成功") {
                    ctx.commit("fillCateList",res.result);
                }
                  
              });
        }
    }
}