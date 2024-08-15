import ENDPOINT from './endpoint';

export const CONSULTING = (userId: number) => `${ENDPOINT}/consulting?userId=${userId}`; // 화상 상담 기록 조회
