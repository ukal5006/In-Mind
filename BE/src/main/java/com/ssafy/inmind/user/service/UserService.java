package com.ssafy.inmind.user.service;

import com.ssafy.inmind.config.JwtUtil;
import com.ssafy.inmind.exception.ErrorCode;
import com.ssafy.inmind.exception.RestApiException;
import com.ssafy.inmind.user.dto.CounselorListDto;
import com.ssafy.inmind.user.dto.CounselorRequestDto;
import com.ssafy.inmind.user.dto.UserLoginRequestDto;
import com.ssafy.inmind.user.dto.UserRequestDto;
import com.ssafy.inmind.user.entity.Organization;
import com.ssafy.inmind.user.entity.RoleStatus;
import com.ssafy.inmind.user.entity.User;
import com.ssafy.inmind.user.repository.OrganizationRepository;
import com.ssafy.inmind.user.repository.SearchRepository;
import com.ssafy.inmind.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final OrganizationRepository orgRepository;

    private final Long expiredMs = 1000 * 60 * 60L;

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${salt.secret}")
    private String salt;

    public String login(UserLoginRequestDto loginDto) {

        return JwtUtil.createJwt(loginDto.getUsername(), secretKey, expiredMs);
    }

    public void saveUser(UserRequestDto userRequestDto){
        String hashedString = sha256(userRequestDto.getPassword()+salt);
        System.out.println(hashedString);

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

    public void saveCounselor(CounselorRequestDto requestDto){
        String hashedString = sha256(requestDto.getPassword()+salt);

        Organization organization = orgRepository.findById(requestDto.getOrgIdx())
                .orElseThrow(() -> new RestApiException(ErrorCode.NOT_FOUND));

        User user = User.builder()
                .organization(organization)
                .email(requestDto.getEmail())
                .password(hashedString)
                .name(requestDto.getName())
                .tel(requestDto.getTel())
                .role(RoleStatus.COUNSELOR)
                .build();
        userRepository.save(user);
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

    public List<CounselorListDto> getCounselorList(String name) {
        return userRepository.findCounselorsByName(name);
    }
}
