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
          importBill(value)
        }}
      >
        <ProFormUploadButton action={"/api/v1/importBill/"} name='file'></ProFormUploadButton>
        导入口袋记账记账数据:<br></br>
        1.在口袋记账设置中导出数据。<br></br>
        2.拿到数据后,用excle新建一个表格，打开导出数据，全选，复制，粘贴到新表格<br></br>
        3.保存为xls格式<br></br>
        4.点击导入按钮,选择刚刚保存的文件<br></br>
      </ModalForm>
  );
}
