<template>
  <div class="wrap">
      <header>
          <h1>收件人</h1>
          <i class="iconfont icon-back" @click="back"></i>
      </header>
      <section>
        <div class="name">
          <input type="text" placeholder="收货人姓名" v-model="name">
        </div>
        <div class="name">
          <input type="text" placeholder="请输入手机号" v-model="tel">
        </div>
        <div class="select">
          <ul>
            <input type="checkbox" id="che">
            <label for="che"><li>{{province}}<img src="../../imgs/pull.png" alt="" id="img1"></li>
              <ol class="title">
                <li v-for="x in list" :key="x.id" @click="choice($event)">{{x.name}}</li>
              </ol>
            </label>
            <input type="checkbox" id="che1">
            <label for="che1"><li>{{city}}<img src="../../imgs/pull.png" alt="" id="img2"></li>
              <ol class="title1">
                  <li v-for="x in city_list" :key="x.id" @click="change($event)">{{x.name}}</li>
              </ol></label>
          </ul>
        </div>
        <div class="select">
          <input type="checkbox" id="che2">
          <label for="che2"><p>{{area}}<img src="../../imgs/pull.png" alt="" id="img3"></p>
          <ol class="title2">
              <li v-for="x in area_list" :key="x.id" @click="change_area($event)">{{x}}</li>
          </ol></label>
        </div>
          <div class="name">
            <input type="text" placeholder="详细地址" v-model="detail">
          </div>
          <div class="default">
            <p><input type="checkbox">设为默认地址<img src="../../imgs/check.png" alt=""><b></b></p>
          </div>
          <button @click="test">
              保存
          </button>
          <tips-comp :active="show">{{str}}</tips-comp>
      </section>
  </div>
