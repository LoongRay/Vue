<template>
  <!-- 注释1:测试computed -->
  <!-- <div>test{{result}}</div> -->
  <div>
    <div class="container">
      <div class="item">
        <div class="item-list"></div>
        <div class="item-list"></div>
        <div class="item-list"></div>
        <div class="item-list"></div>
        <div class="item-list"></div>
        <div class="item-list"></div>
        <div class="item-list"></div>
        <div class="item-list"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Test", //,
  //注释1:测试computed
  // data(){
  //     return{
  //         data1:[1,1,2,2,3,3]
  //     }
  // },
  // methods:{
  //     getFilterArray(arr) {
  //       const res = [];
  //       const json = {};
  //       for(let i =0;i<arr.length;i++){
  //           const _self =arr[i];
  //           if(!json[_self]){//json[_self]:判断数组索引_self是否有值,没值返回true,给res添加元素
  //               res.push(_self);
  //               json[_self] = 1;
  //           }
  //       }
  //       return res
  //   }
  // },
  // computed: {
  //   result(){
  //       return this.getFilterArray(this.data1);
  //   }
  // }
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 900px;
  background-color: blue;
}
.container .item {
  margin-left: 12.5%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  flex: 1;
}
.container .item .item-list {
  width: 25%;
  height: 200px;
  margin-right: 5%;
  margin-bottom:30px;
  background-color: #f00;
  border: 1px solid #ccc;
}
</style>