import { createStore } from 'vuex'


let users={
  state: {
    userName:""
  },
  getters:{
    userName(state){
      return state.userName;
    }
  },
  mutations: {
      loginUser(state,payload){
      
      }
  },
  actions: {
    loginHandle(ctx,payload){
   
    
    }
  }
}

let goods={
  state: {
    cartLists:[]
  },
  getters:{
    cartLists(){
      return state.cartLists;
    }
  },
  mutations: {
    addCart(state,payload){
      
    }
  },
  actions: {
  }
}


export default createStore({
  
  modules: {
    users,
    goods
  }
})
