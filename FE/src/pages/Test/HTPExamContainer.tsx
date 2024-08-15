import React, { useEffect, useState, useRef } from 'react';
import { useHTPExamStore } from '../../stores/htpExamStore';
import axios from 'axios';
import useChildStore from '../../stores/childStore';
import userStore from '../../stores/userStore';
import AWS from 'aws-sdk';
import styled from 'styled-components';
import Text from '../../components/Text';
import { colors } from '../../theme/colors';
import Loader from '../../components/Loader';
import { useNavigate } from 'react-router-dom';
import WarnModal from './WarnModal';
import { IoClose } from 'react-icons/io5';
import Glass from '../../components/Glass';

const TestContainer = styled.div`
    margin-top: 20px;
    width: 500px;
    padding: 20px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3); /* 그림자 진하게 */
    border-radius: 10px;
    ${Glass}
`;

const TestTitle = styled(Text)`
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 10px;
`;

const ChildContainer = styled.div`
    margin: 20px 0;
    & > label {
        font-size: 16px;
        font-weight: bold;
        margin-right: 10px;
    }

    & > select {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
        cursor: pointer;
        transition: border-color 0.3s;
    }

    & > select:focus {
        border-color: ${colors.okGreen};
        outline: none;
    }

    & > option {
        padding: 10px;
        font-weight: 700;
    }
`;

const ImgContainer = styled.div`
    margin: 20px 0;
    display: flex;
    align-items: center;

    & > label {
        font-size: 16px;
        font-weight: bold;
        margin-right: 10px;
    }

    & > button {
        padding: 10px 10px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s, transform 0.2s;
        margin-right: 10px;
    }

    & > button:hover {
        background-color: #0056b3;
        transform: scale(1.05);
    }

    & > span {
        font-size: 14px;
        color: #555;
    }
`;

const BackgroundContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px 0;
    & > label {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 10px;
        display: block; /* label을 블록으로 설정하여 textarea와 간격을 주기 */
    }

    & > textarea {
        width: 400px;
        height: 150px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
        resize: vertical; /* 세로 방향으로만 크기 조절 가능 */
        transition: border-color 0.3s;
        resize: none;
        position: relative;
    }

    & > textarea:focus {
        border-color: ${colors.okGreen};
        outline: none;
    }

    & > span {
        position: relative;
        bottom: 20px;
        left: 170px;
        font-size: 13px;
        color: ${colors.darkGray};
    }
`;

const Submit = styled.div`
    margin-top: -10px;
    & > button {
        padding: 10px 20px;
        background-color: #28a745;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s, transform 0.2s;
    }
    & > button:hover {
        background-color: #218838;
        transform: scale(1.05);
    }
`;

const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LoaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
    align-items: center;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3); /* 그림자 진하게 */
    border-radius: 10px;
    padding: 10px 30px;
    height: 300px;
    justify-content: space-evenly;

    & > div {
        font-size: 16px;
        font-weight: 700;
    }
`;

const ResultContainer = styled.div`
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3); /* 그림자 진하게 */
    border-radius: 10px;
    background-color: white;
    display: flex;
    flex-direction: column;
    width: 500px;
    padding: 10px;
    align-items: center;

    & > ${Text} {
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 10px;
    }
`;

const BtnContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    & > button {
        width: 150px;
        margin-top: 10px;
        padding: 10px 20px;
        background-color: #28a745;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s, transform 0.2s;
    }
    & > button:hover {
        background-color: #218838;
        transform: scale(1.05);
    }
`;

const ResultWrapper = styled.div`
    font-size: 17px;
    line-height: 1.5; /* 줄 간격을 늘려서 가독성 향상 */
    padding: 20px; /* 여백 추가 */
    background-color: #f9f9f9; /* 배경색으로 대비를 높임 */
    border: 1px solid #ddd; /* 경계선 추가 */
    border-radius: 8px; /* 모서리 둥글게 */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
    margin: 20px 0; /* 상하 여백 추가 */
`;

const WarnBtn = styled.div`
    position: absolute;
    top: 30px;
    right: 10px;
    font-size: 20px;
    cursor: pointer;
`;

const ModalWrapper = styled.div`
    position: relative;
