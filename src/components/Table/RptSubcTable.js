import React from 'react';
import { Form, Input, Button, message, Table} from 'antd';


class RptSubcTable extends React.Component {
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
                    <Button type="danger">删除</Button>
                </div>
            )
        }]
    }
    render(){
        return  <div>
                    <Table
                        style={{ display: this.props.dataSource.length ? "block" : "none" }}
                        columns={this.columns}
                        dataSource={this.props.dataSource}
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

export default RptSubcTable