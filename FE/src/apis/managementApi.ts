import ENDPOINT from './endpoint';

const MANAGEMENTDEFAULT = `${ENDPOINT}/management`; // 상담 API 기본

export const DEFAULTTIME = `${MANAGEMENTDEFAULT}/default-time`; //기본 상담시간 생성
export const CREATEUNAVAILABLETIME = `${MANAGEMENTDEFAULT}/unavailable-time`; //기본 상담시간 생성
export const DELETEUNAVAILABLETIME = (idx: number) => `${MANAGEMENTDEFAULT}/unavailable-time?unavailableTimeIdx=${idx}`; //기본 상담시간 삭제
export const READUNAVAILABLETIME = (counselorId: number) => `${MANAGEMENTDEFAULT}/unavailable-time/${counselorId}`; //기본 상담시간 생성, 삭제
