import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import styles from './Welcome.less';
import moment from 'moment';
import AddModel from './../pages/LinkList/AddModel';
import { listBySelf } from '@/services/ant-design-pro/api';
const CodePreview: React.FC = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

export default (): React.ReactNode => {
  const intl = useIntl();
  const [urls, seturls] = useState([])
  const [datetime, setdatetime] = useState(moment())
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  //今年第一天
  const [jinnaindate, setjinnaindate] = useState(moment().startOf('year'))
  //本月第一天
  const [benyuedate, setbenyuedate] = useState(moment().startOf('month'))
  setInterval(()=>{
    setdatetime(moment())
  },1000)
  const goPage = (url)=>{
    window.open(url,"_blank")
  }
  const getUrl= ()=>{
    listBySelf().then(res=>{
      console.log(res)
      seturls(res.data)
    })
  }
  useEffect(() => {
    getUrl()
  }, [])
  return (
    <PageContainer>
      <Card>
        <Alert
          message={`欢迎来到彩虹屁社区之家！现在时间是${ datetime.format("MMMM Do YYYY, h:mm:ss a")}，今天是今年第${datetime.diff(jinnaindate,'days')+1}天，本月的第${datetime.diff(benyuedate,'days')+1}天，${datetime.format('dddd')}`}
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />
        <Alert
          message={'彩虹屁社区之家,是一群正能量,欢快的朋友们聚集的平台，是我们讨论生活、体验生活、分享生活的地方，大家传递正能量、畅所欲言哟！！！'}
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />
      </Card>
      <Card title="常用链接">
        <Card.Grid style={{width:"auto",textAlign:"center"}} >
          <a onClick={()=>{
            goPage("https://www.baidu.com")  
          }}>百度一下</a>
        </Card.Grid>
      </Card>
      <Card title="我的收藏">
        {urls.map(i=>{
          return (<>
           <Card.Grid style={{width:"auto",textAlign:"center"}} >
          <a onClick={()=>{
            goPage(i.url)  
          }}>{i.text}</a>
        </Card.Grid>
          </>)
        })}
        <Card.Grid style={{width:"auto",textAlign:"center"}} >
          <a onClick={()=>{
            handleModalVisible(true)
          }}>添加</a>
        </Card.Grid>
      </Card>
      <AddModel visible={createModalVisible} handleModalVisible={handleModalVisible} submitok={()=>{
        handleModalVisible(false);
        getUrl()
      }}></AddModel>
    </PageContainer>
  );
};
