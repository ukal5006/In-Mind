import styled from 'styled-components';
import { colors } from '../../theme/colors';
import Btn from '../../components/Btn';

const JoinBtn = styled(Btn)`
    height: 45px;
    width: 350px;
    background-color:  ${colors.okGreen};
    color: ${colors.white};
    font-size: 18px;
    font-weight: 600;
    margin: 5px 0;  // 다른 입력 필드와 동일한 마진 적용
`;

export default JoinBtn;
