<template>
  <div class="dialog" :class="{'active':isActive}">
      <img src="../imgs/loading.gif" alt="">
      <h1>loading...</h1>
  </div>
</template>
<script>
export default {
  name:'dialog-view',
  data(){
    return{
        isActive:true
    }
  },
  mounted(){

  },
  methods:{
    show(){
        this.isActive = true;
    },
    hide(){
        this.isActive = false;
    }
  }
}
</script>
<style scoped lang="scss">
    .dialog{
        position: fixed;
        top:0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #fff;
        img{
            position: fixed;
            width: 50%;
            height:auto;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-75%)
        }
        h1{
            width: 100%;
            text-align: center;
            font-size: .38rem;
            position: absolute;
            top: 50%;
        }
    }
</style>
