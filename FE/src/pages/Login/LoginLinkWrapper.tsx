import styled from 'styled-components';
import { colors } from '../../theme/colors';

const LoginLinkWrapper = styled.ul`
    display: flex;
    color: ${colors.gray};

    & > li:not(:first-child)::before {
        content: '|'; /* 첫 번째 항목을 제외하고 '|' 추가 */
        margin: 0px 15px; /* 오른쪽 여백 추가 */
    }
    margin-top: 20px;
`;
export default LoginLinkWrapper;
