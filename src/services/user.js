import request from '@/utils/request';

import globalConfig from '../../config/defaultSettings';
const path = `${globalConfig.ip}:${globalConfig.port.sspalds_role}/sspalds-role`
// const path = "http://10.208.2.111:8072/sspalds-role";
// const path = "http://192.168.1.221:8072/sspalds-role";
// const path = "http://192.168.1.151:8072/sspalds-role";
export async function query() {
  return request('/api/users');
}
export async function queryCurrent() {
  // return request(`${path}/api/login/currentUser`
  // );
  return request(`${path}/api/login/currentUser`, {
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization':`Bearer ${localStorage.getItem('user_token')}`
    },
    method: 'GET',
  });
  // return request(`/api/currentUser`);
}

export async function getMenuListByUserId(params) {
  return request(`${path}/api/login/GetMenuListByUserId/${params}`);
}

export async function updatePassword(params) {
  return request(`${path}/api/login/updatePassword`, {
    method: 'POST',
    data: { ...params },
  });
}

export async function queryNotices() {
  return request('/api/notices');
}


