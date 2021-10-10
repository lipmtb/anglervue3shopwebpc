
//用户添加的购物车
export default {
    state(){
        return {
            cartLists:[]
        }
    },
    mutations:{
        addCart(state,payload){
            state.cartLists.push(payload);
        }
    }
}