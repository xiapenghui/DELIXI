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
      dataIndex: "code",
      // valueEnum: customerList.length == 0 ? {} : customerList,
      initialValue: IsUpdate ? UpdateDate.code : "",
    },
    // {
    //   title: '用户',
    //   dataIndex: 'name',
    //   // valueEnum: userList.length == 0 ? {} : userList,
    //   initialValue: IsUpdate ? UpdateDate.name : '',
    //   formItemProps: {
    //     rules: [
    //       {
    //         required: true,
    //         message: '用户不能为空!',
    //       },
    //     ],
    //   },
    // },
    {
      title: "姓名",
      dataIndex: "cname",
      valueType: "text",
      initialValue: IsUpdate ? UpdateDate.cname : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "中文名不能为空!",
          },
        ],
      },
    },
    {
      title: "姓别",
      dataIndex: "cname",
      valueType: "text",
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.cname : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "中文名不能为空!",
          },
        ],
      },
    },
    // {
    //   title: '部门',
    //   dataIndex: 'department',
    //   valueType: 'text',
    //   hideInSearch: true,
    //   initialValue: IsUpdate ? UpdateDate.department : '',
    // },
    {
      title: "职位",
      dataIndex: "title",
      valueType: "text",
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.title : "",
    },

    {
      title: "所属工厂",
      dataIndex: "title",
      valueType: "text",
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.title : "",
    },
    {
      title: "所属角色",
      dataIndex: "title",
      valueType: "text",
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.title : "",
    },
    {
      title: "备注",
      dataIndex: "title",
      valueType: "text",
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.title : "",
    },

    // {
    //   title: '级别',
    //   dataIndex: 'level',
    //   valueType: 'text',
    //   hideInSearch: true,
    //   initialValue: IsUpdate ? UpdateDate.level : '',
    // },
    // {
    //   title: '密码',
    //   dataIndex: 'password',
    //   valueType: 'text',
    //   hideInSearch: true,
    //   initialValue: IsUpdate ? UpdateDate.password : '',
    // },
    {
      title: "操作",
      dataIndex: "option",
      valueType: "option",
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
        // data: value.data.list,
        data: [],
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
