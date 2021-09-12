import { Button, Space,Modal } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { history, useModel } from 'umi';
import styles from './index.less';
import { logout } from '@/services/ant-design-pro/api';
const { confirm } = Modal;
export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  console.log(initialState?.currentUser)
  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }
  const showConfirm = () => {
    confirm({
      title: '退出',
      content: '你确认要退出么？',
      onOk() {
        logout().then(res=>{
          if(res.status){
            history.replace({
              pathname: '/user/login'
            });
          }
        });
      },
      onCancel() {
      },
    });
  }
  return (
    <Space className={className}>
      <Button type="link">
      {initialState?.currentUser?.username}
      </Button>
      
      <Button type="link">
        个人信息
      </Button>
      <Button type="link" onClick={()=>{
        showConfirm();
      }}>
        退出
      </Button>
    </Space>
  );
};
export default GlobalHeaderRight;
