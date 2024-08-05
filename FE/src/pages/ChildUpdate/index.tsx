import ChildInfoEdit from './ChildUpdateContainer';

interface ChildUpdateProps {
  type: 'create' | 'update';
}

const ChildUpdate: React.FC<ChildUpdateProps> = ({ type }): JSX.Element => {
  return (
    <div className="child-update-page">
      <header>
        {type === 'create' ? <h1>아이 등록</h1> : <h1>아이 정보 수정</h1>}
      </header>
      <main>
        <ChildInfoEdit type={type} />
      </main>
    </div>
  );
};

export default ChildUpdate;
