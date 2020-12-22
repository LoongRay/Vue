<!-- 购物车页面 -->
<template>
  <div>
    <div class="cart">
      <div class="cart-header">
        <h3 class="header-title">购物清单</h3>
        <div class="header-title-attr">
          <div class="header-info">商品信息</div>
          <div class="header-price">单价</div>
          <div class="header-num">数量</div>
          <div class="header-total">小计</div>
          <div class="header-del">操作</div>
        </div>
      </div>
      <div class="cart-content" v-for="(item, index) in carList" :key="item.id">
        <div class="cart-info">
          <div class="info-img">
            <img :src="productDicList[item.id].image" alt="" />
          </div>
          <div class="info-name">
            {{ productDicList[item.id].name }}
          </div>
        </div>
        <div class="cart-operation">
          <div class="cart-price">¥ {{ productDicList[item.id].cost }}</div>
          <div class="cart-count">
            <button
              class="count-btn count-btn-subs"
              @click="handleCount(index, -1)"
            >
              -
            </button>
            <span class="count-btn-nums"> {{ item.count }} </span>
            <button
              class="count-btn count-btn-plus"
              @click="handleCount(index, 1)"
            >
              +
            </button>
          </div>
          <div class="cart-total">
            ¥ {{ productDicList[item.id].cost * item.count }}
          </div>
          <div class="cart-del" @click="handleDelete(index)">删除</div>
        </div>
      </div>
      <div class="cart-coupons" v-if="carList.length">
        <label for="coupons-code">使用优惠码:&nbsp;&nbsp;</label>
        <input id="coupons-code" type="text" v-model="promotionCode" />
        <button @click="handleCheckCode">验证</button>
      </div>
      <div class="cart-total-zone" v-if="carList.length">
        <div class="cart-total-nums">
          共计 <span>{{ countAll }}</span> 件商品
        </div>
        <div class="cart-total-price">
          应付总额<span> ¥ {{ costAll - promotion }}</span>
          <br />
          <template>
            (优惠 <span> ¥ {{ promotion }}</span>)
          </template>
        </div>
        <button class="cart-total-btn" @click="handleOrder">现在结算</button>
      </div>
      <div class="cart-empty-tips" v-if="!carList.length">购物车为空</div>
    </div>
  </div>
</template>

<script>
  import product_data from '../data/data.js'
  export default {
    name: "cart",
    data(){
      return {
        productList:product_data,
        promotionCode:'',
        promotion:0
      }
    },
    computed: {
      carList() {
        return this.$store.state.carList;
      },
      productDicList (){//获取商品数据列表
        const dict = {};
        this.productList.forEach(item=>{
          //console.log(item.id);//打印对象属性值
          dict[item.id] = item;//itme.id为dict对象属性名,item为属性值
        });
        console.log(dict);
        return dict;
      },
      countAll (){//计算总数量
        let count = 0;
        this.carList.forEach(item => {
          count += item.count;
        });
        return count;
      },
      costAll(){//计算总价格
        let cost = 0;
        this.carList.forEach(item => {
          cost += this.productDicList[item.id].cost * item.count;
        });
        return cost;
      }
    },
    methods:{
      //操作商品数量加减
      handleCount(index,count){
        console.log(count);//函数参数count,调用方法时,该count设置为1,点击按钮购物车加1,为-1,点击购物车-1
        //count < 0指函数参数count , this.carList[index].count === 1指购物车count
        if(count < 0 && this.carList[index].count === 1)return;
        this.$store.commit('editCartCount',{//提交mutation和参数id&count
          id:this.carList[index].id,
          count:count//函数参数count,传入mutation中的editCartCount进行处理
        });
      },
      handleDelete (index){//操作商品项删除
        this.$store.commit('deleteCart', this.carList[index].id);
      },
      //验证优惠码
      handleCheckCode(){
        if(this.promotionCode === ''){
          window.alert('请输入优惠码');
          return;
        }
        if(this.promotionCode !=='Vue.js'){
          window.alert("优惠码验证失败!");
        }else {
          this.promotion = 500;
        }
      },
      //通知Vuex下单
      handleOrder(){
        this.$store.dispatch('buy').then(()=>{
          window.alert('购买成功!')
        })
      }
    }
  }
</script>

<style scoped>
body {
  background-color: #a9a9a9;
}
.cart {
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  margin: 40px 40px 0 40px;
}
.cart .header-title {
  color: #333;
}

.cart .header-title-attr {
  display: flex;
  height: 40px;
  padding: 0 40px;
  background-color: antiquewhite;
  line-height: 40px;
  font-size: 14px;
}

.cart .header-title-attr > div {
  width: 10%;
  text-align: center;
}
.cart .header-title-attr .header-info {
  width: 60%;
  text-align: left;
}

.cart .cart-content {
  display: flex;
  height: 64px;
  padding-left: 40px;
  padding-right: 40px;
  border-bottom: 1px dotted #879191;
}

.cart .cart-content .cart-info {
  display: flex;
  width: 60%;
}

.cart .cart-content .cart-info .info-img img {
  width: 40px;
  height: 40px;
  margin-top: 12px;
  border: 1px solid #eee;
}
.cart .cart-content .cart-info .info-name {
  line-height: 64px;
  padding-left: 10px;
}
.cart .cart-content .cart-operation {
  display: flex;
  line-height: 64px;
  width: 40%;
}
.cart .cart-content .cart-operation > div {
  width: 25%;
  text-align: center;
}
.cart .cart-content .cart-operation .cart-count .count-btn {
  display: inline-block;
  background-color: #eef;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  text-align: center;
  outline: none;
  border: none;
  cursor: pointer;
}
.cart .cart-content .cart-operation .cart-del {
  cursor: pointer;
}
/*优惠券效果*/
.cart-coupons {
  height: 64px;
  line-height: 64px;
  padding-left: 40px;
}
.cart-coupons button {
  background-color: #1db0ff;
  color: #fff;
  outline: none;
  border: none;
  padding: 4px;
  border-radius: 2px;
  cursor: pointer;
}
.cart-empty-tips {
  text-align: center;
  line-height: 30px;
}

/*结算区域样式*/
.cart-total-zone {
  display: flex;
  height: 64px;
  line-height: 64px;
  justify-content: flex-end;
  text-align: center;
  font-size: 16px;
}
.cart-total-zone .cart-total-nums,
.cart-total-zone .cart-total-price {
  margin-right: 40px;
}
.cart-total-zone .cart-total-nums span,
.cart-total-zone .cart-total-price span {
  font-size: 20px;
  color: #f00;
}
.cart-total-zone .cart-total-btn {
  width: 128px;
  height: 38px;
  color: #fff;
  font-size: 16px;
  line-height: 38px;
  outline: none;
  border: none;
  background: #1db0ff;
  margin-top: 14px;
  border-radius: 6px;
  cursor: pointer;
  margin-right: 50px;
}
</style>
