import { PlusOutlined } from '@ant-design/icons';
import {Divider, Button,  message } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { Link, connect } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';

import {
  getDropDownInit,
  postListInit,
  deleted,
  getAddDropDownInit,
  addPost,
  updatePut,
} from '@/services/authorityManagement/roleInfo';



const RoleInfoComponent = ({
  roleInfo,
  dispatch
}) => {
  const TableModelsData = roleInfo
  const {
    //TableList,
    companyList } = TableModelsData
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
      title: 'id',
      dataIndex: 'id',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      initialValue: IsUpdate ? UpdateDate.id : '',
    },
    {
      title: '角色',
      dataIndex: 'name',
      // valueEnum: customerList.length == 0 ? {} : customerList,
      initialValue: IsUpdate ? UpdateDate.name : '',
    },
    {
      title: '公司',
      dataIndex: 'companyName',
      // valueEnum: {
      //   "1": {
      //     "text": "上海亿升海运仓储有限公司"
      //   },
      //   "2": {
      //     "text": "上海海运仓储有限公司"
      //   }
      // },
      valueEnum: companyList.length == 0 ? {} : companyList,
      initialValue: IsUpdate ? UpdateDate.companyName : '',
    },
    // {
    //   title: '角色对应的菜单',
    //   dataIndex: 'menu',
    //   valueType: 'text',
    //   // hideInSearch: true,
    //   hideInTable: true,
    //   // initialValue: IsUpdate ? UpdateDate.menu : '',
    // },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a onClick={() => {
            // const data = yield call(getAddDropDownInit)
            setIsUpdate(true)
            setUpdateDate({ ...record });
            handleUpdateModalVisible(true);
          }}
          >编辑</a>
          <Divider type="vertical" />
           <a onClick={() => {
          }}
          >详情</a>
        </>
      ),
    },
  ];

  const query = async (params, sorter, filter) => {
    const TableList = postListInit({
      "pageNum": params.current,
      "pageSize": params.pageSize,
      "data": {
        name: params.name,
        companyId: params.companyName
      }
    })
    return TableList.then(function (value) {
      return {
        data: value.data.list,
        current: value.data.pageNum,
        pageSize: value.data.pageSize,
        success: true,
        total: value.data.total
      }
    });

    // console.log('query', params, sorter, filter)

    // await dispatch({
    //   type: 'scustomerInfo/query',
    //   payload: {
    //     "pageNum": params.current,
    //     "pageSize": params.pageSize,
    //     "data": {
    //       code: params.code,
    //       cname: params.cname,
    //       fullname: params.fullname,
    //       type: params.type,
    //       commodity: params.commodity,
    //     }
    //   }
    // });

    // return TableList.then(function (value) {
    //   return {
    //     data: value.data.list,
    //     current: value.data.pageNum,
    //     pageSize: value.data.pageSize,
    //     success: true,
    //     total: value.data.total
    //   }
    // });

  }
  /**
   * 添加节点
   * @param fields
   */

  const handleAdd = async (fields) => {
    const hide = message.loading('正在添加');
    try {
      let data = await addPost({ data: fields });
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
      let data = await updatePut({ data: { id: UpdateDate.id, ...fields } });
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
        data: selectedRows.map((row) => row.id),
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

  console.log('TableList-component', roleInfo, UpdateDate)
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
          rowKey="key"
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
          // tableName={TableName}
          data={TableModelsData}
          dispatch={dispatch}
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
            rowKey="key"
            type="form"
            columns={getColumns()}

          />
        </UpdateForm>
      ) : null}

    </PageContainer>
  );
};

export default connect(({ roleInfo }) => ({ roleInfo }))(RoleInfoComponent);




