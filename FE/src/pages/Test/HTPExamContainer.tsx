import React, { useEffect, useState, useRef } from 'react';
import { useHTPExamStore } from '../../stores/htpExamStore';
import axios from 'axios';
import useChildStore from '../../stores/childStore';
import userStore from '../../stores/userStore';
import AWS from 'aws-sdk';

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
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement[]>([]);

    const [result, setResult] = useState<string>('');

    const childStore = useChildStore();
    const { userInfo, token } = userStore();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
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
    }, [userInfo]);

    const handleChildSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const child = children.find((c) => c.childIdx === parseInt(e.target.value));
        if (child) setSelectedChild(child);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        const fileExt = file?.name.split('.').pop() || '';

        if (file && ['jpeg', 'png', 'jpg', 'JPG', 'PNG', 'JPEG'].includes(fileExt)) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setImageSrc(reader.result as string);
                setFile(file);
            };
        } else {
            alert('jpg, png, jpg 파일만 업로드가 가능합니다.');
        }
    };

    const handleDrawingOrderChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newOrder = [...drawingOrder];
        newOrder[index] = parseInt(e.target.value);
        setDrawingOrder(newOrder);
    };

    const uploadS3 = async (): Promise<string> => {
        const REGION = 'ap-northeast-2';
        const ACCESS_KEY_ID = 'AKIAZ3MGNEZEQYW7NK73';
        const SECRET_ACCESS_KEY_ID = 'vk21BsRBSgjmYpye4vmgogiAxd15AUu7eXSlZsbo';

        AWS.config.update({
            region: REGION,
            accessKeyId: ACCESS_KEY_ID,
            secretAccessKey: SECRET_ACCESS_KEY_ID,
        });

        if (!file) throw new Error('No file to upload');

        const upload = new AWS.S3.ManagedUpload({
            params: {
                ACL: 'public-read',
                Bucket: 'in-mind-image',
                Key: `upload/${file.name}`,
                Body: file,
            },
        });

        const data = await upload.promise();
        return data.Location;
    };

    const handleSubmit = async () => {
        if (!selectedChild || !file || drawingOrder.length !== 7 || !background) {
            alert('모든 필드를 입력해주세요.');
            return;
        }

        try {
            const uploadedImageUrl = await uploadS3();
            setImageUrl(uploadedImageUrl);
            console.log('Uploaded Image URL:', uploadedImageUrl);
            alert('검사가 시작되었습니다.');
            await axios
                .post(
                    'https://i11b301.p.ssafy.io/api/reports/start',
                    {
                        childIdx: selectedChild.childIdx,
                        houseImage: uploadedImageUrl,
                        treeImage: uploadedImageUrl,
                        personImage: uploadedImageUrl,
                        background: background,
                        drawingFlow: drawingOrder.join(','),
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, // token 추가
                            accept: '*/*',
                            'Content-Type': 'application/json;charset=UTF-8',
                        },
                    }
                )
                .then((response) => console.log(response));
        } catch (error) {
            console.error('Failed to start HTP exam:', error);
            alert('검사 시작에 실패했습니다.');
        }
    };

    if (isLoading) return <div>...is Loading</div>;

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
                <input
                    hidden
                    accept="image/*"
                    multiple
                    type="file"
                    ref={(el) => (inputRef.current[0] = el!)}
                    onChange={handleFileChange}
                />
                <button onClick={() => inputRef.current[0]?.click()}>이미지 선택</button>
                {imageSrc && <img src={imageSrc} alt="uploaded" />}
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
        </div>
    );
};

export default HTPExamContainer;
