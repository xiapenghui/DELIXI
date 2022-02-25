// import React from 'react';
// import { Card } from 'antd';

// export default () => (
//   <Card>欢迎使用Pro</Card>
// );

import { PlusOutlined } from "@ant-design/icons";
import { Divider, Button, message, Popconfirm } from "antd";
import React, { useState, useRef, useEffect } from "react";
import { Link, connect } from "umi";
import { PageContainer, FooterToolbar } from "@ant-design/pro-layout";
import ProTable from "@ant-design/pro-table";
import ProDescriptions from "@ant-design/pro-descriptions";
import CreateForm from "./components/CreateForm";
import UpdateForm from "./components/UpdateForm";

import {
  getDropDownInit,
  postListInit,
  deleted,
  getAddDropDownInit,
  addPost,
  updatePut,
  resetPassword,
} from "@/services/authorityManagement/userInfo";

const Component = ({ userInfo, dispatch }) => {
  // const {
  //   TableList,userList } = userInfo

  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const actionRef = useRef();
  const [selectedRowsState, setSelectedRows] = useState([]);

  /**
   * 编辑初始化
   */
  const [IsUpdate, setIsUpdate] = useState(false);
  const [UpdateDate, setUpdateDate] = useState({});

  const getColumns = () => [
    {
      title: "编号",
      dataIndex: "userNo",
      valueType: "text",
      align: "center",
      initialValue: IsUpdate ? UpdateDate.userNo : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "编号不能为空!",
          },
        ],
      },
    },
    {
      title: "姓名",
      dataIndex: "userName",
      valueType: "text",
      align: "center",
      initialValue: IsUpdate ? UpdateDate.userName : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "姓名不能为空!",
          },
        ],
      },
    },
    {
      title: "性别",
      dataIndex: "userSex",
      valueType: "text",
      align: "center",
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.userSex : "",
      // renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
      //   if (type === "form" || type === "table") {
      //     // 返回新的组件
      //     let newList = [];
      //     for (let [key, value] of Object.entries(shiftTypeList)) {
      //       newList.push({ key: key, label: value.text });
      //     }
      //     return (
      //       <Select allowClear showSearch optionFilterProp="children">
      //         {newList.map(function (item, index) {
      //           return (
      //             <Select.Option key={index} value={item.key}>
      //               {item.label}
      //             </Select.Option>
      //           );
      //         })}
      //       </Select>
      //     );
      //   }
      //   return defaultRender(_);
      // },

      formItemProps: {
        rules: [
          {
            required: true,
            message: "性别不能为空!",
          },
        ],
      },
    },
    {
      title: "职位",
      dataIndex: "position",
      valueType: "text",
      align: "center",
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.position : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "姓别不能为空!",
          },
        ],
      },
    },

    {
      title: "所属工厂",
      dataIndex: "factoryId",
      valueType: "text",
      align: "center",
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.factoryId : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "所属工厂不能为空!",
          },
        ],
      },
    },
    {
      title: "所属角色",
      dataIndex: "state",
      valueType: "text",
      align: "center",
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.state : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "所属角色不能为空!",
          },
        ],
      },
    },
    {
      title: "备注",
      dataIndex: "remarks",
      valueType: "text",
      align: "center",
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remarks : "",
      
    },

    {
      title: "操作",
      dataIndex: "option",
      valueType: "option",
      align: "center",
      render: (_, record) => (
        <>
          <Popconfirm
            title="确认重置用户密码吗?"
            onConfirm={async () => {
              await handleResetPassword(record.id);
              actionRef.current?.reload?.();
            }}
            okText="确定"
            cancelText="取消"
          >
            <a>重置密码</a>
          </Popconfirm>
          <Divider type="vertical" />
          <a
            onClick={() => {
              setIsUpdate(true);
              setUpdateDate({ ...record });

              handleUpdateModalVisible(true);
            }}
          >
            编辑
          </a>
        </>
      ),
    },
  ];

  const query = async (params, sorter, filter) => {
    const TableList = postListInit({
      pageNum: params.current,
      pageSize: params.pageSize,
      data: {
        name: params.name,
        cname: params.cname,
        code: params.code,
      },
    });
    return TableList.then(function (value) {
      return {
        data: value.data.list,
        current: value.data.pageNum,
        pageSize: value.data.pageSize,
        success: true,
        total: value.data.total,
      };
    });

    // console.log('query', params, sorter, filter)

    // await dispatch({
    //   type: 'scustomerInfo/query',
    //   payload: {
    //     "pageNum": params.current,
    //     "pageSize": params.pageSize,
    //     "data": {
    //       code: params.code,
    //       cname: params.cname,
    //       fullname: params.fullname,
    //       type: params.type,
    //       commodity: params.commodity,
    //     }
    //   }
    // });

    // return TableList.then(function (value) {
    //   return {
    //     data: value.data.list,
    //     current: value.data.pageNum,
    //     pageSize: value.data.pageSize,
    //     success: true,
    //     total: value.data.total
    //   }
    // });
  };
  /**
   * 添加节点
   * @param fields
   */

  const handleAdd = async (fields) => {
    const hide = message.loading("正在添加");
    try {
      let data = await addPost({ data: fields });
      if (data.status == "200") {
        hide();
        message.success(data.message);
        return true;
      } else {
        message.error(data.message);
        return false;
      }
    } catch (error) {
      message.error("添加失败请重试！");
      return false;
    }
  };
  /**
   * 更新节点
   * @param handleUpdate 编辑保存
   */

  const handleUpdate = async (fields) => {
    const hide = message.loading("正在编辑");
    console.log("handleUpdate", fields);
    try {
      let data = await updatePut({ data: { id: UpdateDate.id, ...fields } });
      if (data.status == "200") {
        hide();
        message.success(data.message);
        return true;
      } else {
        message.error(data.message);
        return false;
      }
    } catch (error) {
      message.error("编辑失败请重试！");
      return false;
    }
  };
  /**
   *  删除节点
   * @param selectedRows
   */

  const handleRemove = async (selectedRows) => {
    const hide = message.loading("正在删除");
    if (!selectedRows) return true;

    try {
      let data = await deleted({
        data: selectedRows.map((row) => row.id),
      });

      if (data.status == "200") {
        hide();
        message.success(data.message);
        return true;
      } else {
        message.error(data.message);
        return false;
      }
    } catch (error) {
      hide();
      message.error("删除失败，请重试");
      return false;
    }
  };

  /**
   * 重置密码
   * @param {*} fields
   */
  const handleResetPassword = async (fields) => {
    // const hide = message.loading('正在重置密码');
    try {
      let data = await resetPassword(fields);
      if (data.status == "200") {
        message.success(data.message);
        return true;
      } else {
        message.error(data.message);
        return false;
      }
    } catch (error) {
      message.error("重置密码失败请重试！");
      return false;
    }
  };
  console.log("TableList-component", userInfo, UpdateDate);
  return (
    <PageContainer>
      <ProTable
        headerTitle="查询表格"
        actionRef={actionRef}
        scroll={{ y: 500 }}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={(params, sorter, filter) => query(params, sorter, filter)}
        columns={getColumns()}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{" "}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{" "}
              项&nbsp;&nbsp;
              <span></span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
        </FooterToolbar>
      )}
      <CreateForm
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
        title="新建"
      >
        <ProTable
          onSubmit={async (value) => {
            const success = await handleAdd(value);

            if (success) {
              handleModalVisible(false);

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="key"
          type="form"
          columns={getColumns()}
        />
      </CreateForm>
      {UpdateDate && Object.keys(UpdateDate).length ? (
        <UpdateForm
          onCancel={() => {
            setUpdateDate({}); //编辑modal一旦关闭就必须setUpdateDate
            setIsUpdate(false);
            handleUpdateModalVisible(false);
          }}
          modalVisible={updateModalVisible}
          title="编辑"
        >
          <ProTable
            onSubmit={async (value) => {
              const success = await handleUpdate(value);

              if (success) {
                handleUpdateModalVisible(false);
                setUpdateDate({});
                setIsUpdate(false);
                if (actionRef.current) {
                  actionRef.current.reload();
                }
              }
            }}
            rowKey="key"
            type="form"
            columns={getColumns()}
          />
        </UpdateForm>
      ) : null}
    </PageContainer>
  );
};

export default connect(({ userInfo }) => ({ userInfo }))(Component);
