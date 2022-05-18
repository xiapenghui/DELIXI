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

            {
              path: '/information',
              name: '信息管理',
              icon: 'ClusterOutlined',
              routes: [
                {
                  path: '/information/materialInfo',
                  name: '物料信息管理',
                  icon: 'smile',
                  component: '../pages/information/materialInfo',
                },
              
                
                {
                  path: '/information/printInfo',
                  name: '打印信息管理',
                  icon: 'smile',
                  component: '../pages/information/printInfo',
                },


                {
                  path: '/information/printBag',
                  name: '打印袋装条码',
                  icon: 'smile',
                  component: '../pages/information/printBag',
                },

                {
                  path: '/information/printMake',
                  name: '打印记录补打',
                  icon: 'smile',
                  component: '../pages/information/printMake',
                },

                {
                  path: '/information/printMakeCopy',
                  name: '打印信息状态',
                  icon: 'smile',
                  component: '../pages/information/printMakeCopy',
                },

                {
                  path: '/information/printRecord',
                  name: '打印信息记录',
                  icon: 'smile',
                  component: '../pages/information/printRecord',
                },

                {
                  path: '/information/returnInfo',
                  name: '三包退返管理',
                  icon: 'smile',
                  component: '../pages/information/returnInfo',
                },

                {
                  path: '/information/printSea',
                  name: '打印海外条码',
                  icon: 'smile',
                  component: '../pages/information/printSea',
                },
              ],
            },
            {
              path: '/authorityManagement',
              name: '参数管理',
              icon: 'SettingOutlined',
              routes: [
                {
                  path: "/authorityManagement/factoryInfo",
                  name: "工厂信息管理",
                  icon: "smile",
                  component: "../pages/authorityManagement/factoryInfo",
                },
                {
                  path: '/authorityManagement/userInfo',
                  name: '用户信息管理',
                  icon: 'smile',
                  component: '../pages/authorityManagement/userInfo',
                },

                {
                  path: '/authorityManagement/templateinfo',
                  name: '模板信息管理',
                  icon: 'smile',
                  component: '../pages/authorityManagement/templateinfo',
                },

                {
                  path: '/authorityManagement/materialAllo',
                  name: '物料分配管理',
                  icon: 'smile',
                  component: '../pages/authorityManagement/materialAllo',
                },

                {
                  path: '/authorityManagement/materialMain',
                  name: '物料分配维护',
                  icon: 'smile',
                  component: '../pages/authorityManagement/materialMain',
                },

                {
                  path: '/authorityManagement/passwordManage',
                  name: '密码规则管理',
                  icon: 'smile',
                  component: '../pages/authorityManagement/passwordManage',
                },
                {
                  path: '/authorityManagement/roleInfo',
                  name: '角色信息管理',
                  icon: 'smile',
                  component: '../pages/authorityManagement/roleInfo',
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
