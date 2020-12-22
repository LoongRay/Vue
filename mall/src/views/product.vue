<template>
  <div class="detail" v-if="product">
    <div class="detail-product">
      <div class="product-img">
        <img :src="product.image"/>
      </div>
      <div class="product-text">
          <h1 class="text-title">
            {{product.name}}
          </h1>
          <div class="text-price">
            ¥ {{product.cost}}
          </div>
          <button class="sub-btn" @click.prevent="addToCart">加入购物车</button>
      </div>
    </div>
    <div class="detail-intro">
      <h3>产品介绍</h3>
    </div>
  </div>
</template>

<script>
  import product_data from '../data/data.js'
	export default {
		name: "product",
    data(){
		  return{
		    id:parseInt(this.$route.params.id),
		    product:null
      }
    },
    methods:{
		  getProduct () {
        // 真实环境通过 ajax 获取，这里用异步模拟
          setTimeout(()=>{
            this.product = product_data.find(item => item.id === this.id);
          },500);
      },
      addToCart:function () {
        this.$store.commit('addCart', this.id);
      }
    },
    mounted(){
      this.getProduct();
    }
	}
</script>

<style scoped>
  .detail{
    padding: 40px;
    background-color: #eee;
  }
  .detail-product{
    display: flex;
    background-color: #fff;
    border: 1px solid #eee;
    height: 480px;
    padding: 40px;
    border-radius: 4px;
  }
  .detail-product .product-img img{
    width: 420px;
    height: 380px;
    margin-top: 42px;
    margin-left: 60px;
  }
  .detail-product .product-text{
    width: 800px;
    height: 380px;
    margin-left: 320px;
    margin-top: 42px;
    text-align: center;
  }
  .product-text .text-title{
    margin-top: 100px;
  }
  .product-text .text-price{
    color: #f00;
    margin-top: 10px;
  }
  .product-text .sub-btn{
    color: #fff;
    background-color: #3595ff;
    width: 220px;
    height: 40px;
    font-size: 16px;
    border-radius: 4px;
    border: none;
    outline: none;
    margin-top: 12px;
  }

  .detail-intro{
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border: 1px solid #eee;
    height: 480px;
    padding: 40px;
    margin-top: 30px;
    text-align: center;
    border-radius: 4px;
  }
</style>
