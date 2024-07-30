import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Overview from './pages/Overview/';
import Login from './pages/Login';
import FindPw from './pages/FindPw';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Overview />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/findPw',
        element: <FindPw />,
    },
]);

export default router;
