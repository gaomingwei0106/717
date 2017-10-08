<template>
  <div class="wrap">
    <header>
      <input type="text" placeholder="输入您要购买的商品">
      <i class="iconfont icon-message"></i>
    </header>
    <section>
      <div class="left">
        <ul>
          <li v-for="(i,x) in catagory_list" :key="i.type">
            <router-link :to="{name:'catagory',params:{index:x}}"><p><i class="iconfont icon-message"></i>{{i.title}}</p></router-link>
          </li>  
        </ul>
          
      </div>
      <div class="right">
        <dl v-for="val in catagory_content" :key="val.id">
          <dt><img :src="val.pic" alt=""></dt>
          <dd>{{val.name}}</dd>
        </dl>
        
      </div>
    </section>
    <dialog-layer v-show="bool"></dialog-layer>  
  </div>
</template>
<script>
import dialog from '../../components/dialog.vue'
export default {
  data(){
    return{
      bool:true,
      catagory_list:[],
      catagory_content:[],
    }
  },
  watch:{
    "$route":function(n,o){
      //console.log(n.params.index)
      let idx = n.params.index;
      this.catagory_content=[...this.catagory_list[idx].items]
    }
  },
  components:{
    "dialog-layer":dialog
  },
  created(){
    var that = this;
    this.$http.post('mtop.relationrecommend.wirelessrecommend.recommend').then(function(res){
     res.data().then((data)=>{

        //console.log(data.data.result[0].moduleList[0].items)
        that.catagory_list = [...data.data.result[0].moduleList];
        that.catagory_content = that.catagory_list[0].items;
        that.bool = false;
      });
      
    })
  }
}
</script>
<style lang="scss" scoped>
.wrap{
  overflow-y:scroll;

  header{
    height:.88rem;
    position: relative;
    input{
      position: absolute;
      width: 70%;
      margin: .15rem 15%;
      height: .54rem;
      border: 0;
      background: #f6f6f6;
      &::-webkit-input-placeholder{
        text-align: center;
      }
    }
    .iconfont{
      position: absolute;
      height: .88rem;
      line-height: .88rem;
      font-size: .44rem;
      right:.2rem;
      top: 0;
    }
  }
  section{
    display: -webkit-flex;
    .left{
      flex: 4;
      background: #eee;
      .router-link-active{
        background: #fff;
        color: red;
      }
      p{
        width: 100%;
        height: .9rem;
        display: -webkit-flex;
        justify-content: center;
        align-items: center;
        font-size: .3rem;
        color:#444;
      }
    }
    .right{
      flex:6;
      width: 100%;
      background: #fff;
      display: -webkit-flex;
      flex-wrap:wrap;
      dl{
        display:-webkit-flex;
        flex-direction: column;
        width: 33%;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        padding: .1rem;
        dt{
          img{
            display: block;
            width: 100%;
            height: auto;
          }
        }
        dd{
          height: .7rem;
          line-height: .7rem;
          text-align: center;
        }
      }
    }
  }
  
}
</style>
