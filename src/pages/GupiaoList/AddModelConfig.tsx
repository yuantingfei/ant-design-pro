import { ModalForm, ProFormDatePicker, ProFormInstance, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import React, { useRef } from 'react';
import {message} from 'antd';
import { addGupiaoConfig } from '@/services/ant-design-pro/api';

export const opList = [
  {
    value: '>',
    label: '百分比大于',
  },
  {
    value: '<',
    label: '百分比小于',
  },
  {
    value: '>value',
    label: '当前价格大于',
  },
  {
    value: '<value',
    label: '当前价格小于',
  },
];
interface Props{
    visible: boolean;
    handleModalVisible: (value: boolean) => void;
    submitok: () => void;
}

export default function AddModel(props:Props) {
    const addformRef = useRef<ProFormInstance>();
    const handleAdd = async (fields: API.GupiaoConfigListItem) => {
      const hide = message.loading('正在添加');
      try {
        await addGupiaoConfig({ ...fields });
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
        title={'新增股票提醒'}
        width="400px"
        formRef={addformRef}
        visible={props.visible}
        onVisibleChange={props.handleModalVisible}
        initialValues={{
          code:"",
        }}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.GupiaoConfigListItem);
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
      <ProFormSelect
        options={[
          {
            value: '>',
            label: '百分比大于',
          },
          {
            value: '<',
            label: '百分比小于',
          },
          {
            value: '>value',
            label: '当前价格大于',
          },
          {
            value: '<value',
            label: '当前价格小于',
          },
        ]}
        width="md"
        name="op"
        label="操作符号"
      />
      <ProFormText
        rules={[
          {
            required: true,
            message: '必填',
          },
        ]}
        label="值"
        width="md"
        placeholder='请输入值'
        name="value"
      />
      <ProFormText
        rules={[
          {
            required: true,
            message: '必填',
          },
        ]}
        label="企业微信机器人URL"
        width="md"
        placeholder='请输入企业微信机器人URL'
        name="url"
      />
      <ProFormText
        rules={[
          {
            required: true,
            message: '必填',
          },
        ]}
        label="提醒次数"
        width="md"
        placeholder='请输入提醒次数'
        name="times"
      />
      </ModalForm>
  );
}
