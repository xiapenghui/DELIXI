import { stringify } from 'querystring';
import { history } from 'umi';
import {
  getDropDownInit,
  postListInit,
  deleted,
  getAddDropDownInit
  
} from '@/services/echarts/echarts';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';
import { resolve } from 'path';

const TableName = 'echarts'
const Model = {
  namespace: TableName,
  state: {
    TableList: [],
    DropDownData:{},
    nameTypeList:{},
    sapserviceList:{},
    getBillingTypeList:{}

  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname == `/masterData/${TableName}`) {
          dispatch({
            type: 'getDropDownInit',
            payload: {}
          })
        }
      })
    },
  },
  effects: {
    /**
     *
     * @param {getDropDownInit} 查询初始化
     * @param {query} 查询
     */
    * getDropDownInit({
      payload,
    },
     { call, put, select }) {
      const data = yield call(getDropDownInit)
      if (data.status !== '200') {
        return message.error(data.message);
      } else if (data.status == '200') {
        yield put({
          type: 'querySuccessed',
          payload: {
            type: 'getDropDownInit',
            data: data.data,
          }
        })
        return;
      }
    },

    * query({
      payload,
    }, { call, put, select }) {
      const data = yield call(postListInit, payload)
      if (data.status !== '200') {
        return message.error(data.message);
      } else if (data.status == '200') {
        yield put({
          type: 'querySuccessed',
          payload: {
            type: 'postListInit',
            data: data.data
          }
        })
        return message.success(data.message);
      }
    },
  },
  reducers: {
    querySuccessed(state, { payload }) {
      if (payload.type === 'getDropDownInit') {
        return {
          ...state, ...payload,
          // DropDownData:payload.data,
          isNotTypeList :payload.data.isNotTypeList,
          getBillingTypeList:payload.data.getBillingTypeList,
          sapserviceList:payload.data.sapserviceList,
          nameTypeList:payload.data.nameTypeList
        }
      } 
    },
  },
};
export default Model;
