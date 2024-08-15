import React, { useState } from 'react';
import Btn from '../../components/Btn';
import useChildStore from '../../stores/childStore';
import userStore from '../../stores/userStore';
import styled from'styled-components';

const FormContainer = styled.div`
    max-width: 500px; /* 폼 최대 너비 설정 */
    margin: 0 auto; /* 중앙 정렬 */
    padding: 20px; /* 패딩 추가 */
    background-color: #f9f9f9; /* 배경색 설정 */
    border-radius: 12px; /* 둥근 모서리 */
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* 부드러운 그림자 */
`;


const FormGroup = styled.div`
    display: flex; /* Flexbox 사용 */
    align-items: center; /* 수직 중앙 정렬 */
    margin-bottom: 20px; /* 각 입력 항목 사이의 여백 */
`;

const Label = styled.label`
    flex: 0 0 100px; /* 라벨의 너비를 고정 */
    margin-right: 10px; /* 라벨과 입력 필드 사이의 여백 */
    font-weight: bold; /* 라벨 글자 굵게 */
    color: #333; /* 글자 색상 */
`;

const Input = styled.input`
    flex: 1; /* 남은 공간을 모두 차지 */
    padding: 10px; /* 내부 여백 */
    border: 1px solid #ccc; /* 테두리 색상 */
    border-radius: 8px; /* 둥근 모서리 */
    font-size: 16px; /* 글자 크기 */
    transition: border-color 0.3s; /* 테두리 색상 변화 효과 */

    &:focus {
        border-color: #007bff; /* 포커스 시 테두리 색상 변화 */
        outline: none; /* 기본 아웃라인 제거 */
    }
`;

const ErrorMessage = styled.div`
    color: red; /* 오류 메시지 색상 */
    margin-top: 5px; /* 위 여백 */
`;

const Button = styled.button`
    background-color: #007bff; /* 버튼 배경색 */
    color: white; /* 버튼 글자색 */
    border: none; /* 테두리 없애기 */
    border-radius: 8px; /* 둥근 버튼 */
    padding: 12px 20px; /* 버튼 패딩 */
    font-size: 16px; /* 버튼 글자 크기 */
    cursor: pointer; /* 포인터 커서 */
    transition: background-color 0.3s; /* 배경색 변화 효과 */
    margin-right: 10px; /* 오른쪽 여백 추가 */
    
    &:hover {
        background-color: #0056b3; /* 호버 시 색상 변화 */
    }

    &:last-child {
        margin-right: 0; /* 마지막 버튼의 오른쪽 여백 제거 */
    }
`;


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
    const [isOpen, setIsOpen] = useState<boolean>(true);

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
        } else if (name === 'childName') {
            if (value.length <= 16) {
                setChildInfo((prevInfo) => ({
                    ...prevInfo,
                    [name]: value,
                }));
            }
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

        const inputDate = new Date(year, month - 1, day);
        const today = new Date();
        if (inputDate > today) return false;

        return true;
    };

    const closeModal = () => {
        setIsOpen(false);
        onClose();
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        if (!childInfo.childName.trim()) {
            setError('이름을 입력해주세요.');
            return;
        }

        if (childInfo.childName.length > 16) {
            setError('이름은 16자를 초과할 수 없습니다.');
            return;
        }

        if (!isValidDate(childInfo.childBirth)) {
            setError('생년월일은 1900년 1월 1일부터 오늘까지의 날짜만 입력 가능합니다. (YYYY-MM-DD 형식)');
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
            // 성공 후 추가 작업
            closeModal();
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

    if (!isOpen) {
        return <></>;
    }

    return (
        <FormContainer>
            <form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="childName">이름</Label>
                    <Input
                        type="text"
                        id="childName"
                        name="childName"
                        value={childInfo.childName}
                        onChange={handleInputChange}
                        maxLength={16}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="childBirth">생년월일</Label>
                    <Input
                        type="text"
                        id="childBirth"
                        name="childBirth"
                        value={childInfo.childBirth}
                        onChange={handleInputChange}
                        placeholder="YYYY-MM-DD"
                        maxLength={10}
                        required
                    />
                </FormGroup>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <Button type="submit">{type === 'create' ? '아이 등록' : '아이 정보 수정'}</Button>
                <Button onClick={closeModal}>닫기</Button>
            </form>
        </FormContainer>
    );
};

export default ChildInfoEdit;