import React, { useState, useContext } from 'react';
import './App.css';
import { Signup } from './Screens/Signup';
import { Router, redirectTo, navigate } from '@reach/router';
import { Login } from './Screens/Login';
import { AuthContext, emptyAuth } from './AuthContext';
import { getCurrentUser } from './firebase';
import { useEffect } from 'react';
import { Unprotected } from './Routes/Unprotected';
import { Protected } from './Routes/Protected';
import { Spin, Row } from 'antd';
import { Centered } from './Layouts/Centered';

function App() {
  const [auth, setAuth] = useState(null);
  useEffect(() => {
    getCurrentUser().then(user => {
      const auth = user
        ? {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            emailVerified: user.emailVerified,
          }
        : emptyAuth;
      setAuth(auth);
    });
  }, []);

  const signOut = () => {
    setAuth(emptyAuth);
    navigate('/login');
  };

  const signIn = ({ email, emailVerified, name, id }) =>
    setAuth({
      email,
      emailVerified,
      name,
      id,
    });

  return auth === null ? (
    <Centered>
      <Row span={4}>
        <Spin />
      </Row>
    </Centered>
  ) : (
    <AuthContext.Provider value={{ auth, signOut, signIn }}>
      <Router>
        <Unprotected default />
        <Protected path="/" />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
