# Dockerfile

# 1. 베이스 이미지로 Python 3.9 사용
FROM python:3.9-slim

# 2. 필수 패키지 설치 (libGL 포함)
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# 3. pip 업그레이드
RUN pip install --upgrade pip

# 4. 작업 디렉토리 설정
WORKDIR /app

# 5. 필요한 패키지 설치
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# 6. 애플리케이션 소스 코드 복사
COPY . .

# 7. Uvicorn을 사용하여 FastAPI 애플리케이션 실행
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]
