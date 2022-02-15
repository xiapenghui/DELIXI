import React, { useState, useEffect } from 'react';
import { Modal, Tabs, Table, Tag, Button } from 'antd';
import { ArrowDownOutlined } from "@ant-design/icons";
import './modal.css'
import Item from 'antd/lib/list/Item';
const { TabPane } = Tabs;

const columns = [
  {
    title: '打印批次',
    dataIndex: 'printBatch',
    key: 'printBatch',
    align: 'center',
  },
  {
    title: '条码类型',
    dataIndex: 'barcodeType',
    key: 'barcodeType',
    align: 'center',
  },
  {
    title: '条码',
    dataIndex: 'barCode',
    key: 'barCode',
    align: 'center',
  },
  {
    title: '物料编号',
    dataIndex: 'materialNo',
    key: 'materialNo',
    align: 'center',
  },
  {
    title: '物料型号',
    dataIndex: 'materialModel',
    key: 'materialModel',
    align: 'center',
  },
  {
    title: '型号描述',
    dataIndex: 'modelDesc',
    key: 'modelDesc',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '打印时间',
    dataIndex: 'printTime',
    key: 'printTime',
    align: 'center',
  },
  {
    title: '打印人员',
    dataIndex: 'PrinterPer',
    key: 'PrinterPer',
    align: 'center',
  },
];


const dataSource1 = [
  {
    key: '1',
    printBatch: '202202151200',
    barcodeType: '只',
    barCode: '2uybM0327491062640',
    materialNo: '32749',
    materialModel: 'CDPZ3024DRHHDMZC',
    modelDesc: 'PZ30-24单暗装1.2mm厚 120mm深2层板（导轨）+面盖除底箱SM战采',
    printTime: '2022-02-15 12:00:00',
    PrinterPer: '张三'
  },
  {
    key: '2',
    printBatch: '202202151200',
    barcodeType: '只',
    barCode: '2uybM0327491062639',
    materialNo: '32749',
    materialModel: 'CDPZ3024DRHHDMZC',
    modelDesc: 'PZ30-24单暗装1.2mm厚 120mm深2层板（导轨）+面盖除底箱SM战采',
    printTime: '2022-02-15 12:00:00',
    PrinterPer: '张三'
  },

];


const dataSource2 = [
  {
    key: '3',
    printBatch: '202202151200',
    barcodeType: '盒',
    barCode: '2uybM0327491062640',
    materialNo: '32749',
    materialModel: 'CDPZ3024DRHHDMZC',
    modelDesc: 'PZ30-24单暗装1.2mm厚 120mm深2层板（导轨）+面盖除底箱SM战采',
    printTime: '2022-02-15 12:00:00',
    PrinterPer: '张三'
  },
  {
    key: '4',
    printBatch: '202202151200',
    barcodeType: '盒',
    barCode: '2uybM0327491062639',
    materialNo: '32749',
    materialModel: 'CDPZ3024DRHHDMZC',
    modelDesc: 'PZ30-24单暗装1.2mm厚 120mm深2层板（导轨）+面盖除底箱SM战采',
    printTime: '2022-02-15 12:00:00',
    PrinterPer: '张三'
  },

];

const dataSource3 = [
  {
    key: '5',
    printBatch: '202202151200',
    barcodeType: '箱',
    barCode: '2uybM0327491062640',
    materialNo: '32749',
    materialModel: 'CDPZ3024DRHHDMZC',
    modelDesc: 'PZ30-24单暗装1.2mm厚 120mm深2层板（导轨）+面盖除底箱SM战采',
    printTime: '2022-02-15 12:00:00',
    PrinterPer: '张三'
  },
  {
    key: '6',
    printBatch: '202202151200',
    barcodeType: '箱',
    barCode: '2uybM0327491062639',
    materialNo: '32749',
    materialModel: 'CDPZ3024DRHHDMZC',
    modelDesc: 'PZ30-24单暗装1.2mm厚 120mm深2层板（导轨）+面盖除底箱SM战采',
    printTime: '2022-02-15 12:00:00',
    PrinterPer: '张三'
  },

];


const CreateForm = (props) => {
  const { modalVisible, onCancel, printNo, ids, picker } = props;
  const [keys, setKeys] = useState(1)
  console.log('ids', ids)
  console.log('printNo', printNo)
  console.log('picker', picker)



  //tabs切换获取当前index
  const callback = (key) => {
    setKeys(key)
  }

  //点击打印条码按钮获取当前打印的id
  const pintCode = () => {
    if (keys === "3") {
      console.log(dataSource3.map((item) => (item.key)))
    } else if (keys === "2") {
      console.log(dataSource2.map((item) => (item.key)))
    } else {
      console.log(dataSource1.map((item) => (item.key)))
    }
  }



  return (
    <Modal
      maskClosable={false}
      destroyOnClose
      title="打印条码"
      visible={modalVisible}
      onCancel={() => onCancel()}
      printNo={printNo}
      ids={ids}
      picker={picker}
      footer={null}
      width={1500}

    >
      <div style={{ height: '40px' }}>
        <span> 批次号： <Tag color="red">202202151200</Tag></span>
        <span>物料编号：<Tag color="volcano">32749</Tag></span>
        <Button type="primary" className='pintCode' onClick={pintCode}><ArrowDownOutlined />打印条码</Button>
      </div>
      <Tabs defaultActiveKey="1" onChange={callback} type="card"  >
        <TabPane tab="只" key="1">
          <Table dataSource={dataSource1} columns={columns} pagination={false}
          />
        </TabPane>
        <TabPane tab="盒" key="2">
          <Table dataSource={dataSource2} columns={columns} pagination={false}
          />
        </TabPane>
        <TabPane tab="箱" key="3">
          <Table dataSource={dataSource3} columns={columns} pagination={false}
          />
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export default CreateForm;
