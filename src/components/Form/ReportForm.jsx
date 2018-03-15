import React from 'react';
import { Form, Input, Button, Select, Upload, Icon, message } from 'antd';
import { AddReportRqUrl as requestUrl } from "../../axios/RequestUrl";
import EditableTable from '../../components/Table/Editable';
import AddReportHttp from '../../axios/AddReportHttp';
import store from '../../redux/store';

const FormItem = Form.Item;
const Option = Select.Option;

class reportForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            dataSource: [],
            options:[],
        }
    }
    componentWillMount(){
        console.log("props",this.props);
        this.getOptions();
    }
    componentWillReceiveProps(props){
        console.log(props)
        console.log("props", this.props);
    }
    getOptions = () => {
        AddReportHttp.getDataSource().then((res) => {
            //console.log(res);
            var code = res.data.code;
            if (code === "0") {
                this.setState({
                    options: res.data.data
                });
            }
        }).catch(err => console.error(err));
    }
    //提交
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values)

                let target = this.getAddRptParams(values);
                AddReportHttp.addReport(target);
            }
            console.log("this",this);
        });    
    }
    getAddRptParams = (reportInfo) =>{
        let dataSource = store.getState().ReportM.RptPmData;
        console.log("store=>dataSource:", dataSource);
        let target = {
            dataSource,
            reportInfo
        };
        Object.assign(target, this.state);
        console.log(target);

        return target;
    }
    //新增报表
    addReport = (params)=>{
        AddReportHttp.addReport(params).then((res) => {
            var code = res.data.code;
            if (code === '0') {
                message.succss("新增报表成功！");
                //window.close();
            }
        }).catch(err => console.error(err));
    }
    handleSelectChange = (value) => {
        console.log(value);
    }
    //Uploader props
    upload_props = {
        name: 'fileName',
        action: requestUrl.GetRpxParams,
        showUploadList: false
    }
    //上传文件onChange事件
    upload_onChange = (info) => {
        this.props.form.setFieldsValue({
            rptfilename: info.file.name,
            rptfilename_arg: info.file.name.split(".")[0]+"_arg.rpx"
        });
        
        if (info.file.status !== 'uploading') {
            //console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name}文件上传成功！`);
            console.log(info);

            this.setDataSource(info.file.response);
            this.setState({ file: info.file });

        } else if (info.file.status === 'error') {
            message.error(`${info.file.name}文件上传失败！`);
        }
    }
    //上传文件后返回的数据处理
    setDataSource = (dataSource) => {
        if (dataSource.length !== 0) {
            dataSource.forEach((v, i) => {
                v.key = i;
                v.editable = false;
            });

            this.setState({
                dataSource
            });
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const options = this.state.options.map(d => <Option key={d.id}>{d.pathName}</Option>);
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    label="报表名称"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 12 }}
                >
                    {getFieldDecorator('rpttitle', {
                        rules: [{ required: true, message: '报表名称不能为空!' }],
                    })(
                        <Input placeholder="请输入报表名称" />
                        )}
                </FormItem>
                <FormItem
                    label="报表文件名（.rpx文件名）"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 12 }}
                    style={{ marginBottom: "5px" }}
                >
                    {getFieldDecorator('rptfilename', {
                        rules: [{ required: true, message: '报表文件名不能为空!' }],
                    })(
                        <Input placeholder="请输入报表文件名（.rpx文件名）" readOnly />
                        )}
                </FormItem>
                <FormItem
                    wrapperCol={{ span: 12, offset: 5 }}
                >
                    <Upload {...this.upload_props} onChange={this.upload_onChange}>
                        <Button type="primary"><Icon type="upload" />文件上传</Button>
                    </Upload>
                </FormItem>
                <FormItem
                    label="报表参数文件名（*_arg.rpx文件名）"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 12 }}
                >
                    {getFieldDecorator('rptfilename_arg', {
                        rules: [{ required: true, message: '报表参数文件名不能为空!' }],
                    })(
                        <Input placeholder="报表参数文件名（*_arg.rpx文件名）" />
                        )}
                </FormItem>
                <FormItem
                    label="生成文件名"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 12 }}
                >
                    {getFieldDecorator('saveasfilename', {
                        rules: [{ required: true, message: '生成文件名不能为空!' }],
                    })(
                        <Input placeholder="请输入生成文件名" />
                        )}
                </FormItem>
                <FormItem
                    label="报表生成文件类型"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 12 }}
                >
                    {getFieldDecorator('scfiletype', {
                        rules: [{ required: true, message: '请选择报表生成的文件类型' }],
                    })(
                        <Select
                            placeholder="请选择报表生成文件类型"
                            onChange={this.handleSelectChange}
                        >
                            <Option value=".xls">.xls</Option>
                            <Option value=".doc">.doc</Option>
                            <Option value=".pdf">.pdf</Option>
                            <Option value=".html">.html</Option>
                        </Select>
                        )}
                </FormItem>
                <FormItem
                    label="报表生成文件类型"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 12 }}
                >
                    {getFieldDecorator('datasource', {
                        rules: [{ required: true, message: '请选择报表生成的文件类型' }],
                    })(
                        <Select
                            placeholder="请选择报表生成文件类型"
                            onChange={this.handleSelectChange}
                        >
                            {options}
                        </Select>
                        )}
                </FormItem>
                <EditableTable 
                    title="参数配置"
                    dataSource={this.state.dataSource}
                />
                <FormItem
                    wrapperCol={{ span: 12, offset: 5 }}
                >
                    <Button type="primary" htmlType="submit">提交</Button>
                    <Button onClick={()=>window.close()}>取消</Button>
                </FormItem>
            </Form>
        );
    }
}


export const WarpReportForm = Form.create()(reportForm);