import React, { useState, useEffect } from "react";
import { Modal, Tabs, Table, Tag, Button } from "antd";
import { ArrowDownOutlined } from "@ant-design/icons";
import { getLodop } from "../../../../utils/LodopFuncs";
import "./modal.css";
const { TabPane } = Tabs;
const columns = [
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

const dataSource2 = [
  {
    key: "3",
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
    key: "4",
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

const dataSource3 = [
  {
    key: "5",
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
    key: "6",
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

const CreateForm = (props) => {
  const { modalVisible, onCancel, printNo, ids, picker } = props;
  const [keys, setKeys] = useState(1);
  const [zhiCode, setZhiCode] = useState(false);
  const [heCode, setHeCode] = useState(true);
  const [boxCode, setBoxCode] = useState(true);
  const [loading1 ,setLoading1]  = useState(false);
  const [loading2 ,setLoading2]  = useState(false);
  const [loading3 ,setLoading3]  = useState(false);
  const [erCode, setErCode]=useState([172, 154, 175, 197])

  const [arr, setArr] = useState([
    "22345678905",
    "12345678901",
    "12345678906",
    "12345678902",
    "12345678907",
  ]);
  console.log("ids", ids);
  console.log("printNo", printNo);
  console.log("picker", picker);

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

  //点击打印条码按钮获取当前打印的id
  const pintCode = () => {
    if (keys === "3") {
      console.log(dataSource3.map((item) => item.key));
    } else if (keys === "2") {
      console.log(dataSource2.map((item) => item.key));
    } else {
      console.log(dataSource1.map((item) => item.key));
    }
  };

  //只条码打印
  const zhiPint = () => {
  
    LODOP.PRINT_DESIGN();
    // LODOP = getLodop();
    LODOP.ADD_PRINT_BARCODE(172, 154, 175, 197, "QRCode", "123456789012");
 
  };

  //盒码
  const hePint = () => {
    LODOP.PRINT_INIT("react使用打印插件CLodop"); //打印初始化
    let strStyle = `<style> 打印的样式需要写在这里，下面引入</style> `;
    LODOP.ADD_PRINT_HTM(
      100,
      "5%",
      "90%",
      450,
      strStyle + document.getElementById("zhiPrint").innerHTML
    );
    LODOP.PREVIEW(); //最后一个打印(预览)语句
  };

  return (
    <Modal
      maskClosable={false}
      destroyOnClose
      title="打印条码"
      visible={modalVisible}
      // visible={true}
      onCancel={() => onCancel()}
      printNo={printNo}
      ids={ids}
      picker={picker}
      footer={null}
      width={1500}
    >
      <div style={{ height: "40px" }}>
        <span>
          批次号： <Tag color="red">202202151200</Tag>
        </span>
        <span>
          物料编号：<Tag color="volcano">32749</Tag>
        </span>
        <Button type="primary" className="pintCode" onClick={pintCode}>
          <ArrowDownOutlined />
          打印条码
        </Button>

        <Button type="primary" className="pintRight" hidden={zhiCode} onClick={zhiPint}>
          <Tag color="volcano"> 只码模板:</Tag>成品条码
        </Button>
        <Button type="primary" className="pintRight" hidden={heCode} onClick={hePint} >
          <Tag color="volcano"> 盒码模板:</Tag>40x60
        </Button>
        <Button type="primary" className="pintRight" hidden={boxCode}>
          <Tag color="volcano"> 箱码模板:</Tag>60x80
        </Button>
      </div>
      <Tabs defaultActiveKey="1" onChange={callback} type="card" >
     
        <TabPane tab="只" key="1">
          <Table
            dataSource={dataSource1}
            columns={columns}
            pagination={false}
            loading={loading1}
          />
        </TabPane>
        <TabPane tab="盒" key="2">
          <Table
            dataSource={dataSource2}
            columns={columns}
            pagination={false}
            loading={loading2}
          />
        </TabPane>
        <TabPane tab="箱" key="3">
          <Table
            dataSource={dataSource3}
            columns={columns}
            pagination={false}
            loading={loading3}
          />
        </TabPane>
      </Tabs>

      <div id="zhiPrint" style={{ display: "none" }}>
        <div className="center">
          <div className="left">防伪查询</div>
          <div className="center">二维码</div>
          <div className="right">
            <p>
              <span>S/N:</span>WWWWWWWWWWWWWWWWWWWW
            </p>
            <p>
              <span>DATE:</span>2222222222222222
            </p>
            <p>
              <span>服务热线:</span>4008268008
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateForm;
