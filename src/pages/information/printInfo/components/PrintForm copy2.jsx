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
    title: "物料描述",
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

const CreateForm = (props) => {
  const { modalVisible, onCancel, materialTypeList } = props;
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
    // "12345678906",
    // "12345678902",
    // "12345678907",
  ]);

  useEffect(() => {
    // if (modalVisible) {
    //   // LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_获得程序代码");
    //   // LODOP.ADD_PRINT_BARCODE(190, 483, 213, 60, "128A", "123456789012");
    //   // LODOP.ADD_PRINT_TEXT(20, 180, 100, 25, "郭德强1");
    //   LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_获得程序代码");
    //   LODOP.ADD_PRINT_BARCODE(80, 62, 213, 60, "128A", "123456789012");
    //   // LODOP.ADD_PRINT_TEXT(29,61,100,25,"郭德强1");
    // }
    // if (noStart) {
    //   console.log("useEffect", noStart)
    //   CreateOneFormPage()
    // }

    if (materialTypeList.onlyBarCodeList) {
      setLoading1(false)
    }

  }, [materialTypeList]);




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
    console.log('111111111', noStart, typeof(noStart), )
    // 'LODOP.ADD_PRINT_BARCODE(172, 79, 242, 188, "128A", "22345678905");`LODOP.SET_PRINT_STYLEA(0, "ScalY", 1.2);'.replace('LODOP.ADD_PRINT_BARCODE(172, 79, 242, 188, "128A", "22345678905");','LODOP.ADD_PRINT_BARCODE(172, 79, 242, 188, "128A", "22345678906");')
    // eval(noStart)   
    //  LODOP.PRINT_INIT("react使用打印插件CLodop"); //打印初始化
    // var content = []
     var a =  noStart.replace('123456', arr[0])
    eval(a) 
    LODOP.PRINT();
    var top = 0;
    for (var i = 0; i < arr.length; i++) {
      // LODOP.SET_PRINT_STYLEA(0,"Content",arr[i]);//设置内容参数的变量名
      if(i > 0) {
        // top = top + 200;
        // LODOP.ADD_PRINT_RECT((i+1.5) * 166, 74, 506, 201, 0, 1);
        // // LODOP.ADD_PRINT_TEXT((i+0.7) * 325, 439, 138, 40, "400828008");
        
        // LODOP.ADD_PRINT_TEXT( top +  325, 439, 138, 40, "400828008");
        // LODOP.SET_PRINT_STYLEA(0, "FontSize", 17);
        // LODOP.SET_PRINT_STYLEA(0, "ScalY", 1.2);
        // // LODOP.ADD_PRINT_TEXT((i+0.9) * 259, 399, 174, 45, "222222222222222222");
        // LODOP.ADD_PRINT_TEXT( top +  259, 399, 174, 45, "222222222222222222");
       
        // LODOP.SET_PRINT_STYLEA(0, "FontSize", 17);
        // LODOP.ADD_PRINT_TEXT((i+1.5) * 178, 388, 192, 55, "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW");
        // LODOP.SET_PRINT_STYLEA(0, "FontSize", 17);
        // LODOP.ADD_PRINT_TEXT((i+1.5) * 179, 331, 55, 30, "S/N:");
        // LODOP.SET_PRINT_STYLEA(0, "FontSize", 16);
        // LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        // // LODOP.ADD_PRINT_TEXT((i+0.9) * 260, 327, 70, 35, "DATE：");
        // LODOP.ADD_PRINT_TEXT(top + 260, 327, 70, 35, "DATE：");
        // LODOP.SET_PRINT_STYLEA(0, "FontSize", 15);
        // LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        // LODOP.SET_PRINT_STYLEA(0, "ScalY", 1.15);
        // // LODOP.ADD_PRINT_TEXT((i+0.7) * 326, 324, 111, 39, "服务热线：");
        // LODOP.ADD_PRINT_TEXT(top + 326, 324, 111, 39, "服务热线：");
        // LODOP.SET_PRINT_STYLEA(0, "FontSize", 15);
        // LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
        LODOP.SET_PRINT_PAGESIZE(1,2,"A3");
        a = a.replace(arr[0], arr[i])
      
        LODOP.PRINT();
        LODOP.PRINT_INIT("");	
        // LODOP.ADD_PRINT_BARCODE((i+1.5) * 172, 79, 242, 188, '128A', arr[i]);
        // LODOP.PRINT();	
        // // LODOP.PREVIEW();
        // LODOP.PRINT_INIT("");	
        
        // LODOP.PRINT_DESIGN();
      }
    }
    // var a = noStart.replace('22345678905', '22345678906')
    // var a = noStart.replace('LODOP.ADD_PRINT_BARCODE(172, 79, 242, 188, "128A", "22345678905");', 
    // 'LODOP.ADD_PRINT_BARCODE(172, 79, 242, 188, "128A", "22345678906");')
    // console.log('222222', a)

	
  };


  //只条码打印
  const zhiPint = () => {
    CreateOneFormPage()
    LODOP.On_Return = (TaskID, Value) => {
      setNoStart(Value)
    }
    LODOP.PRINT_DESIGN();
  };


  const CreateOneFormPage = () => {
    LODOP.PRINT_INITA(10,10,1653,905,"打印控件功能演示_Lodop功能");
    LODOP.ADD_PRINT_RECT(8,52,506,201,0,1);
    LODOP.ADD_PRINT_TEXT(167,417,138,40,"400828008");
    LODOP.SET_PRINT_STYLEA(0,"FontSize",17);
    LODOP.ADD_PRINT_BARCODE(14,57,242,188,"128A","123456");
    LODOP.SET_PRINT_STYLEA(0,"ScalY",1.2);
    LODOP.ADD_PRINT_TEXT(101,377,174,45,"222222222222222222");
    LODOP.SET_PRINT_STYLEA(0,"FontSize",17);
    LODOP.ADD_PRINT_TEXT(20,366,192,55,"WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW");
    LODOP.SET_PRINT_STYLEA(0,"FontSize",17);
    LODOP.ADD_PRINT_TEXT(21,309,55,30,"S/N:");
    LODOP.SET_PRINT_STYLEA(0,"FontSize",16);
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
    LODOP.ADD_PRINT_TEXT(102,305,70,35,"DATE：");
    LODOP.SET_PRINT_STYLEA(0,"FontSize",15);
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
    LODOP.SET_PRINT_STYLEA(0,"ScalY",1.15);
    LODOP.ADD_PRINT_TEXT(168,302,111,39,"服务热线：");
    LODOP.SET_PRINT_STYLEA(0,"FontSize",15);
    LODOP.SET_PRINT_STYLEA(0,"Alignment",2);

    // LODOP.PRINT_INIT("react使用打印插件CLodop"); //打印初始化
    // LODOP.PRINT_INITA(10, 10, 1653, 905, "打印控件功能演示_Lodop功能");
    // LODOP.ADD_PRINT_RECT(166, 74, 506, 201, 0, 1);
    // LODOP.ADD_PRINT_TEXT(325, 439, 138, 40, "400828008");
    // LODOP.SET_PRINT_STYLEA(0, "FontSize", 17);
    // LODOP.ADD_PRINT_BARCODE(172, 79, 242, 188, "128A", "123456");
    // LODOP.SET_PRINT_STYLEA(0, "ScalY", 1.2);
    // LODOP.ADD_PRINT_TEXT(259, 399, 174, 45, "222222222222222222");
    // LODOP.SET_PRINT_STYLEA(0, "FontSize", 17);
    // LODOP.ADD_PRINT_TEXT(178, 388, 192, 55, "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW");
    // LODOP.SET_PRINT_STYLEA(0, "FontSize", 17);
    // LODOP.ADD_PRINT_TEXT(179, 331, 55, 30, "S/N:");
    // LODOP.SET_PRINT_STYLEA(0, "FontSize", 16);
    // LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    // LODOP.ADD_PRINT_TEXT(260, 327, 70, 35, "DATE：");
    // LODOP.SET_PRINT_STYLEA(0, "FontSize", 15);
    // LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);
    // LODOP.SET_PRINT_STYLEA(0, "ScalY", 1.15);
    // LODOP.ADD_PRINT_TEXT(326, 324, 111, 39, "服务热线：");
    // LODOP.SET_PRINT_STYLEA(0, "FontSize", 15);
    // LODOP.SET_PRINT_STYLEA(0, "Alignment", 2);

  };








  //结束代码





















  //盒码
  const hePint = () => {
    LODOP.PRINT_INIT("react使用打印插件CLodop"); //打印初始化
    LODOP.SET_PRINT_MODE("PROGRAM_CONTENT_BYVAR", true);//生成程序时，内容参数有变量用变量，无变量用具体值
    let strStyle = `<style> 打印的样式需要写在这里，下面引入</style> `;
    // LODOP.ADD_PRINT_HTM(17,"5.875%","90%",450,"(超文本1的HTML代码内容)");
    // LODOP.ADD_PRINT_BARCODE(161,"5.5%","46.375%",208,"128A","123456789012");
    LODOP.ADD_PRINT_HTM(
      15,
      "6%",
      "90%",
      450,
      strStyle + document.getElementById("zhiPrint").innerHTML
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
