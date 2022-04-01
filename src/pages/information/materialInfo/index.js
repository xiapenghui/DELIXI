import { PlusOutlined, ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Button, message, Select } from "antd";
import React, { useState, useRef, useEffect } from "react";
import { Link, connect } from "umi";
import { PageContainer, FooterToolbar } from "@ant-design/pro-layout";
import ProTable from "@ant-design/pro-table";
import ProDescriptions from "@ant-design/pro-descriptions";
import CreateForm from "./components/CreateForm";
import UpdateForm from "./components/UpdateForm";
import ExportJsonExcel from "js-export-excel";
import "../../../../src/assets/commonStyle.css";
import {
  getDropDownInit,
  postListInit,
  deleted,
  exportMaterial,
  getAddDropDownInit,
  addPost,
  updatePut,
} from "@/services/information/materialInfo";


const materialInfoComponent = ({ materialInfo, dispatch, user }) => {
  const { materialList } = materialInfo;
  const { } = user;
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const actionRef = useRef();
  const [selectedRowsState, setSelectedRows] = useState([]);
  /**
   * 编辑初始化
   */
  const [IsUpdate, setIsUpdate] = useState(false);
  const [UpdateDate, setUpdateDate] = useState({});

  const getColumns = () => [
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
      title: "供应商号",
      dataIndex: "supplierName",
      valueType: "text",
      align: "center",
      width: 120,
      // hideInSearch: true,
    },

    {
      title: "商品编码",
      dataIndex: "materialId",
      valueType: "text",
      align: "center",
      width: 150,
      hideInTable: true,
      // ellipsis:true,
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
      title: "商品编码",
      dataIndex: "materialType",
      valueType: "text",
      align: "center",
      width: 200,
      // hideInSearch: true,
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
      title: "装盒数量",
      dataIndex: "cartonsNumber",
      valueType: "text",
      align: "center",
      width: 150,
      hideInSearch: true,
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
      // hideInSearch: true,
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
      dataIndex: "caseIEAN13",
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
      title: "箱重量",
      dataIndex: "boxWeight",
      valueType: "text",
      align: "center",
      width: 150,
      hideInSearch: true,
    },
    {
      title: "装箱数量",
      dataIndex: "packingQuantity",
      valueType: "text",
      align: "center",
      width: 150,
      hideInSearch: true,
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
      title: "3C",
      dataIndex: "threeC",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
    },

    // {
    //   title: '操作',
    //   dataIndex: 'option',
    //   valueType: 'option',
    //   align: 'center',
    //   width: 120,
    //   fixed:'right',
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

  const query = async (params, sorter, filter) => {
    const TableList = postListInit({
      data: {
        materialNo:params.materialNo,
        materialId: params.materialId,
        materialType: params.materialType,
        boxIEAN13:params.boxIEAN13
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
   * 添加节点
   * @param fields
   */

  const handleAdd = async (fields) => {
    const hide = message.loading("正在添加");
    try {
      let data = await addPost(fields);
      if (data.status == "200") {
        hide();
        message.success(data.message);
        return true;
      } else {
        message.error(data.message);
        return false;
      }
    } catch (error) {
      message.error("添加失败请重试！");
      return false;
    }
  };
  /**
   * 更新节点
   * @param handleUpdate 编辑保存
   */

  const handleUpdate = async (fields) => {
    const hide = message.loading("正在编辑");
    console.log("handleUpdate", fields);
    try {
      let data = await updatePut({
        departmentid: UpdateDate.departmentid,
        ...fields,
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
        departmentids: selectedRows.map((row) => row.departmentid),
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



  //导出
  const handleExport = async () => {
    let data = await exportMaterial({
      data: {
        materialId: document.getElementById("materialId").value,
        materialType: document.getElementById("materialType").value
      },
      userId: user.currentUser.id
    });
    if (data.status === 200) {
      message.success(data.message);
      window.location.href = data.data
      return true;
    } else {
      message.error(data.message);
      return false;
    }
  };

 
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
          // <Button type="primary" onClick={() => handleModalVisible(true)}>
          //   <PlusOutlined /> 新建
          // </Button>,

          <Button type="primary" onClick={() => handleExport()}>
            <ArrowUpOutlined /> 导出
          </Button>,

        ]}
        request={(params, sorter, filter) => query(params, sorter, filter)}
        columns={getColumns()}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
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
      <CreateForm
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
        title="新建"
      >
        <ProTable
          onSubmit={async (value) => {
            const success = await handleAdd(value);

            if (success) {
              handleModalVisible(false);

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="id"
          type="form"
          columns={getColumns()}
        />
      </CreateForm>
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

export default connect(({ materialInfo, user }) => ({ materialInfo, user }))(
  materialInfoComponent
);
