<template>
  <div class="wraper">
    <div class="control-panel">
      <div class="list-control">
        <div class="list-control-filter">
          <span class="filter-title">品牌:&nbsp;</span>
          <span class="filter-item"
            :class="{on: item === filterBrand}"
            v-for="item in brands"
            :key="item.id"
            @click="handleFilterBrand(item)"
          >{{item}}</span>
        </div>
        <div class="list-control-filter">
          <span class="filter-title">颜色:&nbsp;</span>
          <span class="filter-item"
            :class="{on :item === filterColor}"
            v-for="item in colors"
            :key="item.id"
            @click="handleFilterColor(item)"
          >{{item}}</span>
        </div>
        <div class="list-control-filter">
          <span class="filter-title">排序:&nbsp;</span>
          <span class="filter-item"
            :class="{on: order === ''}"
            @click="handleOrderDefault"
          >默认</span>
          <span class="filter-item"
            :class="{on: order === 'sales'}"
            @click="handleOrderSales"
          >销量
            <template v-if="order === 'sales'">↓</template>
          </span>
          <span class="filter-item"
            :class="{on : order.indexOf('cost') > -1}"
            @click="handleOrderCost"
          >价格
            <template v-if="order === 'cost-asc'">↑</template>
            <template v-if="order === 'cost-desc'">↓</template>
          </span>
        </div>
      </div>
    </div>
    <div class="content">
      <Card v-for="item in filteredAndOrderedList" :info="item" :key="item.id"></Card>
    </div>
    <div class="product-not-find" v-show="!filteredAndOrderedList.length">暂无相关商品</div>
  </div>
</template>

<script>
import Card from "../components/card";

export default {
  name: "list",
  data(){
    return{
      /*
      *排序依据,可选值为
      *sales(销量)
      * cost-desc(价格降序)
      * cost-asc(价格升序)
      */
     order:'',
     filterBrand:'',
     filterColor:''
    }
  },
  components: {
    Card,
  },
  computed: {
    list() {
      return this.$store.state.productList;
    },
    colors(){
      return this.$store.getters.colors;
    },
    brands(){
      return this.$store.getters.brands;
    },
    filteredAndOrderedList(){
      //复制原始数据
      let list = [...this.list];
      //todo按照品牌过滤
      if(this.filterBrand !== ''){
        list = list.filter(item => item.brand === this.filterBrand);
      }
      //todo按照颜色过滤
      if(this.filterColor !== ''){
        list = list.filter(item => item.color === this.filterColor);
      }
      //排序
      if(this.order !== ''){
        if(this.order === 'sales'){
          list = list.sort((a,b) => b.sales - a.sales);//销量降序
        }else if(this.order === 'cost-desc'){//cost-desc(价格降序)
          list = list.sort((a,b) =>b.cost - a.cost);
        }else if (this.order === 'cost-asc'){//cost-asc(价格升序)
          list = list.sort((a,b) => a.cost - b.cost);
        }
      }
      return list;
    }
  },
  methods:{
    handleOrderDefault(){
      this.order = '';
    },
    handleOrderSales(){//选择销量降序
      this.order = 'sales';
    },
    handleOrderCost(){//选择价格升序或降序
      if(this.order === 'cost-desc'){
        this.order = 'cost-asc';
      }else{
        this.order = 'cost-desc';
      }
    },
    //筛选品牌
    handleFilterBrand (brand){
      //单次点击选中,再次点击取消选中
      if(this.filterBrand === brand){
        this.filterBrand = '';
      }else{
        this.filterBrand = brand;
      }
    },
    //筛选颜色
    handleFilterColor (color){
      if(this.filterColor === color){
        this.filterColor = '';
      }else{
        this.filterColor = color;
      }
    }

  },
  //传值给vuex的mutation改变state
  //dispatch：异步操作，数据提交至 actions ，可用于向后台提交数据
  mounted() {
    this.$store.dispatch("getProductList");
  },
};
</script>

<style scoped>
/* 筛选器样式 */
.control-panel {
  margin: 10px 86px;
  background-color: #fff;
  border: 1px solid #fff;
  padding: 20px 14px;
  border-radius: 10px;
}

.list-control-filter + .list-control-filter{
  margin-top: 20px;
}
.list-control-filter .filter-item{
  display: inline-block;
  border: 1px solid rgb(241, 239, 239);
  border-radius: 4px;
  height: 20px;
  width: 50px;
  text-align: center;
  line-height: 20px;
  cursor: pointer;
}
/* 筛选被选中颜色样式 */
.list-control-filter .filter-item.on{
  
    background:#f2352e;
    border:1px solid #f2352e;
    color:#fff;
  
}
/* 商品列表样式 */
.content {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding-left: 86px;
}

/* 没有商品提示 */
.product-not-find{
  text-align: center;
  padding: 30px 30px;
}
</style>
