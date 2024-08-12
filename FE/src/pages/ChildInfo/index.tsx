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

interface ChildData {
    childIdx: number;
    childName: string;
    childBirth: string;
}

const ChildInfoContainer = styled(Container)``;

const ChildAddWrapper = styled(Wrapper)`
    border: 1px solid black;
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
`;

const AddText = styled(Text)`
    margin-top: 10px;
    font-size: 20px;
    font-weight: 700;
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

const ModalContent = styled.div`
    background: white;
    padding: 20px;
    border-radius: 10px;
    width: 300px;
    text-align: center;
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
    font-size: 20px;
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

            {isModalOpen && (
                <ModalOverlay onClick={closeModal}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <ChildUpdate
                            type={type}
                            childIdx={selectedChildIdx}
                            onClose={closeModal}
                            onSuccess={fetchChildren}
                        />
                        <Btn onClick={closeModal}>닫기</Btn>
                    </ModalContent>
                </ModalOverlay>
            )}
        </ChildInfoContainer>
    );
}

export default ChildInfo;
