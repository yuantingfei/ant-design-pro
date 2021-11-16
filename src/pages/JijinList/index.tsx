import { PlusOutlined } from '@ant-design/icons';
import { Button, message, } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { jijinlist,removeBill } from '@/services/ant-design-pro/api';
import { sum } from 'lodash';
import moment from 'moment';
const handleRemove = async (value: API.JijinItem) => {
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
  const [ImportModalVisible, handleImportModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.JijinItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.JijinItem[]>([]);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();
  const columns: ProColumns<API.JijinItem>[] = [
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
      title: '基金名称',
      dataIndex: 'name',
      valueType: 'textarea',
      search:false
    },
    {
      title: '基金代号',
      dataIndex: 'code',
      valueType: 'textarea',
      search:false
    },
    {
      title: '当前净值',
      dataIndex: 'dqjz',
      valueType: 'textarea',
      search:false
    },
    {
      title: '当前涨幅(比上个交易日)',
      dataIndex: 'value',
      valueType: 'textarea',
      search:false,
      render: (dom, entity) => {
        if(parseFloat(entity.value)>0){
          return <span style={{color:"red"}}>{entity.value}</span>
        }else{
          return <span style={{color:"green"}}>{entity.value}</span>
        }
      },
    },
    {
      title: '昨天净值',
      dataIndex: 'ztjz',
      valueType: 'textarea',
      search:false
    },
    {
      title: '昨天涨幅(比上个交易日)',
      dataIndex: 'ztzf',
      valueType: 'textarea',
      search:false
    },
    {
      title: '更新时间',
      dataIndex: 'timeStr',
      valueType: 'textarea',
      search:false
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.JijinItem, API.PageParams>
        headerTitle={'操作日志列表'}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
        ]}
        request={jijinlist}
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
      
    </PageContainer>
  );
};

export default TableList;
