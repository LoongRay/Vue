//import List from '@/views/list'
// import Cart from '@/views/cart'
import Product from '@/views/product'

const routers = [
  {
    path: '/',
    meta:{
      title:'商品列表'
    },
    // component: List
    component: (resolve) => require(['@/views/list.vue'], resolve)
  },
  {
    path: '/cart',
    meta:{
      title:'购物车'
    },
    // component: Cart
    component: (resolve) => require(['@/views/cart.vue'], resolve)
  },
  {
    path: '/product/:id',
    meta:{
      title:'商品详情'
    },
    // component: Product
    component: (resolve) => require(['@/views/product.vue'], resolve)
  },
  {
    path: '/test',
    meta:{
      title:'测试页面'
    },
    // component: Product
    component: (resolve) => require(['@/views/test.vue'], resolve)
  },
  {
    path:'*',
    redirect: '/'
  }
];

export default routers;
