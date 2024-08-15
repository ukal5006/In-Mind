import React from 'react';
import useCounselorStore from '../../stores/counselorStore';

const FilterOptions: React.FC = () => {
  const { setFilterOption } = useCounselorStore();

  const {counselors, fetchCounselors} = useCounselorStore()
    const showAllCounselor = () => {fetchCounselors(null)}

    const topAverageCounselor = () => {
        const sortedCounselors = [...counselors].sort((a, b) => {
          // a와 b의 reviewAverage가 숫자인지 확인
          const aAvg = typeof a.reviewAverage === 'number' ? a.reviewAverage : 0;
          const bAvg = typeof b.reviewAverage === 'number' ? b.reviewAverage : 0;
          
          return aAvg - bAvg;
        });
      
        console.log(sortedCounselors);
        return sortedCounselors;
      }

    const sortedAverage = () => {
        topAverageCounselor()
    }

    const topReviewCountCounselor = () => {
      const sortedCounselors = [...counselors].sort((a, b) => {
        const aCnt = typeof a.reviewCount === 'number' ? a.reviewCount : 0;
        const bCnt = typeof b.reviewCount === 'number' ? b.reviewCount : 0;
        
        return aCnt - bCnt;
      });
    
      console.log(sortedCounselors);
      return sortedCounselors;
    }

    const sortedCount = () => {
      topReviewCountCounselor()
  }


  return (
    <div>
      <button onClick={sortedCount}>리뷰 많은 순</button>
      <button onClick={sortedAverage}>평점순</button>
      <button onClick={() => setFilterOption('distance')}>거리순</button>
    </div>
  );
};

export default FilterOptions;