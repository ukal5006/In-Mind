import styled from 'styled-components';
import Text from '../../components/Text';
import { colors } from '../../theme/colors';

const SmallText = styled(Text)`
    font-size: 13px;
    font-weight: 700;
    color: ${colors.gray};
`;

export default SmallText;
