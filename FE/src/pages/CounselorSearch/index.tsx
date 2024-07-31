import React from 'react';
import CounselorSearchContainer from './CounselorSearch';
import SearchBar from './SearchBar';
import FilterOptions from './FilterOptions';
import CounselorList from './CounselorList';
import Pagination from './Pagination';

const CounselorSearch: React.FC = () => {
  return (
    <div className="counselor-search-page">
      <h1>상담사 검색</h1>
      <CounselorSearchContainer>
        <SearchBar />
        <FilterOptions />
        <CounselorList />
        <Pagination />
      </CounselorSearchContainer>
    </div>
  );
};

export default CounselorSearch;