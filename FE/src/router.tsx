import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Overview from './pages/Overview/';
import Login from './pages/Login';
import FindPw from './pages/FindPw';
import FindId from './pages/FindId';

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
    {
        path: '/findId',
        element: <FindId />,
    },
]);

export default router;
