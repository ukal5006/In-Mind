import styled from 'styled-components';
import Container from '../../components/Container';
import { ReactNode } from 'react';
import { colors } from '../../theme/colors';

const MyPageContentContainer = styled(Container)`
    height: 95%;
    width: 65%;
    border: 1px solid black;
    border-radius: 10px;
    border: 3px solid ${colors.gray};
    border-radius: 10px;
    background-color: #fff;
`;

interface MyPageContentProps {
    children: ReactNode;
}

function MyPageContent({ children }: MyPageContentProps) {
    return <MyPageContentContainer>{children}</MyPageContentContainer>;
}

export default MyPageContent;
