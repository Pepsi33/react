import React from 'react';
import { Input, Select } from 'antd';
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