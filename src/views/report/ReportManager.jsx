
import React from 'react';
import { Table, Button, Modal,message } from 'antd';
import { WrappedAdvancedSearchForm } from '../../components/Form/SearchForm';
import RptManagerHttp from '../../axios/RptManagerHttp';
import { openWindow } from '../../utils/index';
const confirm = Modal.confirm;


class reportManagerTable extends React.Component {
    state = {
        loading: true,
        selectedRowKeys: [],
        pagination: {
            defaultCurrent: 1,
            showSizeChanger: true,
            showTotal: (total, range) => `总共 ${Math.ceil(Number(total) / Number(range[1]))} 页,当前第 ${range[0]} 页`,
            onShowSizeChange: (current, pageSize) => {
                console.log("onShowSizeChange", this.state)
                this.getReportList({ pageNo: current, limit: pageSize });
            }
        },
        dataSource: [],
        formItemData:[{
            id: "report_Id",
            label: "报表ID",
            placeholder: "请输入要查询的报表ID"
        }, {
            id: "report_Name",
            label: "报表名称",
            placeholder: "请输入要查询的报表名称"
        }]
    };
    componentWillMount() {
        this.getData();
    }
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }
    columns = [{
        title: '报表ID',
        dataIndex: 'rptid',
        key: "rptid"
    },{
        title: '报表名称',
        dataIndex: 'rpttitle',
        key: "rpttitle",
        render: (text, record) => {
            let url = `#/report/detail/${record.rptid}`;
            return <a className="title" href={url} target="_blank">{text}</a>
            //return <Link to={{ pathname: url, state: {} }}><Button>直接跳转</Button></Link>
        },
    }, {
        title: '报表文件名',
        dataIndex: 'rptfilename',
        key: "rptfilename"
    }, {
        title: '数据源',
        dataIndex: 'datasource',
        key: "datasource"
    }, {
        title: '操作',
        dataIndex: 'action',
        key: "action",
        render: (text, record) => (
            <div className="bt-warp">
                <Button type="primary" title="报表查询" onClick={openWindow.bind(this, `http://192.168.71.121:8080/reportcenter/report/queryReport.do?rptid=${record.rptid}`)}>查询</Button>
                <Button type="danger" onClick={this.deleteReport.bind(this,record.rptid)}>删除</Button>
            </div>
        )
    }]
    //分页事件
    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager
        });
        console.log(this.state)
        this.getData({
            limit: pagination.pageSize,
            pageNo: pagination.current
        })
    }
    //获取数据
    getData = (params = {}) => {
        this.setState({ loading: true });
        RptManagerHttp.getReportManagerList(params).then((res) => {
            console.info('getReportManagerList=>', res);
            const pagination = { ...this.state.pagination }
            pagination.total = res.data.total;
            pagination.current = res.data.pageNo;

            res.data.items.forEach((v, i) => {
                v.key = i;
            });

            this.setState({
                dataSource: res.data.items,
                loading: false,
                pagination
            });
        }).catch((err) => {
            console.log(err);
        });
    }
    //删除
    deleteReport = (rptid) => {
        const _this = this;
        confirm({
            title: '系统提示',
            content: '确定要删除此报表吗?',
            okType: 'danger',
            onOk() {
                RptManagerHttp.deleteReport(rptid).then((res) => {
                    message.success("删除成功！");
                    _this.getData();
                }).catch((err) => {
                    console.log(err);
                })
            },
            onCancel() {
                console.log('Cancel');
            },
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
            <div>
                <WrappedAdvancedSearchForm 
                    formItemData = {this.state.formItemData}
                    queryReport = {this.getData}
                />
                <div style={{marginBottom:"10px"}}>
                    <Button type="primary" size="large" onClick={openWindow.bind(this,"#/addReport")}>新增</Button>
                    <Button type="primary" size="large" onClick={openWindow.bind(this,"http://192.168.71.121:8080/reportcenter/report/reportRpqueueList.do")}>多报表订阅</Button>
                </div>
                <div className="search-result-list">
                    <Table
                        rowSelection={rowSelection}
                        columns={this.columns}
                        dataSource={this.state.dataSource}
                        loading={this.state.loading}
                        bordered={true}
                        pagination={this.state.pagination}
                        onChange={this.handleTableChange}
                    />
                </div>
                <Modal/>
            </div>        
        );
    }
}

export default reportManagerTable;