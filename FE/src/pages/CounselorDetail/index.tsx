// index.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import CounselorDetailPage from './CounselorDetail';

const CounselorDetail: React.FC = (): JSX.Element => {
  const { userId } = useParams<{ userId: string }>();

  if (!userId) {
    return <div>Invalid user ID</div>;
  }

  return <CounselorDetailPage userId={userId} />;
};

export default CounselorDetail;