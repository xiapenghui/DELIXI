/**
 * 权限 高阶组件
 * @param {reactNode} ComposedComponent 需要权限控制的组件
 * @param {string} path 页面pathname
 * @param {string} operCodes 操作web key，暂时用opercode
 * 使用说明：
 * 以下使用的 user 为固定不变，加载项目时，会直接加载opercode
 * @connect(({ user }) => ({
 *   user: user,
 * }))
 * render ....
 * // 引用 user已有的opercode
 * const {user: {userAllAuthRoleList: {operCode = []}}} = this.props;
 
 * // Button 案例
 * const AuthButton = WrapAuth(Button, operCode);
 * <AuthButton operCode="" specialCode="1" className="yg-btn-greyfull" onClick={this.handleSearch} icon="search">搜索</AuthButton>
 * or <AuthButton operCode="" specialCode="1" className="yg-btn-greyfull" onClick={this.handleSearch} icon="search">搜索</AuthButton>

 * // 自定义案例
 * const AuthSpan = WrapAuth(YgSpan, operCode);
 * <AuthSpan operCode="" specialCode="1" onClick={this.handleSearch} />
 * 
 * function YgSpan(props) {
 *  
 *  return (<React.Fragment>
 *    <span>
 *      <i className={'icon iconfont ego-down_16px'} />测试消息
 *    </span>
*   </React.Fragment>);
* }

 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'antd';
import '@/components/CRUDTable/index.less'
const wrapAuth = (ComposedComponent, operCodes = [], path = '') =>
    class WrapComponent extends Component {
        // 构造
        constructor(props) {
            super(props);
            this.state = {
                authority: props.authority,
                obj:null
            };
        }
      
        checkBtnAuth(authority) {
            const currentAuthority = sessionStorage.getItem('antd-pro-authority');
            const hasAuth = !!authority && authority.length > 0 ? currentAuthority.indexOf(authority) !== -1 : true;
            // if (currentAuthority.indexOf(authority) !== -1) {
            //     return true;
            // } else {
            //     return false;
            // }
            this.state.obj ={
                ...this.props,
                disabled: true,
                className: "disabled-link"
            };
            return hasAuth;
        }

        onClickFunc(){
            return (<><Alert message="权限不足，请找管理员小K申请" type="error" showIcon /></>)
        }
        static propTypes = {
            authority: PropTypes.string.isRequired
        };

        render() {
            if (this.checkBtnAuth(this.props.authority)) {
                return <ComposedComponent {...this.props} />;
            } else {
                //没权限不显示
                // return null;
                
                //没权限禁用
                //Link标签disabled无用（没有disabled属性），
                //禁用使用onClick={(e) => e.preventDefault()}或者添加样式className="disabled-link" .disabled-link {pointer-events: none;}
                // return <ComposedComponent { ...this.state.obj} /> 
                return <ComposedComponent { ...this.props} /> 
                
                //没权限点击时提示
                // return <ComposedComponent onClick={() => this.onClickFunc()} {...this.props} />
            }
        }
    };

export default wrapAuth;