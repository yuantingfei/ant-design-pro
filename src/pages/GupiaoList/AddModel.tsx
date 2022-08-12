import { ModalForm, ProFormDatePicker, ProFormInstance, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import React, { useRef } from 'react';
import {message} from 'antd';
import {addGupiao } from '@/services/ant-design-pro/api';
interface Props{
    visible: boolean;
    handleModalVisible: (value: boolean) => void;
    submitok: () => void;
}

export default function AddModel(props:Props) {
    const addformRef = useRef<ProFormInstance>();
    const handleAdd = async (fields: API.LinkListItem) => {
      const hide = message.loading('正在添加');
      try {
        await addGupiao({ ...fields });
        message.success('添加成功');
        return true;
      } catch (error) {
        hide();
        message.error('添加失败，请核对好数据后再试一次');
        return false;
      }
    };
  return (
    <ModalForm
        title={'新增股票动态'}
        width="400px"
        formRef={addformRef}
        visible={props.visible}
        onVisibleChange={props.handleModalVisible}
        initialValues={{
          code:"",
        }}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.LinkListItem);
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
        label="股票代码"
          width="md"
          placeholder='请输入股票代码'
          name="code"
        />
      </ModalForm>
  );
}
