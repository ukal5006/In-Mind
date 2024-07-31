# 공식 Node 런타임을 부모 이미지로 사용
FROM node:18

# 작업 디렉토리를 /react로 설정
WORKDIR /react

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 애플리케이션 코드의 나머지 부분 복사
COPY . .

# 환경 변수 설정 및 애플리케이션 빌드
RUN export NODE_OPTIONS=--openssl-legacy-provider && npm run build

# serve를 전역으로 설치
RUN npm install -g serve

# 애플리케이션 실행
CMD ["serve", "-s", "build"]

EXPOSE 3000
