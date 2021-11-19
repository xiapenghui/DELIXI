import { stringify } from 'querystring';
import { history } from 'umi';
import {
  getDropDownInit,
  postListInit,
  getUpdateInit,
  deleted,
  getAddDropDownInit,
  addPost,
} from '@/services/authorityManagement/roleInfo';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';
import { resolve } from 'path';

const TableName = 'roleInfos'
const Model = {
  namespace: TableName,
  state: {
    TableList: [],
    companyList: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname == `/authorityManagement/${TableName}`) {
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
    }, { call, put, select }) {
      const data = yield call(getDropDownInit)
      if (data.status !== 200) {
        return message.error(data.message);
      } else if (data.status == 200) {
        console.log("data.data================" + data.data);
        yield put({
          type: 'querySuccessed',
          payload: {
            type: 'getDropDownInit',
            data: data.data,
          }
        })
        return message.success(data.message);
      }
    },

    * getUpdateInit({
      payload,
    }, { call, put, select }) {
      const data = yield call(getUpdateInit)
      if (data.status !== 200) {
        return message.error(data.message);
      } else if (data.status == 200) {
        yield put({
          type: 'querySuccessed',
          payload: {
            type: 'getUpdateInit',
            data: data.data,
          }
        })
        return message.success(data.message);
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
          companyList: payload.data,
        }
      } else if (payload.type === 'postListInit') {
        return {
          ...state,
          TableList: new Promise(resolve => {
            resolve({
              data: payload.data.list,
              current: payload.data.pageNum,
              pageSize: payload.data.pageSize,
              success: true,
              total: payload.data.total
            })
          })
        };
      }else if (payload.type === 'getUpdateInit') {
        return {
          ...state,
          TableList: new Promise(resolve => {
            resolve({
              data: payload.data.list,
              current: payload.data.pageNum,
              pageSize: payload.data.pageSize,
              success: true,
              total: payload.data.total
            })
          })
        };
      }
    },
  },
};
export default Model;
