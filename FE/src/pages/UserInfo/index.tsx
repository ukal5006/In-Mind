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
    padding-left: 10px;
`;

const ProfileImage = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: ${colors.gray};
    margin-right: 30px;
`;

const ProfileInfoWrapper = styled(Wrapper)`
    flex-direction: column;
    align-items: start;
`;

const ProfileName = styled(Text)`
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 10px;
`;

const Line = styled.div`
    height: 1px;
    width: 100%;
    border-bottom: 2px solid ${colors.gray};
    margin: 10px 0px;
`;

const ProfileEmail = styled(Text)``;

const InfoContainer = styled(Container)`
    width: 90%;
    flex-direction: column;
    align-items: flex-start;
    box-sizing: border-box;
    margin: 20px;
`;

const InfoContainerHeader = styled(Text)`
    font-weight: 700;
    color: ${colors.gray};
`;

const InfoList = styled.ul`
    width: 100%;
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 0px 10px;
`;

const InfoListItem = styled.li`
    display: flex;
    width: 100%;
    justify-content: space-between;
    position: relative;
    align-items: center;
`;

const UpdateBtn = styled(Btn)`
    background-color: ${colors.darkGreen};
    color: ${colors.white};
    font-size: 14px;
`;

const DeleteBtn = styled(Btn)`
    background-color: ${colors.red};
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ModalContainer = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
`;

const ModalTitle = styled(Text)`
    font-weight: 700;
    margin-bottom: 20px;
`;

const ModalInput = styled.input`
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 10px;
    padding: 8px;
    border: 1px solid ${colors.gray};
`;

// const ModalWrapper = styled.div`
//     display: flex;
//     align-items: center;
//     & > ${ModalInput} {
//         width: 50px;
//     }
// `;

const ModalButton = styled(Btn)`
    background-color: ${colors.darkGreen};
    color: ${colors.white};
    width: 100%;
`;

function UserInfo() {
    const { userInfo, setUserInfo, token } = userStore((state) => state);
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
            axios
                .put(DELETEUSER(userInfo?.userIdx), {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        accept: '*/*',
                        'Content-Type': 'application/json;charset=UTF-8',
                    },
                })
                .then()
                .catch((error) => console.log(error));
            alert('회원 탈퇴가 완료되었습니다.');
            navigate('/');
        }
    };
    return (
        <UserInfoContainer>
            <ProfileContainer>
                <ProfileImage />
                <ProfileInfoWrapper>
                    <ProfileName>{userInfo?.userName}</ProfileName>
                    <ProfileEmail>{userInfo?.userEmail}</ProfileEmail>
                </ProfileInfoWrapper>
            </ProfileContainer>
            <Line />
            <InfoContainer>
                <InfoContainerHeader>기본정보</InfoContainerHeader>
                <InfoList>
                    <InfoListItem>이름 : {userInfo?.userName}</InfoListItem>
                    <Line />
                    <InfoListItem>이메일 : {userInfo?.userEmail}</InfoListItem>
                    <Line />
                    <InfoListItem>전화번호 : {userInfo?.userTel}</InfoListItem>
                    <Line />
                    <InfoListItem>
                        <UpdateBtn
                            onClick={() => {
                                setModalType('info');
                                setIsModalOpen(true);
                            }}
                        >
                            수정하기
                        </UpdateBtn>
                    </InfoListItem>
                </InfoList>
            </InfoContainer>
            <Line />
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
                        <DeleteBtn onClick={handleSignOut}>회원탈퇴</DeleteBtn>
                    </InfoListItem>
                </InfoList>
            </InfoContainer>

            {isModalOpen && (
                <ModalOverlay>
                    {modalType === 'info' ? (
                        <ModalContainer>
                            <ModalTitle>기본정보 수정</ModalTitle>
                            <ModalInput type="text" value={userInfo?.userName} placeholder="이름" disabled />
                            <ModalInput type="text" value={userInfo?.userEmail} placeholder="이메일" disabled />
                            <ModalInput
                                type="text"
                                value={changePhone}
                                onChange={(e) => setChangePhone(e.target.value)}
                                placeholder="전화번호"
                            />
                            <ModalButton onClick={handleUpdate}>저장하기</ModalButton>
                            <ModalButton
                                onClick={() => {
                                    setChangePhone(userInfo?.userTel);
                                    setIsModalOpen(false);
                                }}
                            >
                                취소하기
                            </ModalButton>
                        </ModalContainer>
                    ) : (
                        <ModalContainer>
                            <ModalTitle>비밀번호 변경</ModalTitle>
                            <ModalInput
                                type="password"
                                value={beforePw}
                                onChange={(e) => setbeforePw(e.target.value)}
                                placeholder="이전 비밀번호"
                            />
                            <ModalInput
                                type="password"
                                value={changePw}
                                onChange={(e) => setChangePw(e.target.value)}
                                placeholder="변경할 비밀번호"
                            />
                            <ModalInput
                                type="password"
                                value={changePwCheck}
                                onChange={(e) => setChangePwCheck(e.target.value)}
                                placeholder="변경할 비밀번호 확인"
                            />
                            <ModalButton onClick={handleUpdatePW}>저장하기</ModalButton>
                            <ModalButton
                                onClick={() => {
                                    setIsModalOpen(false);
                                }}
                            >
                                취소하기
                            </ModalButton>
                        </ModalContainer>
                    )}
                </ModalOverlay>
            )}
        </UserInfoContainer>
    );
}

export default UserInfo;
