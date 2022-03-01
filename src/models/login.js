import { stringify } from 'querystring';
import { history } from 'umi';
import { fakeAccountLogin } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';



const Model = {
  namespace: 'login',
  state: {
    status: undefined,
    test: 'test',
    tokenData:[],
    currentUser:null
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      console.log('fakeAccountLogin123', response)
      
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      if (response.status === 'ok') {
        localStorage.setItem("user_token", response.token);     
        yield put({
          type: 'userToken',
          payload: response.token,
        });   
     
        // window.location.href = redirect || window.history;
      }
    },

    logout() {

      const { redirect } = getPageQuery(); // Note: There may be security issues, please note
      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
     
      // localStorage.removeItem("antd-pro-authority");  
    },

  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload  };
    },
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return { ...state, status: payload.status, type: payload.type, message: payload.message };
    },
    userToken(state, { payload }) {
      return { ...state, tokenData:payload };
    },
  },
};
export default Model;
