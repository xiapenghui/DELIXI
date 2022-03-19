import React from 'react';
import { HeartTwoTone, SmileTwoTone } from '@ant-design/icons';
import { Card, Typography, Alert } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
export default () => (
  <PageHeaderWrapper content=" 这个页面只有 admin 权限才能查看">
    <Card>

      <Typography.Title
        level={2}
        style={{
          textAlign: 'center',
        }}
      >
        <SmileTwoTone /> Delixi OEM barcode printing system（德力西OEM条码打印系统） <HeartTwoTone twoToneColor="#eb2f96" /> 
      </Typography.Title>
    </Card>
    <p
      style={{
        textAlign: 'center',
        marginTop: 24,
      }}
    >

      。
    </p>
  </PageHeaderWrapper>
);
