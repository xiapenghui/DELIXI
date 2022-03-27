



import React, { useState, useEffect } from 'react'
import moment from 'moment';
import { Modal, Form, Input, Button, Row, Col, DatePicker, Tree, Radio, Select, message } from 'antd'

import globalConfig from '../../../../../config/defaultSettings';
const maskStyles = globalConfig.modal.maskStyles
const formItemLayout = globalConfig.table.formItemLayout
const UpdateForm = (props) => {
  const { updateModalVisible, handleModalClose, updateModalValue, handleAdd, ModalWidth, data } = props
  const [form] = Form.useForm();
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [checkedMenu, setCheckedMenu] = useState([]);
  const onSave = async (values) => {
    // handleAdd(modalType)
    const params = {
      id: data.record.id,
      roleName: values.roleName,
      companyId: values.companyId,
      userIdList: values.user,
      menuIdList: checkedMenu
    }
    props.dispatch({
      type: `${props.tableName}/updateRole`,
      payload: {
        data: params
      }
    })
  }


  const onExpand = (expandedKeysValue) => {
    console.log('onExpand', expandedKeysValue); // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.

    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeysValue, e) => {
    const checkedKeysResult = [...checkedKeysValue, ...e.halfCheckedKeys]
    console.log('onCheck', checkedKeysResult);
    setCheckedKeys(checkedKeysValue)
    setCheckedMenu(checkedKeysResult)
  };

  const onSelect = (selectedKeysValue, info) => {
    console.log('onSelect', info);
    setSelectedKeys(selectedKeysValue);
  };

  //在子节点不全被选中的时候，不能把父节点给勾选上
  const test = [];//存放所有子节点的数组
  //循环遍历出最深层子节点（包含所有的子节点及没有子节点的父节点），存放在一个数组中
  const requestList = (data) => {
    data.map((item) => {
      if (item.children && item.children.length > 0) {
        requestList(item.children);
      } else {
        test.push(item.key);
      }
      return null;
    });
    return test;
  };
  //将后台返回的含有父节点的数组和第一步骤遍历的数组做比较，求交集
  //data.menuList所有的树结构
  //data.EditData.sysMenuIdList后端给的要展示的父子节点

   
  const result = [...new Set(requestList(data.menuList))].filter((item) =>
   
    new Set(eval(data.EditData.menuIdList)).has(item)
  );


  useEffect(() => {
    if (updateModalVisible) {
      console.log('result', result)
      // setCheckedKeys(data.EditData.menuIdList)
      
      setCheckedKeys(result)
      form.setFieldsValue({
        id: data.EditData.id,
        roleName: data.EditData.roleName,
        companyId: data.EditData.companyId,
        user: data.EditData.userIdList
      })
    }
    return () => {
      form.resetFields()
      console.log('clean UpdateForm useEffect')
    }
  }, [updateModalVisible])

  return (
    <div>
      <Modal
        destroyOnClose
        title="编辑"
        visible={updateModalVisible}
        width={ModalWidth}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              onSave(values);
            })
            .catch((info) => {
              console.log('UpdateForm Failed:', info);
            });
        }}
        onCancel={() => handleModalClose('updateModalVisible')}
        {...maskStyles}
      >
        <Form
          form={form}
          name="updateModalValueForm"
          initialValues={{
            id: data.EditData.id,
            roleName: data.EditData.roleName,
            companyId: data.EditData.companyId,
            user: data.EditData.userIdList
          }}
        >
          <Form.Item
            name="id"
            label="角色ID"
            hasFeedback
            {...formItemLayout}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="roleName"
            label="角色名"
            hasFeedback
            {...formItemLayout}
            rules={[
              {
                required: true, message: '角色名不能为空!',
              },
            ]}
            validateTrigger='onBlur'
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="companyId"
            label="公司"
            hasFeedback
            {...formItemLayout}
          >
            <Select
              getPopupContainer={triggerNode => triggerNode.parentElement}
              allowClear
              showSearch
              optionFilterProp='children'>
              {data.SelectConditionInitData.companyList.map(function (item, index) {
                return <Select.Option key={index} value={item.key}>{item.label}</Select.Option>
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name="user"
            label="角色对应的人员"
            hasFeedback
            {...formItemLayout}
          >
            <Select mode="multiple"
              getPopupContainer={triggerNode => triggerNode.parentElement}
              allowClear
              showSearch
              optionFilterProp='children'
            >
              {data.userList.map(function (item, index) {
                return <Select.Option key={index} value={item.id}>{item.text}</Select.Option>
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name="menu"
            label="角色对应的菜单"
            hasFeedback
            {...formItemLayout}
          >
            <Tree
              showLine={true}
              // showIcon={false}
              checkable
              onExpand={onExpand}
              expandedKeys={expandedKeys}
              autoExpandParent={autoExpandParent}
              onCheck={onCheck}
              checkedKeys={checkedKeys}
              defaultExpandedKeys={['0-0-0']}
              onSelect={onSelect}
              selectedKeys={selectedKeys}
              treeData={data.menuList}
            />
          </Form.Item>
        </Form>
      </Modal>

    </div>
  )

}
export default UpdateForm;
