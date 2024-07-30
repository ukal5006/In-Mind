import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Overview from './pages/Overview/';
import Login from './pages/Login';
import FindPw from './pages/FindPw';
import FindId from './pages/FindId';
import Join from './pages/Join';
import User from './pages/Join/User';
import Counselor from './pages/Join/Counselor';

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
    {
        path: '/join',
        element: <Join />,
        children: [
            {
                path: 'user',
                element: <User />,
            },
            {
                path: 'counselor',
                element: <Counselor />,
            },
        ],
    },
]);

export default router;
