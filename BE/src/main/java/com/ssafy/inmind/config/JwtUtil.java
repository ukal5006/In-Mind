package com.ssafy.inmind.config;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.util.Date;

public class JwtUtil {

    // Refresh Token을 생성하는 메서드
    public static String createRefreshTokenJwt(String userName, String secretKey, Date expiredTime) {
        SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes()); // 비밀키 생성
        return Jwts.builder()
                .claim("userEmail", userName) // 토큰에 사용자 이름을 클레임으로 추가
                .setIssuedAt(new Date()) // 토큰 발급 시간 설정
                .setExpiration(expiredTime) // 토큰 만료 시간 설정
                .signWith(key, SignatureAlgorithm.HS256) // 서명 알고리즘과 키를 사용해 토큰 서명
                .compact(); // 토큰 생성 및 반환
    }

    // Access Token을 생성하는 메서드
    public static String createAccessTokenJwt(String refreshToken, String secretKey, long expiredMs) {
        SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes()); // 비밀키 생성
        return Jwts.builder()
                .claim("refreshToken", refreshToken) // 토큰에 Refresh Token을 클레임으로 추가
                .setIssuedAt(new Date()) // 토큰 발급 시간 설정
                .setExpiration(new Date(System.currentTimeMillis() + expiredMs)) // 만료 시간을 현재 시간 + 만료 기간으로 설정
                .signWith(key, SignatureAlgorithm.HS256) // 서명 알고리즘과 키를 사용해 토큰 서명
                .compact(); // 토큰 생성 및 반환
    }

    // 토큰이 만료되었는지 확인하는 메서드
    public static boolean isExpired(String token, String secretKey) {
        try {
            SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes()); // 비밀키 생성
            Jwts.parserBuilder()
                    .setSigningKey(key) // 서명 키 설정
                    .build()
                    .parseClaimsJws(token); // 토큰 파싱 및 서명 검증
            return false; // 토큰이 유효한 경우 false 반환
        } catch (ExpiredJwtException e) {
            return true; // 토큰이 만료된 경우 true 반환
        }
    }

    // Refresh Token을 추출하는 메서드
    public static String extractRefreshToken(String token, String secretKey) {
        SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes()); // 비밀키 생성
        try {
            Jws<Claims> claimsJws = Jwts.parserBuilder()
                    .setSigningKey(key) // 서명 키 설정
                    .build()
                    .parseClaimsJws(token); // 토큰 파싱 및 서명 검증
            return claimsJws.getBody().get("refreshToken", String.class); // Refresh Token 추출 및 반환
        } catch (ExpiredJwtException e) {
            return e.getClaims().get("refreshToken", String.class); // 만료된 경우에도 Refresh Token을 반환
        }
    }

    // 사용자 이름을 추출하는 메서드
    public static String extractUserEmail(String token, String secretKey) {
        SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes()); // 비밀키 생성
        try {
            Jws<Claims> claimsJws = Jwts.parserBuilder()
                    .setSigningKey(key) // 서명 키 설정
                    .build()
                    .parseClaimsJws(token); // 토큰 파싱 및 서명 검증
            return claimsJws.getBody().get("userEmail", String.class);
        } catch (ExpiredJwtException e) {
            return e.getClaims().get("userEmail", String.class);
        }
    }

}
