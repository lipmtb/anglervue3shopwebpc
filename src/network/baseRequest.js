import axios from "axios";
import store from "../store";
import router from "../router"
let baseAxiosIns=axios.create({
    baseURL:"https://apipc-xiaotuxian-front.itheima.net",
    timeout:"5000"
})

baseAxiosIns.interceptors.request.use((config)=>{
    
    let token=store.state.user.userProfile.token;
    //请求头带上token
    if(token){
        config.headers.Authorization="Bearer "+token;
    }
    return config;
},(e)=>{
    return Promise.reject(e);
})


baseAxiosIns.interceptors.response.use((res)=>{
   
    return res.data;
},(error)=>{
    if(error.response&&error.response.status===401){
        store.commit("removeUserInfo");//退出登录,vuex,localstore清除登录信息
        //重新登录
        router.push("/login?redirectUrl="+encodeURIComponent(router.currentRoute.value.path))
    }
    return Promise.reject(error);
})


export default baseAxiosIns;