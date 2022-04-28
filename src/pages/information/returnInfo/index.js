import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import {
  Button,
  message,
  TimePicker,
  DatePicker,
  Input,
  Tabs,
  Table,
  Form,
  Row,
  Col,
  Select,
  Tag,
  Pagination,
  Tooltip,
  notification,
} from "antd";
import React, { useState, useRef, useEffect } from "react";
import { Link, connect } from "umi";
import { PageContainer, FooterToolbar } from "@ant-design/pro-layout";
import PrintForm from "./components/PrintForm";
import globalConfig from "../../../../config/defaultSettings";
import moment from "moment";
import * as LodopFuncs from "../../../utils/LodopFuncs.js";
import "../returnInfo/components/modal.css";
const ip = `${globalConfig.ip}:${globalConfig.port.sspalds_role}`;
import {
  getOnlyBarCodeList,

} from "@/services/information/returnInfo";

const returnInfoComponent = ({ returnInfo, user }) => {
  const { materialList } = returnInfo;
  const { currentUser } = user;
  const { TabPane } = Tabs;
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();

  const [createModalVisible, handleModalVisible] = useState(false);
  const formItemLayout2 = globalConfig.table.formItemLayout2;

  const columns1 = [
    {
      title: "物料代号",
      dataIndex: "materialNo",
      key: "materialNo",
      align: "center",
      width: 150,
      fixed: "left",
    },
    {
      title: "打印批次",
      dataIndex: "batchNumber",
      key: "batchNumber",
      align: "center",
      width: 150,
    },

    {
      title: "条码类型",
      dataIndex: "barCodeType",
      key: "barCodeType",
      align: "center",
      width: 150,
    },

    {
      title: "只条码",
      dataIndex: "barCode",
      key: "barCode",
      align: "center",
      width: 200,
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
      width: 200,
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
      width: 150,
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
      width: 200,
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
      width: 150,
    },
    {
      title: "打印人员",
      dataIndex: "printer",
      key: "printer",
      align: "center",
      width: 150,
    },
  ];

  const columns2 = [
    {
      title: "物料代号",
      dataIndex: "materialNo",
      key: "materialNo",
      align: "center",
      width: 150,
      fixed: "left",
    },
    {
      title: "打印批次",
      dataIndex: "batchNumber",
      key: "batchNumber",
      align: "center",
      width: 150,
    },

    {
      title: "条码类型",
      dataIndex: "barCodeType",
      key: "barCodeType",
      align: "center",
      width: 150,
    },

    {
      title: "盒条码",
      dataIndex: "barCode",
      key: "barCode",
      align: "center",
      width: 200,
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
      width: 200,
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
      width: 150,
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
      width: 200,
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
      width: 150,
    },
    {
      title: "打印人员",
      dataIndex: "printer",
      key: "printer",
      align: "center",
      width: 150,
    },
  ];




  const [dataSource1, setDataSource1] = useState([]);
  const [dataSource2, setDataSource2] = useState([]);
  const [materialTypeList, setMaterialTypeList] = useState([])




  //tab标签切换获取index/key
  function callback(key) {
    if (key == "1") {
      // zhiSearch();
    } else if (key == "2") {
      // heSearch();
    } else {
      // boxSearch();
    }
  }


  useEffect(() => {

  }, []);



  return (
    <PageContainer>
      <Tabs onChange={callback} type="card" style={{ background: "#fff" }}>
        <TabPane tab="批量退返处理 " key="1">
          <Form
            // onFinish={zhiSearch}
            form={form1}
            name="form_in_modal"
            initialValues={{
              // dateTime:
            }}
          >
            <Row>
              <Col span={5}>
                <Form.Item
                  name="batchNumber1"
                  label="只码"
                  hasFeedback
                  {...formItemLayout2}
                >
                  <Input></Input>
                </Form.Item>
              </Col>

              <Col span={2}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginLeft: "10px" }}
                >
                  扫描
                </Button>
              </Col>

              <Col span={5} offset={10}>
                <Form.Item
                  name="dateTime"
                  label="生产日期"
                  hasFeedback
                  {...formItemLayout2}
                >
                  <DatePicker defaultValue={moment(new Date())} id="PickerVal" allowClear={false} />
                </Form.Item>
              </Col>

              <Col span={2}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginLeft: "10px" }}
                  onClick={() => handleModalVisible(true)}
                >
                  生产条码
                </Button>
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
              y: "100%",
            }}
            rowSelection={{
              // ...rowSelection1,
            }}
            // pagination={{ pageSize: 20 }}
            pagination={{ showTotal: total => `总共 ${dataSource1.length} 条`, }}
          />
        </TabPane>
        <TabPane tab="零散退返产品处理" key="2">
          <Form
            // onFinish={heSearch}
            form={form2}
            name="form_in_modal"
            initialValues={{
            }}
          >
            <Row>
              <Col span={5}>
                <Form.Item
                  name="batchNumber2"
                  label="条码"
                  hasFeedback
                  {...formItemLayout2}
                >
                  <Input></Input>
                </Form.Item>
              </Col>

              <Col span={2}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginLeft: "10px" }}
                >
                  扫描
                </Button>
              </Col>

              <Col span={5} offset={10}>
                <Form.Item
                  name="dateTime"
                  label="生产日期"
                  hasFeedback
                  {...formItemLayout2}
                >
                  <DatePicker defaultValue={moment(new Date())} id="PickerVal" allowClear={false} />
                </Form.Item>
              </Col>

              <Col span={2}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginLeft: "10px" }}
                  onClick={() => handleModalVisible(true)}
                >
                  生产条码
                </Button>
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
              y: "100%",
            }}
            rowSelection={{
              // ...rowSelection2,
            }}
            // pagination={{ pageSize: 20 }}
            pagination={{ showTotal: total => `总共 ${dataSource2.length} 条`, }}
          //  total={dataSource2.length}
          />
        </TabPane>
      </Tabs>
      <PrintForm
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
        materialTypeList={materialTypeList}
        title="打印条码"
      ></PrintForm>
    </PageContainer>
  );
};

export default connect(({ returnInfo, user }) => ({ returnInfo, user }))(
  returnInfoComponent
);
