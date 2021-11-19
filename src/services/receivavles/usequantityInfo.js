import request from '@/utils/request';
import globalConfig from '../../../config/defaultSettings';
const url = `${globalConfig.ip}:${globalConfig.port.yshyerp_receivables}/yshyerp-receivables/api`

/**
 * 查询条件初始化
 */
export async function getDropDownInit() {
  return request(`${url}/vwusequantity/getDropDownInit`, {
    method: 'GET'
  });
}


/**
 * 根据客户带出合同号和到期时间(查询)
 * 
 */
export async function getBycustomer(params) {
  return request(`${url}/vwusequantity/getBycustomer`, {
    method: 'POST',
    data: { ...params },
  });
}

/**
 * 根据合同号带出服务项目id(查询)
 * 
 */
export async function getBybillid(params) {
  return request(`${url}/vwusequantity/getBybillid/${params}`, {
    method: 'GET'
  });
}

/**
 * 根据服务内容带出单位,单价,罐号(查询)
 */
export async function getbyname(params) {
  return request(`${url}/vwusequantity/getbyname`, {
    method: 'POST',
    data: { ...params },
  });
}

/**
 * 根据合同号带出到期时间(查询)
 */
// export async function getBycontract_i(params) {
//   return request(`http://localhost:8080/yshyerp-receivables/api/vwusequantity/getBycontract_i/${params}`, {
//     method: 'GET'
//   });
// }

/**
 * 根据服务内容带出单位(查询)
 */
export async function getbyName(params) {
  return request(`${url}/vwusequantity/getbyName`, {
    method: 'POST',
    data:params
  });
}
/**
 * 查询
 */
export async function postListInit(params) {
  return request(`${url}/vwusequantity/postListInit`, {
    method: 'POST',
    data: { ...params },
  });
}
/**
 * 删除
 */
export async function   deleted(params) {
  return request(`${url}/usequantity/delete`, {
    method: 'DELETE',
    data: { ...params },
  });
}
/**
 * 新建初始化
 */
export async function getAddDropDownInit() {
  return request(`${url}/commodity/getAddDropDownInit`, {
    method: 'GET'
  });
}
/**
 * 新建保存 
 */
export async function addPost(params) {
      return request(`${url}/usequantity/addPost`, {
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
export async function getVusequantityById(params) {
  return request(`${url}/vwusequantity/getVusequantityById/${params}`, {
    method: 'GET'
  });
}
/**
 * 编辑保存
 */
export async function updatePut(params) {
  return request(`${url}/usequantity/updatePut`, {
    method: 'PUT',
    data: { ...params },
  });
}
/**
 * 详情
 */
export async function getDetail(params) {
  return request(`${url}/commodity/getDetail/${params}`, {
    method: 'GET'
  });
}



