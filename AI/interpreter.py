from label.label import Analyzer
from Test.House_algorithm import analyze_house
from Test.Tree_algorithm import analyze_tree
from Test.Person_algorithm import analyze_person  # Person 분석 모듈 가져오기
import cv2
import json

def analyze_house_image(yolo_model_path, image_path):
    house_class_map = {
        0: '집전체',
        1: '지붕',
        2: '외벽',
        3: '문',
        4: '창문',
        5: '굴뚝',
        6: '연기',
        7: '울타리'
    }
    # YOLO 분석기 초기화
    yolo_analyzer = Analyzer(yolo_model_path, house_class_map)

    # 이미지 분석
    house = yolo_analyzer.analyze_image(image_path)

    # JSON 형식으로 변환
    house_result = json.dumps(house, ensure_ascii=False, indent=4)

    # 분석 결과 반환
    result = analyze_house(house_result)
    return result

def analyze_tree_image(yolo_model_path, image_path):
    tree_class_map = {
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
    
    yolo_analyzer = Analyzer(yolo_model_path, tree_class_map)

    # 이미지 분석
    tree = yolo_analyzer.analyze_image(image_path)

    # JSON 형식으로 변환
    tree_result = json.dumps(tree, ensure_ascii=False, indent=4)

    # 분석 결과 반환
    result = analyze_tree(tree_result)
    return result

def analyze_person_image(yolo_model_path, image_path):
    person_class_map = {
        0: '사람',
        1: '머리',
        2: '얼굴',
        3: '눈',
        4: '코',
        5: '입',
        6: '귀',
        7: '머리카락',
        8: '목',
        9: '상체',
        10: '팔',
        11: '손',
        12: '다리',
        13: '발',
        14: '단추'
    }
    
    # YOLO 분석기 초기화
    yolo_analyzer = Analyzer(yolo_model_path, person_class_map)

    # 이미지 분석
    person = yolo_analyzer.analyze_image(image_path)

    # JSON 형식으로 변환
    person_result = json.dumps(person, ensure_ascii=False, indent=4)

    # 분석 결과 반환
    result = analyze_person(person_result)
    return result

