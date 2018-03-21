import React from 'react';
import { Input, Button, message, Table} from 'antd';
import { connect } from 'react-redux';

import { deleteSelectedData as delSelected } from '../../redux/actions';

class RptSubscibeTable extends React.Component {
    constructor(props){
        super(props)
        this.columns = [{
            title: '报表ID',
            dataIndex: 'rptid',
            key: "rptid"
        }, {
            title: '报表名称',
            dataIndex: 'rpttitle',
            key: "rpttitle",
            render: (text, record) => {
                return <span className="title">{text}</span>
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
                    <Button type="primary" title="参数配置">配置</Button>
                    <Button type="danger" onClick={this.props.delete.bind(this,record.key)}>删除</Button>
                </div>
            )
        }]
    }
    componentWillMount(){
        console.log(this.props)
    }
    componentWillReceiveProps(props){
        console.log(props)
    }
    delete = (record) => {
        this.props.dispatch(delSelected(record.key))
    }
    render(){
        const { selectedRows } = this.props.ReportS
        return  <div>
                    <Table
                        style={{ display: selectedRows.length? "block" : "none" }}
                        columns={this.columns}
                        dataSource={selectedRows}
                        bordered={true}
                    />
                    <style>{`
                        .bt-warp{
                            display: flex;
                            align-content: space-between;
                        }
                    `}</style>
                </div>
    }
}

const mapStateToProps = (state) => {
    return {
        ReportS: state.ReportS
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        delete: (key) => {
            console.log(key)
            dispatch(delSelected(key))
        }
    }
}

const RptSubcTable = connect(
    mapStateToProps,
    mapDispatchToProps
)(RptSubscibeTable)

export default RptSubcTable