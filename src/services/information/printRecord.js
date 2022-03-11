import request from '@/utils/request';
import globalConfig from '../../../config/defaultSettings';
const ip = `${globalConfig.ip}:${globalConfig.port.sspalds_role}`;

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
export async function postListInit(params) {
  return request(`${ip}/DLX_OEM/api/printInfoRecord/getPrintInfoRecordList`, {
    method: 'POST',
    data: { ...params },
  });
}



 

 



 