import { stringify } from 'querystring';
import { history } from 'umi';
import {
  getDropDownInit,
  postListInit,
  deleted,
  getAddDropDownInit,
  addPost,
} from '@/services/authorityManagement/materialMain';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';
import { resolve } from 'path';

const TableName = 'materialMain'
const Model = {
  namespace: TableName,
  state: {
    TableList: [],
    factoryList: [],
    materialList: [],
    onlyTempList: [],
    boxTempList: [],
    bigBoxTempList: [],
    bagTempList:[]
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
     * @param {getShif} 查询初始化
     * @param {query} 查询
     */

    * getDropDownInit({
      payload,
    }, { call, put, select }) {
      const data = yield call(getDropDownInit,localStorage.user)
      if (data.status !== 200) {
        return message.error(data.message);
      } else if (data.status === 200) {
        yield put({
          type: 'querySuccessed',
          payload: {
            type: 'getDropDownInit',
            data: data.data,
          }
        })
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
      if (payload.type === 'getDropDownInit') {
        return {
          ...state, ...payload,
          factoryList: payload.data.factoryList,
          materialList: payload.data.materialList,
          onlyTempList: payload.data.onlyTempList,
          boxTempList: payload.data.boxTempList,
          bigBoxTempList: payload.data.bigBoxTempList,
          bagTempList:payload.data.bagTempList
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
