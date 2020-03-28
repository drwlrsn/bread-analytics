import { Layout, PageHeader, Row } from 'antd';
import React from 'react';
import { Nav } from '../Nav';
const { Content } = Layout;

export const Centered = ({ children, title, subTitle }) => (
  <div>
    <Nav />
    <PageHeader title={title} subTitle={subTitle} />
    <Content
      style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      <Row
        justify="center"
        align="middle"
        style={{ display: 'flex', flexGrow: 1 }}
      >
        {children}
      </Row>
    </Content>
  </div>
);
