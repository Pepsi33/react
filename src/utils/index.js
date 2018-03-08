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

//校验用户
export const checkAuth = () => {
    var isLogin = getUserInfo().isLogin;
    if (!isLogin){
        hashHistory.push('./login');
    }
}

//获取url参数
export const queryString = () => {
    let _queryString = {};
    const _query = window.location.search.substr(1);
    const _vars = _query.split('&');
    _vars.forEach((v, i) => {
        const _pair = v.split('=');
        if (!_queryString.hasOwnProperty(_pair[0])) {
            _queryString[_pair[0]] = decodeURIComponent(_pair[1]);
        } else if (typeof _queryString[_pair[0]] === 'string') {
            const _arr = [_queryString[_pair[0]], decodeURIComponent(_pair[1])];
            _queryString[_pair[0]] = _arr;
        } else {
            _queryString[_pair[0]].push(decodeURIComponent(_pair[1]));
        }
    });
    return _queryString;
};

//获取根路径
export const getRootPath = () => {

    let curWwwPath = window.document.location.href,
        pathName = window.document.location.pathname,
        pos = curWwwPath.indexOf(pathName),
        localhostPaht = curWwwPath.substring(0, pos),
        projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1),
        RootPath = localhostPaht + projectName;

        return RootPath;
}

//新开页面
export const openWindow = (url,target) => {
    window.open(url, target ? target:"_blank");
}