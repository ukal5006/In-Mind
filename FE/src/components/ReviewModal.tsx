import React, { useState } from 'react';
import { Star } from 'lucide-react';
import axios from 'axios';
import { useReservationStore } from '../stores/ReservationStore'; //예약정보를 기억할 저장소를 만들어야 할 듯?
import { useUserStore } from '../stores/UserStore'; //로그인한 유저정보를 기억할 저장소도 만들어야함

const ReviewModal = ():JSX.Element => {
  const [rating, setRating] = useState<number>(0);
  const [content, setContent] = useState<string>('');
  const { reservationIdx, counselorIdx } = useReservationStore();
  const { userName } = useUserStore();

  const handleSubmit = async () => {
    try {
      await axios.post('/api/reviews', {
        reservationIdx,
        counselorIdx,
        userName,
        rating,
        content
      });
      // 성공적인 제출 처리 (예: 모달 닫기, 성공 메시지 표시)
      console.log('리뷰가 성공적으로 제출되었습니다.');
    } catch (error) {
      // 에러 처리 (예: 에러 메시지 표시)
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
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
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={handleSubmit}
        >
          리뷰 남기기
        </button>
      </div>
    </div>
  );
};

export default ReviewModal;