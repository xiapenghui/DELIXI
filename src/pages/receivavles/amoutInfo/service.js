import request from '@/utils/request';

// export async function queryRule(params) {
//   return request('http://192.168.1.153:8080/other/api/OtherDictController', {
//     method: 'POST',
//     params,
//   });
// }
export async function queryRule(params) {

  return request('/api/bucketInfoQuery', {
    params,
  });
}

export async function updateInit(params) {

  return request('/api/bucketUpdateInit', {
    params,
  });
}
export async function updateRule(params) {
  return request('/api/bucketInfoUpdate', {
    method: 'PUT',
    data: { ...params, method: 'update' },
  });
}

export async function SearchInit(params) {
  return request('/api/bucketInfoSearchInit', {
    params,
  });
}


export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'delete' },
  });
}
export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}

