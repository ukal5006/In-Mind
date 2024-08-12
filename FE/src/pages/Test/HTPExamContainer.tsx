import React, { useEffect, useState } from 'react';
import { useHTPExamStore } from '../../stores/htpExamStore';
import axios from 'axios';
import useChildStore from '../../stores/childStore';
import userStore from '../../stores/userStore';

const HTPExamContainer = (): JSX.Element => {
    const {
        children,
        selectedChild,
        imageUrl,
        drawingOrder,
        background,
        setChildren,
        setSelectedChild,
        setImageUrl,
        setDrawingOrder,
        setBackground,
    } = useHTPExamStore();

    const [file, setFile] = useState<File | null>(null);

    const childStore = useChildStore();
    const token = userStore().token;
    const userInfo = userStore().userInfo;
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // userStore에서 userId가져오고
        // userId로 api 요청해서 다시 자녀목록 받아오는 방법,

        // childStore에서 자녀 받아오기

        const childSet = async () => {
            if (userInfo && token) {
                try {
                    await childStore.readAllChildren(userInfo.userIdx, token);
                    setChildren(childStore.children);
                } catch (error) {
                    console.error('Failed to fetch children:', error);
                }
            }
        };
        try {
            childSet();
        } catch (error) {
            console.log('failed to load children', error);
        } finally {
            setIsLoading(false);
        }
        console.log(children);
    }, [setChildren]);
    if (isLoading) return <div>...is Loading</div>;

    const handleChildSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const child = children.find((c) => c.childIdx === parseInt(e.target.value));
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
                    Authorization: `Bearer ${token}`,
                    accept: '*/*',
                    'Content-Type': 'application/json;charset=UTF-8',
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
            //현재 플로우를 제공받는게 1번부터 7번까지 모두 입력되는걸 전제로 하지만, 수정필요할듯 6개까지만 쓰거나 숫자 7이 포함되어 있을 경우 개수 검사를 안 하는 식으로
            alert('모든 필드를 입력해주세요.');
            return; // 플로우 입력을 체크박스를 통한 순서입력으로 바꿀지 고민중, 추후에 개발진행
        }

        try {
            const uploadedImageUrl = await uploadImage(file);
            setImageUrl(uploadedImageUrl);

            await axios.post('/api/htp-exam', {
                childId: selectedChild.childIdx,
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
                    {children.length > 0 ? (
                        children.map((child) => (
                            <option key={child.childIdx} value={child.childIdx}>
                                {child.childName}
                            </option>
                        ))
                    ) : (
                        <option value="" disabled>
                            자녀 정보가 없습니다
                        </option>
                    )}
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
                <textarea value={background} onChange={(e) => setBackground(e.target.value)} />
            </div>

            <button onClick={handleSubmit}>검사 시작</button>
            {/* 검사 시작 버튼 누르고 라우팅 필요, 검사이력 페이지나, 예약페이지로 이동이라던지 이동할 페이지 만들면 이동해야함 */}
            {/* 검사가 끝나면 reportListStore에 지금 검사한 결과를 삽입하여 최신화해야할지도. */}
        </div>
    );
};

export default HTPExamContainer;
