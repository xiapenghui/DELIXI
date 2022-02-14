import React from 'react';
import { Modal, Tabs, Table, Tag } from 'antd';
import './modal.css'
const { TabPane } = Tabs;
const columns = [
  {
    title: '打印批次',
    dataIndex: 'printBatch',
    key: 'printBatch',
  },
  {
    title: '条码类型',
    dataIndex: 'barcodeType',
    key: 'barcodeType',
  },
  {
    title: '条码',
    dataIndex: 'barCode',
    key: 'barCode',
  },
  {
    title: '物料编号',
    dataIndex: 'materialNo',
    key: 'materialNo',
  },
  {
    title: '物料型号',
    dataIndex: 'materialModel',
    key: 'materialModel',
  },
  {
    title: '型号描述',
    dataIndex: 'modelDesc',
    key: 'modelDesc',
  },
  {
    title: '打印时间',
    dataIndex: 'printTime',
    key: 'printTime',
  },
  {
    title: '打印人员',
    dataIndex: 'PrinterPer',
    key: 'PrinterPer',
  },
];


const dataSource = [
  {
    key: '1',
    printBatch: '盒',
    barcodeType: '盒',
    barCode: '西湖区湖底公园1号',
    materialNo: '西湖区湖底公园1号',
    materialModel: '西湖区湖底公园1号',
    modelDesc: '西湖区湖底公园1号',
    printTime: '西湖区湖底公园1号',
    PrinterPer: '西湖区湖底公园1号'
  },
  {
    key: '2',
    printBatch: '盒',
    barcodeType: '盒',
    barCode: '西湖区湖底公园1号',
    materialNo: '西湖区湖底公园1号',
    materialModel: '西湖区湖底公园1号',
    modelDesc: '西湖区湖底公园1号',
    printTime: '西湖区湖底公园1号',
    PrinterPer: '西湖区湖底公园1号'
  },
  {
    key: '3',
    printBatch: '盒',
    barcodeType: '盒',
    barCode: '西湖区湖底公园1号',
    materialNo: '西湖区湖底公园1号',
    materialModel: '西湖区湖底公园1号',
    modelDesc: '西湖区湖底公园1号',
    printTime: '西湖区湖底公园1号',
    PrinterPer: '西湖区湖底公园1号'
  },

];



const CreateForm = (props) => {
  const { modalVisible, onCancel, printNo, ids, picker } = props;

  console.log('ids', ids)
  console.log('printNo', printNo)
  console.log('picker', picker)

  function callback(key) {
    console.log(key);
  }

  const onOk = () => {
    debugger
  }


  const handleModal = () => {
      debugger
  }


  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };


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
      // footer={null}
      okText="点击打印"
      width={1200}
      onOk={onOk}

    >
      <div style={{ height: '40px' }}>
        <span> 批次号： <Tag color="red">red</Tag></span>
        <span>物料编号：<Tag color="volcano">volcano</Tag></span>
      </div>
      <Tabs defaultActiveKey="1" onChange={callback} type="card"  >


        <TabPane tab="只" key="1">
          <Table dataSource={dataSource} columns={columns}
            rowSelection={{
              ...rowSelection,
            }} />
        </TabPane>
        <TabPane tab="箱" key="2">
          <Table dataSource={dataSource} columns={columns}
            rowSelection={{
              ...rowSelection,
            }} />
        </TabPane>
        <TabPane tab="盒" key="3">
          <Table dataSource={dataSource} columns={columns}
            rowSelection={{
              ...rowSelection,
            }} />
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export default CreateForm;
