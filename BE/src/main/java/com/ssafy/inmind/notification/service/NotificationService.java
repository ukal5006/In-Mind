package com.ssafy.inmind.notification.service;

import com.ssafy.inmind.notification.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private NotificationRepository notificationRepository;

}
