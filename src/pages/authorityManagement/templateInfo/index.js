import { PlusOutlined, FileWordOutlined, ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Button, message, DatePicker, Form, Input, Select, notification } from "antd";
import React, { useState, useRef, useEffect } from "react";
import { Link, connect } from "umi";
import { PageContainer, FooterToolbar } from "@ant-design/pro-layout";
import ProTable from "@ant-design/pro-table";
import moment from "moment";
import CreateForm from "./components/CreateForm";
import UpdateForm from "./components/UpdateForm";
import CopyForm from "./components/CopyForm";
import ImportForm from "../../../components/ImportExcel/ImportForm";
import * as  LodopFuncs from "../../../utils/LodopFuncs.js";
// import "../../../../src/assets/commonStyle.css";
import ExportJsonExcel from "js-export-excel";
import {
  getDropDownInit,
  postListInit,
  deleted,
  getAddDropDownInit,
  exportTemp,
  getTempl,
  addPost,
  updatePut,
} from "@/services/authorityManagement/templateinfo";

const templateinfoComponent = ({ templateinfo, dispatch, user }) => {
  const { tempList } = templateinfo;
  const { currentUser } = user;

  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [copyModalVisible, handleCopyModalVisible] = useState(false);


  const [importModalVisible, handleImportModalVisible] = useState(false);
  const actionRef = useRef();
  const [selectedRowsState, setSelectedRows] = useState([]);
  /**
   * 编辑初始化
   */
  const [IsUpdate, setIsUpdate] = useState(false);
  const [UpdateDate, setUpdateDate] = useState({});
  const [stringCode, setStringCode] = useState("");
  const [stringVal, setStringVal] = useState("");
  const [stringAddVal, setStringAdddVal] = useState("");
  const [tempNoExp, setTempNoExp] = useState("");
  const [tempNameExp, setTempNameExp] = useState("");

  const getColumns = () => [
    {
      title: "模板编号",
      dataIndex: "tempNo",
      valueType: "text",
      align: "center",
      width: 120,
      initialValue: IsUpdate ? UpdateDate.tempNo : "",
      fixed: "left",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "模板编号不能为空!",
          },
        ],
      },
    },

    {
      title: "模板名称",
      dataIndex: "tempName",
      valueType: "text",
      align: "center",
      width: 150,
      initialValue: IsUpdate ? UpdateDate.tempName : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "模板名称不能为空!",
          },
        ],
      },
    },

    {
      title: "模板类型",
      dataIndex: "tempType",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
      valueEnum: tempList.length == 0 ? {} : [tempList],
      initialValue: IsUpdate ? UpdateDate.tempType : "",
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type === 'form' || type === 'table') {
          return <Select
            allowClear
            showSearch
            optionFilterProp='children'
          >
            {tempList.map(function (item, index) {
              return <Select.Option key={item.key} value={item.key}>
                {item.label}
              </Select.Option>
            })}
          </Select>
        }
        return defaultRender(_);
      },
      render: (text, record) => {
        return record.tempTypeName
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: "模板类型不能为空!",
          },
        ],
      },
    },


    {
      title: "设计模板",
      dataIndex: "NEWtempCode",
      align: "center",
      valueType: "textarea",
      width: 200,
      hideInSearch: true,
      hideInTable: true,
      initialValue: IsUpdate ? UpdateDate.tempCode : "",
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type === 'form') {
          if (IsUpdate === true) {
            setStringCode(_.initialValue)
            return <Button type="primary" onClick={tempEdit}>编辑模板</Button>
          } else {
            return <Button type="primary" onClick={tempAdd}>新增模板</Button>
          }
        }
        return defaultRender(_);
      },
    },

    {
      title: "模板代码",
      dataIndex: "tempCode",
      valueType: "textarea",
      align: "center",
      width: 200,
      ellipsis: true,
      hideInSearch: true,
      // hideInForm:true,
      initialValue: IsUpdate ? UpdateDate.tempCode : "",
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type === 'form') {
          if (IsUpdate == true) {
            if (stringVal !== '') {
              return <textarea value={stringVal} row={3} className='ant-input' disabled={true}></textarea>
            } else {
              return <textarea row={3} className='ant-input' disabled={true}></textarea>
            }
          } else {
            return <textarea value={stringAddVal} row={3} className='ant-input' disabled={true}></textarea>
          }
        }
        return defaultRender(_);
      },
    },



    {
      title: "尺寸",
      dataIndex: "tempSize",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.tempSize : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "尺寸不能为空!",
          },
        ],
      },
    },

    {
      title: "备注",
      dataIndex: "remarks",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remarks : "",
    },

    {
      title: "操作",
      dataIndex: "option",
      valueType: "option",
      align: "center",
      fixed: "right",
      width: 120,
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
          <a
            onClick={() => {
              setIsUpdate(true);
              setUpdateDate({ ...record });
              handleCopyModalVisible(true);
            }}
            style={{ marginLeft: "20px" }}
          >
            复制
          </a>
        </>
      ),
    },
  ];

  const query = async (params, sorter, filter) => {
    setTempNoExp(params.tempNo)
    setTempNameExp(params.tempName)

    const TableList = postListInit({
      data: {
        tempNo: params.tempNo,
        tempName: params.tempName,
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
      debugger
      let data = await addPost(
        // { data: fields }
        {
          data: {
            tempNo: fields.tempNo,
            tempName: fields.tempName,
            tempType: fields.tempType,
            tempCode: stringAddVal === "" ? document.getElementById("tempCode").value : stringAddVal,
            tempSize: fields.tempSize,
            remarks: fields.remarks
          }
        }
      );
      if (data.status == "200") {
        hide();
        message.success(data.message);
        setStringAdddVal('')
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
      let data = await updatePut(
        {
          data: {
            id: UpdateDate.id,
            tempNo: fields.tempNo,
            tempName: fields.tempName,
            tempType: fields.tempType,
            tempCode: stringVal === "" ? fields.tempCode : stringVal,
            tempSize: fields.tempSize,
            remarks: fields.remarks
            // ...fields
          }
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
  const downloadTemp = async (fields) => {

    let data = await getTempl(fields);
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
    let data = await exportTemp({
      data: {
        tempNo: tempNoExp,
        tempName: tempNameExp
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



  const tempAdd = async () => {
    LodopFuncs.getLodop()
    // eval(stringCode)
    LODOP.On_Return = (TaskID, Value) => {

      setStringAdddVal(Value)
      message.info("模板已同步输入框，如需上传，请点击提交！")
    }
    CreateOneFormPageAdd()
    LODOP.PRINT_DESIGN();
  }

  const CreateOneFormPageAdd = async () => {
    LODOP.PRINT_INITA(0, 0, "45mm", "60mm", "打印控件功能演示_Lodop功能");
    LODOP.SET_SHOW_MODE("HIDE_GROUND_LOCK", true);
  }


  const tempEdit = async () => {

    LodopFuncs.getLodop()
    console.log('stringCode', stringCode)
    console.log('stringVal', stringVal)
    eval(stringCode)
    LODOP.On_Return = (TaskID, Value) => {

      setStringVal(Value)
      message.info("模板已同步输入框，如需上传，请点击提交！")
    }
    LODOP.PRINT_DESIGN();
  }


  //盒条码模板



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
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
          <Button type="primary" onClick={() => downloadTemp()}>
            <FileWordOutlined /> 下载模板
          </Button>,
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


      {/* 复制 */}

      {UpdateDate && Object.keys(UpdateDate).length ? (
        <CopyForm
          onCancel={() => {
            setUpdateDate({}); //编辑modal一旦关闭就必须setUpdateDate
            setIsUpdate(false);
            handleCopyModalVisible(false);
          }}
          modalVisible={copyModalVisible}
          title="复制"
        >
          <ProTable
            onSubmit={async (value) => {
              const success = await handleAdd(value);

              if (success) {
                handleCopyModalVisible(false);
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
        </CopyForm>
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

export default connect(({ templateinfo, user }) => ({ templateinfo, user }))(
  templateinfoComponent
);
