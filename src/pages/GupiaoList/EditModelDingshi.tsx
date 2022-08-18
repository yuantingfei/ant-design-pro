import { ModalForm, ProFormDatePicker, ProFormInstance, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import React, { useEffect, useRef } from 'react';
import {message} from 'antd';
import { addGupiaoDingshi, editDingshi } from '@/services/ant-design-pro/api';
interface Props{
  visible: boolean;
  editItem: API.GupiaoDingshiListItem | undefined;
  handleModalVisible: (value: boolean) => void;
  submitok: () => void;
}

export default function EditModelDingshi(props:Props) {
  const editformRef = useRef<ProFormInstance>();
  const handleEdit = async (fields: API.GupiaoDingshiListItem) => {
    const hide = message.loading('正在编辑');
    try {
      await editDingshi({ ...fields, id: props.editItem?.id });
      message.success('编辑成功');
      return true;
    } catch (error) {
      hide();
      message.error('编辑失败，请核对好数据后再试一次');
      return false;
    }
  };
  useEffect(() => {
    if (editformRef.current) {
      editformRef.current.setFieldsValue({ ...props.editItem });
    }
  }, [props.editItem]);
  if (!props.editItem) {
    return <></>;
  }
  return (
    <ModalForm
      title={'编辑股票提醒'}
      width="400px"
      formRef={editformRef}
      visible={props.visible}
      onVisibleChange={props.handleModalVisible}
      // initialValues={props.editItem}
      onFinish={async (value) => {
        const success = await handleEdit(value as API.GupiaoDingshiListItem);
        if (success) {
          editformRef.current?.resetFields();
          props.submitok();
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
        disabled
          width="md"
          placeholder='请输入股票代码'
          name="code"
      />
      <ProFormText
        rules={[
          {
            required: true,
            message: '必填',
          },
        ]}
        label="时间"
        width="md"
        placeholder='请输入时间，格式如：14:50,必须是10分钟整除'
        name="timeStr"
      />
      <ProFormTextArea
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
      </ModalForm>
  );
}
