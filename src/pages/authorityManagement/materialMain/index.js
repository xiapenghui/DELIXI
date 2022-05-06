import { PlusOutlined, FileWordOutlined, ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Button, message, TimePicker, InputNumber, Select, DatePicker, Tag } from "antd";
import React, { useState, useRef, useEffect } from "react";
import { Link, connect } from "umi";
import { PageContainer, FooterToolbar } from "@ant-design/pro-layout";
import ProTable from "@ant-design/pro-table";
import ProDescriptions from "@ant-design/pro-descriptions";
import CreateForm from "./components/CreateForm";
import UpdateForm from "./components/UpdateForm";
import ImportForm from "../../../components/ImportExcel/ImportForm";
import moment from "moment";
import globalConfig from '../../../../config/defaultSettings';
import ExportJsonExcel from "js-export-excel";
import {
  getDropDownInit,
  postListInit,
  deleted,
  getTempl,
  exportMaterialFactory,
  getAddDropDownInit,
  addPost,
  updatePut,
} from "@/services/authorityManagement/materialMain";

const materialMainComponent = ({ materialMain, dispatch, user }) => {
  const { currentUser } = user;

  const {
    factoryList,
    materialList,
    onlyTempList,
    boxTempList,
    bigBoxTempList,
    bagTempList
  } = materialMain;
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [importModalVisible, handleImportModalVisible] = useState(false);
  const actionRef = useRef();
  const [selectedRowsState, setSelectedRows] = useState([]);
  /**
   * 编辑初始化
   */
  const [IsUpdate, setIsUpdate] = useState(false);
  const [UpdateDate, setUpdateDate] = useState({});

  const [factoryIdExp, setFactoryIdExp] = useState("")
  const [materialIdExp, setMaterialIdExp] = useState("")
  const [materialNoExp, setmaterialNoExp] = useState("")
  


  const getColumns = () => [

    {
      title: "工厂编号",
      dataIndex: "factoryNo",
      valueType: "text",
      align: "center",
      width: 150,
      fixed: "left",
      hideInSearch: true,
      hideInForm: true,
    },

    {
      title: "供应商SAP代码",
      dataIndex: "factoryId",
      valueType: "text",
      align: "center",
      width: 200,
      hideInTable: true,
      valueEnum: factoryList.length == 0 ? {} : [factoryList],
      initialValue: IsUpdate ? UpdateDate.factoryId : "",
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {

        if (type === 'form' || type === 'table') {
          return <Select
            allowClear
            showSearch
            optionFilterProp='children'
          >
            {factoryList.map(function (item, index) {
              return <Select.Option key={item.key} value={item.key}>
                {item.label}
              </Select.Option>
            })}
          </Select>
        }
        return defaultRender(_);
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: "供应商SAP代码不能为空!",
          },
        ],
      },
    },


    {
      title: "工厂名称",
      dataIndex: "factoryName",
      valueType: "text",
      align: "center",
      width: 200,
      ellipsis: true,
      hideInSearch: true,
      hideInForm: true,
    },



    {
      title: "供应商SAP代码",
      dataIndex: "supplierSapCode",
      valueType: "text",
      align: "center",
      width: 200,
      ellipsis: true,
      hideInSearch: true,
      hideInForm: true,
    },



    {
      title: "物料代码",
      dataIndex: "materialNo",
      valueType: "text",
      align: "center",
      width: 200,
      // hideInSearch: true,
      hideInForm: true,
    },

    {
      title: "商品编码",
      dataIndex: "materialId",
      valueType: "text",
      align: "center",
      width: 200,
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
      formItemProps: {
        rules: [
          {
            required: true,
            message: "商品编码不能为空!",
          },
        ],
      },
    },


 
    {
      title: "中文名称",
      dataIndex: "materialName",
      valueType: "text",
      align: "center",
      width: 200,
      hideInSearch: true,
      hideInForm: true,
      ellipsis: true,
      initialValue: IsUpdate ? UpdateDate.materialName : "",
    },


    {
      title: "商品编码",
      dataIndex: "materialType",
      valueType: "text",
      align: "center",
      width: 200,
      // hideInSearch: true,
      hideInForm: true,
      initialValue: IsUpdate ? UpdateDate.materialType : "",
    },



    {
      title: "袋码模板",
      dataIndex: "bagTemp",
      valueType: "text",
      align: "center",
      width: 200,
      hideInSearch: true,
      hideInTable: true,
      valueEnum: bagTempList.length == 0 ? {} : [bagTempList],
      initialValue: IsUpdate ? UpdateDate.bagTemp : "",
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {

        if (type === 'form' || type === 'table') {
          return <Select
            allowClear
            showSearch
            optionFilterProp='children'
          >
            {bagTempList.map(function (item, index) {
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
      title: "袋码模板",
      dataIndex: "bagTempName",
      valueType: "text",
      align: "center",
      width: 200,
      ellipsis: true,
      hideInSearch: true,
      hideInForm: true,
    },




    {
      title: "只码模板",
      dataIndex: "onlyTemp",
      valueType: "text",
      align: "center",
      width: 200,
      hideInSearch: true,
      hideInTable: true,
      valueEnum: onlyTempList.length == 0 ? {} : [onlyTempList],
      initialValue: IsUpdate ? UpdateDate.onlyTemp : "",
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {

        if (type === 'form' || type === 'table') {
          return <Select
            allowClear
            showSearch
            optionFilterProp='children'
          >
            {onlyTempList.map(function (item, index) {
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
      title: "只码模板",
      dataIndex: "onlyTempName",
      valueType: "text",
      align: "center",
      width: 200,
      ellipsis: true,
      hideInSearch: true,
      hideInForm: true,
    },


    {
      title: "盒码模板",
      dataIndex: "boxTemp",
      valueType: "text",
      align: "center",
      width: 200,
      hideInSearch: true,
      hideInTable: true,
      ellipsis: true,
      valueEnum: boxTempList.length == 0 ? {} : [boxTempList],
      initialValue: IsUpdate ? UpdateDate.boxTemp : "",
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type === 'form' || type === 'table') {
          return <Select
            allowClear
            showSearch
            optionFilterProp='children'
          >
            {boxTempList.map(function (item, index) {
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
      title: "盒码模板",
      dataIndex: "boxTempName",
      valueType: "text",
      align: "center",
      width: 200,
      ellipsis: true,
      hideInSearch: true,
      hideInForm: true,
    },


    {
      title: "箱码模板",
      dataIndex: "bigBoxTemp",
      valueType: "text",
      align: "center",
      width: 200,
      hideInSearch: true,
      hideInTable: true,
      valueEnum: bigBoxTempList.length == 0 ? {} : [bigBoxTempList],
      initialValue: IsUpdate ? UpdateDate.bigBoxTemp : "",
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type === 'form' || type === 'table') {
          return <Select
            allowClear
            showSearch
            optionFilterProp='children'
          >
            {bigBoxTempList.map(function (item, index) {
              return <Select.Option key={item.key} value={item.key}>
                {item.label}
              </Select.Option>
            })}
          </Select>
        }
        return defaultRender(_);
      },
      // render: (text, record) => {
      //   return record.bigBoxTempName
      // },
      formItemProps: {
        rules: [
          {
            required: true,
            message: "箱码模板不能为空!",
          },
        ],
      },
    },

    {
      title: "箱码模板",
      dataIndex: "bigBoxTempName",
      valueType: "text",
      align: "center",
      width: 200,
      ellipsis: true,
      hideInSearch: true,
      hideInForm: true,
    },


    {
      title: "维护时间",
      dataIndex: "maintainTime",
      valueType: "date",
      align: "center",
      width: 150,
      hideInSearch: true,
      hideInForm: true
    },

    {
      title: "操作人",
      dataIndex: "operator",
      valueType: "text",
      align: "center",
      width: 150,
      hideInSearch: true,
      hideInForm: true
    },

    {
      title: "操作",
      dataIndex: "option",
      valueType: "option",
      align: "center",
      fixed: "right",
      width: 150,
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              setIsUpdate(true);
              setUpdateDate({ ...record });
              handleUpdateModalVisible(true);
            }}
          >
            编辑
          </a>
        </>
      ),
    },
  ];


  const query = async (params, sorter, filter) => {
    setFactoryIdExp(params.factoryId)
    setMaterialIdExp(params.materialId)
    setmaterialNoExp(params.materialNo)
    const TableList = postListInit({
      data: {
        isBind:0,
        factoryId: params.factoryId,
        materialId: params.materialId,
        materialNo:params.materialNo,
        materialType:params.materialType,
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
    let params = {
      data: {
        creatorId: user.currentUser.id,
        factoryId: fields.factoryId,
        materialId: fields.materialId,
        onlyTemp: fields.onlyTemp,
        boxTemp: fields.boxTemp,
        bagTemp: fields.bagTemp,
        bigBoxTemp: fields.bigBoxTemp,
      },
      userId: user.currentUser.id
    }
    try {
      let data = await addPost(params);
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
        data: {
          id: UpdateDate.id,
          creatorId: user.currentUser.id,
          factoryId: fields.factoryId,
          materialId: fields.materialId,
          onlyTemp: fields.onlyTemp,
          boxTemp: fields.boxTemp,
          bagTemp: fields.bagTemp,
          bigBoxTemp: fields.bigBoxTemp,
        },
        userId: user.currentUser.id
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
        data: selectedRows.map((row) => row.id),
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



  //下载模板
  const downloadTemp = async (params) => {
      let data = await getTempl(
        {
          data: {
            isBind: 0
          },
          userId: user.currentUser.id
        }
      );
    if (data.status === 200) {
      message.success(data.message);
      window.location.href = data.data
      return true;
    } else {
      message.error(data.message);
      return false;
    }
  };


  //导出
  const handleExport = async () => {
    let data = await exportMaterialFactory({
      data: {
        factoryId: factoryIdExp,
        materialId: materialIdExp,
        materialNo:materialNoExp,
        isBind:0
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
        scroll={{ y: 500 }}
        rowKey="id"
        search={{
          labelWidth: 120,
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse()
          ],
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
          // <Button type="primary" onClick={() => downloadTemp()}>
          //   <FileWordOutlined /> 下载模板
          // </Button>,
          <Button type="primary" onClick={() => handleImportModalVisible(true)}>
            <ArrowDownOutlined /> 导入
          </Button>,
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


      {/* 导入  */}
      <ImportForm
        onCancel={() => handleImportModalVisible(false)}
        modalVisible={importModalVisible}
        currentUser={currentUser}
        title="导入"
        query={query}
      >
      </ImportForm>

    </PageContainer>
  );
};

export default connect(({ materialMain, user }) => ({ materialMain, user }))(
  materialMainComponent
);


