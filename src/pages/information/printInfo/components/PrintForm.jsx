import React, { useState, useEffect } from "react";
import { Modal, Tabs, Table, Tag, Button } from "antd";
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
    width: 150,
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
    title: "型号描述",
    dataIndex: "materialDescription",
    key: "materialDescription",
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

const dataSource1 = [];

const dataSource2 = [];

const dataSource3 = [];

const PrintForm = (props) => {
  const { modalVisible, onCancel, materialTypeList } = props;
  const [keys, setKeys] = useState(1);
  const [zhiCode, setZhiCode] = useState(false);
  const [heCode, setHeCode] = useState(true);
  const [boxCode, setBoxCode] = useState(true);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [noStart, setNoStart] = useState('')
  const [CodeList, setCodeList] = useState(['123456789012', '123456789013'])


  const [arr, setArr] = useState([
    "22345678905",
    "12345678901",
    "12345678906",
    // "12345678902",
    // "12345678907",
  ]);

  useEffect(() => {
 
    if (modalVisible) {
      setNoStart(
        `LODOP.PRINT_INITA(5, 5, 550, 250, "打印控件功能演示_Lodop功能");
        LODOP.ADD_PRINT_RECT(8, 52, 488, 203, 0, 1);
        LODOP.ADD_PRINT_TEXT(155, 392, 138, 40, "400828008");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 17);
        LODOP.ADD_PRINT_BARCODE(14, 57, 204, 157, "QRCode", "123456789");
        LODOP.SET_PRINT_STYLEA(0, "ScalY", 1.2);
        LODOP.ADD_PRINT_TEXT(90, 355, 174, 45, "222222222222222222");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 17);
        LODOP.ADD_PRINT_TEXT(19, 340, 192, 55, "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 17);
        LODOP.ADD_PRINT_TEXT(20, 273, 55, 30, "S/N:");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 16);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.ADD_PRINT_TEXT(92, 274, 70, 35, "DATE：");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 15);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.SET_PRINT_STYLEA(0, "ScalY", 1.15);
        LODOP.ADD_PRINT_TEXT(155, 261, 111, 39, "服务热线：");
        LODOP.SET_PRINT_STYLEA(0, "FontSize", 15);
        LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);`
      )
     
    }
  }, [modalVisible]);



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





  //开始
  //点击打印条码
  const pintCode = () => {
    var zhiList = noStart.replace('123456789', arr[0])
    eval(zhiList)
    LODOP.PRINT();
    for (var i = 0; i < arr.length; i++) {
      if (i > 0) {
        LODOP.SET_PRINT_PAGESIZE(1, arr.length, "A3");
        zhiList = zhiList.replace(arr[i-1], arr[i])
        eval(zhiList)
        LODOP.PRINT();
        LODOP.PRINT_INIT("");
      }
    }
  };


  //只条码模板
  const zhiPint = () => {
    CreateOneFormPage()
    LODOP.On_Return = (TaskID, Value) => {
      setNoStart(Value)
    }
    LODOP.PRINT_DESIGN();
  };


  const CreateOneFormPage = () => {
    LODOP.PRINT_INITA(5, 5, 550, 250, "打印控件功能演示_Lodop功能");
    LODOP.ADD_PRINT_RECT(8, 52, 488, 203, 0, 1);
    LODOP.ADD_PRINT_TEXT(155, 392, 138, 40, "400828008");
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 17);
    LODOP.ADD_PRINT_BARCODE(14, 57, 204, 157, "QRCode", "123456789");
    LODOP.SET_PRINT_STYLEA(0, "ScalY", 1.2);
    LODOP.ADD_PRINT_TEXT(90, 355, 174, 45, "222222222222222222");
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 17);
    LODOP.ADD_PRINT_TEXT(19, 340, 192, 55, "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW");
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 17);
    LODOP.ADD_PRINT_TEXT(20, 273, 55, 30, "S/N:");
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 16);
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.ADD_PRINT_TEXT(92, 274, 70, 35, "DATE：");
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 15);
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    LODOP.SET_PRINT_STYLEA(0, "ScalY", 1.15);
    LODOP.ADD_PRINT_TEXT(155, 261, 111, 39, "服务热线：");
    LODOP.SET_PRINT_STYLEA(0, "FontSize", 15);
    LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);


  };



  //结束代码



  //盒码
  const hePint = () => {
    LODOP.PRINT_INIT("react使用打印插件CLodop"); //打印初始化
    LODOP.SET_PRINT_MODE("PROGRAM_CONTENT_BYVAR", true);//生成程序时，内容参数有变量用变量，无变量用具体值
    let strStyle = `<style> 打印的样式需要写在这里，下面引入</style> `;
    // LODOP.ADD_PRINT_HTM(17,"5.875%","90%",450,"(超文本1的HTML代码内容)");
    // LODOP.ADD_PRINT_BARCODE(161,"5.5%","46.375%",208,"QRCode","123456789012");
    LODOP.ADD_PRINT_HTM(
      15,
      "6%",
      "90%",
      450,
      strStyle + document.getElementById("zhiPrint").innerHTML
    );
    LODOP.ADD_PRINT_BARCODE(190, 483, 213, 60, "QRCode", "123456789012");
    CreateOneFormPage(CodeList)
    LODOP.PRINT_DESIGN();
    LODOP.PREVIEW(); //最后一个打印(预览)语句
    // LODOP.SET_PRINT_STYLEA(0,"Content", code);//设置内容参数的变量名
  };

  return (
    <Modal
      maskClosable={false}
      destroyOnClose
      title="打印条码"
      visible={modalVisible}
      // visible={true}
      onCancel={() => onCancel()}
      footer={null}
      width={1500}
    >
      <div style={{ height: "40px" }}>
        <span>
          批次号： <Tag color="red">{materialTypeList.batchNumber}</Tag>
        </span>
        <span>
          物料编号：<Tag color="volcano">{materialTypeList.materialNo}</Tag>
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
            dataSource={materialTypeList.onlyBarCodeList}
            columns={columns}
            pagination={false}
            loading={loading1}
            pagination={{ pageSize: 20 }}
            scroll={{ y: 300 }}
          />
        </TabPane>
        <TabPane tab="盒" key="2">
          <Table
            dataSource={materialTypeList.boxBarCodeList}
            columns={columns}
            pagination={false}
            loading={loading2}
            pagination={{ pageSize: 20 }}
            scroll={{ y: 300 }}
          />
        </TabPane>
        <TabPane tab="箱" key="3">
          <Table
            dataSource={materialTypeList.bigBoxBarCodeList}
            columns={columns}
            pagination={false}
            loading={loading3}
            pagination={{ pageSize: 20 }}
            scroll={{ y: 300 }}
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

export default PrintForm;
