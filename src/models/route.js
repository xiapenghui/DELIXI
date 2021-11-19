import { getMenuListByUserId, queryCurrent } from "@/services/user";
import { message } from "antd";
import { history } from "umi";
const RouterModel = {
  namespace: "route",
  state: {
    menuData: [
      {
        path: "/",
        redirect: "/welcome",
      },
      {
        path: "/welcome",
        name: "welcome",
        icon: "smile",
        component: "./Welcome",
      },
      {
        path: "/information",
        name: "业务管理",
        icon: "ClusterOutlined",
        routes: [
          {
            path: "/information/department",
            name: "物料信息管理",
            icon: "smile",
            component: "../pages/information/department",
          },
          {
            path: "/information/personnel",
            name: "模板信息管理",
            icon: "smile",
            component: "../pages/information/personnel",
          },
          {
            path: "/information/timeMaintain",
            name: "打印信息管理",
            icon: "smile",
            component: "../pages/information/timeMaintain",
          },

          {
            path: "/information/classMaintain",
            name: "打印信息记录",
            icon: "smile",
            component: "../pages/information/classMaintain",
          },

          {
            path: '/information/timeInfo',
            name: '物料分配管理',
            icon: 'smile',
            component: '../pages/information/timeInfo',
          },
        ],
      },
      {
        path: "/authorityManagement",
        name: "角色管理",
        icon: "SettingOutlined",
        routes: [
          {
            path: "/authorityManagement/factoryInfo",
            name: "工厂管理",
            icon: "smile",
            component: "../pages/authorityManagement/factoryInfo",
          },
          
          {
            path: "/authorityManagement/userInfo",
            name: "用户管理",
            icon: "smile",
            component: "../pages/authorityManagement/userInfo",
          },
          {
            path: "/authorityManagement/roleInfo",
            name: "角色管理",
            icon: "smile",
            component: "../pages/authorityManagement/roleInfo",
          },

         
        ],
      },
    ],
    // menuData: JSON.parse(localStorage.getItem("user_menu")) == null ? [] : JSON.parse(localStorage.getItem("user_menu")),
    userData: null,
    // menuData: localStorage.getItem("user_menu") == null ? [] : localStorage.getItem("user_menu"),
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
