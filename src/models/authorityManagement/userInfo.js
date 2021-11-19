import { stringify } from 'querystring';
import { history } from 'umi';
import {
  getDepartement,
  postListInit,
  deleted,
  getAddDropDownInit,
  addPost,
} from '@/services/authorityManagement/userInfo';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';
import { resolve } from 'path';

const TableName = 'userInfo'
const Model = {
  namespace: TableName,
  state: {
    TableList: [],
    departmentList:{}
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname == `/authorityManagement/${TableName}`) {
          dispatch({
            type: 'getDepartement',
            payload: {}
          })
        }
      })
    },
  },
  effects: {
    /**
     *
     * @param {getDepartement} 查询初始化
     * @param {query} 查询
     */
    * getDepartement({
      payload,
    }, { call, put, select }) {
      const data = yield call(getDepartement)
      if (data.status !== '200') {
        
        return message.error(data.message);
      } else if (data.status == '200') {
        
        yield put({
          type: 'querySuccessed',
          payload: {
            type: 'getDepartement',
            data: data.list,
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
            data: data.list
          }
        })
        return message.success(data.message);
      }
    },
  },
  reducers: {
    querySuccessed(state, { payload }) {
      if (payload.type === 'getDepartement') {
        return {
          ...state, ...payload,
          departmentList: payload.data
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
      }

    },
  },
};
export default Model;
