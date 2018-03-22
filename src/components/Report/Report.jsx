import React from 'react';
import { Card } from 'antd';

class Report extends React.Component {
    render() {
        return (
            <div className="main-warp">
                <Card title={this.props.title} bordered={false} className="card-warp">
                    { this.props.component}
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