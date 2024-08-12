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
import CounselorInfo from './pages/CounselorInfo';
import CounselorCareers from './pages/CounselorCareers';
import MyReviews from './pages/MyReviews';
import CounselorSearch from './pages/CounselorSearch';
import Test from './pages/Test';
import FacialMeeting from './pages/FacialMeeting/components/VideoRoomComponent';
import TestHistory from './pages/TestHistory';
import ReservationHistory from './pages/ReservationHistory';
import Notification from './pages/Notification'

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
        path:'/notifications',
        element:<Notification />,
    },
    {
        path: '/facial',
        element: <FacialMeeting />,
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
                path: 'test',
                element: <Test />,
            },
            {
                path: 'counselorSearch',
                element: <CounselorSearch />,
            },
            {
                path: 'testHistory',
                element: <TestHistory />,
            },
            {
                path: 'reservationHistory',
                element: <ReservationHistory />,
            },
            {
                path: 'mypage',
                element: <MyPage />,
                children: [
                    {
                        path: '',
                        element: <Navigate to="userInfo" />, // 리다이렉트 추가
                    },
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
                path: '',
                element: <Navigate to="home" />, // 리다이렉트 추가
            },
            {
                path: 'home',
                element: <CounselorHome />,
            },
            {
                path: 'mypage',
                element: <MyPage />,
                children: [
                    {
                        path: '',
                        element: <Navigate to="counselorInfo" />, // 리다이렉트 추가
                    },
                    {
                        path: 'counselorInfo',
                        element: <CounselorInfo />,
                    },
                    {
                        path: 'counselorCareers',
                        element: <CounselorCareers />,
                    },
                    {
                        path: 'myReviews',
                        element: <MyReviews />,
                    },
                ],
            },
        ],
    },
]);

export default router;
