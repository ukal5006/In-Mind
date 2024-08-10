import ChildTestResult from './ChildTestResult';
import ReservationHistory from './ReservationHistory';
import TestHistory from './TestHistory';
import UserHomeContainer from './UserHomeContainer';
import UserHomeLeftWrapper from './UserHomeLeftWrapper';
import UserHomeRightWrapper from './UserHomeRightWrapper';

function UserHome() {
  return (
    <UserHomeContainer>
      <UserHomeLeftWrapper>
        <ChildTestResult />
      </UserHomeLeftWrapper>
      <UserHomeRightWrapper>
        <TestHistory />
        <ReservationHistory />
      </UserHomeRightWrapper>
    </UserHomeContainer>
  );
}

export default UserHome;
