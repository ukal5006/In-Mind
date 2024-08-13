from ultralytics import YOLO
from root import InterpretationMatcher
from image_grid import ImageGrid
import cv2
import random
import time
import os
import json

class Yolo:
    def start_yolo(self, image_path):
        model = YOLO('best.pt')
        results = model.predict(source=f'{image_path}', save=True)
        
        # 탐지 결과 json 저장
        file_path = save_result(results, image_path)

        # 탐지 json 객체 생성
        with open(file_path, 'r', encoding="utf-8") as f:
            data = json.load(f)
        predictions = data["predictions"]
        
        interpreter_json = interpreter_image_grid(file_path)
        flow_fruit(predictions, interpreter_json)
        return interpreter_json


def save_result(results, image_path):
    image = cv2.imread(image_path)
    height, width = image.shape[:2]
    
    class_map = {
        0: '나무전체',
        1: '기둥',
        2: '수관',
        3: '가지',
        4: '뿌리',
        5: '나뭇잎',
        6: '꽃',
        7: '열매',
        8: '그네',
        9: '새',
        10: '다람쥐',
        11: '구름',
        12: '달',
        13: '별'
    }  
    
    predictions = []
    for result in results:
        for box in result.boxes:
            class_id = box.cls.item()  # 클래스 ID
            predictions.append({
                'class': class_map.get(class_id, 'unknown'),  # 클래스 이름으로 변환
                'confidence': box.conf.item(),
                'bbox': box.xyxy.tolist()  # [x1, y1, x2, y2]
            })
    
    # 랜덤 숫자 생성
    random_number = random.randint(1000, 9999)  # 1000에서 9999 사이의 랜덤 숫자 생성
    timestamp = int(time.time())  # 현재 시간을 UNIX 타임스탬프로 변환
    filename = f'predictions_{timestamp}_{random_number}.json'  # 파일 이름 생성
    result_folder = 'result'
    
    # result 폴더가 없으면 생성
    if not os.path.exists(result_folder):
        os.makedirs(result_folder)

    file_path = os.path.join(result_folder, filename)

    # 최종 JSON 데이터 구조
    output_data = {
        'image_size': {'width': width, 'height': height},
        'predictions': predictions
    }
    
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(output_data, f, ensure_ascii=False, indent=4)
        
    return file_path


