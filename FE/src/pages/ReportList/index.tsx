import React from 'react';
import ReportListPage from './reportListPage';

const ReportList = (): JSX.Element => {
  return (
    <div className="report-list-container">
      <header>
        <h1>검사 이력 목록</h1>
      </header>
      <main>
        <ReportListPage />
      </main>
      <footer>
        <p>© 2024 검사 이력 관리 시스템</p>
      </footer>
    </div>
  );
};

export default ReportList;