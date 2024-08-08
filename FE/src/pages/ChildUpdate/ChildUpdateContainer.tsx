import React, { useState } from 'react';
import axios from 'axios';
import Btn from '../../components/Btn';
import { CHILDDEFAULT } from '../../apis/childApi';

interface ChildInfo {
  userIdx: number;
  childName: string;
  childBirth: string;
  childInfoUserBackground: string;
}

interface ChildUpdateProps {
  type: 'create' | 'update';
}

interface UpdateChildProps {
  childId: number;
}

const ChildInfoEdit: React.FC<ChildUpdateProps> = ({ type }): JSX.Element => {
  const [childInfo, setChildInfo] = useState<ChildInfo>({
    userIdx: 1, // 초기값 설정, 실제 사용 시 적절한 값으로 초기화 필요
    childName: '',
    childBirth: '',
    childInfoUserBackground: '',
  });
  const [error, setError] = useState<string>('');

  const formatDate = (input: string): string => {
    const numbers = input.replace(/\D/g, '');
    if (numbers.length <= 4) {
      return numbers;
    } else if (numbers.length <= 6) {
      return `${numbers.slice(0, 4)}-${numbers.slice(4)}`;
    } else {
      return `${numbers.slice(0, 4)}-${numbers.slice(4, 6)}-${numbers.slice(
        6,
        8
      )}`;
    }
  };

  const registerUpdateChild = async (props: UpdateChildProps) => {
    if (type === "create") {
      try{
        await axios.post(CHILDDEFAULT,
          {
            userIdx:childInfo.userIdx,
            childName:childInfo.childName,
            childBirth:childInfo.childBirth
          }, {
            headers : {
              'accept': '*/*',
              'Content-Type': 'application/json;charset=UTF-8'
            }
          }
        );
        console.log("자녀정보 생성 성공");
        alert('자녀 정보 생성')
      } catch (error) {
        console.log('자녀정보 생성 실패', error);
        alert('자녀 정보 생성 실패')
      }
    } else if (type === 'update') {
      try {
        await axios.put(`${CHILDDEFAULT}/${props.childId}`,
          {
            childName: childInfo.childName,
            childBirth: childInfo.childBirth
          }, {
            headers: {
              'accept': '*/*',
              'Content-Type': 'application/json;charset=UTF-8'
            }
          }
        );
        console.log("자녀정보 수정 성공");
        alert('자녀 정보 수정');
      } catch (error) {
        console.log('자녀정보 수정 실패', error);
        alert('자녀 정보 수정 실패');
      }
    }
  };


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
      if (type === 'create') {
        await registerUpdateChild({ childId: 0 }); // 생성 시 임의의 childId 사용
      } else if (type === 'update') {
        // 여기서 실제 childId를 전달해야 합니다. 
        // 이 값은 props로 받아와야 할 수도 있습니다.
        await registerUpdateChild({ childId:1 });
      }
      console.log('자녀 정보 처리 성공');
      // 성공 후 추가 작업 (예: 폼 초기화, 페이지 이동 등)
    } catch (error) {
      console.error('API 요청 오류:', error);
      setError('정보 저장 중 오류가 발생했습니다. 다시 시도해 주세요.');
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
        {/* 히스토리는 안 받는 듯? 일단 주석처리 */}
        {/* <div>
          <label htmlFor="childInfoUserBackground">히스토리</label>
          <textarea
            id="childInfoUserBackground"
            name="childInfoUserBackground"
            value={childInfo.childInfoUserBackground}
            onChange={handleInputChange}
          />
        </div> */}
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <Btn type="submit">
          {type === 'create' ? '아이 등록' : '아이 정보 수정'}
        </Btn>
      </form>
    </div>
  );
};

export default ChildInfoEdit;
