# 베이스 이미지
FROM openjdk:17

# 작업 디렉토리 설정
WORKDIR /app

# 필요한 도구 설치 (메이븐)
RUN mkdir -p /root/.m2 && \
    curl -sSL https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/3.8.6/apache-maven-3.8.6-bin.tar.gz | tar -xz -C /root

# 프로젝트 의존성 파일 복사
COPY pom.xml /app

# 의존성 사전 다운로드
RUN /root/apache-maven-3.8.6/bin/mvn -f /app/pom.xml dependency:go-offline

# 프로젝트 소스 코드 복사
COPY src /app/src

# 프로젝트 빌드
RUN /root/apache-maven-3.8.6/bin/mvn -f /app/pom.xml package -DskipTests

# JAR 파일 복사
COPY --from=build /app/target/*.jar app.jar

# 컨테이너 시작 시 실행할 명령
ENTRYPOINT ["java","-jar","app.jar"]
