import { PlusOutlined } from '@ant-design/icons';
import { Button, message, } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { billlist,removeBill } from '@/services/ant-design-pro/api';
import { sum } from 'lodash';
import AddBillModel from './AddBillModel';
import EditBillModel from './EditBillModel';
const handleRemove = async (value: API.BillListItem) => {
  const hide = message.loading('正在删除');
  if (!value) return true;
  try {
    const success = await removeBill({
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
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.BillListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.BillListItem[]>([]);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<API.BillListItem>[] = [
    {
      title: '账单ID',
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
      title: '分类',
      dataIndex: 'category',
      valueType: 'textarea',
    },
    {
      title: '金额',
      dataIndex: 'moneyCount',
      valueType: 'textarea',
      search:false,
    },
    {
      title: '收入/支出',
      dataIndex: 'type',
      valueEnum: {
        '': { text: '全部', status: 'Default' },
        1: { text: '收入', status: 'Default' },
        0: { text: '支出', status: 'Processing' },
      },
      render: (dom, entity) => {
        return entity.type===1?"收入":'支出';
      },
    },
    {
      title: '描述',
      dataIndex: 'description',
      valueType: 'textarea',
      search:false,
    },
    
    {
      title: '使用时间',
      dataIndex: 'usedate',
      valueType: 'date',
    },
    {
      title: '最近修改时间',
      dataIndex: 'mod_date',
      search:false,
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
      <ProTable<API.BillListItem, API.PageParams>
        headerTitle={'账单列表'}
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
          </Button>,
        ]}
        request={billlist}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
              &nbsp;&nbsp;
              合计:{sum(selectedRowsState.map(i => {
                 if(i.type===0){
                   return 0-parseFloat(i.moneyCount);
                 }else{
                  return i.moneyCount;
                 }
                }
                 ))}
            </div>
          }
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
      <AddBillModel visible={createModalVisible} handleModalVisible={handleModalVisible} submitok={()=>{
        handleModalVisible(false);
        if (actionRef.current) {
          actionRef.current.reload();
        }
      }}></AddBillModel>
      <EditBillModel editItem={currentRow} visible={updateModalVisible} handleModalVisible={handleUpdateModalVisible} submitok={()=>{
        handleUpdateModalVisible(false);
        if (actionRef.current) {
          actionRef.current.reload();
        }
      }}></EditBillModel>
      
    </PageContainer>
  );
};

export default TableList;
