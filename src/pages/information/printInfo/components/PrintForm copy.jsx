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

const dataSource1 = [
  {
    key: "1",
    batchNumber: "202202151200",
    barCodeType: "只",
    barCode: "2uybM0327491062640",
    materialNo: "32749",
    materialType: "CDPZ3024DRHHDMZC",
    materialDescription: "PZ30-24单暗装1.2mm厚 120mm深2层板（导轨）+面盖除底箱SM战采",
    printTime: "2022-02-15 12:00:00",
    PrinterPer: "张三",
  },
  {
    key: "2",
    batchNumber: "202202151200",
    barCodeType: "只",
    barCode: "2uybM0327491062639",
    materialNo: "32749",
    materialType: "CDPZ3024DRHHDMZC",
    materialDescription: "PZ30-24单暗装1.2mm厚 120mm深2层板（导轨）+面盖除底箱SM战采",
    printTime: "2022-02-15 12:00:00",
    PrinterPer: "张三",
  },
];

const dataSource2 = [
  {
    key: "3",
    batchNumber: "202202151200",
    barCodeType: "盒",
    barCode: "2uybM0327491062640",
    materialNo: "32749",
    materialType: "CDPZ3024DRHHDMZC",
    materialDescription: "PZ30-24单暗装1.2mm厚 120mm深2层板（导轨）+面盖除底箱SM战采",
    printTime: "2022-02-15 12:00:00",
    PrinterPer: "张三",
  },
  {
    key: "4",
    batchNumber: "202202151200",
    barCodeType: "盒",
    barCode: "2uybM0327491062639",
    materialNo: "32749",
    materialType: "CDPZ3024DRHHDMZC",
    materialDescription: "PZ30-24单暗装1.2mm厚 120mm深2层板（导轨）+面盖除底箱SM战采",
    printTime: "2022-02-15 12:00:00",
    PrinterPer: "张三",
  },
];

const dataSource3 = [
  {
    key: "5",
    batchNumber: "202202151200",
    barCodeType: "箱",
    barCode: "2uybM0327491062640",
    materialNo: "32749",
    materialType: "CDPZ3024DRHHDMZC",
    materialDescription: "PZ30-24单暗装1.2mm厚 120mm深2层板（导轨）+面盖除底箱SM战采",
    printTime: "2022-02-15 12:00:00",
    PrinterPer: "张三",
  },
  {
    key: "6",
    batchNumber: "202202151200",
    barCodeType: "箱",
    barCode: "2uybM0327491062639",
    materialNo: "32749",
    materialType: "CDPZ3024DRHHDMZC",
    materialDescription: "PZ30-24单暗装1.2mm厚 120mm深2层板（导轨）+面盖除底箱SM战采",
    printTime: "2022-02-15 12:00:00",
    PrinterPer: "张三",
  },
];

