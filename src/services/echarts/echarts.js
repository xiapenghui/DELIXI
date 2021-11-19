import request from '@/utils/request';
import globalConfig from '../../../config/defaultSettings';
const ip = `${globalConfig.ip}:${globalConfig.port.yshyerp_adm}/yshyerp-adm/api/customer`
// const ip = 'http://192.168.1.192:8075/yshyerp-adm/api/customer'
/**
 * 查询条件初始化
 */
export async function getDropDownInit() {
  return request(`${ip}/getDropDownInit`, {
    method: 'GET'
  });
}
/**
 * 查询
 */
export async function postListInit(params) {
  return request(`${ip}/postListInit`, {
    method: 'POST',
    data: { ...params },
  });
}
/**
 * 删除
 */
export async function deleted(params) {
  return request(`${ip}/delete`, {
    method: 'DELETE',
    data: { ...params },
  });
}
/**
 * 新建初始化
 */
export async function getAddDropDownInit() {
  return request(`${ip}/getAddDropDownInit`, {
    method: 'GET'
  });
}
/**
 * 新建保存
 */
export async function addPost(params) {
  return request(`${ip}/addPost`, {
    method: 'POST',
    data: { ...params },
  });
}
/**
 * 编辑初始化
 */
export async function getUpdateInit(params) {
  return request(`${ip}/getUpdateInit/${params}`, {
    method: 'GET'
  });
}
/**
 * 编辑保存
 */
export async function updatePut(params) {
  return request(`${ip}/updatePut`, {
    method: 'PUT',
    data: { ...params },
  });
}
/**
 * 详情
 */
export async function getDetail(params) {
  return request(`${ip}/getDetail/${params}`, {
    method: 'GET'
  });
}



