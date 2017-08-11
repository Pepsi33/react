
import axios from "axios";
import { hashHistory } from 'react-router';
import store from '../redux/store';
import { isLogin } from '../redux/actions';



export const login = (data) => axios.post('http://localhost:9000/api/login',data).then(function(res){
            console.log('login: ',res)
            if(res.data.success){
                sessionStorage.setItem("access_token",res.data.token);
                store.dispatch(isLogin(data));      //存儲數據
                hashHistory.push('/app/index');
            }else{
                return;
            }
        }).catch(function(err){
          console.log(err);
        });

export const loginByFetch = (data) => {
        fetch('http://localhost:9000/api/login', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(function(res) {
            console.log(res)
            if (res.ok) {
              console.log('request succeeded with JSON response', data);
              store.dispatch(isLogin(data));
              hashHistory.push('/app/index')          //跳转到home
            } else if (res.status == 401) { //处理http状态码
              alert("unauthorized");
            }
        }).catch(function(error) {
            console.log('request failed', error)
        })
    };


export const getAuthorization = (token) => {
    var instance = axios.create({
      baseURL:"http://localhost:9000/api",
      timeout:1000,
      headers:{
        'content-Type':'appliction/x-www-form-urlencoded',
        'Authorization':token
      }
    });

    instance.get('user/user_info').then(function(res){
        console.log('user/user_info: ',res)
        if(res.data.success){
            sessionStorage.setItem("username",res.data.username);
            store.dispatch(isLogin(res.data));
        }else{
            hashHistory.push('/login');
        }    
    }).catch(function(err){
      console.log(err);
    });

}





