import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { history, useModel } from 'umi';
interface Props{
    visible:boolean;
    cancel:()=>void;
}
const Info = (props:Props) => {
    const { initialState } = useModel('@@initialState');
  return (
    <>
      <Modal title="个人信息" visible={props.visible} footer={null} onCancel={props.cancel}>
        <p>用户名:{initialState.currentUser?.username}</p>
        <p>电话:{initialState.currentUser?.telphtone}</p>
        <p>描述:{initialState.currentUser?.description}</p>
      </Modal>
    </>
  );
};
export default Info;
