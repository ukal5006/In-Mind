import React from 'react';
import ChildInfoEdit from './ChildUpdateContainer';

const ChildUpdate = (): JSX.Element => {
  return (
    <div className="child-update-page">
      <header>
        <h1>아이 정보 업데이트</h1>
      </header>
      <main>
        <ChildInfoEdit />
      </main>
      <footer>
        <p>© 2024 아이 정보 관리 시스템</p>
      </footer>
    </div>
  );
};

export default ChildUpdate;