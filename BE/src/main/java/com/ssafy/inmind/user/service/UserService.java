package com.ssafy.inmind.user.service;

import com.ssafy.inmind.child.dto.ChildUpdateRequestDto;
import com.ssafy.inmind.child.entity.Child;
import com.ssafy.inmind.config.JwtUtil;
import com.ssafy.inmind.exception.ErrorCode;
import com.ssafy.inmind.exception.RestApiException;
import com.ssafy.inmind.management.entity.DefaultTime;
import com.ssafy.inmind.user.dto.*;
import com.ssafy.inmind.user.entity.Organization;
import com.ssafy.inmind.user.entity.RoleStatus;
import com.ssafy.inmind.user.entity.User;
import com.ssafy.inmind.user.repository.DefaultTimeRepository;
import com.ssafy.inmind.user.repository.OrganizationRepository;
import com.ssafy.inmind.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final OrganizationRepository orgRepository;

    private final Long expiredMs = 1000 * 60 * 60L;
    private final DefaultTimeRepository defaultTimeRepository;

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${salt.secret}")
    private String salt;

    @Transactional
    public UserLoginResponseDto login(UserLoginRequestDto loginDto) {
        String inputPassKey = sha256(loginDto.getPassword() + salt);
        userRepository.findByUserEmailAndPassword(loginDto.getEmail(), inputPassKey)
                .orElseThrow(() -> new RestApiException(ErrorCode.NOT_FOUND));
        User user  = userRepository.findByUserEmail(loginDto.getEmail())
                .orElseThrow(() -> new RestApiException(ErrorCode.NOT_FOUND));
        UserResponseDto userResponseDto = UserResponseDto.fromEntity(user);
        return UserLoginResponseDto.fromEntity(JwtUtil.createJwt(loginDto.getEmail(), secretKey, expiredMs), userResponseDto);
    }

    @Transactional
    public void saveUser(UserRequestDto userRequestDto) {
        if(checkUserEmail(userRequestDto.getEmail()).equals("duplicated")){
            throw new RestApiException(ErrorCode.NOT_FOUND);
        }
        String hashedString = sha256(userRequestDto.getPassword() + salt);
        User user = User.builder()
                .email(userRequestDto.getEmail())
                .password(hashedString)
                .name(userRequestDto.getName())
                .tel(userRequestDto.getTel())
                .role(RoleStatus.USER)
                .isAuth("N")
                .isAlive("Y")
                .build();
        System.out.println(user.getIsAlive());
        userRepository.save(user);
    }

    @Transactional
    public void saveCounselor(CounselorRequestDto requestDto) {
        if(checkUserEmail(requestDto.getEmail()).equals("duplicated")){
            throw new RestApiException(ErrorCode.NOT_FOUND);
        }
        String hashedString = sha256(requestDto.getPassword() + salt);

        // null 인 경우는 프리랜서
        Organization organization = null;
        if (requestDto.getOrgIdx() != null && requestDto.getOrgIdx() != 0) {
            organization = orgRepository.findById(requestDto.getOrgIdx())
                    .orElseThrow(() -> new RestApiException(ErrorCode.NOT_FOUND));
        }
        User user = User.builder()
                .organization(organization)
                .email(requestDto.getEmail())
                .password(hashedString)
                .name(requestDto.getName())
                .tel(requestDto.getTel())
                .role(RoleStatus.COUNSELOR)
                .isAuth("N")
                .isAlive("Y")
                .build();
        userRepository.save(user);

        DefaultTime defaultTime = DefaultTime.builder()
                .user(user)
                .startTime(LocalTime.of(0, 0))
                .endTime(LocalTime.of(0, 0))
                .build();

        defaultTimeRepository.save(defaultTime);
    }

    public List<CounselorListDto> getCounselorList(String name) {
        return userRepository.findCounselorsByName(name);
    }

    @Transactional
    public String checkUserPassword(UserLoginRequestDto userLoginRequestDto) {
        String inputPassKey = sha256(userLoginRequestDto.getPassword() + salt);
        Optional<User> user = userRepository.findByUserEmailAndPassword(userLoginRequestDto.getEmail(), inputPassKey);
        if(user.isPresent()){
            return "ok"; // 확인
        }
        return "fail"; // 실패
    }

    @Transactional
    public void updateUserPassword(Long userId, UserPasswordRequestDto requestDto) {
        String inputPassKey = sha256(requestDto.getPassword() + salt);
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new RestApiException(ErrorCode.NOT_FOUND));
        User updateUser = User.builder()
                .id(user.getId())
                .email(user.getEmail())
                .password(inputPassKey)
                .name(user.getName())
                .tel(user.getTel())
                .role(user.getRole())
                .profile(user.getProfile())
                .isAuth(user.getIsAuth())
                .isAlive(user.getIsAlive())
                .intro(user.getIntro())
                .build();
        userRepository.save(updateUser);


    }

    @Transactional
    public String checkUserEmail(String email) {
        Optional<User> user = userRepository.findByUserEmail(email);
        System.out.println(user.isPresent());
        if(user.isPresent()){
            return "duplicated"; // 중복된 이메일
        }
        return "non-duplicated"; // 없음
    }

    @Transactional
    public UserResponseDto getUser(Long userIdx){
        User user = userRepository.findByUserId(userIdx)
                .orElseThrow(() -> new RestApiException(ErrorCode.NOT_FOUND));
        return UserResponseDto.fromEntity(user);
    }

    public CounselorResponseDto getCounselor(Long userIdx){
        User user = userRepository.findById(userIdx)
                .orElseThrow(() -> new RestApiException(ErrorCode.NOT_FOUND));

        return userRepository.findCounselorById(user.getId());
    }

    @Transactional
    public void updateUser(Long userId, UserUpdateRequestDto userUpdateRequestDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RestApiException(ErrorCode.NOT_FOUND));

        User updateUser = User.builder()
                .id(user.getId())
                .email(user.getEmail())
                .password(user.getPassword())
                .name(userUpdateRequestDto.getUserName())
                .tel(userUpdateRequestDto.getUserTel())
                .role(userUpdateRequestDto.getUserRole())
                .profile(userUpdateRequestDto.getUserProfile())
                .isAuth(user.getIsAuth())
                .isAlive(user.getIsAlive())
                .intro(user.getIntro())
                .build();
        userRepository.save(updateUser);
    }

    @Transactional
    public void updateCounselor(Long userId, CounselorUpdateRequestDto counselorUpdateRequestDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RestApiException(ErrorCode.NOT_FOUND));

        User updateCounselor = User.builder()
                .id(user.getId())
                .email(user.getEmail())
                .password(user.getPassword())
                .name(counselorUpdateRequestDto.getUserName())
                .tel(counselorUpdateRequestDto.getUserTel())
                .role(counselorUpdateRequestDto.getUserRole())
                .profile(counselorUpdateRequestDto.getUserProfile())
                .isAuth(user.getIsAuth())
                .isAlive(user.getIsAlive())
                .intro(counselorUpdateRequestDto.getIntro())
                .build();
        userRepository.save(updateCounselor);
    }

    @Transactional
    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RestApiException(ErrorCode.NOT_FOUND));

        User updateUser = User.builder()
                .id(user.getId())
                .email(user.getEmail())
                .password(user.getPassword())
                .name(user.getName())
                .tel(user.getTel())
                .role(user.getRole())
                .isAuth(user.getIsAuth())
                .isAlive("N")
                .build();
        userRepository.save(updateUser);
    }

    /*
    SHA256 암호화
     */
    public static String sha256(String input) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] encodedhash = digest.digest(input.getBytes("UTF-8"));
            return bytesToHex(encodedhash);
        } catch (NoSuchAlgorithmException | java.io.UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
    }

    private static String bytesToHex(byte[] hash) {
        StringBuilder hexString = new StringBuilder(2 * hash.length);
        for (int i = 0; i < hash.length; i++) {
            String hex = Integer.toHexString(0xff & hash[i]);
            if (hex.length() == 1) {
                hexString.append('0');
            }
            hexString.append(hex);
        }
        return hexString.toString();
    }
}
