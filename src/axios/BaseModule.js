import qs from "qs";
import axios from 'axios';
import { message } from 'antd';
import Routers from '../routes/index';


// 添加请求拦截器
axios.interceptors.request.use(
    config => {

        // 若是有做鉴权token , 就给头部带上token
        if (localStorage.token) {
            config.headers.Authorization = localStorage.token;
        }

        return config;
    },
    error => {
        message.error(error);
        return Promise.reject(error.data.error.message);
    }
);

// 添加响应拦截器
axios.interceptors.response.use(
    res => {
        //对响应数据做些事
        if (res.data && !res.data.success) {
            message(
                res.data.error.message.message
                    ? res.data.error.message.message
                    : res.data.error.message);
            return Promise.reject(res.data.error.message);
        }
        return res;
    },
    error => {
        // 用户登录的时候会拿到一个基础信息,比如用户名,token,过期时间戳
        // 直接丢localStorage或者sessionStorage
        if (!window.localStorage.getItem("token")) {
            // 若是接口访问的时候没有发现有鉴权的基础信息,直接返回登录页
            Routers.push({
                path: "/login"
            });
        } else {
            // 若是有基础信息的情况下,判断时间戳和当前的时间,若是当前的时间大于服务器过期的时间
            // 乖乖的返回去登录页重新登录
            let lifeTime =
                JSON.parse(window.localStorage.getItem("token")).lifeTime *1000;
            let nowTime = new Date().getTime(); // 当前时间的时间戳
            console.log(nowTime, lifeTime);
            console.log(nowTime > lifeTime);
            if (nowTime > lifeTime) {
                message('登录状态信息过期,请重新登录');
                Routers.push({
                    path: "/login"
                });
            } else {
                // 下面是接口回调的satus ,因为我做了一些错误页面,所以都会指向对应的报错页面
                if (error.response.status === 403) {
                    Routers.push({
                        path: "/error/403"
                    });
                }
                if (error.response.status === 500) {
                    Routers.push({
                        path: "/error/500"
                    });
                }
                if (error.response.status === 404) {
                    Routers.push({
                        path: "/error/404"
                    });
                }
            }
        }
        // 返回 response 里的错误信息
        let errorInfo = error.data.error ? error.data.error.message : error.data;
        return Promise.reject(errorInfo);
    }
);


class BaseModule {
    constructor() {
        this.$http = axios.create({
            baseURL: "/", // 因为我本地做了反向代理
            timeout: 10000,
            responseType: "json",
            withCredentials: true
        })
        this.dataMethodDefaults = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            transformRequest: [function (data, headers) {
                if (headers['Content-Type'] === 'application/x-www-form-urlencoded') {
                    // 针对application/x-www-form-urlencoded对data进行序列化
                    return qs.stringify(data)
                } else {
                    return data
                }
            }]
        }
    }

    get(url, config = {}) {
        return this.$http.get(url, config)
    }

    post(url, data = undefined, config = {}) {
        return this.$http.post(url, data, { ...this.dataMethodDefaults, ...config })
    }

    put(url, data = undefined, config = {}) {
        return this.$http.put(url, data, { ...this.dataMethodDefaults, ...config })
    }

    delete(url, config = {}) {
        return this.$http.delete(url, config)
    }
}

export default BaseModule