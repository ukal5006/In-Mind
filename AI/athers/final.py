from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from openai import OpenAI
import pandas as pd
import os
from dotenv import load_dotenv
import json

from gpt import analyze_htp_image

# 환경 변수 로드
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")

# OpenAI 클라이언트 초기화
client = OpenAI(api_key=api_key)

# FastAPI 앱 초기화
app = FastAPI()

# JSONL 파일 로드
file_path = '/home/byunggyu/HTP_Project/S11P12B301/AI/datas/TREE.jsonl'
data = pd.read_json(file_path, lines=True)

@app.post("/analyze-image/")
async def analyze_image(file: UploadFile = File(...)):
    # 이미지 파일을 저장
    image_path = f"temp_{file.filename}"
    with open(image_path, "wb") as buffer:
        buffer.write(await file.read())
    
    # 선택 기준 분석
    selected_criteria = analyze_htp_image(image_path)
    selected_criteria = json.loads(selected_criteria)
    print(selected_criteria)

    # 선택된 기준에 맞는 응답 추출
    prompts = []
    for idx in selected_criteria:
        if idx in data['inputs'].values:
            response_row = data[data['inputs'] == idx]
            if not response_row.empty:
                response = response_row['response'].values[0]
                prompts.append(f"입력 {idx}: {response}")

    # HTP 심리검사 프롬프트 생성
    prompt = "\n".join(prompts)
    print(prompt)

    # GPT 모델을 사용하여 응답 생성
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "당신은 아동을 대상으로 상담하는 전문적인 HTP상담사 입니다. 서술형으로 HTP심리검사 결과를 도출해 주세요, 긍정적인 부분과 부정적인 부분을 적절히 섞어주세요 해설은 번호없이 하나의 내용으로 작성해주세요 "},
            {"role": "user", "content": f'{prompt}의 해석결과를 바탕으로 정확한 심리상담 해설을 작성해 주세요'}
        ]
    )

    # 결과 응답
    result = response.choices[0].message.content
    print(result)

    # 임시로 저장된 이미지 파일 삭제
    os.remove(image_path)

    return JSONResponse(content={"result": result})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
