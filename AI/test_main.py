from interpreter import analyze_house_image, analyze_tree_image, analyze_person_image
import json

# 모델 경로 설정
house_model_path = '/home/byunggyu/HTP_Project/S11P12B301/AI/PT_Files/house_best.onnx'
tree_model_path = '/home/byunggyu/HTP_Project/S11P12B301/AI/PT_Files/tree_best.onnx'
person_model_path = '/home/byunggyu/HTP_Project/S11P12B301/AI/PT_Files/person_best.onnx'

# 테스트용 이미지 경로 설정
house_image_path = '/home/byunggyu/transform/집_7_남_04487.jpg'  # 여기에 실제 로컬 이미지 경로를 넣으세요
tree_image_path = '/home/byunggyu/transform/tree_files/tree_00000.jpg'    # 여기에 실제 로컬 이미지 경로를 넣으세요
person_image_path = '/home/byunggyu/transform/남자사람_8_남_13433.jpg'  # 여기에 실제 로컬 이미지 경로를 넣으세요

# 해석 파일 경로 설정
house_interpretations_path = '/home/byunggyu/HTP_Project/S11P12B301/AI/jsonl/House_interpretations.jsonl'
tree_interpretations_path = '/home/byunggyu/HTP_Project/S11P12B301/AI/jsonl/Tree_Interpretations.jsonl'
person_interpretations_path = '/home/byunggyu/HTP_Project/S11P12B301/AI/jsonl/Person_Interpretations.jsonl'

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

def test_analyze_house():
    print("House Image Analysis")
    result = analyze_house_image(house_model_path, house_image_path)
    print(result)
    print("============================================")
    return result

def test_analyze_tree():
    print("Tree Image Analysis")
    result = analyze_tree_image(tree_model_path, tree_image_path)
    print(result)
    print("============================================")
    return result

def test_analyze_person():
    print("Person Image Analysis")
    result = analyze_person_image(person_model_path, person_image_path)
    print(result)
    print("============================================")
    return result

if __name__ == "__main__":
    # 집, 나무, 사람 결과를 테스트하고 해석 추가
    house_results = test_analyze_house()
    tree_results = test_analyze_tree()
    person_results = test_analyze_person()

    # 해석된 JSON 생성
    analysis_json = generate_analysis_json(house_results, tree_results, person_results)

    # JSON 파일로 저장
    output_file_path = '/home/byunggyu/HTP_Project/S11P12B301/AI/results/analysis_results.json'
    with open(output_file_path, 'w', encoding='utf-8') as output_file:
        json.dump(analysis_json, output_file, ensure_ascii=False, indent=4)

    print(f"분석 결과가 {output_file_path}에 저장되었습니다.")
