import React from 'react';
import useCounselorStore from '../../stores/counselorStore';
import './Calendar.css';

const SearchBar: React.FC = () => {
    const { searchType, searchTerm, setSearchType, setSearchTerm, fetchCounselors } = useCounselorStore();

    const handleSearchTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchType(e.target.value as 'name' | 'organization');
    };

    const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetchCounselors(searchTerm);
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <select value={searchType} onChange={handleSearchTypeChange}>
                    <option value="name">상담사 이름</option>
                    <option value="organization">상담기관명</option>
                </select>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                    placeholder={`${searchType === 'name' ? '상담사 이름' : '상담기관명'}으로 검색`}
                />
                <button type="submit">검색</button>
            </form>
        </>
    );
};

export default SearchBar;
