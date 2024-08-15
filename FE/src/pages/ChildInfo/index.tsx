import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Container from '../../components/Container';
import Wrapper from '../../components/Wrapper';
import Text from '../../components/Text';
import Btn from '../../components/Btn';
import { colors } from '../../theme/colors';
import { IoPersonAdd } from 'react-icons/io5';
import ChildUpdate, { ChildUpdateProps } from '../ChildUpdate';
import Slider from 'react-slick';
import profileImage from './profile.png';
import useChildStore from '../../stores/childStore';
import userStore from '../../stores/userStore';
import Glass from '../../components/Glass';

interface ChildData {
    childIdx: number;
    childName: string;
    childBirth: string;
}

const ChildInfoContainer = styled(Container)`
    border-radius: 10px;
    background-color: #fff;
    ${Glass}
`;

const ChildAddWrapper = styled(Wrapper)`
    border-radius: 10px;
    width: 400px;
    height: 500px;
    flex-direction: column;
`;

const AddBtn = styled(Btn)`
    background-color: ${colors.green};
    font-size: 60px;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    margin-bottom: 10px;
    color: white;
`;

const AddText = styled(Text)`
    margin-top: 10px;
    font-size: 24px; /* 더 큰 폰트 크기 */
    font-weight: 700;
    color: ${colors.black}; /* 좀 더 밝은 색상 */
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ModalContent = styled.div`
    background-color: #fff; /* 흰색 배경 */
    padding: 40px; /* 패딩을 늘려 여유 공간 추가 */
    border-radius: 15px; /* 둥근 모서리 */
    width: 400px;
    max-width: 90%; /* 화면 크기에 따라 반응형 */
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3); /* 더 부드러운 그림자 */
    animation: fadeIn 0.3s; /* 애니메이션 효과 추가 */
    text-align: center; /* 텍스트 중앙 정렬 */

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

    /* 버튼 스타일을 위한 추가 클래스 */
    & button {
        background-color: ${colors.green}; /* 버튼 배경색 */
        color: ${colors.white}; /* 버튼 글자색 */
        border: none; /* 테두리 없애기 */
        border-radius: 10px; /* 둥근 버튼 */
        padding: 10px 20px; /* 버튼 패딩 */
        font-size: 18px; /* 버튼 글자 크기 */
        margin-top: 20px; /* 버튼 위 여백 */
        cursor: pointer; /* 커서 포인터로 변경 */
        transition: background-color 0.3s; /* 배경색 변화 효과 */

        &:hover {
            background-color: ${colors.darkGreen}; /* 호버 시 색상 변화 */
        }
    }
`;

const SliderContainer = styled(Container)`
    width: 400px;
    height: 500px;
    border: 1px solid black;
    border-radius: 10px;
`;

const CustomSlider = styled(Slider)`
    width: 100%;
    height: 90%;
`;

const Slide = styled.div`
    display: flex !important;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 440px;
`;

const ChildImage = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 50%;
`;

const ChildText = styled(Text)`
    font-size: 22px; /* 조금 더 큰 폰트 크기 */
    color: ${colors.darkGray}; /* 색상 변경 */
`;

const ChildName = styled(Text)`
    color: ${colors.darkGreen};
    font-weight: 700;
    margin-right: 5px;
`;
const BtnWrapper = styled(Wrapper)`
    padding: 0px;
    width: 100%;
    justify-content: space-evenly;

    & > button {
        font-size: 20px;
        color: ${colors.white};
        border-radius: 10px; /* 둥근 버튼 */
        padding: 10px 15px; /* 버튼 안쪽 패딩 */
        transition: background 0.3s; /* 배경색 변화 효과 */
    }
`;
const OtherChildWrapper = styled(Wrapper)`
    height: 450px;
    display: flex;
    flex-direction: column;
`;

interface UpdateBtnProps {
    onClick: () => void;
    childId: number;
    children: React.ReactNode;
}

