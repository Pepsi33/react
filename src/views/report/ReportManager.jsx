
import React from 'react';
import { Table, Button, Modal,message } from 'antd';
import { WrappedAdvancedSearchForm } from '../../components/Form/SearchForm';
import RptManagerHttp from '../../axios/RptManagerHttp';
import { openWindow } from '../../utils/index';
import store from '../../redux/store';
import { setSelectedData } from '../../redux/actions';
import { unsubscribe } from '../../redux/store';
const confirm = Modal.confirm;


class ReportManagerTable extends React.Component {
    state = {
        loading: true,
        selectedRowKeys: [],
        selectedRows:[],
        pagination: {
            defaultCurrent: 1,
            showSizeChanger: true,
            showTotal: (total, range) => `总共 ${Math.ceil(Number(total) / Number(range[1]))} 页,当前第 ${range[0]} 页`,
            onShowSizeChange: (current, pageSize) => {
                console.log("onShowSizeChange", this.state)
                this.getData({ pageNo: current, limit: pageSize });
            }
        },
        dataSource: []
    };
    componentWillMount() {
        this.getData();
    }
    componentDidMount(){
        console.log("报表管理创建完成")
        unsubscribe()
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
            let t = this.props.type ?<span className="title">{text}</span>:<a className="title" href={url} target="_blank">{text}</a>;
            return t;
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
        className:this.props.type?"hide":"show",
        key: "action",
        render: (text, record) => (
            this.props.type ?null:<div className="bt-warp">
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
                v.key = v.rptid;
            });

            this.setState({
                dataSource: res.data.items,
                //selectedRowKeys:[],
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
    onSelectChange = (selectedRowKeys, selectedRows) => {
        selectedRows.forEach((v,i)=>{v.status="add"})
        this.setState({ selectedRowKeys, selectedRows },()=>{
            console.log(this.state.selectedRows);
            //store.dispatch(setSelectedData(this.state.selectedRows));
        });
        
    }
    render() {
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        };
        return (
            <div>
                <WrappedAdvancedSearchForm 
                    queryReport = {this.getData}
                />
                <div style={{marginBottom:"10px"}} className={this.props.type?"hide":"show"}>
                    <Button type="primary" size="large" onClick={openWindow.bind(this,"#/addReport")}>新增</Button>
                    <Button type="primary" size="large" onClick={() => openWindow("#/setReportSubscibe")}>多报表订阅</Button>
                </div>
                <div className={`search-result-list search-${this.props.type}-list`}>
                    <Table
                        rowSelection={this.props.type?rowSelection:null}
                        columns={this.columns}
                        dataSource={this.state.dataSource}
                        loading={this.state.loading}
                        bordered={true}
                        pagination={this.state.pagination}
                        onChange={this.handleTableChange}
                    />
                </div>
                <Modal/>
                <style>{`
                    .hide{display:none;}
                    .show{display:block;}
                    .search-select-list{
                        max-height:500px;
                        overflow-y:auto;
                    }
                `}    
                </style>
            </div>        
        );
    }
}

export default ReportManagerTable;