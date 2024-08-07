import ENDPOINT from './endpoint';

const REVIEWSDEFAULT = `${ENDPOINT}/reviews`; // 리뷰 API 기본

export const READREVIEWS = (userId: number) => `${REVIEWSDEFAULT}?userId=${userId}`; // 리뷰 목록 조회
export const CREATEREVIEWS = `${REVIEWSDEFAULT}`; //리뷰 등록
export const DELETEREVIEWS = (id: number) => `${REVIEWSDEFAULT}/${id}`; //리뷰삭제
