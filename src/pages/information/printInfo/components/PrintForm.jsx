import React, { useState, useEffect } from "react";
import { Modal, Tabs, Table, Tag, Button ,message } from "antd";
import { ArrowDownOutlined } from "@ant-design/icons";
import { getLodop } from "../../../../utils/LodopFuncs";
import "./modal.css";
const { TabPane } = Tabs;
const columns = [
  {
    title: "打印批次",
    dataIndex: "batchNumber",
    key: "batchNumber",
    align: "center",
  },
  {
    title: "条码类型",
    dataIndex: "barCodeType",
    key: "barCodeType",
    align: "center",

  },
  {
    title: "条码",
    dataIndex: "barCode",
    width: 180,
    ellipsis: true,
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
    dataIndex: "materialType",
    key: "materialType",
    align: "center",
  },
  {
    title: "物料描述",
    dataIndex: "materialDescription",
    key: "materialDescription",
    ellipsis: true,
    align: "center",
  },
  {
    title: "打印时间",
    dataIndex: "printDate",
    key: "printDate",
    align: "center",
  },
  {
    title: "打印人员",
    dataIndex: "PrinterPer",
    key: "PrinterPer",
    align: "center",
  },
];


const PrintForm = (props) => {
  const { modalVisible, onCancel, materialTypeList ,loading } = props;
  const [keys, setKeys] = useState(1);
  const [zhiCode, setZhiCode] = useState(false);
  const [heCode, setHeCode] = useState(true);
  const [boxCode, setBoxCode] = useState(true);
 
 

  //tabs切换获取当前index
  const callback = (key) => {
    setKeys(key);
    if (key === "1") {
      setZhiCode(false);
      setHeCode(true);
      setBoxCode(true);
    } else if (key === "2") {
      setZhiCode(true);
      setHeCode(false);
      setBoxCode(true);
    } else {
      setZhiCode(true);
      setHeCode(true);
      setBoxCode(false);
    }
  };

  const handCopy =(text)=>{
    let oInput = document.createElement('input')
    oInput.value = text
    document.body.appendChild(oInput)
    oInput.select() // 选择对象;
    document.execCommand('Copy') // 执行浏览器复制命令
    message.success('复制成功!');
    oInput.remove()
  }



  return (
    <Modal
      maskClosable={false}
      destroyOnClose
      title="打印条码"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
      width={1500}
    >
      <div style={{ height: "40px" }}>
        <span>
          批次号： <Tag color="red">{materialTypeList.batchNumber}</Tag>
          <Button type="primary" onClick={()=>handCopy(materialTypeList.batchNumber)}>复制</Button>
        </span>
        <span style={{ marginLeft: "15px" }}>
          物料编号：<Tag color="volcano">{materialTypeList.materialNo}</Tag>
        </span>
      </div>
      <Tabs defaultActiveKey="1" onChange={callback} type="card" >

        <TabPane tab="只" key="1">
          <Table
            dataSource={materialTypeList.onlyBarCodeList}
            columns={columns}
            // pagination={false}
            loading={loading}
            pagination={{ pageSize: 50 }}
            scroll={{ y: 300 }}
          />
        </TabPane>
        <TabPane tab="盒" key="2">
          <Table
            dataSource={materialTypeList.boxBarCodeList}
            columns={columns}
            // pagination={false}
            loading={loading}
            pagination={{ pageSize: 50 }}
            scroll={{ y: 300 }}
          />
        </TabPane>
        <TabPane tab="箱" key="3">
          <Table
            dataSource={materialTypeList.bigBoxBarCodeList}
            columns={columns}
            // pagination={false}
            loading={loading}
            pagination={{ pageSize: 50 }}
            scroll={{ y: 300 }}
          />
        </TabPane>
      </Tabs>

    </Modal>
  );
};

export default PrintForm;
