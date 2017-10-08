import Vue from 'vue'
import VueRouter from 'vue-router'
import entry from '../views/index/entry.vue'
import home from '../views/home/home.vue'
import catagory from '../views/catagory/catagory.vue'
import cart from '../views/cart/cart.vue'
import mine from '../views/mine/mine.vue'
import search from '../views/search/search.vue'
import result from '../views/result/result.vue'
import details from '../views/details/details.vue'
import login from '../views/login/login.vue'
import address from '../views/address/address.vue'
import setAddress from '../views/address/setAddress.vue'
import loginout from '../views/login/loginout.vue'
Vue.use(VueRouter);

let routes = [
    {
        path:'*',
        redirect:'/entry/home'
    },
    {
        name:'entry',
        path:'/entry',
        component:entry,
        children:[
            {
                name:'home',
                path:'home',
                component:home
            },
            {
                name:'catagory',
                path:'catagory/:index?',
                component:catagory
            },
            {
                name:'cart',
                path:'cart',
                component:cart
            },
            {
                name:'mine',
                path:'mine',
                component:mine
            },
            {
                name:'result',
                path:'result',
                component:result
            }
        ]
    },
    {
        name:'search',
        path:'/search',
        component:search
    },
    {
        name:'details',
        path:'/details',
        component:details
    },
    {
        name:'login',
        path:'/login',
        component:login
    },
    {
        name:'address',
        path:'/address',
        component:address
    },{
        name:'setAddress',
        path:'/setAddress',
        component:setAddress
    },{
        name:'loginout',
        path:'/loginout',
        component:loginout
    }
]

const router = new VueRouter({
    routes
})
router.beforeEach(function(to,from,next){
    if(to.name=='login'){
        next()
        return;
    }
    if(to.name=='mine'){
        let meta = to.matched.some((info)=>{info.meta.username});
        let cookie_list = document.cookie.split(';')
        let token=null;
        for(let i=0;i<cookie_list.length;i++){
            if(cookie_list[i].indexOf('1505B-token')>-1){
                token=cookie_list[i].split('=')[1]
            }
        }  
        if(!token){
            next({
                path:'/login'
            })
        }else{
            next()
        }
    }else{
        next()   
    }
})
export default router