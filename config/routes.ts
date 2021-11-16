export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    // component: './Admin',
    routes: [
      {
        path: '/admin/userList',
        name: '用户管理',
        icon: 'smile',
        component: './UserList/index',
      },
      {
        component: './404',
      },
    ],
  },
  // {
  //   name: 'list.table-list',
  //   icon: 'table',
  //   path: '/list',
  //   component: './TableList',
  // },

  {
    name: 'list.bill-list',
    icon: 'table',
    path: '/billlist',
    component: './BillList',
  },
  {
    name: '账单分析',
    icon: 'table',
    path: '/billAnalysis',
    routes: [
      {
        path: '/billAnalysis/weekPage',
        name: '周账单分析',
        icon: 'smile',
        component: './BillAnalysis/WeekBillAnalysis',
      },
      {
        path: '/billAnalysis/monthPage',
        name: '月账单分析',
        icon: 'smile',
        component: './BillAnalysis/MonthBillAnalysis',
      },
      {
        path: '/billAnalysis/yearPage',
        name: '年账单分析',
        icon: 'smile',
        component: './BillAnalysis/YearBillAnalysis',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: '操作日志',
    icon: 'table',
    path: '/auditlist',
    component: './AuditList',
  },
  {
    name: '基金动态',
    icon: 'table',
    path: '/jijinlist',
    component: './JijinList',
    
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
