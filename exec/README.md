# 목차
1. 사용 도구
2. 개발 도구
3. 개발 환경
4. 환경 변수 형태
5. CI/CD 구축
6. 빌드 및 실행
7. 외부 서비스 사용

# 1. 사용 도구
- 이슈 관리 : Jira
- 형상 관리 : GitLab
- 커뮤니테이션 : Notion, MatterMost
- 디자인 : Figma
- CI/CD : Jenkins

# 2. 개발 도구
- Visual Studio Code: 1.92.1
- Node.js : 20.14.0
- IntelliJ : 24.2.0.1


# 3. 개발 환경
### Frontend
React: 18.3.1  
axios: 1.7.3  

---
### Backend
JDK: 17  
Spring Boot: 3.3.2  
JPA: 5.0.0:jakarta  
JWT: jjwt-0.11.5  
Python : 3.9  

---
### Server    
AWS EC2  
CPU: Intel(R) Xeon(R) CPU E5-2686 v4 @ 2.30Gz(4 Core, 4 thread)  
Disk: 311GB  
Ram: 16GB (MiB Swap 2G)  

---

### Service
nginx: 1.25.5  
openvidu: 2.30.0  
kurento-media-server: 7.0.1  
jenkins: 2.452.3  
mysql: 9.0.1  
Docker: 27.1.1  
Docker-compose: 2.27.2  

# 4. 환경 변수 형태
- Backend
  - application.properties
  ```
  spring.application.name=inmind
  server.port=5000

  # MySQL
  spring.datasource.url=jdbc:mysql://localhost:3306/inmind?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
  spring.datasource.username=username
  spring.datasource.password=password
  spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

  # JPA
  spring.jpa.hibernate.ddl-auto=update
  spring.jpa.show-sql=true
  spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
  spring.jpa.properties.hibernate.format_sql=true

  spring.jpa.properties.hibernate.jdbc.time_zone=Asia/Seoul

  # JWT secretKey
  
  jwt.secret=jwt-secret-key

  # salt
  salt.secret=salt-key

  # SpringDoc
  springdoc.packages-to-scan= com.ssafy.inmind
  springdoc.default-consumes-media-type= application/json;charset=UTF-8

  # Swagger UI
  springdoc.swagger-ui.path=/swagger-ui
  springdoc.api-docs.path=/swagger-ui/v3/api-docs

  springdoc.swagger-ui.disable-swagger-default-url= true
  springdoc.swagger-ui.display-request-duration= true
  springdoc.swagger-ui.operations-sorter= alpha

  # gpt api key
  openai.api.key=api-key
  ```

# 5. CI/CD 구축


# 6. 빌드 및 실행

# 7. 외부 서비스 사용
