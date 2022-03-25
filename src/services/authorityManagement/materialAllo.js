import request from '@/utils/request';
import globalConfig from '../../../config/defaultSettings';
// const ip = `${globalConfig.ip}:${globalConfig.port.yshyerp_adm}/yshyerp-adm/api/customer`
const ip = `${globalConfig.ip}:${globalConfig.port.sspalds_role}`

/**
 * 查询条件初始化
 */
export async function getDropDownInit() {
  return request(`${ip}/DLX_OEM/api/materialFactory/getDropDownInit`, {
    method: 'GET'
  });
}


/**
 * 查询
 */
export async function postListInit(params) {
  return request(`${ip}/DLX_OEM/api/materialFactory/postListInit`, {
    method: 'POST',
    data: { ...params },
  });
}

 


/**
 * 新建保存
 */
 export async function addPost(params) {
  return request(`${ip}/DLX_OEM/api/materialFactory/addPost`, {
    method: 'POST',
    data: { ...params },
  });
}


/**
 * 编辑保存
 */
 export async function updatePut(params) {
  return request(`${ip}/DLX_OEM/api/materialFactory/updatePut`, {
    method: 'PUT',
    data: { ...params },
  });
}
 

/**
 * 删除
 */
export async function deleted(params) {
  return request(`${ip}/DLX_OEM/api/materialFactory/delete`, {
    method: 'DELETE',
    data: { ...params },
  });
}
 

 
 
// 获取下载模板
export async function getTempl() {
  return request(`${ip}/DLX_OEM/api/excel/GetExcelTemplate/MaterialFactory`, {
    method: 'GET'
  });
}
 


//导出物料
export async function exportMaterialFactory(params) {
  return request(`${ip}/DLX_OEM/api/materialFactory/exportMaterialFactory`, {
    method: "POST",
    data: { ...params },
  });
}
 
 