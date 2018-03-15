
import React from 'react';
import { Table, Button,Modal, message } from 'antd';
//import { Link } from 'react-router';

import RptQueueHttp from '../../axios/RptQueueHttp';
import '../../style/less/reportRpqueue.less';
import { openWindow } from '../../utils/index';
const confirm = Modal.confirm;

class SelectTable extends React.Component {
    state = {
        loading:true,
        selectedRowKeys: [],
        pagination:{
            defaultCurrent:1,
            showSizeChanger:true,
            showTotal: (total, range) => `总共 ${Math.ceil(Number(total) / Number(range[1]))} 页,当前第 ${range[0]} 页`,
            onShowSizeChange: (current, pageSize) => {
                console.log("onShowSizeChange", this.state)
                this.getReportList({ pageNo: current, limit: pageSize });
            }
        },
        dataSource:[]
    };
    componentWillMount(){
        this.getReportList();
    }
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
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
    //获取数据
    getReportList = (params ={}) => {
        this.setState({ loading:true });
        RptQueueHttp.getRpqueueAuditingList(params).then((res) => {
            console.info('getReportList=>', res);
            const pagination = { ...this.state.pagination }
            pagination.total = res.data.total;
            //pagination.current = res.data.pageNo;

            res.data.items.forEach((v,i) => {
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
    //报表推送
    reportPush = (record) => {
        const _this = this;
        let tips = (record.bccaddressExternal || record.ccaddressExternal || record.msaddressExternal) ?"报表队列包含外部收件人,请确定要手动推送吗?":"手动推送报表"; 
        confirm({
            title: '系统提示',
            content: tips,
            okType: 'danger',
            onOk() {
                RptQueueHttp.pushReport(record.schid).then((res) => {
                    if (res.data.code === "0") {
                        message.success("推送正在受理中，请稍后查看邮件!");
                        _this.getReportList();
                    } else {
                        message.error("推送失败");
                    }
                }).catch((err) =>{
                    console.error(err);
                    message.error("推送失败");
                }) 
            },
            onCancel() {
                console.log('Cancel');
            },
        });    
    }
    //启动或取消自动推送
    autoPushOrCancel = (record) => {
        let _this = this,tips = "", cb_tips = "";
        if (record.stat !== "1"){
            tips = (record.bccaddressExternal || record.ccaddressExternal || record.msaddressExternal) ? "报表队列包含外部收件人,启动自动推送外部收件人将收不到邮件！请确定要启动吗?" : "启动报表自动推送";
            cb_tips = "启动报表自动推送成功!";
        }else{
            tips = "取消报表自动推送";
            cb_tips = "取消报表自动推送成功!";
        }
        
        confirm({
            title: '系统提示',
            content: tips,
            okType: 'danger',
            onOk() {
                RptQueueHttp.autoPushOrCancel(record).then((res) => {
                    message.success(cb_tips);
                    _this.getReportList();
                }).catch((err) => {
                    console.error(err);
                    message.error(cb_tips);
                })
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    columns = [{
        title: '邮件标题',
        dataIndex: 'mstitle',
        key: "mstitle",
        render: (text, record) => {
            let url = `http://192.168.71.121:8080/reportcenter/report/reportRpqueueList.do?schid=${record.schid}`;
            return <a className="title" href={url} target="_blank">{text}</a>
            //return <Link to={{ pathname: url, state: {} }}><Button>直接跳转</Button></Link>
        },
    }, {
        title: '创建者',
        dataIndex: 'cman',
        key: "cman"
    }, {
        title: '订阅日期',
        dataIndex: 'mdate',
        key: "mdate"
    }, {
        title: '调度状态',
        dataIndex: 'stat',
        key: "stat",
        render: stat => {
            return stat === "1" ? "已启动" : "待启动";
        }
    }, {
        title: '操作',
        dataIndex: 'handle',
        key: "handle",
        render: (text, record) => (
            <div className="bt-warp">
                <Button type="primary" onClick={this.reportPush.bind(this, record)} title="手动推送">推送</Button>
                <Button type="primary" onClick={openWindow.bind(this, `http://192.168.71.121:8080/reportcenter/reportRpqueue/reportExecuteDetail.do?schid=${record.schid}`)} title="报表执行明细">明细</Button>
                <Button type="primary" onClick={this.autoPushOrCancel.bind(this, record)} title={record.stat === "1" ? "取消启动" : "启动"}>{record.stat === "1" ? "取消启动" : "启动"}</Button>
            </div>
        )
    }];
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
                columns={this.columns} 
                dataSource={this.state.dataSource} 
                loading={this.state.loading} 
                bordered={true}
                pagination={this.state.pagination}
                onChange={this.handleTableChange}
                title={() =><h2>报表中心报表订阅审核</h2>}
            />
        );
    }
}

export default SelectTable;