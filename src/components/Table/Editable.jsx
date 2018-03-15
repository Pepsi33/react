import React from 'react';
import { Table,Popconfirm } from 'antd';
import { EditInputCell, EditSelectCell } from './TableCell';
import data from './RptSelectData';
import { setRptParamsData as setPmData } from '../../redux/actions';
import store from '../../redux/store';

class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            RptPmData:[]
        }
        this.columns = [{
                title: '参数ID',
                dataIndex: 'paraid',
                width:100,
                fixed:'left'
            }, {
                title: '报表参数显示名',
                dataIndex: 'paraname',
                width:120,
                fixed: 'left'
            }, {
                title: '参数值取值方式',
                dataIndex: 'paratype',
                width:250,
                render: (text, record) => this.renderSelect(data.paratype,text, record, 'paratype'),
            }, {
                title: '取值参数源对象',
                dataIndex: 'paravalsrc',
                width:150,
                render: (text, record) => this.renderInput(text, record, 'paravalsrc'),
            }, {
                title: '参数值选择方式',
                dataIndex: 'parseltype',
                width: 150,
                render: (text, record) => this.renderSelect(data.parseltype, text, record, 'parseltype'),
            }, {
                title: '关联参数',
                dataIndex: 'relparaid',
                width: 150,
                render: (text, record) => this.renderInput(text, record, 'relparaid'),
            }, {
                title: '缺省参数值',
                dataIndex: 'defaultval',
                width: 150,
                render: (text, record) => this.renderInput(text, record, 'defaultval'),
            }, {
                title: '缺省参数显示名',
                dataIndex: 'defaultnam',
                width: 150,
                render: (text, record) => this.renderInput(text, record, 'defaultnam'),
            }, {
                title: '字段占用列数',
                dataIndex: 'fieldcolsp',
                width: 100,
                render: (text, record) => this.renderInput(text, record, 'fieldcolsp'),
            }, {
                title: '控件行数',
                dataIndex: 'ctrrows',
                width: 100,
                render: (text, record) => this.renderInput(text, record, 'ctrrows'),
            }, {
                title: '控件列数',
                dataIndex: 'ctrcols',
                width: 100,
                render: (text, record) => this.renderInput(text, record, 'ctrcols'),
            }, {
                title: '参数名表格宽度',
                dataIndex: 'tdnamwidth',
                width: 120,
                render: (text, record) => this.renderInput(text, record, 'tdnamwidth'),
            }, {
                title: '控件表格宽度',
                dataIndex: 'tdctrwidth',
                width: 100,
                render: (text, record) => this.renderInput(text, record, 'tdctrwidth'),
            }, {
                title: '预留字段',
                dataIndex: 'reserved',
                width: 150,
                render: (text, record) => this.renderInput(text, record, 'reserved'),
            }, {
                title: '备注',
                dataIndex: 'remark',
                width: 200,
                render: (text, record) => this.renderInput(text, record, 'remark'),
            }, {
                title: '操作',
                dataIndex: 'operation',
                width: 100,
                fixed: 'right',
                render: (text, record) => {
                    const { editable } = record;
                    return (
                        <div className="editable-row-operations">
                            {
                                editable ?
                                    <span>
                                        <a onClick={() => this.save(record.key)}>保存</a>
                                        <Popconfirm title="确定取消?" onConfirm={() => this.cancel(record.key)}>
                                            <a>取消</a>
                                        </Popconfirm>
                                    </span>
                                    : <a onClick={this.edit.bind(this,record.key)}>编辑</a>
                            }
                        </div>
                    );
                },
        }];
    }
    componentWillMount(){
        console.log(store);    
    }
    componentWillReceiveProps(props){
        store.dispatch(setPmData(props.dataSource));
        this.setState({
            RptPmData: props.dataSource
        });
        this.cacheData = this.state.RptPmData.map(item => ({ ...item }));
    }
    renderInput(text, record, column) {
        return (
            <EditInputCell
                editable={record.editable}
                value={text}
                onChange={value => this.onInputChange(value, record.key, column)}
            />
        );
    }
    onInputChange = (value,key,column) => {
        const newData = [...this.state.RptPmData];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            target[column] = value;
            this.setState({ RptPmData: newData });
        }
    }
    renderSelect(data=[],text, record,column) {
        const target = data.filter(item => text === item.id)[0];
        return (
            <EditSelectCell
                editable={record.editable}
                data={data}
                defaultValue={text?target.text:text}
                value={text?target.text:text}
                onChange={value => this.onSelectChange(value, record.key, column)}
            />
        );
    }
    onSelectChange = (value, key, column) =>{
        const newData = [...this.state.RptPmData];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            target[column] = value;
            this.setState({ RptPmData: newData });
        }
    }
    //编辑
    edit = (key) => {
        const newData = [...this.state.RptPmData];
        const target = this.state.RptPmData.filter(item => key === item.key)[0];
        if (target) {
            target.editable = true;
            this.setState({ RptPmData: newData });
        }
    }
    //保存
    save = (key) => {
        const newData = [...this.state.RptPmData];
        const target = this.state.RptPmData.filter(item => key === item.key)[0];
        if (target) {
            delete target.editable;
            this.setState({ RptPmData: newData });
            this.cacheData = newData.map(item => ({ ...item }));
            store.dispatch(setPmData(this.state.RptPmData));
        }
    }
    //取消
    cancel = (key) => {
        const newData = [...this.state.RptPmData];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
            delete target.editable;
            this.setState({ RptPmData: newData });
        }
    }
    render() {
        return <Table 
                    style={{ display: this.state.RptPmData.length?"block":"none"}}
                    bordered 
                    dataSource={this.state.RptPmData} 
                    columns={this.columns} 
                    scroll={{x:2200}}
                    title={() => <h2>{this.props.title}</h2>}
                />;
    }
}

export default EditableTable;