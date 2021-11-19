import { PlusOutlined } from '@ant-design/icons';
import { Form, Input, Button, Row, Col, DatePicker, InputNumber, Radio, Select, message } from 'antd'
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
  updatePut,
  addPost,
  getBycustomer,
  getBybillid,
  getbyname
} from '@/services/receivavles/usequantityInfo';


const formItemLayout = globalConfig.table.formItemLayout

const TableName = 'usequantityInfo'

const Component = ({
  usequantityInfo,
  dispatch
}) => {

  const TableModelsData = usequantityInfo
  const { FromParams,
    TableData,
    pagination,
    tableLoading,
    selectDropDownData,
    addModalVisible,
    editModalVisible,
    detailsModalVisible,
    deleteModalVisible,
    EditData,
    DetailsData } = TableModelsData

  const [form] = Form.useForm();
  /**
    *
    * @param handleSearch 搜索
    */

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
          useno: values.useno, //单据号
          name: values.name,  //服务项目
          contractI: values.contractI == null || values.contractI == ''  ? null : values.contractI,  //合同号
          customer: values.customer,  //客户
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
      useno: form.getFieldValue("useno"),
      name: form.getFieldValue("name"),
      customer: form.getFieldValue("customer"),
      contractI:  form.getFieldValue("contractI") == null || form.getFieldValue("contractI") == "" ? null : form.getFieldValue("contractI"),
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
      title: '单据号',
      dataIndex: 'useno',

    },
    {
      title: '出票时间',
      dataIndex: 'date',
      width: 180

    },
    {
      title: '客户',
      dataIndex: 'customer',
    },
    {
      title: '服务项目',
      dataIndex: 'name',
    },
    {
      title: '单位',
      dataIndex: 'unit',
    },
    {
      title: '使用量',
      dataIndex: 'quantity',
    },
    {
      title: '合同号',
      dataIndex: 'contractI',
      width:130

    },
    {
      title: '合同到期时间',
      dataIndex: 'enDate',
      width: 180
    },
    {
      title: '罐号',
      dataIndex: 'tank',
    },

    {
      title: '备注',
      dataIndex: 'remarks',
    },
    {
      title: '状态',
      dataIndex: 'state',
      render: (text) => {
        if (text == 0) {
          return "待审核";
        } else if (text == 10) {
          return "已审核";
        }
      }
    },
    // {
    //   title: '操作',
    //   dataIndex: 'option',
    //    valueType: 'option',
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
    } else if (modalVisible === 'updateModalVisible') {
      await dispatch({
        type: `${TableName}/showModalAndAjax`,
        payload: {
          modalType: modalVisible,
          id: record.id
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
        >

          <Row gutter={40}>
            <Col span={8} key={1} style={{ display: 'block' }}>

              <Form.Item
                name="useno"
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
                    return <Select.Option key={index} value={item.value}>{item.value}</Select.Option>
                  }) : ""}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8} key={3} style={{ display: 'block' }}>
              <Form.Item
                name="name"
                label="服务项目"
                
                {...formItemLayout}
              >
                <Select
                  allowClear
                  showSearch
                >
                  {selectDropDownData.nameList != null ? selectDropDownData.nameList.map(function (item, index) {
                    return <Select.Option key={index} value={item.value}>{item.value}</Select.Option>
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
          addModalValue={addModalValue()}
          editModalValue={editModalValue()}
          detailsModalValue={detailsModalValue()}
          handleAdd={handleAdd}
          tableModels={TableModelsData}
          PaginationComponentsChanger={PaginationComponentsChanger}
          handleResetFields={handleResetFields}
          ModalShowChanger={ModalShowChanger}
        />

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
        />

      </div>
    </div>
  );
};

export default connect(({ usequantityInfo }) => ({ usequantityInfo }))(Component);





