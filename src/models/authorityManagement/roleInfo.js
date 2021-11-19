import { stringify } from "querystring";
import { history } from "umi";
import {
  getDropDownInit,
  postListInit,
  getUpdateInit,
  deleteRole,
  getAddDropDownInit,
  addRole,
  updateRole,
  getDetail,
} from "@/services/authorityManagement/roleInfo";
import globalConfig from "../../../config/defaultSettings";
import { message } from "antd";
import { resolve } from "path";

const TableName = "roleInfo";
const Model = {
  namespace: TableName,
  state: {
    FromParams: {},
    TableData: [],
    tableLoading: false,
    pagination: {
      PageIndex: Number(globalConfig.table.paginationConfig.PageIndex) || 1, //当前页数
      PageSize: Number(globalConfig.table.paginationConfig.PageSize) || 10, // 表格每页显示多少条数据
      Total: Number(globalConfig.table.paginationConfig.Total) || 10, //总条数
    },
    addModalVisible: false,
    updateModalVisible: false,
    detailModalVisible: false,
    EditData: {},
    DetailData: {},
    record: {},
    SelectConditionInitData: {
      companyList: [],
    },
    userList: [],
    menuList: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname == `/authorityManagement/${TableName}`) {
          dispatch({
            type: "getDropDownInit",
          });
          dispatch({
            type: "getRoleList",
            payload: {
              data: {},
              pageNum: Number(globalConfig.table.paginationConfig.PageIndex), //当前页数
              pageSize: Number(globalConfig.table.paginationConfig.PageSize), // 表格每页显示多少条数据
            },
          });
        }
      });
    },
  },
  effects: {
    /**
     *
     * @param {getDropDownInit} 查询初始化
     * @param {query} 查询
     */
    *getDropDownInit({ payload }, { call, put, select }) {
      const data = yield call(getDropDownInit);
      if (data.status !== 200) {
        return message.error(data.message);
      } else if (data.status == 200) {
        yield put({
          type: "querySuccess",
          payload: {
            type: "getDropDownInit",
            data: data.data,
          },
        });
        // return message.success(data.message);
      }
    },

    *getRoleList({ payload }, { call, put, select }) {
      yield put({ type: "loadingChanger", payload: "showLoading" });
      yield put({ type: "FromParamsChanger", payload: payload });
      const data = yield call(postListInit, payload);
      if (data.status !== 200) {
        return message.error(data.message);
      } else if (data.status == 200) {
        yield put({
          type: "querySuccess",
          payload: {
            type: "getRoleList",
            data: data.data,
          },
        });
        yield put({
          type: "tablePaginationChanger",
          payload: {
            PageIndex: payload.pageNum,
            PageSize: payload.pageSize,
            total: data.data.total,
          },
        });
        yield put({ type: "loadingChanger", payload: "closeLoading" });
        // return message.success(data.message);
      }
    },

    *addRole({ payload }, { call, put, select }) {
      const data = yield call(addRole, payload);
      if (data.status !== 200) {
        return message.error(data.message);
      } else if (data.status == 200) {
        yield put({ type: "hideModal", payload: "addModalVisible" });
        const FromParams = yield select((state) => state[TableName].FromParams);
        yield put({
          type: "getRoleList",
          payload: {
            ...FromParams,
          },
        });
        yield put({
          type: "tablePaginationChanger",
          payload: {
            PageIndex: payload.pageNum,
            PageSize: payload.pageSize,
            total: data.data.total,
          },
        });
        return message.success(data.message);
      }
    },

    *updateRole({ payload }, { call, put, select }) {
      const data = yield call(updateRole, payload);
      if (data.status !== 200) {
        return message.error(data.message);
      } else if (data.status == 200) {
        yield put({ type: "hideModal", payload: "updateModalVisible" });
        const FromParams = yield select((state) => state[TableName].FromParams);
        yield put({
          type: "getRoleList",
          payload: {
            ...FromParams,
          },
        });
        yield put({
          type: "tablePaginationChanger",
          payload: {
            PageIndex: payload.pageNum,
            PageSize: payload.pageSize,
            total: data.data.total,
          },
        });
        return message.success(data.message);
      }
    },

    *deleteRole({ payload }, { call, put, select }) {
      console.log("delete", payload);
      const data = yield call(deleteRole, payload);
      if (data.status !== 200) {
        return message.error(data.message);
      } else if (data.status == 200) {
        const FromParams = yield select((state) => state[TableName].FromParams);
        yield put({
          type: "getRoleList",
          payload: {
            ...FromParams,
          },
        });
        yield put({
          type: "tablePaginationChanger",
          payload: {
            PageIndex: payload.pageNum,
            PageSize: payload.pageSize,
            total: data.data.total,
          },
        });
        return message.success(data.message);
      }
    },

    *showModalAndAjax({ payload }, { call, put }) {
      if (payload.modalType === "addModalVisible") {
        const data = yield call(getAddDropDownInit);
        if (data.status !== 200) {
          yield put({ type: "hideModal", payload: payload });
          return message.error(data.message);
        } else if (data.status == 200) {
          yield put({
            type: "querySuccess",
            payload: {
              type: "getAddDropDownInit",
              data: data.data,
            },
          });
          yield put({ type: "showModal", payload: payload });
        }
      } else if (payload.modalType === "updateModalVisible") {
        const data = yield call(getUpdateInit, payload.record.id);
        if (data.status !== 200) {
          return message.error(data.message);
        } else if (data.status == 200) {
          yield put({
            type: "querySuccess",
            payload: {
              type: "getUpdateInit",
              data: data.data,
            },
          });
          yield put({ type: "showModal", payload: payload });
        }
      } else if (payload.modalType === "detailModalVisible") {
        const data = yield call(getUpdateInit, payload.record.id);
        if (data.status !== 200) {
          return message.error(data.message);
        } else if (data.status == 200) {
          yield put({
            type: "querySuccess",
            payload: {
              type: "getDetail",
              data: data.data,
            },
          });
          yield put({ type: "showModal", payload: payload });
        }
      }
    },
  },
  reducers: {
    //打开关闭Modals
    showModal(state, { payload }) {
      return { ...state, ...payload, [payload.modalType]: true };
    },
    hideModal(state, { payload }) {
      return { ...state, ...payload, [payload]: false };
    },
    querySuccess(state, { payload }) {
      if (payload.type === "getDropDownInit") {
        return {
          ...state,
          ...payload,
          SelectConditionInitData: {
            companyList: payload.data,
          },
        };
      } else if (payload.type === "getRoleList") {
        return {
          ...state,
          TableData: payload.data.list,
          // TableList: new Promise(resolve => {
          //     resolve({
          //         TableData: payload.data.list,
          //         current: payload.data.pageNum,
          //         pageSize: payload.data.pageSize,
          //         success: true,
          //         total: payload.data.total
          //     })
          // })
        };
      } else if (payload.type === "getUpdateInit") {
        return {
          ...state,
          SelectConditionInitData: {
            companyList: payload.data.CompanyList,
          },
          userList: payload.data.UserList,
          menuList: payload.data.SysMenuList,
          EditData: payload.data.Role,
        };
      } else if (payload.type === "getAddDropDownInit") {
        return {
          ...state,
          ...payload,
          SelectConditionInitData: {
            companyList: payload.data.CompanyList,
          },
          userList: payload.data.UserList,
          menuList: payload.data.SysMenuList,
        };
      } else if (payload.type === "getDetail") {
        // return {
        //     ...state, ...payload,
        //     DetailData: payload.data
        // }
        return {
          ...state,
          SelectConditionInitData: {
            companyList: payload.data.CompanyList,
          },
          userList: payload.data.UserList,
          menuList: payload.data.SysMenuList,
          DetailData: payload.data.Role,
        };
      }
    },

    //teble loading处理
    loadingChanger(state, { payload }) {
      if (payload === "showLoading") {
        return { ...state, ...payload, tableLoading: true };
      } else if (payload === "closeLoading") {
        return { ...state, ...payload, tableLoading: false };
      }
    },
    //改变table pageIndex pageSize
    tablePaginationChanger(state, { payload }) {
      return {
        ...state,
        ...payload,
        pagination: {
          PageIndex: payload.PageIndex,
          PageSize: payload.PageSize,
          total: payload.total,
        },
      };
    },
    // 改变table 查询条件
    FromParamsChanger(state, { payload }) {
      return { ...state, ...payload, FromParams: payload };
    },
  },
};
export default Model;
