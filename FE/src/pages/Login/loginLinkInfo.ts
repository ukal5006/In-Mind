interface LoginLink {
    title: string;
    link: string;
}

const loginLinkInfo: LoginLink[] = [
    { title: '비밀번호 찾기', link: '/findPw' },
    { title: '아이디 찾기', link: '/findId' },
    { title: '회원가입', link: '/join/user' },
];

export default loginLinkInfo;
