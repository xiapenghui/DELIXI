import request from '@/utils/request';
import globalConfig from '../../../config/defaultSettings';
// const ip = `${globalConfig.ip}:${globalConfig.port.yshyerp_adm}/yshyerp-adm/api/customer`
const ip = `${globalConfig.ip}:${globalConfig.port.yshyerp_sspa}`

 

/**
 * 查询
 */

export async function getDepartement() {
  return request(`${ip}/WebAPI/api/Common/GetDepartmentIdText`, {
    method: 'POST'
  });
}



export async function postListInit(params) {
  return request(`${ip}/WebAPI/api/TimeManHours/Confirmation`, {
    method: 'POST',
    data: { ...params },
  });
}

 
// 确认
export async function Agree(params) {
  return request(`${ip}/WebAPI/api/TimeManHours/Agree`, {
    method: 'POST',
    data: { ...params },
  });
}

 
// 否定
export async function Negative(params) {
  return request(`${ip}/WebAPI/api/TimeManHours/Negative`, {
    method: 'POST',
    data: { ...params },
  });
}

 
 // 明细
export async function ConfirmationDetail(params) {
  return request(`${ip}/WebAPI/api/TimeManHours/ConfirmationDetail`, {
    method: 'POST',
    data: { ...params },
  });
}


 
 



 
