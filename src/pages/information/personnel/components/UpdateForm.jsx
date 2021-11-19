import React from 'react';
import { Modal, Row, Col, } from 'antd';
import '../../../../../src/assets/commonStyle.css'
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
      <Row gutter={16}>
        <Col className="gutter-row  boxTbale" span={24}>
          {props.children}
        </Col>
      </Row>
    </Modal>
  );
};

export default UpdateForm;
