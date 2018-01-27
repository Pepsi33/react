import React, { Component } from 'react';
import { Layout } from 'antd';
import { menus } from '../../constants/menus';
import SiderMenu from './SiderMenu';

import '../../style/siderbar.less';

const { Sider } = Layout;



class Siderbar extends Component{
    state = {
        collapsed: false,
        mode: 'inline',
        openKey: '',
        selectedKey: ''
    };
    componentDidMount() {
        //this.setMenuOpen(this.props);
    }
    componentWillReceiveProps(nextProps) {
        console.log('----nextProps-----')
        console.log(nextProps);
        this.onCollapse(nextProps.collapsed);
        //this.setMenuOpen(nextProps)
    }
    setMenuOpen = props => {
        const {path} = props;
        this.setState({
            openKey: path.substr(0, path.lastIndexOf('/')),
            selectedKey: path
        });
    };
    onCollapse = (collapsed) => {
        console.log("collapsed:"+collapsed);
        this.setState({
            collapsed,
            mode: collapsed ? 'vertical' : 'inline',
        });
    };
    menuClick = e => {
        this.setState({
            selectedKey: e.key
        });

    };
    openMenu = v => {
        console.log(v);
        this.setState({
            openKey: v[v.length - 1]
        })
    };
    render() {
        return (
            <Sider
                trigger={null}
                breakpoint="lg"
                collapsed={this.props.collapsed}
                style={{overflowY: 'auto'}}
            >
                <div className="logo">
                    <span>{ this.state.collapsed ? "报表中心" :"报表中心平台"}</span>
                </div>
                <SiderMenu
                    menus={menus}
                    onClick={this.menuClick}
                    theme="dark"
                    mode={this.state.mode}
                    selectedKeys={[this.state.selectedKey]}
                    openKeys={[this.state.openKey]}
                    onOpenChange={this.openMenu}
                />
            </Sider>
        )
    }
}

export default Siderbar;