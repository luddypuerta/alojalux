//Libraries
import React from 'react';

//Components
import HeaderHomeComponent from './HeaderHome/HeaderHomeComponent';

interface LayoutProps {
    children: React.ReactNode;
}

const LayoutHomeComponent: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <HeaderHomeComponent />
            <main>
                {children}
            </main>
        </div>
    );
};

export default LayoutHomeComponent;
