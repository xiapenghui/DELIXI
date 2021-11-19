import { PlusOutechartsd } from '@ant-design/icons';

import React, { useState, useRef, useEffect } from 'react';
import { Link, connect } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import OneEcharts from './components/OneEcharts';

 

import { getDropDownInit } from '@/services/echarts/echarts';

const echartsComponent = ({
  echarts,
  dispatch
}) => {
  const {
    isNoList
  } = echarts




  return (
    <PageContainer>
      <div>
        <OneEcharts />
      </div>
    </PageContainer>
  );
};

export default connect(({ echarts }) => ({ echarts }))(echartsComponent);




