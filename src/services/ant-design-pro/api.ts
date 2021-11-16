// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<API.UserInfo>('/api/v1/getCurUser/', {
    method: 'GET',
    ...(options || {}),
  });
}


/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.UserInfo>('/api/v1/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
/** 退出登录接口 POST /api/v1/logout/ */
export async function logout() {
  return request<API.UserInfo>('/api/v1/logout/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {}
  });
}
/** 获取用户列表 GET /api/v1/userlist */
export async function userlist(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.UserItem>('/api/v1/userlist/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
/** 新建用户 POST /api/v1/addUser/ */
export async function addUser(options?: { [key: string]: any }) {
  return request('/api/v1/addUser/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: options,
    ...(options || {}),
  });
}
/** 删除用户 POST /api/v1/deleteUser/ */
export async function deleteUser(options?: { [key: string]: any }) {
  return request('/api/v1/deleteUser/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: options,
    ...(options || {}),
  });
}
/** 编辑用户 POST /api/v1/editUser/ */
export async function editUser(options?: { [key: string]: any }) {
  return request<API.BillListItem>('/api/v1/editUser/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: options,
    ...(options || {}),
  });
}
/** 获取账单列表 GET /api/v1/bill */
export async function billlist(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.BillListItem>('/api/v1/bill/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
/** 新建账单 POST /api/v1/addBill/ */
export async function addBill(options?: { [key: string]: any }) {
  return request<API.BillListItem>('/api/v1/addBill/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: options,
    ...(options || {}),
  });
}
/** 编辑账单 POST /api/v1/updateBill/ */
export async function editBill(options?: { [key: string]: any }) {
  return request<API.BillListItem>('/api/v1/updateBill/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: options,
    ...(options || {}),
  });
}
/** 删除账单 POST /api/v1/deleteBill/ */
export async function removeBill(options?: { [key: string]: any }) {
  return request('/api/v1/deleteBill/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: options,
    ...(options || {}),
  });
}

/** 获取账单列表 GET /api/v1/getDataByCategory */
export async function getDataByCategory(
  params: {
    date?:string;
    type?:number
  },
  options?: { [key: string]: any },
) {
  return request<API.BillListItem>('/api/v1/getDataByCategory/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
/** 获取当月账单趋势 GET /api/v1/getDataByUsedate */
export async function getDataByUsedate(
  params: {
    date?:string;
    type?:number
  },
  options?: { [key: string]: any },
) {
  return request('/api/v1/getDataByUsedate/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
/** 编辑账单 POST /api/v1/importBill/ */
export async function importBill(options?: { [key: string]: any }) {
  return request('/api/v1/importBill/', {
    method: 'POST',
    data: options,
    ...(options || {}),
  });
}


/** 获取操作日志列表 GET /api/v1/audit */
export async function auditlist(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.AuditListItem>('/api/v1/audit/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
/** 获取基金动态列表 GET /api/v1/jijin/ */
export async function jijinlist(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.JijinItem>('/api/v1/jijin/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}