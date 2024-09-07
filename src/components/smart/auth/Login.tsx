import { useEffect, useState } from 'react';
import { Form, Input, Button, Row, Col, Card } from 'antd';
import { login } from '../../../services/authService';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './auth.scss'
import { setAuthSuccess, setProfile } from '@client/store/auth/authActions';

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(()=>{
    const user = localStorage.getItem("user")
    if(user) {
      dispatch(setAuthSuccess(JSON.parse(user)));
      dispatch(setProfile(JSON.parse(user)));
      history.push('/')
    }
    },[])

  const [form] = Form.useForm();
  const handleLogin = async ({ email, password }) => {
    try {
      const resp = await login(email, password, dispatch);
      localStorage.setItem('user',JSON.stringify(resp))
      history.goBack();
    } catch (error) {
      console.error('Failed to login', error);
    }
  };
  return (
    <div className="login-container">
      <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
        <Col>
          <Card
            style={{
              width: '400px',
            }}
          >
            <Form form={form} layout="vertical" onFinish={handleLogin}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Please input your email!' },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: 'Please input your password!' },
                ]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>
              <div className='form-footer'>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Log In
                  </Button>
                </Form.Item>
                <Button
                  type="link"
                  onClick={(e) => {
                    e.preventDefault()
                    form.resetFields();
                    history.push('/signup');
                  }}
                >
                  Sign Up Instead
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
