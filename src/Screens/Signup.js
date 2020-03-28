import React from 'react';
import { Form, Input, Button, Col } from 'antd';
import { Centered } from '../Layouts/Centered';
import { auth } from '../firebase';
import { useForm } from 'antd/lib/form/util';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { useNavigate } from '@reach/router';

const SignUpForm = () => {
  const [form] = useForm();
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const onFinish = async values => {
    console.log('Success:', values);
    try {
      const {
        user: { uid: id, email, emailVerified },
      } = await auth.createUserWithEmailAndPassword(
        values.email,
        values.password,
      );
      signIn({ id, name: values.name, email, emailVerified });
      navigate('/');
    } catch (error) {
      // eslint-disable-next-line default-case
      switch (error.code) {
        case 'auth/email-already-in-use':
        case 'auth/invalid-email':
          form.setFields({
            touched: true,
            validating: false,
            errors: [error.message],
            name: 'email',
            value: '',
          });
          break;
        case 'auth/weak-password':
          form.setFields({
            touched: true,
            validating: false,
            errors: [error.message],
            name: 'password',
            value: '',
          });
          break;
      }
      console.error(error);
    }

    try {
      auth.currentUser.updateProfile({ displayName: values.name });
    } catch (error) {}
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      // {...layout}
      form={form}
      name="signup"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input your name!',
          },
        ]}
      >
        <Input size="large" />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
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
      <Button type="primary" htmlType="submit" size="large" block>
        Sign up
      </Button>
    </Form>
  );
};

export const Signup = () => (
  <Centered
    title="Sign up"
    subTitle="Create a profile to start using Bread Analytics"
  >
    <Col span={6}>
      <SignUpForm />
    </Col>
  </Centered>
);
