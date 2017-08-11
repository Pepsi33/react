import React from 'react';
import { Modal, Button } from 'antd';

class SysSettingModal extends React.Component {
  render() {
    return (
      <div>
        <Modal
          title="Basic Modal"
          visible={this.props.visible}
          onCancel={this.props.handleModal}
          footer={[
            <Button key="submit" type="primary" size="large" onClick={this.props.handleModal}>
              确定
            </Button>,
          ]}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }
}

export default SysSettingModal