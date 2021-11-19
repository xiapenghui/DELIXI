import React from 'react';
import { Modal, Row, Col, } from 'antd';
const CreateForm = (props) => {
  const { modalVisible, onCancel } = props;
  return (
    <Modal
      maskClosable={false}
      destroyOnClose
      title="新建"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      {props.children}
    </Modal>
  );
};

export default CreateForm;
