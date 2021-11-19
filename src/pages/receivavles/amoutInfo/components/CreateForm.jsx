import React, { useState ,useEffect} from 'react'
import moment from 'moment';
import { Modal, Form, Input, Button, Row, Col, DatePicker, InputNumber, Radio, Select, message } from 'antd'

import {
  getBycustomer,
  getBybillid,
  getbyname
} from '@/services/receivavles/amoutInfo';
import globalConfig from '../../../../../config/defaultSettings';
const maskStyles = globalConfig.modal.maskStyles
const formItemLayout = globalConfig.table.formItemLayout
const CreateForm = (props) => {
  const [form] = Form.useForm();
  const {
    addModalVisible,
    handleModalClose,
    addModalValue,
    handleAdd,
    ModalWidth,
    data,     
     dispatch,
     tableName
    // customerList,
  } = props
  
  const [customerSelectOptions, setcustomerSelectOptions] = useState([]) //客户带出合同号和到期时间

  const [contractISelectOptions, setContractISelectOptions] = useState([]) //合同号带出服务项目
  const [enDate_disabled, set_enDate_disabled] = useState(false) //到期时间 是否禁用
  const [unit_disabled, set_unit_disabled] = useState(false) //单位 是否禁用
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


// 根据客户带出合同号和到期时间
const getBycustomer_Fun = async (value, type) => {
  console.log('getBycustomer_Fun', value, type)
  if (type == '客户') {
    let data = await getBycustomer({customer:value.value});
    console.log('getBycustomer_Fun1111', data)
    if (data.status == '200') {
      const customerSelectOptions = data.data.ContractiList.map(function (item, index) {                  
        return <Select.Option key={index} value={item.key}>{item.label}&nbsp;&nbsp;&nbsp;&nbsp;{item.value}</Select.Option>
      })
      setcustomerSelectOptions(customerSelectOptions);
    
    } else {
      return message.error(data.message);
    }
  }
}

// // 根据服务项目带出单位和单价
  const getbyname_fum = async (value, type) => {
    console.log('getbyname_fum', value, type,form.getFieldValue('contractI'))
  if (type == '服务项目') {
    let data = await getbyname({ 
      name: value.label,
      //下拉框得到的是key还是lable还是value
      billid:form.getFieldValue('contractI').key,
    });
    console.log('getbyname_fum111', data)
      if (data.status == '200') {
        // console.log("---------->",data.data)
        if(data.data != null){
          form.setFieldsValue({
            unit: data.data.unit,
            amount:data.data.amount
          });
          // 如果“单位”存在，将“单位赋值给控件，并设置控件只读。否则，设置“单位”可编辑
          if (data.data.unit) {
            set_unit_disabled(true)
          } else if (data.data.unit == null) {
            set_unit_disabled(true)
          }
        }
      } else {
        return message.error(data.message);
      }
    }
  }

// // 根据服务项目带出单位和单价
// const getbyname_fum = async (value,type) => {
//   console.log('getbyname_fum', value, type,form.getFieldValue('contractI'))
//   if (type == '服务项目') {
//     let data = await getbyname({ 
//       name: value.label,
//       //下拉框得到的是key还是lable还是value
//       billid:form.getFieldValue('contractI').key,
//     });
//     console.log('getbyname_fum111', data)
//     if (data.status == '200') {
//             console.log("---------->",data.data)
//              if(data.data != null){
//                  form.setFieldsValue({
//                   unit: data.data.Unit,
//                   Price:data.data.amount
//                });
//              }
//            // 如果“单位”存在，将“单位赋值给控件，并设置控件只读。否则，设置“单位”可编辑
//       if (data.data.unit) {
//         set_unit_disabled(true)
//       } else if (data.data.unit == null) {
//         set_unit_disabled(true)
//       }
//       form.setFieldsValue({
//         unit: data.data.Unit,
//         Price:data.data.Price,
//       })
  
//     } else {
//       return message.error(data.message);
//     }
//   }
// }

  const getEnDateByContractI = async (value) => {
    console.log('getEnDateByContractI2', value)
    form.setFieldsValue({
      enDate: moment(value.label[2], 'YYYY-MM-DD'),
    })
    //如果“到期时间”存在，将“到期时间赋值给控件，并设置控件只读。否则，设置“到期时间”可编辑
    if (value.label[2] != null) {
      set_enDate_disabled(true)
    } else{
      set_enDate_disabled(false)
    }

    // 根据合同号带出服务项目下拉框
    let data = await getBybillid(value.key);
   
    if (data.status == '200') {
      const contractIListSelectOptions = data.data.NameList.map(function (item, index) {                  
        return <Select.Option key={index} value={item.key}>{item.value}</Select.Option>
      })
      setContractISelectOptions(contractIListSelectOptions);

    } else {
      return message.error(data.message);
    }
  }

//取值
  const onSave = (values) => {
    // handleAdd(modalType)
    console.log('values123',values.name);
    const data = {
      amountno: values.amountno,
      date: moment(values.date).format(globalConfig.form.onlyDateFormat),
      customer: values.customer != null ?  values.customer.value : "",
      // name: values.name.key,
      billid:values.contractI.key,
      serviceid:values.name.key,
      unit: values.unit,
      amount: values.amount,
      // contractI: values.contractI.key,
      enDate: moment(values.enDate).format(globalConfig.form.onlyDateFormat),
      remarks: values.remarks,
    }
    console.log('onSave', data)
    dispatch({
      type: `${tableName}/create`,
      payload: {
        param:{data},
        type:'addModalVisible'
      }
    })
  }
  console.log('test.',data.customerList)
    //取过来显示
    useEffect(() => {
      form.resetFields()
      return () => {
        console.log('clean useEffect')
      }
    }, [addModalVisible])
  return (
    <Modal
      title="新建"
      visible={addModalVisible}
      width={ModalWidth}

      onOk={() => {
        form
          .validateFields()
          .then((values) => {

            onSave(values);
          })
          .catch((info) => {
            console.log('CreateForm Failed:', info);
          });
      }}
      onCancel={() => handleModalClose('addModalVisible')}
      {...maskStyles}
    >
      <Form
        form={form}
        name="addModalValueForm"
      >

        <Row>
          <Col span={12} key={1} style={{ display: 'block' }}>

            <Form.Item
              name="amountno"
              label="单据号"
              hasFeedback
              {...formItemLayout}
            >
              <Input  disabled/>
            </Form.Item>

            <Form.Item
              {...formItemLayout}
              name="date"
              label="开始时间"
              rules={[{
                type: 'object', required: true, message: '请输入开始时间',
              }]}
            >
              <DatePicker showTime style={{ width: '100%' }} format={globalConfig.form.onlyDateFormat} />
            </Form.Item>
            <Form.Item
              name="customer"
              label="客户"
              hasFeedback
              {...formItemLayout}
              rules={[{
                required: true, message: '客户不能为空',
              }]}
            >
              <Select labelInValue onSelect={(e)=>getBycustomer_Fun(e,"客户")}>
                {data.customerList.map(function (item, index) {
                  
                  return <Select.Option key={index} value={item.key}>{item.value}</Select.Option>
                })}
              </Select>
            </Form.Item>
            <Form.Item
              name="contractI"
              label="合同号"
              hasFeedback
              {...formItemLayout}
              rules={[{
                required: true, message: '合同号不能为空',
              }]}
            >
              <Select labelInValue onSelect={(e) => getEnDateByContractI(e)} >
                {customerSelectOptions}
                {/* {data.contractiList.map(function (item, index) {
                  return <Select.Option key={index} value={item.key}>{item.label}</Select.Option>
                })} */}
              </Select>
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              name="enDate"
              label="到期时间"
            >
              <DatePicker showTime style={{ width: '100%' }} format={globalConfig.form.onlyDateFormat} disabled={enDate_disabled} />
            </Form.Item>
          </Col>
          <Col span={12} key={2} style={{ display: 'block' }}>
            <Form.Item
              name="amount"
              label="金额"
              hasFeedback
              {...formItemLayout}
            >

              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              name="name"
              label="服务项目"
              hasFeedback
              {...formItemLayout}
              rules={[{
                required: true, message: '服务项目不能为空',
              }]}
            >
              <Select labelInValue onSelect={(e) => getbyname_fum(e, "服务项目")}>
              {contractISelectOptions}
              </Select>
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
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default CreateForm;
