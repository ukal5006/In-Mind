import { useCounselorStore } from '../../stores/counselorDetailStore';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Container from '../../components/Container';
import { colors } from '../../theme/colors';
import Text from '../../components/Text';
import Btn from '../../components/Btn';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import Wrapper from '../../components/Wrapper';
import { MdDragHandle } from 'react-icons/md';
import axios from 'axios';
import { CREATERESUMES, READRESUMES, UDRESUMES } from '../../apis/resumesApi';
import userStore from '../../stores/userStore';
import Glass from '../../components/Glass';

const CounselorCareerContainer = styled(Container)`
    padding: 30px 20px;
    box-sizing: border-box;
    width: 100%;
    flex-direction: column;
    overflow-y: auto; /* 필요시 스크롤 추가 */
`;

const Line = styled.div`
    height: 1px;
    width: 100%;
    border-bottom: 2px solid ${colors.gray};
    margin: 10px 0px;
`;

const CareerContainer = styled(Container)`
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    box-sizing: border-box;
    margin-top: 10px;
    height: 300px;
    max-height: 350px;
    justify-content: start;
    ${Glass}
    padding: 20px;
`;

const CareerContainerHeader = styled(Text)`
    font-weight: 700;
    color: ${colors.gray};
`;

const CareerList = styled.ul`
    width: 100%;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 0px 10px;
    height: 200px;
`;

const CareerScollList = styled(CareerList)`
    max-height: 400px; /* 최대 높이를 설정하여 스크롤 가능하도록 함 */
    overflow-y: auto; /* 세로 스크롤 추가 */
`;

const CareerListItem = styled.li`
    width: 100%;
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 0px 10px;
`;

const ItemContent = styled.div`
    margin-top: 0px;
    height: 50px;
    display: flex;
    align-items: center;
    font-size: 18px;
    margin-right: 10px; // BtnWrapper와의 간격
`;

const UpdateBtn = styled(Btn)`
    background-color: ${colors.darkGreen};
    color: ${colors.white};
    font-size: 14px;
`;

const DeleteBtn = styled(Btn)`
    background-color: ${colors.red};
    color: ${colors.white};
    font-size: 14px;
    margin-left: 5px;
`;

const BtnWrapper = styled(Wrapper)`
    flex: 0 0 20%;
    display: flex;
    align-items: stretch; // flex-end에서 stretch로 변경
    justify-content: center;
    height: 100%;
    gap: 5px; // 버튼 사이의 간격
    & > button {
        border-radius: 10px;
    }
`;

const DragIcon = styled(MdDragHandle)`
    font-size: 20px;
    margin-right: 5px;
`;

const CareerItemContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between; // 추가
`;

const Input = styled.input`
    width: 600px;
    padding: 5px;
    margin: 10px 0;
    & + ${UpdateBtn} {
        margin-left: 10px;
    }
    position: fixed;
    bottom: 0px;
`;

const CareerButton = styled.button`
    width: 50%; // 80%에서 100%로 변경
    height: 25px;
    display: inline-flex; // flex에서 inline-flex로 변경
    align-items: center;
    justify-content: center;
    font-size: 14px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;
    white-space: nowrap; // 텍스트가 한 줄로 유지되도록 함
    overflow: hidden;
    text-overflow: ellipsis;
`;

const CareerUpdateBtn = styled(CareerButton)`
    background-color: ${colors.darkGreen};
    color: ${colors.white};
    margin-bottom: 5px;
    &:hover {
        background-color: ${colors.darkGreen};
    }
`;

const CareerDeleteBtn = styled(CareerButton)`
    background-color: ${colors.red};
    color: ${colors.white};
    &:hover {
        background-color: tomato;
    }
