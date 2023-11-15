import * as React from 'react';
import { Route } from 'react-router-dom';
import { Navigate, useNavigate } from 'react-router-dom';
// import { Redirect } from 'react-router'

const PrivateRoute = ({ children, ...rest }: PrivateRouteProps) => {

    const nav = useNavigate();

    const TOKEN = localStorage.getItem('TOKEN');
    console.log(TOKEN);

    if (!TOKEN) {
        return (
            <div>Hi! no Authenticator Token Found, Please Log in First</div>
        )

    } else {
        return (
            <>{children}</>
        );
    }
};

interface PrivateRouteProps {
    // path: string;
    exact?: boolean;
    children: React.ReactNode;
}

export default PrivateRoute;