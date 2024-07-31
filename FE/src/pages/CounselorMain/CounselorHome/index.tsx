import CalendarContainer from './CalendarContainer';
import CounselorHomeContainer from './CounselorHomeContainer';
import ReservationListContainer from './ReservationListContainer';

function CounselorHome() {
    return (
        <CounselorHomeContainer>
            <CalendarContainer></CalendarContainer>
            <ReservationListContainer></ReservationListContainer>
        </CounselorHomeContainer>
    );
}

export default CounselorHome;
