// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './App'
import Routers from './router/index'
import './assets/style.css'
import product_data from './data/data.js'

Vue.use(VueRouter);
Vue.use(Vuex);

//路由配置
const RouterConfig = {
  //使用HTML5的History路由模式
  mode:'history',
  routes:Routers
};

const router = new VueRouter(RouterConfig);

//不明白用法
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title;
  next();
});

//不明白用法
router.afterEach((to, from, next) => {
  window.scrollTo(0,0);
});

//数组去重
function getFilterArray(arr){
  const res = [];
  const json = {};
  for(let i = 0;i<arr.length; i++){
    const _self = arr[i];
    if(!json[_self]){
      res.push(_self);
      json[_self] = 1;
    }
  }
  return res;
}

const store = new Vuex.Store({
    state:{
        //商品列表数据
        productList:[],
        //购物车数据
        carList:[]
    },
    getters:{
        brands:state=>{
          const brands = state.productList.map(item => item.brand);//map对数组每一项运行指定函数,并将函数结果组成新数组
          return getFilterArray(brands);//通过定义的去重方法,将函数结果组成的新数组进行去重
        },
        colors:state=>{
          const colors = state.productList.map(item=>item.color);
          return getFilterArray(colors);
        }
    },
    mutations:{
        //添加商品列表:productList
        setProductList(state,data){
          state.productList = data;
        },

        //添加购物车
        addCart(state,id){
          //先判断购物车是否已有,已有+1
          const isAdded = state.carList.find(item => item.id === id);
          if (isAdded){
            isAdded.count ++;
          } else {
            state.carList.push({
              id:id,
              count:1
            })
          }
        },
        //修改商品数量
        editCartCount (state,payload){
          const product = state.carList.find(item => item.id === payload.id);
          product.count += payload.count;
          console.log(product);
        },
        //删除商品数量
        deleteCart(state, id){
          const index = state.carList.findIndex(item => item.id === id);
          state.carList.splice(index, 1);
        },
        //清空购物车
        emptyCart(state){
          state.carList = [];
        }
    },
    actions:{
        //请求商品列表
        getProductList (context){
          //真实环境通过Ajax获取,这里异步模拟
          setTimeout(() =>{
            //commit提交一个'setProductList'的mutation 和数据product_data
            context.commit('setProductList',product_data);
          },500)
        },
        //购买
        // buy(context){
        //   return new Promise(resolve => {
        //     setTimeout(()=>{
        //       context.commit('emptyCart');
        //       resolve();
        //     },500)
        //   })
        // }
        buy(context){
          return new Promise(resolve=>{
            setTimeout(()=>{
              context.commit('emptyCart');
              resolve();
            },500)
          })
        }
    }
});

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