</template>
<script>
import tips from '../../components/tips.vue';
import token from '../../utils/getCookie'
export default {
  data(){
    return{
      province:'省份',
      city_list:[],
      list:[],
      city:'市',
      area:'区域',
      city_list:[],
      area_list:[],
      show:false,
      name:'',
      tel:'',
      str:'',
      detail:''
    }
    
  },
  created(){
    let get_address = new Promise((resolve,reject)=>{
      this.$http.post('/get_address').then((res)=>{
        resolve(res.data)
      })
    })
     let edit_address = new Promise((resolve,reject)=>{
            let id = this.$route.params.id;
            if(id){
                this.$http.get('/edit_address',{id:id,token:token()}).then((res)=>{
                  resolve(res.data)
                  
              })
            }else{
              resolve(0)
            }
            
        })
        Promise.all([get_address,edit_address]).then((res)=>{
            this.list = res[0];
            console.log(res);
            if(res[1]){
              this.name = res[1].name;
              this.tel = res[1].tel;
              this.province = res[1].province;
              this.city = res[1].city;
              this.area = res[1].area;
              this.detail = res[1].detail;
            }
            
            this.show=false
        })
  },
  watch:{
    'province':function(params){
      console.log(params);
      let list = this.list;
      if(list.length>0){
        list.forEach((item)=>{
          if(item.name == params){
            this.city_list = item.city;
            //console.log(this.city_list)
          }
        })
      }
    },
    'city':function(name){
      //console.log(params);
      let list = this.city_list;
      if(list.length>0){
        list.forEach((item)=>{
          if(item.name == name){
            this.area_list = item.area;
            //console.log(this.city_list)
          }
        })
      }
    }
  },
  components:{
    "tips-comp": tips
  },
  methods:{
    back:function(){history.go(-1);},
    test:function(){
      var reg = /^1[3578]\d{9}$/;
      if(!this.name){
        this.show = true;
        this.str="请输入姓名";
        setTimeout(()=>{
          this.show = false;
        },2000)
        return;
      }
      if(!this.tel || !reg.test(this.tel)){
        this.show = true;
        this.str="请输入正确的手机号";
        setTimeout(()=>{
          this.show = false;
        },2000)
        return;        
      }
      if(!this.detail){
        this.show = true;
        this.str="请输入详细地址";
        setTimeout(()=>{
          this.show = false;
        },2000)
        return;        
      }
      this.$http.post('/add_new_address',{ 
          name:this.name,
          tel:this.tel,
          province:this.province,
          city:this.city,
          area:this.area,
          detail:this.detail,
          token:token
      })
        this.$router.replace("/address")
    },
    choice:function(e){
      var province_name = e.target.innerHTML;
      this.province = province_name;
      
    },
    change:function(e){
      var city_name = e.target.innerHTML;
      this.city = city_name;
    },
    change_area:function(e){
      var area_name = e.target.innerHTML;
      this.area = area_name;
    }
  }
}
</script>
<style lang="scss" scoped>
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
          flex:1;
          .name{
            width: 90%;
            height: .85rem;
            background: #fff;
            box-sizing: border-box;
            line-height: .85rem;
            font-size: .3rem;
            margin: .25rem 5%;
            input{
              display: block;
              width: 100%;
              height: 100%;
              border: 0;
              box-sizing: border-box;
              padding-left: .2rem;
              &::-webkit-input-placeholder{
                font-size: .3rem;
                color: #999;
              }
            }
          }
          .select{
            width: 90%;
            margin: 0 5%;
            margin-bottom: .25rem;
            color: #999999;
            position: relative;
            p{
              line-height: .85rem;
              box-sizing: border-box;
              padding-left: .2rem;
              font-size: .3rem;
              width: 100%;
              height: .85rem;
              background: #fff;
              position: relative;
              img{
                position: absolute;
                right:.1rem;
                width: .2rem;
                height: auto;
                top: 50%;
                transform: translate(0,-50%)
              }
            }
            ul{
              width: 100%;
              height: .85rem;
              display: -webkit-flex;
              justify-content: space-between;
              position: relative;            
              label{
                width: 40%;            
                li{
                  width: 100%;
                  background: #fff;
                  line-height: .85rem;
                  font-size: .3rem;
                  box-sizing: border-box;
                  padding-left: .2rem;
                  position: relative;
                  .title,.title1{
                    position: absolute;
                    top: .85rem;
                    width: 100%;
                    display: -webkit-flex;
                    flex-direction: column;
                    left: 0;
                    background:#fff;
                    opacity: 0;
                    z-index: 99;
                    transition: all 1s linear;
                    li{
                      width: 100%;
                      color: #333;
                      line-height: .6rem;
                    }
                    li:hover{
                        background: orange;
                      }
                  }
                  img{
                    position: absolute;
                    right: .1rem;
                    width: .2rem;
                    height: auto;
                    top: 50%;
                    transform: translate(0,-50%);
                    transition:all 1s linear; 
                  }
                }
              }
            }
          }
          .default{
                height: 1rem;
                width: 90%;
                margin-left: 5%;
                position: relative;          
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
      }
      #img3{
        position: absolute;
        right: .1rem;
        width: .2rem;
        height: auto;
        top: 50%;
        transform: translate(0,-50%);
        transition:all 1s linear; 
      }
      #che,#che1,#che2{
        opacity: 0;
        position: fixed;
        top: 0;
        left: 0;
      }
      .title,.title1,.title2{
        position: absolute;
        top: .85rem;
        width: 40%;
        height: 3rem;
        overflow-y: scroll;
        display: -webkit-flex;
        flex-direction: column;
        left: 0;
        background:#fff;
        height:0;
        z-index: 99;
        transition: all .3s linear;
        li{
          width: 100%;
          color: #333;
          line-height: .6rem;
        }
        li:hover{
            background: orange;
          }
      }
      .title1{
        left:60%;
      }
      .title2{
        width: 100%;
      }
       #che:checked~label>.title,#che1:checked~label>.title1,#che2:checked~label>.title2{
        height:2rem;
      }
      #che:checked~label>li>#img1,#che1:checked~label>li>#img2,#che2:checked~label>p>#img3{
        transform: rotate(180deg); 
        transform: origin(0%,0%)
      }
</style>
