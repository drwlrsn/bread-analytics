import { Link, useNavigate } from '@reach/router';
import { Alert, Button, Col, Form, Input } from 'antd';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../AuthContext';
import { auth } from '../firebase';
import { Centered } from '../Layouts/Centered';
import { useEffect } from 'react';

const LoginForm = () => {
  const [error, setError] = useState(null);
  const {
    auth: { id },
    signIn,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      navigate('/');
    }
  }, [id, navigate]);

  const onFinish = values => {
    auth
      .signInWithEmailAndPassword(values.email, values.password)
      .then(({ user: { uid: id, displayName: name, email, emailVerified } }) =>
        signIn({ id, name, emailVerified, email }),
      )
      .catch(error => setError(error.message));
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      layout="vertical"
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      {error && (
        <Alert message="Error" description={error} type="error" showIcon />
      )}
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
          {
            type: 'email',
            message: 'Please enter a valid email.'
          },
        ]}
      >
        <Input size="large" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password size="large" />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Submit
      </Button>
      <Button type="link">
        <Link to="/signup">Create an account</Link>
      </Button>
    </Form>
  );
};

export const Login = () => (
  <Centered title="Login">
    <Col span={6}>
      <LoginForm />
    </Col>
  </Centered>
);
