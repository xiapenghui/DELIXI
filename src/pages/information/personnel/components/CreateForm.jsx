import React from "react";
import { Modal, Row, Col } from "antd";
import DraggableAntdModal from 'draggable-antd-modal';
const CreateForm = (props) => {
  const { modalVisible, onCancel } = props;
  return (
      <DraggableAntdModal
        draggable
        maskClosable={false}
        destroyOnClose
        title="新建"
        visible={modalVisible}
        onCancel={() => onCancel()}
        footer={null}
      >
        {props.children}
      </DraggableAntdModal>
 
  );
};

export default CreateForm;
