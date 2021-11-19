import { queryCurrent, query as queryUsers, getMenuListByUserId, updatePassword } from '@/services/user';
import { message } from 'antd';
const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
    // menuData: []
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *fetchCurrent(_, { call, put }) {
     
      if (localStorage.getItem('user_token') != null) {
        const response = yield call(queryCurrent);
        console.log("根据token获取登入信息----->",response.data)
        if (response.status === 200) {
          yield put({
            type: 'saveCurrentUser',
            payload: response.data,
          });
        } else {
          yield put({
            type: 'login/logout'
          })
         
          return message.error(response.message)
        }
      }
    },

    *userOut(_, { call, put }) {
     console.log("user> modells > 清除数据")
      yield put({
        type: 'saveCurrentUser',
        payload:null,
      });
      
    },

    // *getMenuListByUserId(_, { call, put }) {
    *getMenuListByUserId({
      payload
    }, { call, put }) {
      const response = yield call(getMenuListByUserId, payload);
      // if(response.status === 200){
      // yield put({
      //   type: 'querySuccess',
      //   // payload: {
      //   //   modalType: 'menu',
      //   //   data: response.data
      //   // }
      //   payload: response.data
      // })
      // }
    },

    *updatePassword({ payload, callback }, { call, put }) {
      const response = yield call(updatePassword, payload.data);
      if (callback) {
        callback(response) // 返回数据
      }
    },

    // *getMenuListByUserId({
    //   payload,callback
    // }, { call, put }) {
    //   const response = yield call(getMenuListByUserId, payload);
    //   if(callback){
    //      callback(response) // 返回数据
    //   }
    // },

    // *getMenuListByUserId({ payload }, { call }) {
    //   const { resolve } = payload;
    //   const { data } = yield call(getMenuListByUserId, payload.userId);
    //     // 通过resolve返回数据，返回的数据将在Promise的then函数中获取到
    //     !!resolve && resolve(data);
    // },

  },
  reducers: {

    // querySuccess(state, { payload }) {
    //   return {
    //     ...state, ...payload,
    //     currentUser: payload,
    //   }
    // },

    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload  };
    },

    // querySuccess(state, { payload }) {
    //   console.log('querySuccess',state,payload);
    //   if (payload.modalType === 'menu') {
    //     return {
    //       ...state, ...payload,
    //       menuData: payload.data,
    //     }
    //   }
    // },


    // querySuccess(state, action) {
    //   console.log('querySuccess',state, action);
    //   return { ...state, menuData: action.payload || {} };
    // },

    changeNotifyCount(
      state = {
        // currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        // currentUser: {
        //   ...state.currentUser,
        //   notifyCount: action.payload.totalCount,
        //   unreadCount: action.payload.unreadCount,
        // },
      };
    },
  },

  //除了querySuccess和saveCurrentUser其他方法名称无效
  // saveMenu(state, action) {
  //   console.log('saveMenu',state, action);
  //   return { ...state, menuData: action.payload || {} };
  //   // return { ...state, ...payload };
  // },


  // addMenu(state, {payload}) {
  //   console.log('addMenu',state, payload);
  //   // return { ...state, menuData: action.payload || {} };
  //   return { ...state, ...payload };
  // },
};
export default UserModel;
