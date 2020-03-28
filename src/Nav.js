import React, { useContext } from 'react';
import { Layout, Menu } from 'antd';
import { auth } from './firebase';
import { navigate } from '@reach/router';
import { AuthContext } from './AuthContext';

const { Header } = Layout;
export const Nav = () => {
  const {
    auth: { id },
    signOut,
  } = useContext(AuthContext);
  return (
    <Header>
      <Menu theme="dark" mode="horizontal">
        <Menu.Item key="1">nav 1</Menu.Item>
        {id && (
          <Menu.Item
            key="3"
            onClick={() => {
              auth.signOut().then(signOut);
            }}
          >
            Logout
          </Menu.Item>
        )}
      </Menu>
    </Header>
  );
};
