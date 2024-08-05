package com.ssafy.inmind.user.service;

import com.ssafy.inmind.exception.ErrorCode;
import com.ssafy.inmind.exception.RestApiException;
import com.ssafy.inmind.reservation.entity.Reservation;
import com.ssafy.inmind.reservation.repository.ReserveRepository;
import com.ssafy.inmind.user.dto.ReviewRequestDto;
import com.ssafy.inmind.user.dto.ReviewResponseDto;
import com.ssafy.inmind.user.entity.Review;
import com.ssafy.inmind.user.repository.ReviewRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final ReserveRepository reserveRepository;

    public List<ReviewResponseDto> getReviewList(Long coIdx) {
        List<Review> reviewList = reviewRepository.findAllByCoIdx(coIdx);

        return reviewList.stream()
                .map(ReviewResponseDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public void addReview(ReviewRequestDto requestDto) {
        Reservation reservation = reserveRepository.findById(requestDto.getReserveIdx())
                .orElseThrow(() -> new RestApiException(ErrorCode.NOT_FOUND));

        Review review = Review.builder()
                .reservation(reservation)
                .name(requestDto.getName())
                .coIdx(requestDto.getCoIdx())
                .content(requestDto.getContent())
                .score(requestDto.getScore())
                .build();

        reviewRepository.save(review);
    }

    @Transactional
    public void deleteReview(Long rno) {
        Review review = reviewRepository.findById(rno)
                .orElseThrow(() -> new RestApiException(ErrorCode.NOT_FOUND));

        reviewRepository.delete(review);
    }
}
