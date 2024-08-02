import React from 'react';
import useCounselorStore from '../../stores/counselorStore';

const Pagination: React.FC = () => {
  const { filteredCounselors, currentPage, setCurrentPage } = useCounselorStore();
  const counselorsPerPage = 5;
  const totalPages = Math.ceil(filteredCounselors.length / counselorsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul>
        {pageNumbers.map(number => (
          <li key={number}>
            <button onClick={() => setCurrentPage(number)} disabled={currentPage === number}>
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;