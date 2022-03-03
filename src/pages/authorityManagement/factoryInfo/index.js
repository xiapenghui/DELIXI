import { PlusOutlined, FileWordOutlined } from "@ant-design/icons";
import { Button, message, Select } from "antd";
import React, { useState, useRef, useEffect } from "react";
import { Link, connect } from "umi";
import { PageContainer, FooterToolbar } from "@ant-design/pro-layout";
import ProTable from "@ant-design/pro-table";
import ProDescriptions from "@ant-design/pro-descriptions";
import CreateForm from "./components/CreateForm";
import UpdateForm from "./components/UpdateForm";
import ImportForm from "./components/ImportForm";
import ExportJsonExcel from "js-export-excel";
import {
  getDropDownInit,
  postListInit,
  deleted,
  getTempl,
  getAddDropDownInit,
  addPost,
  updatePut,
} from "@/services/authorityManagement/factoryInfo";

const factoryInfoComponent = ({ factoryInfo, dispatch ,user   }) => {
  const { } = user;

  const { departmentList, areaList, lineList, shiftTypeList } = factoryInfo;
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
      title: "工厂编号",
      dataIndex: "factoryNo",
      valueType: "text",
      align: "center",
      width:150,
      initialValue: IsUpdate ? UpdateDate.factoryNo : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "工厂编号不能为空!",
          },
        ],
      },
    },
    {
      title: "工厂名称",
      dataIndex: "factoryName",
      valueType: "text",
      align: "center",
      width:250,
      initialValue: IsUpdate ? UpdateDate.factoryName : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "工厂名称不能为空!",
          },
        ],
      },
    },
    {
      title: "打印设备号",
      dataIndex: "printDevice",
      valueType: "text",
      align: "center",
      width:150,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.printDevice : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "员工名称不能为空!",
          },
        ],
      },
    },

    {
      title: "线体编号",
      dataIndex: "lineNo",
      valueType: "text",
      align: "center",
      width:150,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.lineNo : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "线体编号不能为空!",
          },
        ],
      },
    },

    {
      title: "供应商SAP代码",
      dataIndex: "supplierSapCode",
      valueType: "text",
      align: "center",
      width:150,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.supplierSapCode : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "员工名称不能为空!",
          },
        ],
      },
    },

    {
      title: "省",
      dataIndex: "province",
      valueType: "text",
      align: "center",
      width:150,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.province : "",
    },

    {
      title: "SAP城市",
      dataIndex: "sapCity",
      valueType: "text",
      align: "center",
      width:150,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.sapCity : "",
    },

    {
      title: "备注",
      dataIndex: "remarks",
      valueType: "textarea",
      align: "center",
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remarks : "",
    },

    {
      title: "操作",
      dataIndex: "option",
      valueType: "option",
      align: "center",
      fixed: "right",
      render: (_, record) => (
        <>
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
        data: {
          factoryNo: params.factoryNo,
          factoryName: params.factoryName
        },
        pageNum: params.current,
        pageSize: params.pageSize,
        userId: user.currentUser.id
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

  return (
    <PageContainer>
      <ProTable
        headerTitle="查询表格"
        actionRef={actionRef}
        scroll={{ y: 500 }}
        rowKey="id"
        search={{
          labelWidth: 150,
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
          <Button type="primary" onClick={() => handleImportModalVisible(true)}>
            <FileWordOutlined /> 导入
          </Button>,
           <Button type="primary" onClick={() => downloadTemp()}>
           <FileWordOutlined /> 下载模板
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
        title="导入"
      >
        {/* <ProTable
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
        /> */}

      </ImportForm>


    </PageContainer>
  );
};

export default connect(({ factoryInfo ,user }) => ({ factoryInfo ,user }))(
  factoryInfoComponent
);
