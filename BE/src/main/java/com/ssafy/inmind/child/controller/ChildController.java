package com.ssafy.inmind.child.controller;

import com.ssafy.inmind.child.dto.ChildRequestDto;
import com.ssafy.inmind.child.dto.ChildResponseDto;
import com.ssafy.inmind.child.dto.ChildUpdateRequestDto;
import com.ssafy.inmind.child.service.ChildService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequiredArgsConstructor
@Tag(name = "자녀정보 컨트롤러", description = "자녀정보 CRUD API")
@RequestMapping("/children")
public class ChildController {

    private final ChildService childService;

    @Operation(summary = "자녀정보 등록", description = "유저가 자녀정보를 등록합니다.")
    @PostMapping()
    public ResponseEntity<Void> addChild(@RequestBody ChildRequestDto requestDto) {
        childService.saveChild(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @Operation(summary = "자녀정보 상세조회", description = "유저가 자녀정보를 등록합니다.")
    @GetMapping("/{childId}")
    public ResponseEntity<ChildResponseDto> getChild(@PathVariable @Parameter(description = "자녀번호") Long childId) {
        ChildResponseDto child = childService.getChild(childId);
        return ResponseEntity.ok(child);
    }

    @Operation(summary = "자녀정보 수정", description = "유저가 자녀정보를 수정합니다.")
    @PutMapping("/{childId}")
    public ResponseEntity<Void> updateChild(@PathVariable @Parameter(description = "자녀번호") Long childId, @RequestBody ChildUpdateRequestDto requestDto) {
        childService.updateChild(childId, requestDto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @Operation(summary = "자녀정보 삭제", description = "유저가 자녀정보를 삭제합니다.")
    @DeleteMapping("/{childId}")
    public ResponseEntity<Void> deleteChild(@PathVariable @Parameter(description = "자녀번호") Long childId) {
        childService.deleteChild(childId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
