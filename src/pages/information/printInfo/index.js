import { PlusOutlined, SnippetsOutlined } from "@ant-design/icons";
import { Button, message, DatePicker, Form, Input, Popconfirm } from "antd";
import React, { useState, useRef, useEffect } from "react";
import { Link, connect } from "umi";
import { PageContainer, FooterToolbar } from "@ant-design/pro-layout";
import ProTable from "@ant-design/pro-table";
import moment from "moment";
import ProDescriptions from "@ant-design/pro-descriptions";
import PrintForm from "./components/PrintForm";
import UpdateForm from "./components/UpdateForm";
import "../../../../src/assets/commonStyle.css";
import ExportJsonExcel from "js-export-excel";
import {
  getDropDownInit,
  postListInit,
  deleted,
  getAddDropDownInit,
  addPost,
  updatePut,
} from "@/services/information/printInfo";

const printInfoComponent = ({ printInfo, dispatch, user }) => {
  const { TableList, typeList, riskList, isNoList } = printInfo;
  const { } = user;
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [selectedRowsState, setSelectedRows] = useState([]);
  const actionRef = useRef();
  const [printNo, setPrintNo] = useState(0);
  const [ids, setIds] = useState([]);
  const [picker, setPicker] = useState();

  /**
   * 编辑初始化
   */
  const [IsUpdate, setIsUpdate] = useState(false);
  const [UpdateDate, setUpdateDate] = useState({});

  const getColumns = () => [
    {
      title: "物料编号",
      dataIndex: "materialNo",
      valueType: "text",
      align: "center",
      width: 120,
      fixed: "left",
    },

    {
      title: "供应商号",
      dataIndex: "supplierName",
      valueType: "text",
      align: "center",
      width: 120,
    },

    {
      title: "中文名称",
      dataIndex: "chineseName",
      valueType: "text",
      align: "center",
      ellipsis: true,
      width: 150,
      hideInSearch: true,
    },

    {
      title: "英文名称",
      dataIndex: "englishName",
      valueType: "text",
      align: "center",
      width: 150,
      ellipsis: true,
      hideInSearch: true,
    },

    {
      title: () => <a style={{ color: "red" }}>物料型号</a>,
      dataIndex: "materialType",
      valueType: "text",
      align: "center",
      width: 200,
      hideInSearch: true,
      render: (text) => {
        return (
          <input
            style={{ color: "red" }}
            defaultValue={text}
            style={{ border: "none", color: "red", textAlign: "center" }}
          ></input>
        );
      },
    },

    {
      title: "物料型号描述",
      dataIndex: "boxLabelDescription",
      valueType: "text",
      align: "center",
      width: 150,
      ellipsis: true,
      hideInSearch: true,
    },

    {
      title: "系列",
      dataIndex: "serial",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
    },

    {
      title: "装袋数量",
      dataIndex: "basicQuantity",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
    },

    {
      title: "袋单位",
      dataIndex: "unit",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
    },

    {
      title: () => <a style={{ color: "red" }}>装盒数量</a>,
      dataIndex: "cartonsNumber",
      valueType: "text",
      align: "center",
      width: 150,
      hideInSearch: true,
      render: (text) => {
        return (
          <input
            style={{ color: "red" }}
            defaultValue={text}
            style={{
              border: "none",
              color: "red",
              textAlign: "center",
              width: "100px",
            }}
          ></input>
        );
      },
    },

    {
      title: "盒单位",
      dataIndex: "boxUnit",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
    },

    {
      title: "盒重量",
      dataIndex: "weight",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
    },

    {
      title: "重量单位",
      dataIndex: "weightUnit",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
    },

    {
      title: "箱盒数量",
      dataIndex: "boxesNumber",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
    },

    {
      title: "EAN13码",
      dataIndex: "boxIEAN13",
      valueType: "text",
      align: "center",
      width: 150,
      hideInSearch: true,
    },

    {
      title: "箱ITF14码",
      dataIndex: "boxITF14",
      valueType: "text",
      align: "center",
      width: 150,
      hideInSearch: true,
    },

    {
      title: "盒ITF13码",
      dataIndex: "boxIEAN13",
      valueType: "text",
      align: "center",
      width: 150,
      hideInSearch: true,
    },

    {
      title: "盒ITF14码",
      dataIndex: "caseITF14",
      valueType: "text",
      align: "center",
      width: 150,
      hideInSearch: true,
    },

    {
      title: "工厂",
      dataIndex: "factory",
      valueType: "text",
      align: "center",
      width: 150,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: "生产厂/生产企业",
      dataIndex: "productionPlant",
      valueType: "text",
      align: "center",
      width: 150,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: "地址",
      dataIndex: "adress",
      valueType: "text",
      align: "center",
      ellipsis: true,
      width: 150,
      hideInSearch: true,
    },
    {
      title: "备注",
      dataIndex: "remarks",
      valueType: "text",
      align: "center",
      width: 120,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: "执行标准",
      dataIndex: "standard",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
    },
    {
      title: "检验员",
      dataIndex: "examination",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
    },
    {
      title: "变更标记",
      dataIndex: "sign",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
    },
    {
      title: () => <a style={{ color: "red" }}>箱重量</a>,
      dataIndex: "boxWeight",
      valueType: "text",
      align: "center",
      width: 150,
      hideInSearch: true,
      render: (text) => {
        return (
          <input
            style={{ color: "red" }}
            defaultValue={text}
            style={{
              border: "none",
              color: "red",
              textAlign: "center",
              width: "100px",
            }}
          ></input>
        );
      },
    },
    {
      title: () => <a style={{ color: "red" }}>装箱数量</a>,
      dataIndex: "packingQuantity",
      valueType: "text",
      align: "center",
      width: 150,
      hideInSearch: true,
      render: (text) => {
        return (
          <input
            style={{ color: "red" }}
            defaultValue={text}
            style={{
              border: "none",
              color: "red",
              textAlign: "center",
              width: "100px",
            }}
          ></input>
        );
      },
    },
    {
      title: "生产日期",
      dataIndex: "date",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
    },
    {
      title: () => <a style={{ color: "red" }}>3C</a>,
      dataIndex: "threeC",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
      render: (text) => {
        return (
          <input
            style={{ color: "red" }}
            defaultValue={text}
            style={{
              border: "none",
              color: "red",
              textAlign: "center",
              width: "100px",
            }}
          ></input>
        );
      },
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

  //获取打印日期的值
  const changePicker = async (date, dateString) => {
    setPicker(dateString);
  };

  //获取张数
  const changeIpt = async (e) => {
    setPrintNo(e.target.value);
  };


  //点击确认生成条码
  const confirm = async () => {
    setIds(selectedRowsState.map((item) => item.shiftid));
    if (selectedRowsState?.length > 0) {
      handleModalVisible(true);
    } else {
      message.info("请至少选择一条数据！");
    }
  }


  const query = async (params, sorter, filter) => {

    const TableList = postListInit({
      data: {
        shiftname: params.shiftname,
        shiftclass: params.shiftname,
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
            name="data"
          >
            <DatePicker onChange={changePicker} />
          </Form.Item>,

          <Form.Item
            style={{ marginBottom: "0px" }}
            label="打印张数:"
            name="number"
          >
            <Input style={{ width: "70%" }} onBlur={changeIpt} />
          </Form.Item>,

          // <Button type="primary" onClick={() => handleModalVisible(selectedRowsState?.length > 0 ? true :false)}>


          <Popconfirm placement="top" title="您确定要生成条码吗?" onConfirm={confirm} okText="确定" cancelText="取消">
            <Button type="primary">
              <SnippetsOutlined /> 生成条码
            </Button>
          </Popconfirm>

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

      <PrintForm
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
        printNo={printNo}
        ids={ids}
        picker={picker}
        title="打印条码"
      ></PrintForm>

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

export default connect(({ printInfo, user }) => ({ printInfo, user }))(printInfoComponent);
