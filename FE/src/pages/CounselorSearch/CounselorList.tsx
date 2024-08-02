import React from 'react';
import { Link } from 'react-router-dom';
import useCounselorStore from '../../stores/counselorStore';

const CounselorList: React.FC = () => {
  const { filteredCounselors, currentPage } = useCounselorStore();
  const counselorsPerPage = 5;
  const startIndex = (currentPage - 1) * counselorsPerPage;
  const endIndex = startIndex + counselorsPerPage;
  const displayedCounselors = filteredCounselors.slice(startIndex, endIndex);

  return (
    <div>
      {displayedCounselors.map((counselor) => (
        <Link to={`/counselor/${counselor.idx}`} key={counselor.idx}>
          <div>
            <h3>{counselor.name}</h3>
            <p>소속: {counselor.organization}</p>
            <p>학력: {counselor.education}</p>
            <p>경력: {counselor.experience}</p>
            <p>상담 가능 시간: {counselor.availableTime}</p>
            <p>거리: {counselor.distance}km</p>
            <p>리뷰 수: {counselor.reviewCount}</p>
            <p>평점: {counselor.rating}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CounselorList;