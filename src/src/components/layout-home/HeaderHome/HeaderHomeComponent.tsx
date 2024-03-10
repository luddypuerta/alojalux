//Assets
import logo from '@assets/icons/logo.png';

//Compoments
import LoginDrawerComponent from '../../drawer/LoginDrawerComponent'

//Libraries
import React, { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';

//Styles
import "./HeaderHomeComponent.scss";

const HeaderHomeComponent: React.FC = () => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
  
    return (
        <header className='grid-container'>
            <div className='header-component grid-x'>
                <div className="header-component__logo">
                    <img src={logo} alt="Logo" />
                </div>
                <button 
                    className="header-component__login"
                    onClick={showDrawer}>
                    <UserOutlined className='header-component__login__icon-profile'/>
                    <span> Iniciar sesión </span>
                </button>
            </div>
            <LoginDrawerComponent open={open} onClose={onClose}/>
        </header>
    );
};

export default HeaderHomeComponent;
