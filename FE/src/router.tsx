import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Overview from './pages/Overview/';
import Login from './pages/Login';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Overview />,
    },
    {
        path: '/login',
        element: <Login />,
    },
]);

export default router;
