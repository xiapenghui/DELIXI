import request from '@/utils/request';
import globalConfig from '../../../config/defaultSettings';
const ip = `${globalConfig.ip}:${globalConfig.port.sspalds_role}`;

/**
 * 查询条件初始化
 */
export async function getDropDownInit(params) {
  return request(`${ip}/DLX_OEM/api/Common/GetProductAreaTextValuePair`, {
    method: 'POST',
    data: { ...params },
  });
}
/**
 * 查询
 */
export async function postListInit(params) {
  return request(`${ip}/DLX_OEM/api/material/postListInit`, {
    method: 'POST',
    data: { ...params },
  });
}



/**
 * 新建保存
 */
 export async function addPost(params) {
  return request(`${ip}/DLX_OEM/api/OrgShift/Add`, {
    method: 'POST',
    data: { ...params },
  });
}


/**
 * 编辑保存
 */
 export async function updatePut(params) {
  return request(`${ip}/DLX_OEM/api/OrgShift/Modify`, {
    method: 'POST',
    data: { ...params },
  });
}
 


/**
 * 删除
 */
export async function deleted(params) {
  return request(`${ip}/DLX_OEM/api/OrgShift/Delete`, {
    method: 'POST',
    data: { ...params },
  });
}
 

 




