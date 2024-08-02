import React, { useState } from 'react';
import axios from 'axios';
import Btn from '../../components/Btn';

interface ChildInfo {
  childInfoUserIdx: number;
  childInfoUserName: string;
  childInfoUserBirthDate: string;
  childInfoUserBackground: string;
}

const ChildInfoEdit = (): JSX.Element => {
  const [childInfo, setChildInfo] = useState<ChildInfo>({
    childInfoUserIdx: 0, // 초기값 설정, 실제 사용 시 적절한 값으로 초기화 필요
    childInfoUserName: '',
    childInfoUserBirthDate: '',
    childInfoUserBackground: ''
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
    if (name === 'childInfoUserBirthDate') {
      const formattedDate = formatDate(value);
      setChildInfo(prevInfo => ({
        ...prevInfo,
        [name]: formattedDate
      }));
    } else {
      setChildInfo(prevInfo => ({
        ...prevInfo,
        [name]: value
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

    if (!childInfo.childInfoUserName.trim()) {
      setError('이름을 입력해주세요.');
      return;
    }

    if (!isValidDate(childInfo.childInfoUserBirthDate)) {
      setError('올바른 생년월일을 입력해주세요. (YYYY-MM-DD 형식)');
      return;
    }

    try {
      const response = await axios.put(`/api/children/{childInfoUserIdx}`, childInfo);
      console.log('서버 응답:', response.data);
      // 성공 메시지 표시 또는 다음 단계로 진행
    } catch (error) {
      console.error('API 요청 오류:', error);
      setError('정보 저장 중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <div>
      <h2>아이 정보 수정</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="childInfoUserName">이름</label>
          <input
            type="text"
            id="childInfoUserName"
            name="childInfoUserName"
            value={childInfo.childInfoUserName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="childInfoUserBirthDate">생년월일</label>
          <input
            type="text"
            id="childInfoUserBirthDate"
            name="childInfoUserBirthDate"
            value={childInfo.childInfoUserBirthDate}
            onChange={handleInputChange}
            placeholder="YYYY-MM-DD"
            maxLength={10}
            required
          />
        </div>
        <div>
          <label htmlFor="childInfoUserBackground">히스토리</label>
          <textarea
            id="childInfoUserBackground"
            name="childInfoUserBackground"
            value={childInfo.childInfoUserBackground}
            onChange={handleInputChange}
          />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <Btn type="submit">정보 수정</Btn>
      </form>
    </div>
  );
};

export default ChildInfoEdit;