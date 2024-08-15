import React from 'react';
import CounselorSearchContainer from './CounselorSearch';
import SearchBar from './SearchBar';
import FilterOptions from './FilterOptions';
import CounselorList from './CounselorList';

const CounselorSearch: React.FC = () => {
    return (
        <div className="counselor-search-page">
            <CounselorSearchContainer>
                <SearchBar />
                {/* <FilterOptions /> */}
                <CounselorList />
            </CounselorSearchContainer>
        </div>
    );
};

export default CounselorSearch;
