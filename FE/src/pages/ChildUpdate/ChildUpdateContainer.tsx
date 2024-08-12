import React, { useState } from 'react';
import Btn from '../../components/Btn';
import useChildStore from '../../stores/childStore';
import userStore from '../../stores/userStore';

interface ChildInfo {
    childName: string;
    childBirth: string;
}

interface ChildUpdateProps {
    type: 'create' | 'update';
    childIdx?: number;
    onClose: () => void;
}

const ChildInfoEdit: React.FC<ChildUpdateProps> = ({ type, childIdx, onClose }): JSX.Element => {
    const { addChild, updateChild } = useChildStore();
    const { userInfo, token } = userStore((state) => state);
    const [childInfo, setChildInfo] = useState<ChildInfo>({
        childName: '',
        childBirth: '',
    });
    const [error, setError] = useState<string>('');

    const formatDate = (input: string): string => {
        const numbers = input.replace(/\D/g, '');
        if (numbers.length <= 4) {
            return numbers;
        } else if (numbers.length <= 6) {
            return `${numbers.slice(0, 4)}-${numbers.slice(4)}`;
        } else {
            return `${numbers.slice(0, 4)}-${numbers.slice(4, 6)}-${numbers.slice(6, 8)}`;
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === 'childBirth') {
            const formattedDate = formatDate(value);
            setChildInfo((prevInfo) => ({
                ...prevInfo,
                [name]: formattedDate,
            }));
        } else {
            setChildInfo((prevInfo) => ({
                ...prevInfo,
                [name]: value,
            }));
        }
        setError('');
    };

    const isValidDate = (dateString: string): boolean => {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        if (!regex.test(dateString)) return false;

        const parts = dateString.split('-');
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10);
        const day = parseInt(parts[2], 10);

        if (year < 1900 || year > new Date().getFullYear()) return false;
        if (month < 1 || month > 12) return false;

        const lastDayOfMonth = new Date(year, month, 0).getDate();
        if (day < 1 || day > lastDayOfMonth) return false;

        return true;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        if (!childInfo.childName.trim()) {
            setError('이름을 입력해주세요.');
            return;
        }

        if (!isValidDate(childInfo.childBirth)) {
            setError('올바른 생년월일을 입력해주세요. (YYYY-MM-DD 형식)');
            return;
        }

        try {
            if (!userInfo) {
                throw new Error('사용자 정보를 찾을 수 없습니다.');
            }

            if (type === 'create' && token) {
                await addChild(userInfo.userIdx, childInfo, token);
                console.log('자녀정보 생성 성공');
                alert('자녀 정보 생성');
            } else if (type === 'update' && childIdx && token) {
                await updateChild(childIdx, childInfo, token);
                console.log('자녀정보 수정 성공');
                alert('자녀 정보 수정');
            }
            // 성공 후 추가 작업 (예: 폼 초기화, 페이지 이동 등)
        } catch (error) {
            console.error('API 요청 오류:', error);
            setError('정보 저장 중 오류가 발생했습니다. 다시 시도해 주세요.');
            if (type === 'create') {
                alert('자녀 정보 생성 실패');
            } else {
                alert('자녀 정보 수정 실패');
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="childName">이름</label>
                    <input
                        type="text"
                        id="childName"
                        name="childName"
                        value={childInfo.childName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="childBirth">생년월일</label>
                    <input
                        type="text"
                        id="childBirth"
                        name="childBirth"
                        value={childInfo.childBirth}
                        onChange={handleInputChange}
                        placeholder="YYYY-MM-DD"
                        maxLength={10}
                        required
                    />
                </div>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <Btn type="submit">{type === 'create' ? '아이 등록' : '아이 정보 수정'}</Btn>
            </form>
        </div>
    );
};

export default ChildInfoEdit;
