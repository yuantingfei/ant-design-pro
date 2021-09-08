import React, { useEffect, useState } from 'react';
import { Bar, Line } from '@ant-design/charts';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Col, DatePicker, Row } from 'antd';
import {getDataByCategory } from '@/services/ant-design-pro/api';

const BillAnalysis: React.FC = () => {
  const [dateStr, setdateStr] = useState('2021-09');
  const [dataBarOut, setdataBarOut] = useState([]);
  const [dataBarIn, setdataBarIn] = useState([]);
  useEffect(() => {
    getDataByCategory({date:dateStr,type:0}).then(data=>{
      setdataBarOut(data)
    }).catch(error=>{
      console.log(error)
    })
    getDataByCategory({date:dateStr,type:1}).then(data=>{
      setdataBarIn(data)
    }).catch(error=>{
      console.log(error)
    })
  }, [dateStr])
  const dataLine = [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ];

  const configLine = {
    data:dataLine,
    height: 400,
    xField: 'year',
    yField: 'value',
    point: {
      size: 5,
      shape: 'diamond',
    },
  };
  let configBarOut = {
    data: dataBarOut,
    xField: 'money',
    yField: 'category',
    seriesField: 'category',
    color: function color(_ref) {
      let category = _ref.category;
      return category === '学习' ? '#FAAD14' : '#5B8FF9';
    },
    meta: {
      category: { alias: '类别' },
      money: { alias: '总额' },
    },
  };
  let configBarIn = {
    data: dataBarIn,
    xField: 'money',
    yField: 'category',
    seriesField: 'category',
    color: function color(_ref) {
      let category = _ref.category;
      return category === '学习' ? '#FAAD14' : '#5B8FF9';
    },
    meta: {
      category: { alias: '类别' },
      money: { alias: '总额' },
    },
  };
  const onChange = (date, dateString) => {
    console.log(date, dateString);
    setdateStr(dateString)
  }
  return (
  <PageContainer>
    <Row>
      <Col span={24} style={{marginBottom: "10px"}}>
        <Card title="条件选择" style={{ width: "100%" }}>
          月份:<DatePicker onChange={onChange} picker="month" />
        </Card>
      </Col>
    </Row>
    <Row style={{marginBottom: "10px"}}>
      <Col span={24}>
        <Card title="趋势图" extra={<a href="#">More</a>} style={{ width: "100%" }}>
          <Line {...configLine} />
        </Card>
      </Col>
    </Row>
    <Row style={{marginBottom: "10px"}}>
      <Col span={12}>
        <Card title="收入分类" extra={<a href="#">More</a>} style={{ width: "100%"  }}>
          <Bar {...configBarIn}></Bar>
        </Card>
      </Col>
      <Col span={12}>
        <Card title="支出分类" extra={<a href="#">More</a>} style={{ width: "100%"  }}>
          <Bar {...configBarOut}></Bar>
        </Card>
      </Col>
    </Row>
    <Row style={{marginBottom: "10px"}}>
      <Col span={8}>col-8</Col>
      <Col span={8}>col-8</Col>
      <Col span={8}>col-8</Col>
    </Row>
    <Row>
      <Col span={6}>col-6</Col>
      <Col span={6}>col-6</Col>
      <Col span={6}>col-6</Col>
      <Col span={6}>col-6</Col>
    </Row>
    </PageContainer>);
};
export default BillAnalysis;