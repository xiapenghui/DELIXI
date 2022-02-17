import { PlusOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { Button, message, TimePicker, DatePicker, Input, Tabs, Table, Form, Row, Col, Select, Tag, Pagination } from "antd";
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
  getDropDownInit,
  postListInit,
  deleted,
  getAddDropDownInit,
  addPost,
  updatePut,
  GetShiftNO,
} from "@/services/information/printMake";

const printMakeComponent = ({ printMake, dispatch }) => {
  const { TabPane } = Tabs;
  const [form] = Form.useForm();
  const formItemLayout = globalConfig.table.formItemLayout
  const columns1 = [
    {
      title: "打印批次",
      dataIndex: "printBatch",
      key: "printBatch",
      align: "center",
    },
    {
      title: "条码类型",
      dataIndex: "barcodeType",
      key: "barcodeType",
      align: "center",
    },
    {
      title: "条码",
      dataIndex: "barCode",
      key: "barCode",
      align: "center",
    },
    {
      title: "物料编号",
      dataIndex: "materialNo",
      key: "materialNo",
      align: "center",
    },
    {
      title: "物料型号",
      dataIndex: "materialModel",
      key: "materialModel",
      align: "center",
    },
    {
      title: "型号描述",
      dataIndex: "modelDesc",
      key: "modelDesc",
      ellipsis: true,
      align: "center",
    },
    {
      title: "打印时间",
      dataIndex: "printTime",
      key: "printTime",
      align: "center",
    },
    {
      title: "打印人员",
      dataIndex: "PrinterPer",
      key: "PrinterPer",
      align: "center",
    },

  ];

  const dataSource1 = [
    {
      key: "1",
      printBatch: "202202151200",
      barcodeType: "只",
      barCode: "2uybM0327491062640",
      materialNo: "32749",
      materialModel: "CDPZ3024DRHHDMZC",
      modelDesc: "PZ30-24单暗装1.2mm厚 120mm深2层板（导轨）+面盖除底箱SM战采",
      printTime: "2022-02-15 12:00:00",
      PrinterPer: "张三",
    },
    {
      key: "2",
      printBatch: "202202151200",
      barcodeType: "只",
      barCode: "2uybM0327491062639",
      materialNo: "32749",
      materialModel: "CDPZ3024DRHHDMZC",
      modelDesc: "PZ30-24单暗装1.2mm厚 120mm深2层板（导轨）+面盖除底箱SM战采",
      printTime: "2022-02-15 12:00:00",
      PrinterPer: "张三",
    },
  ];

  const columns2 = [
    {
      title: "打印批次",
      dataIndex: "printBatch",
      key: "printBatch",
      align: "center",
    },
    {
      title: "条码类型",
      dataIndex: "barcodeType",
      key: "barcodeType",
      align: "center",
    },
    {
      title: "条码",
      dataIndex: "barCode",
      key: "barCode",
      align: "center",
    },
    {
      title: "物料编号",
      dataIndex: "materialNo",
      key: "materialNo",
      align: "center",
    },
    {
      title: "物料型号",
      dataIndex: "materialModel",
      key: "materialModel",
      align: "center",
    },
    {
      title: "型号描述",
      dataIndex: "modelDesc",
      key: "modelDesc",
      ellipsis: true,
      align: "center",
    },
    {
      title: "打印时间",
      dataIndex: "printTime",
      key: "printTime",
      align: "center",
    },
    {
      title: "打印人员",
      dataIndex: "PrinterPer",
      key: "PrinterPer",
      align: "center",
    },
  ];

  const dataSource2 = [
    {
      key: "1",
      printBatch: "202202151200",
      barcodeType: "盒",
      barCode: "2uybM0327491062640",
      materialNo: "32749",
      materialModel: "CDPZ3024DRHHDMZC",
      modelDesc: "PZ30-24单暗装1.2mm厚 120mm深2层板（导轨）+面盖除底箱SM战采",
      printTime: "2022-02-15 12:00:00",
      PrinterPer: "张三",
    },
    {
      key: "2",
      printBatch: "202202151200",
      barcodeType: "盒",
      barCode: "2uybM0327491062639",
      materialNo: "32749",
      materialModel: "CDPZ3024DRHHDMZC",
      modelDesc: "PZ30-24单暗装1.2mm厚 120mm深2层板（导轨）+面盖除底箱SM战采",
      printTime: "2022-02-15 12:00:00",
      PrinterPer: "张三",
    },
  ];

  const columns3 = [
    {
      title: "打印批次",
      dataIndex: "printBatch",
      key: "printBatch",
      align: "center",
    },
    {
      title: "条码类型",
      dataIndex: "barcodeType",
      key: "barcodeType",
      align: "center",
    },
    {
      title: "条码",
      dataIndex: "barCode",
      key: "barCode",
      align: "center",
    },
    {
      title: "物料编号",
      dataIndex: "materialNo",
      key: "materialNo",
      align: "center",
    },
    {
      title: "物料型号",
      dataIndex: "materialModel",
      key: "materialModel",
      align: "center",
    },
    {
      title: "型号描述",
      dataIndex: "modelDesc",
      key: "modelDesc",
      ellipsis: true,
      align: "center",
    },
    {
      title: "打印时间",
      dataIndex: "printTime",
      key: "printTime",
      align: "center",
    },
    {
      title: "打印人员",
      dataIndex: "PrinterPer",
      key: "PrinterPer",
      align: "center",
    },
  ];

  const dataSource3 = [
    {
      key: "1",
      printBatch: "202202151200",
      barcodeType: "箱",
      barCode: "2uybM0327491062640",
      materialNo: "32749",
      materialModel: "CDPZ3024DRHHDMZC",
      modelDesc: "PZ30-24单暗装1.2mm厚 120mm深2层板（导轨）+面盖除底箱SM战采",
      printTime: "2022-02-15 12:00:00",
      PrinterPer: "张三",
    },
    {
      key: "2",
      printBatch: "202202151200",
      barcodeType: "箱",
      barCode: "2uybM0327491062639",
      materialNo: "32749",
      materialModel: "CDPZ3024DRHHDMZC",
      modelDesc: "PZ30-24单暗装1.2mm厚 120mm深2层板（导轨）+面盖除底箱SM战采",
      printTime: "2022-02-15 12:00:00",
      PrinterPer: "张三",
    },
  ];



  function callback(key) {
    console.log(key);
  }

  return (
    <PageContainer>
      <Tabs onChange={callback} type="card" style={{ background: "#fff" }}>
        <TabPane tab="只条码" key="1">

          <Form
            className="ant-advanced-search-form"
            // onFinish={(e) => handleSearch(e, 'tankSearch')}
            // onFinish={handleSearch}
            form={form}
            name="form_in_modal"
            initialValues={{
              // sdate1: moment().subtract(1, "years"),
              // sdate2: moment().endOf('day')
            }}
          >
            <Row gutter={40}>

              <Col span={8} style={{ display: 'block' }}>
                <Form.Item
                  name="sdate1"
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
                  name="sdate2"
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
                  name="tank"
                  label="条码"
                  hasFeedback
                  {...formItemLayout}
                >
                  <Select
                    allowClear
                    showSearch
                  >
                    {/* {tankList.map(function (item, index) {
                        return <Select.Option key={index} value={item.key}>{item.value}</Select.Option>
                      })} */}
                  </Select>

                </Form.Item>
              </Col>
              <Col span={8} style={{ display: 'block' }}>
                <Form.Item
                  name="customer"
                  label="物料编号"
                  hasFeedback
                  {...formItemLayout}
                >
                  <Select
                    allowClear
                    showSearch
                  >
                    {/* {customerList.map(function (item, index) {
                        return <Select.Option key={index} value={item.key}>{item.value}</Select.Option>
                      })} */}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={8} offset={8} style={{ textAlign: 'center' }}>
                <Button>重置</Button>
                <Button type="primary" htmlType="submit" style={{ marginLeft: '10px' }}>查询</Button>
                {/* <Button style={{ marginLeft: '7px' }} onClick={() => handleResetFields()}><ClearOutlined />重置</Button> */}

                {/* <Button type="primary" style={{ marginLeft: '7px' }} loading={loadings1} onClick={() => handleExportExcelGoods()}><UploadOutlined />导出Excel</Button> */}
                <Button type="primary" style={{ marginLeft: '10px' }}>
                  <Tag color="volcano">  只码模板:</Tag>成品条码
                </Button>
                <Button type="primary" style={{ marginLeft: '10px' }}><ArrowDownOutlined />点击打印</Button>
              </Col>
            </Row>
          </Form>

          <Table dataSource={dataSource1} columns={columns1} scroll={{ y: 450 }}  pagination={false} />
          <Pagination
            total={15}
            showTotal={(total, range) => `第 ${range[0]}-${range[1]} 条/ 总共 ${total} 条`}
            defaultPageSize={20}
            defaultCurrent={1}
            style={{textAlign:'right',padding:'15px'}}
          />
        </TabPane>
        <TabPane tab="盒条码" key="2">
          <Form
            className="ant-advanced-search-form"
            // onFinish={(e) => handleSearch(e, 'tankSearch')}
            // onFinish={handleSearch}
            form={form}
            name="form_in_modal"
            initialValues={{
              // sdate1: moment().subtract(1, "years"),
              // sdate2: moment().endOf('day')
            }}
          >
            <Row gutter={40}>
              <Col span={8} style={{ display: 'block' }}>
                <Form.Item
                  name="sdate1"
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
                  name="sdate2"
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
                  name="tank"
                  label="条码"
                  hasFeedback
                  {...formItemLayout}
                >
                  <Select
                    allowClear
                    showSearch
                  >
                    {/* {tankList.map(function (item, index) {
                        return <Select.Option key={index} value={item.key}>{item.value}</Select.Option>
                      })} */}
                  </Select>

                </Form.Item>
              </Col>
              <Col span={8} style={{ display: 'block' }}>
                <Form.Item
                  name="customer"
                  label="物料编号"
                  hasFeedback
                  {...formItemLayout}
                >
                  <Select
                    allowClear
                    showSearch
                  >
                    {/* {customerList.map(function (item, index) {
                        return <Select.Option key={index} value={item.key}>{item.value}</Select.Option>
                      })} */}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={8} offset={8} style={{ textAlign: 'center' }}>
                <Button>重置</Button>
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
          <Table dataSource={dataSource2} columns={columns2} scroll={{ y: 450 }} pagination={false} />
          <Pagination
            total={15}
            showTotal={(total, range) => `第 ${range[0]}-${range[1]} 条/ 总共 ${total} 条`}
            defaultPageSize={20}
            defaultCurrent={1}
            style={{textAlign:'right',padding:'15px'}}
          />

        </TabPane>
        <TabPane tab="箱条码" key="3">
          <Form
            className="ant-advanced-search-form"
            // onFinish={(e) => handleSearch(e, 'tankSearch')}
            // onFinish={handleSearch}
            form={form}
            name="form_in_modal"
            initialValues={{
              // sdate1: moment().subtract(1, "years"),
              // sdate2: moment().endOf('day')
            }}
          >
            <Row gutter={40}>
              <Col span={8} style={{ display: 'block' }}>
                <Form.Item
                  name="sdate1"
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
                  name="sdate2"
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
                  name="tank"
                  label="条码"
                  hasFeedback
                  {...formItemLayout}
                >
                  <Select
                    allowClear
                    showSearch
                  >
                    {/* {tankList.map(function (item, index) {
                        return <Select.Option key={index} value={item.key}>{item.value}</Select.Option>
                      })} */}
                  </Select>

                </Form.Item>
              </Col>
              <Col span={8} style={{ display: 'block' }}>
                <Form.Item
                  name="customer"
                  label="物料编号"
                  hasFeedback
                  {...formItemLayout}
                >
                  <Select
                    allowClear
                    showSearch
                  >
                    {/* {customerList.map(function (item, index) {
                        return <Select.Option key={index} value={item.key}>{item.value}</Select.Option>
                      })} */}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={8} offset={8} style={{ textAlign: 'center' }}>
                <Button>重置</Button>
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
          <Table dataSource={dataSource3} columns={columns3} scroll={{ y: 450 }}  pagination={false} />
          <Pagination
            total={15}
            showTotal={(total, range) => `第 ${range[0]}-${range[1]} 条/ 总共 ${total} 条`}
            defaultPageSize={20}
            defaultCurrent={1}
            style={{textAlign:'right',padding:'15px'}}
          />

        </TabPane>
      </Tabs>
    </PageContainer>
  );
};

export default connect(({ printMake }) => ({ printMake }))(
  printMakeComponent
);
