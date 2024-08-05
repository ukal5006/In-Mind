package com.ssafy.inmind.notification.controller;


import com.ssafy.inmind.notification.repository.EmitterRepository;
import com.ssafy.inmind.notification.service.SseEmitterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;


@RestController
@RequiredArgsConstructor
@RequestMapping("/notify")
public class SseEmitterController {

    private final SseEmitterService sseEmitterService;
    private final EmitterRepository emitterRepository;

    @GetMapping(value = "/subscribe", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribe(@RequestParam Long userId,
                                @RequestHeader(value = "Last-Event-ID", required = false, defaultValue = "") String lastEventId) {
        return sseEmitterService.subscribe(userId, lastEventId);
    }

    @GetMapping("/subscribe/check")
    public SseEmitter findById(@RequestParam Long userId) {
        String emitterId = sseEmitterService.makeTimeIncludeId(userId);
        SseEmitter sseEmitter = emitterRepository.findById(emitterId);

        if (sseEmitter == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Emitter not found");
        }

        return sseEmitter;
    }
}