import axios from 'axios'
import AxiosAdapter from 'axios-mock-adapter'
import catagory from '../src/service/catagory.json'
let mocker=new AxiosAdapter(axios);
import getGoodsChannel from '../src/service/goods_channel.js';
import city from '../src/service/city.json'
// import getGoodsChannel2 from '../service/goodChannel2.js';
mocker.onPost('/mall/index/getGoodsChannel',{
    channel_id:1
}).reply(200,{
    data:getGoodsChannel
});
mocker.onPost('/mall/index/getGoodsChannel',{
    channel_id:2
}).reply(200,{
    data:getGoodsChannel
})
mocker.onPost('/mall/index/getGoodsChannel',{
    channel_id:3
}).reply(200,{
    data:getGoodsChannel
})
mocker.onPost('mtop.relationrecommend.wirelessrecommend.recommend').reply(200,function(){
    return new Promise(function(resolve,reject){
        setTimeout(()=>{
            resolve(catagory)
        },2000)
    })
})
import addCart from '../src/service/addCart.json';
mocker.onPost('/user/Cart/addCart', { key_code: 123, goods_id: 123 }).reply(200, addCart)

//验证码获取
mocker.onPost('/code').reply((config)=>{
    let phone = JSON.parse(config.data).pn;
    return [200,phone.slice(-4)]
})
mocker.onPost('/register').reply((config)=>{
    let register_info = JSON.parse(config.data);
    console.log(register_info)
    let ls = window.localStorage;
    let history = [];
    if(!ls.getItem('register_info')){
        history.push(register_info)
    }else{
        history = JSON.parse(ls.getItem('register_info'));
        history.push(register_info)
    }

    ls.setItem('register_info',JSON.stringify(history))
    return [200,'success']
})
mocker.onPost('/login').reply(config=>{
    let login_info = JSON.parse(config.data)
    console.log(login_info)
    let ls = window.localStorage;
    let register_history = JSON.parse(ls.getItem('register_info'));
    //console.log(ls.getItem('register_info'))
    //console.log(register_history);
    let is_right= false;
    register_history.forEach((item,index)=>{
        //console.log(item)
        if(item.tel===login_info.phone && item.pwd===login_info.password){
            is_right = true
        }
    })

    if(is_right){
        return [200,{
            token:login_info.phone
        }]
    }else{
        return [500,'登录信息有误']
    }
})

function delay(data){
    return function(){
        return new Promise(function(resolve,reject){
            let timer = setTimeout(()=>{
                resolve([200,data]);
                clearTimeout(timer)
            },random(0,3500))
        })
    }
}
//获取地址
mocker.onPost('/get_address').reply(function(config){
    return [200,city]
})
//添加地址
mocker.onPost('/get_address_list').reply(config=>{
    let token = JSON.parse(config.data).token;
    console.log(token)
    let ls = localStorage;
    let add_list = JSON.parse(ls.getItem('address-list'));
    return [200,add_list&& add_list[token]]
})
mocker.onPost('/add_new_address').reply(config=>{
    let params = JSON.parse(config.data);
    console.log(params)
    let ls = localStorage;
    if(ls.getItem('address-list')){
        let add_list = JSON.parse(ls.getItem('address-list'));
        params.id = (add_list[params.token].length+1);
        add_list[params.token].push(params);
        ls.setItem('address-list',JSON.stringify(add_list));
    }else{
        let obj={};
        params.id =1;
        obj[params.token] = [params];
        ls.setItem('address-list',JSON.stringify(obj));
    }


    return [200,1]
})
//编辑地址
mocker.onGet('/edit_address').reply(config=>{
    let delivery_id = config.id;
    let token = config.token;
    
    let ls = localStorage;
    let list = JSON.parse(ls.getItem('address-list'))[token];
    
    let res=[];
    if(list){
        list.forEach(item=>{
            if(item.id==delivery_id){
                res = item
            }
        })
    }
    
    return new Promise(function (resolve, reject) {
        let timer = setTimeout(() => {
            resolve([200, res])
            clearTimeout(timer)
        },300)
    })
})
//删除地址
mocker.onGet('/delete_address').reply(config=>{
    let delivery_id = config.id;
    let token = config.token;
    
    let ls = localStorage
    let delivery_list = JSON.parse(ls.getItem('address-list'));
    let list = delivery_list[token];
    
    let delivery_index;
    if(list){
        list.forEach((item,index)=>{
            if(item.id===delivery_id){
                delivery_index = index
            }
        })
    }

    list.splice(delivery_index,1);
    delivery_list[token] = list;

    ls.setItem('address-list',JSON.stringify(delivery_list))
    
    return new Promise(function (resolve, reject) {
        let timer = setTimeout(() => {
            resolve([200,'success'])
            clearTimeout(timer)
        }, 1000)
    })
})
