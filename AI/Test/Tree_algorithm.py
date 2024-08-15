import json
from Test.grid import ImageGrid

def analyze_tree(tree_result):
    # JSON 형식의 데이터를 파싱
    data = json.loads(tree_result)
    
    predictions = data["predictions"]

    # 결과를 담을 리스트 초기화
    tree_results = []

    # 필요한 변수를 초기화
    flower_count = 0
    fruit_count = 0
    max_leaf_area = 0
    max_branch_area = 0
    leaf_fallen = False
    flower_fallen = False
    trunk_bbox = None
    tree_bbox = None
    canopy_bbox = None
    root_exists = False
    has_branch = False
    has_leaf = False
    moon_or_star_present = False

    image_height = 1280
    ground_level_threshold = image_height * 0.7  # 하단 30%를 땅으로 간주

    # predictions를 한 번 순회하며 필요한 모든 데이터를 수집
    for item in predictions:
        bbox = item.get("bbox", [None])[0]
        
        if item["class"] == "꽃":
            flower_count += 1
            if bbox and bbox[3] >= ground_level_threshold and not flower_fallen:
                tree_results.append("떨어진 꽃")
                flower_fallen = True

        elif item["class"] == "열매":
            fruit_count += 1

        elif item["class"] == "가지":
            if bbox:
                branch_area = (bbox[2] - bbox[0]) * (bbox[3] - bbox[1])
                if branch_area > max_branch_area:
                    max_branch_area = branch_area
            has_branch = True

        elif item["class"] == "나뭇잎":
            if bbox:
                leaf_area = (bbox[2] - bbox[0]) * (bbox[3] - bbox[1])
                if leaf_area > max_leaf_area:
                    max_leaf_area = leaf_area
                if bbox[3] >= ground_level_threshold and not leaf_fallen:
                    tree_results.append("떨어진 나뭇잎")
                    leaf_fallen = True
            has_leaf = True

        elif item["class"] == "기둥":
            trunk_bbox = bbox

        elif item["class"] == "나무전체":
            tree_bbox = bbox

        elif item["class"] == "수관":
            canopy_bbox = bbox

        elif item["class"] == "뿌리":
            root_exists = True

        elif item["class"] in ["달", "별"]:
            moon_or_star_present = True

    # 꽃 개수에 따른 결과 결정
    if flower_count >= 3:
        tree_results.append("많은 꽃")
    elif flower_count > 0:
        tree_results.append("꽃")

    # 열매 개수에 따른 결과 결정
    if fruit_count >= 3:
        tree_results.append("많은 열매")
    elif fruit_count > 0:
        tree_results.append("열매")

    # 가지에 비해 지나치게 큰 잎이 있는지 확인하고 추가
    if max_leaf_area > max_branch_area:
        tree_results.append("가지에 비해 지나치게 큰 잎")

    # 기둥과 나무 전체 면적 및 높이 비율 계산
    if trunk_bbox and tree_bbox:
        trunk_width = trunk_bbox[2] - trunk_bbox[0]
        trunk_height = trunk_bbox[3] - trunk_bbox[1]
        trunk_area = trunk_width * trunk_height

        tree_width = tree_bbox[2] - tree_bbox[0]
        tree_height = tree_bbox[3] - tree_bbox[1]
        tree_area = tree_width * tree_height

        area_ratio = trunk_area / tree_area
        height_ratio = trunk_height / tree_height

        if height_ratio >= 0.7 and area_ratio >= 0.35:
            tree_results.append("큰 기둥")

    # 상록수, 활엽수, 고목 판단 로직 추가
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
        if not canopy_bbox and not has_leaf:
            tree_results.append("고목나무")
        else:
            tree_results.append("활엽수")

    # 수관과 겹치는 나뭇잎 추가
    if canopy_bbox:
        for item in predictions:
            if item["class"] == "나뭇잎":
                leaf_bbox = item["bbox"][0]
                overlap_leaf_area = max(0, min(canopy_bbox[2], leaf_bbox[2]) - max(canopy_bbox[0], leaf_bbox[0])) * \
                                    max(0, min(canopy_bbox[3], leaf_bbox[3]) - max(canopy_bbox[1], leaf_bbox[1]))
                leaf_area = (leaf_bbox[2] - leaf_bbox[0]) * (leaf_bbox[3] - leaf_bbox[1])

                if overlap_leaf_area / leaf_area >= 0.5:
                    tree_results.append("수관에 있는 나뭇잎")

    # 달이나 별이 있는지 확인하고 추가
    if moon_or_star_present:
        tree_results.append("달이나 별")

    # 넓은 수관 및 좁은 수관 판단
    if canopy_bbox and trunk_bbox:
        canopy_width = canopy_bbox[2] - canopy_bbox[0]
        canopy_area = (canopy_bbox[2] - canopy_bbox[0]) * (canopy_bbox[3] - canopy_bbox[1])
        trunk_width = trunk_bbox[2] - trunk_bbox[0]
        trunk_area = (trunk_bbox[2] - trunk_bbox[0]) * (trunk_bbox[3] - trunk_bbox[1])

        if canopy_width >= 3 * trunk_width:
            tree_results.append("넓은 수관")
        if canopy_area < 1.3 * trunk_area:
            tree_results.append("좁은 수관")

    # 수관의 중심이 치우쳤는지 판단
    if canopy_bbox and trunk_bbox:
        canopy_center_x = (canopy_bbox[0] + canopy_bbox[2]) / 2
        trunk_center_x = (trunk_bbox[0] + trunk_bbox[2]) / 2
        offset = canopy_center_x - trunk_center_x
        threshold = trunk_width * 0.2

        if offset > threshold:
            tree_results.append("수관이 오른쪽으로 치우침")
        elif offset < -threshold:
            tree_results.append("수관이 왼쪽으로 치우침")

    # 가지 있음, 잎 없음 판단
    if has_branch and not has_leaf:
        tree_results.append("가지 있음 잎 없음")

    # 뿌리 여부 판단
    if root_exists:
        tree_results.append("뿌리")
    else:
        tree_results.append("뿌리 없음")

    # "나무전체" 위치를 그리드 셀로 변환하여 추가
    if tree_bbox:
        image_grid = ImageGrid([1280, 1280])
        position = image_grid.get_cell_occupancy(tree_bbox[0], tree_bbox[1], tree_bbox[2], tree_bbox[3])
        if position and position not in tree_results:
            tree_results.append(position)

    return tree_results

def get_tree_interpretations(tree_results, jsonl_file_path):
    output_data = {}

    with open(jsonl_file_path, 'r', encoding='utf-8') as file:
        for line in file:
            record = json.loads(line)
            if record["inputs"] in tree_results:
                key = record["inputs"]
                value = record["response"]
                output_data[key] = value

    return output_data