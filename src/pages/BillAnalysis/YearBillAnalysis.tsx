/* eslint-disable prefer-const */
import React, { useEffect, useState } from 'react';
import { Bar, Line } from '@ant-design/charts';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Col, DatePicker, Row } from 'antd';
import {getDataByCategory,getDataByUsedate } from '@/services/ant-design-pro/api';
import moment from 'moment';
import { cloneDeep } from 'lodash';

const YearBillAnalysis: React.FC = () => {
  const [dateValue, setdateValue] = useState(moment());
  const [dateStr, setdateStr] = useState('2021');
  const [moneyOutAll, setMoneyOutAll] = useState(0);
  const [moneyInAll, setMoneyInAll] = useState(0);
  const [dataBarOut, setdataBarOut] = useState([]);
  const [dataBarIn, setdataBarIn] = useState([]);
  const [dataLine, setdataLine] = useState([]);
  const formatDateData = (date,data)=>{
    let firstMonthDay = moment(date).startOf('year');
    let returnData = []
    for (let i = 0; i < 370; i++) {
      let tmpdate = cloneDeep(firstMonthDay).subtract((0-i),"day")
      if(tmpdate.year()===firstMonthDay.year()){
        let isHave1 = false;
        let isHave0 = false;
        let type1Tmp = null;
        let type0Tmp = null;
        for (let j = 0; j < data.length; j++) {
          const elementj = data[j];
          if(elementj.usedate===tmpdate.format('YYYY-MM-DD')&&elementj.type===1){
            isHave1 = true;
            type1Tmp = {
              money:elementj.money,
              type:'收入',
              usedate:tmpdate.format('YYYY-MM-DD')
            }
          }
          if(elementj.usedate===tmpdate.format('YYYY-MM-DD')&&elementj.type===0){
            isHave0 = true;
            type0Tmp ={
              money:elementj.money,
              type:"支出",
              usedate:tmpdate.format('YYYY-MM-DD')
            }
          }
        }
        if(!isHave1){
          type1Tmp = {
            money:0,
            type:'收入',
            usedate:tmpdate.format('YYYY-MM-DD')
          }
        }
        if(!isHave0){
          type0Tmp ={
            money:0,
            type:"支出",
            usedate:tmpdate.format('YYYY-MM-DD')
          }
        }
        returnData.push(type1Tmp)
        returnData.push(type0Tmp)
        // returnData.push({
        //   money:type1Tmp?.money-type0Tmp?.money,
        //     type:'当天结余',
        //     usedate:tmpdate.format('YYYY-MM-DD')
        // })

      }
    }
    return returnData
  }
  useEffect(() => {
    getDataByUsedate({date:dateStr}).then(data=>{
      let inM = 0;
      let outM = 0;
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        if(element.type===1){
          inM = inM + element.money;
        }else{
          outM = outM + element.money;
        }
      }
      setMoneyInAll(inM)
      setMoneyOutAll(outM)
      setdataLine(formatDateData(dateStr,data))
    }).catch(error=>{
      console.log(error)
    })
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

  const configLine = {
    data:dataLine,
    height: 400,
    xField: 'usedate',
    yField: 'money',
    seriesField: 'type',
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
    setdateValue(date)
  }
  return (
  <PageContainer>
    <Row>
      <Col span={24} style={{marginBottom: "10px"}}>
        <Card title="条件选择" style={{ width: "100%" }}>
          年份:<DatePicker onChange={onChange} value={dateValue} picker="year" />
        </Card>
      </Col>
    </Row>
    <Row style={{marginBottom: "10px"}}>
      <Col span={24}>
        <Card title="本月概述" style={{ width: "100%" }}>
  本年总收入:{moneyInAll.toFixed(2)}元，总支出:{moneyOutAll.toFixed(2)}元,结余:{(moneyInAll-moneyOutAll).toFixed(2)}
        </Card>
      </Col>
    </Row>
    <Row style={{marginBottom: "10px"}}>
      <Col span={24}>
        <Card title="趋势图" style={{ width: "100%" }}>
          <Line {...configLine} />
        </Card>
      </Col>
    </Row>
    <Row style={{marginBottom: "10px"}}>
      <Col span={12}>
        <Card title="收入分类" style={{ width: "100%"  }}>
          <Bar {...configBarIn}></Bar>
        </Card>
      </Col>
      <Col span={12}>
        <Card title="支出分类" style={{ width: "100%"  }}>
          <Bar {...configBarOut}></Bar>
        </Card>
      </Col>
    </Row>
    {/* <Row style={{marginBottom: "10px"}}>
      <Col span={8}>col-8</Col>
      <Col span={8}>col-8</Col>
      <Col span={8}>col-8</Col>
    </Row>
    <Row>
      <Col span={6}>col-6</Col>
      <Col span={6}>col-6</Col>
      <Col span={6}>col-6</Col>
      <Col span={6}>col-6</Col>
    </Row> */}
    </PageContainer>);
};
export default YearBillAnalysis;