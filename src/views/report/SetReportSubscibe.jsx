import React from 'react';
import Report from '../../components/Report/Report';
import WarpReportSubcibeForm from '../../components/Form/ReportSubcibeForm';

class SetReportSubscibe extends React.Component {
    render() {
        const schid = this.props.params.id;
        return (
            <Report
                title="报表订阅推送"
                component={<WarpReportSubcibeForm schid={schid}/>}
            />
        );
    }
}

export default SetReportSubscibe;