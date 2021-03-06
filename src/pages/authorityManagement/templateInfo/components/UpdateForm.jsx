import React from 'react';
import { Modal } from 'antd';

const UpdateForm = (props) => {
  const { modalVisible, onCancel } = props
  return (
    <Modal
    maskClosable={false}
      destroyOnClose
      title="编辑"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      {props.children}
    </Modal>
  );
};

export default UpdateForm;
