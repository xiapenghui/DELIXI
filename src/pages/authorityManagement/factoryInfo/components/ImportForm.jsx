import React from 'react';
import { Modal, Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import globalConfig from '../../../../../config/defaultSettings';
const ip = `${globalConfig.ip}:${globalConfig.port.yshyerp_sspa}`

const ImportForm = (props) => {
  const { modalVisible, onCancel } = props;

  const uploadData = {
    name: 'file',
    action: `${ip}/123`,
    headers: {
      authorization: localStorage.user_token,
    },
    beforeUpload: file => {
      const isExcel = file.type === 'application/vnd.ms-excel';
      if (!isExcel) {
        message.error(`${file.name} 不是excel文档`);
      }
      return isExcel || Upload.LIST_IGNORE;
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 文件上传成功!`);
        onCancel()
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 文件上传失败!`);
      }
    },
  };



  return (
    <Modal
      maskClosable={false}
      destroyOnClose
      title="导入"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <Upload {...uploadData}>
        <Button icon={<UploadOutlined />}>上传文件</Button>
      </Upload>
    </Modal>
  );
};

export default ImportForm;
