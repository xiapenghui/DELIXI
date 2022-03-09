import request from '@/utils/request';
import globalConfig from '../../../config/defaultSettings';
const ip = `${globalConfig.ip}:${globalConfig.port.sspalds_role}`;


/**
 * 查询条件初始化
 */
export async function getDropDownInit() {
  return request(`${ip}/DLX_OEM/api/printRecord/getDropDownInit`, {
    method: 'GET',
  })
}

/**
 * 查询
 */


 //只码
export async function getOnlyBarCodeList(params) {
  return request(`${ip}/DLX_OEM/api/printRecord/getOnlyBarCodeList`, {
    method: 'POST',
    data: { ...params },
  });
}



 //盒码
 export async function getBoxBarCodeList(params) {
  return request(`${ip}/DLX_OEM/api/printRecord/getBoxBarCodeList`, {
    method: 'POST',
    data: { ...params },
  });
}



 //箱码
 export async function getBigBoxBarCodeList(params) {
  return request(`${ip}/DLX_OEM/api/printRecord/getBigBoxBarCodeList`, {
    method: 'POST',
    data: { ...params },
  });
}


 

 

 
 



 