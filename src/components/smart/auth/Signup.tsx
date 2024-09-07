import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Alert, Row, Col, Card } from 'antd';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { setAuthSuccess, setProfile } from '@client/store/auth/authActions';

const Signup = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSignup = (values: { email: any; password: any }) => {
    const { email, password } = values;
    const auth = getAuth();
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoading(false);
        history.push('/login');
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage); // Display error message on UI
        setLoading(false);
      });
  };

  useEffect(()=>{
    const user = localStorage.getItem("user")
    if(user) {
      dispatch(setAuthSuccess(JSON.parse(user)));
      dispatch(setProfile(JSON.parse(user)));
      history.push('/')
    }
    },[])

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Col>
      <Card style={{
        width:'450px'
      }}>
        <Form
          form={form}
          name="register"
          onFinish={handleSignup}
          scrollToFirstError
          layout="vertical"
        >
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      'The two passwords that you entered do not match!',
                    ),
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Register
            </Button>
          </Form.Item>
          <Form.Item></Form.Item>
        </Form>
        {error && <Alert message={error} type="error" showIcon />}
        <Button
          type="link"
          onClick={() => {
            form.resetFields();
            history.push('/login');
          }}
        >
          Already have an account? Log in
        </Button>
        </Card>
      </Col>
    </Row>
  );
};

export default Signup;
