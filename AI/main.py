from fastapi import FastAPI, File, UploadFile
from interpreter import analyze_house_image, analyze_tree_image, analyze_person_image
from pydantic import BaseModel
import uuid
import requests
import shutil
import os
import json

app = FastAPI()

class AnalyzeRequest(BaseModel):
    treeUrl: str
    houseUrl: str
    personUrl: str
    
class Dto(BaseModel):
    data : dict

# 모델 경로 설정
house_model_path = 'PT_Files/house_best.onnx'
tree_model_path = 'PT_Files/tree_best.onnx'
person_model_path = 'PT_Files/person_best.onnx'

# 해석 파일 경로 설정
house_interpretations_path = 'jsonl/House_interpretations.jsonl'
tree_interpretations_path = 'jsonl/Tree_Interpretations.jsonl'
person_interpretations_path = 'jsonl/Person_Interpretations.jsonl'

def load_interpretations(jsonl_file_path):
    interpretations = {}
    with open(jsonl_file_path, 'r', encoding='utf-8') as file:
        for line in file:
            record = json.loads(line)
            interpretations[record["inputs"]] = record["response"]
    return interpretations

def generate_analysis_json(house_results, tree_results, person_results):
    house_interpretations = load_interpretations(house_interpretations_path)
    tree_interpretations = load_interpretations(tree_interpretations_path)
    person_interpretations = load_interpretations(person_interpretations_path)

    analysis_result = {
        "집": {},
        "나무": {},
        "사람": {}
    }

    # 집 결과 해석 추가
    for result in house_results:
        if result in house_interpretations:
            analysis_result["집"][result] = house_interpretations[result]

    # 나무 결과 해석 추가
    for result in tree_results:
        if result in tree_interpretations:
            analysis_result["나무"][result] = tree_interpretations[result]

    # 사람 결과 해석 추가
    for result in person_results:
        if result in person_interpretations:
            analysis_result["사람"][result] = person_interpretations[result]
            
    return analysis_result

@app.post("/analyze/")
async def analyze(request: AnalyzeRequest):
    # 임시 이미지 저장 디렉토리 설정
    temp_dir = "temp_images"
    os.makedirs(temp_dir, exist_ok=True)

    # 고유한 파일 이름 생성
    house_image_filename = f"house_image_{uuid.uuid4()}.jpg"
    tree_image_filename = f"tree_image_{uuid.uuid4()}.jpg"
    person_image_filename = f"person_image_{uuid.uuid4()}.jpg"

    # 이미지 저장 경로
    house_image_path = os.path.join(temp_dir, house_image_filename)
    tree_image_path = os.path.join(temp_dir, tree_image_filename)
    person_image_path = os.path.join(temp_dir, person_image_filename)

    # 이미지 다운로드
    download_image(request.houseUrl, house_image_path)
    download_image(request.treeUrl, tree_image_path)
    download_image(request.personUrl, person_image_path)
    
    # 분석 실행
    tree_results = analyze_tree_image(tree_model_path, tree_image_path)
    house_results = analyze_house_image(house_model_path, house_image_path)
    person_results = analyze_person_image(person_model_path, person_image_path)
    
    # 해석된 JSON 생성
    analysis_json = generate_analysis_json(house_results, tree_results, person_results)
    
    # 임시 파일 삭제
    os.remove(tree_image_path)
    os.remove(house_image_path)
    os.remove(person_image_path)

    print(analysis_json)
    return Dto(data=analysis_json)


def download_image(url: str, save_path: str) -> None:
    response = requests.get(url)
    if response.status_code == 200:
        with open(save_path, 'wb') as f:
            f.write(response.content)
    else:
        raise Exception(f"이미지 다운로드 실패: {url} (상태 코드: {response.status_code})")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
