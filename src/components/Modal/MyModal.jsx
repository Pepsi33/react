import React from 'react';
import { Modal } from 'antd';

class MyModal extends React.Component {
    componentWillReceiveProps(nextProps){
        console.log(nextProps)
        this.setState({
            visible: nextProps.visible
        });
    }
    render() {
        return (
            <div>
                <Modal
                    title={this.props.title} 
                    width={this.props.width}
                    visible={this.props.visible}
                    onOk={this.props.handleOk}
                    onCancel={this.props.handleCancel}
                >   
                    {this.props.Component}
                </Modal>
                <style>{`
                    .warpper{
                        max-height:500px;
                        overflow-y:auto;
                    }
                `}</style>
            </div>
        );
    }
}

export default MyModal;