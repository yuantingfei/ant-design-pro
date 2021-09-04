import { ModalForm, ProFormDatePicker, ProFormInstance, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import React, { useRef,useEffect } from 'react';
import {message} from 'antd';
import {editBill } from '@/services/ant-design-pro/api';
interface Props{
    visible: boolean;
    editItem: API.BillListItem|undefined;
    handleModalVisible: (value: boolean) => void;
    submitok: () => void;
}

export default function EditBillModel(props:Props) {
    const editformRef = useRef<ProFormInstance>();
    const handleEdit = async (fields: API.BillListItem) => {
      const hide = message.loading('正在编辑');
      try {
        await editBill({ ...fields,id:props.editItem?.id });
        message.success('编辑成功');
        return true;
      } catch (error) {
        hide();
        message.error('编辑失败，请核对好数据后再是一次');
        return false;
      }
    };
  useEffect(() => {
    if(editformRef.current){
      editformRef.current.setFieldsValue({...props.editItem})
    }
  }, [props.editItem])
  console.log(props.editItem)
  if(!props.editItem){
    return <></>
  }
  return (
    <ModalForm
        title={'编辑账单'}
        width="400px"
        formRef={editformRef}
        visible={props.visible}
        onVisibleChange={props.handleModalVisible}
        // initialValues={props.editItem}
        onFinish={async (value) => {
          const success = await handleEdit(value as API.BillListItem);
          if (success) {
              editformRef.current?.resetFields();
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
        <ProFormDatePicker
        rules={[
            {
              required: true,
              message: '必填',
            },
          ]}
           name="usedate" label="使用日期" />
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
              value: 1,
              label: "收入",
            },
            {
              value: 0,
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
