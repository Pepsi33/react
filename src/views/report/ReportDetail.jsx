import React from 'react';
import Report from '../../components/Report/Report';

class ReportDetail extends React.Component {
    render() {
        const rptid = this.props.params.id;
        return (
            <Report
                title="报表中心报表配置表"
                rptid={rptid}
            />
        );
    }
}

export default ReportDetail;