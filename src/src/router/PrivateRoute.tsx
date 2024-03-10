import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

interface PrivateRouteProps {
    children: ReactNode;
}

export const PrivateRoute = ( { children } : PrivateRouteProps ) => {

    const { pathname, search } = useLocation();
    const token = localStorage.getItem('token');
    const lastPath = pathname + search;
    localStorage.setItem('lastPath', lastPath);

    return token !== null
        ? children
        :<Navigate to={'/home'} replace />
}