import * as React from 'react';
import { Route } from 'react-router-dom';
import { Navigate, useNavigate } from 'react-router-dom';
// import { Redirect } from 'react-router'

const PrivateRoute = ({ children, ...rest }: PrivateRouteProps) => {

    const nav = useNavigate();

    const TOKEN = localStorage.getItem('token');

    if (!TOKEN) {
        return (
            <div>Hi</div>
        )

    } else {
        return (
            <Route {...rest}>{children}</Route>
        );

    }
};

interface PrivateRouteProps {
    path: string;
    exact?: boolean;
    children: React.ReactNode;
}

export default PrivateRoute;