import ENDPOINT from './endpoint';

const RESERVEDEFAULT = `${ENDPOINT}/reserve`; // 예약 API 기본

export const READRESERVE = (userId: number) => `${RESERVEDEFAULT}?userId=${userId}`; //예약 조회
export const RUDCHILD = `${RESERVEDEFAULT}`; //예약 등록, 수정, 삭제
