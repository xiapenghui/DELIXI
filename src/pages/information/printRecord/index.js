import { PlusOutlined } from "@ant-design/icons";
import { Button, message, TimePicker, DatePicker, Input } from "antd";
import React, { useState, useRef, useEffect } from "react";
import { Link, connect } from "umi";
import { PageContainer, FooterToolbar } from "@ant-design/pro-layout";
import ProTable from "@ant-design/pro-table";
import moment from "moment";
import ProDescriptions from "@ant-design/pro-descriptions";
import CreateForm from "./components/CreateForm";
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
  GetShiftNO,
} from "@/services/information/printRecord";

const printRecordComponent = ({ printRecord, dispatch }) => {
  const { TableList, typeList, riskList, isNoList } = printRecord;
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const actionRef = useRef();
  const [selectedRowsState, setSelectedRows] = useState([]);
  /**
   * 编辑初始化
   */
  const [IsUpdate, setIsUpdate] = useState(false);
  const [UpdateDate, setUpdateDate] = useState({});
  const [shiftNO, setShiftNO] = useState();
  const getColumns = () => [
    {
      title: "打印时间从",
      dataIndex: "tsdateStart",
      // valueType: 'dateTime',
      valueType: "date",
      align: "center",
      width: 120,
      hideInTable: true,
      initialValue: new Date(),
      initialValue: moment(UpdateDate.tsdateStart),
    },

    {
      title: "打印时间至",
      dataIndex: "tsdateEnd",
      // valueType: 'dateTime',
      valueType: "date",
      align: "center",
      width: 120,
      hideInTable: true,
      initialValue: new Date(),
      initialValue: moment(UpdateDate.tsdateEnd),
    },

    // {
    //   title: '打包时间',
    //   dataIndex: 'timefrom',
    //   // valueType: 'text',
    //   valueType: 'timeData',
    //   align: 'center',
    //   // initialValue: IsUpdate ? UpdateDate.timefrom : '',
    //   width:120,
    //   initialValue: IsUpdate ? moment(UpdateDate.timefrom, 'HH:mm') : null,
    //   renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
    //     if (type == 'form') {
    //       return <TimePicker format={'HH:mm'} />
    //     }
    //     return defaultRender(_);
    //   },

    //   formItemProps: {
    //     rules: [
    //       {
    //         required: true,
    //         message: '时间从不能为空!',
    //       },
    //     ],
    //   },
    // },

    {
      title: "打印批次",
      dataIndex: "shiftdec",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.shiftdec : "",
    },

    {
      title: "是否上传",
      dataIndex: "shiftdec",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.shiftdec : "",
    },

    {
      title: "上传时间",
      dataIndex: "shiftdec",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.shiftdec : "",
    },
    {
      title: "只码",
      dataIndex: "shiftdec",
      valueType: "text",
      align: "center",
      width: 120,

      initialValue: IsUpdate ? UpdateDate.shiftdec : "",
    },

    {
      title: "盒码",
      dataIndex: "shiftname",
      valueType: "text",
      align: "center",
      width: 120,
      initialValue: IsUpdate ? UpdateDate.shiftname : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "班别名称不能为空!",
          },
        ],
      },
    },

    {
      title: "箱码",
      dataIndex: "shiftdec",
      valueType: "text",
      align: "center",
      width: 120,

      initialValue: IsUpdate ? UpdateDate.shiftdec : "",
    },

    {
      title: "物料编号",
      dataIndex: "shiftdec",
      valueType: "text",
      align: "center",
      width: 120,
      initialValue: IsUpdate ? UpdateDate.shiftdec : "",
    },

    {
      title: "物料型号",
      dataIndex: "shiftdec",
      valueType: "text",
      align: "center",
      width: 120,
      initialValue: IsUpdate ? UpdateDate.shiftdec : "",
    },

    {
      title: "型号描述",
      dataIndex: "shiftname",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.shiftname : "",
      formItemProps: {
        rules: [
          {
            required: true,
            message: "班别名称不能为空!",
          },
        ],
      },
    },

    {
      title: "打印时间",
      dataIndex: "shiftdec",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.shiftdec : "",
    },

    {
      title: "	打印人员",
      dataIndex: "shiftdec",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.shiftdec : "",
    },

    // {
    //   title: '操作',
    //   dataIndex: 'option',
    //   valueType: 'option',
    //   align: 'center',
    //   width:120,
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
      shiftname: params.shiftname == null ? "" : params.shiftname,
      PageIndex: params.current,
      PageSize: params.pageSize,
    });
    return TableList.then(function (value) {
      return {
        // data: value.list,
        data: [],
        current: value.pageNum,
        pageSize: value.pageSize,
        success: true,
        total: value.total,
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
      let data = await updatePut({ shiftID: UpdateDate.shiftID, ...fields });
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
        shiftIDs: selectedRows.map((row) => row.shiftID),
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

  //新增班别编号
  const handleModalVisible1 = async () => {
    try {
      let data = await GetShiftNO();
      if (data.status == "200") {
        setShiftNO(data.list);
        handleModalVisible(true);
      }
    } catch (error) {
      message.error("编辑失败请重试！");
      return false;
    }
  };

  return (
    <PageContainer>
      <ProTable
        headerTitle="查询表格"
        actionRef={actionRef}
        scroll={{ y: 430 }}
        rowKey="shiftID"
        search={{
          collapsed:false,
          collapseRender:false,
          labelWidth: 120,
        }}
        toolBarRender={() => [
          // <Button type="primary" onClick={() => handleModalVisible1(true)}>
          //   <PlusOutlined /> 新建
          // </Button>,
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
          className="boxTbale"
          onSubmit={async (value) => {
            const success = await handleAdd(value);

            if (success) {
              handleModalVisible(false);

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="shiftID"
          type="form"
          columns={getColumns()}
        />
      </CreateForm>
      {UpdateDate && Object.keys(UpdateDate).length ? (
        <UpdateForm
          width={700}
          onCancel={() => {
            setUpdateDate({}); //编辑modal一旦关闭就必须setUpdateDate
            setIsUpdate(false);
            handleUpdateModalVisible(false);
          }}
          modalVisible={updateModalVisible}
          title="编辑"
        >
          <ProTable
            className="boxTbale"
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
            rowKey="shiftID"
            type="form"
            columns={getColumns()}
          />
        </UpdateForm>
      ) : null}
    </PageContainer>
  );
};

export default connect(({ printRecord }) => ({ printRecord }))(
  printRecordComponent
);
