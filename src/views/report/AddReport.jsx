import React from 'react';
import Report from '../../components/Report/Report';
import WarpReportForm from '../../components/Form/ReportForm';

class addReport extends React.Component {
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

export default addReport;