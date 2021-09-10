import { ModalForm, ProFormDatePicker, ProFormInstance, ProFormSelect, ProFormText, ProFormTextArea, ProFormUploadButton } from '@ant-design/pro-form';
import React, { useRef,useEffect } from 'react';
import {message} from 'antd';
import {importBill } from '@/services/ant-design-pro/api';
interface Props{
    visible: boolean;
    handleModalVisible: (value: boolean) => void;
    submitok: () => void;
}

export default function ImportFile(props:Props) {
    const editformRef = useRef<ProFormInstance>();
  return (
    <ModalForm
        title={'导入账单'}
        width="400px"
        formRef={editformRef}
        visible={props.visible}
        onVisibleChange={props.handleModalVisible}
        initialValues={{}}
        onFinish={async (value) => {

          console.log(value)
          importBill(value)
          
        }}
      >
        <ProFormUploadButton action={"/api/v1/importBill/"} name='file'></ProFormUploadButton>
      </ModalForm>
  );
}
