import axios from 'axios';
import Element from 'element-ui';
import store from './store';
import router from "./router";
axios.defaults.baseURL = 'http://10.140.10.16:8081/'

axios.interceptors.request.use(config=>{
    // console.log("前置拦截")
    return config
})

axios.interceptors.response.use(response=>{
    const res = response.data;
    // console.log("后置拦截");
    if(res.code === 200){
        return response;
    }else if (res.code === 400){
        // console.log("拦截");
        //账号密码不正确 弹窗警告
        Element.Message({
            message:response.data.msg === null?"请登录！":response.data.msg,
            type:'error',
            duration:1000
        })
        return Promise.reject(response.data.msg)
    }
},
    error => {
        console.log("err"+error);

        if(error.response.data){
            error.message = error.response.data.msg;
        }
        //根据请求状态code进行相关操作
        if(error.response.status === 401){
            store.commit('REMOVE_INFO');
            router.push({
                path:'/login'
            });
            error.message = "请重新登录";
        }
        if(error.response.status === 403){
            error.message = '您没有权限查看';
        }
        if(error.response.data.data !== null){
            console.log("拦截")
            Element.Message({
                message:error.message,
                type:'error',
                duration:1000
            })
        }

        return Promise.reject(error)
    })