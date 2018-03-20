import React from 'react';
import { Form, Input, Button, message, Table, Checkbox } from 'antd';
import ReportManagerTable from '../../views/report/ReportManager';
import EditableTable from '../../components/Table/Editable';
import RptSubcTable from '../../components/Table/RptSubcTable';
import MyEditor from '../../components/Editor/Editor';
import MyModal from '../../components/Modal/MyModal';

import store from '../../redux/store';

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 15 }
    },
};

const modalProps = {
    title: "多报表订阅",
    width: "80%",
    Component: <ReportManagerTable type="select"/>
}

class ReportSubcibeForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectDate:[],
            visible: false    
        }
    }
    componentWillMount() {
        console.log("rptid:", this.props.rptid)
    
    }
    showModal = () => {
        
        this.setState({
            visible: true
        });
        console.log(this)
    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }
    handleOk = () => {
        let selectDate = store.getState().ReportS.selectDate;
        console.log(selectDate);
        this.setState({
            selectDate,
            visible: false,
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>
                <MyModal
                    visible={this.state.visible}
                    handleOk={this.handleOk}
                    handleCancel={this.handleCancel}
                    {...modalProps}
                />
                <FormItem
                    style={{display:this.props.schid?"none":"block"}}
                    wrapperCol={{ span: 12, offset: 4 }}
                >
                    <Button type="primary" onClick={this.showModal}>选择报表</Button>
                </FormItem>
                <RptSubcTable
                    dataSource={this.state.selectDate}
                />
                <FormItem
                    label="邮件标题"
                    {...formItemLayout}
                >
                    {getFieldDecorator('mstitle', {
                        rules: [{ required: true, message: '邮件标题不能为空!' }],
                    })(
                        <Input placeholder="请输入邮件标题" />
                        )}
                </FormItem>
                <FormItem 
                    label="订阅方式"
                    {...formItemLayout}
                >
                    {getFieldDecorator('pushtype', {
                        valuePropName: 'checked',
                        rules: [{ required: true, message: '请勾选订阅方式!' }]
                    })(
                        <Checkbox>邮件</Checkbox>
                        )}
                </FormItem>
                <FormItem
                    className="mscontent"
                    label="邮件正文"
                    {...formItemLayout}
                >
                    <MyEditor/>
                </FormItem>
                <FormItem
                    label="收件人地址-内部"
                    {...formItemLayout}
                >
                    {getFieldDecorator('msaddress', {
                        rules: [{ required: true, message: '内部收件人地址不能为空!' }],
                    })(
                        <Input placeholder="请输入正确的邮箱地址，多个用‘;’分号隔开"/>
                        )}
                </FormItem>
                <FormItem
                    label="抄送人地址-内部"
                    {...formItemLayout}
                >
                    {getFieldDecorator('ccaddress')(
                        <Input placeholder="请输入正确的邮箱地址，多个用‘;’分号隔开" />
                    )}
                </FormItem>
                <FormItem
                    label="密送人地址-内部"
                    {...formItemLayout}
                >
                    {getFieldDecorator('bccaddress')(
                        <Input placeholder="请输入正确的邮箱地址，多个用‘;’分号隔开" />
                    )}
                </FormItem>
                <FormItem
                    label="收件人地址-外部"
                    {...formItemLayout}
                >
                    {getFieldDecorator('msaddressExternal')(
                        <Input placeholder="请输入正确的邮箱地址，多个用‘;’分号隔开" />
                    )}
                </FormItem>
                <FormItem
                    label="抄件人地址-外部"
                    {...formItemLayout}
                >
                    {getFieldDecorator('ccaddressExternal')(
                        <Input placeholder="请输入正确的邮箱地址，多个用‘;’分号隔开" />
                    )}
                </FormItem>
                <FormItem
                    label="密送人地址-外部"
                    {...formItemLayout}
                >
                    {getFieldDecorator('bccaddressExternal')(
                        <Input placeholder="请输入正确的邮箱地址，多个用‘;’分号隔开" />
                    )}
                </FormItem>
                <FormItem
                    label="调度时间"
                    {...formItemLayout}
                >
                    {getFieldDecorator('schedule')(
                        <Input />
                        )}
                </FormItem>
                <FormItem
                    wrapperCol={{ span: 12, offset: 4 }}
                >
                    <Button type="primary" htmlType="submit">提交</Button>
                    <Button onClick={() => window.close()}>取消</Button>
                </FormItem>
                <style>{`
                        .mscontent label:before{
                            display: inline-block;
                            margin-right: 4px;
                            content: "*";
                            font-family: SimSun;
                            line-height: 1;
                            font-size: 12px;
                            color: #f04134;
                        }
                `}</style>
            </Form>
        );
    }
}


export const WarpReportSubcibeForm = Form.create()(ReportSubcibeForm);