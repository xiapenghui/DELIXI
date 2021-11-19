import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Button, message, Row, Col, Card, Select, Table, Tag, Space, DatePicker } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { Link, connect } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import ExportJsonExcel from 'js-export-excel';
import moment from 'moment'
import {
  postListInit,
  Agree,
  Negative,
  ConfirmationDetail
} from '@/services/information/personnelOk';
import Item from 'antd/lib/list/Item';
import index from '@/pages/authorityManagement/roleInfo/components/MenuForm';
import './components/index.css';

const personnelOkComponent = ({
  infoList,
  personnelOk,
  dispatch,
  user
}) => {
  const style = { background: '#67be8e', padding: '8px 20px' };
  const {
    currentUser,
  } = user;

  const [info, SetInfo] = useState([]);
  const [dataList, SetDataList] = useState([]);




  const columns = [
    {
      title: '部门',
      dataIndex: 'departmentshortname',
      align: 'center',
      key: 'departmentshortname',
    },
    {
      title: '员工',
      dataIndex: 'employeename',
      align: 'center',
      key: 'employeename',
    },
    {
      title: '日期',
      dataIndex: 'tsdate',
      align: 'center',
      key: 'tsdate',
    },
    {
      title: '工时(小时)',
      dataIndex: 'period',
      align: 'center',
      key: 'period',
    },

  ];



  useEffect(() => {
    infoData()
    Confirmation()
  }, []);



  //获取当前人员信息
  const infoData = async () => {
    let data = await postListInit(
      {
        user: currentUser.name,
        yearth: (moment().year()).toString(),
        month: (moment().month() + 1).toString()
      }
    );
    if (data.status == '200') {
      SetInfo(data.list[0])
    }
  };


  // 日期选择
  const onChange = async (date, dateString) => {
    //初始化信息
    let data = await postListInit(
      {
        user: currentUser.name,
        yearth: dateString.substring(0, 4),
        month: dateString.substring(dateString.length - 2, dateString.length)
      }
    );
    if (data.status == '200') {
      SetInfo(data.list[0])
    }  



    //明细
    let data2 = await ConfirmationDetail({
      user: currentUser.name,
      yearth: dateString.substring(0, 4),
      month: dateString.substring(dateString.length - 2, dateString.length)
    });
    if (data2.status == '200') {
      data2.list.map((item) => {
        item.tsdate = item.tsdate.substring(0, 10)
      })
      SetDataList(data2.list)
    }
 
  };


  //获取当前人员信息明细
  const Confirmation = async () => {
    let data = await ConfirmationDetail(
      {
        user: currentUser.name,
        yearth: (moment().year()).toString(),
        month: (moment().month() + 1).toString()
      });
    if (data.status == '200') {
      data.list.map((item) => {
        item.tsdate = item.tsdate.substring(0, 10)
      })
      SetDataList(data.list)
    }
  };







  //确认
  const handOk = async () => {
    let params = {
      employeeno: info.employeeno,
      yearth: info.yearth,
      month: info.month,
      state: '',
      periodtime: info.periodtime,
    }
    let data = await Agree(params);
    if (data.status == '200') {
      message.success(data.message)
    } else {
      message.error(data.message)
    }
  };


  //否定
  const handNo = async () => {
    let params = {
      employeeno: info.employeeno,
      yearth: info.yearth,
      month: info.month,
      state: '',
      periodtime: info.periodtime,
    }
    let data = await Negative(params);
    if (data.status == '200') {
      message.success(data.message)
    } else {
      message.error(data.message)
    }
  };




  return (
    <PageContainer>
      <Card style={{ width: '100%' }}>
        <Row gutter={50} justify="center">
          <Col className="gutter-row" span={6}>
            {/* <div style={style}>当前时间 : <b style={{ fontSize: '15px', marginLeft: '10px' }}>{info.yearth}-{info.month}</b></div> */}
            <div style={style}>当前时间:<DatePicker picker="month" onChange={onChange} className="pickrStyle" defaultValue={moment()} /></div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}>员工编号 :  <b style={{ fontSize: '15px', marginLeft: '10px' }}>{info.employeeno} </b></div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}>员工姓名 : <b style={{ fontSize: '15px', marginLeft: '10px' }}>{info.employeename}</b></div>
          </Col>
        </Row>
        <div style={{ width: '74%', height: '250px', lineHeight: '250px', textAlign: 'center', background: '#67be8e', margin: '20px auto' }}>
          <span style={{ fontSize: '25px', fontWeight: 'bold' }}>工时(H): <b style={{ marginLeft: '10px' }}> {info.periodtime}</b></span>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Button type="primary" style={{ marginRight: '20px' }} icon={<CheckCircleOutlined />} onClick={handOk}>确认</Button>
          <Button type="primary" danger style={{ marginLeft: '20px' }} icon={<CloseCircleOutlined />} onClick={handNo}>否定</Button>
        </div>

        <Table columns={columns} dataSource={dataList} style={{ width: '75%', margin: '20px auto' }} />

      </Card>

    </PageContainer>
  );
};

export default connect(({ personnelOk, user }) => ({ personnelOk, user }))(personnelOkComponent);




