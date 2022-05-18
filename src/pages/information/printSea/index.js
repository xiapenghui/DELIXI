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
} from "@/services/information/printSea";

const printSeaComponent = ({ printSea, dispatch, user }) => {
  const { materialList } = printSea;
  const { currentUser } = user;
  const [selectedRowsState,] = useState([]);
  const [selectedObj, setSelectedObj] = useState([]);
  const actionRef = useRef();

  const [noStart, setNoStart] = useState(`
  LODOP.PRINT_INITA(0,0,"70.14mm","70.06mm","打印控件功能演示_Lodop功能");
  LODOP.ADD_PRINT_TEXT(7,5,200,20,"物料名称");
  LODOP.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
  LODOP.SET_PRINT_STYLEA(0,"Bold",1);
  LODOP.ADD_PRINT_TEXT(7,222,39,20,"装盒");
  LODOP.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
  LODOP.SET_PRINT_STYLEA(0,"Bold",1);
  LODOP.ADD_PRINT_LINE(28,2,27,262,0,1);
  LODOP.ADD_PRINT_TEXT(28,5,173,15,"名称1");
  LODOP.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",8);
  LODOP.ADD_PRINT_TEXT(43,5,175,15,"名称2");
  LODOP.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",8);
  LODOP.ADD_PRINT_TEXT(58,5,175,15,"名称3");
  LODOP.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",8);
  LODOP.ADD_PRINT_TEXT(74,5,175,15,"名称4");
  LODOP.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",8);
  LODOP.ADD_PRINT_TEXT(90,5,175,15,"名称5");
  LODOP.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",8);
  LODOP.ADD_PRINT_TEXT(105,6,175,15,"名称6");
  LODOP.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",8);
  LODOP.ADD_PRINT_TEXT(120,5,175,20,"物料描述");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
  LODOP.SET_PRINT_STYLEA(0,"Bold",1);
  LODOP.ADD_PRINT_LINE(144,6,143,156,0,1);
  LODOP.ADD_PRINT_BARCODE(146,7,150,40,"2_5interleaved","8888888888");
  LODOP.ADD_PRINT_LINE(190,8,189,158,0,1);
  LODOP.ADD_PRINT_TEXT(161,170,95,27,"3series");
  LODOP.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",18);
  LODOP.SET_PRINT_STYLEA(0,"Alignment",3);
  LODOP.SET_PRINT_STYLEA(0,"Bold",1);
  LODOP.ADD_PRINT_LINE(191,183,190,263,0,3);
  LODOP.ADD_PRINT_TEXT(193,169,98,17,"MORE VALUE FOR PRICE!");
  LODOP.SET_PRINT_STYLEA(0,"FontName","微软雅黑");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",5);
  LODOP.SET_PRINT_STYLEA(0,"Alignment",3);
  LODOP.ADD_PRINT_TEXT(211,169,95,20,"生产地");
  LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
  LODOP.ADD_PRINT_IMAGE(199,12,40,40,'<img src="http://121.41.103.57:8088/DLX_OEM/api/CE.png">');
  LODOP.SET_PRINT_STYLEA(0,"Stretch",1);
  LODOP.ADD_PRINT_IMAGE(197,70,40,40,'<img src="http://121.41.103.57:8088/DLX_OEM/api/TUV.png"/>');
  LODOP.SET_PRINT_STYLEA(0,"Stretch",1);
  LODOP.ADD_PRINT_IMAGE(38,203,50,100,'<img src="http://121.41.103.57:8088/DLX_OEM/api/HDB3W.png"/>');
  LODOP.SET_PRINT_STYLEA(0,"Stretch",1);
  `)
  const [bagID, setBagID] = useState([])
  /**
   * 编辑初始化
   */

  const [bagString, setBagString] = useState('')
  const [bagSelectCol, setBagSelectCol] = useState('')
  const [printTypeName, setPrintTypeName] = useState(""); //设置打印单双排类型


  const getColumns = () => [


    {
      title: "通用物料代号",
      dataIndex: "generalNo",
      valueType: "text",
      align: "center",
      width: 200,
      fixed: "left",
      ellipsis: true,
    },

    {
      title: "SAP物料号",
      dataIndex: "SAPNo",
      valueType: "text",
      align: "center",
      width: 200,
      ellipsis: true,
    },

    {
      title: "客户物料号",
      dataIndex: "userNo",
      valueType: "text",
      align: "center",
      width: 200,
      ellipsis: true,
      hideInSearch: true,
    },


    {
      title: "物料描述",
      dataIndex: "typeDescription",
      valueType: "text",
      align: "center",
      width: 200,
      ellipsis: true,
      hideInTable: true,
      hideInSearch: true,
    },


    {
      title: "品牌",
      dataIndex: "brand",
      valueType: "text",
      align: "center",
      width: 200,
      ellipsis: true,
      hideInSearch: true,
    },

    {
      title: "工厂代号",
      dataIndex: "factoryNo",
      valueType: "text",
      align: "center",
      width: 200,
      ellipsis: true,
      hideInSearch: true,
    },


    {
      title: "名称1",
      dataIndex: "name1",
      valueType: "text",
      align: "center",
      width: 200,
      ellipsis: true,
      hideInSearch: true,
    },


    {
      title: "名称2",
      dataIndex: "name2",
      valueType: "text",
      align: "center",
      width: 200,
      ellipsis: true,
      hideInSearch: true,
    },


    {
      title: "名称3",
      dataIndex: "name3",
      valueType: "text",
      align: "center",
      width: 200,
      ellipsis: true,
      hideInSearch: true,
    },

    {
      title: "名称4",
      dataIndex: "name4",
      valueType: "text",
      align: "center",
      width: 200,
      ellipsis: true,
      hideInSearch: true,
    },

    {
      title: "名称5",
      dataIndex: "name5",
      valueType: "text",
      align: "center",
      width: 200,
      ellipsis: true,
      hideInSearch: true,
    },

    {
      title: "名称6",
      dataIndex: "name6",
      valueType: "text",
      align: "center",
      width: 200,
      ellipsis: true,
      hideInSearch: true,
    },

    {
      title: "装盒数",
      dataIndex: "cartonsNumber",
      valueType: "text",
      align: "center",
      width: 200,
      ellipsis: true,
      hideInSearch: true,
    },

    {
      title: "装箱数",
      dataIndex: "packingQuantity",
      valueType: "text",
      align: "center",
      width: 200,
      ellipsis: true,
      hideInSearch: true,
    },


    {
      title: "盒重",
      dataIndex: "boxWeight",
      valueType: "text",
      align: "center",
      width: 200,
      ellipsis: true,
      hideInSearch: true,
    },

    {
      title: "箱毛重",
      dataIndex: "boxHair",
      valueType: "text",
      align: "center",
      width: 200,
      ellipsis: true,
      hideInSearch: true,
    },

    {
      title: "产品码",
      dataIndex: "productCode",
      valueType: "text",
      align: "center",
      width: 200,
      ellipsis: true,
      hideInSearch: true,
    },

    {
      title: "袋贴码",
      dataIndex: "bagCode",
      valueType: "text",
      align: "center",
      width: 200,
      ellipsis: true,
      hideInSearch: true,
    },

    {
      title: "盒贴码",
      dataIndex: "heCode",
      valueType: "text",
      align: "center",
      width: 200,
      ellipsis: true,
      hideInSearch: true,
    },


    {
      title: "箱贴码",
      dataIndex: "boxCode",
      valueType: "text",
      align: "center",
      width: 200,
      ellipsis: true,
      hideInSearch: true,
    },

    {
      title: "认证标记1",
      dataIndex: "sign1",
      valueType: "text",
      align: "center",
      width: 200,
      ellipsis: true,
      hideInSearch: true,
    },

    {
      title: "认证标记2",
      dataIndex: "sign2",
      valueType: "text",
      align: "center",
      width: 200,
      ellipsis: true,
      hideInSearch: true,
    },

    {
      title: "认证标记3",
      dataIndex: "sign3",
      valueType: "text",
      align: "center",
      width: 200,
      ellipsis: true,
      hideInSearch: true,
    },

    {
      title: "认证标记4",
      dataIndex: "sign4",
      valueType: "text",
      align: "center",
      width: 200,
      ellipsis: true,
      hideInSearch: true,
    },

    {
      title: "认证标记5",
      dataIndex: "sign5",
      valueType: "text",
      align: "center",
      width: 200,
      ellipsis: true,
      hideInSearch: true,
    },

    {
      title: "制造地",
      dataIndex: "adress",
      valueType: "text",
      align: "center",
      width: 200,
      ellipsis: true,
      hideInSearch: true,
    },

    {
      title: "产品勾勒图",
      dataIndex: "productImg",
      valueType: "text",
      align: "center",
      width: 200,
      ellipsis: true,
      hideInSearch: true,
    },

    {
      title: "备注1",
      dataIndex: "remark1",
      valueType: "text",
      align: "center",
      width: 200,
      ellipsis: true,
      hideInSearch: true,
    },

    {
      title: "备注2",
      dataIndex: "remark2",
      valueType: "text",
      align: "center",
      width: 200,
      ellipsis: true,
      hideInSearch: true,
    },



    // {
    //   title: () => <a style={{ color: "red" }}>装袋数量</a>,
    //   dataIndex: "cartonQuantity",
    //   valueType: "text",
    //   align: "center",
    //   width: 120,
    //   hideInSearch: true,
    //   render: (text, record, index, key) => {
    //     return (
    //       <input
    //         id={"cartonQuantity" + record.id}
    //         defaultValue={text === "-" ? "" : text}
    //         style={{ border: "none", color: "red", textAlign: "center", width: "100px" }}
    //         disabled={bagID[0] == record.id ? false : true}
    //         onBlur={() => changeBasicQuantity(document.getElementById("cartonQuantity" + record.id).value, record.id)}
    //       ></input>
    //     );
    //   },
    // },



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





  // 装袋数量
  const changeBasicQuantity = async (value, id) => {
    selectedObj.map((item, key) => {
      if (item.id == id) {
        item.cartonQuantity = value
      }
    })
  };






  const query = async (params, sorter, filter) => {
    const TableList = postListInit({
      data: {
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
        // data: value.data.list,
        data: [
          {
            generalNo: 'HDB3wHN1C10',
            SAPNo: 'HIHDB3wHN1C10',
            userNo: 'HIHDB3wHN1C10',
            typeDescription: 'HDB3wH C 1P 6kA 10A',
            brand: 'HIMEL',
            factoryNo: 'DE02',
            name1: 'Miniature Circuit Breaker',
            name2: 'Disjoncteur en miniature',
            name3: 'Devre Kesici (Otomatik Sigorta)',
            name4: 'Interruptor Automático',
            name5: 'قاطع دائرة كهربائية مصغر',
            name6: 'Автоматический выключатель',
            cartonsNumber: '12',
            packingQuantity: '144',
            boxWeight: '1.2',
            boxHair: '14.8',
            productCode: '843375403467',
            bagCode: '843375453467',
            heCode: '8433754034670',
            boxCode: '8433754534675',
            sign1: 'CE',
            sign2: 'TUV',
            sign3: '',
            sign4: '',
            sign5: '',
            adress: 'MADE IN CHINA',
            productImg: 'CDB3W1P',
            remark1: '',
            remark2: ''
          }
        ],
        // current: value.pageNum,
        // pageSize: value.pageSize,
        // success: true,
        // total: value.data.total,
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
      debugger
      setBagID(selectedRowKeys)
      // bagCreateOneFormPage(selectedRowKeys[0])
      setBagSelectCol(selectedRows)
      setSelectedObj(selectedRows)
    }
  };


  //点击打印袋条码  袋---开始
  const pintBagCode = async () => {
    debugger
    LodopFuncs.getLodop()
    let inputVal = document.getElementById("inputVal").value;
    let picker = document.getElementById("PickerVal").value;
    // if (bagID.length > 0 && Number(inputVal) > 0) {
    if (bagSelectCol.length > 0 && Number(inputVal) > 0) {
      let content = noStart
      if (content === "") {
        eval(bagString);
        content = bagString.split('LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);');
      } else {
        content = noStart.split('LODOP.SET_PRINT_STYLEA(0,"PreviewOnly",1);');
      }
      if (printTypeName.includes("双排")) {
        var dataString = bagSelectCol[0]
        var bagLeftList;
        for (let i = 1; i <= inputVal; i++) {
          console.log(i)
          if (i % 2 == 0) {
            console.log('右')
            var bagRightList = content[1]
              .replaceAll("2022-01-01B", picker)
              .replaceAll("装袋B", dataString.cartonQuantity === null ? "x" + "" : "x" + dataString.cartonQuantity)
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
            bagLeftList = content[0]
              .replaceAll("2022-01-01A", picker)
              .replaceAll("装袋A", dataString.cartonQuantity === null ? "x" + "" : "x" + dataString.cartonQuantity)
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
        var dataString = bagSelectCol[0]
        var bagList = content[0]
          .replaceAll("2022-01-01", picker)
          .replaceAll("装盒", dataString.cartonsNumber === null ? "x" + "" : "x" + dataString.cartonsNumber)
          .replaceAll("物料名称", dataString.generalNo)
          .replaceAll("名称1", dataString.name1)
          .replaceAll("名称2", dataString.name2)
          .replaceAll("名称3", dataString.name3)
          .replaceAll("名称4", dataString.name4)
          .replaceAll("名称5", dataString.name5)
          .replaceAll("名称6", dataString.name6)
          .replaceAll("物料描述", dataString.typeDescription)
          .replaceAll("8888888888", dataString.productCode)
          .replaceAll("生产地", dataString.adress)
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
      message.warning('请至少选择一条数据！并且打印日期和订单数量(大于0)不能为空!')
    }
  };


  //袋条码模板
  const bagCode = () => {
    LodopFuncs.getLodop()
    if (bagID.length == 0) {
      message.warning("请先勾选一条数据")
    } else {
      bagCreateOneFormPage()
      LODOP.On_Return = (TaskID, Value) => {
        setNoStart(Value)
      }
      LODOP.PRINT_DESIGN();
    }
  };

  const bagCreateOneFormPage = () => {
    eval(noStart);
  };


  // const bagCreateOneFormPage = async (selectedRowKeys) => {
  //   let data = await getBagTemp(selectedRowKeys)
  //   if (data.status == 200) {
  //     setNoStart(data.data.tempCode)
  //     setPrintTypeName(data.data.tempName)
  //     eval(data.data.tempCode)
  //   } else {
  //     message.warning(data.message)
  //   }
  // }

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



  //选择打印机
  const chengePint = () => {
    // LODOP.PRINTA();
    window.print()
  }





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
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse()
          ],
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
            <Input id="inputVal" />
          </Form.Item>,
          <Button type="primary" style={{ marginLeft: "10px" }} onClick={chengePint}> 选择打印机 </Button>,
          <Button type="primary" style={{ marginLeft: '10px' }} onClick={bagCode}>海外模板</Button>,
          <Button type="primary" style={{ marginLeft: '10px' }} onClick={pintBagCode}><ArrowDownOutlined />点击打印</Button>,
          <Button type="primary" style={{ marginLeft: '10px' }} onClick={bagCodeTest}>测试海外码</Button>

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

export default connect(({ printSea, user }) => ({ printSea, user }))(printSeaComponent);
