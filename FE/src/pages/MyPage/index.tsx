import { Outlet } from 'react-router-dom';
import MyPageContainer from './MyPageContainer';
import MyPageContent from './MyPageContent';
import MyPageList from './MyPageList';

function MyPage() {
    return (
        <MyPageContainer>
            <MyPageList />
            <MyPageContent>
                <Outlet />
            </MyPageContent>
        </MyPageContainer>
    );
}

export default MyPage;
