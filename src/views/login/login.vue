<template>
  <div class="wrap">
      <div class="login" v-if="isHide">
          <header class="login-header">
            <i class="icon iconfont icon-back" @click="back"></i>
            <h2>登录717</h2>
            <p @click="changeRegister">注册</p>
        </header>
        <section class="login-section">
            <div class="username">
                <input type="text" placeholder="请输入您的手机号" class="username" v-model="login_tel">
                <img src="../../imgs/per.png" alt="">
            </div>
            <div class="pwd">
                <input type="password" placeholder="请输入您的密码" class="pwd" v-model="login_pwd">
                <img src="../../imgs/pass.png" alt="">            
            </div>
            <button @click="login">立即登录</button>
            <span>忘记密码</span>
        </section>
      </div>
      <div class="register" v-else>
          <header class="login-header">
            <i class="icon iconfont icon-back" @click="back"></i>
            <h2>注册717</h2>
            <p @click="changeLogin">登录</p>
        </header>
        <section class="login-section">
            <div class="username">
                <input type="text" placeholder="请输入您的手机号" v-model.trim="phonenum">
                <img src="../../imgs/per.png" alt="">
            </div>
            <div class="code">
                <input type="text" placeholder="请输入验证码" v-model.trim="code">
                <img src="../../imgs/yan.png" alt="">
                <button @click="get_code">获取验证码</button>
            </div>
            <div class="pwd">
                <input type="password" placeholder="请输入您的密码" v-model.trim="pwd">
                <img src="../../imgs/pass.png" alt="">            
            </div>
            <button @click="go_register">立即注册</button>
        </section>
        <tips v-show="isHide">手机号或密码错误</tips>
      </div>
  </div>
 
</template>
<script>
import tips from '../../components/tips.vue'
export default {
  data(){
      return{
          isHide:false,
          phonenum:'',
          code:'',
          pwd:'',
          login_tel:'',
          login_pwd:''
      }
  },
  components:{
      'tips':tips
  },
  methods:{
      back:function(){this.$router.push('/home')},
      changeRegister:function(){this.isHide = false;},
      changeLogin:function(){this.isHide = true;},
      get_code:function(){this.$http.post('/code',{pn:this.phonenum}).then(function(params){})},
      go_register:function(){
          this.$http.post('/register',{
              tel:this.phonenum,
              code:this.code,
              pwd:this.pwd
              }).then((params)=>{
            if(params.data == 'success'){this.isHide=true;}
        })
      },
      login(){
          this.$http.post('/login',{
              phone:this.login_tel,
              password:this.login_pwd
          }).then((res)=>{
              console.log(res.data);
              document.cookie = "1505B-token="+res.data.token
              this.$router.push({name:'mine'})
          })
      }
  }
}
</script>
<style lang="scss" scoped>
    .login,.register{
        width: 100%;
        height: 100%;
        display: -webkit-flex;
        background: #f4f4f4;
        flex-direction: column;
        position: relative;
        .login-header{
            height: .88rem;
            background: #fff;
            width:100%;
            display: -webkit-flex;
            justify-content: space-between;
            line-height: .88rem;
            p{
                color: #fc4141;
                font-size: .3rem;
                box-sizing:border-box;
                padding-right: 10px;
            }
            h2{
                font-size: .32rem;
                font-weight: normal;
                color:#333;
            }
            .icon{
                box-sizing: border-box;
                padding-left: 10px;
            }
        }
        .login-section{
            flex:1;
            width: 100%;
            margin-top: 10px;
            position: absolute;
            top: 1.08rem;
            .username,.pwd,.code{
                width: 100%;
                height: 1.2rem;
                position: relative;
                background: #fff;
                input{
                    border:0;
                    box-sizing: border-box;
                    padding-left: .8rem;  
                    width: 100%;
                    height: 100%;
                }
                img{
                    position: absolute;
                    left:.1rem;
                    top: 0;
                    width: .46rem;
                    height: .49rem;
                    margin-top: .35rem;
                }
            }
            .username,.code{
                input{
                    border-bottom: 1px solid #e5e5e5;
                }
                button{
                    position: absolute;
                    right: .2rem;
                    width: 2rem;
                    background: #fff;
                    margin:0;
                    font-size: .28rem;
                    height: .8rem;
                    border: 1px solid #fc4141;
                    color: #fc4141;
                    border-radius: .4rem;
                    top: .2rem;
                }
            }
            button{
                display: block;
                width: 70%;
                margin: .4rem 15%;
                background: #fc4141;
                color: #fff;
                font-size: .36rem;
                border: 0;
                height: 1.1rem;
                border-radius: .55rem;
            }
            span{
                font-size:.3rem;
                text-decoration:underline;
                display: block;
                width: 85%;
                text-align: right;
                color: #adadad;
            }
        }
    }
    .register{
        display: block;
    }
</style>
