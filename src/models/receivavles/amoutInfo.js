

import { stringify } from 'querystring';
import { history } from 'umi';
import {
  getDropDownInit,
  postListInit,
  updatePut,
  addPost,
  getVwamountById,
  deleted
} from '@/services/receivavles/amoutInfo';
import globalConfig from '../../../config/defaultSettings';
import { message } from 'antd';
import { resolve } from 'path';

const TableName = 'amoutInfo'
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

    EditData: {},
    DetailsData: {},

    selectDropDownData:{
      contractiList:[],
      customerList:[],
      nameList:[],
      commodityList:[]
    },
      
    contractiList:[],
    nameList: [],
    customerList: [],

    ContractiList:[],
    NameList:[],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname == `/receivavles/${TableName}`) {
          dispatch({
            type: 'getDropDownInit',
            payload: {}
          })
          dispatch({
            type: 'query',
            payload: {
              data:{},
              pageNum: Number(globalConfig.table.paginationConfig.PageIndex), //当前页数
              pageSize: Number(globalConfig.table.paginationConfig.PageSize),// 表格每页显示多少条数据
            }
          })
        }
      })
    },
  },

  //查询初始化
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
    //删除 根据id修改状态
    * delete({
      payload,
    }, { call, put, select }) {
      //页面打印    console.log('delete-rex',payload)
      const data = yield call(deleted,{
        data:payload.List
      })
      if (data.status !== '200') {
        return message.error(data.message);
      } else if (data.status == '200') {
        const FromParams = yield select(state => state[TableName].FromParams)
        const pagination = yield select(state => state[TableName].pagination)
        yield put({
          type: 'query',
          payload: {
            data:FromParams,
            pageNum: pagination.PageIndex, //当前页数
            pageSize:pagination.PageSize,// 表格每页显示多少条数据
          },
        })
        return message.success(data.message);
      }
    },

    * getVwamountById({
      payload,
    }, { call, put, select }) {
      const data = yield call(getVwamountById)
      if (data.status !== '200') {
        return message.error(data.message);
      } else if (data.status == '200') {
        yield put({
          type: 'querySuccess',
          payload: {
            type: 'getVwamountById',
            data: data.data,
          }
        })
        return message.success(data.message);
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
            PageIndex: data.data.pageNum,
            PageSize: data.data.pageSize,
            total: data.data.total
          },
        })
        yield put({ type: 'loadingChanger', payload: 'closeLoading' })
        return 
      } else {
        throw data
      }
    },

 //新增
    * create({
      payload,
    }, { call, put, select }) {
    
      const data = yield call(addPost, payload.param)
      if (data.status != '200') {
        return message.error(data.message);
      } else if (data.status == '200') {
        const FromParams = yield select(state => state[TableName].FromParams)
        const pagination = yield select(state => state[TableName].pagination)
        yield put({
          type: 'query',
          payload: {
            data:FromParams,
            pageNum: pagination.PageIndex, //当前页数
            pageSize:pagination.PageSize,// 表格每页显示多少条数据
          },
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


//编辑
    * edit({
      payload,
    }, { call, put, select }) {
    console.log("-------------》修改数据",payload)
      const data = yield call(updatePut, payload.param)
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
    //编辑
    // * edit({
    //   payload,
    // }, { call, put, select }) {
    // console.log("-------------》修改数据",payload)
    //   const data = yield call(updatePut, payload.param)
    //   if (data.status != '200') {
    //     return message.error(data.message);
    //   } else if (data.status == '200') {
    //     const fromParams = yield select(state => state[TableName].FromParams)
    //     const pagination = yield select(state => state[TableName].pagination)
    //     yield put({
    //       type: 'query',
    //       payload: {
    //         data:fromParams,
    //         pageNum: pagination.PageIndex, //当前页数
    //         pageSize:pagination.PageSize,// 表格每页显示多少条数据
    //       },
    //     })
    //     yield put({
    //       type: 'hideModal',
    //       payload: payload.type,
    //     })
    //     return message.success(data.message);
    //   } else {
    //     throw data
    //   }
    // },

    * showModalAndAjax({
      payload,
    }, { call, put }) {
      if (payload.modalType === 'editModalVisible') {
        const data=yield call(getVwamountById,payload.record.id)
        console.log('editModalVisible-REX0------------------》',data)
        if(data.status=='200'){
          yield put({ type: 'querySuccess', payload: { type: payload.modalType, data: data.data } })
          yield put({ type: 'showModal', payload: payload }) 
        }else {
          return message.error(data.message);
        }
      } else if (payload.modalType === 'addModalVisible') {
        yield put({ type: 'showModal', payload: payload })
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


  
  //下拉框赋值
  querySuccess(state, { payload }) {
    if (payload.type === 'query') {
      return {
        ...state, ...payload,
        TableData: payload.data.list,
      }
    }else if(payload.type === 'getDropDownInit' ){
      // console.log('getDropDownInit',payload)
  
      return {
        ...state, ...payload,
        selectDropDownData:payload.data,
        customerList:payload.data.customerList,
        nameList: payload.data.nameList,
        contractiList: payload.data.contractiList,

      }
    }else if(payload.type === 'editModalVisible'){
 
      return {
        ...state, ...payload,
        NameList: payload.data.NameList,
        // tCustomerList: payload.data.tcustomer,
        ContractiList: payload.data.ContractiList,
        EditData: payload.data.vwamout,
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

