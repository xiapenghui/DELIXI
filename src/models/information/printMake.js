import { stringify } from 'querystring';
import { history } from 'umi';
import {
  getDropDownInit,
  tankSearch,
  tankSearch1
} from '@/services/information/printMake';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';
import { resolve } from 'path';

const TableName = 'printMake'
const Model = {
  namespace: TableName,
  state: {
    TableData1: [],
    TableData2: []
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname == `/information/${TableName}`) {
          dispatch({
            type: 'getDropDownInit',
            payload: {}
          })

          //储罐库存
          dispatch({
            type: 'tankSearch',
            payload: {
              data: {
                // sdate1: moment().subtract(1, "years").format(globalConfig.form.onlyDateFormat),
                // sdate2: moment().endOf('day').format(globalConfig.form.onlyDateFormat)
              },
              // pageNum: Number(globalConfig.table.paginationConfig.PageIndex), //当前页数,
              // pageSize: Number(globalConfig.table.paginationConfig.PageSize),// 表格每页显示多少条数据
            }
          });

           //储罐库存
           dispatch({
            type: 'tankSearch1',
            payload: {
              data: {
                // sdate1: moment().subtract(1, "years").format(globalConfig.form.onlyDateFormat),
                // sdate2: moment().endOf('day').format(globalConfig.form.onlyDateFormat)
              },
              // pageNum: Number(globalConfig.table.paginationConfig.PageIndex), //当前页数,
              // pageSize: Number(globalConfig.table.paginationConfig.PageSize),// 表格每页显示多少条数据
            }
          });

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
      if (data.status !== '200') {
        return message.error(data.message);
      } else if (data.status == '200') {
        yield put({
          type: 'querySuccess',
          payload: {
            type: 'getDropDownInit',
            data: data.list,
          }
        })
        return message.success(data.message);
      }
    },

    //  桶装货品
    * tankSearch({
      payload,
    }, { call, put, select }) {
      const data = yield call(tankSearch, payload)
      if (data.status != '200') {
        return message.error(data.message);
      } else if (data.status == '200') {
        yield put({
          type: 'querySuccess',
          payload: {
            type: 'tankSearch',
            data: data.list,
          },
        })
        // return message.success(data.message);
      } else {
        throw data
      }
    },


      //  桶装货品
      * tankSearch1({
      payload,
    }, { call, put, select }) {
      const data = yield call(tankSearch1, payload)
      if (data.status != '200') {
        return message.error(data.message);
      } else if (data.status == '200') {
        yield put({
          type: 'querySuccess',
          payload: {
            type: 'tankSearch1',
            data: data.list,
          },
        })
        // return message.success(data.message);
      } else {
        throw data
      }
    },

    

  },
  reducers: {
    querySuccess(state, { payload }) {
      if (payload.type === 'getDropDownInit') {
        return {
          ...state, ...payload,
          customerList: payload.data.customerList,
          isNoList: payload.data.isNoList
        }
      } else if (payload.type === 'tankSearch') {
        return {
          ...state, ...payload,
          TableData1: payload.data,
        };
      }else if (payload.type === 'tankSearch1') {
        return {
          ...state, ...payload,
          TableData2: payload.data,
        };
      }

    },
  },
};
export default Model;
