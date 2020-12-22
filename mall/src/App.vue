<template>
  <div id="app">
    <div class="header">
      <router-link to="/" class="header-title">
        电商网站示例
      </router-link>
      <div class="header-menu">
          <router-link to="/cart" class="header-cart">
            购物车
          </router-link>
          <span class="cart-num" v-if="countAll">{{countAll}}</span>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed:{
    carList:function () {
        return this.$store.state.carList;
    },
    countAll:function(){
      let count = 0;
      this.carList.forEach(item =>{
        count += item.count;
      })
      return count;
    }
  }
}
</script>

<style>
body{
  background-color: rgb(245, 237, 237);
}
*{
  margin: 0;
  padding: 0;
}
a{
  text-decoration: none;
}
.header{
  width: 100%;
  height: 48px;
  background: #000;
  color: #fff;
  display: flex;
  justify-content: space-between;
}
.header-title,
.header-cart{
  text-decoration: none;
  color: #fff;
  line-height: 48px;
}
.header-title{
  margin-left: 50px;
}
.header-cart{
  margin-right: 60px;
  position: relative;
}
.cart-num{
  font-size: 12px;
  text-align: center;
  display: inline-block;
  position: absolute;
  right: 42px;
  top: 16px;
  background: #f00;
  width: 16px;
  height: 16px;
  line-height: 16px;
  border-radius: 50%;
}
</style>
