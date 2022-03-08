import { PlusOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { Button, message, TimePicker, DatePicker, Input, Tabs, Table, Form, Row, Col, Select, Tag, Pagination, Tooltip } from "antd";
import React, { useState, useRef, useEffect } from "react";
import { Link, connect } from "umi";
import { PageContainer, FooterToolbar } from "@ant-design/pro-layout";
import ProTable from "@ant-design/pro-table";
import globalConfig from '../../../../config/defaultSettings';
import moment from "moment";
import ProDescriptions from "@ant-design/pro-descriptions";
import CreateForm from "./components/CreateForm";
import UpdateForm from "./components/UpdateForm";
import ExportJsonExcel from "js-export-excel";
import {
  getOnlyBarCodeList,
  getBoxBarCodeList,
  getBigBoxBarCodeList
} from "@/services/information/printMake";
import Checkbox from "antd/lib/checkbox/Checkbox";

const printMakeComponent = ({ printMake, dispatch, user }) => {
  const { materialList } = printMake
  const { currentUser } = user;
  const { TabPane } = Tabs;
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();
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
      dataIndex: "modelDesc",
      key: "modelDesc",
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


  //多选条码
  const rowSelection1 = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    }
  };

  //多选盒码
  const rowSelection2 = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    }
  };

  //多选箱码
  const rowSelection3 = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    }
  };



  //tab标签切换获取index/key
  function callback(key) {
    console.log(key);
  }

  useEffect(() => {
    zhiSearch()
    heSearch()
    boxSearch()
  }, [])


  //查询封装公用参数

  const params = (values) => {
    return {
      data: {
        startDate: values.startDate,
        endDate: values.endDate,
        barCode: values.barCode,
        materialId: values.materialId
      },
      pageNum: 1,
      pageSize: 20,
      userId: user.currentUser.id
    }
  }


  //   @param 只条码 handleSearch 搜索
  const zhiSearch = (e) => {
    form1
      .validateFields()
      .then(async (values) => {
        let data = await getOnlyBarCodeList(params(values));
        if (data.status === 200) {
          setDataSource1(data.data.list)
        }
      })
  }

  //盒条码查询
  const heSearch = (e) => {
    form2
      .validateFields()
      .then(async (values) => {
        let data = await getBoxBarCodeList(params(values));
        if (data.status === 200) {
          setDataSource2(data.data.list)
        }
      })
  }


  //箱条码查询
  const boxSearch = (e) => {
    form3
      .validateFields()
      .then(async (values) => {
        let data = await getBigBoxBarCodeList(params(values));
        if (data.status === 200) {
          setDataSource3(data.data.list)
        }
      })
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
                    allowClear
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
                <Button type="primary" style={{ marginLeft: '10px' }}>
                  <Tag color="volcano">  只码模板:</Tag>成品条码
                </Button>
                <Button type="primary" style={{ marginLeft: '10px' }}><ArrowDownOutlined />点击打印</Button>
              </Col>
            </Row>
          </Form>

          <Table dataSource={dataSource1} columns={columns}
            scroll={{ y: 450 }}
            style={{ padding: "0 20px" }}
            // rowKey="index"
            rowSelection={{
              ...rowSelection1
            }}
          />
          {/* <Pagination
            total={15}
            showTotal={(total, range) => `第 ${range[0]}-${range[1]} 条/ 总共 ${total} 条`}
            defaultPageSize={20}
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
                    allowClear
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
                <Button type="primary" style={{ marginLeft: '10px' }}>
                  <Tag color="volcano">  盒码模板:</Tag>40X60
                </Button>
                <Button type="primary" style={{ marginLeft: '10px' }}><ArrowDownOutlined />点击打印</Button>
              </Col>
            </Row>


          </Form>
          <Table dataSource={dataSource2} columns={columns} scroll={{ y: 450 }}
            style={{ padding: "0 20px" }}
            rowSelection={{
              type: Checkbox,
              ...rowSelection2
            }}
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
                    allowClear
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
                <Button type="primary" style={{ marginLeft: '10px' }}>
                  <Tag color="volcano">  箱码模板:</Tag>60X80
                </Button>
                <Button type="primary" style={{ marginLeft: '10px' }}><ArrowDownOutlined />点击打印</Button>
              </Col>

            </Row>

          </Form>
          <Table dataSource={dataSource3} columns={columns} scroll={{ y: 450 }} pagination={true}
            style={{ padding: "0 20px" }}
            rowSelection={{
              ...rowSelection3
            }}
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

export default connect(({ printMake, user }) => ({ printMake, user }))(
  printMakeComponent
);
