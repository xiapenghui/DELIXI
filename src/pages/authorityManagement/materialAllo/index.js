import { PlusOutlined } from '@ant-design/icons';
import { Button, message, TimePicker, InputNumber, Select } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { Link, connect } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import moment from 'moment'
import ExportJsonExcel from 'js-export-excel';
import {
  getDropDownInit,
  postListInit,
  deleted,
  getAddDropDownInit,
  addPost,
  updatePut,
} from '@/services/authorityManagement/materialAllo';

const materialAlloComponent = ({
  materialAllo,
  dispatch
}) => {
  const {
    timeList } = materialAllo
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


    // {
    //   title: '维护时间',
    //   dataIndex: 'timeto',
    //   valueType: 'text',
    //   align: 'center',
    //   width: 120,
    //   // initialValue: IsUpdate ? UpdateDate.timeto : '',
    //   initialValue: IsUpdate ? moment(UpdateDate.timeto, 'HH:mm') : null,
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
    //         message: '时间至不能为空!',
    //       },
    //     ],
    //   },
    // },


    {
      title: '工厂编号',
      dataIndex: 'timeorder',
      valueType: 'digit',
      align: 'center',
      width: 120,
      // hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.timeorder : '',
      renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
        if (type == 'form') {
          return <InputNumber min={1} max={8} />
        }
        return defaultRender(_);
      },

      formItemProps: {
        rules: [
          {
            required: true,
            message: '顺序不能为空且数字为1-8之间!',
          },
        ],
      },
    },

    {
      title: '工厂名称',
      dataIndex: 'remark',
      valueType: 'textarea',
      align: 'center',
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remark : '',
    },
  
    
    {
      title: '物料编号',
      dataIndex: 'timeaxis',
      valueType: 'text',
      align: 'center',
      width: 120,
      initialValue: IsUpdate ? UpdateDate.timeaxis : '',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '时间段不能为空!',
          },
        ],
      },
    },

    {
      title: '物料名称',
      dataIndex: 'remark',
      valueType: 'textarea',
      align: 'center',
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remark : '',
    },
    {
      title: '物料英文描述',
      dataIndex: 'remark',
      valueType: 'textarea',
      align: 'center',
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remark : '',
    },
    {
      title: '物料型号',
      dataIndex: 'remark',
      valueType: 'textarea',
      align: 'center',
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remark : '',
    },
    {
      title: '物料型号描述',
      dataIndex: 'remark',
      valueType: 'textarea',
      align: 'center',
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remark : '',
    },
    {
      title: '维护时间',
      dataIndex: 'remark',
      valueType: 'textarea',
      align: 'center',
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remark : '',
    },
    
    {
      title: '操作人',
      dataIndex: 'remark',
      valueType: 'textarea',
      align: 'center',
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remark : '',
    },

    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      align: 'center',
      fixed:'right',
      width: 120,
      render: (_, record) => (
        <>
          <a onClick={() => {
            setIsUpdate(true)
            setUpdateDate({ ...record });
            handleUpdateModalVisible(true);
          }}
          >编辑</a>
        </>
      ),
    },
  ];

  const query = async (params, sorter, filter) => {

    const TableList = postListInit({
      shiftid: params.shiftid,
      timeaxis: params.timeaxis == null ? '' : params.timeaxis,
      timefrom: params.timefrom,
      timeto: params.timeto,
      PageIndex: params.current,
      PageSize: params.pageSize
    })
    return TableList.then(function (value) {

      return {
        // data: value.list,
        data: [],
        current: value.pageNum,
        pageSize: value.pageSize,
        success: true,
        total: value.total
      }
    });


  }
  /**
   * 添加节点
   * @param fields
   */

  const handleAdd = async (fields) => {
    const hide = message.loading('正在添加');
    try {
      let data = await addPost({
        shiftid: fields.shiftid,
        timeaxis: fields.timeaxis,
        timeorder: fields.timeorder,
        timefrom: fields.timefrom.substring(11, 20).substring(0, 5),
        timeto: fields.timeto.substring(11, 20).substring(0, 5),
        remark: fields.remark
      });
      if (data.status == '200') {
        hide();
        message.success(data.message);
        return true;
      } else {
        message.error(data.message);
        return false;
      }
    } catch (error) {
      message.error('添加失败请重试！');
      return false;
    }
  };
  /**
   * 更新节点
   * @param handleUpdate 编辑保存
   */


  const handleUpdate = async (fields) => {
    const hide = message.loading('正在编辑');
    console.log('handleUpdate', fields)
    try {
      let data = await updatePut({
        timeaxisid: UpdateDate.timeaxisid,
        shiftid: fields.shiftid,
        timeaxis: fields.timeaxis,
        timeorder: fields.timeorder,
        timefrom: fields.timefrom.substring(11, 20).substring(0, 5),
        timeto: fields.timeto.substring(11, 20).substring(0, 5),
        remark: fields.remark
      });
      if (data.status == '200') {
        hide();
        message.success(data.message);
        return true;
      } else {
        message.error(data.message);
        return false;
      }
    } catch (error) {
      message.error('编辑失败请重试！');
      return false;
    }
  };
  /**
   *  删除节点
   * @param selectedRows
   */

  const handleRemove = async (selectedRows) => {
    const hide = message.loading('正在删除');
    if (!selectedRows) return true;

    try {
      let data = await deleted({
        timeaxisids: selectedRows.map((row) => row.timeaxisid),
      });

      if (data.status == '200') {
        hide();
        message.success(data.message);
        return true;
      } else {
        message.error(data.message);
        return false;
      }

    } catch (error) {
      hide();
      message.error('删除失败，请重试');
      return false;
    }
  };



  // 导出
  const downloadExcel = async (selectedRows) => {
    var option = {};
    var dataTable = [];
    if (selectedRows.length > 0) {
      for (let i in selectedRows) {

        let obj = {
          'timefrom': selectedRows[i].timefrom,
          'timeto': selectedRows[i].timeto,
          'shiftname': selectedRows[i].shiftname,
          'timeaxis': selectedRows[i].timeaxis,
          'timeorder': selectedRows[i].timeorder,
          'remark': selectedRows[i].remark,

        }
        dataTable.push(obj);
      }
    }
    option.fileName = '时间信息'
    option.datas = [
      {
        sheetData: dataTable,
        sheetName: 'sheet',
        sheetFilter: ['timefrom', 'timeto', 'shiftname', 'timeaxis', 'timeorder', 'remark'],
        sheetHeader: ['时间从', '时间至', '班次', '时间段', '顺序', '备注'],
      }
    ];

    var toExcel = new ExportJsonExcel(option);
    toExcel.saveExcel();
  }




  return (
    <PageContainer>
      <ProTable
        headerTitle="查询表格"
        actionRef={actionRef}
        scroll={{ y: 500 }}
        rowKey="timeaxisid"
        search={{
          labelWidth: 120,

        }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
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
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项&nbsp;&nbsp;
              <span>

              </span>
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

          <Button
            onClick={async () => {
              await downloadExcel(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量导出
          </Button>

        </FooterToolbar>
      )}
      <CreateForm
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
        title='新建'
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
          rowKey="timeaxisid"
          type="form"
          columns={getColumns()}
        />
      </CreateForm>
      {UpdateDate && Object.keys(UpdateDate).length ? (
        <UpdateForm
          onCancel={() => {
            setUpdateDate({}); //编辑modal一旦关闭就必须setUpdateDate
            setIsUpdate(false)
            handleUpdateModalVisible(false)
          }
          }
          modalVisible={updateModalVisible}
          title='编辑'
        >
          <ProTable
            onSubmit={async (value) => {
              const success = await handleUpdate(value);

              if (success) {
                handleUpdateModalVisible(false);
                setUpdateDate({});
                setIsUpdate(false)
                if (actionRef.current) {
                  actionRef.current.reload();
                }
              }
            }}
            rowKey="timeaxisid"
            type="form"
            columns={getColumns()}

          />
        </UpdateForm>
      ) : null}

    </PageContainer>
  );
};

export default connect(({ materialAllo }) => ({ materialAllo }))(materialAlloComponent);
