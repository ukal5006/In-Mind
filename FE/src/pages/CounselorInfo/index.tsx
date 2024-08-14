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
import { CHANGEPW, CHECKPW, LOADUSERINFO, UPDATECOUNSELORINFO } from '../../apis/userApi';
import { RDDEFAULTTIME, UPDATEDEFAULTTIME } from '../../apis/managementApi';

const CounselorInfoContainer = styled(Container)`
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
    margin-bottom: 15px;
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
    margin: 7px;
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
    width: 100%;
`;

function CounselorInfo() {
    const { userInfo, setUserInfo, token } = userStore((state) => state);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [type, setType] = useState('');
    const [name, setName] = useState(userInfo?.userName);
    const [email, setEmail] = useState(userInfo?.userEmail);
    const [phone, setPhone] = useState(userInfo?.userTel);
    const [intro, setIntro] = useState(userInfo?.userIntro);
    const [profile, setProfile] = useState(userInfo?.userProfile);
    const [beforePw, setbeforePw] = useState('');
    const [changePw, setChangePw] = useState('');
    const [changePwCheck, setChangePwCheck] = useState('');

    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [newStartTime, setNewStartTime] = useState('');
    const [newEndTime, setNewEndTime] = useState('');

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
        if (userInfo?.userIdx) {
            axios
                .put(
                    UPDATECOUNSELORINFO(userInfo?.userIdx),
                    {
                        userEmail: email,
                        userName: name,
                        userTel: phone,
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
                    localStorage.setItem('userInfo', JSON.stringify(response.data)); // 사용자 정보를 JSON 문자열로 저장
                    alert('정보가 수정되었습니다.');
                    setIsModalOpen(false); // 모달 닫기
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

    return (
        <CounselorInfoContainer>
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
                    <InfoListItem>한줄소개 : {userInfo?.userIntro}</InfoListItem>
                    <Line />
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
            <Line />
            <InfoContainer>
                <InfoContainerHeader>상담시간</InfoContainerHeader>
                <InfoList>
                    <InfoListItem>
                        상담 가능 시간 : {startTime}시 ~ {endTime}시
                    </InfoListItem>
                    <Line />
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
            <Line />
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
                    <Line />
                    <InfoListItem>
                        <DeleteIdLink to="deleteId">회원탈퇴▶</DeleteIdLink>
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
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="이름"
                                />
                                <ModalInput
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="이메일"
                                />
                                <ModalInput
                                    type="text"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="전화번호"
                                />
                                <ModalInput
                                    type="text"
                                    value={intro}
                                    onChange={(e) => setIntro(e.target.value)}
                                    placeholder="한줄소개"
                                />
                                <ModalButton onClick={handleUpdate}>저장하기</ModalButton>
                                <ModalButton
                                    onClick={() => {
                                        setName(userInfo?.userName);
                                        setEmail(userInfo?.userEmail);
                                        setPhone(userInfo?.userTel);
                                        setIntro(userInfo?.userIntro);
                                        setIsModalOpen(false);
                                    }}
                                >
                                    취소하기
                                </ModalButton>
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
                                <ModalButton onClick={handleSaveTime}>저장하기</ModalButton>
                                <ModalButton
                                    onClick={() => {
                                        setIsModalOpen(false);
                                    }}
                                >
                                    취소하기
                                </ModalButton>
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
                                <ModalButton onClick={handleUpdatePW}>저장하기</ModalButton>
                                <ModalButton
                                    onClick={() => {
                                        setIsModalOpen(false);
                                    }}
                                >
                                    취소하기
                                </ModalButton>
                            </>
                        )}
                    </ModalContainer>
                </ModalOverlay>
            )}
        </CounselorInfoContainer>
    );
}

export default CounselorInfo;
