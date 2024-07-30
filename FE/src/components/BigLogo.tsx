import styled from 'styled-components';
import Logo from './Logo';

const StyledLogo = styled(Logo)`
    font-size: 40px;
    margin-bottom: 30px;
`;

function BigLogo() {
    return <StyledLogo>In Mind</StyledLogo>;
}
export default BigLogo;
