import React from 'react';
import Report from '../../components/Report/Report';
import { WarpReportForm } from '../Form/ReportForm';

class ReportDetail extends React.Component {
    render() {
        const rptid = this.props.params.id;
        return (
            <Report
                title="报表中心报表配置表"
                component={<WarpReportForm rptid={rptid} />}
            />
        );
    }
}

export default ReportDetail;