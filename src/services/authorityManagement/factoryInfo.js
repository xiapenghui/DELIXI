import request from "@/utils/request";
import globalConfig from "../../../config/defaultSettings";
// const ip = `${globalConfig.ip}:${globalConfig.port.yshyerp_adm}/yshyerp-adm/api/customer`
const ip = `${globalConfig.ip}:${globalConfig.port.sspalds_role}`;

/**
 * 查询条件初始化
 */
export async function getDepartement() {
  return request(`${ip}/DLX_OEM/api/Common/getDropDownInit`, {
    method: "POST",
  });
}

 

/**
 * 查询
 */
export async function postListInit(params) {
  return request(`${ip}/DLX_OEM/api/factory/postListInit`, {
    method: 'POST',
    data: { ...params },
  });
}

 
/**
 * 新建保存
 */
export async function addPost(params) {
  return request(`${ip}/DLX_OEM/api/factory/addPost`, {
    method: "POST",
    data: { ...params },
  });
}

/**
 * 编辑保存
 */
export async function updatePut(params) {
  return request(`${ip}/DLX_OEM/api/factory/updatePut`, {
    method: "PUT",
    data: { ...params },
  });
}

/**
 * 删除
 */
export async function deleted(params) {
  return request(`${ip}/DLX_OEM/api/factory/delete`, {
    method: "DELETE",
    data: { ...params },
  });
}

//获取下载模板
export async function getTempl() {
  return request(`${ip}/DLX_OEM/api/excel/GetExcelTemplate/Factory`, {
    method: 'GET'
  });
}
 