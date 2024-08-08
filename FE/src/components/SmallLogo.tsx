import styled from "styled-components";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";
import userStore from "../stores/userStore";

const StyledLogo = styled(Logo)`
  font-size: 20px;
  height: 20px;
`;

function SmallLogo() {
  const { userInfo } = userStore((state) => state);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    if (userInfo?.userRole === "USER") {
      navigate("/user");
    } else if (userInfo?.userRole === "COUNSELOR") {
      navigate("/counselor");
    } else {
      navigate("/");
    }
  };

  return <StyledLogo onClick={() => handleLogoClick()}>In Mind</StyledLogo>;
}
export default SmallLogo;
