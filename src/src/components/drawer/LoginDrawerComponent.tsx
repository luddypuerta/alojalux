//Libraries
import React, { useState } from 'react';
import { Drawer, Form, Input, Button } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { useNavigate } from "react-router-dom";

//Styles
import './LoginDrawerComponent.scss'

interface LoginDrawerComponentProps {
  isVisible: boolean;
  onCloseDrawer: () => void;
}

const LoginDrawerComponent: React.FC<LoginDrawerComponentProps> = ({ isVisible, onCloseDrawer }) => {
  const [form] = Form.useForm<FormInstance>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const authLogin = async (values: any) => {
    setLoading(true);
    const { password, username } = values

    if (password === '123456' && username === 'admin') {
      const token = '123452134234234'
      localStorage.setItem("token", token);
      setLoading(false);
      navigate('/admin/hotels');
    }
  };

  return (
    <Drawer 
      className='login-drawer'
      title="Iniciar Sesión" onClose={onCloseDrawer} open={isVisible}>
      <Form 
        className='grid-x login-drawer__form'
        form={form} onFinish={authLogin}
        >
        <Form.Item
          label="Usuario"
          name="username"
          rules={[{ required: true, message: 'Por favor ingresa tu usuario' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Contraseña"
          name="password"
          rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Iniciar sesión
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default LoginDrawerComponent;
