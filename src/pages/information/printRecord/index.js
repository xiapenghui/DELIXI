import { PlusOutlined } from "@ant-design/icons";
import { Button, message, TimePicker, DatePicker, Input ,Tag } from "antd";
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
  postListInit
} from "@/services/information/printRecord";

const printRecordComponent = ({ printRecord, dispatch ,user}) => {
  const { TableList, typeList, riskList, isNoList } = printRecord;
  const { currentUser } = user;
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
      title: "打印时间从",
      dataIndex: "startDate",
      // valueType: 'dateTime',
      valueType: "date",
      align: "center",
      width: 120,
      hideInTable: true,
      // initialValue: new Date(),
      // initialValue: moment(UpdateDate.tsdateStart),
    },

    {
      title: "打印时间至",
      dataIndex: "endDate",
      // valueType: 'dateTime',
      valueType: "date",
      align: "center",
      width: 120,
      hideInTable: true,
      // initialValue: new Date(),
      // initialValue: moment(UpdateDate.tsdateEnd),
    },


    {
      title: "打印批次",
      dataIndex: "batchNumber",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
    },

    {
      title: "是否打印",
      dataIndex: "state",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
        render: (text, record) => {
        let color = text ==="未打印" ? "red" : "green";
          return (
            <Tag color={color}>
              {text}
            </Tag>
          );
      },
    },

    // {
    //   title: "上传时间",
    //   dataIndex: "shiftdec",
    //   valueType: "text",
    //   align: "center",
    //   width: 120,
    //   hideInSearch: true,
    //   initialValue: IsUpdate ? UpdateDate.shiftdec : "",
    // },
    {
      title: "只码",
      dataIndex: "onlyBarCode",
      valueType: "text",
      align: "center",
      width: 120,
    },

    {
      title: "盒码",
      dataIndex: "boxBarCode",
      valueType: "text",
      align: "center",
      width: 120,
    },

    {
      title: "箱码",
      dataIndex: "bigBoxBarCode",
      valueType: "text",
      align: "center",
      width: 120,
    },

    {
      title: "物料编号",
      dataIndex: "materialNo",
      valueType: "text",
      align: "center",
      width: 120,
    },

    {
      title: "物料型号",
      dataIndex: "materialType",
      valueType: "text",
      align: "center",
      width: 120,
    },

    {
      title: "型号描述",
      dataIndex: "materialDescription",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
    },

    {
      title: "打印时间",
      dataIndex: "printDateTime",
      valueType: "text",
      align: "center",
      width: 120,
      hideInSearch: true,
    },

    {
      title: "打印人员",
      dataIndex: "printer",
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
      data: {
        startDate: params.startDate,
        endDate: params.endDate,
        materialNo:params.materialNo,
        materialType:params.materialType,
        onlyBarCode:params.onlyBarCode,
        boxBarCode:params.boxBarCode,
        bigBoxBarCode:params.bigBoxBarCode
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

 
  /**
   * 更新节点
   * @param handleUpdate 编辑保存
   */

   
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
        scroll={{ y: 430 }}
        rowKey="id"
        search={{
          collapsed: false,
          collapseRender: false,
          labelWidth: 120,
        }}
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
       
    </PageContainer>
  );
};

export default connect(({ printRecord ,user}) => ({ printRecord ,user }))(
  printRecordComponent
);
