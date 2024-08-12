import styled from 'styled-components';
import Wrapper from '../../components/Wrapper';
import { colors } from '../../theme/colors';

const FindPwWrapper = styled(Wrapper)`
    flex-direction: column;
    box-sizing: border-box;
    width: 500px;
    height: 400px;
    border: 1px ${colors.darkGray};  /* solid 제거 */
    border-radius: 20px;
    background-color: ${colors.white};
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);  /* 그림자 진하게 */
    padding: 20px;
`;
export default FindPwWrapper;
