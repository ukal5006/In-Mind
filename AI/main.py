from fastapi import FastAPI, File, UploadFile
from interpreter import analyze_house_image, analyze_tree_image
import shutil
import os
import json

app = FastAPI()

# 모델 경로 설정
house_model_path = '/home/byunggyu/HTP_Project/S11P12B301/AI/PT_Files/house_best.onnx'
tree_model_path = '/home/byunggyu/HTP_Project/S11P12B301/AI/PT_Files/tree_best.onnx'

# 해석 파일 경로 설정
house_interpretations_path = '/home/byunggyu/HTP_Project/S11P12B301/AI/jsonl/House_interpretations.jsonl'
tree_interpretations_path = '/home/byunggyu/HTP_Project/S11P12B301/AI/jsonl/Tree_Interpretations.jsonl'

def load_interpretations(jsonl_file_path):
    interpretations = {}
    with open(jsonl_file_path, 'r', encoding='utf-8') as file:
        for line in file:
            record = json.loads(line)
            interpretations[record["inputs"]] = record["response"]
    return interpretations

def generate_analysis_json(house_results, tree_results):
    house_interpretations = load_interpretations(house_interpretations_path)
    tree_interpretations = load_interpretations(tree_interpretations_path)

    analysis_result = {
        "집": {},
        "나무": {}
    }

    # 집 결과 해석 추가
    for result in house_results:
        if result in house_interpretations:
            analysis_result["집"][result] = house_interpretations[result]

    # 나무 결과 해석 추가
    for result in tree_results:
        if result in tree_interpretations:
            analysis_result["나무"][result] = tree_interpretations[result]

    return analysis_result

@app.post("/analyze_house/")
async def analyze_house_endpoint(file: UploadFile = File(...)):
    # 임시 파일 경로 설정
    temp_dir = "temp_images"
    os.makedirs(temp_dir, exist_ok=True)
    file_path = os.path.join(temp_dir, file.filename)
    
    # 파일 저장
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # 분석 실행
    house_results = analyze_house_image(house_model_path, file_path)
    
    # 해석된 JSON 생성
    analysis_json = generate_analysis_json(house_results, [])
    
    # 임시 파일 삭제
    os.remove(file_path)

    return {"result": analysis_json}


@app.post("/analyze_tree/")
async def analyze_tree_endpoint(file: UploadFile = File(...)):
    # 임시 파일 경로 설정
    temp_dir = "temp_images"
    os.makedirs(temp_dir, exist_ok=True)
    file_path = os.path.join(temp_dir, file.filename)
    
    # 파일 저장
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # 분석 실행
    tree_results = analyze_tree_image(tree_model_path, file_path)
    
    # 해석된 JSON 생성
    analysis_json = generate_analysis_json([], tree_results)
    
    # 임시 파일 삭제
    os.remove(file_path)

    return {"result": analysis_json}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
