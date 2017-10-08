<template>
  <div>
      <div class="head">
        <input type="text" placeholder="搜索你想找的商品" v-model="search_words">
        <span @click="search_pro">搜索</span>
      </div>
      <div class="nearly">
        <h3>最近搜索</h3>
        <p v-if="no_records">暂无搜索记录...</p>
        <ul v-if="!no_records">
          <li v-for="{val,index} in sr_list" :key="index">{{index}}</li>  
        </ul>
      </div>
      <div class="nearly">
        <h3>大家都在搜</h3>
        <ul>
          <li>蜂蜜</li>
          <li>三黄鸡</li>
          <li>三黄鸡</li>
          <li>红枣</li>          
        </ul>
        <ul>
          <li>蜂蜜</li>
          <li>三黄鸡</li>
          <li>红枣</li>          
        </ul>
      </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      no_records:true,
      search_words:'',
      sr_list:[]
    }
  },
  methods:{
    search_pro:function(){
      let words = this.search_words;
      if(!words) return;
      let ls = window.localStorage;
      let arr = [];
      if(ls.getItem('search-records')){
        arr = [...JSON.parse(ls.getItem('search-records'))]
      }
      arr.push(words);
      ls.setItem('search-records',JSON.stringify(arr))
      this.$router.push({
        name:"result"
      },words)
    }
  },
  created(){
    let sr = localStorage.getItem('search-records');
    if(!sr){
      this.no_records = true;
    }else{
      this.sr_list=[...JSON.parse(sr)];
      console.log(this.sr_list)
      this.no_records = false;
    }
  }
}
</script>
<style lang="scss" scoped>
  .head{
    width: 100%;
    height: .88rem;
    display: -webkit-flex;
    align-items: center;
    input{
      flex: 8;
      height: .56rem;
      border: 0;
      box-sizing: border-box;
      margin:0 .2rem;
      outline: none;
      background: #f6f6f6;
      &::-webkit-input-placeholder{
       text-align: center; 
      }
    }
    span{
      flex: 2;
      font-size:.32rem;
      color: #444444;
      text-align: center;
    }
  }
  .nearly{
    h3{
      font-weight: normal;
      font-size: .28rem;
      color: #666666;
      padding-left: .2rem;
    }
    p{
      font-size: .3rem;
      padding-left: .4rem;
      color: #444;
    }
    ul{
      display: -webkit-flex;
      margin-top: .1rem;
      li{
        border: .01rem solid #ccc;
        padding: 0 .2rem;
        color: #444;
        border-radius: .1rem;
        line-height: .58rem;
        margin-left: .2rem;
        font-size: .28rem;
      }
    }
  }
  .nearly:last-child{
    margin-top: .7rem;
  }
</style>

