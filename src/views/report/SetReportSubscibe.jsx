import React from 'react';
import Report from '../../components/Report/Report';

class SetReportSubscibe extends React.Component {
    render() {
        const schid = this.props.params.id;
        return (
            <Report
                title="报表订阅推送"
                schid={schid}
                type="queue"
            />
        );
    }
}

export default SetReportSubscibe;