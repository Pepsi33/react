import React, { Component } from 'react';
import store from './redux/store';
import Siderbar from './components/common/Siderbar';
import Headerbar from './components/common/Headerbar';
import './style/main.less';
import { Layout } from 'antd';
const { Content, Footer } = Layout;

class App extends Component {
  componentWillMount() {
      //this.checkAuth();
      console.log("app",store.getState())
  }
  state = {
    collapsed: false,
  }
  componentDidMount() {
	  //console.info("getState",store.getState())
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
          <Layout style={{ overflow: "auto" }}>
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff'}}>
              {this.props.children}
			</Content>
			<Footer style={{ textAlign: "center" }}>报表中心平台</Footer>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default App;
