import ENDPOINT from "./endpoint";

const RESUMESDEFAULT = `${ENDPOINT}/resumes`; // 이력 API 기본

export const READRESUMES = (userId: number) =>
  `${RESUMESDEFAULT}?userId=${userId}`; //이력 조회
export const CREATERESUMES = `${RESUMESDEFAULT}`; //이력 등록
export const UDRESUMES = (resumeID: string) => `${RESUMESDEFAULT}/${resumeID}`; //이력 수정, 삭제
