import request from '@/utils/request';
import globalConfig from '../../../config/defaultSettings';
const path = `${globalConfig.ip}:${globalConfig.port.sspalds_role}`
// const path = "http://192.168.1.221:8072";
const TableName = 'role'
/**
 * 查询条件初始化
 */
export async function getDropDownInit() {
  return request(`${path}/sspalds-role/api/${TableName}/getDropDownInit`, {
    method: 'GET'
  });
}
/**
 * 查询
 */
export async function postListInit(params) {
  return request(`${path}/sspalds-role/api/${TableName}/postListInit`, {
    method: 'POST',
    data: { ...params },
  });
}
/**
 * 删除
 */
export async function deleteRole(params) {
  return request(`${path}/sspalds-role/api/${TableName}/delete`, {
    method: 'DELETE',
    data: { ...params },
  });
}
/**
 * 新建初始化
 */
export async function getAddDropDownInit() {
  return request(`${path}/sspalds-role/api/${TableName}/getAddDropDownInit`, {
    method: 'GET'
  });
}
/**
 * 新建保存
 */
export async function addRole(params) {
  return request(`${path}/sspalds-role/api/${TableName}/addPost`, {
    method: 'POST',
    data: { ...params },
  });
}
/**
 * 编辑初始化
 */
export async function getUpdateInit(params) {
  return request(`${path}/sspalds-role/api/${TableName}/getUpdateInit/${params}`, {
    method: 'GET'
  });
}
/**
 * 编辑保存
 */
export async function updateRole(params) {
  return request(`${path}/sspalds-role/api/${TableName}/updatePut`, {
    method: 'PUT',
    data: { ...params },
  });
}
/**
 * 详情
 */
export async function getDetail(params) {
  return request(`${path}/sspalds-role/api/${TableName}/getDetail/${params}`, {
    method: 'GET'
  });
}



