import React, { useEffect } from 'react';
import styled from 'styled-components';
import Container from '../../components/Container';
import { colors } from '../../theme/colors';
import Text from '../../components/Text';
import useReviewStore from '../../stores/reviewStore';
import userStore from '../../stores/userStore';

const CounselorReviewsContainer = styled(Container)`
    padding: 30px 20px;
    box-sizing: border-box;
    width: 100%;
    flex-direction: column;
    background-color: #f0f0f0;
    height: 100%;
    border-radius: 10px; // 전체 컴포넌트의 radius 설정
    overflow: hidden; // 내부 요소가 radius를 벗어나지 않도록 설정
    justify-content: flex-start;
`;

const ReviewHeader = styled.div`
    background-color: #f0f0f0;
    padding: 20px;
    margin-bottom: 20px;
`;

const ScoreContainer = styled.div`
    background-color: ${colors.lightGreen};
    padding: 10px 15px;
    border-radius: 8px;
    display: inline-block;
`;

const ReviewTitle = styled(Text)`
    font-size: 18px;
    font-weight: bold;
    color: ${colors.darkGreen};
    margin-bottom: 10px;
`;

const AverageScore = styled(Text)`
    font-size: 22px;
    font-weight: bold;
    color: ${colors.darkGreen};
`;

const ReviewCount = styled(Text)`
    font-size: 14px;
    color: ${colors.darkGreen};
`;

const ReviewListContainer = styled.div`
    overflow-y: auto;
    max-height: calc(100vh - 200px);
    width: 100%; // 전체 너비 사용
    padding: 0 20px; // 좌우 패딩 추가
    box-sizing: border-box;
`;

const ReviewList = styled.ul`
    width: 95%;
    list-style-type: none;
    padding: 0;
`;

const ReviewItem = styled.li`
    background-color: white;
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 15px;
    width: 100%; // 전체 너비 사용
`;

const ReviewItemHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;

const ReviewerName = styled(Text)`
    font-weight: bold;
    color: ${colors.darkGreen};
`;

const ReviewDate = styled(Text)`
    color: #888;
    font-size: 14px;
`;

const ReviewContent = styled(Text)`
    margin-bottom: 10px;
`;

const StarRating = styled.div`
    color: ${colors.darkGreen};
    font-size: 18px;
`;

function CounselorReviews() {
    const { userInfo, token } = userStore((state) => state);
    const { reviews, fetchReviews } = useReviewStore();

    useEffect(() => {
        if (userInfo?.userIdx && token) {
            fetchReviews(userInfo.userIdx, token);
        }
    }, [userInfo, token, fetchReviews]);

    const averageScore =
        reviews.length > 0
            ? (reviews.reduce((sum, review) => sum + review.reviewScore, 0) / reviews.length).toFixed(1)
            : 0;

    const renderStars = (score: number) => {
        return '★'.repeat(Math.floor(score)) + '☆'.repeat(5 - Math.floor(score));
    };

    return (
        <CounselorReviewsContainer>
            <ReviewHeader>
                <ReviewTitle>후기</ReviewTitle>
                <ScoreContainer>
                    <AverageScore>{averageScore} / 5</AverageScore>
                    <ReviewCount>({reviews.length}개 후기)</ReviewCount>
                </ScoreContainer>
            </ReviewHeader>
            <ReviewListContainer>
                <ReviewList>
                    {reviews.map((review) => (
                        <ReviewItem key={review.rno}>
                            <ReviewItemHeader>
                                <ReviewerName>{review.userName}</ReviewerName>
                                <ReviewDate>{new Date(review.createdAt).toLocaleDateString()}</ReviewDate>
                            </ReviewItemHeader>
                            <StarRating>{renderStars(review.reviewScore)}</StarRating>
                            <ReviewContent>{review.content}</ReviewContent>
                        </ReviewItem>
                    ))}
                </ReviewList>
            </ReviewListContainer>
        </CounselorReviewsContainer>
    );
}

export default CounselorReviews;
