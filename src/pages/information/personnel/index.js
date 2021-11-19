import { PlusOutlined } from "@ant-design/icons";
import { Button, message, Select, Divider } from "antd";
import React, { useState, useRef, useEffect } from "react";
import { Link, connect } from "umi";
import { PageContainer, FooterToolbar } from "@ant-design/pro-layout";
import ProTable from "@ant-design/pro-table";
import ProDescriptions from "@ant-design/pro-descriptions";
import CreateForm from "./components/CreateForm";
import UpdateForm from "./components/UpdateForm";

import PowerPrintForm from "./components/PowerPrintForm";
import printElement from "./components/printElement";

import ExportJsonExcel from "js-export-excel";
import ReactToPrint from "react-to-print";
import {
  getDropDownInit,
  postListInit,
  deleted,
  getAddDropDownInit,
  addPost,
  updatePut,
} from "@/services/information/personnel";

const personnelComponent = ({ personnel, dispatch }) => {
  const { departmentList, areaList, lineList, shiftTypeList } = personnel;
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const actionRef = useRef();
  const [selectedRowsState, setSelectedRows] = useState([]);
  const [printingParameters, setPrintingParameters] = useState({});
  const [dataList, setDataList] = useState([]);

  /**
   * 编辑初始化
   */
  const [IsUpdate, setIsUpdate] = useState(false);
  const [UpdateDate, setUpdateDate] = useState({});

  const getColumns = () => [
    {
      title: "模板编号",
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
      title: "模板名称",
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
      title: "模板路径",
      dataIndex: "remark",
      valueType: "textarea",
      align: "center",
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remark : "",
    },

    {
      title: "模板类型",
      dataIndex: "remark",
      valueType: "textarea",
      align: "center",
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remark : "",
    },

    {
      title: "尺寸",
      dataIndex: "remark",
      valueType: "textarea",
      align: "center",
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remark : "",
    },

    {
      title: "单位",
      dataIndex: "remark",
      valueType: "textarea",
      align: "center",
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remark : "",
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
          <Divider type="vertical" />
          <a onClick={() => Print(record)}>打印</a>
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
      PageSize: 1000,
    });
    return TableList.then(function (value) {
      setDataList(value.list);
      return {
        data: value.list,
        current: value.pageNum,
        pageSize: value.pageSize,
        success: true,
        total: value.total,
      };
    });
  };

  // 打印
  const Print = async (values) => {
    setPrintingParameters(values);
    printDataShow();
  };

  const printDataShow = () => {
    var htmlText = document.getElementById("aLevite");
    setTimeout(() => {
      printElement({
        content: htmlText,
      });
    }, 500);
  };

  /**
   * 添加节点
   * @param fields
   */

  const handleAdd = async (fields) => {
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

  // 导出
  const downloadExcel = async () => {
    console.log("dataList", dataList);
    var option = {};
    var dataTable = [];
    if (dataList.length > 0) {
      for (let i in dataList) {
        let obj = {
          employeeno: dataList[i].employeeno,
          linename: dataList[i].linename,
          targetke: parseInt(dataList[i].targetke) + "%",
          targetie: parseInt(dataList[i].targetie) + "%",
          tsdate: dataList[i].tsdate,
          ut: dataList[i].ut,
          dt: dataList[i].dt,
          ot: dataList[i].ot,
          ts: dataList[i].ts,
          ie: parseInt(dataList[i].ie * 100) + "%",
          ke: parseInt(dataList[i].ke * 100) + "%",
          ks: parseInt(dataList[i].ks * 100) + "%",
          t0: dataList[i].t0,
          t1: dataList[i].t1,
          t2: dataList[i].t2,
          t3: dataList[i].t3,
          t4: dataList[i].t4,
          t5: dataList[i].t5,
          goodparts: dataList[i].goodparts,
          targetparts: dataList[i].targetparts,
        };
        dataTable.push(obj);
      }
    }
    option.fileName = "线体查询";
    option.datas = [
      {
        sheetData: dataTable,
        sheetName: "sheet",
        sheetFilter: [
          "employeeno",
          "linename",
          "targetke",
          "targetie",
          "tsdate",
          "ut",
          "dt",
          "ot",
          "ts",
          "ie",
          "ke",
          "ks",
          "t0",
          "t1",
          "t2",
          "t3",
          "t4",
          "t5",
          "goodparts",
          "targetparts",
        ],
        sheetHeader: [
          "线体编号",
          "线体名称",
          "目标KE",
          "目标IE",
          "日期",
          "UT",
          "DT",
          "OT",
          "TS",
          "IE",
          "KE",
          "KS",
          "T0",
          "T1",
          "T2",
          "T3",
          "T4",
          "T5",
          "产量",
          "目标产量",
        ],
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
        rowKey="employeeid"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
          <Button type="primary" onClick={() => downloadExcel()}>
            <PlusOutlined /> 导出
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
          {/* <Button
            onClick={async () => {
              await downloadExcel(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量导出
          </Button> */}
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

      {/* 打印组件 */}
      <PowerPrintForm IdName="aLevite" Data={printingParameters} />
    </PageContainer>
  );
};

export default connect(({ personnel }) => ({ personnel }))(personnelComponent);
