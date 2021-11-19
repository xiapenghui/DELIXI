

import { stringify } from 'querystring';
import { history } from 'umi';
import {
  getDropDownInit,
  postListInit,
  updatePut,
  updateReceivablesByIddca,
  updateREceivablesByyug,
  getVwreceivablesById
} from '@/services/receivavles/receivablesInfo';
import globalConfig from '../../../config/defaultSettings';
import { message } from 'antd';
import { resolve } from 'path';

const TableName = 'receivablesInfo'
const Model = {
  namespace: TableName,
  state: {
    FromParams: {},
    TableData: [],
    tableLoading: false,
    pagination: {
      PageIndex: Number(globalConfig.table.paginationConfig.PageIndex) || 1, //当前页数
      PageSize: Number(globalConfig.table.paginationConfig.PageSize) || 10,// 表格每页显示多少条数据
      Total: Number(globalConfig.table.paginationConfig.Total) || 10,  //总条数
    },
    addModalVisible: false,
    editModalVisible: false,
    detailsModalVisible: false,
    deleteModalVisible: false,
    selectDropDownData:{
      contractiList:[],
      customerList:[],
      nameList:[],
      commodityList:[],
      snameList:[]
    },
    lastdate:null,
    firstdate:null,
    EditData: {},
    DetailsData: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname == `/receivavles/${TableName}`) {


          let myDate = new Date;
          let year = myDate.getFullYear(); //获取当前年
          let month = myDate.getMonth() + 1; //获取当前月
          if(month<10){
            month='0'+month;
          }
          // let day = new Date(year,month,0);
             let date = myDate.getDate(); //获取最后一天
          if(date<10){
            date='0'+date;
          }
          //获取本月的第一天日期 
          let firstdate = year + '-' + month + '-' +'01';
          //获取当天日期
          let lastdate = year + '-' + month + '-' + date;
          dispatch({
            type: 'querySuccess',
            payload: {
              type: 'firstdate',
              data:{
                firstdate:firstdate,
                lastdate:lastdate
              },
            },
          });

          dispatch({
            type: 'getDropDownInit',
            payload: {}
          })
          dispatch({
            type: 'query',
            payload: {
              data:{
                sdate1:firstdate,
                sdate2:lastdate,
              },
              pageNum: Number(globalConfig.table.paginationConfig.PageIndex), //当前页数
              pageSize: Number(globalConfig.table.paginationConfig.PageSize),// 表格每页显示多少条数据
            }
          })
        }
      })
    },
  },
  effects: {
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
            data: data.data,
          }
        })
        return 
      }
    },

    * query({
      payload,
    }, { call, put, select }) {
      yield put({ type: 'loadingChanger', payload: 'showLoading' })
      yield put({ type: 'FromParamsChanger', payload: payload })
      
       const fromParams = yield select(state => state[TableName].FromParams)
      const data = yield call(postListInit, fromParams)
      if (data.status != '200') {
        return message.error(data.message);
      } else if (data.status == '200') {
        yield put({
          type: 'querySuccess',
          payload: {
            type: 'query',
            data: data.data,
          },
        })
        yield put({
          type: 'tablePaginationChanger',
          payload: {
            PageIndex: fromParams.pageNum,
            PageSize: fromParams.pageSize,
            total: data.data.total
          },
        })
        yield put({ type: 'loadingChanger', payload: 'closeLoading' })
        return 
      } else {
        throw data
      }
    },

* getVwreceivablesById({
  payload,
}, { call, put, select }) {
  const data = yield call(getVwreceivablesById)
  if (data.status !== '200') {
    return message.error(data.message);
  } else if (data.status == '200') {
    yield put({
      type: 'querySuccess',
      payload: {
        type: 'getVwreceivablesById',
        data: data.data,
      }
    })
    return message.success(data.message);
  }
},


