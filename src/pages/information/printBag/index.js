import { PlusOutlined, SnippetsOutlined } from "@ant-design/icons";
import { Button, message, DatePicker, Form, Input, Select, Radio } from "antd";
import React, { useState, useRef, useEffect } from "react";
import { Link, connect } from "umi";
import { PageContainer, FooterToolbar } from "@ant-design/pro-layout";
import ProTable from "@ant-design/pro-table";
import moment from "moment";
import ProDescriptions from "@ant-design/pro-descriptions";
import UpdateForm from "./components/UpdateForm";
import "../../../../src/assets/commonStyle.css";
import  * as  LodopFuncs from "../../../utils/LodopFuncs.js";
import {
  getDropDownInit,
  postListInit,
  deleted,
  generateBarCode,
  printBarCode
} from "@/services/information/printBag";

const printBagComponent = ({ printBag, dispatch, user }) => {
  const { materialList } = printBag;
  const { currentUser } = user;
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [selectedRowsState, setSelectedRows] = useState([]);
  const actionRef = useRef();
  const [bagString, setBagString] = useState('')
  const [noStart, setNoStart] = useState('')
  const [bagID, setBagID] = useState([])
  /**
   * 编辑初始化
   */
  const [IsUpdate, setIsUpdate] = useState(false);
  const [UpdateDate, setUpdateDate] = useState({});

  const [materialType1, setMaterialType1] = useState('')
  const [cartonsNumber1, setCartonsNumber1] = useState('')
  const [boxWeight1, setBoxWeight1] = useState('')
  const [packingQuantity1, setPackingQuantity1] = useState('')
  const [threeC1, setThreeC1] = useState('')

  
  const getColumns = () => [

    {
      title: "物料描述",
      dataIndex: "typeDescription",
      valueType: "text",
      align: "center",
      width: 150,
      ellipsis: true,
      // hideInSearch: true,
    },
  

    {
      title: "供应商号",
      dataIndex: "supplierName",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
    },

    {
      title: "商品编码",
      dataIndex: "materialId",
      valueType: "text",
      align: "center",
      width: 150,
      hideInTable: true,
      valueEnum: materialList.length == 0 ? {} : [materialList],
      initialValue: IsUpdate ? UpdateDate.materialId : "",
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type === 'form' || type === 'table') {
          return <Select
            allowClear
            showSearch
            optionFilterProp='children'
          >
            {materialList.map(function (item, index) {
              return <Select.Option key={item.key} value={item.key}>
                {item.label}
              </Select.Option>
            })}
          </Select>
        }
        return defaultRender(_);
      },
    },


    {
      title: "商品编码",
      dataIndex: "materialType",
      valueType: "text",
      align: "center",
      width: 200,
      hideInTable: true,
    },




    {
      title: () => <a style={{ color: "red" }}>商品编码</a>,
      dataIndex: "materialType",
      valueType: "text",
      align: "center",
      width: 200,
      hideInSearch: true,
      render: (text, record, index, key) => {
        return (
          <input
            id={"materialType" + record.id}
            defaultValue={text}
            style={{ border: "none", color: "red", textAlign: "center" }}
            disabled={bagID[0] == record.id ? false : true}
            onBlur={() => changeMater(document.getElementById("materialType" + record.id).value, record.id)}
          ></input>
        );
      },
    },


    {
      title: "中文名称",
      dataIndex: "materialName",
      valueType: "text",
      align: "center",
      width: 150,
      hideInSearch: true,
      ellipsis: true,
    },


    {
      title: "英文名称",
      dataIndex: "materialDescription",
      valueType: "text",
      align: "center",
      width: 150,
      ellipsis: true,
      hideInSearch: true,
    },


  

    {
      title: () => <a style={{ color: "red" }}>商品编码</a>,
      dataIndex: "materialType",
      valueType: "text",
      align: "center",
      width: 200,
      hideInSearch: true,
      render: (text, record, index, key) => {
        return (
          <input
            id={"materialType" + record.id}
            defaultValue={text}
            style={{ border: "none", color: "red", textAlign: "center" }}
            disabled={bagID[0] == record.id ? false : true}
            onBlur={() => changeMater(document.getElementById("materialType" + record.id).value, record.id)}
          ></input>
        );
      },
    },



    {
      title: "物料代号",
      dataIndex: "materialNo",
      valueType: "text",
      align: "center",
      width: 120,
      fixed: "left",
      // hideInSearch: true,
    },

    {
      title: "系列",
      dataIndex: "serial",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
    },

    {
      title: "装袋数量",
      dataIndex: "basicQuantity",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
    },

    {
      title: "袋单位",
      dataIndex: "unit",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
    },




    {
      title: () => <a style={{ color: "red" }}>装盒数量</a>,
      dataIndex: "cartonsNumber",
      valueType: "text",
      align: "center",
      width: 150,
      hideInSearch: true,
      render: (text, record, index, key) => {
        return (
          <input
            id={"cartonsNumber" + record.id}
            defaultValue={text}
            disabled={bagID[0] == record.id ? false : true}
            style={{
              border: "none",
              color: "red",
              textAlign: "center",
              width: "100px",
            }}
            onBlur={() => changeCartonsNumber(document.getElementById("cartonsNumber" + record.id).value, record.id)}
          ></input>
        );
      },
    },

    {
      title: "盒单位",
      dataIndex: "boxUnit",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
    },

    {
      title: "盒重量",
      dataIndex: "weight",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
    },

    {
      title: "重量单位",
      dataIndex: "weightUnit",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
    },

    {
      title: "箱盒数量",
      dataIndex: "boxesNumber",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
    },

    {
      title: "EAN13码",
      dataIndex: "boxIEAN13",
      valueType: "text",
      align: "center",
      width: 150,
      hideInSearch: true,
    },

    {
      title: "箱ITF14码",
      dataIndex: "boxITF14",
      valueType: "text",
      align: "center",
      width: 150,
      hideInSearch: true,
    },

    {
      title: "盒ITF13码",
      dataIndex: "boxIEAN13",
      valueType: "text",
      align: "center",
      width: 150,
      hideInSearch: true,
    },

    {
      title: "盒ITF14码",
      dataIndex: "caseITF14",
      valueType: "text",
      align: "center",
      width: 150,
      hideInSearch: true,
    },

    {
      title: "工厂",
      dataIndex: "factoryName",
      valueType: "text",
      align: "center",
      width: 150,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: "生产厂/生产企业",
      dataIndex: "productionPlant",
      valueType: "text",
      align: "center",
      width: 150,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: "地址",
      dataIndex: "address",
      valueType: "text",
      align: "center",
      ellipsis: true,
      width: 150,
      hideInSearch: true,
    },
    {
      title: "备注",
      dataIndex: "remarks",
      valueType: "text",
      align: "center",
      width: 120,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: "执行标准",
      dataIndex: "standard",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
    },
    {
      title: "检验员",
      dataIndex: "examination",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
    },
    {
      title: "变更标记",
      dataIndex: "state",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
    },
    {
      title: () => <a style={{ color: "red" }}>箱重量</a>,
      dataIndex: "boxWeight",
      valueType: "text",
      align: "center",
      width: 150,
      hideInSearch: true,
      render: (text, record, index, key) => {
        return (
          <input
            id={"boxWeight" + record.id}
            defaultValue={text}
            disabled={bagID[0] == record.id ? false : true}
            style={{
              border: "none",
              color: "red",
              textAlign: "center",
              width: "100px",
            }}
            onBlur={() => changeBoxWeight(document.getElementById("boxWeight" + record.id).value, record.id)}
          ></input>
        );
      },
    },
    {
      title: () => <a style={{ color: "red" }}>装箱数量</a>,
      dataIndex: "packingQuantity",
      valueType: "text",
      align: "center",
      width: 150,
      hideInSearch: true,
      render: (text, record, index, key) => {
        return (
          <input
            id={"packingQuantity" + record.id}
            defaultValue={text}
            disabled={bagID[0] == record.id ? false : true}
            style={{
              border: "none",
              color: "red",
              textAlign: "center",
              width: "100px",
            }}
            onBlur={() => changePacking(document.getElementById("packingQuantity" + record.id).value, record.id)}
          ></input>
        );
      },
    },
    {
      title: "生产日期",
      dataIndex: "date",
      valueType: "text",
      align: "center",
      width: 180,
      hideInSearch: true,
    },
    {
      title: () => <a style={{ color: "red" }}>3C</a>,
      dataIndex: "threeC",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
      render: (text, record, index, key) => {
        return (
          <input
            id={"threeC" + record.id}
            disabled={bagID[0] == record.id ? false : true}
            defaultValue={text}
            style={{
              border: "none",
              color: "red",
              textAlign: "center",
              width: "100px",
            }}
            onBlur={() => changethreeC(document.getElementById("threeC" + record.id).value, record.id)}
          ></input>
        );
      },
    },

    // {
    //   title: '操作',
    //   dataIndex: 'option',
    //   valueType: 'option',
    //   align: 'center',
    //   fixed:'right',
    //   width:120,
    //   render: (_, record) => (
    //     <>
    //       <a onClick={() => {
    //         setIsUpdate(true)
    //         setUpdateDate({ ...record });
    //         handleUpdateModalVisible(true);
    //       }}
    //       >编辑</a>
    //     </>
    //   ),
    // },
  ];


  //获取物料型号
  const changeMater = async (value, id) => {
    selectedRowsState.map((item, key) => {
      if (item.id == id) {
        item.materialType = value
        setMaterialType1(value)
      }
    })
  };

  //获取装盒数量
  const changeCartonsNumber = async (value, id) => {
    selectedRowsState.map((item, key) => {
      if (item.id == id) {
        item.cartonsNumber = value
        setCartonsNumber1(cartonsNumber)
      }
    })
  };

  //获取箱重量
  const changeBoxWeight = async (value, id) => {
    selectedRowsState.map((item, key) => {
      if (item.id == id) {
        item.boxWeight = value
        setBoxWeight1(value)
      }
    })
  };



  //获取装箱数量
  const changePacking = async (value, id) => {
    selectedRowsState.map((item, key) => {
      if (item.id == id) {
        item.packingQuantity = value
        setPackingQuantity1(value)
      }
    })
  };

  //获取3C
  const changethreeC = async (value, id) => {
    selectedRowsState.map((item, key) => {
      if (item.id == id) {
        item.threeC = value
        setThreeC1(value)
      }
    })
  };


  //多选袋条码
  const rowSelection1 = {
    onChange: (selectedRowKeys, selectedRows) => {
      setBagID(selectedRowKeys)
    }
  };




  //点击确认生成条码
  // const confirm = async () => {
  //   let inputVal = document.getElementById("inputVal").value;
  //   let picker  = document.getElementById("PickerVal").value;
  //   if (selectedRowsState?.length > 0  && Number(inputVal) > 0) {
  //     handleModalVisible(true);
  //     let data2 = await generateBarCode({
  //       materialFactoryList: selectedRowsState,
  //       printDate: picker,
  //       printQuantity: inputVal,
  //       userId: user.currentUser.id
  //     });
  //     if (data2.status == '200') {
  //       setMaterialTypeList(data2.data)
  //     }
  //   } else {
  //     message.info("请至少选择一条数据！并且打印日期和打印张数(大于0)不能为空！");
  //   }
  // }


  const query = async (params, sorter, filter) => {

    const TableList = postListInit({
      data: {
        bagged: true,
        materialId: params.materialId,
        materialType: params.materialType,
        materialNo:params.materialNo,
        typeDescription:params.typeDescription
      },
      pageNum: params.current,
      pageSize: params.pageSize,
      userId: user.currentUser.id
    });
    return TableList.then(function (value) {
      setBagString(value.data.list.length === 0 ? '' : value.data.list[0].bagTempCode)
      return {
        data: value.data.list,
        current: value.pageNum,
        pageSize: value.pageSize,
        success: true,
        total: value.data.total,
      };
    });
  };

  /**
   * 更新节点
   * @param handleUpdate 编辑保存
   */

  /**
   *  删除节点
   * @param selectedRows
   */

  // const handleRemove = async (selectedRows) => {
  //   const hide = message.loading("正在删除");
  //   if (!selectedRows) return true;

  //   try {
  //     let data = await deleted({
  //       id: selectedRows.map((row) => row.id),
  //     });

  //     if (data.status == "200") {
  //       hide();
  //       message.success(data.message);
  //       return true;
  //     } else {
  //       message.error(data.message);
  //       return false;
  //     }
  //   } catch (error) {
  //     hide();
  //     message.error("删除失败，请重试");
  //     return false;
  //   }
  // };


  //点击打印袋条码  只---开始
  const pintBagCode = async () => {
    LodopFuncs.getLodop()
    let inputVal = document.getElementById("inputVal").value;
    let picker = document.getElementById("PickerVal").value;
    if (bagID.length > 0 && Number(inputVal) > 0) {
      let content = noStart
      if (content === "") {
        eval(bagString)
        content = bagString
      }

      let data = await printBarCode({
        barCodeIdList: bagID,
        printDate: picker,
        printQuantity: inputVal,
        barCodeType: 1,
        state: 1,
        userId: user.currentUser.id
      });
      if (data.status == 200) {
        
        var dataString = data.data.barCodeList
        var bagList = content.replaceAll('1234567890', dataString[0]).
          replace('2022-01-01', picker).
          replace('物料型号', data.data.material.materialType !== materialType1 ? materialType1 : data.data.material.materialType).
          replace('物料描述', data.data.material.typeDescription).
          replace('装盒', data.data.material.boxesNumber).
          replace('装盒数', data.data.material.boxesNumber).
          replace('检验02', data.data.material.examination).
          replace('GB/T', data.data.material.standard).
          replace('浙江省', data.data.material.address).
          replace('德力西', data.data.material.productionPlant).
          replace('8888888888', data.data.material.caseIEAN13).
          replace('中文名称', data.data.material.materialName)
        eval(bagList)
        LODOP.PRINT();
        for (var i = 0; i < 2; i++) {
          if (i > 0) {
            LODOP.SET_PRINT_PAGESIZE(1, 3, "A3");
            bagList = bagList.replaceAll(dataString[i - 1], dataString[i]);
            console.log('bagList123', bagList)
            eval(bagList)
            LODOP.PRINT();
            LODOP.PRINT_INIT("");
          }
        }
        query()
      }
    } else {
      message.warning('请勾选一条数据!')
    }
  };


  //只条码模板
  const bagCode = () => {
    LodopFuncs.getLodop()
    zhiCreateOneFormPage()
    LODOP.On_Return = (TaskID, Value) => {
      setNoStart(Value)
    }
    LODOP.PRINT_DESIGN();
  };


  const zhiCreateOneFormPage = () => {
    eval(bagString)
  };

  // 只---结束



  return (
    <PageContainer>
      <ProTable
        headerTitle="查询表格"
        actionRef={actionRef}
        className="flex-proTable"
        scroll={{ y: 500 }}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Form.Item
            style={{ marginBottom: "0px", marginRight: "40px" }}
            label="打印日期:"
            name="data"
          >
            <DatePicker defaultValue={moment(new Date())} id="PickerVal" allowClear={false} />
          </Form.Item>,

          <Form.Item
            style={{ marginBottom: "0px" }}
            label="订单数量:"
            name="number"
          >
            <Input id="inputVal" defaultValue={10} />
          </Form.Item>,

          <Button type="primary" style={{ marginLeft: '10px' }} onClick={bagCode}>袋码模板</Button>,
          <Button type="primary" style={{ marginLeft: '10px' }} onClick={pintBagCode}><SnippetsOutlined />点击打印</Button>

        ]}
        request={(params, sorter, filter) => query(params, sorter, filter)}
        columns={getColumns()}
        rowSelection={{
          type: 'radio',
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
          ...rowSelection1,
        }}
      />
      {/* {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{" "}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{" "}
              项&nbsp;&nbsp;
              <span></span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
        </FooterToolbar>
      )} */}



      {UpdateDate && Object.keys(UpdateDate).length ? (
        <UpdateForm
          onCancel={() => {
            setUpdateDate({}); //编辑modal一旦关闭就必须setUpdateDate
            setIsUpdate(false);
            handleUpdateModalVisible(false);
          }}
          modalVisible={updateModalVisible}
          title="编辑"
        >
          <ProTable
            onSubmit={async (value) => {
              const success = await handleUpdate(value);

              if (success) {
                handleUpdateModalVisible(false);
                setUpdateDate({});
                setIsUpdate(false);
                if (actionRef.current) {
                  actionRef.current.reload();
                }
              }
            }}
            rowKey="id"
            type="form"
            columns={getColumns()}
          />
        </UpdateForm>
      ) : null}
    </PageContainer>
  );
};

export default connect(({ printBag, user }) => ({ printBag, user }))(printBagComponent);
