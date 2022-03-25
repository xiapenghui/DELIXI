import { PlusOutlined, FileWordOutlined, ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Divider, Button, message, Popconfirm, Select } from "antd";
import React, { useState, useRef, useEffect } from "react";
import { Link, connect } from "umi";
import { PageContainer, FooterToolbar } from "@ant-design/pro-layout";
import ProTable from "@ant-design/pro-table";
import ProDescriptions from "@ant-design/pro-descriptions";
import CreateForm from "./components/CreateForm";
import UpdateForm from "./components/UpdateForm";
import ImportForm from "../../../components/ImportExcel/ImportForm";

import {
  getDropDownInit,
  postListInit,
  deleted,
  getAddDropDownInit,
  getTempl,
  exportUser,
  addPost,
  updatePut,
  resetPassword,
} from "@/services/authorityManagement/userInfo";

const Component = ({ userInfo, dispatch, user }) => {
  const {
    factoryList,
    RoleList
  } = userInfo;

  const { currentUser } = user;

  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [importModalVisible, handleImportModalVisible] = useState(false);
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
      title: "账号",
      dataIndex: "account",
      valueType: "text",
      align: "center",
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.account : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "账号不能为空!",
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
      valueEnum: ["男", "女"],
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
      valueEnum: factoryList.length == 0 ? {} : [factoryList],
      initialValue: IsUpdate ? UpdateDate.factoryId : "",
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type === 'form' || type === 'table') {
          return <Select
            allowClear
            showSearch
            optionFilterProp='children'
          >
            {factoryList.map(function (item, index) {
              return <Select.Option key={item.key} value={item.key}>
                {item.label}
              </Select.Option>
            })}
          </Select>
        }
        return defaultRender(_);
      },
      render: (text, record) => {
        return record.factoryName
      },
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
      dataIndex: "roleId",
      valueType: "text",
      align: "center",
      hideInSearch: true,
      valueEnum: RoleList.length == 0 ? {} : [RoleList],
      initialValue: IsUpdate ? UpdateDate.roleId : "",
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type === 'form' || type === 'table') {
          return <Select
            allowClear
            showSearch
            optionFilterProp='children'
          >
            {RoleList.map(function (item, index) {
              return <Select.Option key={item.key} value={item.key}>
                {item.label}
              </Select.Option>
            })}
          </Select>
        }
        return defaultRender(_);
      },
      render: (text, record) => {
        return record.roleName
      },
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
        userNo: params.userNo,
        userName: params.userName,
        // userId: user.currentUser.id
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
      // let data = await updatePut({ data: { id: UpdateDate.id, ...fields } });
      let data = await updatePut({
        data: {
          id: UpdateDate.id,
          userNo: fields.userNo,
          account: fields.account,
          userName: fields.userName,
          userSex: fields.userSex === '男' || fields.userSex === '0' ? 0 : 1,
          position: fields.position,
          factoryId: fields.factoryId,
          roleId: fields.roleId,
          remarks: fields.remarks
        }
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


  //下载模板
  const downloadTemp = async (fields) => {
    let data = await getTempl(fields);
    if (data.status === 200) {
      message.success(data.message);
      window.location.href = data.data
      return true;
    } else {
      message.error(data.message);
      return false;
    }
  };


  //导出
  const handleExport = async () => {
    let data = await exportUser({
      data: {
        factoryNo: document.getElementById("userNo").value,
        factoryName: document.getElementById("userName").value
      },
      userId: user.currentUser.id
    });
    if (data.status === 200) {
      message.success(data.message);
      window.location.href = data.data
      return true;
    } else {
      message.error(data.message);
      return false;
    }
  };


  const rowSelection = {
    getCheckboxProps: (record) => ({
      disabled: record.account === 'admin',
      name: record.account,
    }),
  };


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

          <Button type="primary" onClick={() => downloadTemp()}>
            <FileWordOutlined /> 下载模板
          </Button>,
          <Button type="primary" onClick={() => handleImportModalVisible(true)}>
            <ArrowDownOutlined /> 导入
          </Button>,
          <Button type="primary" onClick={() => handleExport()}>
            <ArrowUpOutlined /> 导出
          </Button>,

        ]}
        request={(params, sorter, filter) => query(params, sorter, filter)}
        columns={getColumns()}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
          ...rowSelection
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
          rowKey="id"
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
            rowKey="id"
            type="form"
            columns={getColumns()}
          />
        </UpdateForm>
      ) : null}


      {/* 导入  */}
      <ImportForm
        onCancel={() => handleImportModalVisible(false)}
        modalVisible={importModalVisible}
        currentUser={currentUser}
        title="导入"
        query={query}
      >
      </ImportForm>



    </PageContainer>
  );
};

export default connect(({ userInfo, user }) => ({ userInfo, user }))(Component);
