package com.ssafy.inmind.child.service;

import com.ssafy.inmind.child.dto.ChildListResponseDto;
import com.ssafy.inmind.child.dto.ChildRequestDto;
import com.ssafy.inmind.child.dto.ChildResponseDto;
import com.ssafy.inmind.child.dto.ChildUpdateRequestDto;
import com.ssafy.inmind.child.entity.Child;
import com.ssafy.inmind.child.repository.ChildRepository;
import com.ssafy.inmind.exception.ErrorCode;
import com.ssafy.inmind.exception.RestApiException;
import com.ssafy.inmind.user.entity.User;
import com.ssafy.inmind.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChildService {

    private final ChildRepository childRepository;
    private final UserRepository userRepository;

    public void saveChild(ChildRequestDto requestDto) {
        User user = userRepository.findById(requestDto.getUserIdx())
                .orElseThrow(() -> new RestApiException(ErrorCode.NOT_FOUND));

        Child child = Child.builder()
                .user(user)
                .name(requestDto.getChildName())
                .birthday(requestDto.getChildBirth())
                .build();

        childRepository.save(child);
    }

    public ChildResponseDto getChild(Long childIdx) {
        Child child = childRepository.findById(childIdx)
                .orElseThrow(()-> new RestApiException(ErrorCode.NOT_FOUND));

        return ChildResponseDto.fromEntity(child);
    }

    public void updateChild(Long childIdx, ChildUpdateRequestDto requestDto) {
        Child child = childRepository.findById(childIdx)
                .orElseThrow(() -> new RestApiException(ErrorCode.NOT_FOUND));

        Child updateChild = Child.builder()
                .id(childIdx)
                .user(child.getUser())
                .name(requestDto.getChildName())
                .birthday(requestDto.getChildBirth())
                .build();

        childRepository.save(updateChild);
    }

    public void deleteChild(Long childIdx) {
        Child child = childRepository.findById(childIdx)
                .orElseThrow(() -> new RestApiException(ErrorCode.NOT_FOUND));

        childRepository.delete(child);
    }

    public List<ChildListResponseDto> getChildList(Long userIdx) {
        List<Child> childList = childRepository.findByUserId(userIdx);

        return childList.stream()
                .map(ChildListResponseDto::fromEntity)
                .collect(Collectors.toList());
    }
}
