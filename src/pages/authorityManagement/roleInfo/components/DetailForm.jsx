



import React, { useState, useEffect } from 'react'
import moment from 'moment';
import { Modal, Form, Input, Button, Row, Col, DatePicker, Tree, Radio, Select, message } from 'antd'

import globalConfig from '../../../../../config/defaultSettings';
const maskStyles = globalConfig.modal.maskStyles
const formItemLayout = globalConfig.table.formItemLayout
const DetailForm = (props) => {
    const { detailModalVisible, handleModalClose, handleAdd, ModalWidth, data } = props
    const [form] = Form.useForm();
    const [expandedKeys, setExpandedKeys] = useState([]);
    const [checkedKeys, setCheckedKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [autoExpandParent, setAutoExpandParent] = useState(true);

    const onExpand = (expandedKeysValue) => {
        console.log('onExpand', expandedKeysValue); // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.

        setExpandedKeys(expandedKeysValue);
        setAutoExpandParent(false);
    };

    const onCheck = (checkedKeysValue) => {
        console.log('onCheck', checkedKeysValue);
        setCheckedKeys(checkedKeysValue);
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
        new Set(eval(data.EditData.sysMenuIdList)).has(item)
    );

    useEffect(() => {
        if (detailModalVisible) {
            // setCheckedKeys(data.DetailData.sysMenuIdList)
            setCheckedKeys(result)
            form.setFieldsValue({
                id: data.DetailData.id,
                roleName: data.DetailData.roleName,
                companyId: data.DetailData.companyId,
                user: data.DetailData.userId
            })
        }
        return () => {
            form.resetFields()
            console.log('clean Detail useEffect')
        }
    }, [detailModalVisible])

    return (
        <div>
            <Modal
                destroyOnClose
                title="详情"
                visible={detailModalVisible}
                width={ModalWidth}
                onOk={() => handleModalClose('detailModalVisible')}
                onCancel={() => handleModalClose('detailModalVisible')}
                {...maskStyles}
            >
                <Form
                    form={form}
                    name="detailModalValueForm"
                    initialValues={{
                        id: data.DetailData.id,
                        roleName: data.DetailData.roleName,
                        companyId: data.DetailData.companyId,
                        user: data.DetailData.userId
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
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        name="companyId"
                        label="公司"
                        hasFeedback
                        {...formItemLayout}
                    >
                        <Select showSearch disabled>
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
                        <Select  showSearch disabled>
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
                            disabled
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
export default DetailForm;
