/* eslint-disable prefer-const */
import React, { useEffect, useState } from 'react';
import { Bar, Line } from '@ant-design/charts';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Col, DatePicker, Input, Row } from 'antd';
import {getDataByCategory,getDataByUsedate } from '@/services/ant-design-pro/api';
import moment from 'moment';
import { jijinListHistory,deleteCode } from '@/services/ant-design-pro/api';
import { cloneDeep } from 'lodash';

const JijinHistoryMap: React.FC = () => {
  const [code, setcode] = useState("")
  const [data, setdata] = useState(null)
  useEffect(() => {
    if(code.length===6){
      console.log(code)
      jijinListHistory({
        current:1,
        pageSize:100000,
        code:code
      }).then(res=>{
        console.log(res)
        let tmp = []
        let arr = res.data.reverse()
        for (let i = 0; i < res.data.length; i++) {
          const element = res.data[i];
          tmp.push({
            value:parseFloat(element.ljvalue),
            code:element.code,
            timeStr:element.timeStr
          })
        }
        setdata(tmp)
      })
    }else{
      setdata([])
    }
  }, [code])
  // useEffect(() => {
  //   if(data!=null){
      
  //   }
  // }, [data])

  const configLine = {
    data:data!=null?data:[],
    height: 400,
    xField: 'timeStr',
    yField: 'value',
    seriesField: 'code',
    smooth: true,
    yAxis: {
      label: {
        formatter: function formatter(v) {
          return ''.concat(v).replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
            return ''.concat(s, ',');
          });
        },
      },
    },
  };


  const onChange = (date, dateString) => {
    
  }
  return (
  <PageContainer>
    <Row>
      <Col span={24} style={{marginBottom: "10px"}}>
        <Card title="条件选择" style={{ width: "100%" }}>
          <Col span={5}>
          基金代号:<Input onChange={(e)=>{
              const { value } = e.target;
              setcode(value)
            }}/>
        </Col>
          
        </Card>
      </Col>
    </Row>
    {/* <Row style={{marginBottom: "10px"}}>
      <Col span={24}>
        <Card title="本月概述" style={{ width: "100%" }}>
  本年总收入:{moneyInAll.toFixed(2)}元，总支出:{moneyOutAll.toFixed(2)}元,结余:{(moneyInAll-moneyOutAll).toFixed(2)}
        </Card>
      </Col>
    </Row> */}
    <Row style={{marginBottom: "10px"}}>
      <Col span={24}>
        <Card title="趋势图" style={{ width: "100%" }}>
          <Line {...configLine} />
        </Card>
      </Col>
    </Row>
    </PageContainer>);
};
export default JijinHistoryMap;