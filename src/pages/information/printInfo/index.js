import { PlusOutlined, SnippetsOutlined } from "@ant-design/icons";
import { Button, message, DatePicker, Form, Input, Popconfirm, Radio } from "antd";
import React, { useState, useRef, useEffect } from "react";
import { Link, connect } from "umi";
import { PageContainer, FooterToolbar } from "@ant-design/pro-layout";
import ProTable from "@ant-design/pro-table";
import moment from "moment";
import ProDescriptions from "@ant-design/pro-descriptions";
import PrintForm from "./components/PrintForm";
import UpdateForm from "./components/UpdateForm";
import "../../../../src/assets/commonStyle.css";
import ExportJsonExcel from "js-export-excel";
import {
  getDropDownInit,
  postListInit,
  deleted,
  getAddDropDownInit,
  addPost,
  updatePut,
  generateBarCode
} from "@/services/information/printInfo";

const printInfoComponent = ({ printInfo, dispatch, user }) => {
  const { TableList, typeList, riskList, isNoList } = printInfo;
  const { currentUser } = user;
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [selectedRowsState, setSelectedRows] = useState([]);
  const actionRef = useRef();
  const [printNo, setPrintNo] = useState(0);
  const [picker, setPicker] = useState();
  const [materialTypeRow, setMaterialTypeRow] = useState('')
  const [materialTypeList, setMaterialTypeList] = useState([])
  const [isDisabled, setIsDisabled] = useState(true)



  /**
   * 编辑初始化
   */
  const [IsUpdate, setIsUpdate] = useState(false);
  const [UpdateDate, setUpdateDate] = useState({});

  const getColumns = () => [
    {
      title: "物料编号",
      dataIndex: "materialNo",
      valueType: "text",
      align: "center",
      width: 120,
      fixed: "left",
    },

    {
      title: "供应商号",
      dataIndex: "supplierName",
      valueType: "text",
      align: "center",
      width: 120,
    },

    {
      title: "中文名称",
      dataIndex: "chineseName",
      valueType: "text",
      align: "center",
      ellipsis: true,
      width: 150,
      hideInSearch: true,
    },

    {
      title: "英文名称",
      dataIndex: "englishName",
      valueType: "text",
      align: "center",
      width: 150,
      ellipsis: true,
      hideInSearch: true,
    },


    {
      title: () => <a style={{ color: "red" }}>物料型号</a>,
      dataIndex: "materialType",
      valueType: "text",
      align: "center",
      width: 200,
      hideInSearch: true,
      render: (text, record, index, key) => {
        return (
          <input
            id={"materialType" + record.id}
            style={{ color: "red" }}
            defaultValue={text}
            style={{ border: "none", color: "red", textAlign: "center" }}
            disabled={isDisabled}
            onBlur={() => changeMater(document.getElementById("materialType" + record.id).value, record.id)}
          ></input>
        );
      },
    },

    {
      title: "物料型号描述",
      dataIndex: "boxLabelDescription",
      valueType: "text",
      align: "center",
      width: 150,
      ellipsis: true,
      hideInSearch: true,
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
            style={{ color: "red" }}
            defaultValue={text}
            style={{
              border: "none",
              color: "red",
              textAlign: "center",
              width: "100px",
            }}
            // onBlur={changeCartonsNumber}
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
            style={{ color: "red" }}
            defaultValue={text}
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
            style={{ color: "red" }}
            defaultValue={text}
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
            style={{ color: "red" }}
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




  //获取打印日期的值
  const changePicker = async (date, dateString) => {
    setPicker(dateString);
  };

  //获取张数
  const changeIpt = async (e) => {
    setPrintNo(e.target.value);
  };

  //获取物料型号
  const changeMater = async (value, id) => {
    selectedRowsState.map((item, key) => {
      if (item.id == id) {
        item.materialType = value
      }
    })
  };

  //获取装盒数量
  const changeCartonsNumber = async (value, id) => {
    selectedRowsState.map((item, key) => {
      if (item.id == id) {
        item.changeCartonsNumber = value
      }
    })
  };

  //获取箱重量
  const changeBoxWeight = async (value, id) => {
    selectedRowsState.map((item, key) => {
      if (item.id == id) {
        item.boxWeight = value
      }
    })
  };

  //获取装箱数量
  const changePacking = async (value, id) => {
    selectedRowsState.map((item, key) => {
      if (item.id == id) {
        item.packingQuantity = value
      }
    })
  };

  //获取3C
  const changethreeC = async (value, id) => {
    selectedRowsState.map((item, key) => {
      if (item.id == id) {
        item.threeC = value
      }
    })
  };

 

  // const  = {
  //   onChange: (selectedRowKeys, selectedRows) => {
  //     setIsDisabled(false)
  //   },
  // }

  //点击确认生成条码
  const confirm = async () => {
    if (selectedRowsState?.length > 0 && picker !== undefined && Number(printNo) > 0) {
      // setIsDisabled(false)
      handleModalVisible(true);

      let data2 = await generateBarCode({
        materialFactoryList: selectedRowsState,
        printDate: picker,
        printQuantity: printNo,
        userId: user.currentUser.id
      });
      if (data2.status == '200') {
        setMaterialTypeList(data2.data)
      }
    } else {
      message.info("请至少选择一条数据！并且打印日期和打印张数(大于0)不能为空！");
    }
  }


  const query = async (params, sorter, filter) => {

    const TableList = postListInit({
      data: {
        materialNo: params.materialNo,
        supplierName: params.supplierName,
      },
      pageNum: params.current,
      pageSize: params.pageSize,
      userId: user.currentUser.id
    });
    return TableList.then(function (value) {
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

  const handleUpdate = async (fields) => {
    const hide = message.loading("正在编辑");
    console.log("handleUpdate", fields);
    try {
      let data = await updatePut({ shiftid: UpdateDate.shiftid, ...fields });
      if (data.status == "200") {
        hide();
        message.success(data.message);
        return true;
      } else {
        message.error(data.message);
        return false;
      }
    } catch (error) {
      message.error("编辑失败请重试！");
      return false;
    }
  };
  /**
   *  删除节点
   * @param selectedRows
   */

  const handleRemove = async (selectedRows) => {
    const hide = message.loading("正在删除");
    if (!selectedRows) return true;

    try {
      let data = await deleted({
        id: selectedRows.map((row) => row.id),
      });

      if (data.status == "200") {
        hide();
        message.success(data.message);
        return true;
      } else {
        message.error(data.message);
        return false;
      }
    } catch (error) {
      hide();
      message.error("删除失败，请重试");
      return false;
    }
  };



  return (
    <PageContainer>
      <ProTable
        headerTitle="查询表格"
        actionRef={actionRef}
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
            <DatePicker onChange={changePicker} />
          </Form.Item>,

          <Form.Item
            style={{ marginBottom: "0px" }}
            label="打印张数:"
            name="number"
          >
            <Input style={{ width: "70%" }} onBlur={changeIpt} />
          </Form.Item>,

          // <Button type="primary" onClick={() => handleModalVisible(selectedRowsState?.length > 0 ? true :false)}>

          <Popconfirm placement="top" title="您确定要生成条码吗?" onConfirm={confirm} okText="确定" cancelText="取消">
            <Button type="primary">
              <SnippetsOutlined /> 生成条码
            </Button>
          </Popconfirm>

        ]}
        request={(params, sorter, filter) => query(params, sorter, filter)}
        columns={getColumns()}
        rowSelection={{
          type: 'radio',
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
          // ...rowSelection,
        }}
      />
      {selectedRowsState?.length > 0 && (
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
      )}

      <PrintForm
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
        printNo={printNo}
        picker={picker}
        materialTypeList={materialTypeList}
        title="打印条码"
      ></PrintForm>

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

export default connect(({ printInfo, user }) => ({ printInfo, user }))(printInfoComponent);
