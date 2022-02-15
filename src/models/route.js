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
            path: "/information/materialInfo",
            name: "物料信息管理",
            icon: "smile",
            component: "../pages/information/materialInfo",
          },
         
          {
            path: "/information/printInfo",
            name: "打印信息管理",
            icon: "smile",
            component: "../pages/information/printInfo",
          },

          {
            path: "/information/printRecord",
            name: "打印信息记录",
            icon: "smile",
            component: "../pages/information/printRecord",
          },
 
        ],
      },
      {
        path: "/authorityManagement",
        name: "参数管理",
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
            path: "/authorityManagement/templateinfo",
            name: "模板信息管理",
            icon: "smile",
            component: "../pages/authorityManagement/templateinfo",
          },
          {
            path: '/authorityManagement/materialAllo',
            name: '物料分配管理',
            icon: 'smile',
            component: '../pages/authorityManagement/materialAllo',
          },
          {
            path: '/authorityManagement/passwordManage',
            name: '密码规则管理',
            icon: 'smile',
            component: '../pages/authorityManagement/passwordManage',
          },
          // {
          //   path: "/authorityManagement/roleInfo",
          //   name: "角色管理",
          //   icon: "smile",
          //   component: "../pages/authorityManagement/roleInfo",
          // },
        ],
      },
    ],
    // menuData: JSON.parse(localStorage.getItem("user_menu")) == null ? [] : JSON.parse(localStorage.getItem("user_menu")),
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
