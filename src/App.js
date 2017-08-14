import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { getAuthorization } from './axios/index';
import store from './redux/store';
import { Layout } from 'antd';
import Siderbar from './components/common/Siderbar';
import Headerbar from './components/common/Headerbar';
import './style/main.less';
const { Content, Footer } = Layout;

class App extends Component {
  componentWillMount() {
      this.checkAuth();
      console.log("app",store.getState())
  }
  state = {
    collapsed: false,
  }
  checkAuth = () =>{              
    var token = sessionStorage.getItem("access_token");
    var flage = store.getState().islogin;
    if(token){
      getAuthorization(token);      //验证用户
    }else{
        hashHistory.push('/login')
    }
  }
  componentDidMount() {
    console.log("app",store.getState())
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    return (
      <Layout className="ant-layout-has-sider">
        <Siderbar collapsed={this.state.collapsed} />
        <Layout>
          <Headerbar toggle={this.toggle} collapsed={this.state.collapsed}/>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            {this.props.children}
          </Content>
          <Footer style={{textAlign:"center"}}>react-antd</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default App;
