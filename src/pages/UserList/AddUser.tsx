import { ModalForm, ProFormDatePicker, ProFormInstance, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import React, { useRef } from 'react';
import {message} from 'antd';
import {addUser } from '@/services/ant-design-pro/api';
import { months } from 'moment';
import moment from 'moment';
interface Props{
    visible: boolean;
    handleModalVisible: (value: boolean) => void;
    submitok: () => void;
}

export default function AddUser(props:Props) {
    const addformRef = useRef<ProFormInstance>();
    const handleAdd = async (fields) => {
      const hide = message.loading('正在添加');
      try {
        await addUser({ ...fields });
        message.success('添加成功');
        return true;
      } catch (error) {
        hide();
        message.error('添加失败，请核对好数据后再是一次');
        return false;
      }
    };
  return (
    <ModalForm
        title={'新增用户'}
        width="400px"
        formRef={addformRef}
        visible={props.visible}
        onVisibleChange={props.handleModalVisible}
        initialValues={{
          username:"",
          password:'',
          telphtone:"",
          description:"",
        }}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.BillListItem);
          if (success) {
              addformRef.current?.resetFields();
              props.submitok()
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: '必填',
            },
          ]}
          label="用户名"
          placeholder='请输入用户名'
          width="md"
          name="username"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: '必填',
            },
          ]}
          label="密码"
          placeholder='请输入密码'
          width="md"
          name="password"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: '必填',
            },
          ]}
          label="电话"
          placeholder='请输入电话'
          width="md"
          name="telphtone"
        />
        <ProFormTextArea
        label="描述"
        placeholder='请输入简短语言描述此用户'
         width="md" name="description" />
      </ModalForm>
  );
}
