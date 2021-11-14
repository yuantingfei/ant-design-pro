import { ModalForm, ProFormDatePicker, ProFormInstance, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import React, { useRef,useEffect } from 'react';
import {message} from 'antd';
import {editUser } from '@/services/ant-design-pro/api';
interface Props{
    visible: boolean;
    editItem: API.BillListItem|undefined;
    handleModalVisible: (value: boolean) => void;
    submitok: () => void;
}

export default function EditUser(props:Props) {
    const editformRef = useRef<ProFormInstance>();
    const handleEdit = async (fields) => {
      const hide = message.loading('正在编辑');
      try {
        await editUser({ ...fields,id:props.editItem?.id });
        message.success('编辑成功');
        return true;
      } catch (error) {
        hide();
        message.error('编辑失败，请核对好数据后再试一次');
        return false;
      }
    };
  useEffect(() => {
    if(editformRef.current){
      editformRef.current.setFieldsValue({...props.editItem})
    }
  }, [props.editItem])
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
          label="用户名"
          placeholder='请输入用户名'
          width="md"
          disabled
          name="username"
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
