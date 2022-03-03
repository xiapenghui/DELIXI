import { PlusOutlined } from "@ant-design/icons";
import { Button, message, DatePicker, Form, Input ,Select  } from "antd";
import React, { useState, useRef, useEffect } from "react";
import { Link, connect } from "umi";
import { PageContainer, FooterToolbar } from "@ant-design/pro-layout";
import ProTable from "@ant-design/pro-table";
import moment from "moment";
import CreateForm from "./components/CreateForm";
import UpdateForm from "./components/UpdateForm";
// import "../../../../src/assets/commonStyle.css";
import ExportJsonExcel from "js-export-excel";
import {
  getDropDownInit,
  postListInit,
  deleted,
  getAddDropDownInit,
  addPost,
  updatePut,
} from "@/services/authorityManagement/templateinfo";

const templateinfoComponent = ({ templateinfo, dispatch , user}) => {
  const {tempList } = templateinfo;
  const { } = user;

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
      dataIndex: "tempNo",
      valueType: "text",
      align: "center",
      width: 120,
      initialValue: IsUpdate ? UpdateDate.tempNo : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "班别名称不能为空!",
          },
        ],
      },
    },

    {
      title: "名称",
      dataIndex: "tempName",
      valueType: "text",
      align: "center",
      width: 120,
      initialValue: IsUpdate ? UpdateDate.tempName : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "名称不能为空!",
          },
        ],
      },
    },

    {
      title: "模板类型",
      dataIndex: "tempType",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
      valueEnum: tempList.length == 0 ? {} : [tempList],
      initialValue: IsUpdate ? UpdateDate.tempType : "",
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type === 'form' || type === 'table') {
          return <Select
            allowClear
            showSearch
            optionFilterProp='children'
          >
            {tempList.map(function (item, index) {
              return <Select.Option key={item.key} value={item.key}>
                {item.label}
              </Select.Option>
            })}
          </Select>
        }
        return defaultRender(_);
      },
      render: (text, record) => {
        return record.tempTypeName
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: "模板类型不能为空!",
          },
        ],
      },
    },

    {
      title: "尺寸",
      dataIndex: "tempSize",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.tempSize : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "尺寸不能为空!",
          },
        ],
      },
    },

    {
      title: "单位",
      dataIndex: "tempUnit",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.tempUnit : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "单位不能为空!",
          },
        ],
      },
    },

    {
      title: "备注",
      dataIndex: "remarks",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remarks : "",
    },

    {
      title: "操作",
      dataIndex: "option",
      valueType: "option",
      align: "center",
      fixed: "right",
      width: 120,
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
        tempNo: params.tempNo,
        tempName: params.tempName,
      },
      pageNum: params.current,
      pageSize: params.pageSize,
      userId: user.currentUser.id
    });
    return TableList.then(function (value) {
      return {
        data: value.data.list,
        current: value.pageNum,
        pageSize: value.pageSize,
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

  // 导出
  const downloadExcel = async (selectedRows) => {
    var option = {};
    var dataTable = [];
    if (selectedRows.length > 0) {
      for (let i in selectedRows) {
        let obj = {
          shiftname: selectedRows[i].shiftname,
          remark: selectedRows[i].remark,
        };
        dataTable.push(obj);
      }
    }
    option.fileName = "班次信息";
    option.datas = [
      {
        sheetData: dataTable,
        sheetName: "sheet",
        sheetFilter: ["shiftname", "remark"],
        sheetHeader: ["班次名称", "备注"],
      },
    ];

    var toExcel = new ExportJsonExcel(option);
    toExcel.saveExcel();
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

          <Button
            onClick={async () => {
              await downloadExcel(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量导出
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
    </PageContainer>
  );
};

export default connect(({ templateinfo ,user }) => ({ templateinfo ,user }))(
  templateinfoComponent
);
