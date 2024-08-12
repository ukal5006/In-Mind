package com.ssafy.inmind.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .addServersItem(new Server().url("/api"))
                .addServersItem(new Server().url("/"))
<<<<<<< HEAD
                .components(new Components()
                        .addSecuritySchemes("bearerAuth", apiKey()))  // ApiKey 정의 추가
                .addSecurityItem(new SecurityRequirement().addList("bearerAuth")) // SecurityRequirement 추가
=======
                .components(new Components())
>>>>>>> d7a1819d18419ecac7cccfae0db5b7e9ac421c05
                .info(apiInfo());
    }

    // ApiKey 정의
    private SecurityScheme apiKey() {
        return new SecurityScheme()
                .name("Authorization")
                .type(SecurityScheme.Type.HTTP)
                .scheme("bearer")
                .bearerFormat("JWT")
                .in(SecurityScheme.In.HEADER);
    }

    private Info apiInfo() {
        return new Info()
                .title("Springdoc 테스트")
                .description("Springdoc을 사용한 Swagger UI 테스트")
                .version("1.0.0");
    }
}