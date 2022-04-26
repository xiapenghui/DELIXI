import { PlusOutlined, SnippetsOutlined, ArrowDownOutlined, SmileOutlined } from "@ant-design/icons";
import { Button, message, DatePicker, Form, Input, Select, Radio, notification } from "antd";
import React, { useState, useRef, useEffect } from "react";
import { Link, connect } from "umi";
import { PageContainer, FooterToolbar } from "@ant-design/pro-layout";
import ProTable from "@ant-design/pro-table";
import moment from "moment";
import ProDescriptions from "@ant-design/pro-descriptions";
import UpdateForm from "./components/UpdateForm";
import "../../../../src/assets/commonStyle.css";
import * as  LodopFuncs from "../../../utils/LodopFuncs.js";
import {
  getDropDownInit,
  postListInit,
  deleted,
  generateBarCode,
  printBarCode,
  getBagTemp
} from "@/services/information/printBag";

const printBagComponent = ({ printBag, dispatch, user }) => {
  const { materialList } = printBag;
  const { currentUser } = user;
  const [selectedRowsState, setSelectedRows] = useState([]);
  const actionRef = useRef();

  const [noStart, setNoStart] = useState('')
  const [bagID, setBagID] = useState([])
  /**
   * 编辑初始化
   */
  const [IsUpdate, setIsUpdate] = useState(false);
  const [bagString, setBagString] = useState('')
  const [bagSelectCol, setBagSelectCol] = useState('')
  const [printTypeName, setPrintTypeName] = useState(""); //设置打印单双排类型


  const getColumns = () => [

    {
      title: "物料描述",
      dataIndex: "typeDescription",
      valueType: "text",
      align: "center",
      width: 200,
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
        if (type === 'form' || type === 'table') {
          return <Select
            allowClear
            showSearch
            optionFilterProp='children'
          >
            {materialList.map(function (item, index) {
              return <Select.Option key={item.key} value={item.key}>
                {item.label}
              </Select.Option>
            })}
          </Select>
        }
        return defaultRender(_);
      },
    },

    {
      title: "中文名称",
      // title: () => <a style={{ color: "red" }}>中文名称</a>,
      dataIndex: "materialName",
      valueType: "text",
      align: "center",
      width: 200,
      hideInSearch: true,
      ellipsis: true,
      // render: (text, record, index, key) => {
      //   return (
      //     <input
      //       id={"materialName" + record.id}
      //       defaultValue={record.materialName}
      //       style={{ border: "none", color: "red", textAlign: "center" }}
      //       disabled={bagID[0] == record.id ? false : true}
      //       onBlur={() => changeMaterialName(document.getElementById("materialName" + record.id).value, record.id)}
      //     ></input>
      //   );
      // },
    },

    {
      title: "英文名称",
      // title: () => <a style={{ color: "red" }}>英文名称</a>,
      dataIndex: "materialDescription",
      valueType: "text",
      align: "center",
      width: 200,
      ellipsis: true,
      hideInSearch: true,
      // render: (text, record, index, key) => {
      //   return (
      //     <input
      //       id={"materialDescription" + record.id}
      //       defaultValue={record.materialDescription}
      //       style={{ border: "none", color: "red", textAlign: "center" }}
      //       disabled={bagID[0] == record.id ? false : true}
      //       onBlur={() => changeMaterialDescription(document.getElementById("materialDescription" + record.id).value, record.id)}
      //     ></input>
      //   );
      // },
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
      // title: () => <a style={{ color: "red" }}>商品编码</a>,
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
      title: "物料描述",
      // title: () => <a style={{ color: "red" }}>物料描述</a>,
      dataIndex: "typeDescription",
      valueType: "text",
      align: "center",
      width: 200,
      ellipsis: true,
      hideInSearch: true,
      // render: (text, record, index, key) => {
      //   return (
      //     <input
      //       id={"typeDescription" + record.id}
      //       defaultValue={record.typeDescription}
      //       style={{ border: "none", color: "red", textAlign: "center" }}
      //       disabled={bagID[0] == record.id ? false : true}
      //       onBlur={() => changeTypeDescription(document.getElementById("typeDescription" + record.id).value, record.id)}
      //     ></input>
      //   );
      // },
    },

    {
      title: "是否袋码",
      dataIndex: "only",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
      render: (text) => {
        if (text == true) {
          return text = "是"
        } else {
          return text = "否"
        }
      }
    },

    {
      title: "系列",
      // title: () => <a style={{ color: "red" }}>系列</a>,
      dataIndex: "serial",
      valueType: "text",
      align: "center",
      width: 200,
      hideInSearch: true,
      // render: (text, record, index, key) => {
      //   return (
      //     <input
      //       id={"serial" + record.id}
      //       defaultValue={text === "-" ? "" : text}
      //       style={{ border: "none", color: "red", textAlign: "center" }}
      //       disabled={bagID[0] == record.id ? false : true}
      //       onBlur={() => changeSerial(document.getElementById("serial" + record.id).value, record.id)}
      //     ></input>
      //   );
      // },
    },

    {
      title: "装袋数量",
      // title: () => <a style={{ color: "red" }}>装袋数量</a>,
      dataIndex: "cartonQuantity",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
      // render: (text, record, index, key) => {
      //   return (
      //     <input
      //       id={"cartonQuantity" + record.id}
      //       defaultValue={text === "-" ? "" : text}
      //       style={{ border: "none", color: "red", textAlign: "center", width: "100px"}}
      //       disabled={bagID[0] == record.id ? false : true}
      //       onBlur={() => changeBasicQuantity(document.getElementById("cartonQuantity" + record.id).value, record.id)}
      //     ></input>
      //   );
      // },
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
      title: "EAN13码",
      dataIndex: "caseIEAN13",
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
      title: "生产企业",
      // title: () => <a style={{ color: "red" }}>生产企业</a>,
      dataIndex: "productionPlant",
      valueType: "text",
      align: "center",
      width: 250,
      ellipsis: true,
      hideInSearch: true,
      // render: (text, record, index, key) => {
      //   return (
      //     <input
      //       id={"productionPlant" + record.id}
      //       defaultValue={record.productionPlant}
      //       style={{
      //         border: "none",
      //         color: "red",
      //         textAlign: "center",
      //         width: "200px",
      //       }}
      //       disabled={bagID[0] == record.id ? false : true}
      //       onBlur={() => changeProductionPlant(document.getElementById("productionPlant" + record.id).value, record.id)}
      //     ></input>
      //   );
      // },
    },
    {
      title: "地址",
      // title: () => <a style={{ color: "red" }}>地址</a>,
      dataIndex: "address",
      valueType: "text",
      align: "center",
      ellipsis: true,
      width: 250,
      hideInSearch: true,
      // render: (text, record, index, key) => {
      //   return (
      //     <input
      //       id={"address" + record.id}
      //       defaultValue={record.address === "-" ? "" : record.address}
      //       style={{
      //         border: "none",
      //         color: "red",
      //         textAlign: "center",
      //         width: "200px",
      //       }}
      //       disabled={bagID[0] == record.id ? false : true}
      //       onBlur={() => changeAddress(document.getElementById("address" + record.id).value, record.id)}
      //     ></input>
      //   );
      // },
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
      // title: () => <a style={{ color: "red" }}>执行标准</a>,
      dataIndex: "standard",
      valueType: "text",
      align: "center",
      width: 200,
      hideInSearch: true,
      // render: (text, record, index, key) => {
      //   return (
      //     <input
      //       id={"standard" + record.id}
      //       defaultValue={text  === "-" ? "" : text}
      //       style={{
      //         border: "none",
      //         color: "red",
      //         textAlign: "center",
      //         width: "100px",
      //       }}
      //       disabled={bagID[0] == record.id ? false : true}
      //       onBlur={() => changeStandard(document.getElementById("standard" + record.id).value, record.id)}
      //     ></input>
      //   );
      // },
    },
    {
      title: "检验员",
      // title: () => <a style={{ color: "red" }}>检验员</a>,
      dataIndex: "examination",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
      // render: (text, record, index, key) => {
      //   return (
      //     <input
      //       id={"examination" + record.id}
      //       defaultValue={text === "-" ? "" : text}
      //       style={{
      //         border: "none",
      //         color: "red",
      //         textAlign: "center",
      //         width: "100px",
      //       }}
      //       disabled={bagID[0] == record.id ? false : true}
      //       onBlur={() => changeExamination(document.getElementById("examination" + record.id).value, record.id)}
      //     ></input>
      //   );
      // },
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
      title: "生产日期",
      // title: () => <a style={{ color: "red" }}>生产日期</a>,
      dataIndex: "date",
      valueType: "text",
      align: "center",
      width: 180,
      hideInSearch: true,
      // render: (text, record, index, key) => {
      //   return (
      //     <input
      //       id={"date" + record.id}
      //       defaultValue={text === "-" ? "" : text}
      //       style={{
      //         border: "none",
      //         color: "red",
      //         textAlign: "center",
      //         width: "100px",
      //       }}
      //       disabled={bagID[0] == record.id ? false : true}
      //       onBlur={() => changeDate(document.getElementById("date" + record.id).value, record.id)}
      //     ></input>
      //   );
      // },
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


  useEffect(() => {
    if (printTypeName !== "") {
      notification.open({
        message: "如果需要打印,请同时修改打印机对应模板!",
        description: printTypeName,
        duration: 8,
        icon: <SmileOutlined style={{ color: "red" }} />,
      });
    }
  }, [printTypeName]);




  //获取中文名称
  const changeMaterialName = async (value, id) => {
    selectedObj.map((item, key) => {
      if (item.id == id) {
        item.materialName = value
      }
    })
  };


  //获取英文名称
  const changeMaterialDescription = async (value, id) => {
    selectedObj.map((item, key) => {
      if (item.id == id) {
        item.materialDescription = value
      }
    })
  };


  //获取物料型号
  const changeMater = async (value, id) => {

    selectedObj.map((item, key) => {
      if (item.id == id) {

        item.materialType = value
      }
    })
  };






  // 物料描述
  const changeTypeDescription = async (value, id) => {
    selectedObj.map((item, key) => {
      if (item.id == id) {
        item.typeDescription = value
      }
    })
  };

  // 系列
  const changeSerial = async (value, id) => {
    selectedObj.map((item, key) => {
      if (item.id == id) {
        item.serial = value
      }
    })
  };

  // 装袋数量
  const changeBasicQuantity = async (value, id) => {
    selectedObj.map((item, key) => {
      if (item.id == id) {
        item.cartonQuantity = value
      }
    })
  };



  //生产企业
  const changeProductionPlant = async (value, id) => {
    selectedObj.map((item, key) => {
      if (item.id == id) {
        item.productionPlant = value
      }
    })
  };

  //  地址
  const changeAddress = async (value, id) => {
    selectedObj.map((item, key) => {
      if (item.id == id) {
        item.address = value
      }
    })
  };

  //  执行标准
  const changeStandard = async (value, id) => {
    selectedObj.map((item, key) => {
      if (item.id == id) {
        item.standard = value
      }
    })
  };


  //  检验员
  const changeExamination = async (value, id) => {
    selectedObj.map((item, key) => {
      if (item.id == id) {
        item.examination = value
      }
    })
  };

  //  检验员
  const changeDate = async (value, id) => {
    selectedObj.map((item, key) => {
      if (item.id == id) {
        item.date = value
      }
    })
  };



  const query = async (params, sorter, filter) => {

    const TableList = postListInit({
      data: {
        bagged: true,
        materialId: params.materialId,
        materialType: params.materialType,
        materialNo: params.materialNo,
        typeDescription: params.typeDescription
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

  /**
   *  删除节点
   * @param selectedRows
   */

  // const handleRemove = async (selectedRows) => {
  //   const hide = message.loading("正在删除");
  //   if (!selectedRows) return true;
  //   try {
  //     let data = await deleted({
  //       id: selectedRows.map((row) => row.id),
  //     });

  //     if (data.status == "200") {
  //       hide();
  //       message.success(data.message);
  //       return true;
  //     } else {
  //       message.error(data.message);
  //       return false;
  //     }
  //   } catch (error) {
  //     hide();
  //     message.error("删除失败，请重试");
  //     return false;
  //   }
  // };

  //多选袋条码
  const rowSelection1 = {
    onChange: (selectedRowKeys, selectedRows) => {
      setBagID(selectedRowKeys)
      bagCreateOneFormPage(selectedRowKeys[0])
      setBagSelectCol(selectedRows)

    }
  };


  //点击打印袋条码  袋---开始
  const pintBagCode = async () => {
    LodopFuncs.getLodop()
    let inputVal = document.getElementById("inputVal").value;
    let picker = document.getElementById("PickerVal").value;
    if (bagID.length > 0 && Number(inputVal) > 0) {
      let content = noStart
      if (content === "") {
        eval(bagString);
        content = bagString.split('LODOP.ADD_PRINT_TEXT(0,0,0,0,"");');
      } else {
        content = noStart.split('LODOP.ADD_PRINT_TEXT(0,0,0,0,"");');
      }
      if (printTypeName.includes("双排")) {
        var dataString = bagSelectCol[0]
        var bagLeftList;
        for (let i = 1; i <= inputVal; i++) {
          console.log(i)
          if (i % 2 == 0) {
            console.log('右')
            var bagRightList = content[1].replace('8888888888B', dataString.caseIEAN13)
              .replaceAll("2022-01-01B", picker)
              .replaceAll("装袋B", "x" + dataString.cartonQuantity === null ? "x" + "" : dataString.cartonQuantity)
              .replaceAll("物料型号B", dataString.materialType)
              .replaceAll("物料描述B", dataString.typeDescription)
              .replaceAll("系列123B", dataString.serial)
              .replaceAll("检02B", dataString.examination)
              .replaceAll("GB/tB", dataString.standard)
              .replaceAll("地址B", dataString.address)
              .replaceAll("生产企业B", dataString.productionPlant)
              .replaceAll("8888888888B", dataString.caseIEAN13)
              .replaceAll("9999999999B", dataString.caseITF14)
              .replaceAll("中文名称B", dataString.materialName)
            if (
              dataString.standard === "无" ||
              dataString.standard === "" ||
              dataString.standard === null
            ) {
              bagRightList = bagRightList
                .replace("执行标准:", "")
                .replace("无", "")
                .replace(null, "");
            }
            if (
              dataString.serial === "" ||
              dataString.serial === null
            ) {
              bagRightList = bagRightList.replace("系列", "").replace(null, "");
            }
            eval(bagLeftList + bagRightList);
            LODOP.PRINT();
            LODOP.PRINT_INIT("");
          }
          else {
            console.log('左')
            bagLeftList = content[0].replace('8888888888A', dataString.caseIEAN13)
              .replaceAll("2022-01-01A", picker)
              .replaceAll("装袋A", "x" + dataString.cartonQuantity === null ? "x" + "" : dataString.cartonQuantity)
              .replaceAll("物料型号A", dataString.materialType)
              .replaceAll("物料描述A", dataString.typeDescription)
              .replaceAll("系列123A", dataString.serial)
              .replaceAll("检02A", dataString.examination)
              .replaceAll("GB/tA", dataString.standard)
              .replaceAll("地址A", dataString.address)
              .replaceAll("生产企业A", dataString.productionPlant)
              .replaceAll("8888888888A", dataString.caseIEAN13)
              .replaceAll("9999999999A", dataString.caseITF14)
              .replaceAll("中文名称A", dataString.materialName)
            if (
              dataString.standard === "无" ||
              dataString.standard === "" ||
              dataString.standard === null
            ) {
              bagLeftList = bagLeftList
                .replace("执行标准:", "")
                .replace("无", "")
                .replace(null, "");
            }
            if (
              dataString.serial === "" ||
              dataString.serial === null
            ) {
              bagLeftList = bagLeftList.replace("系列", "").replace(null, "");
            }
            if (i == inputVal) {
              eval(bagLeftList);
              LODOP.PRINT();
              LODOP.PRINT_INIT("");
            }
          }
        }
        message.info("打印中，请稍等...");
      } else {
        debugger
        var dataString = bagSelectCol[0]
        var bagList = content[0]
          .replaceAll("2022-01-01", picker)
          .replaceAll("装袋", "x" + dataString.cartonQuantity === null ? "x" + "" : dataString.cartonQuantity)
          .replaceAll("物料型号", dataString.materialType)
          .replaceAll("物料描述", dataString.typeDescription)
          .replaceAll("系列123", dataString.serial)
          .replaceAll("检02", dataString.examination)
          .replaceAll("GB/t", dataString.standard)
          .replaceAll("地址", dataString.address)
          .replaceAll("生产企业", dataString.productionPlant)
          .replaceAll("8888888888", dataString.caseIEAN13)
          .replaceAll("9999999999", dataString.caseITF14)
          .replaceAll("中文名称", dataString.materialName)
        if (
          dataString.standard === "无" ||
          dataString.standard === "" ||
          dataString.standard === null
        ) {
          bagList = bagList
            .replace("执行标准:", "")
            .replace("无", "")
            .replace(null, "");
        }
        if (
          dataString.serial === "" ||
          dataString.serial === null
        ) {
          bagList = bagList.replace("系列", "").replace(null, "");
        }
        for (let i = 0; i < inputVal; i++) {
          console.log(i)
          LODOP.SET_PRINT_PAGESIZE(1, 3, "A3");
          eval(bagList);
          LODOP.PRINT();
          LODOP.PRINT_INIT("");
        }
        message.info("打印中，请稍等...");
      }

    } else {
      message.warning('请勾选一条数据!')
    }
  };


  //袋条码模板
  const bagCode = () => {
    if (bagID.length == 0) {
      message.warning("请先勾选一条数据")
    } else {
      LodopFuncs.getLodop()
      LODOP.On_Return = (TaskID, Value) => {
        setNoStart(Value)
      }
      LODOP.PRINT_DESIGN();
    }
  };

  const bagCreateOneFormPage = async (selectedRowKeys) => {
    let data = await getBagTemp(selectedRowKeys)
    if (data.status == 200) {
      setNoStart(data.data.tempCode)
      setPrintTypeName(data.data.tempName)
      eval(data.data.tempCode)
    } else {
      message.warning(data.message)
    }
  }

  // 袋---结束




  //测试袋模板
  const bagCodeTest = () => {
    if (bagID.length == 0) {
      message.warning("请先勾选一条数据")
    } else {
      LodopFuncs.getLodop();
      var bagList = noStart
        .replace("2022-01-01A", "2022-01-01")
        .replace("物料型号A", "CDCH6i16201N")
        .replace("物料描述A", "CDCH6i16A2P1NC220-240V")
        .replace("装袋A", "×10")
        .replace("检02A", "检02")
        .replace("GB/tA", "GB/t")
        .replace("地址A", "地址:浙江省")
        .replace("生产企业A", "生产企业:德力西")
        .replace("系列", "系列")
        .replace("系列123A", "领航者")
        .replace("8888888888A", "8888888888888")
        .replace("9999999999A", "99999999999999")
        .replace("中文名称A", "家用交流电接触器")
        .replace("2022-01-01B", "2022-01-01")
        .replace("物料型号B", "CDCH6i16201N")
        .replace("物料描述B", "CDCH6i16A2P1NC220-240V")
        .replace("装袋B", "×10")
        .replace("检02B", "检02")
        .replace("GB/tB", "GB/t")
        .replace("地址B", "地址:浙江省")
        .replace("生产企业B", "生产企业:德力西")
        .replace("系列", "系列")
        .replace("系列123B", "领航者")
        .replace("8888888888B", "8888888888888")
        .replace("9999999999B", "99999999999999")
        .replace("中文名称", "家用交流电接触器")
      eval(bagList);
      // LODOP.ADD_PRINT_LINE("36.99mm", "43.89mm", "36.99mm", "92.1mm", 0, 1);
      LODOP.ADD_PRINT_TEXT(57, 53, 115, 35, "测试袋码");
      LODOP.SET_PRINT_STYLEA(0, "FontName", "华文彩云");
      LODOP.SET_PRINT_STYLEA(0, "FontSize", 12);
      LODOP.SET_PRINT_STYLEA(0, "FontColor", "#EEC591");
      LODOP.SET_PRINT_STYLEA(0, "Angle", 20);
      LODOP.SET_PRINT_STYLEA(0, "Repeat", 1);
      LODOP.PRINT_DESIGN();
    }

  };




  return (
    <PageContainer>
      <ProTable
        headerTitle="查询表格"
        actionRef={actionRef}
        className="flex-proTable"
        scroll={{ y: 500 }}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Form.Item
            style={{ marginBottom: "0px", marginRight: "40px" }}
            label="打印日期:"
            name="data"
          >
            <DatePicker defaultValue={moment(new Date())} id="PickerVal" allowClear={false} />
          </Form.Item>,

          <Form.Item
            style={{ marginBottom: "0px" }}
            label="订单数量:"
            name="number"
          >
            <Input id="inputVal" defaultValue={10} />
          </Form.Item>,

          <Button type="primary" style={{ marginLeft: '10px' }} onClick={bagCode}>袋码模板</Button>,
          <Button type="primary" style={{ marginLeft: '10px' }} onClick={pintBagCode}><ArrowDownOutlined />点击打印</Button>,
          <Button type="primary" style={{ marginLeft: '10px' }} onClick={bagCodeTest}>测试袋码</Button>

        ]}
        request={(params, sorter, filter) => query(params, sorter, filter)}
        columns={getColumns()}
        rowSelection={{
          type: 'radio',
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



    </PageContainer>
  );
};

export default connect(({ printBag, user }) => ({ printBag, user }))(printBagComponent);
