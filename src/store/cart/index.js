
//用户添加的购物车
/**
 * attrsText: "规格：2千克*4袋"
count: 3
id: "3425018"
isEffective: true
name: "定制配方，专属营养，全价小型犬犬粮2千克"
nowPrice: "249.00"
picture: "https://yanxuan-item.nosdn.127.net/0602c16e7bfd298a22798cc08be7c1a5.jpg"
price: "249.00"
selected: true
skuId: "300185256"
stock: 9596
 */
export default {
    state(){
        return {
            cartLists:[]
        }
    },
    getters:{
        userCartLists(state){
            return state.cartLists;
        }
    },
    mutations:{
        addCart(state,payload){
            state.cartLists.push(payload);
        }
    }
}