`;

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

    const [textSize, setTextSize] = useState(0);

    const [result, setResult] = useState('');
    const [isModal, setIsModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isResult, setIsResult] = useState(false);

    const [warn, setWarn] = useState(true);

    const navigate = useNavigate();

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
            setLoading(false);
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
        const ACCESS_KEY_ID = 'AKIAZ3MGNEZEQHHBEFD4';
        const SECRET_ACCESS_KEY_ID = 'PZiiiPJTOyvI9yfYZPta0acFHWWCSimkpHUWNhUk';

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

        setLoading(true); // 로딩 시작
        setIsModal(true);

        try {
            const houseImageUrl = await uploadS3(houseFile);
            const treeImageUrl = await uploadS3(treeFile);
            const personImageUrl = await uploadS3(personFile);

            setImageUrl(houseImageUrl);
            console.log('Uploaded Image URLs:', houseImageUrl, treeImageUrl, personImageUrl);

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
                .then((response) => {
                    console.log(response);
                    setResult(response.data.reportResult);
                    setIsResult(true);
                });
        } catch (error: any) {
            console.error('Failed to start HTP exam:', error);
            if (error?.response?.status) {
                alert('업로드한 사진을 확인해주세요.');
            } else {
                alert('서버에러.');
            }
            setIsModal(false);
        } finally {
            setLoading(false); // 로딩 종료
        }
    };

    return (
        <>
            <TestContainer>
                <TestTitle>HTP 검사</TestTitle>
                <ChildContainer>
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
                </ChildContainer>

                <ImgContainer>
                    <label>집 그림 업로드:</label>
                    <input
                        hidden
                        accept="image/*"
                        type="file"
                        ref={inputRefH}
                        onChange={handleFileChange(setHouseFile, setImageSrcH)}
                    />
                    <button onClick={() => inputRefH.current?.click()}>이미지 선택</button>
                    {houseFile && <span>{houseFile.name}</span>} {/* 파일명 표시 */}
                </ImgContainer>

                <ImgContainer>
                    <label>나무 그림 업로드:</label>
                    <input
                        hidden
                        accept="image/*"
                        type="file"
                        ref={inputRefT}
                        onChange={handleFileChange(setTreeFile, setImageSrcT)}
                    />
                    <button onClick={() => inputRefT.current?.click()}>이미지 선택</button>
                    {treeFile && <span>{treeFile.name}</span>} {/* 파일명 표시 */}
                </ImgContainer>

                <ImgContainer>
                    <label>사람 그림 업로드: </label>
                    <input
                        hidden
                        accept="image/*"
                        type="file"
                        ref={inputRefP}
                        onChange={handleFileChange(setPersonFile, setImageSrcP)}
                    />
                    <button onClick={() => inputRefP.current?.click()}>이미지 선택</button>
                    {personFile && <span>{personFile.name}</span>} {/* 파일명 표시 */}
                </ImgContainer>

                <BackgroundContainer>
                    <label>검사 배경 및 이유</label>
                    <textarea
                        maxLength={200}
                        value={background}
                        onChange={(e) => {
                            setBackground(e.target.value);
                            setTextSize(e.target.value.length);
                        }}
                    />
                    <span>{textSize} / 200</span>
                </BackgroundContainer>
                <Submit>
                    <button onClick={handleSubmit}>검사 시작</button>
                </Submit>
            </TestContainer>
            {isModal && (
                <ModalBackground>
                    {loading && (
                        <LoaderContainer>
                            <Text>AI가 분석중입니다!</Text>
                            <Text> 곧 결과를 알려드릴게요!</Text>
                            <Loader />
                        </LoaderContainer>
                    )}
                    {isResult && (
                        <ResultContainer>
                            <Text>검사 결과</Text>
                            <ResultWrapper>{result}</ResultWrapper>
                            <BtnContainer>
                                <button onClick={() => navigate('/user/counselorSearch')}>상담 예약하기</button>
                                <button onClick={() => navigate('/user')}>홈으로 돌아가기</button>
                            </BtnContainer>
                        </ResultContainer>
                    )}
                </ModalBackground>
            )}
            {warn && (
                <ModalBackground>
                    <ModalWrapper>
                        <WarnModal />
                        <WarnBtn onClick={() => setWarn(false)}>
                            <IoClose />
                        </WarnBtn>
                    </ModalWrapper>
                </ModalBackground>
            )}
        </>
    );
};

export default HTPExamContainer;
