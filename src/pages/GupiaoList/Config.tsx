import { PlusOutlined } from '@ant-design/icons';
import { Button, message, } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { listConfig,removeGupiaoConfig } from '@/services/ant-design-pro/api';
import AddModelConfig, { opList } from './AddModelConfig';
import EditModelConfig from './EditModelConfig';
const handleRemove = async (value: API.GupiaoConfigListItem) => {
  const hide = message.loading('正在删除');
  if (!value) return true;
  try {
    const success = await removeGupiaoConfig({
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
export const statusList = [
  {
    value: 1,
    label: '未提醒'
  },
  {
    value: 0,
    label: '已提醒'
  }
];
const UserList: React.FC = () => {
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
  const [ImportModalVisible, handleImportModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.GupiaoConfigListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.GupiaoConfigListItem[]>([]);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<API.GupiaoConfigListItem>[] = [
    {
      title: 'ID',
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
      title: '股票代码',
      dataIndex: 'code',
      valueType: 'textarea',
      copyable: true,
      search: true
    },
    {
      title: '操作符号',
      dataIndex: 'op',
      // search: false,
      render: (_, record) => {
        let opss = opList.filter(i => {
          return i.value ===record.op
        })[0]
        return <>
          {opss.label}
        </>;
      },
      valueEnum: {
        ">": {
          text: '百分比大于',
        },
        '<': {
          text: '百分比小于',
        },
        '<value': {
          text: '当前价格小于',
        },
        '>value': {
          text: '当前价格大于',
        }
      },
    },
    {
      title: '值',
      dataIndex: 'value',
      valueType: 'textarea',
      search:false,
    },
    {
      title: '提醒次数',
      dataIndex: 'times',
      valueType: 'textarea',
      search:false,
    },
    {
      title: '已经提醒次数',
      dataIndex: 'timesUsed',
      valueType: 'textarea',
      search:false,
    },
    {
      title: '机器人URL',
      dataIndex: 'url',
      valueType: 'textarea',
      copyable: true,
      search:false,
    },
    {
      title: '最近修改时间',
      dataIndex: 'mod_date',
      search:false,
    },
    {
      title: '新增时间',
      dataIndex: 'add_date',
      search:false,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        0: {
          text: '已提醒',
        },
        1: {
          text: '未提醒',
        }
      },
      render: (_, record) => {
        let opss = statusList.filter(i => {
          return i.value === record.status;
        })[0];
        return <>
          {opss.label}
        </>;
      },
    },
    {
      title:'操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
      return <>
        {record.timesUsed < record.times &&
            <a key="subscribeAlert" onClick={() => {
            handleRemove(record)
            actionRef.current.reload();
          }}>删除</a >}
        { record.timesUsed < record.times &&
          <Button
            type='link'
            style={{ marginLeft: '10px' }}
            key="config"
            onClick={() => {
              setCurrentRow(record);
              handleUpdateModalVisible(true);
            }}
          >
            编辑
          </Button>}
      </>
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.GupiaoConfigListItem, API.PageParams>
        headerTitle={'预警提醒配置列表'}
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
          <Button
          type="primary"
          key="primary"
          onClick={() => {
            console.log(3434)
            handleImportModalVisible(true);
          }}
        >
        </Button>,
        ]}
        request={listConfig}
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
              
            </div>
          }
        >
          {/* <Button
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
          </Button> */}
        </FooterToolbar>
      )}
      <AddModelConfig visible={createModalVisible} handleModalVisible={handleModalVisible} submitok={()=>{
        handleModalVisible(false);
        if (actionRef.current) {
          actionRef.current.reload();
        }
      }}></AddModelConfig>
      <EditModelConfig editItem={currentRow} visible={updateModalVisible} handleModalVisible={handleUpdateModalVisible} submitok={() => {
        handleUpdateModalVisible(false);
        if (actionRef.current) {
          actionRef.current.reload();
        }
      }}></EditModelConfig>
      
    </PageContainer>
  );
};

export default UserList;
