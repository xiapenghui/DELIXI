import React from 'react';
import { Modal, Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import globalConfig from '../../../../../config/defaultSettings';
const ip = `${globalConfig.ip}:${globalConfig.port.sspalds_role}`;



const ImportForm = (props) => {
  const { modalVisible, onCancel, currentUser, query } = props;
  const uploadData = {
    name: 'file',
    action: `${ip}/DLX_OEM/api/excel/importExcel`,
    // 接受的文件类型
    accept: '.xls,.xlsx',
    data: {
      type: 'User',
      userId: currentUser.id
    },
    headers: {},

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
        message.loading('正在导入中...');
        if (info.file.response.status === 200) {
          setTimeout(() => {
            message.success(`${info.file.name} 文件上传成功!`);
            onCancel()
            query({
              current: 1,
              pageSize: 20,
            })
          }, 2000)
        }


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
