// index.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import CounselorDetail from './CounselorDetail';

const CounselorDetailPage: React.FC = (): JSX.Element => {
  const { userId } = useParams<{ userId: string }>();

  if (!userId) {
    return <div>Invalid user ID</div>;
  }

  return <CounselorDetail userId={userId} />;
};

export default CounselorDetailPage;