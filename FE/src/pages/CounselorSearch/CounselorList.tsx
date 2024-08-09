import React from 'react';
import { Link } from 'react-router-dom';
import useCounselorStore from '../../stores/counselorStore';

const CounselorList: React.FC = () => {
  const { counselors} = useCounselorStore();


  return (
    <div>
      {counselors.map((counselor) => (
        <Link to={`/counselor/${counselor.idx}`} key={counselor.idx}>
          <div>
            <h3>{counselor.name}</h3>
            <p>전화번호: {counselor.tel}</p>
            <p>프로필이미지: {counselor.profile}</p>
            <p>소속: {counselor.organizationName}</p>
            <p>소개: {counselor.intro}</p>
            <p>자격인증여부: {counselor.IsAuth}</p>
            <p>리뷰 수: {counselor.reviewCount}</p>
            <p>평점: {counselor.reviewAverage}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CounselorList;