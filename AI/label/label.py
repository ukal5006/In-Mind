import cv2
from ultralytics import YOLO
import numpy as np

class Analyzer:
    def __init__(self, model_path, class_map):
        self.model = YOLO(model_path)
        self.class_map = class_map

    def analyze_image(self, image_path):
        # 이미지 읽기
        image = cv2.imread(image_path)

        # 이미지가 제대로 읽혔는지 확인
        if image is None:
            raise ValueError(f"이미지 파일을 읽을 수 없습니다: {image_path}")
        
        # 모델이 요구하는 크기 설정
        expected_size = (1280, 1280)

        # 이미지 리사이즈
        resized_image = cv2.resize(image, expected_size)

        # BGR에서 RGB로 변환
        resized_image_rgb = cv2.cvtColor(resized_image, cv2.COLOR_BGR2RGB)
        print(resized_image_rgb)

        # 예측 수행
        results = self.model.predict(source=resized_image_rgb)

        # 이미지의 크기 추출
        height, width = resized_image_rgb.shape[:2]

        predictions = []
        for result in results:
            for box in result.boxes:
                class_id = box.cls.item()  # 클래스 ID
                predictions.append({
                    'class': self.class_map.get(class_id, 'unknown'),  # 클래스 이름으로 변환
                    'confidence': box.conf.item(),
                    'bbox': box.xyxy.tolist()  # [x1, y1, x2, y2]
                })

        # 최종 JSON 데이터 구조
        output_data = {
            'image_size': {'width': width, 'height': height},
            'predictions': predictions
        }

        return output_data
