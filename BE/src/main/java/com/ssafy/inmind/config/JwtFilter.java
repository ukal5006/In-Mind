package com.ssafy.inmind.config;

import com.ssafy.inmind.user.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.*;

@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final UserService userService;
    private final String secretKey;
    private final Long accessTokenExpiredMs = 1000 * 60L; //  * 60

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getRequestURI();
        String method = request.getMethod();

        // 필터링하지 않을 경로 및 메서드 조합 리스트
        Map<String, List<String>> excludedPaths = new HashMap<>();
//        excludedPaths.put("/users", Collections.singletonList("POST"));
//        excludedPaths.put("/users/user", Collections.singletonList("POST"));
//        excludedPaths.put("/users/email-check", Collections.singletonList("GET"));
//        excludedPaths.put("/users/counselor", Collections.singletonList("POST"));
//        excludedPaths.put("/orgs", Arrays.asList("POST", "GET"));
//        excludedPaths.put("/chat", Collections.singletonList("POST"));
//        excludedPaths.put("/notify", Arrays.asList("POST", "GET", "DELETE"));
//        excludedPaths.put("/notify/all", Arrays.asList("GET", "DELETE"));
//        excludedPaths.put("/notify/subscribe", Arrays.asList("POST", "DELETE"));
//        excludedPaths.put("/notify/unread", Collections.singletonList("GET"));
//        excludedPaths.put("/orgs/list", Collections.singletonList("GET"));
        excludedPaths.put("/swagger-ui", Collections.singletonList("GET"));
        excludedPaths.put("/v3/api-docs", Collections.singletonList("GET"));

        // 요청된 경로가 필터링 제외 목록에 있고, 해당 경로에서 허용된 메서드인지 확인
        return excludedPaths.containsKey(path) && excludedPaths.get(path).contains(method);
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        final String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);

        logger.info("authorization = " + authorization);

        if (authorization == null || !authorization.startsWith("Bearer ")) {
            logger.error("authorization 이 없습니다.");
            filterChain.doFilter(request, response);
            return;
        }

        // Token 꺼내기
        String token = authorization.split(" ")[1];

        // Token Expired 되었는지 여부
        if (JwtUtil.isExpired(token, secretKey)) {
            logger.error("Token 이 만료되었습니다.");
            String refreshToken = JwtUtil.extractRefreshToken(token, secretKey);

            if (JwtUtil.isExpired(refreshToken, secretKey)) {
                logger.error("Refresh Token도 만료되었습니다. 다시 로그인이 필요합니다.");
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Authentication failed");
                return;
            }

            // 새로운 Access Token 발급
            String newAccessToken = JwtUtil.createAccessTokenJwt(refreshToken, secretKey, accessTokenExpiredMs);

            // 새로 발급된 Access Token으로 Authorization 헤더를 업데이트
            token = newAccessToken;

            // 응답 헤더에 새로운 Access Token 설정 (선택사항: 클라이언트에게 새 토큰을 전달하기 위함)
            response.setHeader(HttpHeaders.AUTHORIZATION, "Bearer " + newAccessToken);

            logger.info("새로운 Access Token이 발급되었습니다.");
        }

        // UserName Token에서 꺼내기
        String userEmail = JwtUtil.extractUserEmail(JwtUtil.extractRefreshToken(token, secretKey), secretKey);

        // 권한 부여
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(userEmail, null, List.of(new SimpleGrantedAuthority("USER")));

        // Detail을 넣어준다.
        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);

        // 필터 체인을 계속해서 진행
        filterChain.doFilter(request, response);

    }
}