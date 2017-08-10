/**
 * Created by hao.cheng on 2017/4/13.
 */
import React, { Component } from 'react';
import { Menu, Icon, Layout, Badge } from 'antd';
import screenfull from 'screenfull';
import store from '../../redux/store';
import SysSettingModal from './SysSetting';
import { isLayout } from '../../redux/actions';
import { hashHistory,Link } from 'react-router';
/*import { gitOauthToken, gitOauthInfo } from '../axios';
import { queryString } from '../utils';*/
import avater from '../../style/img/wk.jpg';
const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Headerbar extends Component {
    state = {
        visible:false
    }
    showModal = () => {
        this.setState({
          visible: true
        });
    }
    handleModal = () => {
        this.setState({
          visible: false,
        });
    }
    componentWillMount() {
        var user = store.getState();
        this.setState({
            user: user.userName
        });
    };
    screenFull = () => {
        if (screenfull.enabled) {
            screenfull.request();
        }
    }
    layout = () => {
        console.log(store.getState())
        store.dispatch(isLayout());
        hashHistory.push('/login');
    }
    render() {
        console.log(this.state)
        return (
            <Header style={{ background: '#fff', padding: 0 }} className="custom-theme">
                <Icon
                    className="trigger"
                    type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.props.toggle}
                />
                <Menu
                    mode="horizontal"
                    style={{ lineHeight: '64px', float: 'right', marginRight:'20px',height:'65px' }}
                >
                    <Menu.Item key="full" onClick={this.screenFull} >
                        <Icon type="arrows-alt" onClick={this.screenFull} />
                    </Menu.Item>
                    <Menu.Item key="1">
                        <Badge count={25} overflowCount={10} style={{marginLeft: 10}}>
                            <Icon type="notification" />
                        </Badge>
                    </Menu.Item>
                    <SubMenu title={<span className="avatar"><img src={avater} alt="头像" /><i className="on bottom b-white" /></span>}>
                        <MenuItemGroup title="用户中心">
                            <Menu.Item key="setting:1">你好 - {this.state.user}</Menu.Item>
                            <Menu.Item key="setting:2">个人信息</Menu.Item>
                        </MenuItemGroup>
                        <MenuItemGroup title="设置中心">
                            <Menu.Item key="setting:3">个人设置</Menu.Item>
                            <Menu.Item key="setting:4">
                                <Link onClick={this.showModal}><span>系统设置</span></Link>
                            </Menu.Item>
                            <Menu.Item key="setting:5">
                                <Link to={'/login'} onClick={this.layout}><span>退出</span></Link>
                            </Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>
                </Menu>
                <SysSettingModal visible={this.state.visible} handleModal={this.handleModal}/>
                <style>{`
                    .ant-menu-submenu-horizontal > .ant-menu {
                        width: 120px;
                        left: -40px;
                    }
                `}</style>
            </Header>
        )
    }
}

export default Headerbar;


