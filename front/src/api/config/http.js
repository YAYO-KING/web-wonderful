import axios from 'axios';
//Notify相当于message消息提示，Toast相当于loading，页面提示
import router from '@/router';
import store from "@/store"
import {Message, Loading} from "element-ui"

let loadingInstance;
let loadingCount = 0;

const BASE_URL = process.env.VUE_APP_API_URL;

//注意，最新版本的axios无法自定义config的属性值，所以建议安装0.18.0的axios，可以自由添加config的属性值
// 创建axios实例
const http = axios.create({
    baseURL: BASE_URL,
    timeout: 30000, // 请求超时时间

});

function startLoading() {
    if (loadingCount === 0) {

        // 开始加载
        loadingInstance = Loading.service({
            lock: true,
            text: '数据加载中，请稍后...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
        });

        //1.vant自带的loading
        //Toast.loading({
        //    message: '加载中...',
        //    forbidClick: true
        //});

        //2.自己创建Loading.vue组件，通过控制state来显示和不显示
        //store.dispatch('common/set_loading', true);

    }
    loadingCount++;

}

function endLoading() {

    if (loadingCount <= 0) return;
    loadingCount--;
    if (loadingCount === 0) {

        // 结束加载
        loadingInstance.close();

        //1.方式一
        //Toast.clear();

        //2.方式二
        //store.dispatch('common/set_loading', false);

    }

}

// 添加request拦截器--请求拦截
http.interceptors.request.use(config => {
    if (config.options.loading) {
        startLoading();
    }

    if (config.method === 'post') {
        config.data = {
            ...config.data,
            _t: Date.parse(new Date()) / 1000,
        }
    } else if (config.method === 'get') {
        config.params = {
            _t: Date.parse(new Date()) / 1000,
            ...config.params
        }
    }

    return config
}, error => {

    //store.dispatch('common/set_loading', false);
    loadingCount = 0;

    Promise.reject(error)
});
// 添加respone拦截器--拦截响应
http.interceptors.response.use(
    response => {
        endLoading();
        if (response.status == 200) {  //http请求OK
            if (response.data.code == 200) {  //业务code OK
                return Promise.resolve(response.data) //直接返回data字段中的数据
            } else {
                Message.error(response.data.message);
                return Promise.reject(response)
            }
        } else {
            Message.error(response.data.message);
            return Promise.reject(response)
        }
    },
    error => {
        //store.dispatch('common/set_loading', false);
        loadingCount = 0;

        let errorMessage = error.message;

        if (error.response) {
            console.log(error.response.status);
            switch (error.response.status) {
                case 401:
                    console.log(401);
                    localStorage.removeItem('token');
                    router.push({path: '/login'});
                    errorMessage = "token值无效，请重新登录";
                    break;
                case 403:
                    console.log(403);
                    break;
                case 404:
                    console.log(404);
                    break;
                case 500:
                    console.log(500);
                    break;
                default:
                    errorMessage = "请求失败";
                    break;
            }
        }
        Message.error(errorMessage);
        return Promise.reject(error.response)
    }
);

function get(url, params = {}, options = {}) {
    return http({
        url,
        method: 'GET',
        headers: {
            'Authorization': localStorage.getItem('token')
        },
        params,
        options
    })
}

//封装post请求
function post(url, data = {}, options = {},callback=()=>{}) {
    return http({
        url,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': localStorage.getItem('token')
        },
        data,
        options,
        //文件上传显示进度条
        onUploadProgress(processEvent) {
            if (processEvent.lengthComputable) {
                callback(parseInt((processEvent.loaded / processEvent.total * 100).toFixed(0)));
            }
        },
    })
}

export default {
    get, post
};
