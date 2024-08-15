import styled from 'styled-components';
import Container from '../../components/Container';
import { colors } from '../../theme/colors';
import Text from '../../components/Text';
import Wrapper from '../../components/Wrapper';
import Btn from '../../components/Btn';
import { useState } from 'react';
import userStore from '../../stores/userStore';
import axios from 'axios';
import { CHANGEPW, CHECKPW, DELETEUSER, LOADUSERINFO, UPDATEUSERINFO } from '../../apis/userApi';
import { useNavigate } from 'react-router-dom';
import Glass from '../../components/Glass';

const UserInfoContainer = styled(Container)`
    padding: 30px 20px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: start;
`;

const ProfileContainer = styled(Container)`
    width: 100%;
    justify-content: start;
    box-sizing: border-box;
    padding: 10px;
    ${Glass}
    height: 200px;
`;

const ProfileImage = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-right: 30px;
    background-color: white;
`;

const ProfileInfoWrapper = styled(Wrapper)`
    flex-direction: column;
    align-items: start;
`;

const ProfileName = styled(Text)`
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 20px;
`;

const Line = styled.div`
    height: 1px;
    width: 90%;
    border-bottom: 2px solid ${colors.gray};
    margin: 10px 5px;
`;

const ProfileEmail = styled(Text)``;

const InfoContainer = styled(Container)`
    padding: 20px 20px;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    box-sizing: border-box;
    margin: 20px;
    ${Glass}
`;

const InfoContainerHeader = styled(Text)`
    font-weight: 700;
    color: ${colors.gray};
    font-size: 18px;
`;

const InfoList = styled.ul`
    width: 100%;
    margin-top: 25px;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 0px 10px;
`;

const InfoListItem = styled.li`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 5px 5px; /* 패딩 추가 */
    font-size: 17px;
    font-weight: 550;
`;

const UpdateBtn = styled(Btn)`
    color: white; /* 배경 제거 */
    background-color: ${colors.okGreen}; /* 글자색을 다크 그린으로 설정 */
    font-size: 14px; /* 폰트 크기 유지 */
    font-weight: 550; /* 폰트 두께 설정 */
    border: none; /* 테두리 제거 */
    cursor: pointer; /* 포인터 커서 */
    padding-top: 5px;
    transition: color 0.3s; /* 색상 변화에 대한 부드러운 효과 */
    margin-right: 63px; /* 오른쪽 여백 유지 */
    padding: 5px 5px;

    &:hover {
        color: ${colors.lightGreen}; /* 호버 시 색상 변화 */
    }

    &:active {
        color: ${colors.darkGreen}; /* 클릭 시 색상 변화 */
    }
`;

const DeleteBtn = styled(Btn)`
    background: none; /* 배경 제거 */
    color: ${colors.black}; /* 글자색을 빨간색으로 설정 */
    font-size: 17px; /* 폰트 크기 설정 */
    font-weight: 550; /* 폰트 두께 설정 */
    border: none; /* 테두리 제거 */
    cursor: pointer; /* 포인터 커서 */
    padding: 0; /* 패딩 제거 */
    transition: color 0.3s; /* 색상 변화에 대한 부드러운 효과 */
`;

const ModalOverlay = styled.div`
    position: fixed; /* fixed로 설정하여 화면에 고정 */
    top: 0; /* 화면 상단 */
    left: 0; /* 화면 좌측 */
    right: 0; /* 화면 우측 */
    bottom: 0; /* 화면 하단 */
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999; /* 다른 요소 위에 표시되도록 z-index 추가 */
    background-color: rgba(0, 0, 0, 0.6);
`;

const ModalContainer = styled.div`
    background-color: white;
    padding: 30px;
    border-radius: 12px;
    width: 400px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); /* 그림자 추가 */
    animation: fadeIn 0.3s; /* 애니메이션 효과 추가 */

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

const FormContainer = styled.div`
    max-width: 500px; /* 폼 최대 너비 설정 */
    margin: 0 auto; /* 중앙 정렬 */
    padding: 20px; /* 패딩 추가 */
    background-color: #f9f9f9; /* 배경색 설정 */
    border-radius: 12px; /* 둥근 모서리 */
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* 부드러운 그림자 */
`;

const FormGroup = styled.div`
    display: flex; /* Flexbox 사용 */
    align-items: center; /* 수직 중앙 정렬 */
    margin-bottom: 20px; /* 각 입력 항목 사이의 여백 */
`;

const Label = styled.label`
    flex: 0 0 100px; /* 라벨의 너비를 고정 */
    margin-right: 15px; /* 라벨과 입력 필드 사이의 여백 */
    font-weight: bold; /* 라벨 글자 굵게 */
    font-size: 15px;
    color: #333; /* 글자 색상 */
`;

