import { stringify } from 'querystring';
import { history } from 'umi';
import {
  // getDropDownInit
} from '@/services/information/returnInfo';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';
import { resolve } from 'path';

const TableName = 'returnInfo'
const Model = {
  namespace: TableName,
  state: {
    materialList:[]
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname == `/information/${TableName}`) {
          // dispatch({
          //   type: 'getDropDownInit',
          //   payload: {}
          // })

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
      } else if (data.status === 200) {
        yield put({
          type: 'querySuccess',
          payload: {
            type: 'getDropDownInit',
            data: data.data,
          }
        })
      }
    },
 
  },
  


  reducers: {
    querySuccess(state, { payload }) {
      if (payload.type === 'getDropDownInit') {
        return {
          ...state, ...payload,
          materialList: payload.data.materialList
        }
      }

    },
  },
};
export default Model;
