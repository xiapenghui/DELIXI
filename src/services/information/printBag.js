import request from '@/utils/request';
import globalConfig from '../../../config/defaultSettings';
const ip = `${globalConfig.ip}:${globalConfig.port.sspalds_role}`;

/**
 * 查询条件初始化
 */
 export async function getDropDownInit() {
  return request(`${ip}/DLX_OEM/api/printRecord/getDropDownInit/bag`, {
    method: 'GET',
  })
}

//获取表格数据
export async function postListInit(params) {
  return request(`${ip}/DLX_OEM/api/printBagBarCode/postListInit`, {
    method: 'POST',
    data: { ...params },
  });
}






export async function getBagTemp(params) {
  return request(`${ip}/DLX_OEM/api/printBagBarCode/getBagTemp/${params}`, {
    method: 'POST',
    // data: { ...params },
  });
}

 //打印条码
 export async function printBarCode(params) {
  return request(`${ip}/DLX_OEM/api/printRecord/printBarCode`, {
    method: 'POST',
    data: { ...params },
  });
}
 

