import styled from 'styled-components';
import Container from '../../components/Container';
import { colors } from '../../theme/colors';
import Text from '../../components/Text';
import Wrapper from '../../components/Wrapper';
import Btn from '../../components/Btn';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import userStore from '../../stores/userStore';
import axios from 'axios';
import { CHANGEPW, CHECKPW, LOADUSERINFO, UPDATECOUNSELORINFO, DELETEUSER } from '../../apis/userApi';
import { RDDEFAULTTIME, UPDATEDEFAULTTIME } from '../../apis/managementApi';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Glass from '../../components/Glass';

const CounselorInfoContainer = styled(Container)`
    padding: 20px 20px;
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
    ${Glass}
    padding: 10px;
`;

const ProfileImage = styled.div`
    background-color: ${colors.lightGray};
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-right: 30px;
`;

const StyledFaUser = styled(FaUser)`
    font-size: 50px;
    color: white;
    margin-left: 25px;
    margin-top: 25px;
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
    margin: 7px;
`;

const ProfileEmail = styled(Text)``;

const InfoContainer = styled(Container)`
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    box-sizing: border-box;
    margin-top: 15px;
    ${Glass}
    padding: 10px 20px;
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
    margin-left: 15px;
`;

const UpdateBtn = styled(Btn)`
    background-color: ${colors.darkGreen};
    color: ${colors.white};
    font-size: 14px;
    margin-top: 10px;
`;

const DeleteIdLink = styled(Link)`
    &:hover {
        border-bottom: 1px solid black;
    }
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

const ModalWrapper = styled.div`
    display: flex;
    align-items: center;
    & > ${ModalInput} {
        width: 50px;
    }
`;

const ModalButton = styled(Btn)`
    background-color: ${colors.darkGreen};
    color: ${colors.white};
    width: 120px; // 고정 너비
    height: 40px;
    font-size: 15px;
`;

const ModalDeleteButton = styled(Btn)`
    background-color: tomato;
    color: white;
    width: 120px; // 고정 너비
    height: 40px;
    font-size: 15px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px; // 버튼 사이의 간격
    margin-top: 20px; // 위 요소와의 간격
`;

const DeleteBtn = styled(Btn)`
    background-color: ${colors.red};
    color: white;
