import request from '@/utils/request';
import globalConfig from '../../../config/defaultSettings';
const ip = `${globalConfig.ip}:${globalConfig.port.sspalds_role}`;



// 三包退返管理 ---校验条码
export async function checkBarCode(params) {
  return request(`${ip}/DLX_OEM/api/barCodeReturn/checkBarCode/${params}`, {
    method: "POST",
    // data: { ...params },
  });
}
 
// 三包退返管理 ---生成条码
export async function generateBarCode(params) {
  return request(`${ip}/DLX_OEM/api/barCodeReturn/generateBarCode`, {
    method: "POST",
    data: { ...params },
  });
}



// 三包批量退返管理 ---校验条码
export async function scanBarCode(params) {
  return request(`${ip}/DLX_OEM/api/barCodeReturn/scanBarCode/${params}`, {
    method: "POST",
    // data: { ...params },
  });
}
 