const CreateForm = (props) => {
  const { modalVisible, onCancel, printNo, picker, materialTypeList } = props;
  const [keys, setKeys] = useState(1);
  const [zhiCode, setZhiCode] = useState(false);
  const [heCode, setHeCode] = useState(true);
  const [boxCode, setBoxCode] = useState(true);
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [erCode, setErCode] = useState([172, 154, 175, 197])
  const [noStart, setNoStart] = useState('')
  const [CodeList, setCodeList] = useState(['123456789012', '123456789013'])
  const [code, setCode] = useState('123456789014')


  const [arr, setArr] = useState([
    "22345678905",
    "12345678901",
    "12345678906",
    "12345678902",
    "12345678907",
  ]);
  // console.log("ids", ids);
  // console.log("printNo", printNo);
  // console.log("picker", picker);


  useEffect(() => {
    if (modalVisible) {
      // LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_获得程序代码");
      // LODOP.ADD_PRINT_BARCODE(190, 483, 213, 60, "128A", "123456789012");
      // LODOP.ADD_PRINT_TEXT(20, 180, 100, 25, "郭德强1");
      LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_获得程序代码");
      LODOP.ADD_PRINT_BARCODE(80, 62, 213, 60, "128A", "123456789012");
      // LODOP.ADD_PRINT_TEXT(29,61,100,25,"郭德强1");
    }
    if (noStart) {
      console.log("useEffect", noStart)
      CreateOneFormPage()
    }
    if (materialTypeList.onlyBarCodeList) {
      setLoading1(false)
    }

  }, [modalVisible, noStart, materialTypeList]);




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
    CreateOneFormPage(CodeList);
    // console.log('LOOP', LOOP, LOOP.ItemDatas)

    LODOP.PREVIEW();
    // LODOP.PRINT();	
    //点击箱码
    if (keys === "3") {
      console.log(dataSource3.map((item) => item.key));
    } else if (keys === "2") {
      //点击盒码
      console.log(dataSource2.map((item) => item.key));
    } else {
      //点击只码
      console.log(dataSource1.map((item) => item.key));

    }
  };


  //只条码打印
  const zhiPint = () => {
    // if (LODOP.CVERSION) CLODOP.On_Return = function (TaskID,Value) {
    //   console.log('Value', Value)
    // };
    // 
    LODOP.On_Return = (TaskID, Value) => {
      if (Value) {
        setNoStart(Value)
        noStart = LODOP.PRINT_DESIGN()
        console.log('123', Value, noStart)
        // CreateOneFormPage()
      } else {
        code = ""
      }
    }

    // LODOP.On_Return = function (TaskID, Value) {
    //   if (Value) {
    //     setNoStart(Value)
    //     console.log('123',Value, noStart)
    //     CreateOneFormPage()
    //   } else {
    //     code = ""
    //   }
    // }
    LODOP.PRINT_DESIGN();
  };


  const CreateOneFormPage = (CodeList) => {
    // setCode("123456789014")
    // LODOP.SET_PRINT_STYLEA(0,"Content","");//设置内容参数的变量名
    eval(noStart)

    LODOP.PRINT_INIT("react使用打印插件CLodop"); //打印初始化
    // if (LODOP.CVERSION) CLODOP.On_Return=null;

    var newList = [];
    console.log('2222222', window.LODOP.ItemDatas)
    for (let [key, value] of Object.entries(window.LODOP.ItemDatas)) {
      if (key != 'count') {
        newList.push({ key: key, height: value.height, left: value.left, top: value.top, width: value.width, content: value.content });
      }
    }
    if (CodeList === undefined) {
      // LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_获得程序代码");
      // LODOP.ADD_PRINT_BARCODE(190, 483, 213, 60, "128A", "123456789012");
      console.log('111', noStart)
      // startCode.replace(/\'/g, '')
      // if (noStart) {
      //   startCode.replace(/\'/g, '')

      // } else {
      //   startCode.replace(/\'/g, '')
      //   console.log('startCode', startCode.replace(/\'/g, ''))

      // }
      // noStart
      //  LOOP = getLodop();

      // var top = location[0].top;

      //  console.log('LOOP111', window.LODOP.ItemDatas, location[0], top)

      console.log(newList)



    } else if (CodeList.length > 0) {
      // LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_获得程序代码");
      // LODOP.ADD_PRINT_BARCODE(0, 0, 0, 0, "128A", "");
      // var iCurLine=156;//标题行之后的数据从位置80px开始打印

      for (var i = 0; i < CodeList.length; i++) {
        console.log('newList',)
        //  LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_获得程序代码");
        console.log(CodeList[i])

        // for (var j = 0; j < newList.length; j++) {
        //   console.log('-----', newList[j].content)
        // LODOP.ADD_PRINT_BARCODE(80,62,213,60,"128A","123456789012");
        // LODOP.ADD_PRINT_TEXT(29,61,100,25,"郭德强1");
        LODOP.ADD_PRINT_HTM(
          (i + 1) * 15,
          "6%",
          "90%",
          450,
          document.getElementById("zhiPrint").innerHTML
        );
        LODOP.SET_PRINT_STYLEA(0, "Top", 400);
        LODOP.ADD_PRINT_BARCODE(156, "2.875%", "46.375%", 208, "128A", CodeList[i]);
        LODOP.SET_PRINT_STYLEA(1, "Top", 400);
        // LODOP.ADD_PRINT_BARCODE((j + 1) * newList[j].top, newList[j].left, newList[j].width, newList[j].height, "128A", newList[j].content);
        // iCurLine=iCurLine + 25;//每行占25px
        // }

      }
    }

  };








  //盒码
  const hePint = () => {
    LODOP.PRINT_INIT("react使用打印插件CLodop"); //打印初始化
    LODOP.SET_PRINT_MODE("PROGRAM_CONTENT_BYVAR", true);//生成程序时，内容参数有变量用变量，无变量用具体值
    let strStyle = `<style> 打印的样式需要写在这里，下面引入</style> `;
    let body = `<div>    
                 <ul>
                   <li>条码: <span>wwwwwww</span></li>
                   <li>日期: <span>20220306</span></li>
                   <li>批次号: <span>abcdefgh</span></li>
                 </ul>
               </div>`
    // LODOP.ADD_PRINT_HTM(17,"5.875%","90%",450,"(超文本1的HTML代码内容)");
    // LODOP.ADD_PRINT_BARCODE(161,"5.5%","46.375%",208,"128A","123456789012");
    LODOP.ADD_PRINT_HTM(
      15,
      "6%",
      "90%",
      450,
      strStyle + body + document.getElementById("zhiPrint").innerHTML
    );
    LODOP.ADD_PRINT_BARCODE(190, 483, 213, 60, "128A", "123456789012");
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
      printNo={printNo}
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

export default CreateForm;
