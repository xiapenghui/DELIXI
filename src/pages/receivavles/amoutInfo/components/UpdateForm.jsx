import React, { useState, useEffect } from 'react'
import moment from 'moment';
import { Modal, Form, Input, Button, Row, Col, DatePicker, InputNumber, Radio, Select, message } from 'antd'

import {
  getBycustomer,
  getBybillid,
  getBycontract_i,
  getbyname
} from '@/services/receivavles/amoutInfo';
import globalConfig from '../../../../../config/defaultSettings';
const maskStyles = globalConfig.modal.maskStyles
const formItemLayout = globalConfig.table.formItemLayout

const UpdateForm = (props) => {
  const [form] = Form.useForm();
  const {
    editModalVisible,
    handleModalClose,
    handleAdd,
    ModalWidth,
    data,
    dispatch,
    tableName
    // customerList,
  } = props
//   const stateList = [
//     {
//       "key":0,
//       "label":"待审核"
//     },
//     {
//       "key":10,
//       "label":"已审核"
//     }
// ]
const [customerSelectOptions, setcustomerSelectOptions] = useState([]) //客户带出合同号和到期时间
const [contractISelectOptions, setContractISelectOptions] = useState([]) //合同号带出服务项目
const [serviceNameOptions, setServiceNameOptions] = useState([])
const [unit_disabled, set_unit_disabled] = useState(false) //单位 是否禁用

//根据合同号带出到期时间
const getBybillid_Fun = async (value,tatal, type) => {
  form.setFieldsValue({
    billid:value
  })
  console.log('getBybillid_Fun', value, tatal,type)
  if (type == '合同号') {
    let data = await getBybillid(tatal.value);
    console.log('getBybillid_Fun1111', data)
    if (data.status == '200') {
      form.setFieldsValue({
        enDate: moment(tatal.children[2], 'YYYY-MM-DD'),
      })
      //获取值
      const serviceOptions = data.data.NameList.map(function (item, index) {                  
        return <Select.Option key={index} value={item.key}>{item.value}</Select.Option>
      })
      setServiceNameOptions(serviceOptions);
    }
  }
}
// 根据服务项目带出单位和单价
const getbyname_fum = async (value,type) => {
  form.setFieldsValue({
    serviceid:value.key
  })
  console.log('getbyname_fum', value, type,form.getFieldValue('contractI'))
  if (type == '服务项目') {
    let data = await getbyname({ 
      name: value.label,
      billid:form.getFieldValue('billid'),
    });
    console.log('getbyname_fum111', data)
    set_unit_disabled(false);
    if (data.status == '200') {
        form.setFieldsValue({
          unit: data.data.unit,
          amount:data.data.amount,
        })
      if (data.data.unit) {
        set_unit_disabled(true)
      } else if (data.data.unit == null) {
        set_unit_disabled(true)
      }
    } else {
      return message.error(data.message);
    }
  }
}


  //取到了赋进去
  const onSave = (values) => {
    console.log('onSave-rex',values)
    // handleAdd(modalType)
    const param = {
      id: data.EditData.id,
      amountno: values.amountno,
      date: moment(values.date, globalConfig.form.onlyDateFormat),
      customer: values.customer,
      unit: values.unit,
      amount: values.amount,
      enDate: moment(values.enDate, globalConfig.form.onlyDateFormat),
      remarks: values.remarks,
      billid:form.getFieldValue("billid"),
      serviceid:form.getFieldValue("serviceid")

    }
    console.log('onSave--------------------》', data)
    dispatch({
      type: `${tableName}/edit`,
      payload: {
        param: { data: param },
        type: 'editModalVisible'
      }
    })

  }


  //取过来显示
  useEffect(() => {
    if (editModalVisible) {
      console.log('-----------------------------',data.EditData.state,)
      form.setFieldsValue({
        date: moment(data.EditData.date, globalConfig.form.onlyDateFormat),
        amountno: data.EditData.amountno,
        customer: data.EditData.customer,
        name: {label: data.EditData.name},
        contractI: data.EditData.billid,
        billid: data.EditData.billid,
        serviceid:data.EditData.serviceid,
        unit: data.EditData.unit,
        amount: data.EditData.amount,
        enDate: moment(data.EditData.enDate, globalConfig.form.onlyDateFormat),
        remarks: data.EditData.remarks,
        // state: data.EditData.state != null ?  data.EditData.state : "",
      })
    }
    return () => {
      console.log('clean useEffect')
    }
  }, [editModalVisible])
  console.log('bianji-0', data,data.ContractiList,data.NameList)
  return (
    <Modal
      title="编辑"
      visible={editModalVisible}
      width={ModalWidth}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {

            onSave(values);
          })
          .catch((info) => {
            console.log('UpdateForm Failed:', info);
          });
      }}
      onCancel={() => handleModalClose('editModalVisible')}
      {...maskStyles}
    >
      <Form
        form={form}
        name="editModalVisibleForm"
      >

        <Row>
          <Col span={12} key={1} style={{ display: 'block' }}>

            <Form.Item
              name="amountno"
              label="单据号"
              hasFeedback
              {...formItemLayout}
            >
              <Input type="text" disabled="disabled" />
            </Form.Item>

            <Form.Item
              {...formItemLayout}
              name="date"
              label="开始时间"

            >
              <DatePicker showTime style={{ width: '100%' }} format={globalConfig.form.onlyDateFormat} />
            </Form.Item>
            <Form.Item
              name="customer"
              label="客户"
              hasFeedback
              {...formItemLayout}
            >
              <Select disabled="disabled">
                {data.customerList.map(function (item, index) {
                  return <Select.Option key={index} value={item.key}>{item.label}</Select.Option>
                })}
              </Select>
            </Form.Item>
            <Form.Item
              name="contractI"
              label="合同号"
              hasFeedback
              {...formItemLayout}
            >
                  <Select  onSelect={(e,tatal) => getBybillid_Fun(e,tatal, "合同号")} >
      {data.ContractiList.map(function (item, index) {
        return <Select.Option key={index} value={item.key}>{item.label}&nbsp;&nbsp;&nbsp;&nbsp;{item.value}</Select.Option>
      })}
    </Select>
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              name="enDate"
              label="到期时间"
            >

              <DatePicker showTime style={{ width: '100%' }} format={globalConfig.form.onlyDateFormat} disabled />

            </Form.Item>
          </Col>
          <Col span={12} key={1} style={{ display: 'block' }}>
            <Form.Item
              name="amount"
              label="金额"
              hasFeedback
              {...formItemLayout}
            >
              <InputNumber disabled style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              name="name"
              label="服务项目"
              hasFeedback
              {...formItemLayout}
            >
       <Select labelInValue onSelect={(e) => getbyname_fum(e, "服务项目")}>
               {serviceNameOptions}
              </Select>
              {/* <Select  onSelect={(e,tatal) => getbyname_fum(e,tatal, "服务项目")}>
          
                {data.NameList.map(function (item, index) {
                  return <Select.Option key={index} value={item.key}>{item.value}</Select.Option>
                })}
              </Select> */}
            </Form.Item>
            <Form.Item
              name="unit"
              label="单位"
              hasFeedback
              {...formItemLayout}
            >
              <Input disabled={unit_disabled} />
            </Form.Item>
            <Form.Item
              name="remarks"
              label="备注"
              hasFeedback
              {...formItemLayout}
            >
              <Input />
            </Form.Item>
            {/* <Form.Item
              name="state"
              label="状态"
              hasFeedback
              {...formItemLayout}
            >
             <Select labelInValue>
                {stateList.map(function (item, index) {
                  return <Select.Option key={index} value={item.key}>{item.label}</Select.Option>
                })}
              </Select>
            </Form.Item> */}


          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default UpdateForm;