const ModalTitle = styled(Text)`
    font-weight: 700;
    margin-bottom: 20px;
    font-size: 20px; /* 폰트 크기 증가 */
    color: ${colors.darkGreen}; /* 제목 색상 변경 */
`;

const ModalInput = styled.input`
    flex: 1; /* 남은 공간을 모두 차지 */
    padding: 10px; /* 내부 여백 */
    border: 1px solid #ccc; /* 테두리 색상 */
    border-radius: 8px; /* 둥근 모서리 */
    font-size: 16px; /* 글자 크기 */
    transition: border-color 0.3s; /* 테두리 색상 변화 효과 */

    &:focus {
        border-color: #007bff; /* 포커스 시 테두리 색상 변화 */
        outline: none; /* 기본 아웃라인 제거 */
    }
`;

// const ModalWrapper = styled.div`
//     display: flex;
//     align-items: center;
//     & > ${ModalInput} {
//         width: 50px;
//     }
// `;

const ModalButton = styled(Btn)`
    background-color: #10c263; /* 버튼 배경색 */
    color: white; /* 버튼 글자색 */
    border: none; /* 테두리 없애기 */
    border-radius: 8px; /* 둥근 버튼 */
    padding: 12px 20px; /* 버튼 패딩 */
    font-size: 16px; /* 버튼 글자 크기 */
    cursor: pointer; /* 포인터 커서 */
    transition: background-color 0.3s; /* 배경색 변화 효과 */
    margin-right: 10px; /* 오른쪽 여백 추가 */

    &:last-child {
        margin-right: 0; /* 마지막 버튼의 오른쪽 여백 제거 */
    }
`;

const ButtonContainer = styled.div`
    display: flex; /* 플렉스 박스 사용 */
    justify-content: center; /* 버튼을 가운데 정렬 */
    margin-top: 20px; /* 상단 여백 */
`;

