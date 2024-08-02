import styled, { keyframes } from 'styled-components';
import Wrapper from '../../components/Wrapper';

const bounce = keyframes`
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px); /* 위로 이동 */
    }
`;

const BtnWrapper = styled(Wrapper)`
    flex-direction: column;
    position: fixed;
    bottom: 30px;
    animation: ${bounce} 3s infinite; /* 애니메이션 적용 */
`;
export default BtnWrapper;
