import ENDPOINT from './endpoint';

const ORGSDEFAULT = `${ENDPOINT}/orgs`; // 기관 API 기본

export const READORGS = (type: 'addr' | 'name', keyword: string) => `${ORGSDEFAULT}?type=${type}&keyword=${keyword}`; //기관 조회
export const CREATEORGS = `${ORGSDEFAULT}`; //기관 생성
export const READORGSLIST = (name: string) => `${ORGSDEFAULT}/list?name=${name}`; //기관 목록 조회
