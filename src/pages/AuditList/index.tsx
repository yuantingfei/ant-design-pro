import { PlusOutlined } from '@ant-design/icons';
import { Button, message, } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { auditlist,removeBill } from '@/services/ant-design-pro/api';
import { sum } from 'lodash';
import AddBillModel from './AddBillModel';
import EditBillModel from './EditBillModel';
import ImportFile from './ImportFile';
import moment from 'moment';
const handleRemove = async (value: API.AuditListItem) => {
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
  const [currentRow, setCurrentRow] = useState<API.AuditListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.AuditListItem[]>([]);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<API.AuditListItem>[] = [
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
      title: '模块',
      dataIndex: 'module',
      valueType: 'textarea',
      search:false
    },
    {
      title: '操作IP',
      dataIndex: 'source_ip',
      valueType: 'textarea',
      search:false
    },
    {
      title: '描述',
      dataIndex: 'description',
      valueType: 'textarea',
    },
    
    {
      title: '操作时间',
      dataIndex: 'stat_time',
      search:false,
      render: (dom, entity) => {
        return (
          moment(entity.stat_time).format("YYYY-MM-DD HH:mm:ss")
        );
      },
    }
  ];

  return (
    <PageContainer>
      <ProTable<API.AuditListItem, API.PageParams>
        headerTitle={'操作日志列表'}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
        ]}
        request={auditlist}
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
