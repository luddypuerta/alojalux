//Libraries
import React, { useState } from 'react';
import { Drawer, Form, Input, Button } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { useNavigate } from "react-router-dom";

interface LoginDrawerComponentProps {
  open: boolean;
  onClose: () => void;
}

const LoginDrawerComponent: React.FC<LoginDrawerComponentProps> = ({ open, onClose }) => {
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
    <Drawer title="Iniciar Sesión" onClose={onClose} open={open}>
      <Form form={form} onFinish={authLogin}>
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
