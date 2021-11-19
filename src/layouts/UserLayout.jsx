import { DefaultFooter, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link, SelectLang, useIntl, connect } from 'umi';
import React from 'react';
import logo from '../assets/logo.png';
import styles from './UserLayout.less';
const {Multilingualism_ENV } = process.env;
const UserLayout = (props) => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { formatMessage } = useIntl();
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    formatMessage,
    breadcrumb,
    ...props,
  });
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
      {
        Multilingualism_ENV ?
        <div className={styles.lang}>
          <SelectLang />
        </div>
          :
          null
      }

        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">

                {/* <span className={styles.title}>Lean Digitization System</span><br />
                <span className={styles.title}>（SSPA 生产数字平台）</span> */}
              </Link>
            </div>
          </div>
          {children}
        </div>
      </div>
    </HelmetProvider>
  );
};

export default connect(({ settings }) => ({ ...settings }))(UserLayout);
// <img alt="logo" className={styles.logo} src={logo} />
