import request from '@/utils/request';
import globalConfig from '../../../config/defaultSettings';
// const ip = `${globalConfig.ip}:${globalConfig.port.yshyerp_adm}/yshyerp-adm/api/customer`
const ip = `${globalConfig.ip}:${globalConfig.port.sspalds_role}`

/**
 * 查询条件初始化
 */
export async function getDropDownInit(params) {
  return request(`${ip}/DLX_OEM/api/temp/getDropDownInit`, {
    method: 'GET',
    data: { ...params },
  });
}


/**
 * 查询
 */
export async function postListInit(params) {
  return request(`${ip}/DLX_OEM/api/temp/postListInit`, {
    method: 'POST',
    data: { ...params },
  });
}



/**
 * 新建保存
 */
 export async function addPost(params) {
  return request(`${ip}/DLX_OEM/api/temp/addPost`, {
    method: 'POST',
    data: { ...params },
  });
}


/**
 * 编辑保存
 */
 export async function updatePut(params) {
  return request(`${ip}/DLX_OEM/api/temp/updatePut`, {
    method: 'PUT',
    data: { ...params },
  });
}
 


/**
 * 删除
 */
export async function deleted(params) {
  return request(`${ip}/DLX_OEM/api/temp/delete`, {
    method: 'DELETE',
    data: { ...params },
  });
}
 

 
// 获取下载模板
export async function getTempl() {
  return request(`${ip}/DLX_OEM/api/excel/GetExcelTemplate/Temp`, {
    method: 'GET'
  });
}
 


//导出模板
export async function exportTemp(params) {
  return request(`${ip}/DLX_OEM/api/temp/exportTemp`, {
    method: "POST",
    data: { ...params },
  });
}
 
// 一键还原模板
// id:模板id,userId:用户id
export async function resTemplate(id,userId) {
  return request(`${ip}/DLX_OEM/api/temp/restoreOriginalTemplate/${id}/${userId}`, {
    method: "GET",
  });
}
 
 