const StyledUpdateBtn = styled(Btn)`
    background-color: ${colors.green};

    &:hover {
        background-color: ${colors.darkGreen}; /* 호버 시 색상 변화 */
    }
`;
const UpdateBtn: React.FC<UpdateBtnProps> = ({ onClick, childId, children }) => {
    const handleClick = () => {
        onClick();
    };

    return <StyledUpdateBtn onClick={handleClick}>{children}</StyledUpdateBtn>;
};

const DeleteBtn = styled(Btn)`
    background-color: ${colors.red};
`;

interface ChildData {
    childIdx: number;
    childName: string;
    childBirth: string;
}

// ... (styled components remain the same)

function ChildInfo() {
    const { children, readAllChildren, deleteChild } = useChildStore();
    const { userInfo, token } = userStore((state) => state);
    const [isModalOpen, setModalOpen] = useState(false);
    const [type, setType] = useState<'create' | 'update'>('create');
    const [selectedChildIdx, setSelectedChildIdx] = useState<number | undefined>(undefined);

    const fetchChildren = useCallback(() => {
        if (userInfo && token) {
            readAllChildren(userInfo.userIdx, token);
        }
    }, [userInfo, readAllChildren]);

    useEffect(() => {
        fetchChildren();
    }, [fetchChildren]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const handleAddChild = () => {
        setType('create');
        setSelectedChildIdx(undefined);
        setModalOpen(true);
    };

    const handleUpdateChild = (childIdx: number) => {
        setType('update');
        setSelectedChildIdx(childIdx);
        setModalOpen(true);
    };

    const handleDeleteChild = async (childIdx: number) => {
        try {
            if (token) {
                await deleteChild(childIdx, token);
                alert('아이 정보가 삭제되었습니다.');
                fetchChildren(); // 삭제 후 목록 갱신
            }
        } catch (error) {
            console.log('아이 정보 삭제 실패', error);
            alert('아이 정보 삭제 실패');
        }
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedChildIdx(undefined);
        fetchChildren(); // 모달 닫을 때 목록 갱신
    };

    return (
        <>
            <ChildInfoContainer>
                {children.length === 0 ? (
                    <ChildAddWrapper>
                        <AddBtn onClick={handleAddChild}>
                            <IoPersonAdd />
                        </AddBtn>
                        <AddText>등록된 아이가 없습니다.</AddText>
                        <AddText>버튼을 눌러 아이를 등록해주세요.</AddText>
                    </ChildAddWrapper>
                ) : (
                    <SliderContainer>
                        <CustomSlider {...settings}>
                            {children.map((child: ChildData) => (
                                <Slide key={child.childIdx}>
                                    <ChildImage src={profileImage} alt="" />
                                    <ChildText>
                                        <ChildName>{child.childName}</ChildName>어린이
                                    </ChildText>
                                    <ChildText>생일 : {child.childBirth}</ChildText>
                                    <BtnWrapper>
                                        <UpdateBtn
                                            onClick={() => handleUpdateChild(child.childIdx)}
                                            childId={child.childIdx}
                                        >
                                            수정
                                        </UpdateBtn>
                                        <DeleteBtn onClick={() => handleDeleteChild(child.childIdx)}>삭제</DeleteBtn>
                                    </BtnWrapper>
                                </Slide>
                            ))}
                            <Slide key="otherAdd">
                                <OtherChildWrapper>
                                    <AddBtn onClick={handleAddChild}>
                                        <IoPersonAdd />
                                    </AddBtn>
                                    <AddText>버튼을 눌러 아이를 등록해주세요.</AddText>
                                </OtherChildWrapper>
                            </Slide>
                        </CustomSlider>
                    </SliderContainer>
                )}
            </ChildInfoContainer>
            {isModalOpen && (
                <ModalOverlay onClick={closeModal}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <ChildUpdate
                            type={type}
                            childIdx={selectedChildIdx}
                            onClose={closeModal}
                            onSuccess={fetchChildren}
                        />
                    </ModalContent>
                </ModalOverlay>
            )}
        </>
    );
}

export default ChildInfo;
