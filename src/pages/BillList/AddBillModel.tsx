import { ModalForm, ProFormInstance, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import React, { useRef } from 'react';
import {message} from 'antd';
import {addBill } from '@/services/ant-design-pro/api';
interface Props{
    visible: boolean;
    handleModalVisible: (value: boolean) => void;
    submitok: () => void;
}

export default function AddBillModel(props:Props) {
    const addformRef = useRef<ProFormInstance>();
    const handleAdd = async (fields: API.BillListItem) => {
      const hide = message.loading('正在添加');
      try {
        await addBill({ ...fields });
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
        title={'新增记账'}
        width="400px"
        formRef={addformRef}
        visible={props.visible}
        onVisibleChange={props.handleModalVisible}
        initialValues={{
          moneyCount:"",
          type:'0',
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
          label="金额"
          placeholder='请输入金额'
          width="md"
          name="moneyCount"
        />
        <ProFormSelect
          rules={[
            {
              required: true,
              message: '必填',
            },
          ]}
          label="收入/支出"
          options={[
            {
              value: "1",
              label: "收入",
            },
            {
              value: "0",
              label: "支出",
            },
          ]}
          placeholder='请选择'
          width="md"
          name="type"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: '必填',
            },
          ]}
          label="分类"
          width="md"
          placeholder='请输入分类'
          name="category"
        />
        <ProFormTextArea
        label="描述"
        placeholder='请输入简短语言描述此账单'
         width="md" name="description" />
      </ModalForm>
  );
}
