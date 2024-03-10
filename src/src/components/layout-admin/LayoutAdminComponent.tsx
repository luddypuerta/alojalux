//Assets
import logo from '@assets/icons/logo.png';

//Libraries
import React, { useState, ReactNode } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    HomeOutlined,
    CalendarOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button } from 'antd';
import { Link } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";


//Interfaces
interface LayoutAdminComponentProps {
    children: ReactNode;
}

//Styles 
import './LayoutAdminComponent.scss'

//Variables
const { Header, Sider, Content } = Layout;

const LayoutAdminComponent: React.FC<LayoutAdminComponentProps> = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();


    const signOut = () => {
        localStorage.removeItem('token');
        navigate('/home');
    };

    return (
        <Layout className='layout-admin'>
            <Sider 
                className='layout-admin__sider'
                trigger={null} 
                collapsible 
                collapsed={collapsed}>
                <div className="layout-admin__logo">
                    <img src={logo} alt="Imagen" className="layout-admin__logo-image" />
                </div>
                <Menu
                    theme="dark"
                    mode="inline" defaultSelectedKeys={['1']}
                    className='layout-admin__menu'
                    items={[
                        {
                            key: '1',
                            icon: <HomeOutlined />,
                            label: <Link to="/admin/hotels">Hoteles</Link>,
                        },
                        {
                            key: '2',
                            icon: <CalendarOutlined />,
                            label: <Link to="/admin/bookings">Reservas</Link>,
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header className='layout-admin__header'>
                    <Button
                        type="text"
                        className='layout-admin__header__button-collapsed'
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                    />
                    <Button 
                        className='layout-admin__header__button-sign-out'
                        onClick={signOut}>
                        Cerrar Sesión
                        <LogoutOutlined />
                    </Button>
                </Header>
                <Content
                    className='layout-admin__header__content'>
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default LayoutAdminComponent;
