// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    name?: string;
    avatar?: string;
    userid?: string;
    email?: string;
    signature?: string;
    title?: string;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    address?: string;
    phone?: string;
  };

  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
  };
  type UserInfo = {
    description?: string;
    id?: number;
    telphtone?: string;
    username?: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };
  type UserItem = {
    id?: number;
    username?: string;
    telphtone?: string;
    usedate?: string;
    description?: string;
  };
  type BillListItem = {
    id?: number;
    category?: boolean;
    moneyCount?: string;
    description?: string;
    usedate?: string;
    mod_date?: string;
    add_date?: string;
    type?: number;
  };
  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
  type AuditListItem = {
    id?: number;
    source_ip?: string;
    module?: string;
    description?: string;
    level0?: string;
    stat_time?: string;
    account_name?: string;
  };
  type JijinItem = {
    id?: number;
    "week": string;
    "code": string;
    "name": string;
    "dqjz": string;
    "month3": string;
    "number": number;
    "value": string;
    "month": string;
    "ztjz": string;
    "month6": string;
    "year": string;
    "timeStr": string;
    "year3": string;
    "year2": string;
    "ztzf": string;
    "overyear": string;
  };
  type JijinHistoryItem = {
    id?: number;
    "code":string;
    "zf":string;
    "ljvalue":string;
    "value":string;
    "timeStr":string;
  };
  type LinkListItem = {
    id?: number;
    text?: string;
    url?: string;
    mod_date?: string;
    add_date?: string;
    type?: number;
  };
  type GupiaoListItem = {
    id?: number;
    code?: string;
    name?: string;
    mod_date?: string;
    add_date?: string;
    value?: string;
  };
  type GupiaoConfigListItem = {
    id?: number;
    code?: string;
    value?: string;
    op?: string;
    mod_date?: string;
    add_date?: string;
    userinfoId?: number;
    url?: string;
    times?: number;
    timesUsed?: number;
    status?: number;
  };
  type GupiaoDingshiListItem = {
    id?: number;
    code?: string;
    timeStr?: string;
    mod_date?: string;
    add_date?: string;
    userinfoId?: number;
    url?: string;
  };
  type SendLogListItem = {
    id?: number;
    code?: string;
    timeStr?: string;
    mod_date?: string;
    add_date?: string;
    type?: string;
    userinfoId?: number;
    text?: string;
    configtext?: string;
    url?: string;
  };
}
  
