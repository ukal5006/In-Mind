import ENDPOINT from './endpoint';

const MANAGEMENTDEFAULT = `${ENDPOINT}/management`; // 상담 API 기본

const DEFAULTTIME = `${MANAGEMENTDEFAULT}/default-time`;
export const RDDEFAULTTIME = (userId: number | undefined) =>
  `${DEFAULTTIME}?userId=${userId}`; //기본 상담시간 조회, 삭제
export const UPDATEDEFAULTTIME = `${DEFAULTTIME}`; //기본 상담시간 수정

const UNAVAILABLE = `${MANAGEMENTDEFAULT}/unavailable-time`;
export const CREATEUNAVAILABLETIME = `${UNAVAILABLE}`; //상담 불가능 시간 생성
export const DELETEUNAVAILABLETIME = (idx: number) =>
  `${UNAVAILABLE}?unavailableTimeIdx=${idx}`; //상담 불가능 시간 제거
export const READUNAVAILABLETIME = (
  counselorId: number | undefined,
  date: any
) => `${UNAVAILABLE}?counselorId=${counselorId}&date=${date}`; //상담 불가능 시간 조회
