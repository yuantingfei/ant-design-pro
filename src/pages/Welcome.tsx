import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import styles from './Welcome.less';
import moment from 'moment';

const CodePreview: React.FC = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

export default (): React.ReactNode => {
  const intl = useIntl();
  const [datetime, setdatetime] = useState(moment())
  //今年第一天
  const [jinnaindate, setjinnaindate] = useState(moment().startOf('year'))
  //本月第一天
  const [benyuedate, setbenyuedate] = useState(moment().startOf('month'))
  setInterval(()=>{
    setdatetime(moment())
  },1000)
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
    </PageContainer>
  );
};
