import ScheduleCalendar from './ScheduleCalendar';
import CalendarContainer from './CalendarContainer';
import CounselorHomeContainer from './CounselorHomeContainer';
import ReservationListContainer from './ReservationListContainer';

function CounselorHome() {
    return (
        <CounselorHomeContainer>
            <CalendarContainer>
                <ScheduleCalendar />
            </CalendarContainer>
            <ReservationListContainer></ReservationListContainer>
        </CounselorHomeContainer>
    );
}

export default CounselorHome;