`;

function CounselorCareer() {
    const { userInfo, token } = userStore((state) => state);
    const [careers, setCareers] = useState<string[]>([]);
    const [resumeIdx, setResumeIdx] = useState('-1');
    const { counselor } = useCounselorStore();
    //   const array = [`밥먹기`, `청소하기`, `공부하기`];
    //   const jsonString = JSON.stringify(array);
    //   console.log(jsonString);

    useEffect(() => {
        if (userInfo?.userIdx) {
            axios
                .get(READRESUMES(userInfo.userIdx), {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        accept: '*/*',
                        'Content-Type': 'application/json;charset=UTF-8',
                    },
                })
                .then((response) => {
                    setResumeIdx(response.data.resumeIdx);
                    const formattedString = response.data.info.replace(/`/g, '"');
                    setCareers(JSON.parse(formattedString));
                })
                .catch((error) => {
                    if (error.response && error.response.status === 404) {
                        console.log('이력없슴');
                        axios
                            .post(
                                CREATERESUMES,
                                {
                                    userIdx: userInfo.userIdx,
                                    info: '[]',
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
                                axios
                                    .get(READRESUMES(userInfo.userIdx), {
                                        headers: {
                                            Authorization: `Bearer ${token}`,
                                            accept: '*/*',
                                            'Content-Type': 'application/json;charset=UTF-8',
                                        },
                                    })
                                    .then((response) => {
                                        setResumeIdx(response.data.resumeIdx);
                                        const formattedString = response.data.info.replace(/`/g, '"');
                                        setCareers(JSON.parse(formattedString));
                                    });
                            });
                    } else {
                        console.error('API 호출 실패:', error);
                    }
                });
        }
    }, [userInfo]); // userInfo가 변경될 때만 실행되도록 설정

    const [newCareer, setNewCareer] = useState<string>('');
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editingCareer, setEditingCareer] = useState<string>('');

    useEffect(() => {
        if (resumeIdx !== '-1') {
            axios
                .put(
                    UDRESUMES(resumeIdx),
                    {
                        info: JSON.stringify(careers),
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
                    console.log('이력서 업데이트 성공:', response.data);
                })
                .catch((error) => {
                    console.error('이력서 업데이트 실패:', error);
                });
        }
    }, [careers]);

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const reorderedCareers = Array.from(careers);
        const [removed] = reorderedCareers.splice(result.source.index, 1);
        reorderedCareers.splice(result.destination.index, 0, removed);

        setCareers(reorderedCareers);
    };

    const handleAddCareer = () => {
        if (newCareer && !careers.includes(newCareer)) {
            setCareers([...careers, newCareer]);
            setNewCareer('');
        } else {
            alert('이미 존재하는 이력입니다.');
        }
    };

    const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleAddCareer();
        }
    };

    const handleEditCareer = (index: number) => {
        setEditingIndex(index);
        setEditingCareer(careers[index]);
    };

    const handleUpdateCareer = () => {
        if (editingIndex !== null && editingCareer) {
            const updatedCareers = [...careers];
            if (!updatedCareers.includes(editingCareer)) {
                updatedCareers[editingIndex] = editingCareer;
                setCareers(updatedCareers);
            } else {
                alert('이미 존재하는 이력입니다.');
            }
            setEditingIndex(null);
            setEditingCareer('');
        }
    };

    const handleDeleteCareer = (index: number) => {
        const updatedCareers = careers.filter((_, i) => i !== index);
        setCareers(updatedCareers);
    };

    return (
        <CounselorCareerContainer>
            <CareerContainer>
                <CareerContainerHeader>소속 기관</CareerContainerHeader>
                {counselor?.organizationName ? (
                    <CareerList>
                        <CareerListItem>기관명 : {counselor.organizationName}</CareerListItem>
                        <Line />
                        <CareerListItem>전화번호 : {counselor.organizationTel}</CareerListItem>
                        <Line />
                    </CareerList>
                ) : (
                    <CareerList>
                        <CareerListItem>기관명 : 삼성청년심리상담센터</CareerListItem>
                        <Line />
                        <CareerListItem>주소 : 대전광역시 유성구 덕명동 124</CareerListItem>
                        <Line />
                        <CareerListItem>전화번호 : 042-820-7400</CareerListItem>
                        <Line />
                    </CareerList>
                )}
            </CareerContainer>
            <CareerContainer>
                <CareerContainerHeader>이력</CareerContainerHeader>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="careers">
                        {(provided) => (
                            <CareerScollList {...provided.droppableProps} ref={provided.innerRef}>
                                {careers.map((career, index) => (
                                    <Draggable key={career} draggableId={career} index={index}>
                                        {(provided) => (
                                            <CareerListItem
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                {editingIndex === index ? (
                                                    <>
                                                        <Input
                                                            type="text"
                                                            value={editingCareer}
                                                            onChange={(e) => setEditingCareer(e.target.value)}
                                                        />
                                                        <UpdateBtn onClick={handleUpdateCareer}>확인</UpdateBtn>
                                                    </>
                                                ) : (
                                                    <CareerItemContainer>
                                                        <ItemContent>
                                                            <DragIcon />
                                                            {career}
                                                        </ItemContent>
                                                        <BtnWrapper>
                                                            <CareerUpdateBtn onClick={() => handleEditCareer(index)}>
                                                                수정
                                                            </CareerUpdateBtn>
                                                            <CareerDeleteBtn onClick={() => handleDeleteCareer(index)}>
                                                                삭제
                                                            </CareerDeleteBtn>
                                                        </BtnWrapper>
                                                    </CareerItemContainer>
                                                )}
                                            </CareerListItem>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </CareerScollList>
                        )}
                    </Droppable>
                </DragDropContext>
                <Input
                    type="text"
                    value={newCareer}
                    onChange={(e) => setNewCareer(e.target.value)}
                    onKeyDown={handleInputKeyDown}
                    placeholder="새 이력 추가"
                />
            </CareerContainer>
        </CounselorCareerContainer>
    );
}

export default CounselorCareer;
