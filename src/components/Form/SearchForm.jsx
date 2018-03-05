import React from 'react';
import { Form, Row, Col, Input, Button, Icon } from 'antd';
const FormItem = Form.Item;

class AdvancedSearchForm extends React.Component {
    state = {
        expand: false,
    };

    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
        });
    }

    handleReset = () => {
        this.props.form.resetFields();
    }

    toggle = () => {
        const { expand } = this.state;
        this.setState({ expand: !expand });
    }

    // To generate mock Form.Item
    getFields() {
        const count = this.state.expand ? 10 : 6;
        const { getFieldDecorator } = this.props.form;
        const children = [];
        for (let i = 0; i < 10; i++) {
            children.push(
                <Col span={8} key={i} style={{ display: i < count ? 'block' : 'none' }}>
                    <FormItem label={`Field ${i}`}>
                        {getFieldDecorator(`field-${i}`)(
                            <Input placeholder="placeholder" />
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
                    
                </Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit">Search</Button>
                        <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                            Clear
                        </Button>
                        <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
                            {this.state.expand?"收起":"展开"} <Icon type={this.state.expand ? 'up' : 'down'} />
                        </a>
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

/* ReactDOM.render(
    <div>
        <WrappedAdvancedSearchForm />
        <div className="search-result-list">Search Result List</div>
    </div>,
    mountNode
); */