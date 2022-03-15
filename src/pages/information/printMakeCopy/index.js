import { PlusOutlined, ArrowDownOutlined } from "@ant-design/icons";
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
import { getLodop } from "../../../utils/LodopFuncs";
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
  const formItemLayout = globalConfig.table.formItemLayout



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
      title: "物料编号",
      dataIndex: "materialNo",
      key: "materialNo",
      align: "center",
    },
    {
      title: "物料型号",
      dataIndex: "batchNumber",
      key: "batchNumber",
      align: "center",
      ellipsis: {
        showTitle: false,
      },
      align: "center",
      render: batchNumber => (
        <Tooltip placement="topLeft" title={batchNumber}>
          {batchNumber}
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




  //tab标签切换获取index/key
  function callback(key) {
    console.log(key);
  }

  useEffect(() => {
    // zhiSearch()
    // heSearch()
    // boxSearch()
  }, [])



  //获取只码物料编号
  const changeMaterialId1 = (value) => {
    setMaterialId1(value)
  }

  //获取盒码物料编号
  const changeMaterialId2 = (value) => {
    setMaterialId2(value)
  }

  //获取箱码物料编号
  const changeMaterialId3 = (value) => {
    setMaterialId3(value)
  }



  //查询封装公用参数
  const params = (values) => {
    return {
      data: {
        startDate: values.startDate,
        endDate: values.endDate,
        barCode: values.barCode,
        materialId: values.materialId,
        state: 1,
      },
      pageNum: 1,
      pageSize: 1000,
      userId: user.currentUser.id
    }
  }


  //   @param 只条码 handleSearch 搜索
  const zhiSearch = (e) => {
    form1
      .validateFields()
      .then(async (values) => {
        if (values.materialId === undefined) {
          message.warning('请先选择物料编号')
        } else {
          let data = await getOnlyBarCodeList(params(values));
          if (data.status === 200) {
            setDataSource1(data.data.list)
            setZhiString(data.data.tempCode)
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
          message.warning('请先选择物料编号')
        } else {
          let data = await getBoxBarCodeList(params(values));
          if (data.status === 200) {
            setDataSource2(data.data.list)
            setHeString(data.data.tempCode)
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
          message.warning('请先选择物料编号')
        } else {
          let data = await getBigBoxBarCodeList(params(values));
          if (data.status === 200) {
            setDataSource3(data.data.list)
            setBoxString(data.data.tempCode)
          }
        }
      })
  }





  //点击打印只条码  只---开始
  const pintZhiCode = async () => {
    if (materialId1 == "") {
      message.warning('请先选择物料编号')
    } else {

      let content = noStart
      if (content === "") {
        eval(zhiString)
        content = zhiString
      }

      let data = await printBarCode({
        barCodeType: 1,
        materialId: materialId1,
        state: 1,
        userId: user.currentUser.id
      });
      if (data.status == 200) {
        var dataString = data.data.barCodeList
        var zhiList = content.replaceAll('1234567890', dataString[0]).replace('2022-01-01', data.data.material.date);
        eval(zhiList)
        LODOP.PRINT();
        for (var i = 0; i < 2; i++) {
          if (i > 0) {
            LODOP.SET_PRINT_PAGESIZE(1, 3, "A3");
            zhiList = zhiList.replaceAll(dataString[i - 1], dataString[i]);
            console.log('zhiList123', zhiList)
            eval(zhiList)
            LODOP.PRINT();
            LODOP.PRINT_INIT("");
          }
        }
        zhiSearch()
      }
    }
  };


  //只条码模板
  const zhiCode = () => {
    if (materialId1 == "") {
      message.warning('请先选择物料编号')
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

    if (materialId2 == "") {
      message.warning('请先选择物料编号')
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
        var heList = heString.replaceAll('1234567890', dataString[0]).
          replace('2022-01-01', data.data.material.date).
          replace('物料型号', data.data.material.materialType).
          replace('物料型号描述', data.data.material.boxLabelDescription).
          replace('物料描述', data.data.material.boxLabelDescription).
          replace('装盒', data.data.material.boxesNumber).
          replace('装盒数', data.data.material.boxesNumber).
          replace('检验02', data.data.material.examination).
          replace('GB/T', data.data.material.standard).
          replace('2022-01-01', data.data.material.date).
          replace('浙江省', data.data.material.address).
          replace('德力西', data.data.material.productionPlant).
          replace('690318519991', data.data.material.caseIEAN13).
          replace('中文名称', data.data.material.materialName)
        eval(heList)
        LODOP.PRINT();
        for (var i = 0; i < 2; i++) {
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
    if (materialId2 == "") {
      message.warning('请先选择物料编号')
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






  //点击打印箱条码  箱---开始



  const pintBoxCode = async () => {

    if (materialId3 == "") {
      message.warning('请先选择物料编号')
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
        let newImage = ''

        if (data.data.material.threeC == 0) {
          newImage = ``
        } else if (data.data.material.threeC == 1) {
          newImage = `<img border='0' "<img border='0' src='http://192.168.1.18:8088/DLX_OEM/api/3c.png'>"`
        } else {
          newImage = `<img border='0' "<img border='0' src='http://192.168.1.18:8088/DLX_OEM/api/oem.png'>"`
        }

        var boxList = content.replaceAll('1234567890', dataString[0]).
          replace('2022-01-01', data.data.material.date).
          replace('物料型号', data.data.material.materialType).
          replace('物料型号描述', data.data.material.boxLabelDescription).
          replace('装盒数', data.data.material.boxesNumber).
          replace('检验02', data.data.material.examination).
          replace('GB/T', data.data.material.standard).
          replace('2022-01-01', data.data.material.date).
          replace('浙江省', data.data.material.address).
          replace('德力西', data.data.material.productionPlant).
          replace('690318519991', data.data.material.caseIEAN13).
          replace('装箱数', data.data.material.packingQuantity).
          replace('箱重', data.data.material.bigBoxWeight).
          replace('系列123', data.data.material.serial).
          replace('中文名称', data.data.material.materialName).
          replace(newImage, data.data.threeC)
        eval(boxList)
        LODOP.PRINT();
        for (var i = 0; i < 2; i++) {
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
    if (materialId3 == "") {
      message.warning('请先选择物料编号')
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

  // 箱---结束








  return (
    <PageContainer>
      <Tabs onChange={callback} type="card" style={{ background: "#fff" }}>
        <TabPane tab="只条码" key="1">

          <Form
            onFinish={zhiSearch}
            form={form1}
            name="form_in_modal"
            initialValues={{
              // startDate: moment().subtract(1, "years"),
              // endDate: moment().endOf('day')
            }}
          >
            <Row gutter={40}>

              <Col span={8} style={{ display: 'block' }}>
                <Form.Item
                  name="startDate"
                  label="开始时间"
                  hasFeedback
                  {...formItemLayout}
                >
                  <DatePicker
                    style={{ width: '100%' }} format={globalConfig.form.onlyDateFormat} />
                </Form.Item>
              </Col>

              <Col span={8} style={{ display: 'block' }}>
                <Form.Item
                  name="endDate"
                  label="结束时间"
                  hasFeedback
                  {...formItemLayout}
                >
                  <DatePicker
                    style={{ width: '100%' }} format={globalConfig.form.onlyDateFormat} />
                </Form.Item>
              </Col>



              <Col span={8} style={{ display: 'block' }}>
                <Form.Item
                  name="barCode"
                  label="只条码"
                  hasFeedback
                  {...formItemLayout}
                >
                  <Input></Input>
                </Form.Item>
              </Col>
              <Col span={8} style={{ display: 'block' }}>
                <Form.Item
                  name="materialId"
                  label="物料编号"
                  hasFeedback
                  {...formItemLayout}
                >
                  <Select
                    // allowClear
                    showSearch
                    name="materialId"
                    onChange={changeMaterialId1}
                  >
                    {materialList.map(function (item, index) {
                      return <Select.Option key={index} value={item.key}>{item.label}</Select.Option>
                    })}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={8} offset={8} style={{ textAlign: 'center' }}>
                <Button type="primary" htmlType="submit" style={{ marginLeft: '10px' }}>查询</Button>
                <Button type="primary" style={{ marginLeft: '10px' }} onClick={zhiCode}>只码模板</Button>
                <Button type="primary" style={{ marginLeft: '10px' }} onClick={pintZhiCode}><ArrowDownOutlined />点击打印</Button>
              </Col>
            </Row>
          </Form>

          <Table dataSource={dataSource1} columns={columns}
            scroll={{ y: 450 }}
            style={{ padding: "0 20px" }}
            rowKey="id"
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
            // onFinish={(e) => handleSearch(e, 'tankSearch')}
            onFinish={heSearch}
            form={form2}
            name="form_in_modal"
            initialValues={{
              // startDate: moment().subtract(1, "years"),
              // endDate: moment().endOf('day')
            }}
          >
            <Row gutter={40}>
              <Col span={8} style={{ display: 'block' }}>
                <Form.Item
                  name="startDate"
                  label="开始时间"
                  hasFeedback
                  {...formItemLayout}
                >
                  <DatePicker
                    style={{ width: '100%' }} format={globalConfig.form.onlyDateFormat} />
                </Form.Item>
              </Col>

              <Col span={8} style={{ display: 'block' }}>
                <Form.Item
                  name="endDate"
                  label="结束时间"
                  hasFeedback
                  {...formItemLayout}
                >
                  <DatePicker
                    style={{ width: '100%' }} format={globalConfig.form.onlyDateFormat} />
                </Form.Item>
              </Col>



              <Col span={8} style={{ display: 'block' }}>
                <Form.Item
                  name="barCode"
                  label="盒条码"
                  hasFeedback
                  {...formItemLayout}
                >
                  <Input></Input>

                </Form.Item>
              </Col>
              <Col span={8} style={{ display: 'block' }}>
                <Form.Item
                  name="materialId"
                  label="物料编号"
                  hasFeedback
                  {...formItemLayout}
                >
                  <Select
                    // allowClear
                    showSearch
                    onChange={changeMaterialId2}
                  >
                    {materialList.map(function (item, index) {
                      return <Select.Option key={index} value={item.key}>{item.label}</Select.Option>
                    })}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={8} offset={8} style={{ textAlign: 'center' }}>
                <Button type="primary" htmlType="submit" style={{ marginLeft: '10px' }}>查询</Button>
                {/* <Button style={{ marginLeft: '7px' }} onClick={() => handleResetFields()}><ClearOutlined />重置</Button> */}

                <Button type="primary" style={{ marginLeft: '10px' }} onClick={heCode} >盒码模板</Button>
                <Button type="primary" style={{ marginLeft: '10px' }} onClick={pintHeCode}><ArrowDownOutlined />点击打印</Button>
              </Col>
            </Row>


          </Form>
          <Table dataSource={dataSource2} columns={columns} scroll={{ y: 450 }}
            style={{ padding: "0 20px" }}
            rowKey="id"
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
            // onFinish={(e) => handleSearch(e, 'tankSearch')}
            onFinish={boxSearch}
            form={form3}
            name="form_in_modal"
            initialValues={{
              // startDate: moment().subtract(1, "years"),
              // endDate: moment().endOf('day')
            }}
          >
            <Row gutter={40}>
              <Col span={8} style={{ display: 'block' }}>
                <Form.Item
                  name="startDate"
                  label="开始时间"
                  hasFeedback
                  {...formItemLayout}
                >
                  <DatePicker
                    style={{ width: '100%' }} format={globalConfig.form.onlyDateFormat} />
                </Form.Item>
              </Col>

              <Col span={8} style={{ display: 'block' }}>
                <Form.Item
                  name="endDate"
                  label="结束时间"
                  hasFeedback
                  {...formItemLayout}
                >
                  <DatePicker
                    style={{ width: '100%' }} format={globalConfig.form.onlyDateFormat} />
                </Form.Item>
              </Col>



              <Col span={8} style={{ display: 'block' }}>
                <Form.Item
                  name="barCode"
                  label="箱条码"
                  hasFeedback
                  {...formItemLayout}
                >
                  <Input></Input>

                </Form.Item>
              </Col>
              <Col span={8} style={{ display: 'block' }}>
                <Form.Item
                  name="materialId"
                  label="物料编号"
                  hasFeedback
                  {...formItemLayout}
                >
                  <Select
                    // allowClear
                    showSearch
                    onChange={changeMaterialId3}
                  >
                    {materialList.map(function (item, index) {
                      return <Select.Option key={index} value={item.key}>{item.label}</Select.Option>
                    })}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={8} offset={8} style={{ textAlign: 'center' }}>

                <Button type="primary" htmlType="submit" style={{ marginLeft: '10px' }}>查询</Button>
                {/* <Button style={{ marginLeft: '7px' }} onClick={() => handleResetFields()}><ClearOutlined />重置</Button> */}

                {/* <Button type="primary" style={{ marginLeft: '7px' }} loading={loadings1} onClick={() => handleExportExcelGoods()}><UploadOutlined />导出Excel</Button> */}
                <Button type="primary" style={{ marginLeft: '10px' }} onClick={boxCode}> 箱码模板</Button>
                <Button type="primary" style={{ marginLeft: '10px' }} onClick={pintBoxCode}><ArrowDownOutlined />点击打印</Button>
              </Col>

            </Row>

          </Form>
          <Table dataSource={dataSource3} columns={columns} scroll={{ y: 450 }} pagination={true}
            style={{ padding: "0 20px" }}
            rowKey="id"
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
