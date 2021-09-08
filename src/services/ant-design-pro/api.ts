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
