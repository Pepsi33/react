import React from 'react';
import ReportManagerTable from '../../views/report/ReportManager';

export const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 15 }
    },
};

export const ModalProps = {
    title: "多报表订阅",
    width: "80%",
    Component: <ReportManagerTable type="select" />
}