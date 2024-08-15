package com.ssafy.inmind.report.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Map;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FastApiResponseDto {

    private Map<String, Object> data;

    @Override
    public String toString() {
        return "FastApiResponseDto{" +
                "data=" + data +
                '}';
    }
}
