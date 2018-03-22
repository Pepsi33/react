import React from 'react';
import { Button, Table} from 'antd';
import { connect } from 'react-redux';
import data from './RptSelectData';
import MyModal from '../../components/Modal/MyModal';
import EditableTable from '../../components/Table/Editable';
import RptSubcibeHttp from '../../axios/RptSubcibeHttp';
import { 
    SubcibeEditInputCell as InputCell, 
    SubcibeEditSelectCell as SelectCell
} from './TableCell';
import { 
    deleteSelectedData as delSelected,
    updateSelectedData as updateSelected,
    setSelectedPmData as setPmdata,
    getSelectedPmData as getPmData               //订阅时获取
 } from '../../redux/actions';

class RptSubscibeTable extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            visible:false,
            dataSource:[]
        }
        this.dataSource = { }
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
        },
        {
            title: '生成文件名',
            dataIndex: 'saveasfilename',
            key: "saveasfilename",
            render: (text, record) => (
                <InputCell
                    value={text}
                    onChange={(value) => this.props.onInputCellChange(value, record.key, 'saveasfilename')}
                />
            )
        }, {
            title: '生成文件类型',
            dataIndex: 'scfiletype',
            key: "scfiletype",
            render: (text, record) => (
                <SelectCell
                    defaultValue={text}
                    options={data.scfiletype}
                    onChange={(value) => this.props.onSelectCellChange(value,record.key, 'scfiletype')}
                />
            )
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
                    <Button type="primary" title="参数配置" onClick={() => this.showModal(record.key)}>配置</Button>
                    <Button type="danger" onClick={() => this.props.delete(record.key)}>删除</Button>
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
    //删除数据
    delete = (record) => {
        this.props.dispatch(delSelected(record.key))
    }
    showModal = (key) => {
        const params = {rptid:key};
        if(!this.dataSource[key]){
            RptSubcibeHttp.getRptPmsDtl(params).then((res) => {
                let dataSource = this.setDataSource(key, res.data);
                    //this.props.setRptPmData(params.rptid, data);           //设置到store
                    this.setState({
                        dataSource
                    })
            }).catch((err) => console.error(err));
        }
        
        this.setState({ visible: true });
    }
    handleCancel = () =>{
        this.setState({
            visible: false
        });
    }
    setDataSource = (key,dataSource) => {
        if (dataSource.length !== 0) {
            dataSource.forEach((v, i) => {
                v.key = i;
                v.editable = false;
            });

            this.dataSource[key] = dataSource;
            return dataSource;
        }
    }
    render(){
        const { selectedRows } = this.props.ReportS
        return  <div>
                    <MyModal
                        visible={this.state.visible}
                        handleOk={this.handleOk}
                        handleCancel={this.handleCancel}
                        title="参数配置"
                        width="80%"
                        Component={<EditableTable type="Subcibe" dataSource={this.state.dataSource}/>}
                    />
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
        delete: (key) => dispatch(delSelected(key)),
        onInputCellChange: (value, key, property) => dispatch(updateSelected(value, key, property)),
        onSelectCellChange: (value, key, property) => dispatch(updateSelected(value, key, property)),
        setRptPmData: (key, PmData) => dispatch(setPmdata(key, PmData)),
        getPmData: (key) => dispatch(getPmData(key))
    }
}

const RptSubcTable = connect(
    mapStateToProps,
    mapDispatchToProps
)(RptSubscibeTable)

export default RptSubcTable