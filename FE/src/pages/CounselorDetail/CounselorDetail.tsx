// CounselorDetail.tsx
import React, { useState, useEffect } from 'react';
import { useCounselorStore } from '../../stores/counselorDetailStore';
import { Star, User } from 'lucide-react';

interface CounselorDetailProps {
  userId: string;
}

const CounselorDetailPage: React.FC<CounselorDetailProps> = ({ userId }): JSX.Element => {
  const { counselor, loading, error, fetchCounselor } = useCounselorStore();
  const [activeTab, setActiveTab] = useState<'info' | 'reviews'>('info');

  // useEffect(() => {
  //   if (userId) {
  //     fetchCounselor(parseInt(userId));
  //   }
  // }, [userId, fetchCounselor]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!counselor) return <div>No counselor data found</div>;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={index < rating ? 'text-yellow-400' : 'text-gray-300'}
        fill={index < rating ? 'currentColor' : 'none'}
      />
    ));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center mb-6">
        {counselor.userProfile ? (
          <img
            src={counselor.userProfile}
            alt={counselor.userName}
            className="w-24 h-24 rounded-full mr-4"
          />
        ) : (
          <User className="w-24 h-24 rounded-full mr-4 bg-gray-200 p-4" />
        )}
        <div>
          <h1 className="text-2xl font-bold">{counselor.userName}</h1>
          <p className="text-gray-600">{counselor.organizationName}</p>
        </div>
      </div>

      <div className="mb-6">
        <button
          className={`mr-4 ${activeTab === 'info' ? 'font-bold' : ''}`}
          onClick={() => setActiveTab('info')}
        >
          상담사 정보
        </button>
        <button
          className={activeTab === 'reviews' ? 'font-bold' : ''}
          onClick={() => setActiveTab('reviews')}
        >
          상담 리뷰
        </button>
      </div>

      {activeTab === 'info' && (
        <div>
          <p>전화번호: {counselor.userTel}</p>
          <p>소속기관: {counselor.organizationName}</p>
          <p>기관 전화번호: {counselor.organizationTel}</p>
          <p>자격증: {counselor.certificateTitle}</p>
          <p>경력사항: {counselor.resumeInfo}</p>
        </div>
      )}

      {activeTab === 'reviews' && (
        <div>
          <h2 className="text-xl font-bold mb-4">리뷰</h2>
          <div className="flex items-center mb-2">
            <div className="flex mr-2">{renderStars(counselor.reviewRatingAverage)}</div>
            <span>{counselor.reviewRatingAverage.toFixed(1)}</span>
            <span className="ml-2">({counselor.reviewCount} reviews)</span>
          </div>
          <p>{counselor.reviewContent}</p>
        </div>
      )}
    </div>
  );
};

export default CounselorDetailPage;