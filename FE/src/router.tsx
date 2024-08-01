import { createBrowserRouter, Navigate } from 'react-router-dom';
import Overview from './pages/Overview/';
import Login from './pages/Login';
import FindPw from './pages/FindPw';
import FindId from './pages/FindId';
import Join from './pages/Join';
import User from './pages/Join/User';
import Counselor from './pages/Join/Counselor';
import CounselorMain from './pages/CounselorMain';
import UserMain from './pages/UserMain';
import MyPage from './pages/MyPage';
import UserHome from './pages/UserMain/UserHome';
import UserInfo from './pages/UserInfo';
import ChildInfo from './pages/ChildInfo';
import CounselorHome from './pages/CounselorMain/CounselorHome';

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
    {
        path: '/user',
        element: <UserMain />,
        children: [
            {
                path: '',
                element: <Navigate to="home" />, // 리다이렉트 추가
            },
            {
                path: 'home',
                element: <UserHome />,
            },
            {
                path: 'mypage',
                element: <MyPage />,
                children: [
                    {
                        path: 'userInfo',
                        element: <UserInfo />,
                    },
                    {
                        path: 'childInfo',
                        element: <ChildInfo />,
                    },
                ],
            },
        ],
    },
    {
        path: '/counselor',
        element: <CounselorMain />,
        children: [
            {
                path: 'home',
                element: <CounselorHome />,
            },
            {
                path: 'mypage',
                element: <MyPage />,
            },
        ],
    },
]);

export default router;
