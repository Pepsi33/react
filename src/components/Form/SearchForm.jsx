import React from 'react';
import { Form, Row, Col, Input, Button } from 'antd';
const FormItem = Form.Item;
const formItemData = [{
        id: "report_Id",
        label: "报表ID",
        placeholder: "请输入要查询的报表ID"
    }, {
        id: "report_Name",
        label: "报表名称",
        placeholder: "请输入要查询的报表名称"
    }];

class AdvancedSearchForm extends React.Component {
    state = {
        expand: false,
    };
    queryReport = this.props.queryReport;
    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
            let params = {
                "sp[rptid]": values.report_Id,
                "sp[rpttitle]": values.report_Name
            }
            this.queryReport(params);
        });
    }

    handleReset = () => {
        this.props.form.resetFields();
        this.queryReport();
    }

    // To generate mock Form.Item
    getFields() {
        const { getFieldDecorator } = this.props.form;
        const children = [];

        for (let i = 0; i < formItemData.length; i++) {
            children.push(
                <Col span={8} key={i}>
                    <FormItem label={formItemData[i].label}>
                        {getFieldDecorator(formItemData[i].id)(
                            <Input placeholder={formItemData[i].placeholder} />
                        )}
                    </FormItem>
                </Col>
            );
        }
        return children;
    }

    render() {
        return (
            <Form
                className="ant-advanced-search-form"
                onSubmit={this.handleSearch}
            >
                <Row gutter={24}>
                    {this.getFields()}
                    <Col span={8}>
                        <Button type="primary" htmlType="submit">查询</Button>
                        <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>清空</Button>
                    </Col>
                </Row>
                <style>
                    {`
                        .ant-advanced-search-form {
                            padding: 24px;
                            background: #fff;
                            border: 1px solid #d9d9d9;
                            border-radius: 6px;
                            margin-bottom:20px;
                        }

                        .ant-advanced-search-form .ant-form-item {
                            display: flex;
                        }

                        .ant-advanced-search-form .ant-form-item-label {
                            overflow: visible;
                        }
                    `}
                </style>
            </Form>
        );
    }
}

export const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);

