import os
import random
import requests
import json
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from interpreter import Yolo

app = FastAPI()

class UrlRequest(BaseModel):
    url: str

class Dto(BaseModel):
    data: dict  # JSON 데이터 반환을 위한 필드 추가

@app.post('/interpretation', response_model=Dto)
def interpreter(request: UrlRequest):
    saved_image_path = file_download(request.url)
    yolo = Yolo()
    json_path = yolo.start_yolo(saved_image_path)
    print(json_path)
    
    # JSON 파일 읽기
    with open(json_path, "r", encoding='utf-8') as json_file:
        json_data = json.load(json_file)

    return Dto(data=json_data)

def file_download(url: str) -> str:
    temp_folder = 'temp'
    os.makedirs(temp_folder, exist_ok=True)

    random_number = random.randint(1000, 100000)
    # 파일 이름 생성 (확장자를 고려하여 이름 생성)
    image_name = f"{url.split('/')[-1].split('.')[0]}_{random_number}.jpg"
    image_path = os.path.join(temp_folder, image_name)

    try:
        response = requests.get(url)
        response.raise_for_status()  # 요청이 실패하면 예외 발생

        # 이미지 파일로 저장
        with open(image_path, 'wb') as f:
            f.write(response.content)

        return image_path  # 저장한 이미지 경로 반환
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=400, detail=f"Image download failed: {str(e)}")

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=80)
