import React from 'react';
import { Modal, Form, Select } from 'antd';
import globalConfig from '../../../../../config/defaultSettings';
const formItemLayout = globalConfig.table.formItemLayout
const UpdateForm = (props) => {
  const { modalVisible, onCancel, data } = props 
  const [form] = Form.useForm();
  return (
    <Modal
      destroyOnClose
      title={props.title}
      visible={modalVisible}
      // onOk={() => {
      //   form
      //     .validateFields()
      //     .then((values) => {
      //       onSave(values);
      //     })
      //     .catch((info) => {
      //       console.log('CreateForm Failed:', info);
      //     });
      // }}
      onCancel={() => onCancel()}
      footer={null}
    >
           <Form
        form={form}
        name="addModalValueForm"
        initialValues={{

        }}
      >
      {/* {props.children} */}
 
        <Form.Item
          name="role"
          label="角色"
          hasFeedback
          {...formItemLayout}
          rules={[{
            required: true, message: '请选择角色',
          }]}
        >
          <Select showSearch>
            {data.companyList.map(function (item, index) {
              console.log('wjj',item[index], item.key, index)
              return <Select.Option key={index} value={item.value}>{item.text}</Select.Option>
            })}
          </Select>
        </Form.Item>
        <Form.Item
          name="company"
          label="公司"
          hasFeedback
          {...formItemLayout}
          rules={[{
            required: true, message: '请选择公司',
          }]}
        >
          <Select showSearch>
            {data.companyList.map(function (item, index) {
              return <Select.Option key={index} value={item.value}>{item.text}</Select.Option>
            })}
          </Select>
        </Form.Item>
      </Form>
    </Modal>


  );
};

export default UpdateForm;