def interpreter_image_grid(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    image_size = data['image_size']
    for prediction in data['predictions']:
        if prediction['class'] == '나무전체':
            x1, y1, x2, y2 = prediction['bbox'][0]
            break
    
    image_grid = ImageGrid(image_size)
    interpreter = image_grid.get_cell_occupancy(x1, y1, x2, y2)
    
    output_dir = 'interpreter'
    os.makedirs(output_dir, exist_ok=True)  # 폴더가 없으면 생성
    
    base_file_path = os.path.basename(file_path)
    output_file_path = os.path.join(output_dir, f"{base_file_path}_new.json")
    with open(output_file_path, 'w', encoding='utf-8') as f:
        json.dump(interpreter, f, ensure_ascii=False, indent=4)

    return output_file_path


def flow_fruit(data, output_file_path):
    
    # 꽃과 열매의 개수를 세는 변수 초기화
    flower_count = 0
    fruit_count = 0
    max_leaf_area = 0
    max_branch_area = 0
    # 데이터를 순회하며 꽃과 열매의 개수를 셈
    for item in data:
        if item["class"] == "꽃":
            flower_count += 1
        elif item["class"] == "열매":
            fruit_count += 1
        elif item["class"] == "가지":
            branch_bbox = item["bbox"][0]
            branch_area = (branch_bbox[2] - branch_bbox[0]) * (branch_bbox[3] - branch_bbox[1])
            if branch_area > max_branch_area:
                max_branch_area = branch_area
        elif item["class"] == "나뭇잎":
            leaf_bbox = item["bbox"][0]
            leaf_area = (leaf_bbox[2] - leaf_bbox[0]) * (leaf_bbox[3] - leaf_bbox[1])
            if leaf_area > max_leaf_area:
                max_leaf_area = leaf_area

    # tree_results 변수에 결과를 담음
    tree_results = []
    if flower_count >= 3:
        tree_results.append("많은 꽃")
    elif flower_count > 0:
        tree_results.append("꽃")

    if fruit_count >= 3:
        tree_results.append("많은 열매")
    elif fruit_count > 0:
        tree_results.append("열매")

    # 나뭇잎이나 꽃이 땅에 떨어져 있는지 확인하는 로직 추가
    image_height = 1280
    ground_level_threshold = image_height * 0.7  # 하단 30%를 땅으로 간주
    leaf_fallen = False
    flower_fallen = False

    for item in data:
        if item["class"] in ["나뭇잎", "꽃"]:
            bbox = item["bbox"][0]
            if bbox[3] >= ground_level_threshold:  # 땅에 떨어졌는지 확인
                if item["class"] == "나뭇잎" and not leaf_fallen:
                    tree_results.append("떨어진 나뭇잎")
                    leaf_fallen = True
                elif item["class"] == "꽃" and not flower_fallen:
                    tree_results.append("떨어진 꽃")
                    flower_fallen = True
                    
    # 큰 기둥인지 판단하는 로직 추가
    # 기둥과 나무 전체의 bbox를 추출
    trunk_bbox = None
    tree_bbox = None

    for item in data:
        if item["class"] == "기둥":
            trunk_bbox = item["bbox"][0]
        elif item["class"] == "나무전체":
            tree_bbox = item["bbox"][0]

    # 기둥과 나무 전체의 면적과 높이 계산
    if trunk_bbox and tree_bbox:
        trunk_width = trunk_bbox[2] - trunk_bbox[0]
        trunk_height = trunk_bbox[3] - trunk_bbox[1]
        trunk_area = trunk_width * trunk_height

        tree_width = tree_bbox[2] - tree_bbox[0]
        tree_height = tree_bbox[3] - tree_bbox[1]
        tree_area = tree_width * tree_height

        # 면적 비율 계산
        area_ratio = trunk_area / tree_area

        # 높이 비율 계산
        height_ratio = trunk_height / tree_height

        # "큰 기둥" 판단 기준: 높이 70% 이상, 면적 35% 이상
        if height_ratio >= 0.7 and area_ratio >= 0.35:
            tree_results.append("큰 기둥")

    # 상록수, 활엽수, 고목 판단 로직 추가
    canopy_exists = False
    leaf_exists = False
    trunk_bbox = None
    canopy_bbox = None

    for item in data:
        if item["class"] == "수관":
            canopy_bbox = item["bbox"][0]
            canopy_exists = True
        elif item["class"] == "나뭇잎":
            leaf_exists = True
        elif item["class"] == "기둥":
            trunk_bbox = item["bbox"][0]

    # 상록수 판단: 수관과 기둥의 겹치는 영역이 수관 전체 면적의 40% 이상인 경우
    if canopy_bbox and trunk_bbox:
        canopy_area = (canopy_bbox[2] - canopy_bbox[0]) * (canopy_bbox[3] - canopy_bbox[1])
        overlap_area = max(0, min(canopy_bbox[2], trunk_bbox[2]) - max(canopy_bbox[0], trunk_bbox[0])) * \
                    max(0, min(canopy_bbox[3], trunk_bbox[3]) - max(canopy_bbox[1], trunk_bbox[1]))
        overlap_ratio = overlap_area / canopy_area

        if overlap_ratio >= 0.4:
            tree_results.append("상록수")
        else:
            tree_results.append("활엽수")
    else:
        # 고목 판단: 수관과 나뭇잎이 모두 없는 경우
        if not canopy_exists and not leaf_exists:
            tree_results.append("고목나무")
        else:
            tree_results.append("활엽수")

    # 수관과 겹치는 나뭇잎을 tree_results에 추가
    if canopy_bbox:
        for item in data:
            if item["class"] == "나뭇잎":
                leaf_bbox = item["bbox"][0]
                overlap_leaf_area = max(0, min(canopy_bbox[2], leaf_bbox[2]) - max(canopy_bbox[0], leaf_bbox[0])) * \
                                    max(0, min(canopy_bbox[3], leaf_bbox[3]) - max(canopy_bbox[1], leaf_bbox[1]))
                leaf_area = (leaf_bbox[2] - leaf_bbox[0]) * (leaf_bbox[3] - leaf_bbox[1])

                # 나뭇잎의 50% 이상이 수관과 겹치면 tree_results에 추가
                if overlap_leaf_area / leaf_area >= 0.5:
                    tree_results.append("수관에 있는 나뭇잎")
                    
    # 달이나 별이 하나라도 있는지 확인하고 추가
    moon_or_star_present = False

    for item in data:
        if item["class"] in ["달", "별"]:
            moon_or_star_present = True
            break  # 달이나 별이 하나라도 있으면 루프를 중단

    if moon_or_star_present:
        tree_results.append("달이나 별")


    # 가장 큰 가지와 가장 큰 나뭇잎의 크기를 추적할 변수
    max_branch_area = 0
    max_leaf_area = 0

    # 가지에 비해 지나치게 큰 잎이 있는지 확인하고 추가
    if max_leaf_area > max_branch_area:
        tree_results.append("가지에 비해 지나치게 큰 잎")
        
    # 1. 가지의 면적이 나무 전체 면적의 10% 이상이면 큰 가지로 간주
    # 2. 기둥의 높이가 나무 전체 높이의 70% 이상이고, 높이/너비 비율이 10 이상이면 크고 좁은 기둥으로 간주
    if max_branch_area / tree_area >= 0.1:
        if trunk_bbox and height_ratio >= 0.7 and trunk_height / trunk_width >= 10:
            tree_results.append("큰 가지 크고 좁은 기둥")
        if max_branch_area / tree_area >= 0.1:
            tree_results.append("큰 가지")
            
    # 수관의 크기를 판단하는 로직
    if canopy_bbox and trunk_bbox:
        # 수관의 가로 길이와 넓이 계산
        canopy_width = canopy_bbox[2] - canopy_bbox[0]
        canopy_area = (canopy_bbox[2] - canopy_bbox[0]) * (canopy_bbox[3] - canopy_bbox[1])

        # 기둥의 넓이 계산
        trunk_width = trunk_bbox[2] - trunk_bbox[0]
        trunk_area = (trunk_bbox[2] - trunk_bbox[0]) * (trunk_bbox[3] - trunk_bbox[1])

        # 넓은 수관 판단: 수관의 가로 길이가 기둥의 넓이보다 3배 이상인 경우
        if canopy_width >= 3 * trunk_width:
            tree_results.append("넓은 수관")

        # 좁은 수관 판단: 수관의 넓이가 기둥의 넓이 * 1.3보다 작은 경우
        if canopy_area < 1.3 * trunk_area:
            tree_results.append("좁은 수관")        

    # 수관의 중심이 오른쪽 또는 왼쪽으로 치우쳤는지 판단하는 로직
    if canopy_bbox and trunk_bbox:
        # 수관의 중심 계산
        canopy_center_x = (canopy_bbox[0] + canopy_bbox[2]) / 2

        # 기둥의 중심 계산
        trunk_center_x = (trunk_bbox[0] + trunk_bbox[2]) / 2

        # 중심의 차이 계산
        offset = canopy_center_x - trunk_center_x

        # 임계값 설정 (기둥의 너비의 20%를 기준으로 설정)
        threshold = trunk_width * 0.2

        # 오른쪽 또는 왼쪽으로 치우쳤는지 판단
        if offset > threshold:
            tree_results.append("수관이 오른쪽으로 치우침")
        elif offset < -threshold:
            tree_results.append("수관이 왼쪽으로 치우침")

    # 가지 있음, 잎 없음 판단 로직 추가
    has_branch = False
    has_leaf = False

    for item in data:
        if item["class"] == "가지":
            has_branch = True
        elif item["class"] == "나뭇잎":
            has_leaf = True

    # 가지가 있지만 잎이 없으면 "가지 있음 잎 없음"을 tree_results에 추가
    if has_branch and not has_leaf:
        tree_results.append("가지 있음 잎 없음")

    root_exists = False

    for item in data:
        if item["class"] == "뿌리":
            root_exists = True
            break

    # 뿌리가 있으면 "뿌리", 없으면 "뿌리 없음"을 tree_results에 추가
    if root_exists:
        tree_results.append("뿌리")
    else:
        tree_results.append("뿌리 없음")

    try:
        with open(output_file_path, "r", encoding='utf-8') as f:
            interpreter = json.load(f)
    except UnicodeDecodeError as e:
        print(f"오류 발생: {e}")
        return
    
    jsonl_file_path = "Interpretations.jsonl"
    with open(jsonl_file_path, "r", encoding='utf-8') as jsonl_file:
        for line in jsonl_file:
            record = json.loads(line)
            if record["inputs"] in tree_results:
                key = record["inputs"]
                value = record["response"]
                interpreter["나무"][key] = value
    
    try:
        with open(output_file_path, "w", encoding='utf-8') as f:
            json.dump(interpreter, f, ensure_ascii=False, indent=4)
    except Exception as e:
        print(f"파일을 저장하는 도중 오류 발생: {e}")
        