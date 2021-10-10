import { createStore } from 'vuex'

import createPersistedState from "vuex-persistedstate"
import user from "./user";
import category from './category';
import cart from './cart';

export default createStore({
  
  modules: {
    user,
    cart,
    category
  },
  plugins:[createPersistedState({
    key:"jjccdata",
    paths:["user","cart"]   //只针对这两个作自动持久化localStorage
  })]
})
