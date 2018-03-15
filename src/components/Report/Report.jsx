import React from 'react';
import { Card } from 'antd';
import { WarpReportForm } from '../Form/ReportForm';


class Report extends React.Component {
    constructor(props){
        super(props)
        this.sate = {
            rptid:""
        }
    }
    componentWillMount(){
        let rptid = this.props.id
        this.setState({ rptid })
        //console.log(this.props)
    }
    componentWillReceiveProps(){
        //console.log("componentWillReceiveProps:",this.props)
    }
    render() {
        const rptid = this.props.id;
        console.log(rptid);
        return (
            <div className="main-warp">
                <Card title="报表中心报表配置表" bordered={false} className="card-warp">
                    <WarpReportForm 
                        rptid="2003"
                    />
                </Card>
                <style>{`
                    .main-warp{
                        padding:30px;
                        height:100%;
                        overflow:auto;
                    }
                    .card-warp{
                        box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
                        border-color: transparent;
                    }
                `}</style>
            </div>
        );
    }
}

export default Report;