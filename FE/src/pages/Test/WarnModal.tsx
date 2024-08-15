import React from 'react';
import styled from 'styled-components';
import { colors } from '../../theme/colors';

const ModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    width: 440px;
    margin: 20px auto;
`;

const Title = styled.h2`
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
`;

const Section = styled.div`
    width: 100%;
    margin-bottom: 15px;
`;

const SectionTitle = styled.h3`
    font-size: 20px;
    color: #555;
    margin-bottom: 10px;
`;

const List = styled.ul`
    list-style-type: disc;
    padding-left: 20px;
`;

const ListItem = styled.li`
    font-size: 16px;
    color: #666;
    margin-bottom: 5px;
`;

const TextPoint = styled.span`
    color: ${colors.okGreen};
    font-weight: 700;
`;

const WarnModal = () => {
    return (
        <ModalContainer>
            <Title>HTP 검사 안내</Title>
            <Section>
                <SectionTitle>검사 방법</SectionTitle>
                <List>
                    <ListItem>준비물: 흰 A4 용지, 연필, 지우개</ListItem>
                    <ListItem>
                        집: <TextPoint>가로 방향</TextPoint>으로 그려주세요.
                    </ListItem>
                    <ListItem>
                        나무와 사람: <TextPoint>세로 방향</TextPoint>으로 그려주세요.
                    </ListItem>
                    <ListItem>
                        <TextPoint>편안한 마음</TextPoint>으로 그림을 그려주세요.
                    </ListItem>
                </List>
            </Section>
            <Section>
                <SectionTitle>사진 업로드 안내</SectionTitle>
                <List>
                    <ListItem>
                        흰 배경이 아닌 <TextPoint>어두운 배경</TextPoint>에서 사진을 찍어주세요.
                    </ListItem>
                    <ListItem>
                        <TextPoint>빛 반사</TextPoint>가 최대한 보이지 않도록 사진을 촬영해주세요.
                    </ListItem>
                </List>
            </Section>
            <Section>
                <SectionTitle>해석 안내</SectionTitle>
                <List>
                    <ListItem>
                        이 검사 결과가 아이의 모든 감정과 심리 상태를 대변하는 것이 아닙니다.이를 감안하여 해석해
                        주세요.
                    </ListItem>
                    <ListItem>
                        더 자세한 결과는 <TextPoint>화상 상담</TextPoint>을 통해 확인하실 수 있습니다.
                    </ListItem>
                </List>
            </Section>
        </ModalContainer>
    );
};

export default WarnModal;
