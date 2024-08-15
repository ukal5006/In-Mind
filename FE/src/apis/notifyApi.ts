import ENDPOINT from './endpoint';

const NOTIFYDEFAULT = `${ENDPOINT}/notify`; // 알림 API 기본

export const READNOTIFY = (id: number) => `${NOTIFYDEFAULT}/${id}`; //알림 조회 ,삭제
export const UNAVAILABLETIME = `${NOTIFYDEFAULT}/unavailable-time`; //기본 상담시간 생성, 삭제
export const READUNAVAILABLETIME = (counselorId: number) => `${NOTIFYDEFAULT}/${counselorId}`; //기본 상담시간 생성, 삭제