function UserInfo() {
    const { userInfo, setUserInfo, token, setToken } = userStore((state) => state);
    const [modalType, setModalType] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [changePhone, setChangePhone] = useState(userInfo?.userTel);
    const [beforePw, setbeforePw] = useState('');
    const [changePw, setChangePw] = useState('');
    const [changePwCheck, setChangePwCheck] = useState('');
    const navigate = useNavigate();

    const handleUpdate = () => {
        if (userInfo?.userIdx) {
            axios
                .put(
                    UPDATEUSERINFO(userInfo.userIdx),
                    {
                        userName: userInfo.userName,
                        userTel: changePhone,
                        userProfile: userInfo.userProfile,
                        userRole: 'USER',
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            accept: '*/*',
                            'Content-Type': 'application/json;charset=UTF-8',
                        },
                    }
                )
                .then(() =>
                    axios.get(LOADUSERINFO(userInfo?.userIdx), {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            accept: '*/*',
                            'Content-Type': 'application/json;charset=UTF-8',
                        },
                    })
                )
                .then((response) => {
                    setUserInfo(response.data);
                    localStorage.setItem('userInfo', JSON.stringify(response.data)); // 사용자 정보를 JSON 문자열로 저장
                    alert('정보가 수정되었습니다.');
                    setIsModalOpen(false); // 모달 닫기
                })
                .catch((error) => {
                    console.error('Error updating user info:', error);
                });
        }
    };

    const handleUpdatePW = () => {
        axios
            .post(
                CHECKPW,
                {
                    email: userInfo?.userEmail,
                    password: beforePw,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        accept: '*/*',
                        'Content-Type': 'application/json;charset=UTF-8',
                    },
                }
            )
            .then((response) => {
                if (userInfo?.userIdx) {
                    axios.put(
                        CHANGEPW(userInfo?.userIdx),
                        {
                            password: changePw,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                accept: '*/*',
                                'Content-Type': 'application/json;charset=UTF-8',
                            },
                        }
                    );
                }
            })
            .then((response) => {
                alert('비밀번호 수정 완료!');
                setbeforePw('');
                setChangePw('');
                setChangePwCheck('');
                setIsModalOpen(false);
            })
            .catch((error) => {
                console.log(error);
                alert('비밀번호가 일치하지 않습니다.');
            });
    };

    const handleSignOut = () => {
        const check = window.confirm('정말 회원탈퇴를 하시겠습니까?');
        if (check === true && userInfo?.userIdx) {
            console.log(DELETEUSER(userInfo?.userIdx));
            console.log(token);
            axios
                .put(
                    DELETEUSER(userInfo?.userIdx),
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            accept: '*/*',
                            'Content-Type': 'application/json;charset=UTF-8',
                        },
                    }
                )
                .then()
                .catch((error) => console.log(error));
            localStorage.removeItem('jwt');
            localStorage.removeItem('userInfo');
            setToken('');
            setUserInfo(null); // 사용자 정보를 초기화
            alert('회원 탈퇴가 완료되었습니다.');
            navigate('/');
        }
    };

    const handleOverlayClick = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <UserInfoContainer>
                <ProfileContainer>
                    <ProfileImage src="https://in-mind-image.s3.ap-northeast-2.amazonaws.com/upload/defaultImg.png" />
                    <ProfileInfoWrapper>
                        <ProfileName>{userInfo?.userName}</ProfileName>
                        <ProfileEmail>{userInfo?.userEmail}</ProfileEmail>
                    </ProfileInfoWrapper>
                </ProfileContainer>
                <InfoContainer>
                    <InfoContainerHeader>기본정보</InfoContainerHeader>
                    <InfoList>
                        <InfoListItem>이름 : {userInfo?.userName}</InfoListItem>
                        <Line />
                        <InfoListItem>이메일 : {userInfo?.userEmail}</InfoListItem>
                        <Line />
                        <InfoListItem>
                            전화번호 : {userInfo?.userTel}
                            <UpdateBtn
                                onClick={() => {
                                    setModalType('info');
                                    setIsModalOpen(true);
                                }}
                            >
                                수정하기
                            </UpdateBtn>
                        </InfoListItem>
                        <Line />
                    </InfoList>
                </InfoContainer>
                <InfoContainer>
                    <InfoContainerHeader>보안설정</InfoContainerHeader>
                    <InfoList>
                        <InfoListItem>
                            비밀번호
                            <UpdateBtn
                                onClick={() => {
                                    setModalType('password');
                                    setIsModalOpen(true);
                                }}
                            >
                                수정하기
                            </UpdateBtn>
                        </InfoListItem>
                        <Line />
                        <InfoListItem>
                            <DeleteBtn onClick={handleSignOut}>회원탈퇴▶</DeleteBtn>
                        </InfoListItem>
                    </InfoList>
                </InfoContainer>
            </UserInfoContainer>

            {isModalOpen && (
                <ModalOverlay onClick={handleOverlayClick}>
                    {modalType === 'info' ? (
                        <ModalContainer onClick={(e) => e.stopPropagation()}>
                            <ModalTitle>기본정보 수정</ModalTitle>
                            <FormContainer>
                                <FormGroup>
                                    <Label htmlFor="userName">이름</Label>
                                    <ModalInput type="text" value={userInfo?.userName} placeholder="이름" disabled />
                                    <br />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="email">이메일</Label>
                                    <ModalInput type="text" value={userInfo?.userEmail} placeholder="이메일" disabled />
                                    <br />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="tel">전화번호</Label>
                                    <ModalInput
                                        type="text"
                                        value={changePhone}
                                        onChange={(e) => setChangePhone(e.target.value)}
                                        placeholder="전화번호"
                                    />
                                </FormGroup>
                            </FormContainer>
                            <ButtonContainer>
                                <ModalButton onClick={handleUpdate}>저장하기</ModalButton>
                                <ModalButton
                                    onClick={() => {
                                        setChangePhone(userInfo?.userTel);
                                        setIsModalOpen(false);
                                    }}
                                >
                                    취소하기
                                </ModalButton>
                            </ButtonContainer>
                        </ModalContainer>
                    ) : (
                        <ModalContainer onClick={(e) => e.stopPropagation()}>
                            <ModalTitle>비밀번호 변경</ModalTitle>
                            <FormContainer>
                                <FormGroup>
                                    <Label htmlFor="beforePw">이전 비밀번호</Label>
                                    <ModalInput
                                        id="beforePw"
                                        type="password"
                                        value={beforePw}
                                        onChange={(e) => setbeforePw(e.target.value)}
                                        placeholder="이전 비밀번호"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="changePw">비밀번호</Label>
                                    <ModalInput
                                        id="changePw"
                                        type="password"
                                        value={changePw}
                                        onChange={(e) => setChangePw(e.target.value)}
                                        placeholder="변경할 비밀번호"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="changePwCheck">비밀번호 확인</Label>
                                    <ModalInput
                                        id="changePwCheck"
                                        type="password"
                                        value={changePwCheck}
                                        onChange={(e) => setChangePwCheck(e.target.value)}
                                        placeholder="변경할 비밀번호 확인"
                                    />
                                </FormGroup>
                            </FormContainer>
                            <ButtonContainer>
                                <ModalButton type="submit" onClick={handleUpdatePW}>
                                    저장하기
                                </ModalButton>
                                <ModalButton onClick={() => setIsModalOpen(false)}>취소하기</ModalButton>
                            </ButtonContainer>
                        </ModalContainer>
                    )}
                </ModalOverlay>
            )}
        </>
    );
}

export default UserInfo;
