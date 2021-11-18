import { ModalForm, ProFormDatePicker, ProFormInstance, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import React, { useRef } from 'react';
import {message} from 'antd';
import {addCode } from '@/services/ant-design-pro/api';
import { months } from 'moment';
import moment from 'moment';
interface Props{
    visible: boolean;
    handleModalVisible: (value: boolean) => void;
    submitok: () => void;
}

export default function AddCodeModel(props:Props) {
    const addformRef = useRef<ProFormInstance>();
    const handleAdd = async (fields: API.BillListItem) => {
      const hide = message.loading('正在添加');
      try {
        await addCode({ ...fields });
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
        title={'新增我的关注'}
        width="400px"
        formRef={addformRef}
        visible={props.visible}
        onVisibleChange={props.handleModalVisible}
        initialValues={{
          code:"",
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
          label="基金代码"
          placeholder='请输入基金代码'
          width="md"
          name="code"
        />
      </ModalForm>
  );
}
