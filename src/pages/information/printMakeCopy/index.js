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
  const [noStartZhi, setNoStartZhi] = useState('')
  const [arrList, setArrList] = useState([]);
  const [materialId1, setMaterialId1] = useState('');



  const [show1, isShow1] = useState(true)
  const [show1_1, isShow1_1] = useState(true)

  const [show2, isShow2] = useState(true)
  const [show3, isShow3] = useState(true)
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



  const changeMaterialId = (value) => {
    setMaterialId1(value)
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
          isShow1(true)
          message.warning('请先选择物料编号')
        } else {
          isShow1(false)
          let data = await getOnlyBarCodeList(params(values));
          if (data.status === 200) {
            // let NewArr=[]
            setDataSource1(data.data.list)
            setZhiString(data.data.tempCode)
            // data.data.list.map((item,index)=>{
            //   NewArr.push(item.barCode)
            //   setArrList(NewArr)
            // })
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
          isShow2(true)
          message.warning('请先选择物料编号')
        } else {
          isShow2(false)
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
          isShow3(true)
          message.warning('请先选择物料编号')
        } else {
          isShow3(false)
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

    let data = await printBarCode({
      barCodeType: 1,
      materialId: materialId1,
      state: 1,
      userId: 1
    });
    if (data.status == 200) {
      var dataString = data.data.barCodeList
      var zhiList = noStartZhi.replace('2222222222222222222222', dataString[0]).
        replace('1234567890', dataString[0]).
        replace('2022-01-01', data.data.material.date)
      console.log('zhiList', zhiList)
      eval(zhiList)
      LODOP.PRINT();
      for (var i = 0; i < dataString.length; i++) {
        if (i > 0) {
          LODOP.SET_PRINT_PAGESIZE(1, dataString.length, "A3");
          zhiList = zhiList.replace(dataString[i - 1], dataString[i]);
          eval(zhiList)
          LODOP.PRINT();
          LODOP.PRINT_INIT("");
        }
      }
    } else {
      message.error('参数错误!')
    }
  };


  //只条码模板
  const zhiCode = () => {
    isShow1_1(false)
    zhiCreateOneFormPage()
    LODOP.On_Return = (TaskID, Value) => {
      setNoStartZhi(Value)
    }
    LODOP.PRINT_DESIGN();
  };


  const zhiCreateOneFormPage = () => {
    eval(zhiString)
  };

  // 只---结束



  //点击打印盒条码  盒---开始
  const pintHeCode = () => {
    var heList = noStartZhi.replace('123456789', arrList[0])
    eval(heList)
    LODOP.PRINT();
    for (var i = 0; i < arrList.length; i++) {
      if (i > 0) {
        LODOP.SET_PRINT_PAGESIZE(1, 3, "A3");
        heList = heList.replace(arrList[i - 1], arrList[i])
        eval(heList)
        LODOP.PRINT();
        LODOP.PRINT_INIT("");
      }
    }
  };


  //盒条码模板
  const heCode = () => {
    heCreateOneFormPage()
    LODOP.On_Return = (TaskID, Value) => {
      setNoStartZhi(Value)
    }
    LODOP.PRINT_DESIGN();
  };


  const heCreateOneFormPage = () => {
    eval(heString)
  };

  // 盒---结束





  //点击打印箱条码  箱---开始
  const pintBoxCode = () => {
    var boxList = noStartZhi.replace('123456789', arrList[0])
    eval(boxList)
    LODOP.PRINT();
    for (var i = 0; i < arrList.length; i++) {
      if (i > 0) {
        LODOP.SET_PRINT_PAGESIZE(1, 3, "A3");
        boxList = boxList.replace(arrList[i - 1], arrList[i])
        eval(boxList)
        LODOP.PRINT();
        LODOP.PRINT_INIT("");
      }
    }
  };


  //箱条码模板
  const boxCode = () => {
    boxCreateOneFormPage()
    LODOP.On_Return = (TaskID, Value) => {
      setNoStartBox(Value)
    }
    LODOP.PRINT_DESIGN();
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
                    onChange={changeMaterialId}
                  >
                    {materialList.map(function (item, index) {
                      return <Select.Option key={index} value={item.key}>{item.label}</Select.Option>
                    })}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={8} offset={8} style={{ textAlign: 'center' }}>
                <Button type="primary" htmlType="submit" style={{ marginLeft: '10px' }}>查询</Button>
                <Button type="primary" style={{ marginLeft: '10px' }} onClick={zhiCode} hidden={show1}>
                  <Tag color="volcano">  只码模板:</Tag>成品条码
                </Button>
                <Button type="primary" style={{ marginLeft: '10px' }} onClick={pintZhiCode} hidden={show1_1}><ArrowDownOutlined />点击打印</Button>
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

                <Button type="primary" style={{ marginLeft: '10px' }} onClick={heCode} hidden={show2} >
                  <Tag color="volcano">  盒码模板:</Tag>40X60
                </Button>
                <Button type="primary" style={{ marginLeft: '10px' }} onClick={pintHeCode} hidden={show2}><ArrowDownOutlined />点击打印</Button>
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
                <Button type="primary" style={{ marginLeft: '10px' }} onClick={boxCode} hidden={show3}>
                  <Tag color="volcano">  箱码模板:</Tag>60X80
                </Button>
                <Button type="primary" style={{ marginLeft: '10px' }} onClick={pintBoxCode} hidden={show3}><ArrowDownOutlined />点击打印</Button>
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
