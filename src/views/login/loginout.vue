<template>
    <div class="wrap">
        <header>
            <h1>设置</h1>
            <i class="iconfont icon-back" @click="back"></i>
        </header>
        <section>
            <div class="con">
                <h4>我的头像</h4>
                <p><img src="../../imgs/dt.png" alt="">
                    <i class="iconfont icon-back"></i>
                </p>
            </div>
            <div class="con">
                <h4>用户名</h4>
                <p>
                    <span>路飞</span>
                    <i class="iconfont icon-back"></i>
                </p>
            </div>
            <div class="con">
                <h4>我的二维码</h4>
                <p><img src="../../imgs/ma.png" alt="" class="ma">
                    <i class="iconfont icon-back"></i>
                </p>
            </div>
            <button @click="loginout">
                退出登录
            </button>
        </section>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        back: function() {
            history.go(-1)
        },
        loginout: function() {
            let cookie_str = document.cookie;
            console.log(cookie_str)
            let arr = cookie_str.split(';');
            arr.forEach((item, index) => {
                if (item.indexOf('1505B') > -1) {
                    arr.splice(index, 1)
                }
            })
            function setCookie(cname, cvalue, exdays) {
                var d = new Date();
                d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                var expires = "expires=" + d.toUTCString();
                document.cookie = cname + "=" + cvalue + "; " + expires;
            }
            setCookie('1505B-tocken', '', -1);
            this.$router.replace({
                name: 'login'
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.wrap {
    width: 100%;
    height: 100%;
    display: -webkit-flex;
    flex-direction: column;
    background: #f3f3f3;
    header {
        width: 100%;
        height: .88rem;
        padding: relative;
        background: #fff;
        h1 {
            width: 100%;
            text-align: center;
            line-height: .88rem;
            font-size: .34rem;
            font-weight: normal;
        }
        .iconfont {
            position: absolute;
            left: .2rem;
            height: .88rem;
            line-height: .88rem;
            top: 0;
        }
    }
    section {
        flex: 1;
        overflow-y: scroll;
        .con {
            height: 1.4rem;
            width: 100%;
            margin-top: 10px;
            background: #fff;
            display: -webkit-flex;
            justify-content: space-between;
            h4 {
                flex: 7;
                line-height: 1.4rem;
                font-size: .3rem;
                font-weight: normal;
                box-sizing: border-box;
                padding-left: 10px;
            }
            p {
                flex: 3;
                display: -webkit-flex;
                justify-content: space-between;
                position: relative;
                img {
                    width: 1.2rem;
                    height: 1.2rem;
                    position: absolute;
                    top: 50%;
                    margin-top: -.6rem;
                }
                .ma {
                    width: .5rem;
                    height: .5rem;
                    top: 50%;
                    margin-top: -.25rem;
                    right: .8rem;
                }
                span {
                    line-height: 1.4rem;
                    font-size: .3rem;
                    position: absolute;
                    right: .8rem;
                }
                .iconfont {
                    transform: rotate(180deg);
                    line-height: 1.4rem;
                    position: absolute;
                    right: 10px;
                }
            }
        }
        button {
            display: block;
            margin-top: 1rem;
            margin-left: 15%;
            width: 70%;
            border: 0;
            background: #fc4141;
            color: #fff;
            font-size: .36rem;
            height: 1rem;
            border-radius: .5rem;
        }
    }
}
</style>
