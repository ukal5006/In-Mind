import styled from 'styled-components';
import Wrapper from '../../components/Wrapper';
import { colors } from '../../theme/colors';

// const JoinWrapper = styled(Wrapper)`
//     flex-direction: column;
//     box-sizing: border-box;
//     width: 500px;
//     height: 700px;
//     border: 1px solid ${colors.gray};
//     border-radius: 20px;
//     position: relative;
// `;
const JoinWrapper = styled(Wrapper)`
    flex-direction: column;
    box-sizing: border-box;
    width: 480px;
    height: 650px;  // 높이는 원래대로 유지
    border: 1px ${colors.darkGray};  // solid 제거
    border-radius: 20px;
    background-color: ${colors.white};  // 배경색 추가
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);  // 그림자 추가
    padding: 0px;  // 패딩 추가
    position: relative;  // 원래 속성 유지
`;
export default JoinWrapper;
