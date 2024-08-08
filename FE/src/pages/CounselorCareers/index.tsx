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
import { READRESUMES } from '../../apis/resumesApi';
import userStore from '../../stores/userStore';

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
    width: 90%;
    flex-direction: column;
    align-items: flex-start;
    box-sizing: border-box;
    margin: 20px;
    /* height: 300px; */
    max-height: 350px;
    justify-content: start;
`;

const CareerContainerHeader = styled(Text)`
    font-weight: 700;
    color: ${colors.gray};
`;

const CareerList = styled.ul`
    width: 100%;
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 0px 10px;
`;

const CareerScollList = styled(CareerList)`
    max-height: 400px; /* 최대 높이를 설정하여 스크롤 가능하도록 함 */
    overflow-y: auto; /* 세로 스크롤 추가 */
`;

const CareerListItem = styled.li`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0; /* 아이템 간격 추가 */
`;

const ItemContent = styled.div`
    height: 50px;
    display: flex;
    align-items: center;
    font-size: 18px;
`;

const UpdateBtn = styled(Btn)`
    background-color: ${colors.darkGreen};
    color: ${colors.white};
    font-size: 14px;
    width: auto;
    min-width: 40px;
`;

const DeleteBtn = styled(Btn)`
    background-color: ${colors.red};
    color: ${colors.white};
    font-size: 14px;
    margin-left: 5px;
`;

const Input = styled.input`
    width: 100%;
    padding: 5px;
    margin: 10px 0;
    & + ${UpdateBtn} {
        margin-left: 10px;
    }
`;

const BtnWrapper = styled(Wrapper)`
    display: flex;
`;

const DragIcon = styled(MdDragHandle)`
    font-size: 20px;
    margin-right: 5px;
`;

function CounselorCareer() {
    const { userInfo } = userStore((state) => state);
    const [careers, setCareers] = useState<string[]>([]);

    if (userInfo?.userIdx) {
        axios
            .get(READRESUMES(userInfo.userIdx))
            .then((response) => {
                console.log(response.data.info);
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    console.log('이력없슴');
                }
            });
    }

    const [newCareer, setNewCareer] = useState<string>('');
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editingCareer, setEditingCareer] = useState<string>('');

    useEffect(() => {
        //
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
                <CareerList>
                    <CareerListItem>기관명 : 삼성청년심리상담센터</CareerListItem>
                    <Line />
                    <CareerListItem>주소 : 대전광역시 유성구 덕명동 124</CareerListItem>
                    <Line />
                    <CareerListItem>전화번호 : 042-820-7400</CareerListItem>
                    <Line />
                    <CareerListItem>
                        <UpdateBtn>수정하기</UpdateBtn>
                    </CareerListItem>
                </CareerList>
            </CareerContainer>
            <Line />
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
                                                    <>
                                                        <ItemContent>
                                                            <DragIcon />
                                                            {career}
                                                        </ItemContent>
                                                        <BtnWrapper>
                                                            <UpdateBtn onClick={() => handleEditCareer(index)}>
                                                                수정
                                                            </UpdateBtn>
                                                            <DeleteBtn onClick={() => handleDeleteCareer(index)}>
                                                                삭제
                                                            </DeleteBtn>
                                                        </BtnWrapper>
                                                    </>
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
