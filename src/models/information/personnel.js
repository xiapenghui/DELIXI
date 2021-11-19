import { stringify } from 'querystring';
import { history } from 'umi';
import {
  getDepartement,
  postListInit,
  getArea,
  getLine,
  getShiftType,
  deleted,
  getAddDropDownInit,
  addPost,
} from '@/services/information/personnel';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';
import { resolve } from 'path';

const TableName = 'personnel'
const Model = {
  namespace: TableName,
  state: {
    TableList: [],
    departmentList: {},
    areaList: {},
    lineList: {},
    shiftTypeList:{}
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname == `/information/${TableName}`) {
          dispatch({
            type: 'getDepartement',
            payload: {}
          })

          dispatch({
            type: 'getArea',
            payload: {}
          })

          dispatch({
            type: 'getLine',
            payload: {}
          })

          dispatch({
            type: 'getShiftType',
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

    // 区域信息
    * getArea({
      payload,
    }, { call, put, select }) {
      const data = yield call(getArea)
      if (data.status !== '200') {
        return message.error(data.message);
      } else if (data.status == '200') {
        yield put({
          type: 'querySuccessed',
          payload: {
            type: 'getArea',
            data: data.list,
          }
        })
        // return message.success(data.message);
      }
    },


    // 线体信息
    * getLine({
      payload,
    }, { call, put, select }) {
      const data = yield call(getLine)
      if (data.status !== '200') {
        return message.error(data.message);
      } else if (data.status == '200') {
        yield put({
          type: 'querySuccessed',
          payload: {
            type: 'getLine',
            data: data.list,
          }
        })
        // return message.success(data.message);
      }
    },


    // 班别信息
    * getShiftType({
      payload,
    }, { call, put, select }) {
      const data = yield call(getShiftType)
      if (data.status !== '200') {
        return message.error(data.message);
      } else if (data.status == '200') {
        yield put({
          type: 'querySuccessed',
          payload: {
            type: 'getShiftType',
            data: data.list,
          }
        })
        // return message.success(data.message);
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
      }
      else if (payload.type === "getArea") {
        return {
          ...state, ...payload,
          areaList: payload.data
        }
      }
      else if (payload.type === "getLine") {
        return {
          ...state, ...payload,
          lineList: payload.data
        }
      }

      else if (payload.type === "getShiftType") {
        return {
          ...state, ...payload,
          shiftTypeList: payload.data
        }
      }

      


      else if (payload.type === 'postListInit') {
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
