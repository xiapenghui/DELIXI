import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Button, message, TimePicker, DatePicker, Input, Tabs, Table, Form, Row, Col, Select, Tag, Pagination, Tooltip } from "antd";
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



  const columns = [
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
      render: barCode => (
        <Tooltip placement="topLeft" title={barCode}>
          {barCode}
        </Tooltip>
      ),
    },
    {
      title: "物料代号",
      dataIndex: "materialNo",
      key: "materialNo",
      align: "center",
    },

    {
      title: "中文名称",
      dataIndex: "materialName",
      key: "materialName",
      align: "center",
    },

    {
      title: "物料代码",
      dataIndex: "materialType",
      key: "materialType",
      align: "center",
      ellipsis: {
        showTitle: false,
      },
      align: "center",
      render: materialType => (
        <Tooltip placement="topLeft" title={materialType}>
          {materialType}
        </Tooltip>
      ),
    },
    {
      title: "型号描述",
      dataIndex: "materialDescription",
      key: "materialDescription",
      ellipsis: {
        showTitle: false,
      },
      align: "center",
      render: modelDesc => (
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


  //tab标签切换获取index/key
  function callback(key) {
    console.log(key);
  }

  useEffect(() => {
    // zhiSearch()
    // heSearch()
    // boxSearch()
  }, [])



  //获取只码物料编码
  const changeMaterialId1 = (value) => {
    message.warning('如果需要打印,请同时修改打印机对应模板')
    setMaterialId1(value)
  }

  //获取盒码物料编码
  const changeMaterialId2 = (value) => {
    message.warning('如果需要打印,请同时修改打印机对应模板')
    setMaterialId2(value)
  }

  //获取箱码物料编码
  const changeMaterialId3 = (value) => {
    message.warning('如果需要打印,请同时修改打印机对应模板')
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
        materialType: values.materialType,
        batchNumber: values.batchNumber,
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
          message.warning('请先选择物料编码')
        } else {
          let data = await getOnlyBarCodeList(params(values));
          if (data.status === 200) {
            setDataSource1(data.data.list)
            setZhiString(data.data.tempCode)
            message.success(data.message + data.data.tempName)
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
          message.warning('请先选择物料编码')
        } else {
          let data = await getBoxBarCodeList(params(values));
          if (data.status === 200) {
            setDataSource2(data.data.list)
            setHeString(data.data.tempCode)
            message.success(data.message + data.data.tempName)
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
          message.warning('请先选择物料编码')
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
            setDataSource3(data.data.list)
            setBoxString(data.data.tempCode)
            message.success(data.message + data.data.tempName)
          }
        }
      })
  }





  //点击打印只条码  只---开始
  const pintZhiCode = async () => {
    LodopFuncs.getLodop()
    if (materialId1 == "") {
      message.warning('请先选择物料编码')
    } else {

      let content = noStart;
      if (content === "") {
        eval(zhiString)
        content = zhiString.split('LODOP.ADD_PRINT_TEXT(0, 0, 0, 0, "");')
      } else {
        content = noStart.split('LODOP.ADD_PRINT_TEXT(0, 0, 0, 0, "");')
      }
      let data = await printBarCode({
        barCodeType: 1,
        materialId: materialId1,
        state: 1,
        userId: user.currentUser.id
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
      message.warning('请先选择物料编码')
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

  // 只---结束






  //点击打印盒条码  盒---开始
  const pintHeCode = async () => {
    LodopFuncs.getLodop()
    if (materialId2 == "") {
      message.warning('请先选择物料编码')
    } else {

      let content = noStart
      if (content === "") {
        eval(heString)
        content = heString
      }

      let data = await printBarCode({
        barCodeType: 2,
        materialId: materialId2,
        state: 1,
        userId: user.currentUser.id
      });
      if (data.status == 200) {
        var dataString = data.data.barCodeList
        var printDateList = data.data.printDateList
        var heList = content.replaceAll('1234567890', dataString[0]).replaceAll('2022-01-01', printDateList[0]).
          replace('物料型号', data.data.material.materialType).
          replace('物料描述', data.data.material.boxLabelDescription).
          replace('物料型号描述', data.data.material.boxLabelDescription).
          replace('装盒', data.data.material.cartonsNumber).
          replace('检验02', data.data.material.examination).
          replace('GB/t', data.data.material.standard).
          replace('浙江省', data.data.material.address).
          replace('德力西', data.data.material.productionPlant).
          replace('8888888888', data.data.material.caseIEAN13).
          replace('9999999999', data.data.material.caseITF14).
          replace('中文名称', data.data.material.materialName)
        eval(heList)
        LODOP.PRINT();
        for (var i = 0; i < dataString.length; i++) {
          if (i > 0) {
            LODOP.SET_PRINT_PAGESIZE(1, 3, "A3");
            heList = heList.replaceAll(dataString[i - 1], dataString[i]);
            console.log('heList123', heList)
            eval(heList)
            LODOP.PRINT();
            LODOP.PRINT_INIT("");
          }
        }
        heSearch()
      }
    }
  };



  //盒条码模板
  const heCode = () => {
    LodopFuncs.getLodop()
    if (materialId2 == "") {
      message.warning('请先选择物料编码')
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
      var heList = heString.replace('1234567890', "1234567890").
        replaceAll('2022-01-01', "2022-01-01").
        replace('物料型号', "CDCH6i16201N").
        replace('物料描述', "CDCH6i16A2P1NC220-240V").
        replace('装盒', 10).
        replace('检验02', '检验02').
        replace('GB/t', "GB/t").
        replace('浙江省', "浙江省").
        replace('德力西', "德力西").
        replace('X85220322A00030001', "X85220322A00030001").
        replace('X85220322A00030001', "X85220322A00030001").
        replace('中文名称', "家用交流电接触器")
      eval(heList)
      LODOP.PRINT_DESIGN();
    }




  //点击打印箱条码  箱---开始



  const pintBoxCode = async () => {
    LodopFuncs.getLodop()
    if (materialId3 == "") {
      message.warning('请先选择物料编码')
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
        userId: user.currentUser.id
      });
      if (data.status == 200) {
        var dataString = data.data.barCodeList
        var printDateList = data.data.printDateList
        var boxList = content.replaceAll('1234567890', dataString[0]).replaceAll('2022-01-01', printDateList[0]).
          replace('物料型号', data.data.material.materialType).
          replace('物料描述', data.data.material.boxLabelDescription).
          replace('物料型号描述', data.data.material.boxLabelDescription).
          replace('检验02', data.data.material.examination).
          replace('GB/t', data.data.material.standard).
          replace('浙江省', data.data.material.address).
          replace('德力西', data.data.material.productionPlant).
          replace('8888888888', data.data.material.caseIEAN13).
          replace('9999999999', data.data.material.caseITF14).
          replace('装箱', data.data.material.packingQuantity).
          replace('装盒', data.data.material.cartonsNumber).
          replace('箱重', data.data.material.bigBoxWeight).
          replace('系列123', data.data.material.serial).
          replace('中文名称', data.data.material.materialName).
          replace(`<img src='${ip}/DLX_OEM/api/3c.png'>`, newImage)
        eval(boxList)
        LODOP.PRINT();
        for (var i = 0; i < dataString.length; i++) {
          if (i > 0) {
            LODOP.SET_PRINT_PAGESIZE(1, 3, "A3");
            boxList = boxList.replaceAll(dataString[i - 1], dataString[i]);
            console.log('heList123', boxList)
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
      message.warning('请先选择物料编码')
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

  
  //测试箱子模板
  const boxCodeTest = () => {
    LodopFuncs.getLodop()
    var boxList = boxString.replace('1234567890', "1234567890").
      replaceAll('2022-01-01', "2022-01-01").
      replace('物料型号', "CDCH6i16201N").
      replace('物料描述', "CDCH6i16A2P1NC220-240V").
      replace('装盒', 10).
      replace('检验02', '检验02').
      replace('GB/t', "GB/t").
      replace('浙江省', "浙江省").
      replace('德力西', "德力西").
      replace('X85220322A00030001', "X85220322A00030001").
      replace('X85220322A00030001', "X85220322A00030001").
      replace('中文名称', "家用交流电接触器").
      replace('装箱', 10).
      replace('装盒', 10).
      replace('箱重', 10).
      replace('系列123', "领航者").
      replace(`<img src='${ip}/DLX_OEM/api/3c.png'>`, `<img src='${ip}/DLX_OEM/api/3c.png'>`)
    eval(boxList)
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

              <Col span={6} style={{ display: 'block' }} >
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

              <Col span={6} style={{ display: 'block' }}>
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



              <Col span={6} style={{ display: 'block' }} hidden={zhiHidden1}>
                <Form.Item
                  name="barCode"
                  label="只条码"
                  hasFeedback
                  {...formItemLayout2}
                >
                  <Input></Input>
                </Form.Item>
              </Col>
              <Col span={6} style={{ display: 'block' }}>
                <Form.Item
                  name="materialId"
                  label="物料编码"
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


              <Col span={6} style={{ display: 'block' }} hidden={zhiHidden1}>
                <Form.Item
                  name="materialType"
                  label="物料代码"
                  hasFeedback
                  {...formItemLayout2}
                >
                  <Input></Input>

                </Form.Item>
              </Col>
              <Col span={6} style={{ display: 'block' }} hidden={zhiHidden1}>
                <Form.Item
                  name="batchNumber"
                  label="打印批次"
                  hasFeedback
                  {...formItemLayout2}
                >
                  <Input></Input>

                </Form.Item>
              </Col>

              <Col span={6} style={{ textAlign: 'right' }}>
                <Button type="primary" htmlType="submit" style={{ marginLeft: '10px' }}>查询</Button>
                <Button type="primary" style={{ marginLeft: '10px' }} onClick={zhiCode}>只码模板</Button>
                <Button type="primary" style={{ marginLeft: '10px' }} onClick={pintZhiCode}><ArrowDownOutlined />点击打印</Button>
                <Button type="primary" style={{ marginLeft: '10px' }} shape="circle" onClick={zhiToggol} hidden={zhiHidden2}> <ArrowDownOutlined /></Button>
                <Button type="primary" style={{ marginLeft: '10px' }} shape="circle" onClick={zhiToggo2} hidden={zhiHidden1}> <ArrowUpOutlined /></Button>
              </Col>
            </Row>
          </Form>

          <Table
            className="flex-table"
            dataSource={dataSource1}
            columns={columns}
            style={{ padding: "0 20px" }}
            rowKey="id"
            scroll={{
              y: '100%'
            }}
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
                  label="物料编码"
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
                  name="materialType"
                  label="物料代码"
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
            columns={columns}
            style={{ padding: "0 20px" }}
            rowKey="id"
            scroll={{
              y: '100%'
            }}
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
                  label="物料编码"
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
                  name="materialType"
                  label="物料代码"
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
            columns={columns}
            style={{ padding: "0 20px" }}
            rowKey="id"
            scroll={{
              y: '100%'
            }}
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
