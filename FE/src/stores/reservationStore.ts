import { create } from 'zustand';

// Zustand 스토어 인터페이스 정의
interface Reservation {
    reserveInfoIdx: number;
    coName: string;
    reserveInfoDate: string;
    reserveInfoStartTime: ReserveTime;
    reserveInfoEndTime: ReserveTime;
}

interface ReserveTime {
    hour: number;
    minute: number;
    second: number;
    nano: number;
}

interface ReservationState {
    reservationList: Reservation[] | null;
    setReservationList: (reservationList: Reservation[]) => void;
    nowReservation: Reservation | null;
    setNowReservation: (nowReservation: Reservation) => void;
  }

// Zustand 스토어 생성
const reservationStore = create<ReservationState>((set) => ({
    reservationList: null,
    setReservationList: (reservationList: Reservation[]) => set({ reservationList }),
    nowReservation:null,
    setNowReservation: (nowReservation: Reservation) => set({ nowReservation }),
}));

export default reservationStore;
