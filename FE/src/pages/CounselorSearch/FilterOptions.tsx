import React from 'react';
import useCounselorStore from '../../stores/counselorStore';

const FilterOptions: React.FC = () => {
  const { setFilterOption } = useCounselorStore();

  return (
    <div>
      <button onClick={() => setFilterOption('review')}>리뷰 많은 순</button>
      <button onClick={() => setFilterOption('rating')}>평점순</button>
      <button onClick={() => setFilterOption('distance')}>거리순</button>
    </div>
  );
};

export default FilterOptions;