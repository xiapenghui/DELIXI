import { PlusOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { Link, connect } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import ExportJsonExcel from 'js-export-excel';
import {
  getDropDownInit,
  postListInit,
  deleted,
  getAddDropDownInit,
  addPost,
  updatePut,
} from '@/services/information/department';

const departmentComponent = ({
  department,
  dispatch
}) => {
  const {
    TableList,
    typeList,
    riskList,
    isNoList, } = department
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
      title: '物料编号',
      dataIndex: 'departmentno',
      valueType: 'text',
      align: 'center',
      width: 120,
      initialValue: IsUpdate ? UpdateDate.departmentno : '',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '部门编号不能为空!',
          },
        ],
      },
    },

    {
      title: '物料名称',
      dataIndex: 'departmentname',
      valueType: 'text',
      align: 'center',
      width: 120,
      initialValue: IsUpdate ? UpdateDate.departmentname : '',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '部门名称不能为空!',
          },
        ],
      },
    },

    {
      title: '物料型号',
      dataIndex: 'departmentshortname',
      valueType: 'text',
      align: 'center',
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.departmentshortname : '',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '部门简称不能为空!',
          },
        ],
      },
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
      title: '型号描述',
      dataIndex: 'remark',
      valueType: 'textarea',
      align: 'center',
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remark : '',
    },

    {
      title: '盒标签物料',
      dataIndex: 'remark',
      valueType: 'textarea',
      align: 'center',
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remark : '',
    },


    {
      title: '基本数量',
      dataIndex: 'remark',
      valueType: 'textarea',
      align: 'center',
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remark : '',
    },

    {
      title: '单位',
      dataIndex: 'remark',
      valueType: 'textarea',
      align: 'center',
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remark : '',
    },

    {
      title: '重量',
      dataIndex: 'remark',
      valueType: 'textarea',
      align: 'center',
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remark : '',
    },

    {
      title: '重量单位',
      dataIndex: 'remark',
      valueType: 'textarea',
      align: 'center',
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remark : '',
    },

    {
      title: '箱盒数量',
      dataIndex: 'remark',
      valueType: 'textarea',
      align: 'center',
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remark : '',
    },

    {
      title: '箱EAN13码',
      dataIndex: 'remark',
      valueType: 'textarea',
      align: 'center',
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remark : '',
    },


    {
      title: '盒EAN13码',
      dataIndex: 'remark',
      valueType: 'textarea',
      align: 'center',
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remark : '',
    },

    {
      title: '箱ITF14码',
      dataIndex: 'remark',
      valueType: 'textarea',
      align: 'center',
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remark : '',
    },

    {
      title: '盒ITF14码',
      dataIndex: 'remark',
      valueType: 'textarea',
      align: 'center',
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remark : '',
    },

    {
      title: '所属工厂',
      dataIndex: 'remark',
      valueType: 'textarea',
      align: 'center',
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remark : '',
    },

    {
      title: '工厂代码',
      dataIndex: 'remark',
      valueType: 'textarea',
      align: 'center',
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remark : '',
    },


    {
      title: '备注',
      dataIndex: 'remark',
      valueType: 'textarea',
      align: 'center',
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remark : '',
    },

    {
      title: '执行标准',
      dataIndex: 'remark',
      valueType: 'textarea',
      align: 'center',
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remark : '',
    },

    {
      title: '检验员',
      dataIndex: 'remark',
      valueType: 'textarea',
      align: 'center',
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remark : '',
    },

    {
      title: '系统编号',
      dataIndex: 'remark',
      valueType: 'textarea',
      align: 'center',
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remark : '',
    },

    {
      title: '打印标识',
      dataIndex: 'remark',
      valueType: 'textarea',
      align: 'center',
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remark : '',
    },


    {
      title: '变更标记',
      dataIndex: 'remark',
      valueType: 'textarea',
      align: 'center',
      width: 120,
      hideInSearch: true,
      initialValue: IsUpdate ? UpdateDate.remark : '',
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
      departmentno: params.departmentno == null ? '' : params.departmentno,
      departmentname: params.departmentno == null ? '' : params.departmentname,
      departmentshortname: params.departmentshortname == null ? '' : params.departmentshortname,
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
      let data = await addPost(fields);
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
      let data = await updatePut({ departmentid: UpdateDate.departmentid, ...fields });
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
        departmentids: selectedRows.map((row) => row.departmentid),
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
          'departmentno': selectedRows[i].departmentno,
          'departmentname': selectedRows[i].departmentname,
          'departmentshortname': selectedRows[i].departmentshortname,
          'remark': selectedRows[i].remark,

        }
        dataTable.push(obj);
      }
    }
    option.fileName = '部门信息'
    option.datas = [
      {
        sheetData: dataTable,
        sheetName: 'sheet',
        sheetFilter: ['departmentno', 'departmentname', 'departmentshortname', 'remark'],
        sheetHeader: ['部门编号', '部门名称', '部门简称', '备注'],
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
        rowKey="departmentid"
        search={{
          labelWidth: 120,

        }}
        // toolBarRender={() => [
        //   <Button type="primary" onClick={() => handleModalVisible(true)}>
        //     <PlusOutlined /> 新建
        //   </Button>,

        // ]}
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
          rowKey="departmentid"
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
            rowKey="departmentid"
            type="form"
            columns={getColumns()}

          />
        </UpdateForm>
      ) : null}

    </PageContainer>
  );
};

export default connect(({ department }) => ({ department }))(departmentComponent);




