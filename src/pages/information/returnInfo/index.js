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
  checkBarCode,
  generateBarCode,
  scanBarCode
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
      title: "只条码",
      dataIndex: "onlyBarCode",
      key: "onlyBarCode",
      align: "center",
      width: 200,
      ellipsis: {
        showTitle: false,
      },
      align: "center",
      render: (onlyBarCode) => (
        <Tooltip placement="topLeft" title={onlyBarCode}>
          {onlyBarCode}
        </Tooltip>
      ),
    },

    {
      title: "供应商SAP编码",
      dataIndex: "supplierName",
      key: "supplierName",
      align: "center",
      width: 200,
      ellipsis: {
        showTitle: false,
      },
      align: "center",
      render: (supplierName) => (
        <Tooltip placement="topLeft" title={supplierName}>
          {supplierName}
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
      title: "装盒数量",
      dataIndex: "cartonsNumber",
      valueType: "text",
      align: "center",
      width: 150,
    },

    {
      title: "箱盒数量",
      dataIndex: "boxesNumber",
      valueType: "text",
      align: "center",
      width: 150,
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
      width: 300,
      render: (modelDesc) => (
        <Tooltip placement="topLeft" title={modelDesc}>
          {modelDesc}
        </Tooltip>
      ),
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
      title: "条码",
      dataIndex: "onlyBarCode",
      key: "onlyBarCode",
      align: "center",
      width: 200,
      ellipsis: {
        showTitle: false,
      },
      align: "center",
      render: (onlyBarCode) => (
        <Tooltip placement="topLeft" title={onlyBarCode}>
          {onlyBarCode}
        </Tooltip>
      ),
    },

    {
      title: "供应商SAP编码",
      dataIndex: "supplierName",
      key: "supplierName",
      align: "center",
      width: 200,
      ellipsis: {
        showTitle: false,
      },
      align: "center",
      render: (supplierName) => (
        <Tooltip placement="topLeft" title={supplierName}>
          {supplierName}
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
      title: "装盒数量",
      dataIndex: "cartonsNumber",
      valueType: "text",
      align: "center",
      width: 150,
    },

    {
      title: "箱盒数量",
      dataIndex: "boxesNumber",
      valueType: "text",
      align: "center",
      width: 150,
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
      width: 300,
      render: (modelDesc) => (
        <Tooltip placement="topLeft" title={modelDesc}>
          {modelDesc}
        </Tooltip>
      ),
    },
  ];




  const [dataSource1, setDataSource1] = useState([]);
  const [dataSource2, setDataSource2] = useState([]);
  const [materialTypeList, setMaterialTypeList] = useState([])
  const [zhiSelectCol, setZhiSelectCol] = useState([])
  const [otherSelectCol, setOtherSelectCol] = useState([])



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



  //多选只码条码
  const rowSelection1 = {
    onChange: (selectedRowKeys, selectedRows) => {
      setZhiSelectCol(selectedRows)
    }
  };


  // 只码扫描
  const onEnterZhi = async () => {
    let inputCode1 = document.getElementById("inputCode1").value;
    if (inputCode1 !== "") {
      let data1 = await checkBarCode(inputCode1);
      if (data1.status == 200) {
        setDataSource1(data1.data)
      } else {
        message.error(data1.message);
      }
    }
  }

  // 只码生产

  const zhiModel = async () => {
    let PickerVal1 = document.getElementById("PickerVal1").value;
    if (zhiSelectCol.length) {
      let list1 = await generateBarCode({
        materialFactoryList: zhiSelectCol,
        printDate: PickerVal1,
        userId: user.currentUser.id
      },
      );
      if (list1.status == 200) {
        setMaterialTypeList(list1.data)
        handleModalVisible(true)
      } else {
        message.error(list1.message);
      }
    } else {
      message.warning('请先选择一条数据！')
    }
  }





  //多选条码
  const rowSelection2 = {
    onChange: (selectedRowKeys, selectedRows) => {
      setOtherSelectCol(selectedRows)
    }
  };


  // 条码扫描
  const onEnterOther = async () => {
    let inputCode2 = document.getElementById("inputCode2").value;
    if (inputCode2 !== "") {
      let data2 = await scanBarCode(inputCode2);
      if (data2.status == 200) {
        setDataSource2(data2.data)
      } else {
        message.error(data2.message);
      }
    }
  }

  // 条码生产
  const otherModel = async () => {
    let PickerVal2 = document.getElementById("PickerVal2").value;
    if (otherSelectCol.length) {
      let list2 = await generateBarCode({
        materialFactoryList: otherSelectCol,
        printDate: PickerVal2,
        userId: user.currentUser.id
      },
      );
      if (list2.status == 200) {
        setMaterialTypeList(list2.data)
        handleModalVisible(true)
      } else {
        message.error(list2.message);
      }
    } else {
      message.warning('请先选择一条数据！')
    }
  }








  return (
    <PageContainer>
      <Tabs onChange={callback} type="card" style={{ background: "#fff" }}>
        <TabPane tab="零散退返产品处理" key="1">
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
                  name="zhiCode"
                  label="只码"
                  hasFeedback
                  {...formItemLayout2}
                >
                  <Input id="inputCode1" onPressEnter={onEnterZhi}></Input>
                </Form.Item>
              </Col>

              <Col span={2}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginLeft: "10px" }}
                  onClick={onEnterZhi}
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
                  <DatePicker defaultValue={moment(new Date())} id="PickerVal1" allowClear={false} />
                </Form.Item>
              </Col>

              <Col span={2}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginLeft: "10px" }}
                  // onClick={() => handleModalVisible(true)}
                  onClick={zhiModel}
                >
                  生成条码
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
              ...rowSelection1,
            }}
            // pagination={{ pageSize: 20 }}
            pagination={{ showTotal: total => `总共 ${dataSource1.length} 条`, }}
          />
        </TabPane>
        <TabPane tab="批量退返处理" key="2">
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
                  name="otherCode"
                  label="条码"
                  hasFeedback
                  {...formItemLayout2}
                >
                  <Input id="inputCode2" onPressEnter={onEnterOther}></Input>
                </Form.Item>
              </Col>

              <Col span={2}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginLeft: "10px" }}
                  onClick={onEnterOther}
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
                  <DatePicker defaultValue={moment(new Date())} id="PickerVal2" allowClear={false} />
                </Form.Item>
              </Col>

              <Col span={2}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginLeft: "10px" }}
                  // onClick={() => handleModalVisible(true)}
                  onClick={otherModel}
                >
                  生成条码
                </Button>
              </Col>
            </Row>
          </Form>
          <Table
            className="flex-table"
            dataSource={dataSource2}
            columns={columns2}
            style={{ padding: "0 20px" }}
            rowKey="id*id"
            scroll={{
              y: "100%",
            }}
            rowSelection={{
              ...rowSelection2,
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
