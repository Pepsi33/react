
import React from 'react';
import { Table, Button } from 'antd';
//import { Link } from 'react-router';

import Http from '../../axios/index';
import '../../style/less/reportRpqueue.less';

const columns = [{
    title: '邮件标题',
    dataIndex: 'mstitle',
    key:"mstitle",
    render:(text,record) => {
        let url = `http://192.168.71.121:8080/reportcenter/report/reportRpqueueList.do?schid=${record.schid}`;
        return <a href={url} target="_blank">{text}</a>
        //return <Link to={{ pathname: url, state: {} }}><Button>直接跳转</Button></Link>
    },
}, {
    title: '创建者',
    dataIndex: 'cman',
        key:"cman"
}, {
    title: '订阅日期',
    dataIndex: 'mdate',
    key:"mdate"
},{
    title: '调度状态',
    dataIndex: 'stat',
    key:"stat",
    render:stat => {
        return stat === "1"?"已启动":"待启动";
    }
},{
    title: '操作',
    dataIndex: 'handle',
    key:"handle",
    render:(text,record) =>(
        <div className="bt-warp">
            <Button type="primary" title="启动">启动</Button>
            <Button type="primary" title="手动推送">推送</Button>
            <Button type="primary" title="报表执行明细">明细</Button>
        </div>
    )
}];

class SelectTable extends React.Component {
    state = {
        loading:true,
        selectedRowKeys: [],
        pagination:{},
        data:[]
    };
    componentWillMount(){
        this.getReportList();
    }
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };
    //pageSize 变化的回调
    onShowSizeChange(current, pageSize) {
        console.log("onShowSizeChange",this.state)
        this.getReportList({ pageNo: current, limit: pageSize });
    }
    //分页事件
    handleTableChange = (pagination,filters,sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({ 
            pagination:pager 
        });
        console.log(this.state)
        this.getReportList({
            limit: pagination.pageSize,
            pageNo: pagination.current
        })
    }
    showTotal = (total, range) => {
        return <span>总共`${total}`页,当前第`${range}`页</span>;
    }
    //获取数据
    getReportList = (params ={}) => {
        this.setState({ loading:true });
        Http.getReportList(params).then((res) => {
            console.info('getReportList=>', res);
            const pagination = { ...this.state.pagination }
            pagination.total =  res.data.total;
            //pagination.current = res.data.pageNo;

            var data = res.data.items.forEach((v,i) => {
                v.key = i;
            });
            
            this.setState({
                dataSource:res.data.items,
                loading: false,
                pagination
            });
        }).catch((err) => {
            console.log(err);
        });
    }
    render() {
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            selections: [{
                key: 'odd',
                text: '选择奇数列',
                onSelect: (changableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                        if (index % 2 !== 0) {
                            return false;
                        }
                        return true;
                    });
                    this.setState({ selectedRowKeys: newSelectedRowKeys });
                },
            }, {
                key: 'even',
                text: '选择偶数列',
                onSelect: (changableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                        if (index % 2 !== 0) {
                            return true;
                        }
                        return false;
                    });
                    this.setState({ selectedRowKeys: newSelectedRowKeys });
                },
            }],
            onSelection: this.onSelection,
        };
        return (
            <Table 
                rowSelection={rowSelection} 
                columns={columns} 
                dataSource={this.state.dataSource} 
                loading={this.state.loading} 
                bordered={true}
                showQuickJumper={true}
                showSizeChanger={true}
                pagination={this.state.pagination}
                onChange={this.handleTableChange}
                onShowSizeChange={this.onShowSizeChange}
                showTotal={this.showTotal}
                title={() =><h2>报表中心报表订阅审核</h2>}
            />
        );
    }
}

export default SelectTable;