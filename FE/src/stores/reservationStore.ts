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
// Zustand 스토어 생성
const reservationStore = create((set) => ({
    reservationList: null,
    setReservationList: (reservationList: Reservation[]) => set({ reservationList }),
    nowReservation:null,
    setNowReservation:(nowReservation: Reservation[]) => set({nowReservation}),
}));

export default reservationStore;
