
import axios from "axios";
import { hashHistory } from 'react-router';
import store from '../redux/store';
import { isLogin } from '../redux/actions';

export const login = (data,cb) =>axios.post('http://localhost:9000/api/login',data).then(function(res){
            let msg = res.data.message;

            if(res.data.success){
                cb(msg,()=>{
                    console.log(this)
                    store.dispatch(isLogin(data));
                    //hashHistory.push('/app/index');
                });
                
            }else{
                cb(msg);
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
              //window.location.href = "/#/app"
            } else if (res.status == 401) { //处理http状态码
              alert("unauthorized");
            }
        }).catch(function(error) {
            console.log('request failed', error)
        })
    };





