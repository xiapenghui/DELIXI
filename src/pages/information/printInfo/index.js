import { PlusOutlined, SnippetsOutlined } from "@ant-design/icons";
import {
  Button,
  message,
  DatePicker,
  Form,
  Input,
  Popconfirm,
  Select,
} from "antd";
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
  generateBarCode,
} from "@/services/information/printInfo";

const printInfoComponent = ({ printInfo, dispatch, user }) => {
  const { materialList } = printInfo;
  const { currentUser } = user;
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [selectedRowsState, setSelectedRows] = useState([]);
  const [selectedObj, setSelectedObj] = useState([]);
  const actionRef = useRef();
  const [materialTypeRow, setMaterialTypeRow] = useState("");
  const [materialTypeList, setMaterialTypeList] = useState([]);
  const [bagID, setBagID] = useState([]);
  const [loading, setLoading] = useState(false);

  /**
   * 编辑初始化
   */
  const [IsUpdate, setIsUpdate] = useState(false);
  const [UpdateDate, setUpdateDate] = useState({});

  const getColumns = () => [
    {
      title: "物料描述",
      dataIndex: "typeDescription",
      valueType: "text",
      align: "center",
      width: 300,
      ellipsis: true,
      hideInTable: true,
    },

    {
      title: "供应商号",
      dataIndex: "supplierName",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
    },

    {
      title: "商品编码",
      dataIndex: "materialId",
      valueType: "text",
      align: "center",
      width: 150,
      hideInTable: true,
      valueEnum: materialList.length == 0 ? {} : [materialList],
      initialValue: IsUpdate ? UpdateDate.materialId : "",
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type === "form" || type === "table") {
          return (
            <Select allowClear showSearch optionFilterProp="children">
              {materialList.map(function (item, index) {
                return (
                  <Select.Option key={item.key} value={item.key}>
                    {item.label}
                  </Select.Option>
                );
              })}
            </Select>
          );
        }
        return defaultRender(_);
      },
    },

    {
      title: () => <a style={{ color: "red" }}>中文名称</a>,
      dataIndex: "materialName",
      valueType: "text",
      align: "center",
      width: 200,
      hideInSearch: true,
      ellipsis: true,
      render: (text, record, index, key) => {
        return (
          <input
            id={"materialName" + record.id}
            defaultValue={record.materialName}
            style={{ border: "none", color: "red", textAlign: "center" }}
            disabled={bagID[0] == record.id ? false : true}
            onBlur={() =>
              changeMaterialName(
                document.getElementById("materialName" + record.id).value,
                record.id
              )
            }
          ></input>
        );
      },
    },

    {
      title: () => <a style={{ color: "red" }}>英文名称</a>,
      dataIndex: "materialDescription",
      valueType: "text",
      align: "center",
      width: 200,
      ellipsis: true,
      hideInSearch: true,
      render: (text, record, index, key) => {
        return (
          <input
            id={"materialDescription" + record.id}
            defaultValue={record.materialDescription}
            style={{ border: "none", color: "red", textAlign: "center" }}
            disabled={bagID[0] == record.id ? false : true}
            onBlur={() =>
              changeMaterialDescription(
                document.getElementById("materialDescription" + record.id)
                  .value,
                record.id
              )
            }
          ></input>
        );
      },
    },

    {
      title: "商品编码",
      dataIndex: "materialType",
      valueType: "text",
      align: "center",
      width: 200,
      hideInTable: true,
    },

    {
      title: "商品编码",
      dataIndex: "materialType",
      valueType: "text",
      align: "center",
      width: 200,
      hideInSearch: true,
      // render: (text, record, index, key) => {
      //   return (
      //     <input
      //       id={"materialType" + record.id}
      //       defaultValue={text}
      //       style={{ border: "none", color: "red", textAlign: "center" }}
      //       disabled={bagID[0] == record.id ? false : true}
      //       onBlur={() => changeMater(document.getElementById("materialType" + record.id).value, record.id)}
      //     ></input>
      //   );
      // },
    },

    {
      title: "物料代号",
      dataIndex: "materialNo",
      valueType: "text",
      align: "center",
      width: 200,
      fixed: "left",
      // hideInSearch: true,
    },

    {
      title: () => <a style={{ color: "red" }}>物料描述</a>,
      dataIndex: "typeDescription",
      valueType: "text",
      align: "center",
      width: 420,
      ellipsis: true,
      hideInSearch: true,
      render: (text, record, index, key) => {
        return (
          <input
            id={"typeDescription" + record.id}
            defaultValue={record.typeDescription}
            style={{
              border: "none",
              color: "red",
              textAlign: "left",
              width: "400px",
            }}
            disabled={bagID[0] == record.id ? false : true}
            onBlur={() =>
              changeTypeDescription(
                document.getElementById("typeDescription" + record.id).value,
                record.id
              )
            }
          ></input>
        );
      },
    },

    {
      title: "是否只码",
      dataIndex: "only",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
      render: (text) => {
        if (text == true) {
          return (text = "是");
        } else {
          return (text = "否");
        }
      },
    },

    {
      title: () => <a style={{ color: "red" }}>系列</a>,
      dataIndex: "serial",
      valueType: "text",
      align: "center",
      width: 200,
      hideInSearch: true,
      render: (text, record, index, key) => {
        return (
          <input
            id={"serial" + record.id}
            defaultValue={text === "-" ? "" : text}
            style={{ border: "none", color: "red", textAlign: "center" }}
            disabled={bagID[0] == record.id ? false : true}
            onBlur={() =>
              changeSerial(
                document.getElementById("serial" + record.id).value,
                record.id
              )
            }
          ></input>
        );
      },
    },

    {
      title: () => <a style={{ color: "red" }}>装袋数量</a>,
      dataIndex: "basicQuantity",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
      render: (text, record, index, key) => {
        return (
          <input
            id={"basicQuantity" + record.id}
            defaultValue={text === "-" ? "" : text}
            style={{
              border: "none",
              color: "red",
              textAlign: "center",
              width: "100px",
            }}
            disabled={bagID[0] == record.id ? false : true}
            onBlur={() =>
              changeBasicQuantity(
                document.getElementById("basicQuantity" + record.id).value,
                record.id
              )
            }
          ></input>
        );
      },
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
      width: 200,
      hideInSearch: true,
      render: (text, record, index, key) => {
        return (
          <input
            id={"cartonsNumber" + record.id}
            defaultValue={text === "-" ? "" : text}
            style={{
              border: "none",
              color: "red",
              textAlign: "center",
              width: "100px",
            }}
            disabled={bagID[0] == record.id ? false : true}
            onBlur={() =>
              changeCartonsNumber(
                document.getElementById("cartonsNumber" + record.id).value,
                record.id
              )
            }
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
      title: () => <a style={{ color: "red" }}>盒重量</a>,
      dataIndex: "boxWeight",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
      render: (text, record, index, key) => {
        return (
          <input
            id={"boxWeight" + record.id}
            defaultValue={text === "-" ? "" : text}
            style={{
              border: "none",
              color: "red",
              textAlign: "center",
              width: "100px",
            }}
            disabled={bagID[0] == record.id ? false : true}
            onBlur={() =>
              changeWeight(
                document.getElementById("boxWeight" + record.id).value,
                record.id
              )
            }
          ></input>
        );
      },
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
      title: <a style={{ color: "red" }}>箱盒数量</a>,
      dataIndex: "boxesNumber",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
      render: (text, record, index, key) => {
        return (
          <input
            id={"boxesNumber" + record.id}
            defaultValue={text === "-" ? "" : text}
            style={{
              border: "none",
              color: "red",
              textAlign: "center",
              width: "100px",
            }}
            disabled={bagID[0] == record.id ? false : true}
            onBlur={() =>
              changeBoxesNumber(
                document.getElementById("boxesNumber" + record.id).value,
                record.id
              )
            }
          ></input>
        );
      },
    },

    {
      title: "EAN13码",
      dataIndex: "caseIEAN13",
      valueType: "text",
      align: "center",
      width: 200,
      hideInSearch: true,
    },

    {
      title: "箱EAN13码",
      dataIndex: "boxIEAN13",
      valueType: "text",
      align: "center",
      width: 200,
      hideInSearch: true,
    },

    {
      title: "盒ITF14码",
      dataIndex: "caseITF14",
      valueType: "text",
      align: "center",
      width: 200,
      hideInSearch: true,
    },

    {
      title: "箱ITF14码",
      dataIndex: "boxITF14",
      valueType: "text",
      align: "center",
      width: 200,
      hideInSearch: true,
    },

    {
      title: "工厂",
      dataIndex: "factoryName",
      valueType: "text",
      align: "center",
      width: 200,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: () => <a style={{ color: "red" }}>生产厂/生产企业</a>,
      dataIndex: "productionPlant",
      valueType: "text",
      align: "center",
      width: 250,
      ellipsis: true,
      hideInSearch: true,
      render: (text, record, index, key) => {
        return (
          <input
            id={"productionPlant" + record.id}
            defaultValue={record.productionPlant}
            style={{
              border: "none",
              color: "red",
              textAlign: "center",
              width: "200px",
            }}
            disabled={bagID[0] == record.id ? false : true}
            onBlur={() =>
              changeProductionPlant(
                document.getElementById("productionPlant" + record.id).value,
                record.id
              )
            }
          ></input>
        );
      },
    },
    {
      title: () => <a style={{ color: "red" }}>地址</a>,
      dataIndex: "address",
      valueType: "text",
      align: "center",
      ellipsis: true,
      width: 250,
      hideInSearch: true,
      render: (text, record, index, key) => {
        return (
          <input
            id={"address" + record.id}
            defaultValue={record.address === "-" ? "" : record.address}
            style={{
              border: "none",
              color: "red",
              textAlign: "center",
              width: "200px",
            }}
            disabled={bagID[0] == record.id ? false : true}
            onBlur={() =>
              changeAddress(
                document.getElementById("address" + record.id).value,
                record.id
              )
            }
          ></input>
        );
      },
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
      title: () => <a style={{ color: "red" }}>执行标准</a>,
      dataIndex: "standard",
      valueType: "text",
      align: "center",
      width: 200,
      hideInSearch: true,
      render: (text, record, index, key) => {
        return (
          <input
            id={"standard" + record.id}
            defaultValue={text === "-" ? "" : text}
            style={{
              border: "none",
              color: "red",
              textAlign: "center",
              width: "100px",
            }}
            disabled={bagID[0] == record.id ? false : true}
            onBlur={() =>
              changeStandard(
                document.getElementById("standard" + record.id).value,
                record.id
              )
            }
          ></input>
        );
      },
    },
    {
      title: () => <a style={{ color: "red" }}>检验员</a>,
      dataIndex: "examination",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
      render: (text, record, index, key) => {
        return (
          <input
            id={"examination" + record.id}
            defaultValue={text === "-" ? "" : text}
            style={{
              border: "none",
              color: "red",
              textAlign: "center",
              width: "100px",
            }}
            disabled={bagID[0] == record.id ? false : true}
            onBlur={() =>
              changeExamination(
                document.getElementById("examination" + record.id).value,
                record.id
              )
            }
          ></input>
        );
      },
    },
    {
      title: "变更标记",
      dataIndex: "state",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
    },
    {
      title: () => <a style={{ color: "red" }}>箱重量</a>,
      dataIndex: "bigBoxWeight",
      valueType: "text",
      align: "center",
      width: 150,
      hideInSearch: true,
      render: (text, record, index, key) => {
        return (
          <input
            id={"bigBoxWeight" + record.id}
            defaultValue={text === "-" ? "" : text}
            style={{
              border: "none",
              color: "red",
              textAlign: "center",
              width: "100px",
            }}
            disabled={bagID[0] == record.id ? false : true}
            onBlur={() =>
              changeBoxWeight(
                document.getElementById("bigBoxWeight" + record.id).value,
                record.id
              )
            }
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
      render: (text, record, index, key) => {
        return (
          <input
            id={"packingQuantity" + record.id}
            defaultValue={text === "-" ? "" : text}
            style={{
              border: "none",
              color: "red",
              textAlign: "center",
              width: "100px",
            }}
            disabled={bagID[0] == record.id ? false : true}
            onBlur={() =>
              changePacking(
                document.getElementById("packingQuantity" + record.id).value,
                record.id
              )
            }
          ></input>
        );
      },
    },
    {
      title: () => <a style={{ color: "red" }}>生产日期</a>,
      dataIndex: "date",
      valueType: "text",
      align: "center",
      width: 180,
      hideInSearch: true,
      render: (text, record, index, key) => {
        return (
          <input
            id={"date" + record.id}
            defaultValue={text === "-" ? "" : text}
            style={{
              border: "none",
              color: "red",
              textAlign: "center",
              width: "100px",
            }}
            disabled={bagID[0] == record.id ? false : true}
            onBlur={() =>
              changeDate(
                document.getElementById("date" + record.id).value,
                record.id
              )
            }
          ></input>
        );
      },
    },
    {
      title: () => <a style={{ color: "red" }}>3C</a>,
      dataIndex: "threeC",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
      render: (text, record, index, key) => {
        return (
          <input
            id={"threeC" + record.id}
            defaultValue={text === "-" ? "" : text}
            style={{
              border: "none",
              color: "red",
              textAlign: "center",
              width: "100px",
            }}
            disabled={bagID[0] == record.id ? false : true}
            onBlur={() =>
              changethreeC(
                document.getElementById("threeC" + record.id).value,
                record.id
              )
            }
          ></input>
        );
      },
    },

    {
      title: () => <a style={{ color: "red" }}>one标识</a>,
      dataIndex: "oneLogo",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
      render: (text, record, index, key) => {
        return (
          <input
            id={"oneLogo" + record.id}
            defaultValue={text === "-" ? "" : text}
            style={{
              border: "none",
              color: "red",
              textAlign: "center",
              width: "100px",
            }}
            disabled={bagID[0] == record.id ? false : true}
            onBlur={() =>
              changeOneLogo(
                document.getElementById("oneLogo" + record.id).value,
                record.id
              )
            }
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

  //获取中文名称
  const changeMaterialName = async (value, id) => {
    selectedObj.map((item, key) => {
      if (item.id == id) {
        item.materialName = value;
      }
    });
  };

  //获取英文名称
  const changeMaterialDescription = async (value, id) => {
    selectedObj.map((item, key) => {
      if (item.id == id) {
        item.materialDescription = value;
      }
    });
  };

  //获取物料型号
  const changeMater = async (value, id) => {
    selectedObj.map((item, key) => {
      if (item.id == id) {
        item.materialType = value;
      }
    });
  };

  //获取装盒数量
  const changeCartonsNumber = async (value, id) => {
    selectedObj.map((item, key) => {
      if (item.id == id) {
        item.cartonsNumber = value;
      }
    });
  };

  //获取箱重量
  const changeBoxWeight = async (value, id) => {
    selectedObj.map((item, key) => {
      if (item.id == id) {
        item.bigBoxWeight = value;
      }
    });
  };

  //获取装箱数量
  const changePacking = async (value, id) => {
    selectedObj.map((item, key) => {
      if (item.id == id) {
        item.packingQuantity = value;
      }
    });
  };

  //获取3C
  const changethreeC = async (value, id) => {
    selectedObj.map((item, key) => {
      if (item.id == id) {
        item.threeC = value;
      }
    });
  };

  // 物料描述
  const changeTypeDescription = async (value, id) => {
    selectedObj.map((item, key) => {
      if (item.id == id) {
        item.typeDescription = value;
      }
    });
  };

  // 系列
  const changeSerial = async (value, id) => {
    selectedObj.map((item, key) => {
      if (item.id == id) {
        item.serial = value;
      }
    });
  };

  // 装袋数量
  const changeBasicQuantity = async (value, id) => {
    selectedObj.map((item, key) => {
      if (item.id == id) {
        item.basicQuantity = value;
      }
    });
  };

  // 盒重量
  const changeWeight = async (value, id) => {
    selectedObj.map((item, key) => {
      if (item.id == id) {
        item.boxWeight = value;
      }
    });
  };

  //生产企业
  const changeProductionPlant = async (value, id) => {
    selectedObj.map((item, key) => {
      if (item.id == id) {
        item.productionPlant = value;
      }
    });
  };

  //  地址
  const changeAddress = async (value, id) => {
    selectedObj.map((item, key) => {
      if (item.id == id) {
        item.address = value;
      }
    });
  };

  //  执行标准
  const changeStandard = async (value, id) => {
    selectedObj.map((item, key) => {
      if (item.id == id) {
        item.standard = value;
      }
    });
  };

  //  检验员
  const changeExamination = async (value, id) => {
    selectedObj.map((item, key) => {
      if (item.id == id) {
        item.examination = value;
      }
    });
  };

  //  检验员
  const changeDate = async (value, id) => {
    selectedObj.map((item, key) => {
      if (item.id == id) {
        item.date = value;
      }
    });
  };

  //箱盒数量
  const changeBoxesNumber = async (value, id) => {
    selectedObj.map((item, key) => {
      if (item.id == id) {
        item.boxesNumber = value;
      }
    });
  };

  //one标识
  const changeOneLogo = async (value, id) => {
    selectedObj.map((item, key) => {
      if (item.id == id) {
        item.oneLogo = value;
      }
    });
  };

  //多选袋条码
  const rowSelection1 = {
    onChange: (selectedRowKeys, selectedRows) => {
      setBagID(selectedRowKeys);
      setSelectedObj(selectedRows);
    },
  };

  //失焦订单数量
  const inputNum = () => {
    let inputVal = document.getElementById("inputVal").value;
    if (inputVal > 2000) {
      message.error("为保证只盒箱对应生成效率,请输入数量少于或等于2000");
    }
  };

  //点击确认生成条码
  const confirm = async () => {
    let inputVal = document.getElementById("inputVal").value;
    let picker = document.getElementById("PickerVal").value;
    if (
      selectedObj.length > 0 &&
      Number(inputVal) > 0 &&
      Number(inputVal) <= 2000
    ) {
      handleModalVisible(true);
      setLoading(true);
      setMaterialTypeList([]);
      let data2 = await generateBarCode({
        materialFactoryList: selectedObj,
        printDate: picker,
        printQuantity: inputVal,
        userId: user.currentUser.id,
      });
      if (data2.status == "200") {
        setMaterialTypeList(data2.data);
        setLoading(false);
      } else {
        message.error(data2.message);
        setLoading(false);
      }
    } else {
      message.error("请至少选择一条数据！并且订单数量(小于等于2000)不能为空！");
    }
  };

  const query = async (params, sorter, filter) => {
    const TableList = postListInit({
      data: {
        bagged: false,
        materialId: params.materialId,
        materialType: params.materialType,
        materialNo: params.materialNo,
        typeDescription: params.typeDescription,
      },
      pageNum: params.current,
      pageSize: params.pageSize,
      userId: user.currentUser.id,
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
        id: selectedRows.map((row) => row.id),
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
        className="flex-proTable"
        rowKey="id"
        search={{
          labelWidth: 120,
          optionRender: (searchConfig, formProps, dom) => [...dom.reverse()],
        }}
        toolBarRender={() => [
          <Form.Item
            style={{ marginBottom: "0px", marginRight: "40px" }}
            label="打印日期:"
            name="data"
          >
            <DatePicker
              defaultValue={moment(new Date())}
              id="PickerVal"
              allowClear={false}
            />
          </Form.Item>,

          <Form.Item
            style={{ marginBottom: "0px" }}
            label="订单数量:"
            name="number"
          >
            <Input style={{ width: "70%" }} id="inputVal" onBlur={inputNum} />
          </Form.Item>,

          // <Button type="primary" onClick={() => handleModalVisible(selectedRowsState?.length > 0 ? true :false)}>

          <Popconfirm
            placement="top"
            title="您确定要生成条码吗?"
            onConfirm={confirm}
            okText="确定"
            cancelText="取消"
          >
            <Button type="primary">
              <SnippetsOutlined /> 生成条码
            </Button>
          </Popconfirm>,
        ]}
        request={(params, sorter, filter) => query(params, sorter, filter)}
        columns={getColumns()}
        rowSelection={{
          type: "radio",
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
          ...rowSelection1,
        }}
      />
      {/* {selectedRowsState?.length > 0 && (
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
      )} */}

      <PrintForm
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
        materialTypeList={materialTypeList}
        loading={loading}
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
            rowKey="id"
            type="form"
            columns={getColumns()}
          />
        </UpdateForm>
      ) : null}
    </PageContainer>
  );
};

export default connect(({ printInfo, user }) => ({ printInfo, user }))(
  printInfoComponent
);
