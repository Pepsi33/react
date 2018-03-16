import React from 'react';
import { Form, Input, Button, Select, Upload, message } from 'antd';
import { AddReportRqUrl as requestUrl } from "../../axios/RequestUrl";
import EditableTable from '../../components/Table/Editable';
import AddReportHttp from '../../axios/AddReportHttp';
import UpdateReportHttp from '../../axios/UpdateReportHttp';
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
        console.log("rptid:",this.props.rptid)
        if(this.props.rptid){
            const params = {
                "sp[rptid]": this.props.rptid
            }
            this.getPmsDataByRptid(params);
        }

        this.setState({
            id: new Date().getTime()
        });
        
        this.getOptions();
    }
    //获取基础数据
    getPmsDataByRptid = (params,cb) => {
        UpdateReportHttp.getBaseDate(params,(a,b)=>{
            //console.log(a,b);
            if(a.status === 200){
                this.setFormInit(a.data.content);
            }

            if(b.status === 200){
                this.setDataSource(b.data.items);
            }
        })
    }
    //表单初始化数据
    setFormInit = (reportInfo) => {
        const { rpttitle, rptfilename, rptfilename_arg, saveasfilename, scfiletype, datasource } = reportInfo;
        const data = { rpttitle, rptfilename, rptfilename_arg, saveasfilename, scfiletype, datasource };
        this.props.form.setFieldsValue(data);
    }
    //获取数据源下拉选项数据
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
        let rptid = this.props.rptid;

        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values)
                let target = this.getAddRptParams(values);
                rptid ? UpdateReportHttp.submitReport(target):AddReportHttp.submitReport(target);
            }
        });    
    }
    getAddRptParams = (reportInfo) =>{
        let dataSource = store.getState().ReportM.RptPmData;
        console.log("store=>dataSource:", dataSource);
        if (this.props.rptid) reportInfo.rptid = this.props.rptid;
        let target = {
            dataSource,
            reportInfo
        };
        Object.assign(target, this.state);
        console.log(target);

        return target;
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
    //.rpx文件下载
    downloadFileRpx = () => {
        console.log(this.state);
        const params = {
            fileName: this.state.reportInfo.rptfilename,
            datasource: this.state.reportInfo.datasource
        }
        UpdateReportHttp.downloadFileRpx(params);
    }
    //*_arg.rpx文件下载
    downloadFileArgRpx = () => {
        console.log(this.state);
        const params = {
            fileName: this.state.reportInfo.rptfilename_arg,
            datasource: this.state.reportInfo.datasource
        }
        UpdateReportHttp.downloadFileArgRpx(params);
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
                <FormItem
                    wrapperCol={{ span: 12}}
                >
                    <Upload {...this.upload_props} onChange={this.upload_onChange}>
                            <Button type="primary" icon="upload" size="large">文件上传</Button>
                    </Upload>
                    {this.props.rptid ?
                        <Button 
                            type="primary" 
                            icon="download" 
                            title="下载.rpx文件" 
                            onClick={this.downloadFileRpx}
                            style={{ marginLeft: "10px" }}>下载文件</Button>
                        :null
                    }
                </FormItem>
                </FormItem>
                <FormItem
                    label="报表参数文件名（*_arg.rpx文件名）"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 12 }}
                    style={{ marginBottom: "5px" }}
                >
                    {getFieldDecorator('rptfilename_arg', {
                        rules: [{ required: true, message: '报表参数文件名不能为空!' }],
                    })(
                        <Input placeholder="报表参数文件名（*_arg.rpx文件名）" />
                        )}
                </FormItem>
                <FormItem
                    wrapperCol={{ span: 12, offset: 5 }} 
                >
                    {this.props.rptid ? 
                        <Button 
                            type="primary" 
                            icon="download" 
                            title="下载*_arg.rpx文件" 
                            onClick={this.downloadFileArgRpx}>下载文件</Button> 
                            : null
                    }
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
                        >
                            <Option value=".xls">.xls</Option>
                            <Option value=".doc">.doc</Option>
                            <Option value=".pdf">.pdf</Option>
                            <Option value=".html">.html</Option>
                        </Select>
                        )}
                </FormItem>
                <FormItem
                    label="数据源"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 12 }}
                >
                    {getFieldDecorator('datasource', {
                        rules: [{ required: true, message: '请选择数据源' }],
                    })(
                        <Select
                            placeholder="请选择报表生成文件类型"
                        >
                            {options}
                        </Select>
                        )}
                </FormItem>
                <EditableTable 
                    title="参数配置"
                    rptid={this.props.rptid}
                    id={this.state.id}
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