`;

const formatPhoneNumber = (phoneNumber: string) => {
    const cleaned = phoneNumber.replace(/\D/g, '');
    let formatted = cleaned;
    if (cleaned.length > 3) {
        formatted = cleaned.slice(0, 3) + '-' + cleaned.slice(3);
        if (cleaned.length > 7) {
            formatted = formatted.slice(0, 8) + '-' + formatted.slice(8);
        }
    }
    return formatted;
};

function CounselorInfo() {
    const { userInfo, setUserInfo, token, setToken } = userStore((state) => state);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [type, setType] = useState('');
    const [name, setName] = useState(userInfo?.userName || '');
    const [email, setEmail] = useState(userInfo?.userEmail || '');
    const [phone, setPhone] = useState(userInfo?.userTel || '');
    const [intro, setIntro] = useState(userInfo?.userIntro || '');
    const [profile, setProfile] = useState(userInfo?.userProfile || '');
    const [beforePw, setbeforePw] = useState('');
    const [changePw, setChangePw] = useState('');
    const [changePwCheck, setChangePwCheck] = useState('');

    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [newStartTime, setNewStartTime] = useState('');
    const [newEndTime, setNewEndTime] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // 상담사의 기본 상담 시간 조회
        const fetchCounTime = async () => {
            try {
                if (userInfo?.userIdx) {
                    const response = await axios.get(RDDEFAULTTIME(userInfo?.userIdx), {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            accept: '*/*',
                            'Content-Type': 'application/json;charset=UTF-8',
                        },
                    });
                    setStartTime(response.data.availableTimeStartTime.slice(0, 2));
                    setEndTime(response.data.availableTimeEndTime.slice(0, 2));
                    setNewStartTime(response.data.availableTimeStartTime.slice(0, 2)); // 초기값으로 설정
                    setNewEndTime(response.data.availableTimeEndTime.slice(0, 2)); // 초기값으로 설정
                }
            } catch (error) {
                console.error('상담 시간을 조회하는데 실패했습니다.', error);
            }
        };

        fetchCounTime();
    }, []);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.slice(0, 16); // 최대 16자로 제한
        setName(value);
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 11);
        let formattedValue = '';
        if (value.length > 3) {
            formattedValue += value.slice(0, 3) + '-';
            if (value.length > 7) {
                formattedValue += value.slice(3, 7) + '-' + value.slice(7);
            } else {
                formattedValue += value.slice(3);
            }
        } else {
            formattedValue = value;
        }
        setPhone(formattedValue);
    };

    const handleIntroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.slice(0, 40); // 최대 40자로 제한
        setIntro(value);
    };

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewStartTime(e.target.value);
    };

    const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewEndTime(e.target.value);
    };

    const handleSaveTime = async () => {
        try {
            await axios.put(
                UPDATEDEFAULTTIME,
                {
                    userIdx: userInfo?.userIdx,
                    availableTimeStartTime: `${newStartTime}:00`,
                    availableTimeEndTime: `${newEndTime}:00`,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        accept: '*/*',
                        'Content-Type': 'application/json;charset=UTF-8',
                    },
                }
            );
            setStartTime(newStartTime); // 상태 업데이트
            setEndTime(newEndTime); // 상태 업데이트
            alert('상담 시간이 수정되었습니다.');
            setIsModalOpen(false);
        } catch (error) {
            console.error('상담 시간을 수정하는데 실패했습니다.', error);
            alert('수정에 실패했습니다.');
        }
    };
    const handleUpdate = () => {
        if (phone.replace(/-/g, '').length < 10) {
            alert('전화번호는 10자리 이상이어야 합니다.');
            return;
        }

        if (userInfo?.userIdx) {
            axios
                .put(
                    UPDATECOUNSELORINFO(userInfo?.userIdx),
                    {
                        userEmail: email,
                        userName: name,
                        userTel: phone.replace(/-/g, ''), // 하이픈 제거
                        userProfile: profile,
                        intro,
                        userRole: 'COUNSELOR',
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
                    localStorage.setItem('userInfo', JSON.stringify(response.data));
                    alert('정보가 수정되었습니다.');
                    setIsModalOpen(false);
                })
                .catch((error) => alert('에러발생'));
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
            alert('회원 탈퇴가 완료되었습니다.');
            localStorage.removeItem('jwt');
            localStorage.removeItem('userInfo');
            setToken('');
            setUserInfo(null); // 사용자 정보를 초기화
            navigate('/');
        }
    };

    return (
        <CounselorInfoContainer>
            <ProfileContainer>
                <ProfileImage>
                    <StyledFaUser />
                </ProfileImage>
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
                    <InfoListItem>
                        전화번호 : {userInfo?.userTel ? formatPhoneNumber(userInfo.userTel) : ''}
                    </InfoListItem>
                    <Line />
                    <InfoListItem>한줄소개 : {userInfo?.userIntro}</InfoListItem>
                    <InfoListItem>
                        <UpdateBtn
                            onClick={() => {
                                setType('info');
                                setIsModalOpen(true);
                            }}
                        >
                            수정하기
                        </UpdateBtn>
                    </InfoListItem>
                </InfoList>
            </InfoContainer>
            <InfoContainer>
                <InfoContainerHeader>상담시간</InfoContainerHeader>
                <InfoList>
                    <InfoListItem>
                        상담 가능 시간 : {startTime}시 ~ {endTime}시
                    </InfoListItem>
                    <InfoListItem>
                        <UpdateBtn
                            onClick={() => {
                                setType('time');
                                setIsModalOpen(true);
                            }}
                        >
                            수정하기
                        </UpdateBtn>
                    </InfoListItem>
                </InfoList>
            </InfoContainer>
            <InfoContainer>
                <InfoContainerHeader>보안설정</InfoContainerHeader>
                <InfoList>
                    <InfoListItem>
                        비밀번호
                        <UpdateBtn
                            onClick={() => {
                                setType('pw');
                                setIsModalOpen(true);
                            }}
                        >
                            수정하기
                        </UpdateBtn>
                    </InfoListItem>
                    <InfoListItem>
                        <DeleteBtn onClick={handleSignOut}>회원탈퇴</DeleteBtn>
                    </InfoListItem>
                </InfoList>
            </InfoContainer>

            {isModalOpen && (
                <ModalOverlay>
                    <ModalContainer>
                        {type === 'info' ? (
                            <>
                                <ModalTitle>기본정보 수정</ModalTitle>
                                <ModalInput
                                    type="text"
                                    value={name}
                                    onChange={handleNameChange}
                                    placeholder="이름 (최대 16자)"
                                    maxLength={16}
                                />
                                <ModalInput
                                    type="tel"
                                    value={phone}
                                    onChange={handlePhoneChange}
                                    placeholder="전화번호"
                                />
                                <ModalInput
                                    type="text"
                                    value={intro}
                                    onChange={handleIntroChange}
                                    placeholder="한줄소개 (최대 40자)"
                                    maxLength={40}
                                />
                                <ButtonContainer>
                                    <ModalButton onClick={handleUpdate}>저장하기</ModalButton>
                                    <ModalDeleteButton
                                        onClick={() => {
                                            setName(userInfo?.userName || '');
                                            setEmail(userInfo?.userEmail || '');
                                            setPhone(userInfo?.userTel || '');
                                            setIntro(userInfo?.userIntro || '');
                                            setIsModalOpen(false);
                                        }}
                                    >
                                        취소하기
                                    </ModalDeleteButton>
                                </ButtonContainer>
                            </>
                        ) : type === 'time' ? (
                            <>
                                <ModalWrapper>
                                    <ModalTitle>상담 시간 수정</ModalTitle>
                                    <ModalInput
                                        type="text"
                                        value={newStartTime}
                                        onChange={handleStartTimeChange}
                                        placeholder="시작시간"
                                    />
                                    시~
                                    <ModalInput
                                        type="text"
                                        value={newEndTime}
                                        onChange={handleEndTimeChange}
                                        placeholder="종료시간"
                                    />
                                    시
                                </ModalWrapper>
                                <ButtonContainer>
                                    <ModalButton onClick={handleSaveTime}>저장하기</ModalButton>
                                    <ModalDeleteButton
                                        onClick={() => {
                                            setIsModalOpen(false);
                                        }}
                                    >
                                        취소하기
                                    </ModalDeleteButton>
                                </ButtonContainer>
                            </>
                        ) : (
                            <>
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
                                <ButtonContainer>
                                    <ModalButton onClick={handleUpdatePW}>저장하기</ModalButton>
                                    <ModalDeleteButton
                                        onClick={() => {
                                            setIsModalOpen(false);
                                        }}
                                    >
                                        취소하기
                                    </ModalDeleteButton>
                                </ButtonContainer>
                            </>
                        )}
                    </ModalContainer>
                </ModalOverlay>
            )}
        </CounselorInfoContainer>
    );
}

export default CounselorInfo;
