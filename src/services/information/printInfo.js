import request from '@/utils/request';
import globalConfig from '../../../config/defaultSettings';
const ip = `${globalConfig.ip}:${globalConfig.port.sspalds_role}`;

/**
 * 查询条件初始化
 */
export async function getDropDownInit() {
  return request(`${ip}/DLX_OEM/api/printRecord/getDropDownInit/zhx`, {
    method: 'GET',
  })
}


/**
 * 查询
 */
export async function postListInit(params) {
  return request(`${ip}/DLX_OEM/api/printBagBarCode/postListInit`, {
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
 

//打印获取条码
export async function generateBarCode(params) {
  return request(`${ip}/DLX_OEM/api/barCode/generateBarCode`, {
    method: 'POST',
    data: { ...params },
  });
}
 


