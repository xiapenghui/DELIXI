import request from '@/utils/request';

import globalConfig from '../../../config/defaultSettings';
const url = `${globalConfig.ip}:${globalConfig.port.yshyerp_receivables}/yshyerp-receivables/api`
/**
 * 查询条件初始化
 */
export async function getDropDownInit() {
  return request(`${url}/vwreceivables/getDropDownInit`, {
    method: 'GET'
  });
}

// /**
//  * 根据合同号带出到期时间(查询)
//  */
// export async function getBycontract_i(params) {
//   return request(`http://192.168.1.155:8080/yshyerp-receivables/api/vwamount/getBycontracti/${params}`, {
//     method: 'GET'
//   });
// }

// /**
//  * 根据服务内容带出单位(查询)
//  */
// export async function getbyName(params) {
//   return request(`http://192.168.1.155:8080/yshyerp-receivables/api/vwamount/getbyName`, {
//     method: 'POST',
//     data:params
//   });
// }

/**
 * 查询
 */
export async function postListInit(params) {
  return request(`${url}/vwreceivables/postListInit`, {
    method: 'POST',
    data: { ...params },
  });
}
// /**
//  * 删除
//  */
// export async function deleted(params) {
//   return request('http://192.168.1.155:8080/yshyerp-receivables/api/amount/delete', {
//     method: 'DELETE',
//     data: { ...params },
//   });
// }
/**
 * 新建初始化
 */
export async function getAddDropDownInit() {
  return request(`${url}/vwreceivables/getAddDropDownInit`, {
    method: 'GET'
  });
}
/**
 * 新建保存 
 */
export async function addPost(params) {
      return request(`${url}/vwreceivables/addPost`, {
        method: 'POST',
        data: { ...params },
      });
    }
// export async function addPost(params) {
//   return request('http://192.168.1.211:8082/yshyerp-adm/api/commodity/addPost', {
//     method: 'POST',
//     data: { ...params },
//   });
// }
/**
 * 编辑初始化
 */
export async function getVwreceivablesById(params) {
  return request(`${url}/vwreceivables/getVwreceivablesById/${params}`, {
    method: 'GET'
  });
}
/**
 * 编辑保存
 */
export async function updatePut(params) {
  return request(`${url}/receivables/updatePut`, {
    method: 'PUT',
    data: { ...params },
  });
}



/**
 * 修改状态保存(0未审核改10已审核)
 */
export async function updateByIdshenhe(params) {
  return request(`${url}/receivables/updatePut`, {
    method: 'PUT',
    data: { ...params },
  });
}


/**
 * 修改状态保存(0未审核改20预估)
 */
export async function updateREceivablesByyug(params) {
  return request(`${url}/receivables/updateREceivablesByyug`, {
    method: 'PUT',
    data: { ...params },
  });
}
/**
 * 编辑保存(加收和减免费用)
 */
export async function updateReceivablesByIddca(params) {
  return request(`${url}/receivables/updateReceivablesByIddca`, {
    method: 'PUT',
    data: { ...params },
  });
}
/**
 * 详情
 */
export async function getDetail(params) {
  return request(`${url}/vwreceivables/getDetail/${params}`, {
    method: 'GET'
  });
}



