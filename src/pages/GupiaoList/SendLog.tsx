import { PlusOutlined } from '@ant-design/icons';
import { Button, message, } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { listSendLog, deleteDingshi } from '@/services/ant-design-pro/api';
import AddModelDingshi, { opList } from './AddModelDingshi';
import EditModelDingshi from './EditModelDingshi';
const handleRemove = async (value: API.SendLogListItem) => {
  const hide = message.loading('正在删除');
  if (!value) return true;
  try {
    const success = await deleteDingshi({
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

const SendLog: React.FC = () => {
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
  const [currentRow, setCurrentRow] = useState<API.SendLogListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.SendLogListItem[]>([]);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<API.SendLogListItem>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      search: false,
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
      title: '类型',
      dataIndex: 'type',
      valueType: 'textarea',
      search: false,
      render: (dom, entity) => {
        return (
          entity.type==='yujing'?'预警提醒':'定时提醒'
        );
      },
    },
    {
      title: '提醒时间',
      dataIndex: 'add_date',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '机器人URL',
      dataIndex: 'url',
      valueType: 'textarea',
      copyable: true,
      search: false,
    },
    // {
    //   title: '提醒文本',
    //   dataIndex: 'text',
    //   valueType: 'textarea',
    //   copyable: true,
    //   search: false,
    // },
  ];

  return (
    <PageContainer>
      <ProTable<API.SendLogListItem, API.PageParams>
        headerTitle={'提醒日志列表'}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
        ]}
        request={listSendLog}
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
    </PageContainer>
  );
};

export default SendLog;
