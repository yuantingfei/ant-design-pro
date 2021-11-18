import { PlusOutlined } from '@ant-design/icons';
import { Button, message, } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { jijinlistmy,deleteCode } from '@/services/ant-design-pro/api';
import { sum } from 'lodash';
import moment from 'moment';
import AddCodeModel from './AddCodeModel';
const handleRemove = async (value: API.JijinItem) => {
  const hide = message.loading('正在删除');
  if (!value) return true;
  try {
    const success = await deleteCode({
      code: value.code,
    });
    hide();
    
    message.success('取消关注成功');
    return true;
  } catch (error) {
    hide();
    message.error('取消关注失败');
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
      search:true
    },
    {
      title: '基金代号',
      dataIndex: 'code',
      valueType: 'textarea',
      search:true
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
    {
      title:'操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a key="subscribeAlert" onClick={() => {
          handleRemove(record)
          actionRef.current.reload();
        }} >
          不在关注
        </a>
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.JijinItem, API.PageParams>
        headerTitle={'我关注基金列表'}
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
        request={jijinlistmy}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      <AddCodeModel visible={createModalVisible} handleModalVisible={handleModalVisible} submitok={()=>{
        handleModalVisible(false);
        if (actionRef.current) {
          actionRef.current.reload();
        }
      }}></AddCodeModel>
    </PageContainer>
  );
};

export default TableList;
