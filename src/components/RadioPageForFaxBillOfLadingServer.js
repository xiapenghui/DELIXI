import request from '@/utils/request';
import axios from 'axios'

const url = 'http://10.208.2.108:8077/yshyerp-fax/api/donopict/selectTheBillOfLading'



/**
 * 确认归档操作
 * @param {*} params 
 */
export async function selectTheBillOfLading(params) {
  return request(`${url}`, {
    method: 'POST',
    data: { ...params },
  });
}

