# 공식 Node 런타임을 부모 이미지로 사용
FROM node:18

# 작업 디렉토리를 /FE로 설정
WORKDIR /react

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 애플리케이션 코드의 나머지 부분 복사
COPY . .

# 애플리케이션 빌드
RUN npm run build

# serve를 전역으로 설치
RUN npm install -g serve

# 이 컨테이너 외부에서 포트 3000을 사용할 수 있도록 설정
EXPOSE 3000

# 애플리케이션 실행
CMD ["serve", "-s", "build"]
