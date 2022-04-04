import { ArrowDownOutlined, ArrowUpOutlined, SmileOutlined } from "@ant-design/icons";
import { Button, message, TimePicker, DatePicker, Input, Tabs, Table, Form, Row, Col, Select, Tag, Pagination, Tooltip, notification } from "antd";
import React, { useState, useRef, useEffect } from "react";
import { Link, connect } from "umi";
import { PageContainer, FooterToolbar } from "@ant-design/pro-layout";
import ProTable from "@ant-design/pro-table";
import globalConfig from '../../../../config/defaultSettings';
import moment from "moment";
import ProDescriptions from "@ant-design/pro-descriptions";
import UpdateForm from "./components/UpdateForm";
import ExportJsonExcel from "js-export-excel";

import * as  LodopFuncs from "../../../utils/LodopFuncs.js";
import "../printMakeCopy/components/modal.css";
const ip = `${globalConfig.ip}:${globalConfig.port.sspalds_role}`;
import {
  getOnlyBarCodeList,
  getBoxBarCodeList,
  getBigBoxBarCodeList,
  printBarCode
} from "@/services/information/printMakeCopy";
import Checkbox from "antd/lib/checkbox/Checkbox";

const printMakeCopyComponent = ({ printMakeCopy, dispatch, user, pintCode }) => {
  const { materialList } = printMakeCopy
  const { currentUser } = user;
  const { TabPane } = Tabs;
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();


  // const [createModalVisible, handleModalVisible] = useState(false);
  const formItemLayout2 = globalConfig.table.formItemLayout2



  const columns1 = [

    {
      title: "物料代号",
      dataIndex: "materialNo",
      key: "materialNo",
      align: "center",
      fixed: "left",
    },

    {
      title: "打印批次",
      dataIndex: "batchNumber",
      key: "batchNumber",
      align: "center",
    },

    {
      title: "条码类型",
      dataIndex: "materialType",
      key: "materialType",
      align: "center",
      render: (text, record) => {
        return record.barCodeType
      },
    },

    {
      title: "只条码",
      dataIndex: "barCode",
      key: "barCode",
      align: "center",
      ellipsis: {
        showTitle: false,
      },
      align: "center",
      render: (barCode) => (
        <Tooltip placement="topLeft" title={barCode}>
          {barCode}
        </Tooltip>
      ),
    },


    {
      title: "中文名称",
      dataIndex: "materialName",
      key: "materialName",
      align: "center",
    },

    {
      title: "商品编码",
      dataIndex: "materialType",
      key: "materialType",
      align: "center",
      ellipsis: {
        showTitle: false,
      },
      align: "center",
      render: (materialType) => (
        <Tooltip placement="topLeft" title={materialType}>
          {materialType}
        </Tooltip>
      ),
    },
    {
      title: "物料描述",
      dataIndex: "materialDescription",
      key: "materialDescription",
      ellipsis: {
        showTitle: false,
      },
      align: "center",
      render: (modelDesc) => (
        <Tooltip placement="topLeft" title={modelDesc}>
          {modelDesc}
        </Tooltip>
      ),
    },
    {
      title: "打印时间",
      dataIndex: "printDateTime",
      key: "printDateTime",
      align: "center",
    },
    {
      title: "打印人员",
      dataIndex: "printer",
      key: "printer",
      align: "center",
    },

  ];

  const columns2 = [

    {
      title: "物料代号",
      dataIndex: "materialNo",
      key: "materialNo",
      align: "center",
      fixed: "left",
    },

    {
      title: "打印批次",
      dataIndex: "batchNumber",
      key: "batchNumber",
      align: "center",
    },

    {
      title: "条码类型",
      dataIndex: "materialType",
      key: "materialType",
      align: "center",
      render: (text, record) => {
        return record.barCodeType
      },
    },

    {
      title: "盒条码",
      dataIndex: "barCode",
      key: "barCode",
      align: "center",
      ellipsis: {
        showTitle: false,
      },
      align: "center",
      render: (barCode) => (
        <Tooltip placement="topLeft" title={barCode}>
          {barCode}
        </Tooltip>
      ),
    },


    {
      title: "中文名称",
      dataIndex: "materialName",
      key: "materialName",
      align: "center",
    },

    {
      title: "商品编码",
      dataIndex: "materialType",
      key: "materialType",
      align: "center",
      ellipsis: {
        showTitle: false,
      },
      align: "center",
      render: (materialType) => (
        <Tooltip placement="topLeft" title={materialType}>
          {materialType}
        </Tooltip>
      ),
    },
    {
      title: "物料描述",
      dataIndex: "materialDescription",
      key: "materialDescription",
      ellipsis: {
        showTitle: false,
      },
      align: "center",
      render: (modelDesc) => (
        <Tooltip placement="topLeft" title={modelDesc}>
          {modelDesc}
        </Tooltip>
      ),
    },
    {
      title: "打印时间",
      dataIndex: "printDateTime",
      key: "printDateTime",
      align: "center",
    },
    {
      title: "打印人员",
      dataIndex: "printer",
      key: "printer",
      align: "center",
    },
  ];

  const columns3 = [

    {
      title: "物料代号",
      dataIndex: "materialNo",
      key: "materialNo",
      align: "center",
      fixed: "left",
    },

    {
      title: "打印批次",
      dataIndex: "batchNumber",
      key: "batchNumber",
      align: "center",
    },

    {
      title: "条码类型",
      dataIndex: "materialType",
      key: "materialType",
      align: "center",
      render: (text, record) => {
        return record.barCodeType
      },
    },

    {
      title: "箱条码",
      dataIndex: "barCode",
      key: "barCode",
      align: "center",
      ellipsis: {
        showTitle: false,
      },
      align: "center",
      render: (barCode) => (
        <Tooltip placement="topLeft" title={barCode}>
          {barCode}
        </Tooltip>
      ),
    },


    {
      title: "中文名称",
      dataIndex: "materialName",
      key: "materialName",
      align: "center",
    },

    {
      title: "商品编码",
      dataIndex: "materialType",
      key: "materialType",
      align: "center",
      ellipsis: {
        showTitle: false,
      },
      align: "center",
      render: (materialType) => (
        <Tooltip placement="topLeft" title={materialType}>
          {materialType}
        </Tooltip>
      ),
    },
    {
      title: "物料描述",
      dataIndex: "materialDescription",
      key: "materialDescription",
      ellipsis: {
        showTitle: false,
      },
      align: "center",
      render: (modelDesc) => (
        <Tooltip placement="topLeft" title={modelDesc}>
          {modelDesc}
        </Tooltip>
      ),
    },
    {
      title: "打印时间",
      dataIndex: "printDateTime",
      key: "printDateTime",
      align: "center",
    },
    {
      title: "打印人员",
      dataIndex: "printer",
      key: "printer",
      align: "center",
    },

  ];

  const [dataSource1, setDataSource1] = useState([]);
  const [dataSource2, setDataSource2] = useState([]);
  const [dataSource3, setDataSource3] = useState([])
  const [noStart, setNoStart] = useState('')
  const [materialId1, setMaterialId1] = useState('');
  const [materialId2, setMaterialId2] = useState('');
  const [materialId3, setMaterialId3] = useState('');

  const [zhiString, setZhiString] = useState('')
  const [heString, setHeString] = useState('')
  const [boxString, setBoxString] = useState('')
  const [newImage, setNewImage] = useState('')
  const [zhiHidden1, setZhiHidden1] = useState(true)
  const [zhiHidden2, setZhiHidden2] = useState(false)
  const [heHidden1, setHeHidden1] = useState(true)
  const [heHidden2, setHeHidden2] = useState(false)
  const [boxHidden1, setBoxHidden1] = useState(true)
  const [boxHidden2, setBoxHidden2] = useState(false)


  const [printTypeName, setPrintTypeName] = useState(""); //设置打印单双排类型
  const [printTypeTimes, setPrintTypeTimes] = useState(0); //设置printTypeName更新次数  //tab标签切换获取index/key
  function callback(key) {
    if (key == "1") {
      zhiSearch();
    } else if (key == "2") {
      heSearch();
    } else {
      boxSearch();
    }
  }

  useEffect(() => {
    if (printTypeName !== "") {
      notification.open({
        message: "如果需要打印,请同时修改打印机对应模板!",
        description: printTypeName,
        duration: 8,
        icon: <SmileOutlined style={{ color: "red" }} />,
      });
    }
    // setPrintTypeTimes((printTypeTimes) => {
    //   return printTypeTimes + 1;
    // });
  }, [printTypeName]);



  //获取只码商品编码
  const changeMaterialId1 = (value) => {
    setMaterialId1(value)
  }

  //获取盒码商品编码
  const changeMaterialId2 = (value) => {
    setMaterialId2(value)
  }

  //获取箱码商品编码
  const changeMaterialId3 = (value) => {
    setMaterialId3(value)
  }



  //查询封装公用参数
  const params = (values) => {
    return {
      data: {
        startDate: moment(values.startDate).format(globalConfig.form.onlyDateFormat),
        endDate: moment(values.endDate).format(globalConfig.form.onlyDateFormat),
        barCode: values.barCode,
        materialId: values.materialId,
        batchNumber: values.batchNumber,
        materialNo: values.materialNo,
        typeDescription:values.typeDescription,
        state: 1,
      },
      pageNum: 1,
      pageSize: 100000,
      userId: user.currentUser.id
    }
  }


  //   @param 只条码 handleSearch 搜索
  const zhiSearch = (e) => {
    form1
      .validateFields()
      .then(async (values) => {
        if (values.materialId === undefined) {
          message.warning('请先选择商品编码')
        } else {
          let data = await getOnlyBarCodeList(params(values));
          if (data.status === 200) {
            setDataSource1(data.data.list);
            setZhiString(data.data.tempCode);
            setPrintTypeName(data.data.tempName);
            message.success(data.message)
          }
        }
      })
  }

  //盒条码查询
  const heSearch = (e) => {
    form2
      .validateFields()
      .then(async (values) => {
        if (values.materialId === undefined) {
          message.warning('请先选择商品编码')
        } else {
          let data = await getBoxBarCodeList(params(values));
          if (data.status === 200) {
            setDataSource2(data.data.list);
            setHeString(data.data.tempCode);
            setPrintTypeName(data.data.tempName);
            message.success(data.message)

          }
        }
      })
  }


  //箱条码查询
  const boxSearch = (e) => {
    form3
      .validateFields()
      .then(async (values) => {
        if (values.materialId === undefined) {
          message.warning('请先选择商品编码')
        } else {
          let data = await getBigBoxBarCodeList(params(values));
          if (data.status === 200) {
            if (data.data.threeC === "0") {
              setNewImage('')
            } else if (data.data.threeC === "1") {
              setNewImage(`<img src='${ip}/DLX_OEM/api/3c.png'>`)
            } else {
              setNewImage(`<img src='${ip}/DLX_OEM/api/cqc.png'>`)
            }
            setDataSource3(data.data.list);
            setBoxString(data.data.tempCode);
            setPrintTypeName(data.data.tempName);
            message.success(data.message)

          }
        }
      })
  }





  //点击打印只条码  只---开始
  const pintZhiCode = async () => {
    LodopFuncs.getLodop()
    if (materialId1 == "") {
      message.warning('请先选择商品编码')
    } else {

      let content = noStart;
      if (content === "") {
        eval(zhiString)
        content = zhiString.split('LODOP.ADD_PRINT_TEXT(0, 0, 0, 0, "");')
      } else {
        content = noStart.split('LODOP.ADD_PRINT_TEXT(0,0,0,0,"");')
      }
      let data = await printBarCode({
        barCodeType: 1,
        materialId: materialId1,
        state: 1,
        userId: user.currentUser.id,
        startDate: moment(document.getElementById("form_in_modal_startDate").value).format(
          globalConfig.form.onlyDateFormat
        ),
        endDate: moment(document.getElementById("form_in_modal_endDate").value).format(
          globalConfig.form.onlyDateFormat
        ),
        barCode: document.getElementById("form_in_modal_barCode").value,
        batchNumber: document.getElementById("form_in_modal_batchNumber").value,
        materialNo: document.getElementById("form_in_modal_materialNo").value,
        typeDescription:document.getElementById("form_in_modal_typeDescription").value,
      });
      if (data.status == 200) {
        var dataString = data.data.barCodeList
        var qrCodeList = data.data.qrCodeList
        var zhiLeftList = content[0].replaceAll('9876543210', dataString[0]).replaceAll('1234567890', qrCodeList[0])
        if (dataString.length == 1) {
          eval(zhiLeftList)
        } else {
          var zhiRightList = content[1].replaceAll('kjihgfedcba', dataString[1]).replaceAll('abcdefghijk', qrCodeList[1])
          eval(zhiLeftList + zhiRightList)
        }
        LODOP.PRINT();

        for (let i = 2; i < dataString.length; i++) {
          LODOP.SET_PRINT_PAGESIZE(1, 3, "A3");
          if (i % 2 == 0) {
            // 左边
            zhiLeftList = zhiLeftList.replaceAll(dataString[i - 2], dataString[i]).replaceAll(qrCodeList[i - 2], qrCodeList[i])
            if (i == dataString.length - 1) {
              eval(zhiLeftList)
              LODOP.PRINT();
              LODOP.PRINT_INIT("");
            }
          } else {
            zhiRightList = zhiRightList.replaceAll(dataString[i - 2], dataString[i]).replaceAll(qrCodeList[i - 2], qrCodeList[i])
            eval(zhiLeftList + zhiRightList)
            LODOP.PRINT();
            LODOP.PRINT_INIT("");
          }
        }
        message.info("打印中，请稍等...")
        zhiSearch()
      } else {
        message.error(data.message)
      }
    }
  };




  //只条码模板
  const zhiCode = () => {
    LodopFuncs.getLodop()
    if (materialId1 == "") {
      message.warning('请先选择商品编码')
    } else {
      zhiCreateOneFormPage()
      LODOP.On_Return = (TaskID, Value) => {
        setNoStart(Value)
      }
      LODOP.PRINT_DESIGN();
    }
  };


  const zhiCreateOneFormPage = () => {
    eval(zhiString)
  };

  //测试只模板
  const zhiCodeTest = () => {
    LodopFuncs.getLodop()
    var zhiList = zhiString.replace('服务热线:', "服务热线:").
      replace('4008268008', "4008268008").
      replace('S/N:', "S/N:").
      replace('1234567890', "http://m.delixi-electric.com/c/?qrcode=3vob10A00030000011").
      replace('abcdefghijk', "http://m.delixi-electric.com/c/?qrcode=3vob10A00030000021").
      replace('9876543210', "3vob10A00030000011").
      replace('kjihgfedcba', "3vob10A00030000021")
    eval(zhiList)
    LODOP.ADD_PRINT_TEXT(23,9,81,31,"测试只码");
    LODOP.SET_PRINT_STYLEA(0,"FontName","华文彩云");
    LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
    LODOP.SET_PRINT_STYLEA(0,"FontColor","#EEC591");
    LODOP.SET_PRINT_STYLEA(0,"Angle",20);
    LODOP.SET_PRINT_STYLEA(0,"Repeat",1);
    LODOP.PRINT_DESIGN();
  }
  // 只---结束






  //点击打印盒条码  盒---开始
  const pintHeCode = async () => {
    LodopFuncs.getLodop()
    if (materialId2 == "") {
      message.warning('请先选择商品编码')
    } else {

      let content = noStart
      if (content === "") {
        eval(heString)
        content = heString.split('LODOP.ADD_PRINT_TEXT(0, 0, 0, 0, "");')
      } else {
        content = noStart.split('LODOP.ADD_PRINT_TEXT(0,0,0,0,"");')
      }
      let data = await printBarCode({
        barCodeType: 2,
        materialId: materialId2,
        state: 1,
        userId: user.currentUser.id,
        startDate: moment(document.getElementById("form_in_modal_startDate").value).format(
          globalConfig.form.onlyDateFormat
        ),
        endDate: moment(document.getElementById("form_in_modal_endDate").value).format(
          globalConfig.form.onlyDateFormat
        ),
        barCode: document.getElementById("form_in_modal_barCode").value,
        batchNumber: document.getElementById("form_in_modal_batchNumber").value,
        materialNo: document.getElementById("form_in_modal_materialNo").value,
        typeDescription:document.getElementById("form_in_modal_typeDescription").value,
      });
      if (data.status == 200 && data.data.barCodeList.length > 0) {
        var dataString = data.data.barCodeList
        var printDateList = data.data.printDateList
        var materialList = data.data.materialList
        // var countList = data.data.countList
        if (printTypeName.includes("双排")) {

          var nums = []
          data.data.countList.map(item => {
            nums.push('×' + item)
          })
          var countList = nums
          debugger
          var heLeftList = content[0].replaceAll('1234567890A', dataString[0])
            .replaceAll('2022-01-01A', printDateList[0])
            .replaceAll('装盒A', countList[0])
            .replaceAll("物料型号A", materialList[0].materialType)
            .replaceAll("物料描述A", materialList[0].typeDescription)
            .replaceAll("系列123A", materialList[0].serial)
            .replaceAll("检02A", materialList[0].examination)
            .replaceAll("GB/tA", materialList[0].standard)
            .replaceAll("浙江省A", materialList[0].address)
            .replaceAll("上海灵娃A", materialList[0].productionPlant)
            .replaceAll("8888888888A", materialList[0].caseIEAN13)
            .replaceAll("9999999999A", materialList[0].caseITF14)
            .replaceAll("中文名称A", materialList[0].materialName);
          if (materialList[0].standard === "无" ||
            materialList[0].standard === "" ||
            materialList[0].standard === null) {
            heLeftList = heLeftList.replace("执行标准:", "").replace('无', '').replace(null, '')
          }
          if (materialList[0].serial === "" ||
            materialList[0].serial === null) {
            heLeftList = heLeftList.replace('系列', '').replace(null, '')
          }
          if (dataString.length == 1) {
            eval(heLeftList)
          } else {
            var heRightList = content[1]
              .replaceAll("1234567890B", dataString[1])
              .replaceAll("2022-01-01B", printDateList[1])
              .replaceAll("装盒B", countList[1])
              .replaceAll("物料型号B", materialList[1].materialType)
              .replaceAll("物料描述B", materialList[1].typeDescription)
              .replaceAll("系列123B", materialList[1].serial)
              .replaceAll("检02B", materialList[1].examination)
              .replaceAll("GB/tB", materialList[1].standard)
              .replaceAll("浙江省B", materialList[1].address)
              .replaceAll("上海灵娃B", materialList[1].productionPlant)
              .replaceAll("8888888888B", materialList[1].caseIEAN13)
              .replaceAll("9999999999B", materialList[1].caseITF14)
              .replaceAll("中文名称B", materialList[1].materialName);
            if (materialList[1].standard === "无" ||
              materialList[1].standard === "" ||
              materialList[1].standard === null) {
              heRightList = heRightList.replace("执行标准:", "").replace('无', '').replace(null, '')
            }
            if (materialList[1].serial === "" ||
              data.datmaterialList[1].serial === null) {
              heRightList = heRightList.replace('系列', '').replace(null, '')
            }
            eval(heLeftList + heRightList)
          }

          LODOP.PRINT();
          for (let i = 2; i < dataString.length; i++) {
            LODOP.SET_PRINT_PAGESIZE(1, 3, "A3");
            if (i % 2 == 0) {
              // 左边
              heLeftList = heLeftList.replaceAll(dataString[i - 2], dataString[i])
                .replaceAll(printDateList[i - 2], printDateList[i])
                .replaceAll(countList[i - 2], countList[i])
                .replaceAll(materialList[i - 2].materialType, materialList[i].materialType)
                .replaceAll(materialList[i - 2].typeDescription, materialList[i].typeDescription)
                .replaceAll(materialList[i - 2].serial, materialList[i].serial)
                .replaceAll(materialList[i - 2].examination, materialList[i].examination)
                .replaceAll(materialList[i - 2].standard, materialList[i].standard)
                .replaceAll(materialList[i - 2].address, materialList[i].address)
                .replaceAll(materialList[i - 2].productionPlant, materialList[i].productionPlant)
                .replaceAll(materialList[i - 2].caseIEAN13, materialList[i].caseIEAN13)
                .replaceAll(materialList[i - 2].caseITF14, materialList[i].caseITF14)
                .replaceAll(materialList[i - 2].materialName, materialList[i].materialName)

              if (i == dataString.length - 1) {
                eval(heLeftList)
                LODOP.PRINT();
                LODOP.PRINT_INIT("");
              }
            } else {
              heRightList = heRightList
                .replaceAll(dataString[i - 2], dataString[i])
                .replaceAll(printDateList[i - 2], printDateList[i])
                .replaceAll(countList[i - 2], countList[i])
                .replaceAll(materialList[i - 2].materialType, materialList[i].materialType)
                .replaceAll(materialList[i - 2].typeDescription, materialList[i].typeDescription)
                .replaceAll(materialList[i - 2].serial, materialList[i].serial)
                .replaceAll(materialList[i - 2].examination, materialList[i].examination)
                .replaceAll(materialList[i - 2].standard, materialList[i].standard)
                .replaceAll(materialList[i - 2].address, materialList[i].address)
                .replaceAll(materialList[i - 2].productionPlant, materialList[i].productionPlant)
                .replaceAll(materialList[i - 2].caseIEAN13, materialList[i].caseIEAN13)
                .replaceAll(materialList[i - 2].caseITF14, materialList[i].caseITF14)
                .replaceAll(materialList[i - 2].materialName, materialList[i].materialName)
              eval(heLeftList + heRightList)
              LODOP.PRINT();
              LODOP.PRINT_INIT("");
            }
          }
          message.info("打印中，请稍等...")
          heSearch()
        } else {
          var countList = data.data.countList;
          var heList = content[0]
            .replaceAll("1234567890", dataString[0])
            .replaceAll("2022-01-01", printDateList[0])
            .replaceAll("装盒", countList[0])
            .replaceAll("物料型号", materialList[0].materialType)
            .replaceAll("物料描述", materialList[0].typeDescription)
            .replaceAll("系列123", materialList[0].serial)
            .replaceAll("检02", materialList[0].examination)
            .replaceAll("GB/t", materialList[0].standard)
            .replaceAll("浙江省", materialList[0].address)
            .replaceAll("上海灵娃", materialList[0].productionPlant)
            .replaceAll("8888888888", materialList[0].caseIEAN13)
            .replaceAll("9999999999", materialList[0].caseITF14)
            .replaceAll("中文名称", materialList[0].materialName);

          if (
            materialList[0].standard === "无" ||
            materialList[0].standard === "" ||
            materialList[0].standard === null
          ) {
            heList = heList
              .replace("执行标准:", "")
              .replace("无", "")
              .replace(null, "");
          }
          if (
            materialList[0].serial === "" ||
            materialList[0].serial === null
          ) {
            heList = heList.replace("系列", "").replace(null, "");
          }
          eval(heList);
          LODOP.PRINT();
          for (var i = 0; i < dataString.length; i++) {
            if (i > 0) {
              LODOP.SET_PRINT_PAGESIZE(1, 3, "A3");
              heList = heList.replaceAll(dataString[i - 1], dataString[i]).
                replaceAll(printDateList[i - 1], printDateList[i]).
                replaceAll(countList[i - 1], countList[i]).
                replaceAll(materialList[i - 1].materialType, materialList[i].materialType).
                replaceAll(materialList[i - 1].typeDescription, materialList[i].typeDescription).
                replaceAll(materialList[i - 1].serial, materialList[i].serial).
                replaceAll(materialList[i - 1].examination, materialList[i].examination).
                replaceAll(materialList[i - 1].standard, materialList[i].standard).
                replaceAll(materialList[i - 1].address, materialList[i].address).
                replaceAll(materialList[i - 1].productionPlant, materialList[i].productionPlant).
                replaceAll(materialList[i - 1].caseIEAN13, materialList[i].caseIEAN13).
                replaceAll(materialList[i - 1].caseITF14, materialList[i].caseITF14).
                replaceAll(materialList[i - 1].materialName, materialList[i].materialName);
              console.log("heList123", heList);
              eval(heList);
              LODOP.PRINT();
              LODOP.PRINT_INIT("");
            }
          }
          message.info("打印中，请稍等...");
          heSearch()
        }
      } else {
        message.info(data.message)
      }
    }
  };



  //盒条码模板
  const heCode = () => {
    LodopFuncs.getLodop()
    if (materialId2 == "") {
      message.warning('请先选择商品编码')
    } else {
      heCreateOneFormPage()
      LODOP.On_Return = (TaskID, Value) => {
        setNoStart(Value)
      }
      LODOP.PRINT_DESIGN();
    }

  };


  const heCreateOneFormPage = () => {
    eval(heString)
  };

  // 盒---结束


  //测试盒模板
  const heCodeTest = () => {
    LodopFuncs.getLodop()
    var heList = heString.replace('1234567890A', "1234567890").
      replace('2022-01-01A', "2022-01-01").
      replace('物料型号A', "CDCH6i16201N").
      replace('物料描述A', "CDCH6i16A2P1NC220-240V").
      replace('装盒A', "×10").
      replace('检02A', '检02').
      replace('GB/tA', "GB/t").
      replace('浙江省A', "浙江省").
      replace('上海灵娃A', "上海灵娃").
      replace('系列A', "系列").
      replace('系列123A', "领航者").
      replace('8888888888A', "8888888888").
      replace('9999999999A', "9999999999").
      replace('中文名称A', "家用交流电接触器").
      replace('箱盒数', "S").
      replace('1234567890B', "1234567890").
      replace('2022-01-01B', "2022-01-01").
      replace('物料型号B', "CDCH6i16201N").
      replace('物料描述B', "CDCH6i16A2P1NC220-240V").
      replace('装盒B', "×10").
      replace('检02B', '检02').
      replace('GB/tB', "GB/t").
      replace('浙江省B', "浙江省").
      replace('上海灵娃B', "上海灵娃").
      replace('系列B', "系列").
      replace('系列123B', "领航者").
      replace('8888888888B', "8888888888").
      replace('9999999999B', "9999999999").
      replace('中文名称B', "家用交流电接触器")
    eval(heList)
    LODOP.ADD_PRINT_LINE("36.99mm","43.89mm","36.99mm","92.1mm",0,1);
    LODOP.ADD_PRINT_TEXT(57,53,115,35,"测试盒码");
    LODOP.SET_PRINT_STYLEA(0,"FontName","华文彩云");
    LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
    LODOP.SET_PRINT_STYLEA(0,"FontColor","#EEC591");
    LODOP.SET_PRINT_STYLEA(0,"Angle",20);
    LODOP.SET_PRINT_STYLEA(0,"Repeat",1);
    LODOP.PRINT_DESIGN();
  }




  //点击打印箱条码  箱---开始



  const pintBoxCode = async () => {
    LodopFuncs.getLodop()
    if (materialId3 == "") {
      message.warning('请先选择商品编码')
    } else {

      let content = noStart
      if (content === "") {
        eval(boxString)
        content = boxString
      }

      let data = await printBarCode({
        barCodeType: 3,
        materialId: materialId3,
        state: 1,
        userId: user.currentUser.id,
        startDate: moment(document.getElementById("form_in_modal_startDate").value).format(
          globalConfig.form.onlyDateFormat
        ),
        endDate: moment(document.getElementById("form_in_modal_endDate").value).format(
          globalConfig.form.onlyDateFormat
        ),
        barCode: document.getElementById("form_in_modal_barCode").value,
        batchNumber: document.getElementById("form_in_modal_batchNumber").value,
        materialNo: document.getElementById("form_in_modal_materialNo").value,
        typeDescription:document.getElementById("form_in_modal_typeDescription").value,
      });
      if (data.status == 200) {
        debugger

        var dataString = data.data.barCodeList
        var printDateList = data.data.printDateList
        var materialList = data.data.materialList
        // var countList = data.data.countList

        var nums = [];
        data.data.countList.map((item) => {
          nums.push("×" + item);
        });
        var countList = nums;

        var dataStringNew = []
        var printDateListNew = []
        var countListNew = []
        var materialListNew = [];

        dataStringNew = JSON.parse(JSON.stringify(dataString))
        dataString.map((item, index) => {
          dataStringNew.splice(index * 2, 0, item);
        })
        printDateListNew = JSON.parse(JSON.stringify(printDateList))
        printDateList.map((item, index) => {
          printDateListNew.splice(index * 2, 0, item);
        })
        countListNew = JSON.parse(JSON.stringify(countList))
        countList.map((item, index) => {
          countListNew.splice(index * 2, 0, item);
        })
        materialListNew = JSON.parse(JSON.stringify(materialList));
        materialList.map((item, index) => {
          materialListNew.splice(index * 2, 0, item);
        });


        var boxList = content
          .replaceAll("1234567890", dataStringNew[0])
          .replaceAll("2022-01-01", printDateListNew[0])
          .replaceAll("装箱", countListNew[0])
          .replaceAll("物料型号", materialListNew[0].materialType)
          .replaceAll("物料描述", materialListNew[0].typeDescription)
          .replaceAll("检02", materialListNew[0].examination)
          .replaceAll("浙江省", materialListNew[0].address)
          .replaceAll("GB/t", materialListNew[0].standard)
          .replaceAll("系列123", materialListNew[0].serial)
          .replaceAll("上海灵娃", materialListNew[0].productionPlant)
          .replaceAll("8888888888", materialListNew[0].boxIEAN13)
          .replaceAll("9999999999", materialListNew[0].boxITF14)
          .replaceAll("装箱", materialListNew[0].cartonsNumber)
          .replaceAll("箱重", materialListNew[0].bigBoxWeight)
          .replaceAll("中文名称", materialListNew[0].materialName)
          .replaceAll("箱盒数", materialListNew[0].oneLogo)
          .replaceAll(`<img src='${ip}/DLX_OEM/api/3c.png'>`, newImage);
        if (materialList[0].standard === "无" || materialList[0].standard === "" || materialList[0].standard === null) {
          boxList = boxList.replace("执行标准:", "").replace('无', '').replace(null, '')
        }
        if (materialList[0].serial === "" || materialList[0].serial === null) {
          boxList = boxList.replace('系列', '').replace(null, '')
        }
        if (materialList[0].oneLogo === "" || materialList[0].oneLogo === null) {
          boxList = boxList.replace('箱盒数', '').replace(null, '')
        }
        eval(boxList)

        LODOP.PRINT();
        for (var i = 0; i < dataStringNew.length; i++) {
          if (i > 0) {
            LODOP.SET_PRINT_PAGESIZE(1, 3, "A3");
            boxList = boxList.replaceAll(dataStringNew[i - 1], dataStringNew[i]).
              replaceAll(printDateListNew[i - 1], printDateListNew[i]).
              replaceAll(countListNew[i - 1], countListNew[i]).
              replaceAll(materialListNew[i - 1].typeDescription, materialListNew[i].typeDescription).
              replaceAll(materialListNew[i - 1].examination, materialListNew[i].examination).
              replaceAll(materialListNew[i - 1].address, materialListNew[i].address).
              replaceAll(materialListNew[i - 1].standard, materialListNew[i].standard).
              replaceAll(materialListNew[i - 1].serial, materialListNew[i].serial).
              replaceAll(materialListNew[i - 1].productionPlant, materialListNew[i].productionPlant).
              replaceAll(materialListNew[i - 1].boxIEAN13, materialListNew[i].boxIEAN13).
              replaceAll(materialListNew[i - 1].boxITF14, materialListNew[i].boxITF14).
              replaceAll(materialListNew[i - 1].cartonsNumber, materialListNew[i].cartonsNumber).
              replaceAll(materialListNew[i - 1].bigBoxWeight, materialListNew[i].bigBoxWeight).
              replaceAll(materialListNew[i - 1].materialName, materialListNew[i].materialName).
              replaceAll(materialListNew[i - 1].oneLogo, materialListNew[i].oneLogo).
              replaceAll(`<img src='${ip}/DLX_OEM/api/3c.png'>`, newImage)
            // console.log('heList123', boxList)
            eval(boxList)
            LODOP.PRINT();
            LODOP.PRINT_INIT("");
          }
        }
        boxSearch()
      }
    }
  };


  //箱条码模板
  const boxCode = () => {
    LodopFuncs.getLodop()
    if (materialId3 == "") {
      message.warning('请先选择商品编码')
    } else {
      boxCreateOneFormPage()
      LODOP.On_Return = (TaskID, Value) => {
        setNoStart(Value)
      }
      LODOP.PRINT_DESIGN();
    }

  };


  const boxCreateOneFormPage = () => {
    eval(boxString)
  };


  //测试箱箱模板
  const boxCodeTest = () => {
    LodopFuncs.getLodop()
    var boxList = boxString.replace('1234567890', "1234567890").
      replaceAll('2022-01-01', "2022-01-01").
      replace('物料型号', "CDCH6i16201N").
      replace('物料描述', "CDCH6i16A2P1NC220-240V").
      replace('装盒', 10).
      replace('检02', '检02').
      replace('GB/t', "GB/t").
      replace('浙江省', "浙江省").
      replace('上海灵娃', "上海灵娃").
      replace('X85220322A00030001', "X85220322A00030001").
      replace('X85220322A00030001', "X85220322A00030001").
      replace('中文名称', "家用交流电接触器").
      replace('装箱', 10).
      replace('装盒', 10).
      replace('箱重', 10).
      replace('箱盒数', 10).
      replace('系列123', "领航者").
      replace(`<img src='${ip}/DLX_OEM/api/3c.png'>`, `<img src='${ip}/DLX_OEM/api/3c.png'>`)
    eval(boxList)
    LODOP.ADD_PRINT_LINE("36.99mm","43.89mm","36.99mm","92.1mm",0,1);
    LODOP.ADD_PRINT_TEXT(57,53,115,35,"测试箱码");
    LODOP.SET_PRINT_STYLEA(0,"FontName","华文彩云");
    LODOP.SET_PRINT_STYLEA(0,"FontSize",12);
    LODOP.SET_PRINT_STYLEA(0,"FontColor","#EEC591");
    LODOP.SET_PRINT_STYLEA(0,"Angle",20);
    LODOP.SET_PRINT_STYLEA(0,"Repeat",1);
    LODOP.PRINT_DESIGN();
    LODOP.PRINT_DESIGN();
  }
  // 箱---结束



  // 只搜索折叠
  const zhiToggol = () => {
    setZhiHidden1(false)
    setZhiHidden2(true)
  }
  const zhiToggo2 = () => {
    setZhiHidden1(true)
    setZhiHidden2(false)
  }


  // 盒子搜索折叠
  const heToggol = () => {
    setHeHidden1(false)
    setHeHidden2(true)
  }
  const heToggo2 = () => {
    setHeHidden1(true)
    setHeHidden2(false)
  }

  // 箱子搜索折叠
  const boxToggol = () => {
    setBoxHidden1(false)
    setBoxHidden2(true)
  }
  const boxToggo2 = () => {
    setBoxHidden1(true)
    setBoxHidden2(false)
  }



  return (
    <PageContainer>
      <Tabs onChange={callback} type="card" style={{ background: "#fff" }}>
        <TabPane tab="只条码" key="1">

          <Form
            onFinish={zhiSearch}
            form={form1}
            name="form_in_modal"
            initialValues={{
              startDate: moment().subtract("years"),
              endDate: moment().endOf('day')
            }}
          >
            <Row>

              <Col span={5} style={{ display: 'block' }} >
                <Form.Item
                  name="startDate"
                  label="开始时间"
                  hasFeedback
                  {...formItemLayout2}
                >
                  <DatePicker
                    style={{ width: '100%' }} format={globalConfig.form.onlyDateFormat} allowClear={false} />
                </Form.Item>
              </Col>

              <Col span={5} style={{ display: 'block' }}>
                <Form.Item
                  name="endDate"
                  label="结束时间"
                  hasFeedback
                  {...formItemLayout2}
                >
                  <DatePicker
                    style={{ width: '100%' }} format={globalConfig.form.onlyDateFormat} allowClear={false} />
                </Form.Item>
              </Col>



              <Col span={5} style={{ display: 'block' }} hidden={zhiHidden1}>
                <Form.Item
                  name="barCode"
                  label="只条码"
                  hasFeedback
                  {...formItemLayout2}
                >
                  <Input></Input>
                </Form.Item>
              </Col>
              <Col span={5} style={{ display: 'block' }}>
                <Form.Item
                  name="materialId"
                  label="商品编码"
                  hasFeedback
                  {...formItemLayout2}
                >
                  <Select
                    // allowClear
                    showSearch
                    onChange={changeMaterialId1}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    {materialList.map(function (item, index) {
                      return <Select.Option key={index} value={item.key}>{item.label}</Select.Option>
                    })}
                  </Select>
                </Form.Item>
              </Col>


              <Col span={5} style={{ display: 'block' }} hidden={zhiHidden1}>
                <Form.Item
                  name="typeDescription"
                  label="物料描述"
                  hasFeedback
                  {...formItemLayout2}
                >
                  <Input></Input>

                </Form.Item>
              </Col>

              <Col span={5} style={{ display: "block" }} hidden={zhiHidden1}>
                <Form.Item
                  name="materialNo"
                  label="物料代号"
                  hasFeedback
                  {...formItemLayout2}
                >
                  <Input></Input>
                </Form.Item>
              </Col>


              <Col span={5} style={{ display: 'block' }} hidden={zhiHidden1}>
                <Form.Item
                  name="batchNumber"
                  label="打印批次"
                  hasFeedback
                  {...formItemLayout2}
                >
                  <Input></Input>

                </Form.Item>
              </Col>

              <Col span={8} style={{ textAlign: 'right' }}>
                <Button type="primary" htmlType="submit" style={{ marginLeft: '10px' }}>查询</Button>
                <Button type="primary" style={{ marginLeft: '10px' }} onClick={zhiCode}>只码模板</Button>
                <Button type="primary" style={{ marginLeft: '10px' }} onClick={pintZhiCode}><ArrowDownOutlined />点击打印</Button>
                <Button type="primary" style={{ marginLeft: '10px' }} onClick={zhiCodeTest} >测试只码 </Button>
                <Button type="primary" style={{ marginLeft: '10px' }} shape="circle" onClick={zhiToggol} hidden={zhiHidden2}> <ArrowDownOutlined /></Button>
                <Button type="primary" style={{ marginLeft: '10px' }} shape="circle" onClick={zhiToggo2} hidden={zhiHidden1}> <ArrowUpOutlined /></Button>
              </Col>
            </Row>
          </Form>

          <Table
            className="flex-table"
            dataSource={dataSource1}
            columns={columns1}
            style={{ padding: "0 20px" }}
            rowKey="id"
            scroll={{
              y: '100%'
            }}
            pagination={{ showTotal: total => `总共 ${dataSource1.length} 条`, }}
          // pagination= {{ pageSize: 20 }}
          />
          {/* <Pagination
            total={dataSource1.length}
            showTotal={(total, range) => `第 ${range[0]}${range[1]} 条/ 总共 ${dataSource1.length} 条`}
            defaultPageSize={10}
            defaultCurrent={1}
            style={{ textAlign: 'right', padding: '15px' }}
          /> */}
        </TabPane>
        <TabPane tab="盒条码" key="2">
          <Form
            onFinish={heSearch}
            form={form2}
            name="form_in_modal"
            initialValues={{
              startDate: moment().subtract("years"),
              endDate: moment().endOf('day')
            }}
          >
            <Row>
              <Col span={5} style={{ display: 'block' }}>
                <Form.Item
                  name="startDate"
                  label="开始时间"
                  hasFeedback
                  {...formItemLayout2}
                >
                  <DatePicker
                    style={{ width: '100%' }} format={globalConfig.form.onlyDateFormat} allowClear={false} />
                </Form.Item>
              </Col>

              <Col span={5} style={{ display: 'block' }} >
                <Form.Item
                  name="endDate"
                  label="结束时间"
                  hasFeedback
                  {...formItemLayout2}
                >
                  <DatePicker
                    style={{ width: '100%' }} format={globalConfig.form.onlyDateFormat} allowClear={false} />
                </Form.Item>
              </Col>



              <Col span={5} style={{ display: 'block' }} hidden={heHidden1}>
                <Form.Item
                  name="barCode"
                  label="盒条码"
                  hasFeedback
                  {...formItemLayout2}
                >
                  <Input></Input>

                </Form.Item>
              </Col>
              <Col span={5} style={{ display: 'block' }}>
                <Form.Item
                  name="materialId"
                  label="商品编码"
                  hasFeedback
                  {...formItemLayout2}
                >
                  <Select
                    // allowClear
                    showSearch
                    onChange={changeMaterialId2}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    {materialList.map(function (item, index) {
                      return <Select.Option key={index} value={item.key}>{item.label}</Select.Option>
                    })}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={5} style={{ display: 'block' }} hidden={heHidden1}>
                <Form.Item
                  name="typeDescription"
                  label="物料描述"
                  hasFeedback
                  {...formItemLayout2}
                >
                  <Input></Input>

                </Form.Item>
              </Col>

              <Col span={5} style={{ display: "block" }} hidden={heHidden1}>
                <Form.Item
                  name="materialNo"
                  label="物料代号"
                  hasFeedback
                  {...formItemLayout2}
                >
                  <Input></Input>
                </Form.Item>
              </Col>

              <Col span={5} style={{ display: 'block' }} hidden={heHidden1}>
                <Form.Item
                  name="batchNumber"
                  label="打印批次"
                  hasFeedback
                  {...formItemLayout2}
                >
                  <Input></Input>

                </Form.Item>
              </Col>
              <Col span={8} style={{ textAlign: 'right' }}>
                <Button type="primary" htmlType="submit" style={{ marginLeft: '10px' }}>查询</Button>
                <Button type="primary" style={{ marginLeft: '10px' }} onClick={heCode} >盒码模板</Button>
                <Button type="primary" style={{ marginLeft: '10px' }} onClick={pintHeCode}><ArrowDownOutlined />点击打印</Button>
                <Button type="primary" style={{ marginLeft: '10px' }} onClick={heCodeTest} >测试盒码 </Button>
                <Button type="primary" style={{ marginLeft: '10px' }} shape="circle" onClick={heToggol} hidden={heHidden2}> <ArrowDownOutlined /></Button>
                <Button type="primary" style={{ marginLeft: '10px' }} shape="circle" onClick={heToggo2} hidden={heHidden1}> <ArrowUpOutlined /></Button>
              </Col>
            </Row>


          </Form>
          <Table
            className="flex-table"
            dataSource={dataSource2}
            columns={columns2}
            style={{ padding: "0 20px" }}
            rowKey="id"
            scroll={{
              y: '100%'
            }}
            // pagination= {{ pageSize: 20 }}
            pagination={{ showTotal: total => `总共 ${dataSource2.length} 条`, }}
          />
          {/* <Pagination
            total={15}
            showTotal={(total, range) => `第 ${range[0]}-${range[1]} 条/ 总共 ${total} 条`}
            defaultPageSize={20}
            defaultCurrent={1}
            style={{ textAlign: 'right', padding: '15px' }}
          /> */}

        </TabPane>
        <TabPane tab="箱条码" key="3">
          <Form
            onFinish={boxSearch}
            form={form3}
            name="form_in_modal"
            initialValues={{
              startDate: moment().subtract("years"),
              endDate: moment().endOf('day')
            }}
          >
            <Row>
              <Col span={5} style={{ display: 'block' }} >
                <Form.Item
                  name="startDate"
                  label="开始时间"
                  hasFeedback
                  {...formItemLayout2}
                >
                  <DatePicker
                    style={{ width: '100%' }} format={globalConfig.form.onlyDateFormat} allowClear={false} />
                </Form.Item>
              </Col>

              <Col span={5} style={{ display: 'block' }}>
                <Form.Item
                  name="endDate"
                  label="结束时间"
                  hasFeedback
                  {...formItemLayout2}
                >
                  <DatePicker
                    style={{ width: '100%' }} format={globalConfig.form.onlyDateFormat} allowClear={false} />
                </Form.Item>
              </Col>



              <Col span={5} style={{ display: 'block' }} hidden={boxHidden1}>
                <Form.Item
                  name="barCode"
                  label="箱条码"
                  hasFeedback
                  {...formItemLayout2}
                >
                  <Input></Input>

                </Form.Item>
              </Col>
              <Col span={5} style={{ display: 'block' }}>
                <Form.Item
                  name="materialId"
                  label="商品编码"
                  hasFeedback
                  {...formItemLayout2}
                >
                  <Select
                    // allowClear
                    showSearch
                    onChange={changeMaterialId3}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    {materialList.map(function (item, index) {
                      return <Select.Option key={index} value={item.key}>{item.label}</Select.Option>
                    })}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={5} style={{ display: 'block' }} hidden={boxHidden1}>
                <Form.Item
                  name="typeDescription"
                  label="物料描述"
                  hasFeedback
                  {...formItemLayout2}
                >
                  <Input></Input>

                </Form.Item>
              </Col>

              <Col span={5} style={{ display: "block" }} hidden={boxHidden1}>
                <Form.Item
                  name="materialNo"
                  label="物料代号"
                  hasFeedback
                  {...formItemLayout2}
                >
                  <Input></Input>
                </Form.Item>
              </Col>


              <Col span={5} style={{ display: 'block' }} hidden={boxHidden1}>
                <Form.Item
                  name="batchNumber"
                  label="打印批次"
                  hasFeedback
                  {...formItemLayout2}
                >
                  <Input></Input>

                </Form.Item>
              </Col>

              <Col span={8} style={{ textAlign: 'right' }}>
                <Button type="primary" htmlType="submit" style={{ marginLeft: '10px' }}>查询</Button>
                <Button type="primary" style={{ marginLeft: '10px' }} onClick={boxCode}> 箱码模板</Button>
                <Button type="primary" style={{ marginLeft: '10px' }} onClick={pintBoxCode}><ArrowDownOutlined />点击打印</Button>
                <Button type="primary" style={{ marginLeft: '10px' }} onClick={boxCodeTest} >测试箱码 </Button>
                <Button type="primary" style={{ marginLeft: '10px' }} shape="circle" onClick={boxToggol} hidden={boxHidden2}> <ArrowDownOutlined /></Button>
                <Button type="primary" style={{ marginLeft: '10px' }} shape="circle" onClick={boxToggo2} hidden={boxHidden1}> <ArrowUpOutlined /></Button>

              </Col>

            </Row>

          </Form>
          <Table
            className="flex-table"
            dataSource={dataSource3}
            columns={columns3}
            style={{ padding: "0 20px" }}
            rowKey="id"
            scroll={{
              y: '100%'
            }}
            pagination={{ showTotal: total => `总共 ${dataSource3.length} 条`, }}
          // pagination= {{ pageSize: 20 }}
          />
          {/* <Pagination
            total={15}
            showTotal={(total, range) => `第 ${range[0]}-${range[1]} 条/ 总共 ${total} 条`}
            defaultPageSize={20}
            defaultCurrent={1}
            style={{ textAlign: 'right', padding: '15px' }}
          /> */}

        </TabPane>
      </Tabs>

    </PageContainer>
  );
};

export default connect(({ printMakeCopy, user }) => ({ printMakeCopy, user }))(
  printMakeCopyComponent
);
