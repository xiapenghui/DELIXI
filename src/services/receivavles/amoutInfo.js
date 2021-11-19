import request from '@/utils/request';


import globalConfig from '../../../config/defaultSettings';
const url = `${globalConfig.ip}:${globalConfig.port.yshyerp_receivables}/yshyerp-receivables/api`
// const path = "http://localhost:8080/";
// const TableName = 'drums'

/**
 * 查询条件初始化
 */
export async function getDropDownInit() {
  return request(`${url}/vwamount/getDropDownInit`, {
    method: 'GET'
  });
}

/**
 * 根据客户带出合同号和到期时间(查询)
 * 
 */
export async function getBycustomer(params) {
  return request(`${url}/vwamount/getBycustomer`, {
    method: 'POST',
    data: { ...params },
  });
}

/**
 * 根据合同号带出服务项目id(查询)
 * 
 */
export async function getBybillid(params) {
  return request(`${url}/vwamount/getBybillid/${params}`, {
    method: 'GET'
  });
}

/**
 * 根据服务内容带出单位,单价(查询)
 */
export async function getbyname(params) {
  return request(`${url}/vwamount/getbyname`, {
    method: 'POST',
    data: { ...params },
  });
}

/**
 * 根据合同号带到期时间(查询)
 * 
 */
export async function getBycontract_i(params) {
  return request(`${url}/vwamount/getBycontract_i/${params}`, {
    method: 'GET'
  });
}


/**
 * 查询
 */
export async function postListInit(params) {
  return request(`${url}/vwamount/postListInit`, {
    method: 'POST',
    data: { ...params },
  });
}
/**
 * 删除
 */
export async function deleted(params) {
  return request(`${url}/amount/delete`, {
    method: 'DELETE',
    data: { ...params },
  });
}
/**
 * 新建初始化
 */
export async function getAddDropDownInit() {
  return request(`${url}/amount/getAddDropDownInit`, {
    method: 'GET'
  });
}
/**
 * 新建保存 
 */
export async function addPost(params) {
      return request(`${url}/amount/addPost`, {
        method: 'POST',
        data: { ...params },
      });
    }
/**
 * 编辑初始化
 */
export async function getVwamountById(params) {
  return request(`${url}/vwamount/getVwamountById/${params}`, {
    method: 'GET'
  });
}
/**
 * 编辑保存
 */
export async function updatePut(params) {
  return request(`${url}/amount/updatePut`, {
    method: 'PUT',
    data: { ...params },
  });
}
/**
 * 详情
 */
export async function getDetail(params) {
  return request(`${url}/amount/getDetail/${params}`, {
    method: 'GET'
  });
}



