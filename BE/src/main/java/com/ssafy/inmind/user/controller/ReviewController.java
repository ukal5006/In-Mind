package com.ssafy.inmind.user.controller;

import com.ssafy.inmind.user.dto.ReviewRequestDto;
import com.ssafy.inmind.user.dto.ReviewResponseDto;
import com.ssafy.inmind.user.service.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@Tag(name = "리뷰 컨트롤러", description = "리뷰 CRUD API")
@RequestMapping("/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    @Operation(summary = "리뷰 목록 조회")
    @GetMapping()
    public ResponseEntity<List<ReviewResponseDto>> getReviewList(@RequestParam @Parameter(description = "상담사번호") Long userId) {
        List<ReviewResponseDto> reviewList = reviewService.getReviewList(userId);
        return ResponseEntity.ok(reviewList);
    }

    @Operation(summary = "리뷰 등록")
    @PostMapping()
    public ResponseEntity<Void> addReview(@Valid @RequestBody ReviewRequestDto requestDto) {
        reviewService.addReview(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @Operation(summary = "리뷰 삭제")
    @DeleteMapping("/{rno}")
    public ResponseEntity<Void> deleteReview(@PathVariable @Parameter(description = "리뷰번호") Long rno) {
        reviewService.deleteReview(rno);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
