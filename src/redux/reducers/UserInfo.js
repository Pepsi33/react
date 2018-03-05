/**
 *  用户登录等操作管理
 */

import { hashHistory } from 'react-router';
import UserManager from '../../axios/UserManager';
import { message } from 'antd';


//设置用户登录信息
export const setUserInfo = (data) => {
	var userInfo = JSON.stringify(data);
	window.sessionStorage.setItem("userInfo", userInfo);
}

//获取用户登录信息
export const getUserInfo = () => {
	return JSON.parse(window.sessionStorage.getItem("userInfo")) || {};
}

//清除用户登录信息
export const clearUserInfo = () => {
	window.sessionStorage.clear();
}

export const checkAuth = () => {
	var isLogin = getUserInfo().isLogin;
	if (!isLogin) {
		hashHistory.push('/login');
	}
}

//登录
export const login = (state) => UserManager.login(state).then((res) => {
  console.info('login=>', res);

  if (res.status === 200) {
    if (res.data !== "") {
		setUserInfo(state);
      	hashHistory.push('/reportCenter/index');
    }
  } else {
    message.warning(res.data);
    return;
  }
}).catch((err) => {
  message.error(err);
  console.log(err);
});


//退出
export const layout = (data) => {
	clearUserInfo();
	hashHistory.push('/login');
}


const initStates = {
	userName: "",
	isLogin: false
}

const UserInfo = (state = initStates, action) => {
  switch (action.type) {
    case 'SET_USERINFO':
        state.isLogin = true;
		state.userName = action.data.userName;
      	setUserInfo(state);
		return state;
	case 'GET_USERINFO':
		return state;
	case 'USER_LOGIN':
		state.isLogin = true;
		state = Object.assign({}, state, action.data);
		login(state);
		return state;
    case 'USER_LAYOUT':
      	state.isLogin = false;
      	layout();
      	return state;
    default:
      return state
  }
}

export default UserInfo
