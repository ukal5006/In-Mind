import React, { useEffect, useState } from 'react';
import { useHTPExamStore } from '../../stores/htpExamStore';
import axios from 'axios';

const HTPExamContainer = (): JSX.Element => {
  const { 
    children, selectedChild, imageUrl, drawingOrder, background,
    setChildren, setSelectedChild, setImageUrl, setDrawingOrder, setBackground 
  } = useHTPExamStore();

  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const response = await axios.get('/api/children'); //자녀 목록 받아오는 api 주소 수정 필요
        setChildren(response.data);
      } catch (error) {
        console.error('Failed to fetch children:', error);
      }
    };

    fetchChildren();
  }, [setChildren]);

  const handleChildSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const child = children.find(c => c.id === parseInt(e.target.value));
    if (child) setSelectedChild(child);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrawingOrderChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newOrder = [...drawingOrder];
    newOrder[index] = parseInt(e.target.value);
    setDrawingOrder(newOrder);
  };

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('/api/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.imageUrl;
    } catch (error) {
      console.error('Failed to upload image:', error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    if (!selectedChild || !file || drawingOrder.length !== 7 || !background) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    try {
      const uploadedImageUrl = await uploadImage(file);
      setImageUrl(uploadedImageUrl);

      await axios.post('/api/htp-exam', {
        childId: selectedChild.id,
        imageUrl: uploadedImageUrl,
        drawingOrder,
        background,
      });
      alert('검사가 시작되었습니다.');
    } catch (error) {
      console.error('Failed to start HTP exam:', error);
      alert('검사 시작에 실패했습니다.');
    }
  };

  return (
    <div className="htp-exam">
      <h1>HTP 검사</h1>
      
      <div>
        <label>자녀 선택:</label>
        <select onChange={handleChildSelect}>
          <option value="">선택하세요</option>
          {children.map(child => (
            <option key={child.id} value={child.id}>{child.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label>나무 그림 업로드:</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>

      <div>
        <p>그림을 그리는 순서는 어땠나요? 순서대로 번호를 입력해주세요.</p>
        <p>1)뿌리 2)줄기 3)가지 4)수관 5)열매 6)지면 7)알 수 없음</p>
        {['뿌리', '줄기', '가지', '수관', '열매', '지면', '알 수 없음'].map((item, index) => (
          <input
            key={index}
            type="number"
            min="1"
            max="7"
            onChange={(e) => handleDrawingOrderChange(e, index)}
          />
        ))}
      </div>

      <div>
        <label>검사 배경 및 이유:</label>
        <textarea 
          value={background}
          onChange={(e) => setBackground(e.target.value)}
        />
      </div>

      <button onClick={handleSubmit}>검사 시작</button>
    </div>
  );
};

export default HTPExamContainer;