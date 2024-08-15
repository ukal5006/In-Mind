import ENDPOINT from './endpoint';

export const USERDEFAULT = `${ENDPOINT}/users`; // 유저 api 기본

export const LOGIN = `${USERDEFAULT}`; // 로그인
export const SEARCHCOUNSELOR = (name: string) => `${USERDEFAULT}?name=${name}`; // 상담사목록조회
export const JOINUSER = `${USERDEFAULT}/user`; //유저 회원가입
export const JOINCOUNSELOR = `${USERDEFAULT}/counselor`; // 상담사 회원가입
export const USERINFO = (userID: number) => `${USERDEFAULT}/${userID}`; // 회원정보 조회, 수정
export const CHILDINFO = (userID: number) => `${USERDEFAULT}/${userID}/child`; // 회원정보 조회, 수정
export const CHECKPW = `${USERDEFAULT}/check-pw`; // 비밀번호 확인
export const CHANGEPW = (userId: number) => `${USERDEFAULT}/password/${userId}`;
export const CHECKEMAIL = (email: string) => `${USERDEFAULT}/email-check?email=${email}`; // 비밀번호 확인
export const DELETEUSER = (userId: number) => `${USERDEFAULT}/leave/${userId}`; // 회원탈퇴
export const LOADUSERINFO = (userId: number) => `${USERDEFAULT}/${userId}`;
export const UPDATEUSERINFO = (userId: number) => `${USERDEFAULT}/user/${userId}`;
export const UPDATECOUNSELORINFO = (userId: number) => `${USERDEFAULT}/counselor/${userId}`;
