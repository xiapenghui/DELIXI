import { getMenuListByUserId, queryCurrent } from "@/services/user";
import { message } from "antd";
import { history } from "umi";
const RouterModel = {
  namespace: "route",
  state: {
    menuData: JSON.parse(localStorage.getItem("user_menu")) == null ? [] : JSON.parse(localStorage.getItem("user_menu")),
    userData: null,
  },
  effects: {
    // *getMenuListByUserId(_, { call, put }) {
    *getMenuListByUserId({ payload }, { call, put }) {
      
      const response = yield call(queryCurrent);
      console.log("获取user", response);
      if (response.status == "200") {
        yield put({
          type: "setUserData",
          payload: response.data,
        });
        const response2 = yield call(getMenuListByUserId, response.data.id);
        console.log("获取菜单", response2);
        localStorage.setItem("user_menu", JSON.stringify(response2.data));
        yield put({
          type: "querySuccess",
          payload: response2.data,
        });
        history.push("/");
      }
      // window.location.href = '/';
    },
  },
  reducers: {
    setUserData(state, { payload }) {
      return {
        ...state,
        userData: payload,
      };
    },
    querySuccess(state, action) {
      return {
        ...state,
        menuData: JSON.parse(localStorage.getItem("user_menu")),
      };
    },
  },
};
export default RouterModel;
