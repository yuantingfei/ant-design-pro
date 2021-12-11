import { PlusOutlined } from '@ant-design/icons';
import { Button, message, } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { jijinListHistory,deleteCode, jijinlist } from '@/services/ant-design-pro/api';
import { sum } from 'lodash';
import moment from 'moment';
import AddCodeModel from './AddCodeModel';
const handleRemove = async (value: API.JijinHistoryItem) => {
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
  const [Code, setCode] = useState(320007);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.JijinHistoryItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.JijinHistoryItem[]>([]);
  const [codeList, setcodeList] = useState([])
  const [columns, setcolumns] = useState<ProColumns<API.JijinHistoryItem>[]>([])
  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();
  useEffect(() => {
    
    // jijinlist({
    //   current:1,
    //   pageSize:1000
    // }).then(res=>{
    //   console.log(res)
    //   let tmp = []
    //   for (let i = 0; i < res.data.length; i++) {
    //     const element = res.data[i];
    //     tmp[element.code]=element.code
    //   }
    //   console.log(tmp)
    //   console.log()
    //   setcodeList(tmp)
    // })
  }, [])
  useEffect(() => {
    const tmp: ProColumns<API.JijinHistoryItem>[] = [
      // {
      //   title: 'ID',
      //   dataIndex: 'id',
      //   key:'id',
      //   search:false,
      //   render: (dom, entity) => {
      //     return (
      //       entity.id
      //     );
      //   },
      // },
      {
        title: '基金代号',
        dataIndex: 'code',
        search:false
      },
      {
        title: '单位净值',
        dataIndex: 'value',
        valueType: 'textarea',
        search:false
      },
      {
        title: '累计净值',
        dataIndex: 'ljvalue',
        valueType: 'textarea',
        search:false
      },
      {
        title: '涨幅(比上个交易日)',
        dataIndex: 'zf',
        valueType: 'textarea',
        search:false,
        render: (dom, entity) => {
          if(parseFloat(entity.value)>0){
            return <span style={{color:"red"}}>{entity.zf}</span>
          }else{
            return <span style={{color:"green"}}>{entity.zf}</span>
          }
        },
      },
      {
        title: '时间',
        dataIndex: 'timeStr',
        valueType: 'textarea',
        search:true
      },
      // {
      //   title:'操作',
      //   dataIndex: 'option',
      //   valueType: 'option',
      //   render: (_, record) => [
      //     <a key="subscribeAlert" onClick={() => {
      //       handleRemove(record)
      //       actionRef.current.reload();
      //     }} >
      //       不在关注
      //     </a>
      //   ],
      // },
    ];
    setcolumns(tmp)
  }, [codeList])
  
  const jijinListHistoryAction=(params,option)=>{
    console.log(params)
    params.code = Code
    return jijinListHistory(params,option)
  }
  return (
    <PageContainer>
      <ProTable<API.JijinHistoryItem, API.PageParams>
        headerTitle={'基金代号:'+Code+'的历史数据'}
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
        request={jijinListHistoryAction}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
    </PageContainer>
  );
};

export default TableList;
