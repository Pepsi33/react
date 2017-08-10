
import React from 'react';
//import { hashHistory } from 'react-router';
import { login } from '../../axios/index';
import '../../style/login.less';
import { isLayout } from '../../redux/actions';
import store from '../../redux/store';
import { Form, Icon, Input, Button, Checkbox,Alert } from 'antd';
const FormItem = Form.Item;

class Login extends React.Component {
    _login = login;
    state = {
        alert:{
             message:"success",        //success、info、warning、error
             type:"success",
             showIcon:true,
        }
    }
    componentWillMount() {
        store.dispatch(isLayout());
        console.log(store.getState())
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this._login(values,this.loginSuccessTip);
            }
        });
    }
    gitHub = () => {
        window.location.href = 'https://github.com/login/oauth/authorize?client_id=792cdcd244e98dcd2dee&redirect_uri=http://localhost:3006/&scope=user&state=reactAdmin';
    }
    loginSuccessTip = (msg,cb) => {
        console.log(msg)
        this.setState = {
            alert:{
                message:msg,        
                type:"success",            //success、info、warning、error
                showIcon:true,
            }
        }
        console.log("loginSuccessTip: ",this.state)
        cb&&cb();

    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className>
                <Alert 
                    message={this.state.alert.message} 
                    type={this.state.alert.type} 
                    showIcon={this.state.alert.showIcon} />
                <div className="login">
                    <div className="login-form" >
                        <div className="login-logo">
                            <span>React</span>
                        </div>
                        <Form onSubmit={this.handleSubmit} style={{maxWidth: '300px'}}>
                            <FormItem>
                                {getFieldDecorator('userName', {
                                    rules: [{ required: true, message: '请输入用户名!' }],
                                })(
                                    <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: '请输入密码!' }],
                                })(
                                    <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                })(
                                    <Checkbox>记住我</Checkbox>
                                )}
                                <a className="login-form-forgot" href="" style={{float: 'right'}}>忘记密码</a>
                                <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                                    登录
                                </Button>
                                或 <a href="">现在就去注册!</a>
                                <p>
                                    <Icon type="github" onClick={this.gitHub} />(第三方登录)
                                </p>
                            </FormItem>
                        </Form>
                    </div>
                </div>
            </div>    
        );
    }
}

export default Form.create()(Login);