import request from '@/utils/request';
import globalConfig from '../../../config/defaultSettings';
// const ip = `${globalConfig.ip}:${globalConfig.port.yshyerp_adm}/yshyerp-adm/api/customer`
const ip = `${globalConfig.ip}:${globalConfig.port.yshyerp_sspa}`

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
  return request(`${ip}/WebAPI/api/OrgShiftType/List`, {
    method: 'POST',
    data: { ...params },
  });
}



/**
 * 新建保存
 */
 export async function addPost(params) {
  return request(`${ip}/WebAPI/api/OrgShiftType/Add`, {
    method: 'POST',
    data: { ...params },
  });
}


/**
 * 编辑保存
 */
 export async function updatePut(params) {
  return request(`${ip}/WebAPI/api/OrgShiftType/Modify`, {
    method: 'POST',
    data: { ...params },
  });
}
 


/**
 * 删除
 */
export async function deleted(params) {
  return request(`${ip}/WebAPI/api/OrgShiftType/Delete`, {
    method: 'POST',
    data: { ...params },
  });
}
 

 

//  获取打开状态班别编号
export async function GetShiftNO(params) {
  return request(`${ip}/WebAPI/api/OrgShiftType/GetShiftNO`, {
    method: 'POST',
    data: { ...params },
  });
}
 

 



 