// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {
    // dark: true, 
    // compact: true,
  },
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },

  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [

        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/welcome',
            },
            {
              path: '/welcome',
              name: 'welcome',
              icon: 'smile',
              component: './Welcome',
            },
            // {
            //   path: '/echarts',
            //   name: '数据分析',
            //   icon: 'smile',
            //   component: '../pages/echarts',
            // },
            // {
            //   path: '/admin',
            //   name: 'admin',
            //   icon: 'crown',
            //   component: './Admin',
            //   authority: ['admin'],
            //   routes: [
            //     {
            //       path: '/admin/sub-page',
            //       name: 'sub-page',
            //       icon: 'smile',
            //       component: './Welcome',
            //       authority: ['admin'],
            //     },
            //   ],
            // },

            {
              path: '/information',
              name: '信息管理',
              icon: 'ClusterOutlined',
              routes: [
                {
                  path: '/information/department',
                  name: '部门管理',
                  icon: 'smile',
                  component: '../pages/information/department',
                },
                {
                  path: '/information/personnel',
                  name: '员工管理',
                  icon: 'smile',
                  component: '../pages/information/personnel',
                },
                {
                  path: '/information/timeMaintain',
                  name: '班次信息',
                  icon: 'smile',
                  component: '../pages/information/timeMaintain',
                },

                {
                  path: '/information/classMaintain',
                  name: '班别信息',
                  icon: 'smile',
                  component: '../pages/information/classMaintain',
                },

                {
                  path: '/information/timeInfo',
                  name: '时间信息',
                  icon: 'smile',
                  component: '../pages/information/timeInfo',
                },

                {
                  path: '/information/holidayMain',
                  name: '休假选项维护',
                  icon: 'smile',
                  component: '../pages/information/holidayMain',
                },

                {
                  path: '/information/personnelOk',
                  name: '员工确认',
                  icon: 'smile',
                  component: '../pages/information/personnelOk',
                },
              ],
            },
            {
              path: '/authorityManagement',
              name: '角色管理',
              icon: 'SettingOutlined',
              routes: [
                {
                  path: '/authorityManagement/userInfo',
                  name: '用户管理',
                  icon: 'smile',
                  component: '../pages/authorityManagement/userInfo',
                },
                {
                  path: '/authorityManagement/roleInfo',
                  name: '角色管理',
                  icon: 'smile',
                  component: '../pages/authorityManagement/roleInfo',
                },
                {
                  path: "/authorityManagement/factoryInfo",
                  name: "工厂管理",
                  icon: "smile",
                  component: "../pages/authorityManagement/factoryInfo",
                },
              ],
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },



  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  // theme: {
  //   // ...darkTheme,
  //   'primary-color': defaultSettings.primaryColor,
  // },
  theme: {
    'primary-color': defaultSettings.primaryColor,
    'font-size-base': '14px',
    'badge-font-size': '12px',
    'btn-font-size-lg': '@font-size-base',
    'menu-dark-bg': '#00182E',
    'menu-dark-submenu-bg': '#000B14',
    // 'layout-sider-background': '#00182E',
    // 'layout-sider-background': '#008351',
    'layout-sider-background': '#008450',
    'layout-body-background': '#f0f2f5',



  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
