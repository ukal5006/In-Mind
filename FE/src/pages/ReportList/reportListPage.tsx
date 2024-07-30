import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useReportStore } from '../../stores/reportListStore';

const ReportListItem = ({ reportCreatedAt, reportResult, index }: { reportCreatedAt: string; reportResult: string; index: number }): JSX.Element => {
  return (
    <div className="border p-4 mb-4 rounded shadow">
      <h3 className="text-lg font-semibold">검사 #{index + 1}</h3>
      <p>검사 일시: {new Date(reportCreatedAt).toLocaleString()}</p>
      <p>검사 결과: {reportResult}</p>
      <Link
        to={`/report/${index}`}
        className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        결과 보러가기
      </Link>
    </div>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }: { currentPage: number; totalPages: number; onPageChange: (page: number) => void }): JSX.Element => {
  return (
    <div className="flex justify-center mt-4">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`mx-1 px-3 py-1 rounded ${
            currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

const ReportListPage = (): JSX.Element => {
  const { reports, currentPage, totalPages, isLoading, error, fetchReports, setCurrentPage } = useReportStore();

  useEffect(() => {
    fetchReports('userId'); // Replace with actual user ID
  }, [fetchReports]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const startIndex = (currentPage - 1) * 5;
  const endIndex = startIndex + 5;
  const currentReports = reports.slice(startIndex, endIndex);

  return (
    <div className="container mx-auto px-4 py-8">
      {reports.length === 0 ? (
        <div>
          <p>검사 이력이 없습니다.</p>
          <Link to="/test" className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            검사하러 가기
          </Link>
        </div>
      ) : (
        <>
          {currentReports.map((report, index) => (
            <ReportListItem
              key={startIndex + index}
              reportCreatedAt={report.reportCreatedAt}
              reportResult={report.reportResult}
              index={startIndex + index}
            />
          ))}
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </>
      )}
    </div>
  );
};

export default ReportListPage;