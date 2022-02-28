import request from '@/utils/request';
import globalConfig from '../../../config/defaultSettings';
const path = `${globalConfig.ip}:${globalConfig.port.sspalds_role}`
  
/**
 * 查询
 */
export async function postListInit(params) {
  return request(`${path}/DLX_OEM/api/passwordRules/postListInit`, {
    method: 'POST',
    data: { ...params },
  });
}
/**
 * 删除
 */
export async function deleted(params) {
  return request(`${path}/DLX_OEM/api/passwordRules/delete`, {
    method: 'DELETE',
    data: { ...params },
  });
}
 
/**
 * 新建保存
 */
export async function addPost(params) {
  return request(`${path}/DLX_OEM/api/passwordRules/addPost`, {
    method: 'POST',
    data: { ...params },
  });
}
 
/**
 * 编辑保存
 */
export async function updatePut(params) {
  return request(`${path}/DLX_OEM/api/passwordRules/updatePut`, {
    method: 'PUT',
    data: { ...params },
  });
}
 



