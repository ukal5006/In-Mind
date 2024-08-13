package com.ssafy.inmind.chat.repository;

import com.ssafy.inmind.chat.entity.ChatInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatInfoRepository extends JpaRepository<ChatInfo, Long> {
}
