import { PlusOutlined , FileWordOutlined } from "@ant-design/icons";
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
  getAddDropDownInit,
  addPost,
  updatePut,
} from "@/services/authorityManagement/factoryInfo";

const factoryInfoComponent = ({ factoryInfo, dispatch }) => {
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
      dataIndex: "employeeno",
      valueType: "text",
      align: "center",
      initialValue: IsUpdate ? UpdateDate.employeeno : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "员工编号不能为空!",
          },
        ],
      },
    },
    {
      title: "工厂名称",
      dataIndex: "employeename",
      valueType: "text",
      align: "center",
      initialValue: IsUpdate ? UpdateDate.employeename : "",
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
      title: "打印设备号",
      dataIndex: "employeename",
      valueType: "text",
      align: "center",
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.employeename : "",
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
      title: "备注",
      dataIndex: "remark",
      valueType: "textarea",
      align: "center",
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remark : "",
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
    let newState;
    let newPattributes;
    if (params.state == "0") {
      newState = "长病假";
    } else if (params.state == "1") {
      newState = "离职";
    } else if (params.state == "2") {
      newState = "在职";
    } else {
      newState = "";
    }

    if (params.pattributes == "1") {
      newPattributes = "正式工";
    } else if (params.pattributes == "2") {
      newPattributes = "小时工";
    } else if (params.pattributes == "3") {
      newPattributes = "领班";
    } else if (params.pattributes == "4") {
      newPattributes = "劳务工";
    } else {
      newPattributes = "";
    }

    const TableList = postListInit({
      
      employeeno: params.employeeno == null ? "" : params.employeeno,
      employeename: params.employeename == null ? "" : params.employeename,
      departmentid: Number(params.departmentid),
      defaultshiftclass: Number(params.defaultshiftclass),
      state: newState,
      pattributes: newPattributes,
      PageIndex: params.current,
      PageSize: params.pageSize,
    });
    return TableList.then(function (value) {
      return {
        // data: value.list,
        data: [],
        current: value.pageNum,
        pageSize: value.pageSize,
        success: true,
        total: value.total,
      };
    });
  };
  /**
   * 添加节点
   * @param fields
   */

  const handleAdd = async (fields) => {
    debugger
    const hide = message.loading("正在添加");
    try {
      let newState;
      let newPattributes;
      if (fields.state == "0") {
        newState = "长病假";
      } else if (fields.state == "1") {
        newState = "离职";
      } else if (fields.state == "2") {
        newState = "在职";
      } else {
        newState = "";
      }

      if (fields.pattributes == "1") {
        newPattributes = "正式工";
      } else if (fields.pattributes == "2") {
        newPattributes = "小时工";
      } else if (fields.pattributes == "3") {
        newPattributes = "领班";
      } else if (fields.pattributes == "4") {
        newPattributes = "劳务工";
      } else {
        newPattributes = "";
      }

      let params = {
        employeeno: fields.employeeno,
        employeename: fields.employeename,
        departmentid: fields.departmentid,
        areaid: Number(fields.areaid) == null ? "" : Number(fields.areaid),
        defaultlineid:
          Number(fields.defaultlineid) == null
            ? ""
            : Number(fields.defaultlineid),
        defaultshiftclass:
          Number(fields.defaultshiftclass) == null
            ? ""
            : Number(fields.defaultshiftclass),
        state: newState,
        pattributes: newPattributes,
        remark: fields.remark,
      };
      let data = await addPost(params);
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
    debugger;
    const hide = message.loading("正在编辑");
    try {
      let newState;
      let newPattributes;
      if (fields.state == "长病假" || fields.state == "0") {
        newState = "长病假";
      } else if (fields.state == "离职" || fields.state == "1") {
        newState = "离职";
      } else if (fields.state == "在职" || fields.state == "2") {
        newState = "在职";
      } else {
        newState = "";
      }

      if (fields.pattributes == "正式工" || fields.pattributes == "0") {
        newPattributes = "正式工";
      } else if (fields.pattributes == "小时工" || fields.pattributes == "1") {
        newPattributes = "小时工";
      } else if (fields.pattributes == "领班" || fields.pattributes == "2") {
        newPattributes = "领班";
      } else if (fields.pattributes == "劳务工" || fields.pattributes == "3") {
        newPattributes = "劳务工";
      } else {
        newPattributes = "";
      }
      let data = await updatePut({
        employeeid: UpdateDate.employeeid,
        employeeno: fields.employeeno,
        employeename: fields.employeename,
        departmentid: Number(fields.departmentid),
        areaid: Number(fields.areaid),
        defaultlineid: Number(fields.defaultlineid),
        defaultshiftclass: Number(fields.defaultshiftclass),
        state: newState,
        pattributes: newPattributes,
        remark: fields.remark,
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
        employeeids: selectedRows.map((row) => row.employeeid),
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

  return (
    <PageContainer>
      <ProTable
        headerTitle="查询表格"
        actionRef={actionRef}
        scroll={{ y: 500 }}
        rowKey="employeeid"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
            <Button type="primary" onClick={() => handleImportModalVisible(true)}>
           <FileWordOutlined /> 导入
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
          rowKey="employeeid"
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
            rowKey="employeeid"
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
          rowKey="employeeid"
          type="form"
          columns={getColumns()}
        /> */}
        
      </ImportForm>


    </PageContainer>
  );
};

export default connect(({ factoryInfo }) => ({ factoryInfo }))(
  factoryInfoComponent
);