//预估
* yugHandler({
  payload,
}, { call, put, select }) {
  const data = yield call(updateREceivablesByyug, {data: payload.data})
  const FromParams = yield select (state => state[TableName].FromParams)
  if (data.status != '200') {
    return message.error(data.message);
  } else if (data.status == '200') {
    yield put({
      type: 'query',
      payload: {
        ...FromParams,
      },
    })
    yield put({ type: 'loadingChanger', payload: 'closeLoading' })
    return message.success(data.message);
  } else {
    throw data
  }
},
//审批
* deleteHandler({
  payload,
}, { call, put, select }) {
  const data = yield call(updatePut, {data: payload.data})
  const FromParams = yield select (state => state[TableName].FromParams)
  if (data.status != '200') {
    return message.error(data.message);
  } else if (data.status == '200') {
    yield put({
      type: 'query',
      payload: {
        ...FromParams,
      },
    })
    yield put({ type: 'loadingChanger', payload: 'closeLoading' })
    return message.success(data.message);
  } else {
    throw data
  }
},
    //编辑
    * edit({
      payload,
    }, { call, put, select }) {
    console.log("-------------》修改数据",payload)
      const data = yield call(updateReceivablesByIddca, payload.param)
      if (data.status != '200') {
        return message.error(data.message);
      } else if (data.status == '200') {
        const fromParams = yield select(state => state[TableName].FromParams)
        const pagination = yield select(state => state[TableName].pagination)
        yield put({
          type: 'query',
          payload: fromParams,
        })
        yield put({
          type: 'hideModal',
          payload: payload.type,
        })
        return message.success(data.message);
      } else {
        throw data
      }
    },


    * showModalAndAjax({
      payload,
    }, { call, put }) {
      if (payload.modalType === 'editModalVisible') {
        const data=yield call(getVwreceivablesById,payload.record.id)
        console.log('editModalVisible-REX0',data)
        if(data.status=='200'){
          yield put({ type: 'querySuccess', payload: { type: payload.modalType, data: data.data } })
          yield put({ type: 'showModal', payload: payload }) 
        }else {
          return message.error(data.message);
        }
      } else if (payload.modalType === 'detailsModalVisible') {
        yield put({ type: 'showModal', payload: payload })
      }
    },
  },
  reducers: {
    //打开关闭Modals
    showModal(state, { payload }) {
      return { ...state, ...payload, [payload.modalType]: true }
    },
    hideModal(state, { payload }) {
      return { ...state, ...payload, [payload]: false }
    },


    querySuccess(state, { payload }) {
      if (payload.type === 'query') {
        return {
          ...state, ...payload,
          TableData: payload.data.list,
        }
      }else if(payload.type === 'getDropDownInit' ){
      
        return {
          ...state, ...payload,
          selectDropDownData:payload.data
        }
      }else if(payload.type === 'editModalVisible'){
        return {
          ...state, ...payload,
          EditData: payload.data,
        }
      }else if (payload.type === 'firstdate') {
        return {
          ...state, ...payload,
          firstdate:payload.data.firstdate,
          lastdate:payload.data.lastdate
        }
      }
    
    },
    showModalData(state, { payload }) {
      if (payload.modalType === 'editModalVisible') {
        return {
          ...state, ...payload,
          EditData: payload.data,
        }
      }
    },
    //teble loading处理
    loadingChanger(state, { payload }) {
      if (payload === 'showLoading') {
        return { ...state, ...payload, tableLoading: true }
      } else if (payload === 'closeLoading') {
        return { ...state, ...payload, tableLoading: false }
      }
    },
    //改变table pageIndex pageSize
    tablePaginationChanger(state, { payload }) {
      return {
        ...state, ...payload,
        pagination: {
          PageIndex: payload.PageIndex,
          PageSize: payload.PageSize,
          total: payload.total
        }
      }
    },
    // 改变table 查询条件
    FromParamsChanger(state, { payload }) {
      return { ...state, ...payload, FromParams: payload }
    }
  },
};
export default Model;

