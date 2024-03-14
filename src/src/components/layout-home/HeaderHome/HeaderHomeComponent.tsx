//Assets
import logo from '@assets/icons/logo.png';

//Compoments
import LoginDrawerComponent from '../../drawer/LoginDrawerComponent'

//Libraries
import React, { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

//Styles
import "./HeaderHomeComponent.scss";

const HeaderHomeComponent: React.FC = () => {
    const [open, setOpenDrawer] = useState(false);

    const showDrawer = () => {
        setOpenDrawer(true);
    };

    const onCloseDrawer = () => {
        setOpenDrawer(false);
    };
  
    return (
        <header className='grid-container'>
            <div className='header-component grid-x'>
                <Link to="/home" className="header-component__logo">
                    <img src={logo} alt="Logo" />
                </Link>
                <button 
                    className="header-component__login"
                    onClick={showDrawer}>
                    <UserOutlined className='header-component__login__icon-profile'/>
                    <span> Iniciar sesión </span>
                </button>
            </div>
            <LoginDrawerComponent isVisible={open} onCloseDrawer={onCloseDrawer}/>
        </header>
    );
};

export default HeaderHomeComponent;
