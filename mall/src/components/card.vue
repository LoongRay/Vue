<template>
  <div class="item-content" style="position: relative;">
      <div class="card-add-cart" @click.prevent="addCart">加入购物车</div>
      <router-link :to=" '/product/' + info.id ">
        <div class="item-card">
          <div><img class="card-img" :src="info.image" alt=""></div>
          <div class="card-title">{{info.name}}</div>
          <div class="card-color" :style="{background:colors[info.color]}"></div>
          <div class="card-price">¥ {{info.cost}}</div>
          <div class="card-sales">销量：{{info.sales}}</div>
        </div>
      </router-link>
  </div>
</template>

<script>
	export default {
		name: "card",
    props:{
		  info:Object
    },
    data(){
		  return{
		    colors:{
          '白色': '#ffffff',
          '金色': '#dac272',
          '蓝色': '#233472',
          '红色': '#f2352e'
        }
      }
    },
    methods:{
      addCart:function () {
          this.$store.commit('addCart', this.info.id);
      }
    }
	}
</script>

<style scoped>
  .item-content{
    margin-right: 3.74%;
  }
  .item-card{
    background-color: #fff;
    border: 1px solid #eee;
    border-radius: 10px;
    padding: 10px;
    text-align: center;
    margin-bottom: 30px;
  }
  .card-title{
    font-weight: bolder;
    margin-bottom: 10px;
  }
  .card-color{
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 1px solid #656565;
    margin: 0 auto;
  }
  .card-img{
    width: 360px;
    height: 240px;
  }
  .card-price{
    margin-top: 10px;
    color: #f00;
  }

  /*购物车样式*/
  .card-add-cart{
    background: #1db0ff;
    color: #fff;
    font-size: 14px;
    padding: 4px;
    border: none;
    outline: none;
    border-radius: 4px;
    position: absolute;
    z-index: 99;
    right: 20px;
    top: 20px;
    display: none;
    cursor: pointer;
  }

  .item-content:hover .card-add-cart{
    display: inline-block;
  }
</style>
