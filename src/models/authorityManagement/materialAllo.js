import { stringify } from 'querystring';
import { history } from 'umi';
import {
  getFactory,
  postListInit,
  deleted,
  getAddDropDownInit,
  addPost,
} from '@/services/authorityManagement/materialAllo';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';
import { resolve } from 'path';

const TableName = 'materialAllo'
const Model = {
  namespace: TableName,
  state: {
    TableList: [],
    factoryList: [],
    materialList:[]
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname == `/authorityManagement/${TableName}`) {
          dispatch({
            type: 'getFactory',
            payload: {}
          })
        }
      })
    },
  },
  effects: {
    /**
     *
     * @param {getShif} 查询初始化
     * @param {query} 查询
     */

    * getFactory({
      payload,
    }, { call, put, select }) {
      const data = yield call(getFactory)
      if (data.status !== 200) {
        return message.error(data.message);
      } else if (data.status === 200) {
        yield put({
          type: 'querySuccessed',
          payload: {
            type: 'getFactory',
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
      if (data.status !== 200) {
        return message.error(data.message);
      } else if (data.status == 200) {
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
      if (payload.type === 'getFactory') {
        return {
          ...state, ...payload,
          factoryList: payload.data.factoryList,
          materialList: payload.data.materialList,
        }
      } else if (payload.type === 'postListInit') {
        debugger
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
