import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path:"/",
    component:()=>import("@/views/layout.vue"),
    children:[{
      path:"/",
      component:()=>import("@/views/home")
    },{
      name:"category",
      path:"/category/:classId",
      component:()=>import("@/views/category")
    },{
      name:"subcategory",
      path:"/category/sub/:subid",
      component:()=>import("@/views/category/sub/subcategory.vue")
    },{
      name:"product",
      path:"/product/:productId",
      component:()=>import("@/views/product")
    }]
  },
  {
    path:"/login",
    component:()=>import("@/views/loginreg")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

//每次路由变化后都要滚动到顶部
router.afterEach(() => {
  // console.log("afterEach",to.path,failure);
  document.defaultView.scrollTo({
    left:0,
    top:0,
    behavior:"smooth"
    
  })
})
export default router
