import { PlusOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { Button, message, DatePicker, Form, Input } from "antd";
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
} from "@/services/information/templateinfo";

const templateinfoComponent = ({ templateinfo, dispatch }) => {
  const { TableList, typeList, riskList, isNoList } = templateinfo;
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const actionRef = useRef();
  const [selectedRowsState, setSelectedRows] = useState([]);
  /**
   * 编辑初始化
   */
  const [IsUpdate, setIsUpdate] = useState(false);
  const [UpdateDate, setUpdateDate] = useState({});
  const [isInput, setIsInput] = useState(false);


  const getColumns = () => [
    {
      title: "物料编码",
      dataIndex: "shiftname",
      valueType: "text",
      align: "center",
      width: 120,
      render: (text) => {
        return <input style={{ color: 'red' }} defaultValue={text} style={{ border: 'none', color: 'red', textAlign: 'center' }}></input>
      }
    },

    {
      title: "物料名称",
      dataIndex: "shiftclass",
      valueType: "digit",
      align: "center",
      width: 120,
      initialValue: IsUpdate ? UpdateDate.shiftclass : "",
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
      title: "英文描述",
      dataIndex: "remark",
      valueType: "textarea",
      align: "center",
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remark : "",
    },

    {
      title: "物料型号",
      dataIndex: "remark",
      valueType: "textarea",
      align: "center",
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remark : "",
    },

    {
      title: "型号描述",
      dataIndex: "remark",
      valueType: "textarea",
      align: "center",
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remark : "",
      render: (text) => {
        return <input style={{ color: 'red' }} defaultValue={text} style={{ border: 'none', color: 'red', textAlign: 'center' }}></input>
      }
    },

    {
      title: "盒标签描述",
      dataIndex: "remark",
      valueType: "textarea",
      align: "center",
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remark : "",
    },

    {
      title: "基础数量",
      dataIndex: "remark",
      valueType: "textarea",
      align: "center",
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remark : "",
    },

    {
      title: "单位",
      dataIndex: "remark",
      valueType: "textarea",
      align: "center",
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remark : "",
    },

    {
      title: "重量",
      dataIndex: "remark",
      valueType: "textarea",
      align: "center",
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remark : "",
    },

    {
      title: "重量单位",
      dataIndex: "remark",
      valueType: "textarea",
      align: "center",
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remark : "",
    },

    {
      title: "箱盒数量",
      dataIndex: "remark",
      valueType: "textarea",
      align: "center",
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remark : "",
    },

    {
      title: "盒标签描述",
      dataIndex: "remark",
      valueType: "textarea",
      align: "center",
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remark : "",
    },

    {
      title: "箱EAN13码",
      dataIndex: "remark",
      valueType: "textarea",
      align: "center",
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remark : "",
    },

    {
      title: "盒EAN13码",
      dataIndex: "remark",
      valueType: "textarea",
      align: "center",
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remark : "",
    },

    {
      title: "箱ITF14码",
      dataIndex: "remark",
      valueType: "textarea",
      align: "center",
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remark : "",
    },

    {
      title: "盒ITF14码",
      dataIndex: "remark",
      valueType: "textarea",
      align: "center",
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remark : "",
    },

    {
      title: "所属工厂代码",
      dataIndex: "remark",
      valueType: "textarea",
      align: "center",
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remark : "",
    },

    {
      title: "备注",
      dataIndex: "remark",
      valueType: "textarea",
      align: "center",
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remark : "",
    },

    {
      title: "执行标准",
      dataIndex: "remark",
      valueType: "textarea",
      align: "center",
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remark : "",
    },

    {
      title: "检验员",
      dataIndex: "remark",
      valueType: "textarea",
      align: "center",
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remark : "",
    },

    {
      title: "系统编号",
      dataIndex: "remark",
      valueType: "textarea",
      align: "center",
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remark : "",
    },

    {
      title: "打印标识",
      dataIndex: "remark",
      valueType: "textarea",
      align: "center",
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remark : "",
    },

    // {
    //   title: '操作',
    //   dataIndex: 'option',
    //   valueType: 'option',
    //   align: 'center',
    //   fixed:'right',
    //   width:120,
    //   render: (_, record) => (
    //     <>
    //       <a onClick={() => {
    //         setIsUpdate(true)
    //         setUpdateDate({ ...record });
    //         handleUpdateModalVisible(true);
    //       }}
    //       >编辑</a>
    //     </>
    //   ),
    // },
  ];



  const changIpu = (index) => {
    console.log(index)
  }





  const query = async (params, sorter, filter) => {
    const TableList = postListInit({
      shiftname: params.shiftname == null ? "" : params.shiftname,
      shiftclass: Number(params.shiftclass),
      PageIndex: params.current,
      PageSize: params.pageSize,
    });
    return TableList.then(function (value) {
      return {
        data: value.list,
        // data: [],
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
    const hide = message.loading("正在添加");
    try {
      let data = await addPost(fields);
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
      let data = await updatePut({ shiftid: UpdateDate.shiftid, ...fields });
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
        shiftids: selectedRows.map((row) => row.shiftid),
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
        rowKey="shiftid"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Form.Item
            style={{ marginBottom: "0px", marginRight: "40px" }}
            label="打印日期:"
            name="打印日期:"
          >
            <DatePicker />
          </Form.Item>,

          <Form.Item
            style={{ marginBottom: "0px", }}
            label="打印张数:"
            name="打印张数:"
          >
            <Input style={{ width: '70%' }} />
          </Form.Item>,

          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <ArrowDownOutlined /> 打印条码
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
          rowKey="shiftid"
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
            rowKey="shiftid"
            type="form"
            columns={getColumns()}
          />
        </UpdateForm>
      ) : null}
    </PageContainer>
  );
};

export default connect(({ templateinfo }) => ({ templateinfo }))(
  templateinfoComponent
);
