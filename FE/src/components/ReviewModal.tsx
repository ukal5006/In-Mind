import React, { useState } from 'react';
import { Star } from 'lucide-react';
import axios from 'axios';
import styled from 'styled-components';
import userStore from '../stores/userStore';
import { useNavigate } from 'react-router-dom';

const apiUrl = 'https://i11b301.p.ssafy.io/api';

const ModalContent = styled.div`
    background: white;
    border-radius: 10px;
    width: 500px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    overflow: hidden;
`;

const ModalHeader = styled.div`
    background-color: #10c263;
    color: white;
    padding: 20px;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
`;

const ModalBody = styled.div`
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
`;

const StarContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
`;

const TextArea = styled.textarea`
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    resize: vertical;
    min-height: 100px;
    margin-bottom: 20px;
    resize: none;
`;

const CharCount = styled.p`
    text-align: right;
    color: #888;
    font-size: 0.8rem;
    position: absolute;
    bottom: 100px;
    right: 30px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

const Button = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        opacity: 0.9;
    }
`;

const SubmitButton = styled(Button)`
    background-color: #10c263;
    color: white;
`;

const CloseButton = styled(Button)`
    background-color: #ff4d4d;
    color: white;
`;

// ReviewModalButton 컴포넌트
const ReviewModal = (props: any) => {
    const [hoverRating, setHoverRating] = useState(0);
    const [selectedRating, setSelectedRating] = useState(0);
    const { reserveInfoIdx, coIdx } = props;
    const [content, setContent] = useState('');
    const { userInfo, token } = userStore();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            await axios.post(
                `${apiUrl}/reviews`,
                { reserveIdx: reserveInfoIdx, coIdx, name: userInfo?.userName, score: selectedRating, content },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        accept: '*/*',
                        'Content-Type': 'application/json;charset=UTF-8',
                    },
                }
            );
            alert('리뷰를 남겨주셔서 감사합니다!');
            navigate('/');
        } catch (error) {
            console.error('리뷰 제출 중 오류 발생:', error);
        }
    };

    const handleStarInteraction = (score: any, action: any) => {
        if (action === 'enter' && selectedRating === 0) {
            setHoverRating(score);
        } else if (action === 'leave' && selectedRating === 0) {
            setHoverRating(0);
        } else if (action === 'click') {
            setSelectedRating(score);
            setHoverRating(score);
        }
    };

    const renderStars = () => {
        return Array.from({ length: 5 }, (_, i) => i + 1).map((score) => (
            <Star
                key={score}
                size={32}
                fill={(selectedRating || hoverRating) >= score ? 'gold' : 'none'}
                stroke={(selectedRating || hoverRating) >= score ? 'gold' : '#ddd'}
                onClick={() => handleStarInteraction(score, 'click')}
                onMouseEnter={() => handleStarInteraction(score, 'enter')}
                onMouseLeave={() => handleStarInteraction(score, 'leave')}
                style={{ cursor: 'pointer', marginRight: '5px' }}
            />
        ));
    };

    return (
        <ModalContent>
            <ModalHeader>상담 후기 작성</ModalHeader>
            <ModalBody>
                <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>상담은 만족하셨나요?</h3>
                <StarContainer>{renderStars()}</StarContainer>
                <p style={{ textAlign: 'center', marginBottom: '20px' }}>만족도: {selectedRating} / 5</p>
                <TextArea
                    placeholder="상담에 대해 리뷰를 남겨주세요. (최대 200자)"
                    value={content}
                    onChange={(e) => setContent(e.target.value.slice(0, 250))}
                    maxLength={200}
                />
                <CharCount>{content.length}/200</CharCount>
                <ButtonContainer>
                    <SubmitButton onClick={handleSubmit}>리뷰 남기기</SubmitButton>
                    <CloseButton onClick={() => navigate('/user')}>닫기</CloseButton>
                </ButtonContainer>
            </ModalBody>
        </ModalContent>
    );
};

export default ReviewModal;
