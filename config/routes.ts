﻿export default [
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
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
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
    component: './BillAnalysis/BillAnalysis'
  },
  {
    name: '操作日志',
    icon: 'table',
    path: '/auditlist',
    component: './AuditList',
    
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
