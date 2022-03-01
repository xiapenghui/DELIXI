import { LogoutOutlined, SettingOutlined, UserOutlined, EditOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Avatar, Menu, Spin, Modal, Input, Form, message } from 'antd';
import React, { useState, useEffect } from 'react';
import { history, connect } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import globalConfig from '../../../config/defaultSettings';
const formItemLayout = globalConfig.table.formItemLayout

class AvatarDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisiable: false,
    }
  }
  form = React.createRef();
  onMenuClick = (event) => {
    const { key } = event;
    if (key === 'logout') {
      const { dispatch } = this.props;
      if (dispatch) {
        dispatch({
          type: 'login/logout',
        });
      }
      localStorage.removeItem("user_menu")
      localStorage.removeItem("user_token")
      dispatch({
        type: 'user/userOut',
      });
      return;
    } else if (key === 'updatePassword') {
      // setModalVisible(true)
      this.setState({
        modalVisiable: true
      })
      return;
    }

    history.push(`/account/${key}`);
  };
  render() {
    const {
      currentUser = {
        // avatar: '',
        name: '',
      },
      menu,
      dispatch
    } = this.props;
    // const [modalVisiable, setModalVisible] = useState(false)
    const { modalVisiable } = this.state
    const onSave = async (values) => {
      const params = {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
        userId: currentUser.id
      }
      console.log('update', params)
      dispatch({
        type: `user/updatePassword`,
        payload: {
          data: params
        },
        callback: (res) => {
          if (res.status != 200) {
            return message.error(res.message)
          } else {
            this.setState({
              modalVisiable: false
            })
            return message.success(res.message)
          }

        }
      });
      this.form.current.resetFields()
      dispatch({
        type: 'login/logout',
      });
      localStorage.removeItem("user_menu");
      localStorage.removeItem("user_token");

    }

    const handleCancel = () => {
      // setModalVisible(false);
      this.setState({
        modalVisiable: false
      })
    };
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        {menu && (
          <Menu.Item key="center">
            <UserOutlined />
            个人中心
          </Menu.Item>
        )}
        {menu && (
          <Menu.Item key="settings">
            <SettingOutlined />
            个人设置
          </Menu.Item>
        )}
        {menu && <Menu.Divider />}

        <Menu.Item key="logout">
          <LogoutOutlined />
          退出登录
        </Menu.Item>

        <Menu.Item key="updatePassword">
          <EditOutlined />
          修改密码
        </Menu.Item>
      </Menu>
    );
    
    return currentUser && currentUser.account ? (
      <div>
        <HeaderDropdown overlay={menuHeaderDropdown}>
          <span className={`${styles.action} ${styles.account}`}>
            {/* <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" /> */}
            <span className={`${styles.name} anticon`}>{currentUser.account}</span>
          </span>
        </HeaderDropdown>
        <Modal
          title="修改密码"
          visible={modalVisiable}
          onOk={() => {
            this.form.current
              .validateFields()
              .then((values) => {
                onSave(values);
              })
              .catch((info) => {
                console.log('UpdateForm Failed:', info);
              })
          }}
          // confirmLoading={confirmLoading}
          onCancel={handleCancel}
          okText="是"
          cancelText="否"
          closable={false}
          maskClosable={false}
        >
          <Form
            ref={this.form}
            initialValues={{
            }}
          >
            <Form.Item
              name="oldPassword"
              label="旧密码"
              hasFeedback
              {...formItemLayout}
              rules={[{
                required: true, message: '请输入旧密码',
              }]}
            >
              <Input.Password
                placeholder="请输入旧密码"
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>
            <Form.Item
              name="newPassword"
              label="新密码"
              hasFeedback
              {...formItemLayout}
              rules={[{
                required: true, message: '请输入新密码',
              }]}
            >
              <Input.Password
                placeholder="请输入新密码"
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              label="确认新密码"
              hasFeedback
              {...formItemLayout}
              rules={[{
                required: true, message: '请确认新密码',
              }]}
            >
              <Input.Password
                placeholder="请确认新密码"
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    ) : (
      <span className={`${styles.action} ${styles.account}`}>
        <Spin
          size="small"
          style={{
            marginLeft: 8,
            marginRight: 8,
          }}
        />
      </span>
    );
  }
}

export default connect(({ user }) => ({
  currentUser: user.currentUser,
}))(AvatarDropdown);
