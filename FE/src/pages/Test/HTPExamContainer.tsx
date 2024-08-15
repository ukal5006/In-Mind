import React, { useEffect, useState, useRef } from 'react';
import { useHTPExamStore } from '../../stores/htpExamStore';
import axios from 'axios';
import useChildStore from '../../stores/childStore';
import userStore from '../../stores/userStore';
import AWS from 'aws-sdk';

const HTPExamContainer = (): JSX.Element => {
    const { children, selectedChild, background, setChildren, setSelectedChild, setImageUrl, setBackground } =
        useHTPExamStore();

    const [houseFile, setHouseFile] = useState<File | null>(null);
    const [treeFile, setTreeFile] = useState<File | null>(null);
    const [personFile, setPersonFile] = useState<File | null>(null);

    const [imageSrcH, setImageSrcH] = useState<string | null>(null);
    const [imageSrcT, setImageSrcT] = useState<string | null>(null);
    const [imageSrcP, setImageSrcP] = useState<string | null>(null);

    const inputRefH = useRef<HTMLInputElement>(null);
    const inputRefT = useRef<HTMLInputElement>(null);
    const inputRefP = useRef<HTMLInputElement>(null);

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

    const handleFileChange =
        (
            fileSetter: React.Dispatch<React.SetStateAction<File | null>>,
            imageSetter: React.Dispatch<React.SetStateAction<string | null>>
        ) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files ? e.target.files[0] : null;
            const fileExt = file?.name.split('.').pop() || '';

            if (file && ['jpeg', 'png', 'jpg', 'JPG', 'PNG', 'JPEG'].includes(fileExt)) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    imageSetter(reader.result as string);
                    fileSetter(file);
                };
            } else {
                alert('jpg, png, jpg 파일만 업로드가 가능합니다.');
            }
        };

    const uploadS3 = async (file: File): Promise<string> => {
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
        if (!selectedChild || !houseFile || !treeFile || !personFile || !background) {
            alert('모든 필드를 입력해주세요.');
            return;
        }

        try {
            const houseImageUrl = await uploadS3(houseFile);
            const treeImageUrl = await uploadS3(treeFile);
            const personImageUrl = await uploadS3(personFile);

            setImageUrl(houseImageUrl);
            console.log('Uploaded Image URLs:', houseImageUrl, treeImageUrl, personImageUrl);

            alert('검사가 시작되었습니다.');
            await axios
                .post(
                    'https://i11b301.p.ssafy.io/api/reports/start',
                    {
                        childIdx: selectedChild.childIdx,
                        houseImage: houseImageUrl,
                        treeImage: treeImageUrl,
                        personImage: personImageUrl,
                        background: background,
                        drawingFlow: '1,2,3,4,5,6,7',
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
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
                <label>집 그림 업로드:</label>
                <input
                    hidden
                    accept="image/*"
                    type="file"
                    ref={inputRefH}
                    onChange={handleFileChange(setHouseFile, setImageSrcH)}
                />
                <button onClick={() => inputRefH.current?.click()}>이미지 선택</button>
                {imageSrcH && <img src={imageSrcH} alt="uploaded" />}
            </div>

            <div>
                <label>나무 그림 업로드:</label>
                <input
                    hidden
                    accept="image/*"
                    type="file"
                    ref={inputRefT}
                    onChange={handleFileChange(setTreeFile, setImageSrcT)}
                />
                <button onClick={() => inputRefT.current?.click()}>이미지 선택</button>
                {imageSrcT && <img src={imageSrcT} alt="uploaded" />}
            </div>

            <div>
                <label>사람 그림 업로드:</label>
                <input
                    hidden
                    accept="image/*"
                    type="file"
                    ref={inputRefP}
                    onChange={handleFileChange(setPersonFile, setImageSrcP)}
                />
                <button onClick={() => inputRefP.current?.click()}>이미지 선택</button>
                {imageSrcP && <img src={imageSrcP} alt="uploaded" />}
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
