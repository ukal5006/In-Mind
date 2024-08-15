import React, { useEffect, ReactNode } from 'react';
import useCounselorStore from '../../stores/counselorStore';

interface CounselorSearchProps {
  children: ReactNode;
}

const CounselorSearchContainer: React.FC<CounselorSearchProps> = ({ children }) => {
  const { fetchCounselors, isLoading, error } = useCounselorStore();
  useEffect(() => {
    fetchCounselors(null);
  }, [fetchCounselors]);
  
  

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="counselor-search">
      {children}
    </div>
  );
};

export default CounselorSearchContainer;