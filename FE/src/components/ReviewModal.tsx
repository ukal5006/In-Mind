import React, { useState, ReactNode } from 'react';
import { Star } from 'lucide-react';
import axios from 'axios';
import { reservations, username } from '../testData/ReviewModal';
import '../theme/class.css';
import styled from 'styled-components';
import userStore from '../stores/userStore';

const apiUrl = 'https://i11b301.p.ssafy.io/api';
// const apiUrl = 'http://localhost:5000'

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}
// 내부 backend 서버(ssh npm start) >> openvidu도 쓸 수 있음
// http://localhost:5000/

// 외부 backend 서버(로컬 npm start) >> openvidu는 못 씀
// https://i11b301.p.ssafy.io/api/

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div
                style={{
                    background: 'white',
                    padding: '0px',
                    borderRadius: '5px',
                    width: '600px',
                    height: '500px',
                }}
            >
                {children}
            </div>
        </div>
    );
};

interface ReviewModalButtonProps {
    children: ReactNode;
}

interface GreenHeaderProps {
    className?: string;
}

const GreenHeader: React.FC<GreenHeaderProps> = ({ className }) => <div id="greenHeader" className={className} />;

const StyledGreenHeader = styled.div`
    background-color: #10c263;
    width: 100%;
    font-size: 45px;
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ReviewModalButton: React.FC<ReviewModalButtonProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [hoverRating, setHoverRating] = useState<number>(0);
    const [selectedRating, setSelectedRating] = useState<number>(0);
    const [content, setContent] = useState<string>('');
    const { reserveIdx, coIdx } = reservations;
    const { name } = username;
    const { token } = userStore();

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const handleSubmit = async () => {
        try {
            console.log({
                reserveIdx,
                coIdx,
                name,
                score: selectedRating,
                content,
            });
            await axios.post(
                apiUrl + '/reviews',
                {
                    reserveIdx,
                    coIdx,
                    name,
                    score: selectedRating,
                    content,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        accept: '*/*',
                        'Content-Type': 'application/json;charset=UTF-8',
                    },
                }
            );
            console.log('리뷰가 성공적으로 제출되었습니다.');
            closeModal();
        } catch (error) {
            console.error('리뷰 제출 중 오류 발생:', error);
        }
    };

    const handleMouseEnter = (score: number) => {
        if (selectedRating === 0) {
            setHoverRating(score);
        }
    };

    const handleMouseLeave = () => {
        if (selectedRating === 0) {
            setHoverRating(0);
        }
    };

    const handleClick = (score: number) => {
        setSelectedRating(score);
        setHoverRating(score);
    };
    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newContent = e.target.value;
        if (newContent.length <= 250) {
            setContent(newContent);
        }
    };

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            const currentRating = selectedRating || hoverRating;
            stars.push(
                <Star
                    key={i}
                    size={24}
                    fill={currentRating >= i ? 'gold' : 'none'}
                    stroke={currentRating >= i ? 'gold' : 'gray'}
                    onClick={() => handleClick(i)}
                    onMouseEnter={() => handleMouseEnter(i)}
                    onMouseLeave={handleMouseLeave}
                    style={{ cursor: 'pointer' }}
                />
            );
        }
        return stars;
    };

    return (
        <div className="rounded">
            <button onClick={openModal}>{children}</button>
            <Modal isOpen={isOpen} onClose={closeModal}>
                <div className="bg-white p-6 rounded-lg max-w-md w-full">
                    <StyledGreenHeader id="greenHeader" className="rounded">
                        <h2 className="text-xl font-bold mb-4">상담 후기 작성</h2>
                    </StyledGreenHeader>
                    <div className="PD20FS30">
                        <p className="mb-4">상담은 만족하셨나요?</p>
                        <br />
                        <br />
                        <div className="flex mb-4">{renderStars()}</div>
                        <p className="mb-2">만족도 : {selectedRating} / 5</p>
                        <br />
                        <div style={{ position: 'relative', width: '75%' }}>
                            <textarea
                                className="w-full p-2 border rounded mb-4 textArea"
                                rows={6}
                                placeholder="상담에 대해 리뷰를 남겨주세요. (최대 250자)"
                                value={content}
                                onChange={handleContentChange}
                                maxLength={250}
                            />
                            <p style={{
                                position: 'absolute',
                                bottom: '8px',
                                right: '8px',
                                fontSize: '0.7rem',
                                color: '#888',
                                margin: 0
                            }}>
                                {content.length}/250
                            </p>
                        </div>
                        <br />
                        <br />
                        <div className="contentSpaceBetween">
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded lightGreenBGC"
                                onClick={handleSubmit}
                            >
                                리뷰 남기기
                            </button>
                            <button
                                onClick={closeModal}
                                className="bg-red-500 text-white px-4 py-2 rounded ml-2 lightRedBGC"
                            >
                                닫기
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ReviewModalButton;
