import { hashHistory } from 'react-router';

//设置用户登录信息
export const setUserInfo = (data) => {
    var userInfo = JSON.stringify(data);
    window.sessionStorage.setItem("userInfo", userInfo);
}

//获取用户登录信息
export const getUserInfo = () => {
    return JSON.parse(window.sessionStorage.getItem("userInfo"))||{};
}

//清除用户登录信息
export const clearUserInfo = () => {
    window.sessionStorage.clear();
}

export const checkAuth = () => {
    var isLogin = getUserInfo().isLogin;
    if (!isLogin){
        hashHistory.push('./login');
    }
}
