import React from 'react';
import Report from '../../components/Report/Report';

class ReportDetail extends React.Component {
    render() {
        const rptid = this.props.params.id;
        return (
            <Report
                rptid={rptid}
            />
        );
    }
}

export default ReportDetail;