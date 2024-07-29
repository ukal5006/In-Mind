import React from 'react';
import CounselorSearch from './CounselorSearch';
import SearchBar from './SearchBar';
import FilterOptions from './FilterOptions';
import CounselorList from './CounselorList';
import Pagination from './Pagination';

const CounselorSearchPage: React.FC = () => {
  return (
    <div className="counselor-search-page">
      <h1>상담사 검색</h1>
      <CounselorSearch>
        <SearchBar />
        <FilterOptions />
        <CounselorList />
        <Pagination />
      </CounselorSearch>
    </div>
  );
};

export default CounselorSearchPage;