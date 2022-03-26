import request from '@/utils/request';
import globalConfig from '../../../config/defaultSettings';
const ip = `${globalConfig.ip}:${globalConfig.port.sspalds_role}`;

/**
 * 查询条件初始化
 */

export async function getDropDownInit() {
  return request(`${ip}/DLX_OEM/api/printRecord/getDropDownInit/all`, {
    method: 'GET',
  })
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
  return request(`${ip}/DLX_OEM/api/OrgDepartment/Add`, {
    method: 'POST',
    data: { ...params },
  });
}


/**
 * 编辑保存
 */
 export async function updatePut(params) {
  return request(`${ip}/DLX_OEM/api/OrgDepartment/Modify`, {
    method: 'POST',
    data: { ...params },
  });
}
 


/**
 * 删除
 */
export async function deleted(params) {
  return request(`${ip}/DLX_OEM/api/OrgDepartment/Delete`, {
    method: 'POST',
    data: { ...params },
  });
}
 

 

//导出物料信息管理
export async function exportMaterial(params) {
  return request(`${ip}/DLX_OEM/api/material/exportMaterial`, {
    method: "POST",
    data: { ...params },
  });
}
 


