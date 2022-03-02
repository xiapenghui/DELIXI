import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  Modal,
  Form,
  Input,
  Button,
  Row,
  Col,
  DatePicker,
  Tree,
  Radio,
  Select,
  message,
} from "antd";
import globalConfig from "../../../../../config/defaultSettings";
// import DraggableAntdModal from 'draggable-antd-modal';
const maskStyles = globalConfig.modal.maskStyles;
const formItemLayout = globalConfig.table.formItemLayout;
// const actionRef = useRef();
const CreateForm = (props) => {
  const {
    addModalVisible,
    handleModalClose,
    addModalValue,
    handleAdd,
    ModalWidth,
    data,
  } = props;

  const [form] = Form.useForm();
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [checkedMenu, setCheckedMenu] = useState([]);

  // const onSave = async (values) => {
  const onSave = (values) => {
    
    // handleAdd(modalType)
    const params = {
      roleName: values.roleName,
      companyId: values.companyId,
      userId: values.user,
      sysMenuIdList: checkedMenu,
    };
    props.dispatch({
      type: `${props.tableName}/addRole`,
      payload: {
        data: params,
      },
    });
    console.log("onSave", { data: params });
  };

  const onExpand = (expandedKeysValue) => {
    console.log("onExpand", expandedKeysValue); // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.

    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeysValue, e) => {
    const checkedKeysResult = [...checkedKeysValue, ...e.halfCheckedKeys];
    console.log("onCheck", checkedKeysResult);
    setCheckedKeys(checkedKeysValue);
    setCheckedMenu(checkedKeysResult);
  };

  const onSelect = (selectedKeysValue, info) => {
    console.log("onSelect", info);
    setSelectedKeys(selectedKeysValue);
  };

  useEffect(() => {
    if (addModalVisible) {
      setExpandedKeys([]);
      setCheckedKeys([]);
      setSelectedKeys([]);
      setAutoExpandParent(true);
      setCheckedMenu([]);
    }
    return () => {
      form.resetFields();
      console.log("clean CreateForm useEffect");
    };
  }, [addModalVisible]);

  console.log("CreateForm-rex", data.record);
  return (
    <div>
      <Modal
        draggable 
        destroyOnClose
        title="新建"
        visible={addModalVisible}
        width={ModalWidth}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              onSave(values);
            })
            .catch((info) => {
              console.log("CreateForm Failed:", info);
            });
        }}
        onCancel={() => handleModalClose("addModalVisible")}
        {...maskStyles}
      >
        <Form form={form} name="addModalValueForm" initialValues={{}}>
          <Form.Item
            name="roleName"
            label="角色名"
            hasFeedback
            {...formItemLayout}
            rules={[
              {
                required: true,
                message: "角色名不能为空!",
              },
            ]}
            validateTrigger="onBlur"
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
              getPopupContainer={(triggerNode) => triggerNode.parentElement}
              allowClear
              showSearch
              optionFilterProp="children"
            >
              {data.SelectConditionInitData.companyList.map(function (
                item,
                index
              ) {
                return (
                  <Select.Option key={index} value={item.key}>
                    {item.label}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name="user"
            label="角色对应的人员"
            hasFeedback
            {...formItemLayout}
          >
            <Select           
              getPopupContainer={(triggerNode) => triggerNode.parentElement}
              allowClear
              showSearch
              optionFilterProp="children"
            >
              {data.userList.map(function (item, index) {
                return (
                  <Select.Option key={index} value={item.id}>
                    {item.text}
                  </Select.Option>
                );
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
              defaultExpandedKeys={["0-0-0"]}
              onSelect={onSelect}
              selectedKeys={selectedKeys}
              treeData={data.menuList}
            />
          </Form.Item>
        </Form>
       
      </Modal>
    </div>
  );
};
export default CreateForm;
