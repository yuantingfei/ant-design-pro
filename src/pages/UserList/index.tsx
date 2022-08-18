import { PlusOutlined } from '@ant-design/icons';
import { Button, message, } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { userlist,deleteUser } from '@/services/ant-design-pro/api';
import { sum } from 'lodash';
import AddUser from './AddUser';
import EditUser from './EditUser';
import ImportFile from './ImportFile';
import EditUserMoney from './EditUserMoney';
const handleRemove = async (value: API.UserItem) => {
  const hide = message.loading('正在删除');
  if (!value) return true;
  try {
    const success = await deleteUser({
      id: value.id,
    });
    hide();
    
    message.success('删除成功');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败');
    return false;
  }
};

const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [EditUserMoneyVisible, handleEditUserMoneyVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [ImportModalVisible, handleImportModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.UserItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.UserItem[]>([]);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<API.UserItem>[] = [
    {
      title: '用户ID',
      dataIndex: 'id',
      key:'id',
      search:false,
      render: (dom, entity) => {
        return (
          entity.id
        );
      },
    },
    {
      title: '用户名',
      dataIndex: 'username',
      valueType: 'textarea',
    },
    {
      title: '电话',
      dataIndex: 'telphtone',
      valueType: 'textarea',
    },
    {
      title: '描述',
      dataIndex: 'description',
      valueType: 'textarea',
      search:false
    },
    {
      title: '账户余额',
      dataIndex: 'moneyCount',
      valueType: 'textarea',
      search:false
    },
    {
      title: '创建时间',
      dataIndex: 'created',
      valueType: 'textarea',
      search:false
    },
    {
      title: '最近登录时间',
      dataIndex: 'logintime',
      valueType: 'textarea',
      search:false
    },
    {
      title:'操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            setCurrentRow(record);
            handleUpdateModalVisible(true)
          }}
        >
          编辑
        </a>,
        <a
          key="config"
          onClick={() => {
            setCurrentRow(record);
            handleEditUserMoneyVisible(true);
          }}
        >
          编辑账户余额
        </a>,
        // <a key="subscribeAlert" href="https://procomponents.ant.design/">
        //   查看文档
        // </a>,
        <a key="subscribeAlert" onClick={() => {
          handleRemove(record)
          actionRef.current.reload();
        }} >
          删除
        </a>
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.UserItem, API.PageParams>
        headerTitle={'用户列表'}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>
        ]}
        request={userlist}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
        >
          <Button
            onClick={async () => {
              for (let index = 0; index < selectedRowsState.length; index++) {
                const element = selectedRowsState[index];
                await handleRemove(element);
              }
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
        </FooterToolbar>
      )}
      <AddUser visible={createModalVisible} handleModalVisible={handleModalVisible} submitok={()=>{
        handleModalVisible(false);
        if (actionRef.current) {
          actionRef.current.reload();
        }
      }}></AddUser>
      <EditUser editItem={currentRow} visible={updateModalVisible} handleModalVisible={handleUpdateModalVisible} submitok={()=>{
        handleUpdateModalVisible(false);
        if (actionRef.current) {
          actionRef.current.reload();
        }
      }}></EditUser>
      <EditUserMoney editItem={currentRow} visible={EditUserMoneyVisible} handleModalVisible={handleEditUserMoneyVisible} submitok={() => {
        handleEditUserMoneyVisible(false);
        if (actionRef.current) {
          actionRef.current.reload();
        }
      }}></EditUserMoney>
      <ImportFile visible={ImportModalVisible} handleModalVisible={handleImportModalVisible} submitok={()=>{
        handleImportModalVisible(false);
        if (actionRef.current) {
          actionRef.current.reload();
        }
      }}></ImportFile>
      
    </PageContainer>
  );
};

export default TableList;
