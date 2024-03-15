//Libraries
import React, { useState } from 'react';
import { Drawer, Form, Input, Button } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { useNavigate } from "react-router-dom";

//Services
import { authService } from '../../services/login/loginServices';

//Styles
import './LoginDrawerComponent.scss'

//Utils
import ErrorAlertComponent from '../../utils/alerts/error-alert.component';
import SuccessAlertComponent from '../../utils/alerts/success-alert.component';

interface LoginDrawerComponentProps {
  isVisible: boolean;
  onCloseDrawer: () => void;
}

const LoginDrawerComponent: React.FC<LoginDrawerComponentProps> = ({ isVisible, onCloseDrawer }) => {
  const [form] = Form.useForm<FormInstance>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const authLogin = async (values: any) => {

    try {
      const { password, username } = values
      setLoading(true);
  
      const responseLogin = await authService(username, password)
      if (responseLogin) {
        localStorage.setItem("token", responseLogin?.token);
        setLoading(false);
        navigate('/admin/hotels');
        SuccessAlertComponent("¡Bienvenido a la administración!", "Has iniciado sesión exitosamente.");
      }
    } catch (error: any) {
      setLoading(false);
      if (error && error.code === 'US-0001') {
        ErrorAlertComponent("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
      } else {
        ErrorAlertComponent("Ocurrió un error en el servidor. Por favor, inténtalo de nuevo más tarde.");
      }
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
