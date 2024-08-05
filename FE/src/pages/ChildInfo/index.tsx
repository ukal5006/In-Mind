import { useState } from 'react';
import styled from 'styled-components';
import Container from '../../components/Container';
import Wrapper from '../../components/Wrapper';
import Text from '../../components/Text';
import Btn from '../../components/Btn';
import { colors } from '../../theme/colors';
import { IoPersonAdd } from 'react-icons/io5';
import ChildUpdate from '../ChildUpdate';
import Slider from 'react-slick';
import profileImage from './profile.png';

interface ChildData {
  name: string;
  birthday: string;
  createAt: string;
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

const UpdateBtn = styled(Btn)`
  background-color: ${colors.green};
`;

const DeleteBtn = styled(Btn)`
  background-color: ${colors.red};
`;

function ChildInfo() {
  const [isModalOpen, setModalOpen] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // appendDots: (dots: any) => (
    //     <div
    //         style={{
    //             width: '100%',
    //             position: 'absolute',
    //             bottom: '-10px',
    //             display: 'flex',
    //             alignItems: 'center',
    //             justifyContent: 'center',
    //         }}
    //     >
    //         <ul> {dots} </ul>
    //     </div>
    // ),
    // dotsClass: 'dots_custom',
  };

  const handleAddChild = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const childInfo: ChildData[] = [
    {
      name: '이용원',
      birthday: '2017.03.02',
      createAt: '2024.08.05',
    },
    {
      name: '이용훈',
      birthday: '2018.02.11',
      createAt: '2024.08.05',
    },
  ];

  return (
    <ChildInfoContainer>
      {childInfo.length === 0 ? (
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
            {childInfo.map((e: ChildData, index: number) => (
              <Slide key={index}>
                <ChildImage src={profileImage} alt="" />
                <ChildText>
                  <ChildName>{e.name}</ChildName>어린이
                </ChildText>
                <ChildText>생일 : {e.birthday}</ChildText>
                <ChildText>등록일자 : {e.createAt}</ChildText>
                <BtnWrapper>
                  <UpdateBtn>수정</UpdateBtn>
                  <DeleteBtn>삭제</DeleteBtn>
                </BtnWrapper>
              </Slide>
            ))}
          </CustomSlider>
        </SliderContainer>
      )}

      {isModalOpen && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ChildUpdate type="create" />
            <Btn onClick={closeModal}>닫기</Btn>
          </ModalContent>
        </ModalOverlay>
      )}
    </ChildInfoContainer>
  );
}

export default ChildInfo;
