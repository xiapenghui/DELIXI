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


 

 
 



 