<template>
  <div class="wrap">
      <header>
          <h1>地址管理</h1>
          <i class="iconfont icon-back" @click="back"></i>
      </header>
      <section v-for="x in add_list">
          <div class="content" v-show="isShow">
              <p>{{x.name}} <span>{{x.tel}}</span></p>
              <h5>{{x.province}}{{x.city}}{{x.area}}{{x.detail}}</h5>
          </div>
          <div class="bottom" v-show="isShow">
              <p><input type="checkbox">默认地址<img src="../../imgs/check.png" alt=""><b></b></p>
              <h6><i class="iconfont icon-shop" @click="edit(x.id)"> 编辑</i><i class="iconfont icon-shop" @click="delete_info(x.id)"> 删除</i></h6>
          </div>
          
      </section>
      <router-link :to='{name:"setAddress"}'><button>
              新增地址
          </button></router-link>
          <tips :active='active'>删除成功！</tips>
  </div>
</template>
<script>
import token from '../../utils/getCookie.js'
import tips from '../../components/tips.vue'
export default {
  data(){
      return{
          add_list:[],
          active:false,
          isShow:false
      }
  },
  created(){
        this.$http.post('/get_address_list',{token:token()}).then(res=>{
            //console.log(res.data)
            this.add_list = res.data;
            if(this.add_list.length>0){
                this.isShow = true;
            }
            console.log(this.add_list)
        })
  },
  components:{
        tips:tips
    },
    methods:{
        back:function(){
            history.go(-1)
        },
        add:function(){
            this.$router.push('/setAddress')
        },
        edit(id){
            this.$router.push({
                name:'setAddress',
                params:{
                    id:id
                }
            })
            console.log(id)
        },
        delete_info(id){
            this.$http.get('delete_address',{id:id,token:token()}).then(res=>{
                
                let idx;
                if(res.data =='success'){
                    this.active = true;
                    setTimeout(()=> {
                        this.active = false
                    }, 1000);
                    this.add_list.forEach((item,index)=>{
                        if(item.id == id){
                            idx=index
                        }
                    })
                    this.add_list.splice(idx,1);
                    
                    
                }
            })
        },
        back(){
            history.go(-1)
        }
    }
}
</script>
<style lang='scss' scoped>
    .wrap{
        width: 100%;
        height: 100%;
        display: -webkit-flex;
        flex-direction: column;
        background: #f3f3f3;
        header{
            width: 100%;
            height: .88rem;
            padding: relative;
            background: #fff;
            h1{
                width: 100%;
                text-align: center;
                line-height: .88rem;
                font-size: .34rem;
                font-weight: normal;
            }
            .iconfont{
                position: absolute;
                left: .2rem;
                height: .88rem;
                line-height: .88rem;
                top: 0;
            }
        }
        section{
            overflow-y: scroll;
            position: relative;
            .content{
                background-color: #fff;
                padding-bottom: .2rem;
                // display: none;
                p{
                    line-height: .8rem;
                    padding-left: .2rem;
                    font-size: .34rem;
                }
                h5{
                    height: .75rem;
                    font-size: .28rem;
                    padding: 0 .2rem;
                    font-weight: normal;
                    color: #666;
                }
            }
            .bottom{
                height: 1rem;
                background: #fff;
                position: relative;
                // display: none;                
                margin-bottom: .2rem;
                p{
                    padding-left: .8rem;
                    line-height: .5rem;
                    margin: .25rem 0;
                    position: absolute;
                    font-size: .3rem;
                    input{
                        position: absolute;
                        top: 0;
                        left: .2rem;
                        display: inline-block;
                        width: .5rem;
                        z-index:99;
                        opacity: 0;
                        height: .5rem;
                    }
                    b{
                        position: absolute;
                        width: .5rem;
                        height: .5rem;
                        top: 0;
                        left: .2rem;
                        border: 1px solid #333;
                        border-radius:50%;
                    }
                    input:checked ~img{             
                            display: block;
                    }
                    img{
                        position: absolute;
                        left: .2rem;
                        z-index: 98;
                        top: 0;
                        width: .5rem;
                        height: .5rem;
                        display: none;
                    }
                }
                h6{
                    position: absolute;
                    right: .2rem;
                    line-height: 1rem;
                    color: #666;
                    font-weight: normal;
                    font-size: .3rem;
                }
            }
            
        }
        button{
            display: block;
            margin-top: 1rem;
            margin-left: 15%;
            width: 70%;
            border: 0;
            background:#fc4141;
            color:#fff;
            font-size: .36rem;
            height: 1rem;
            border-radius: .5rem;
        }
    }
    
</style>
