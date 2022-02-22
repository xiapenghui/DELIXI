import request from '@/utils/request';
import globalConfig from '../../../config/defaultSettings';
// const ip = `${globalConfig.ip}:${globalConfig.port.yshyerp_adm}/yshyerp-adm/api/customer`
// const ip = `${globalConfig.ip}:${globalConfig.port.yshyerp_sspa}`
const ip = `http://192.168.1.18:23111`

/**
 * 查询条件初始化
 */
export async function getDropDownInit(params) {
  return request(`${ip}/WebAPI/api/Common/GetProductAreaTextValuePair`, {
    method: 'POST',
    data: { ...params },
  });
}

/**
 * 查询
 */

export async function tankSearch(params) {
  return request(`${ip}/WebAPI/api/KpiLine/List`, {
    method: 'POST',
    data: { ...params },
  });
}


export async function tankSearch1(params) {
  return request(`${ip}/WebAPI/api/lineoeekpi/ListArea`, {
    method: 'POST',
    data: { ...params },
  });
}




 

 

 
 



 