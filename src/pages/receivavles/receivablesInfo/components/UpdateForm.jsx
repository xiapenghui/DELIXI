import React, { useState, useEffect } from 'react'
import moment from 'moment';
import { Modal, Form, Input, Button, Row, Col, DatePicker, InputNumber, Radio, Select, message } from 'antd'

import {
  getVwreceivablesById

} from '@/services/receivavles/receivablesInfo';
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





 
//取到了赋进去
const onSave = (values) => {
  console.log('onSave-rex',values)
  // handleAdd(modalType)
  const param = {
    id: data.EditData.id,
    contractI: values.contractI,
        customer: values.customer,
        tank:values.tank,
        commodity:values.commodity,
        receivablesid:values.receivablesid,
        occurdate: moment(values.occurdate, globalConfig.form.onlyDateFormat),
        no:values.no,
        unit: values.unit,
        number:values.number,
        price:values.price,
        amount: values.amount,
        cName:values.cName,
        invoiceno:values.invoiceno,
        cent:values.cent == null ? 0 : values.cent,
        deductmoney:values.deductmoney == null  ? 0 : values.deductmoney,
        deductreason:values.deductreason,
        remarks: values.remarks,
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
      console.log('useEffect-editModalVisible true', data.EditData)
      form.setFieldsValue({
        id: data.EditData.id,
        contractI: data.EditData.contractI,
        customer: data.EditData.customer,
        tank:data.EditData.tank,
        commodity:data.EditData.commodity,
        receivablesid:data.EditData.receivablesid,
        occurdate: moment(data.EditData.occurdate, globalConfig.form.onlyDateFormat),
        no:data.EditData.no,
        unit: data.EditData.unit,
        number:data.EditData.number,
        price:data.EditData.price,
        amount: data.EditData.amount,
        cName:data.EditData.cName,
        invoiceno:data.EditData.invoiceno,
        cent:data.EditData.cent,
        deductmoney:data.EditData.deductmoney,
        deductreason:data.EditData.deductreason,
        remarks: data.EditData.remarks,
     
      })

      getVwreceivablesByIdFun( data.EditData.id)
    }
    return () => {
      console.log('clean useEffect')
    }
  }, [editModalVisible])

  const getVwreceivablesByIdFun =()=>{
    
  }

  const onBlur_Func =(name)=>{
    // if(name ==='减免费用'){
      let number = form.getFieldValue('number');
        if(number == null || number == 0 ){
          number = 1;
        }

      let ysj =(data.EditData.amount=form.getFieldValue('cent')+number*form.getFieldValue('price') )-form.getFieldValue('deductmoney')
      // console.log('onBlur_Func',ysj,form.getFieldValue('amount'),form.getFieldValue('cent'),form.getFieldValue('deductmoney'))
      //amount=Cent-DeductMoney+Number*Price 
     
      form.setFieldsValue({
        amount: ysj,
      })
    // }else if(name==='加收费用'){
    //   console.log('onBlur_Func',form.getFieldValue('cent'),form.getFieldValue('amount'))
    // }
  }
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
              name="contractI"
              label="合同号"
              
              {...formItemLayout}
            >
                <Input disabled />
            </Form.Item>
            <Form.Item
              name="customer"
              label="客户"
              
              {...formItemLayout}
            >
                <Input disabled />
            </Form.Item>
            <Form.Item
              name="tank"
              label="罐号"
              
              {...formItemLayout}
            >
                <Input disabled />
            </Form.Item>
            <Form.Item
              name="commodity"
              label="货品"
              
              {...formItemLayout}
            >
                <Input disabled />
            </Form.Item>
            <Form.Item
              name="receivablesid"
              label="应收账款号"
              
              {...formItemLayout}
            >
              <Input type="text" disabled="disabled" />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              name="occurdate"
              label="出账日期"
            >
              <DatePicker showTime style={{ width: '100%' }} format={globalConfig.form.onlyDateFormat} />
            </Form.Item>
            <Form.Item
              name="no"
              label="相应单号"
              
              {...formItemLayout}
            >
              <Input type="text" disabled="disabled" />
            </Form.Item>
         
            <Form.Item
              name="unit"
              label="单位"
              
              {...formItemLayout}
            >
              <Input disabled />
            </Form.Item>

          </Col>
          <Col span={12} key={1} style={{ display: 'block' }}>
      
            <Form.Item
              name="number"
              label="数量"
              
              {...formItemLayout}
            >
                <Input  disabled />
            </Form.Item>
            <Form.Item
              name="price"
              label="单价"
              
              {...formItemLayout}
            >
                <Input   disabled />
            </Form.Item>

            <Form.Item
              name="amount"
              label="总费用"
              
              {...formItemLayout}
            >
                <InputNumber  style={{ width: '100%' }}   disabled />
            </Form.Item>
            <Form.Item
              name="cName"
              label="收费类型"
              
              {...formItemLayout}
            >
                <Input disabled />
            </Form.Item>
            <Form.Item
              name="invoiceno"
              label="发票号码"
              
              {...formItemLayout}
            >
                <Input disabled />
            </Form.Item>
            <Form.Item
              name="cent"
              label="加收费用"
              
              {...formItemLayout}
            >
                <InputNumber  style={{ width: '100%' }}   onBlur={() => onBlur_Func( '加收费用')} />
            </Form.Item>
            <Form.Item
              name="deductmoney"
              label="减免费用"
              
              {...formItemLayout} 
            >
                <InputNumber style={{ width: '100%' }}   onBlur={() => onBlur_Func( '减免费用')}/>
            </Form.Item>
          
            <Form.Item
              name="deductreason"
              label="加减费用原因"
              
              {...formItemLayout}
            >
                <Input  />
            </Form.Item>
          
            <Form.Item
              name="remarks"
              label="备注"
              
              {...formItemLayout}
            >
              <Input />
            </Form.Item>
        


          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default UpdateForm;

