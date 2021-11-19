import React from 'react'
import { Row, Col, Button, Icon, Table, Pagination, Popconfirm ,Divider,message} from 'antd'
import { PlusOutlined ,DeleteOutlined} from '@ant-design/icons';
import { Link, connect } from 'umi';
import { ModalComponents } from './ModalComponents'
import './index.less'
const TableName = 'receivablesInfo'
let column = []
let DeleteIdArray = []

const TableComponents = ({
  expandedRowRenderKEY,
  OperationButton,
  expandedRowRenderNAME,
  tableName,
  tableModels,
  dispatch,
  columns,
  TableWidth,
  ModalWidth,
  data,
  pagination,
  addModalValue,
  editModalValue,
  detailsModalValue,
  handleAdd,
  tableLoading,
  // EditData,
  PaginationComponentsChanger,
  ModalShowChanger,
  handleResetFields,
  staffType
}) => {
  console.log('TableComponents-=',
  tableName,
  tableModels,
  OperationButton,
  columns,
  TableWidth,
  ModalWidth,
  data,
  pagination,)
  let { addModalVisible, editModalVisible, detailsModalVisible, deleteModalVisible,EditData } = tableModels
  const ActionColumn = [{
    title: '操作',
    key: (new Date()).valueOf(),
    fixed: 'right',
    width: 120,
    render: (text, record) => (
      <span>
        {
          staffType === 'staffType'
            ?
            <span>
              <Popconfirm title="确定重置用户密码吗?" onConfirm={() => handleModalShow('ResetPassword', record)}>
                <a >重置密码</a>
              </Popconfirm>
              <Divider type="vertical" />
            </span>
            :
            null
        }
        <a  
        onClick={() => handleModalShow('editModalVisible',record)}>编辑</a>
      </span>
    ),
  }]
  const columnFunc = (column, columns, ActionColumn) => {
    //父组件传来的表头
    column = []
    let TotalColumn = column.concat(columns, ActionColumn)
    return TotalColumn
  }
  const handleModalShow = (modalVisible, record = {}) => {
    ModalShowChanger(modalVisible, record)
  }
  const handleModalClose = (modalVisible) => {
    dispatch({
      type: `${tableName}/hideModal`,
      payload: modalVisible
    })
    //从这里要调用父组件来清空Form新增表单域
    handleResetFields('AddFormLayout')
  }

  const onShowSizeChange = (PageIndex, PageSize) => {
    PaginationComponentsChanger(PageIndex, PageSize)
  }


  // const deleteHandler = () => {
  //   console.log('deleteHandler', DeleteIdArray)
  //   dispatch({
  //     type: `${tableName}/delete`,
  //     payload: {
  //       List: DeleteIdArray
  //     }
  //   })
  //   DeleteIdArray = []
  // }

  const deleteHandler = () => {
    console.log('DeleteIdArray', DeleteIdArray);
    if(DeleteIdArray.length == 0){
      message.error("请勾选要审批的数据！");
      return 
    }
    dispatch({
      type: `${TableName}/deleteHandler`,
      payload: {
        data: DeleteIdArray
      }
    })
  }


  const yugHandler = () => {
    console.log('DeleteIdArray', DeleteIdArray);
    if(DeleteIdArray.length == 0){
      message.error("请勾选要预估的数据！");
      return 
    }
    dispatch({
      type: `${TableName}/yugHandler`,
      payload: {
        data: DeleteIdArray
      }
    })
  }

  const onPaginationChange = (PageIndex, PageSize) => {
    PaginationComponentsChanger(PageIndex, PageSize)
  }

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      DeleteIdArray = selectedRowKeys.map(index => {
        return parseInt(index)
      })
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows, DeleteIdArray);
    }
  }
  return (

    <div>
       <Col span={24} style={{ textAlign: 'left', marginBottom: '5px' }}>
          <Popconfirm title="确定审批吗?" onConfirm={() => deleteHandler()}>
            <Button style={{ marginLeft: '5px' }} type="primary" > 审批</Button>
          </Popconfirm>
          <Popconfirm title="确定预估吗?" onConfirm={() => yugHandler()}>
            <Button style={{ marginLeft: '5px' }} type="primary" > 预估</Button>
          </Popconfirm>
        </Col>

{/* {OperationButton} */}
      <Row>
        <Table

          bordered
          rowKey={record => record.id}
          rowSelection={rowSelection}
          columns={columnFunc(column, columns, ActionColumn)}
          // expandedRowRender={expandedRowRenderKEY && expandedRowRenderNAME !== null ? record => <p style={{ margin: 0 }}>{expandedRowRenderNAME}:{record[expandedRowRenderKEY]}</p> : record => <p style={{ margin: 0 }}>描述:{record.Name}</p>}
          dataSource={data}
          scroll={{ x: TableWidth!=null ? TableWidth: 'max-content' }}
          pagination={false}
          loading={tableLoading}
        />
      </Row>
      <Row >
        <Col span={24} style={{ textAlign: 'center', marginTop: '10px' }}>
          <Pagination
            showQuickJumper//是否可以快速跳转至某页
            showTotal
            current={pagination.PageIndex}
            onChange={onPaginationChange}//页码改变的回调，参数是改变后的页码及每页条数
            showSizeChanger={true}//是否可以改变 pageSize
            onShowSizeChange={onShowSizeChange}//pageSize 变化的回调
            defaultCurrent={1}//默认的当前页数
            defaultPageSize={10}//默认的每页条数
            pageSizeOptions={['10', '20', '30', '40']}
            total={pagination.total}//数据总数
            showTotal={(total, range) => `每页${pagination.PageSize}条,共${total}条`}
          />
        </Col>
      </Row>
      <ModalComponents
        ModalWidth={ModalWidth}
        addModalVisible={addModalVisible}
        editModalVisible={editModalVisible}
        detailsModalVisible={detailsModalVisible}
        deleteModalVisible={deleteModalVisible}
        handleModalClose={handleModalClose}
        addModalValue={addModalValue}
        editModalValue={editModalValue}
        detailsModalValue={detailsModalValue}
        handleAdd={handleAdd}
        EditData={EditData}
      />
    </div>
  )
}
export default connect(({ dispatch }) => ({ dispatch }))(TableComponents)


