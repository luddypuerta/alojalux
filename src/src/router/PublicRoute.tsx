import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface PublicRouteProps {
    children: ReactNode;
}

export const PublicRoute = ( { children } : PublicRouteProps) => {
    const token = localStorage.getItem('token');
    return token === null ? children : <Navigate to={'/admin/hotels'} replace />
}
