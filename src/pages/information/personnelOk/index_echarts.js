import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Button, message, Row, Col, Card, Select } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { Link, connect } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
// 引入 ECharts 主模块
import * as echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line';  //折线图是line,饼图改为pie,柱形图改为bar
import 'echarts/lib/chart/pie';  //折线图是line,饼图改为pie,柱形图改为bar
import 'echarts/lib/chart/bar';  //折线图是line,饼图改为pie,柱形图改为bar
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import {
  postListInit,
  Agree,
  Negative
} from '@/services/information/personnelOk';

const personnelOkComponent = ({
  infoList,
  personnelOk,
  dispatch,
  user
}) => {


  useEffect(() => {
    one()
    two()
  }, []);



  const one = () => {
    let echarts = require('echarts')
    let myChart = echarts.init(document.getElementById('main1'));
    // 绘制图表
    myChart.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      toolbox: {
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      legend: {
        data: ['蒸发量', '降水量', '平均温度']
      },
      xAxis: [
        {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          axisPointer: {
            type: 'shadow'
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '水量',
          min: 0,
          max: 250,
          interval: 50,
          axisLabel: {
            formatter: '{value} ml'
          }
        },
        {
          type: 'value',
          name: '温度',
          min: 0,
          max: 25,
          interval: 5,
          axisLabel: {
            formatter: '{value} °C'
          }
        }
      ],
      series: [
        {
          name: '蒸发量',
          type: 'bar',
          data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
        },
        {
          name: '降水量',
          type: 'bar',
          data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
        },
        {
          name: '平均温度',
          type: 'line',
          yAxisIndex: 1,
          data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
        }
      ]
    });

  }


  const two = () => {
    let echarts = require('echarts')
    let myChart = echarts.init(document.getElementById('main2'));
    // 绘制图表
    myChart.setOption({
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '40',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1048, name: '搜索引擎' },
            { value: 735, name: '直接访问' },
            { value: 580, name: '邮件营销' },
            { value: 484, name: '联盟广告' },
            { value: 300, name: '视频广告' }
          ]
        }
      ]
    });

  }



  return (
    <PageContainer>
      <Card style={{ width: '100%' }}>
        <div>
          <div id="main1" style={{ width: '48%', height: 400, float: 'left' }}></div>
          <div id="main2" style={{ width: '48%', height: 400, float: 'right' }} ></div>
        </div> 
      </Card>

    </PageContainer>
  );
};

export default connect(({ personnelOk }) => ({ personnelOk }))(personnelOkComponent);




