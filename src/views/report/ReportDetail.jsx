import React from 'react';
import Report from '../../components/Report/Report'
import UpdateReportHttp from '../../axios/UpdateReportHttp';

const Http = UpdateReportHttp;

class ReportDetail extends React.Component {
    constructor(props){
        super(props)
    }
    componentWillMount(){
        console.log(this.props)
    }
    handleSubmit = () =>{

    }
    render() {
        const rptid = this.props.params.id;
        return (
            <Report
                rptid={rptid}
                handleSubmit={this.handleSubmit}
            />
        );
    }
}

export default ReportDetail;