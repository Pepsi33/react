import React from 'react';
import { Table, Select, Input, Icon, Button, Popconfirm } from 'antd';
import '../../style/less/tableCell.less';

const Option = Select.Option;

export const EditInputCell = ({ editable, value, onChange }) => (
    <div>
        {editable
            ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
            : value
        }
    </div>
);

export const EditSelectCell = ({ data, editable, value, defaultValue, onChange }) => (
    <div>
        {editable
            ? <Select
                onChange={value => onChange(value)}
                placeholder="请选择"
                defaultValue={defaultValue}
            >
                {data.map(d => <Option key={d.id}>{d.text}</Option>)}
            </Select>
            : value
        }
    </div>
);



export class SubcibeEditSelectCell extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            value: this.props.value,
            editable: false,
        }
    }
    handleChange = (value) => {
        this.setState({ value });
    }
    check = () => {
        this.setState({ editable: false });
        if (this.props.onChange) {
            this.props.onChange(this.state.value);
        }
    }
    edit = () => {
        this.setState({ editable: true });
    }
    render() {
        const { value, editable } = this.state;
        return (
            <div className="editable-cell">
                {
                    editable ?
                        <div className="editable-cell-input-wrapper">
                            <Select
                                onChange={value => this.handleChange(value)}
                                placeholder="请选择"
                                defaultValue={this.props.defaultValue}
                            >
                                {this.props.options.map(d => <Option key={d.id}>{d.text}</Option>)}
                            </Select>
                            <Icon
                                type="check"
                                className="editable-cell-icon-check"
                                onClick={this.check}
                            />
                        </div>
                        :
                        <div className="editable-cell-text-wrapper">
                            {value || ' '}
                            <Icon
                                type="edit"
                                className="editable-cell-icon"
                                onClick={this.edit}
                            />
                        </div>
                }
            </div>
        );
    }
}

export class SubcibeEditInputCell extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: this.props.value,
            editable: false,
        }
    }
    handleChange = (e) => {
        const value = e.target.value;
        this.setState({ value });
    }
    check = () => {
        this.setState({ editable: false });
        if (this.props.onChange) {
            this.props.onChange(this.state.value);
        }
    }
    edit = () => {
        this.setState({ editable: true });
    }
    render() {
        const { value, editable } = this.state;
        return (
            <div className="editable-cell">
                {
                    editable ?
                        <div className="editable-cell-input-wrapper">
                            <Input
                                value={value}
                                onChange={this.handleChange}
                                onPressEnter={this.check}
                            />
                            <Icon
                                type="check"
                                className="editable-cell-icon-check"
                                onClick={this.check}
                            />
                        </div>
                        :
                        <div className="editable-cell-text-wrapper">
                            {value || ' '}
                            <Icon
                                type="edit"
                                className="editable-cell-icon"
                                onClick={this.edit}
                            />
                        </div>
                }
            </div>
        );
    }
}


