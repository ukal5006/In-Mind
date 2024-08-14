# 사용할 Java 이미지 지정
FROM openjdk:17

# 컨테이너 내부에서 애플리케이션 파일을 저장할 디렉토리 생성
WORKDIR /app

# 빌드된 JAR 파일을 컨테이너로 복사
COPY build/libs/inmind-0.0.1-SNAPSHOT.jar /app/app.jar

# 컨테이너가 시작될 때 실행될 명령어
CMD ["java", "-jar", "/app/app.jar"]
