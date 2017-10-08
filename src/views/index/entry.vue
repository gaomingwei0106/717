<template>
    <div class="container">
        <router-view class="wrap"></router-view>

        <nav class="footer">
            <router-link :to="{name:'home'}" :class="{'active':list[0]}" tag="span">
                <em class="icon iconfont icon-home"></em>
                <sub>首页</sub>
            </router-link>

            <router-link :to="{name:'catagory'}" @click="change(1)" :class="{'active':list[1]}" tag="span">
                <em class="icon iconfont icon-apps"></em>
                <sub>分类</sub>
            </router-link>

            <router-link :to="{name:'cart'}" @click="change(2)" :class="{'active':list[2]}" tag="span">
                <em class="icon iconfont icon-cart"></em>
                <sub>购物车</sub>
            </router-link>

            <router-link :to="{name:'mine'}" @click="change(3)" :class="{'active':list[3]}" tag="span">
                <em class="icon iconfont icon-people"></em>
                <sub>我的</sub>
            </router-link>

        </nav>
    </div>
</template>
<script>
export default {
    data(){
        return{
            list:[!1,!1,!1,!1]
        }
    },
    methods:{
        change:function(index){
            this.list=[!1,!1,!1,!1];
            this.list[index]=!0;
            console.log(this.list)
        }
    }
}
</script>
<style>
.container {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.wrap {
    flex: auto;
}

nav {
    height: 0.98rem;
    text-align: center;
    display: table;
    width: 100%;
    border-top: 1px solid #eee;
    background: #fff;
    z-index: 999;
}

nav span {
    display: table-cell;
    width: 25%;
}

nav .icon {
    font-size: 0.46rem;
    height: 0.5rem;
}
span.active{
    color: orange;
}
nav em,
nav sub {
    display: block;
    width: 100%;
    font-size: .28rem;
}


</style>

