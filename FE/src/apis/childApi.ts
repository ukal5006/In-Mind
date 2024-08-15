import ENDPOINT from './endpoint';

export const CHILDDEFAULT = `${ENDPOINT}/children`; // 자녀 API 기본

export const CREATECHILD = `${CHILDDEFAULT}`; //자녀 등록
export const RUDCHILD = (childId: number) => `${CHILDDEFAULT}/${childId}`; //자녀 조회, 수정, 삭제