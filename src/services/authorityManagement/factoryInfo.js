import request from "@/utils/request";
import globalConfig from "../../../config/defaultSettings";
// const ip = `${globalConfig.ip}:${globalConfig.port.yshyerp_adm}/yshyerp-adm/api/customer`
const ip = `${globalConfig.ip}:${globalConfig.port.yshyerp_sspa}`;

/**
 * 查询条件初始化
 */
export async function getDepartement() {
  return request(`${ip}/WebAPI/api/Common/GetDepartmentIdText`, {
    method: "POST",
  });
}

// 区域接口
export async function getArea(params) {
  return request(`${ip}/WebAPI/api/Common/GetProductAreaIdText`, {
    method: "POST",
    data: { ...params },
  });
}

// 线体接口
export async function getLine(params) {
  return request(`${ip}/WebAPI/api/Common/GetProductLineTextIdText`, {
    method: "POST",
    data: { ...params },
  });
}

//班别接口
export async function getShiftType() {
  return request(`${ip}/WebAPI/api/Common/GetShiftTypeIdText`, {
    method: "POST",
  });
}

/**
 * 查询
 */
// export async function postListInit(params) {
//   return request(`${ip}/WebAPI/api/OrgEmployee/List`, {
//     method: 'POST',
//     data: { ...params },
//   });
// }

// 代替
export async function postListInit(params) {
  return request(`${ip}/WebAPI/api/OrgRelaxtype/List`, {
    method: "POST",
    data: { ...params },
  });
}

/**
 * 新建保存
 */
export async function addPost(params) {
  return request(`${ip}/WebAPI/api/OrgEmployee/Add`, {
    method: "POST",
    data: { ...params },
  });
}

/**
 * 编辑保存
 */
export async function updatePut(params) {
  return request(`${ip}/WebAPI/api/OrgEmployee/Modify`, {
    method: "POST",
    data: { ...params },
  });
}

/**
 * 删除
 */
export async function deleted(params) {
  return request(`${ip}/WebAPI/api/OrgEmployee/Delete`, {
    method: "POST",
    data: { ...params },
  });
}
