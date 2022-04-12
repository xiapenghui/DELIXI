import React from 'react';
import { Modal } from 'antd';

const CopyForm = (props) => {
  const { modalVisible, onCancel } = props
  return (
     <Modal
      maskClosable={false}
      destroyOnClose
      title="复制"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      {props.children}
    </Modal>
  );
};

export default CopyForm;
