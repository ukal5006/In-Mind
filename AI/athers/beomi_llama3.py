import pandas as pd
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

# 모델 로드
model_id = "meta-llama/Meta-Llama-3.1-8B-Instruct"
tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(
    model_id,
    torch_dtype="auto",
    device_map="auto",
)

# CSV 파일 경로
csv_file_path = '/home/byunggyu/HTP_Project/S11P12B301/AI/datas/나무 그림 해석 - 시트1.csv'

# CSV 파일 로드
criteria_df = pd.read_csv(csv_file_path)

# 선택된 기준 리스트
selected_criteria = [29, 49, 84, 113, 124, 139, 150]

# 선택된 기준에 대한 설명 추출
selected_descriptions = criteria_df[criteria_df['번호'].isin(selected_criteria)]
# 설명을 텍스트로 변환
descriptions_text = "\n".join([f"{row['기준']}: {row['설명']}" for index, row in selected_descriptions.iterrows()])
print(descriptions_text)
# 서술형 텍스트 생성 프롬프트
prompt = (
    f"당신은 세계 최고의 HTP (House-Tree-Person) 심리검사 상담가입니다. "
    f"사용자가 업로드한 {criteria_df}을 기반으로 전문가 분석과 피드백을 제공하세요. "
    f"다음은 주어진 기준 설명입니다:\n\n"
    f"{descriptions_text}\n\n"
    f"이 기준들을 바탕으로 서술형 분석 결과를 한국어로 작성해 주세요."
)

# 모델 입력 준비
messages = [
    {"role": "system", "content": "전문적인 HTP상담가로서 주어진 데이터프레임을 바탕으로 사용자가 입력한 번호에 대해 상세히 해석해주자. 모든 대답은 한국어(Korean)으로 대답해줘."},
    {"role": "user", "content": prompt},
]

input_ids = tokenizer.apply_chat_template(
    messages,
    add_generation_prompt=True,
    return_tensors="pt"
).to(model.device)

# 모델 출력 생성
outputs = model.generate(
    input_ids,
    max_new_tokens=1000,
    eos_token_id=tokenizer.eos_token_id,
    do_sample=True,
    temperature=1,
    top_p=0.9,
)

response = outputs[0][input_ids.shape[-1]:]
print(tokenizer.decode(response, skip_special_tokens=True))
