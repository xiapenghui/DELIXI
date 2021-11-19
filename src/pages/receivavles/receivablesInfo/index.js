import { PlusOutlined } from '@ant-design/icons';
import { Form, Input, Button, Row, Col, DatePicker, InputNumber, Radio, Select, Divider, Popconfirm, message } from 'antd'
import React, { useState, useRef, useEffect } from 'react';
import { Link, connect } from 'umi';
import { SearchOutlined, ClearOutlined } from '@ant-design/icons';
import TableComponents from './components/TableComponents';
import globalConfig from '../../../../config/defaultSettings';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import moment from 'moment'
import {
  getDropDownInit,
  postListInit,
  deleted,
  getAddDropDownInit,
  addPost,
  updatePut,
} from '@/services/receivavles/receivablesInfo';


const formItemLayout = globalConfig.table.formItemLayout

const TableName = 'receivablesInfo'

let DeleteIdArray = []
const Component = ({
  receivablesInfo,
  dispatch,
}) => {

  const TableModelsData = receivablesInfo
  const {
    FromParams,
    TableData,
    pagination,
    tableLoading,
    addModalVisible,
    editModalVisible,
    detailsModalVisible,
    deleteModalVisible,
    EditData,
    DetailsData,
    selectDropDownData,
    lastdate,
    firstdate
  } = TableModelsData

  const [form] = Form.useForm();


  /**
   *
   * @param handleSearch 搜索
   */
  const handleSearch = (e) => {
    form
      .validateFields()
      .then((values) => {
        console.log("values", values);
        const Params = {
          name: values.name,
          customer: values.customer,
          no: values.no,
          cName: values.cName,
          contractI: values.contractI,
          commodity: values.commodity,
          sdate1: values.sdate1 == null || values.sdate1 == '' || values.sdate1 == undefined ? null : moment(values.sdate1).format(globalConfig.form.onlyDateFormat),
          sdate2: values.sdate2 == null || values.sdate2 == '' || values.sdate2 == undefined ? null : moment(values.sdate2).format(globalConfig.form.onlyDateFormat)

        }
        SearchTableList(Params, 1, pagination.PageSize)
      })
      .catch((info) => {
        console.log('handleSearch Failed:', info);
      });
  }
  const PaginationComponentsChanger = (PageIndex, PageSize) => {
    const Params = {
      name: form.getFieldValue("name"),
      customer: form.getFieldValue("customer"),
      no: form.getFieldValue("no"),
      cName: form.getFieldValue("cName"),
      contractI: form.getFieldValue("contractI"),
      commodity: form.getFieldValue("commodity"),
      sdate1: form.getFieldValue('sdate1') == undefined || form.getFieldValue('sdate1') == null ? null : moment(form.getFieldValue('sdate1')).format(globalConfig.form.onlyDateFormat),
      sdate2: form.getFieldValue('sdate2') == undefined || form.getFieldValue('sdate1') == null ? null : moment(form.getFieldValue('sdate2')).format(globalConfig.form.onlyDateFormat),

    }
    SearchTableList(Params, PageIndex, PageSize)
  }
  const SearchTableList = (payload, PageIndex, PageSize) => {
    console.log('SearchTableList', payload, PageIndex, PageSize)
    dispatch({
      type: `${TableName}/query`,
      payload: {
        data: payload,
        pageNum: PageIndex,
        pageSize: PageSize
      },
    })
  }


  const handleAdd = (modalType) => {

  }


  const TableColumns = [
    {
      title: '应收账款号',
      dataIndex: 'receivablesid',
      width: 130
    },
    {
      title: '合同号',
      dataIndex: 'contractI',
      width: 130
    },
    {
      title: '单据号',
      dataIndex: 'no',
      width: 130
    },

    {
      title: '客户',
      dataIndex: 'customer',
      width: 130
    },
    {
      title: "罐号",
      dataIndex: "tank",
      width: 130
    },
    {
      title: "货品",
      dataIndex: "commodity",
      width: 130
    },
    {
      title: '出账日期',
      dataIndex: 'occurdate',
      width: 180
    },
    {
      title: '服务项目',
      dataIndex: 'name',
      width: 130
    },
    {
      title: '单位',
      dataIndex: 'unit',
      width: 130
    },
    {
      title: "数量",
      dataIndex: "number",
      width: 130
    },
    {
      title: '单价',
      dataIndex: 'price',
      width: 150
    },
    {
      title: "总价",
      dataIndex: "total2",
      width: 150
    },
    {
      title: "应收",
      dataIndex: "amount",
      width: 150
    },

    {
      title: '收费类型',
      dataIndex: 'cName',
      width: 150
    },
    {
      title: '状态',
      dataIndex: 'state',
      width: 130,
      render: (text) => {
        if (text == 0) {
          return "待审核";
        } else if (text == 10) {
          return "已审核";
        }
      }
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      // DeleteIdArray = selectedRowKeys.map(index => {
      //   return parseInt(index)
      // })
      DeleteIdArray = selectedRowKeys.map(index => {
        return index;
      });
      console.log('============', DeleteIdArray);
    }
  }

  const deleteHandler = () => {
    console.log('DeleteIdArray', DeleteIdArray);
    if (DeleteIdArray.length == 0) {
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
    if (DeleteIdArray.length == 0) {
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

  const addModalValue = () => {
    return (
      <div>
        test
      </div>
    )
  }
  const editModalValue = () => {
    return (
      <div>
        test
      </div>
    )
  }
  const detailsModalValue = () => {
    return (
      <div>
        test
      </div>
    )
  }

  const handleResetFields = (type) => {

    form.resetFields();
  }

  const OperationButton = () => {
    return (
      <Row>
        <Col span={24} style={{ textAlign: 'left', marginBottom: '5px' }}>
          <Popconfirm title="确定审批吗?" onConfirm={() => deleteHandler()}>
            <Button style={{ marginLeft: '5px' }} type="primary" > 审批</Button>
          </Popconfirm>
          <Popconfirm title="确定预估吗?" onConfirm={() => yugHandler()}>
            <Button style={{ marginLeft: '5px' }} type="primary" > 预估</Button>
          </Popconfirm>
        </Col>
      </Row>
    )
  }

  const handleModalShow = (modalVisible, record = {}) => {
    ModalShowChanger(modalVisible, record)
  }
  const OperationColumn = [{
    title: '操作',
    key: (new Date()).valueOf(),
    fixed: 'right',
    width: 150,
    render: (text, record) => (
      <span>
        <a onClick={() => handleModalShow('editModalVisible', record)}>编辑</a>
        <Divider type="vertical" />
      </span>
    ),
  }]

  /**
 * modal 开关
 */
  const ModalShowChanger = async (modalVisible, record) => {
    // 业务改变为默认每次新增模态框打开 首先清空上次缓存数据
    if (modalVisible === 'addModalVisible') {
      // await resetFields(AddFormLayout)
      await dispatch({
        type: `${TableName}/showModalAndAjax`,
        payload: {
          modalType: modalVisible,
          record: record
        },
      })
    } else {
      await dispatch({
        type: `${TableName}/showModalAndAjax`,
        payload: {
          modalType: modalVisible,
          record: record
        },
      })
    }
  }


  const handleModalClose = (modalVisible) => {
    dispatch({
      type: `${TableName}/hideModal`,
      payload: modalVisible
    })
    //从这里要调用父组件来清空Form新增表单域
    // handleResetFields('AddFormLayout')
  }

  console.log('TableList-component', TableModelsData)
  return (
    <div style={{ background: 'white', padding: '20px', margin: '10px' }}>
      <div style={{ marginBottom: '20px', borderColor: 'red', borderWidth: '1px' }}>
        <Form
          className="ant-advanced-search-form"
          onFinish={handleSearch}
          form={form}
          name="form_in_modal"
          initialValues={{
            sdate2: moment(lastdate, globalConfig.form.onlyDateFormat),
            sdate1: moment(firstdate, globalConfig.form.onlyDateFormat),
          }}
        >

          <Row gutter={40}>
            <Col span={8} key={1} style={{ display: 'block' }}>
              <Form.Item
                name="no"
                label="单据号"

                {...formItemLayout}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={8} key={2} style={{ display: 'block' }}>
              <Form.Item
                name="contractI"
                label="合同号"

                {...formItemLayout}
              >
                <Select
                  allowClear
                  showSearch
                >
                  {selectDropDownData.contractiList != null ? selectDropDownData.contractiList.map(function (item, index) {
                    return <Select.Option key={index} value={item.key}>{item.value}</Select.Option>
                  }) : ""}
                </Select>
              </Form.Item>
            </Col>

            <Col span={8} key={3} style={{ display: 'block' }}>
              <Form.Item
                name="cName"
                label="收费项目"

                {...formItemLayout}
              >
                <Select
                  allowClear
                  showSearch
                >
                  {selectDropDownData.nameList != null ? selectDropDownData.nameList.map(function (item, index) {
                    return <Select.Option key={index} value={item.key}>{item.value}</Select.Option>
                  }) : ""}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8} key={4} style={{ display: 'block' }}>
              <Form.Item
                name="customer"
                label="客户"

                {...formItemLayout}
              >
                <Select
                  allowClear
                  showSearch
                >
                  {selectDropDownData.customerList != null ? selectDropDownData.customerList.map(function (item, index) {
                    return <Select.Option key={index} value={item.key}>{item.value}</Select.Option>
                  }) : ""}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8} key={5} style={{ display: 'block' }}>
              <Form.Item
                name="commodity"
                label="货品"

                {...formItemLayout}
              >
                <Select
                  allowClear
                  showSearch
                >
                  {selectDropDownData.commodityList != null ? selectDropDownData.commodityList.map(function (item, index) {
                    return <Select.Option key={index} value={item.key}>{item.value}</Select.Option>
                  }) : ""}
                </Select>
              </Form.Item>
            </Col>

            <Col span={8} key={5} style={{ display: 'block' }}>
              <Form.Item
                name="name"
                label="服务名称"

                {...formItemLayout}
              >
                <Select
                  allowClear
                  showSearch
                  getPopupContainer={triggerNode => triggerNode.parentElement}
                  optionFilterProp='children'
                >
                  {selectDropDownData.snameList != null ? selectDropDownData.snameList.map(function (item, index) {
                    return <Select.Option key={index} value={item.value}>{item.value}</Select.Option>
                  }) : ""}
                </Select>
              </Form.Item>
            </Col>




            <Col span={8} key={5} style={{ display: 'block' }}>

              <Form.Item
                name="sdate1"
                label="开始日期"
                {...formItemLayout}
              >
                <DatePicker
                  showTime style={{ width: '100%' }} format={globalConfig.form.onlyDateFormat} />
              </Form.Item>
            </Col>

            <Col span={8} key={6} style={{ display: 'block' }}>

              <Form.Item
                name="sdate2"
                label="结束日期"
                {...formItemLayout}
              >
                <DatePicker
                  showTime style={{ width: '100%' }} format={globalConfig.form.onlyDateFormat} />
              </Form.Item>
            </Col>

          </Row>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit"><SearchOutlined />查询</Button>
              <Button style={{ marginLeft: '7px' }} onClick={() => handleResetFields()}><ClearOutlined />清空</Button>
            </Col>
          </Row>
        </Form>
      </div>
      <div>

        <TableComponents
          expandedRowRenderNAME='test'
          expandedRowRenderKEY='SelectedStationGroup'
          tableName={TableName}
          data={TableData}
          tableLoading={tableLoading}
          pagination={pagination}
          columns={TableColumns}
          TableWidth={'100%'}
          ModalWidth={2700}
          OperationButton={OperationButton()}
          ActionColumn={OperationColumn}
          addModalValue={addModalValue()}
          editModalValue={editModalValue()}
          detailsModalValue={detailsModalValue()}
          handleAdd={handleAdd}
          tableModels={TableModelsData}
          PaginationComponentsChanger={PaginationComponentsChanger}
          handleResetFields={handleResetFields}
          ModalShowChanger={ModalShowChanger}
          rowSelection={rowSelection}
        />
        {/* 
        <CreateForm
          addModalVisible={addModalVisible}
          handleModalClose={handleModalClose}
          addModalValue={addModalValue}
          handleAdd={handleAdd}
          ModalWidth={1500}
          dispatch={dispatch}
          tableName={TableName}

         data={TableModelsData} 
        />
         <UpdateForm
          editModalVisible={editModalVisible}
          handleModalClose={handleModalClose}
          editModalValue={editModalValue}
          handleAdd={handleAdd}
          ModalWidth={1500}
          dispatch={dispatch}
          tableName={TableName}
         data={TableModelsData} 
        /> */}
        <UpdateForm
          editModalVisible={editModalVisible}
          handleModalClose={handleModalClose}
          editModalValue={editModalValue}
          handleAdd={handleAdd}
          ModalWidth={1500}
          dispatch={dispatch}
          tableName={TableName}
          data={TableModelsData}
        />
      </div>
    </div>
  );
};

export default connect(({ receivablesInfo }) => ({ receivablesInfo }))(Component);





