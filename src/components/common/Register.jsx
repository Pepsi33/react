import React from 'react';
import { Form, Input, Checkbox, Button } from 'antd';
//import { register } from '../../axios/index';
import '../../style/register.less';

const FormItem = Form.Item;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        //register(values);
      }
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('输入的密码不一致！');
    } else {
      callback();
    }
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };
    
    const style = {
	  width:"50%",
	  background:"#fff",
	  padding:"50px 0 10px",
	  marginTop:"-200px"
    }

    return (
		<div className="register">
			<Form onSubmit={this.handleSubmit} style={style}>
				<FormItem
					{...formItemLayout}
					label="用户名"
					hasFeedback
				>
					{getFieldDecorator('name', {
						rules: [{
							required: true, message: '用户名不能为空！',
						}],
					})(
						<Input />
						)}
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="密码"
					hasFeedback
				>
					{getFieldDecorator('password', {
						rules: [{
							required: true, message: '请输入密码！',
						}, {
							validator: this.checkConfirm,
						}],
					})(
						<Input type="password" />
						)}
				</FormItem>
				<FormItem
					{...formItemLayout}
					label="确认密码"
					hasFeedback
				>
					{getFieldDecorator('confirm', {
						rules: [{
							required: true, message: '请再次确认密码！',
						}, {
							validator: this.checkPassword,
						}],
					})(
						<Input type="password" onBlur={this.handleConfirmBlur} />
						)}
				</FormItem>
				<FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
					{getFieldDecorator('agreement', {
						valuePropName: 'checked',
						rules: [{
							required: true, message: '请仔细阅读什么鬼。。。',
						}]
					})(
						<Checkbox>我已经阅读了<a href="viod(0)">什么鬼</a></Checkbox>
						)}
				</FormItem>
				<FormItem {...tailFormItemLayout}>
					<Button type="primary" htmlType="submit">提交</Button>
				</FormItem>
			</Form>
	  	</div>
    );
  }
}

export default Form.create()(RegistrationForm);

