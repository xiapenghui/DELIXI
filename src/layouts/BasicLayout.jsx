/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout, { DefaultFooter } from '@ant-design/pro-layout';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useIntl, connect, history } from 'umi';
import {
  GithubOutlined, ClusterOutlined, BarChartOutlined, ClockCircleOutlined, SearchOutlined, SettingOutlined, SmileOutlined
} from '@ant-design/icons';
import { Result, Button } from 'antd';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import { getMatchMenu } from '@umijs/route-utils';
import logo from '../assets/logo.png';
const noMatch = (
  <Result
    status={403}
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button type="primary">
        <Link to="/user/login">Go Login</Link>
      </Button>
    }
  />
);



/**
 * 重点：自定义了一个枚举 图标的方法
 * 原因：后台传过来的icon:string  再菜单中无法显示图标
 */
const iconEnum = {
  smile: <SmileOutlined />,
  SettingOutlined: <SettingOutlined />,
  ClusterOutlined: <ClusterOutlined />,
  ClockCircleOutlined: <ClockCircleOutlined />,
  SearchOutlined: <SearchOutlined />,
  BarChartOutlined: <BarChartOutlined />
};



/**
 * use Authorized check all menu item
 */
const menuDataRender = (menuList) =>
  menuList.map((item) => {
    const localItem = {
      ...item,
      icon: iconEnum[item.icon],
      children: item.children ? menuDataRender(item.children) : [],
    };
    // return Authorized.check(item.authority, localItem, null);
    return localItem;
  }

  );

const defaultFooterDom = (
  <DefaultFooter
    copyright={`${new Date().getFullYear()} 睿流技术部出品`}
    links={[
      {
        key: 'Ant Design Pro',
        title: 'Ant Design Pro',
        href: 'https://pro.ant.design',
        blankTarget: true,
      },
      {
        key: 'github',
        title: <GithubOutlined />,
        href: 'https://github.com/ant-design/ant-design-pro',
        blankTarget: true,
      },
      {
        key: 'Ant Design',
        title: 'Ant Design',
        href: 'https://ant.design',
        blankTarget: true,
      },
    ]}
  />
);

const BasicLayout = (props) => {
  const {
    dispatch,
    children,
    settings,
    menuData,
    currentUser,
    user,
    route,
    location = {
      pathname: '/',
    },
  } = props;
  const menuDataRef = useRef([]);
  const [_menuData, set_MenuData] = useState([]);
  const [menuLoading, setMenuLoading] = useState(true);

  const actionRef = useRef();

  const fetchCurrent_getMenuListByUserId = async (id) => {
    // console.log('currentUser-id--------------->1', id);
    // await dispatch({
    //   type: 'user/fetchCurrent',
    // });
    // console.log('currentUser-id--------------->2', id);
    // await dispatch({
    //   type: 'route/getMenuListByUserId',
    //   payload: id,
    // });

    // console.log('actionRef,',actionRef

    // history.push('/');
    // return <Redirect to={`/`} />;

  }
  //  console.log('menuData-wjj',_menuData)
  useEffect(() => {
    // setMenuLoading(true)
    console.log("user---menu--------->", user, route.menuData);
    // if (location.pathname === '/welcome' || location.pathname === '/') {
    //   fetchCurrent_getMenuListByUserId(user.currentUser.id);

    // }

  }, []);


  const handleMenuCollapse = (payload) => {
    //  console.log("--------------")
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  }; // get children authority

  const authorized = useMemo(
    () =>
      getMatchMenu(location.pathname || '/', menuDataRef.current).pop() || {
        authority: undefined,
      },
    [location.pathname],
  );
  const { formatMessage } = useIntl();

  const waitTime = (time = 100) => {

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };
  return (
    <ProLayout
      actionRef={actionRef}
      // logo={ <img alt={'logo'} src={logo} style={{ width: '162px', height: '152px', marginBottom: '7px' }} />}
      // logo={<img alt={'logo'} src={logo} style={{ width: '155px', height: '32px', marginBottom: '7px' }} />}
      logo={<img alt={'logo'} src={logo} style={{ width: '200px', height: '80px',padding:'5px 30px 5px 15px' }} />}
      formatMessage={formatMessage}
      onCollapse={handleMenuCollapse}
      onMenuHeaderClick={() => history.push('/')}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl || !menuItemProps.path) {
          return defaultDom;
        }

        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      breadcrumbRender={(routers = []) => [
        {
          path: '/',
          breadcrumbName: formatMessage({
            id: 'menu.home',
          }),
        },
        ...routers,
      ]}
      itemRender={(route, params, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        return first ? (
          <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
        ) : (
          <span>{route.breadcrumbName}</span>
        );
      }}
      menu={{
        locale: false,
        //   // loading:true
        request: async () => {
          await waitTime(500);
          return route.menuData;
        },
      }}
      // footerRender={() => defaultFooterDom}
      //   location={{
      //     pathname: '/',
      // }}
      menuDataRender={() => menuDataRender(route.menuData)}
      rightContentRender={() => <RightContent />}
      postMenuData={(menuData) => {
        menuDataRef.current = menuData || [];
        return menuData || [];
      }}
      {...props}
      {...settings}
    >
      <Authorized authority={authorized.authority} noMatch={noMatch}>
        {children}
      </Authorized>
    </ProLayout>
  );
};


export default connect(({ global, settings, user, route }) => ({
  collapsed: global.collapsed,
  settings,
  user,
  route,
  menuData: route.menuData
}))(BasicLayout);
