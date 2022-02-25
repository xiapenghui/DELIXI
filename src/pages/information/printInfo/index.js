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

const printInfoComponent = ({ printInfo, dispatch }) => {
  const { TableList, typeList, riskList, isNoList } = printInfo;
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
      dataIndex: "serialNumber",
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
      initialValue: IsUpdate ? UpdateDate.supplierName : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "供应商号不能为空!",
          },
        ],
      },
    },

    {
      title: "中文名称",
      dataIndex: "chineseName",
      valueType: "text",
      align: "center",
      ellipsis: true,
      width: 150,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.chineseName : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "中文名称不能为空!",
          },
        ],
      },
    },

    {
      title: "英文名称",
      dataIndex: "englishName",
      valueType: "textarea",
      align: "center",
      width: 150,
      ellipsis: true,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.englishName : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "英文名称不能为空!",
          },
        ],
      },
    },

    {
      title: () => <a style={{ color: "red" }}>物料型号</a>,
      dataIndex: "materialModel",
      valueType: "textarea",
      align: "center",
      width: 200,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.materialModel : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "物料型号不能为空!",
          },
        ],
      },
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
      dataIndex: "materialDesc",
      valueType: "textarea",
      align: "center",
      width: 150,
      ellipsis: true,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.materialDesc : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "物料型号描述不能为空!",
          },
        ],
      },
    },

    {
      title: "系列",
      dataIndex: "series",
      valueType: "textarea",
      align: "center",
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.series : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "系列不能为空!",
          },
        ],
      },
    },

    {
      title: "装袋数量",
      dataIndex: "cartonQuantity",
      valueType: "textarea",
      align: "center",
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.cartonQuantity : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "装袋数量不能为空!",
          },
        ],
      },
    },

    {
      title: "袋单位",
      dataIndex: "bagUnit",
      valueType: "textarea",
      align: "center",
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.bagUnit : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "袋单位不能为空!",
          },
        ],
      },
    },

    {
      title: () => <a style={{ color: "red" }}>装盒数量</a>,
      dataIndex: "cartonsNumber",
      valueType: "textarea",
      align: "center",
      width: 150,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.cartonsNumber : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "装盒数量不能为空!",
          },
        ],
      },
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
      valueType: "textarea",
      align: "center",
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.boxUnit : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "盒单位不能为空!",
          },
        ],
      },
    },

    {
      title: "盒重量",
      dataIndex: "boxWeight",
      valueType: "textarea",
      align: "center",
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.boxWeight : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "盒重量不能为空!",
          },
        ],
      },
    },

    {
      title: "重量单位",
      dataIndex: "weightUnit",
      valueType: "textarea",
      align: "center",
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.weightUnit : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "重量单位不能为空!",
          },
        ],
      },
    },

    {
      title: "箱盒数量",
      dataIndex: "boxesNumber",
      valueType: "textarea",
      align: "center",
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.boxesNumber : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "箱盒数量不能为空!",
          },
        ],
      },
    },

    {
      title: "EAN13码",
      dataIndex: "EAN13",
      valueType: "textarea",
      align: "center",
      width: 150,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.EAN13 : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "EAN13码不能为空!",
          },
        ],
      },
    },

    {
      title: "箱ITF14码",
      dataIndex: "caseITF14",
      valueType: "textarea",
      align: "center",
      width: 150,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.caseITF14 : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "ITF14码不能为空!",
          },
        ],
      },
    },
    {
      title: "盒ITF14码",
      dataIndex: "boxITF14",
      valueType: "textarea",
      align: "center",
      width: 150,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.boxITF14 : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "盒ITF14码不能为空!",
          },
        ],
      },
    },

    {
      title: "工厂",
      dataIndex: "factory",
      valueType: "textarea",
      align: "center",
      width: 150,
      ellipsis: true,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.factory : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "工厂不能为空!",
          },
        ],
      },
    },
    {
      title: "生产厂/生产企业",
      dataIndex: "productionPlant",
      valueType: "textarea",
      align: "center",
      width: 150,
      ellipsis: true,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.productionPlant : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "生产厂/生产企业不能为空!",
          },
        ],
      },
    },
    {
      title: "地址",
      dataIndex: "adress",
      valueType: "textarea",
      align: "center",
      ellipsis: true,
      width: 150,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.adress : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "地址不能为空!",
          },
        ],
      },
    },
    {
      title: "备注",
      dataIndex: "remarks",
      valueType: "textarea",
      align: "center",
      width: 120,
      ellipsis: true,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remarks : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "备注不能为空!",
          },
        ],
      },
    },
    {
      title: "执行标准",
      dataIndex: "standard",
      valueType: "textarea",
      align: "center",
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.standard : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "执行标准不能为空!",
          },
        ],
      },
    },
    {
      title: "检验员",
      dataIndex: "examination",
      valueType: "textarea",
      align: "center",
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.examination : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "检验员不能为空!",
          },
        ],
      },
    },
    {
      title: "变更标记",
      dataIndex: "sign",
      valueType: "textarea",
      align: "center",
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.sign : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "变更标记不能为空!",
          },
        ],
      },
    },
    {
      title: () => <a style={{ color: "red" }}>箱重量</a>,
      dataIndex: "boxWeight",
      valueType: "textarea",
      align: "center",
      width: 150,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.boxWeight : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "箱重量不能为空!",
          },
        ],
      },
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
      valueType: "textarea",
      align: "center",
      width: 150,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.packingQuantity : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "装箱数量不能为空!",
          },
        ],
      },
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
      valueType: "textarea",
      align: "center",
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.date : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "生产日期不能为空!",
          },
        ],
      },
    },
    {
      title: () => <a style={{ color: "red" }}>3C</a>,
      dataIndex: "threeC",
      valueType: "textarea",
      align: "center",
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.threeC : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "3C不能为空!",
          },
        ],
      },
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
      shiftname: params.shiftname == null ? "" : params.shiftname,
      shiftclass: Number(params.shiftclass),
      PageIndex: params.current,
      PageSize: params.pageSize,
    });
    return TableList.then(function (value) {
      return {
        // data: value.list,
        data: [
          {
            serialNumber: "001",
            supplierName: "601601",
            chineseName: "配电箱",
            englishName: "DISTRIBUTION  BOX  ENCLOSURE",
            materialModel: "CDPZ3024DRHHDMZC",
            materialDesc:
              "PZ30-24单暗装1.2mm厚 120mm深2层板（导轨）+面盖除底箱SM战采",
            series: "领航者",
            cartonQuantity: "1",
            bagUnit: "只",
            cartonsNumber: "1",
            boxUnit: "个",
            boxWeight: "1000",
            weightUnit: "千克",
            boxesNumber: "10",
            EAN13: "6903185007533",
            caseITF14: "5690385007538",
            boxITF14: "5690385007538",
            factory: "大明电气",
            productionPlant: "德力西电气有限公司",
            adress: "浙江省乐清市柳市镇德力西高科技工业园区",
            remarks: "备注",
            standard: "GB/T 14048.2",
            examination: "检07",
            sign: "否",
            boxWeight: "8.95",
            packingQuantity: "20",
            date: "2022-02-15",
            threeC: "1",
          },
          {
            serialNumber: "002",
            supplierName: "601601",
            chineseName: "配电箱",
            englishName: "DISTRIBUTION  BOX  ENCLOSURE",
            materialModel: "CDPZ3024DRHHDMZC",
            materialDesc:
              "PZ30-24单暗装1.2mm厚 120mm深2层板（导轨）+面盖除底箱SM战采",
            series: "领航者",
            cartonQuantity: "2",
            bagUnit: "只",
            cartonsNumber: "2",
            boxUnit: "只",
            boxWeight: "2000",
            weightUnit: "个",
            boxesNumber: "20",
            EAN13: "6903185007533",
            caseITF14: "5690385007538",
            boxITF14: "5690385007538",
            factory: "大明电气",
            productionPlant: "德力西电气有限公司",
            adress: "浙江省乐清市柳市镇德力西高科技工业园区",
            remarks: "备注",
            standard: "GB/T 14048.2",
            examination: "检07",
            sign: "是",
            boxWeight: "8.95",
            packingQuantity: "20",
            date: "2022-02-15",
            threeC: "1",
          },
        ],
        current: value.pageNum,
        pageSize: value.pageSize,
        success: true,
        total: value.total,
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

export default connect(({ printInfo }) => ({ printInfo }))(printInfoComponent);
