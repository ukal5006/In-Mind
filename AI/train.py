import torch
from transformers import AutoTokenizer, AutoModelForCausalLM, TrainingArguments, Trainer, DataCollatorForSeq2Seq
import huggingface_hub
import pandas as pd
from datasets import Dataset

torch.cuda.empty_cache()

# Hugging Face 로그인
huggingface_hub.login('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')

# 1. 데이터 준비
df = pd.read_csv("/home/byunggyu/HTP_Project/S11P12B301/AI/나무 그림 해석 - 시트1.csv")
dataset = Dataset.from_pandas(df)

# 2. 모델 및 토크나이저 로드
model_name = "beomi/llama-3-koen-8b-instruct-preview"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

# 패딩 토큰 추가
tokenizer.pad_token = tokenizer.eos_token

# 3. 데이터 전처리
def preprocess_function(examples):
    inputs = [f"번호: {num}, 기준: {criterion}" for num, criterion in zip(examples['번호'], examples['기준'])]
    targets = examples['설명']
    
    model_inputs = tokenizer(inputs, max_length=128, truncation=True, padding="max_length")
    labels = tokenizer(targets, max_length=128, truncation=True, padding="max_length")["input_ids"]
    
    model_inputs["labels"] = labels
    return model_inputs

tokenized_dataset = dataset.map(preprocess_function, batched=True, remove_columns=dataset.column_names)

# 4. 학습 설정
training_args = TrainingArguments(
    output_dir="./results",
    num_train_epochs=3,
    per_device_train_batch_size=1,  # 배치 크기 줄이기
    save_steps=10_000,
    save_total_limit=1,
    fp16=True,  # Mixed Precision Training 활성화
)

# # Gradient checkpointing을 사용하여 모델의 일부 레이어를 감싸기
# def apply_gradient_checkpointing(model):
#     for layer in model.children():
#         if isinstance(layer, torch.nn.Module):
#             layer.forward = torch.utils.checkpoint.checkpoint(layer.forward)

# apply_gradient_checkpointing(model)

# 데이터 콜레이터
data_collator = DataCollatorForSeq2Seq(tokenizer, model=model)

# 5. 트레이너 초기화 및 학습
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_dataset,
    data_collator=data_collator,
)

trainer.train()

# 6. 모델 저장
trainer.save_model("./fine_tuned_model")

def generate_explanation(model, tokenizer, input_text):
    inputs = tokenizer(input_text, return_tensors="pt")
    output = model.generate(**inputs, max_length=128)
    explanation = tokenizer.decode(output[0], skip_special_tokens=True)
    return explanation

# 테스트
input_text = "번호: 1 기준: 나무그림"
explanation = generate_explanation(model, tokenizer, input_text)
print(explanation)
