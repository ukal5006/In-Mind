import React from 'react';
import ChildInfoEdit from './ChildUpdateContainer';

export interface ChildUpdateProps {
    type: 'create' | 'update';
    childIdx?: number;
    onClose: () => void;
    onSuccess: () => void;
}

const ChildUpdate: React.FC<ChildUpdateProps> = ({ type, childIdx, onClose, onSuccess }): JSX.Element => {
    const handleSuccess = () => {
        onSuccess();
        onClose();
    };

    return (
        <div className="child-update-page">
            <header>{type === 'create' ? <h1>아이 등록</h1> : <h1>아이 정보 수정</h1>}</header>
            <main>
                <ChildInfoEdit type={type} childIdx={childIdx} onClose={handleSuccess} />
            </main>
        </div>
    );
};

export default ChildUpdate;
