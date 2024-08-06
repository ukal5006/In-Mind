import React, { useState, ReactNode } from 'react';
import { Star } from 'lucide-react';
import axios from 'axios';
import { reservations, username } from '../testData/ReviewModal';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '5px',
        width: '300px'
      }}>
        {children}
      </div>
    </div>
  );
};

interface ReviewModalButtonProps {
  children: ReactNode;
}

const ReviewModalButton: React.FC<ReviewModalButtonProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(0);
  const [content, setContent] = useState<string>('');
  const { reservationIdx, counselorIdx } = reservations;
  const { userName } = username;

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleSubmit = async () => {
    try {
      console.log({
        reservationIdx,
        counselorIdx,
        userName,
        rating,
        content,
      });
      await axios.post('/api/reviews', {
        reservationIdx,
        counselorIdx,
        userName,
        rating,
        content,
      });
      console.log('리뷰가 성공적으로 제출되었습니다.');
      closeModal();
    } catch (error) {
      console.error('리뷰 제출 중 오류 발생:', error);
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={24}
          fill={rating >= i ? 'gold' : 'none'}
          stroke={rating >= i ? 'gold' : 'gray'}
          onClick={() => setRating(i)}
          onMouseEnter={() => setRating(i)}
          style={{ cursor: 'pointer' }}
        />
      );
    }
    return stars;
  };

  return (
    <div>
      <button onClick={openModal}>{children}</button>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <div className="bg-white p-6 rounded-lg max-w-md w-full">
          <h2 className="text-xl font-bold mb-4">상담 후기 작성</h2>
          <p className="mb-4">상담은 만족하셨나요?</p>
          <div className="flex mb-4">{renderStars()}</div>
          <textarea
            className="w-full p-2 border rounded mb-4"
            rows={4}
            placeholder="상담에 대해 리뷰를 남겨주세요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleSubmit}>
            리뷰 남기기
          </button>
          <button onClick={closeModal} className="bg-red-500 text-white px-4 py-2 rounded ml-2">
            닫기
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ReviewModalButton;