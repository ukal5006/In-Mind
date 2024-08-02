import styled from 'styled-components';
import Container from '../../components/Container';
import { ReactNode } from 'react';

const MyPageContentContainer = styled(Container)`
    height: 95%;
    width: 65%;
    border: 1px solid black;
    border-radius: 10px;
`;

interface MyPageContentProps {
    children: ReactNode;
}

function MyPageContent({ children }: MyPageContentProps) {
    return <MyPageContentContainer>{children}</MyPageContentContainer>;
}

export default MyPageContent;
