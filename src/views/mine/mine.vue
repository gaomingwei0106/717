<template>
  <div class="main">
    <div class="main-tit">
      <p>
        <em class="icon iconfont icon-settings" @click="loginout"></em>
        <span>我的717商城</span>
      </p>
      <dl @click="denglu">
        <dt><img src="../../imgs/dt.png" alt=""></dt>
        <dd>{{username}}</dd>
      </dl>
    </div>
    <div class="main-cont">
      <p>
        <span>
          <em class="icon iconfont icon-shop"></em>
          我的店铺
        </span>
        <b>
          <em class="icon iconfont icon-right"></em>
        </b>
      </p>
      <div class="cont-icon">
        <dl>
          <dt>
            <em class="icon iconfont icon-send"></em>
          </dt>
          <dd>待付款</dd>
        </dl>
        <dl>
          <dt>
            <em class="icon iconfont icon-pay"></em>
          </dt>
          <dd>待发货</dd>
        </dl>
        <dl>
          <dt>
            <em class="icon iconfont icon-deliver"></em>
          </dt>
          <dd>待收货</dd>
        </dl>
        <dl>
          <dt>
            <em class="icon iconfont icon-deliver"></em>
          </dt>
          <dd>售后</dd>
        </dl>
        <dl>
          <dt>
            <em class="icon iconfont icon-form"></em>
          </dt>
          <dd>我的订单</dd>
        </dl>
      </div>
    </div>
    <div class="main-list">
      <p>
        <span>
          账户余额
        </span>
        <b>
          <em class="icon iconfont icon-right"></em>
        </b>
      </p>
      <p>
        <router-link :to="{name:'address'}"><span>
         地址管理
        </span></router-link>
        <b>
          
        </b>
      </p>
      <p>
        <span>
          <em class="icon iconfont icon-service"></em>我的客服
        </span>
        <b>
          <em class="icon iconfont icon-right"></em>
        </b>
      </p>
    </div>
  </div>
</template>
<script>
import router from '../../routes/router.config.js'
import good from '../../components/good.vue'
export default {
  name:'mine',
  data(){
    return{
      username:'请登录'
    }
  },
  methods:{
    denglu(){
      this.$router.push("/login")
      },
    loginout:function(){
      this.$router.push('/loginout')
      }
    },
    beforeRouteEnter:(to,from,next)=>{
      
      next();
    }
  }
</script>
<style scoped lang="scss">
.main{
  overflow-y: scroll;
}
.main-tit {
  height: 3rem;
  background: url("../../imgs/ban_01.png") no-repeat;
  background-size: 100% 3rem;
  
  p {
    width: 100%;
    height: 1rem;
    text-align: center;
    line-height: 1rem;
    color: #fff;
    position: relative;
    em {
      position: absolute;
      left: .2rem;
      top: 0;
    }
    span {
      font-size: 0.32rem;
    }
  }
  dl {
    width: 100%;
    height: 2rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    dt {
      width: 1.2rem;
      height: 1.2rem;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    dd {
      color: #fff;
      font-size: .26rem;
      padding-top: .2rem;
    }
  }
}

.main-cont {
  height: 2.8rem;
  p {
    height: 1.3rem;
    color: #FC4141;
    padding: 0 .2rem;
    line-height: 1.3rem;
    position: relative;
    span {
      padding-left: .5rem;
      em {
        font-size: .4rem;
        font-weight: 600;
        position: absolute;
        left: .2rem;
      }
    }
    b {
      position: absolute;
      right: .2rem;
      top: 0;
    }
  }
}

.cont-icon {
  display: flex;
  align-items: center;
  height: 1.5rem;
  box-sizing: border-box;
  dl {
    flex: 1;
    text-align: center;
  }
}

.main-list {
  height: 3rem;
  border-top: .1rem solid #eee;
  box-sizing: border-box;
  p {
    height: 1rem;
    line-height: 1rem;
    border-bottom: 1px solid #eee;
    padding: 0 .2rem;
    position: relative;
    b{
      position: absolute;
      right: .2rem;
      top:0;
    }
  }
}
</style>
