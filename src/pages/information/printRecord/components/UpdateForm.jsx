import React from 'react';
import { Modal } from 'antd';

const UpdateForm = (props) => {
  const { modalVisible, onCancel } = props
  return (
    <Modal
    maskClosable={false}
      destroyOnClose
      title={props.title}
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
      width={700}
    >
      {props.children}
    </Modal>
  );
};

export default UpdateForm;
