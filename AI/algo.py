import json
from grid import ImageGrid
# 파일 경로 설정
file_path = '/home/byunggyu/transform/yolo_data/predictions_1723461534_4550.json'

# 파일을 읽고 JSON 데이터를 파싱
with open(file_path, 'r') as file:
    data = json.load(file)
    
predictions = data["predictions"]

# 꽃과 열매의 개수를 세는 변수 초기화
flower_count = 0
fruit_count = 0
max_leaf_area = 0
max_branch_area = 0
# 데이터를 순회하며 꽃과 열매의 개수를 셈
for item in predictions:
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

for item in predictions:
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

for item in predictions:
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

for item in predictions:
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
    for item in predictions:
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

for item in predictions:
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

for item in predictions:
    if item["class"] == "가지":
        has_branch = True
    elif item["class"] == "나뭇잎":
        has_leaf = True

# 가지가 있지만 잎이 없으면 "가지 있음 잎 없음"을 tree_results에 추가
if has_branch and not has_leaf:
    tree_results.append("가지 있음 잎 없음")

root_exists = False

for item in predictions:
    if item["class"] == "뿌리":
        root_exists = True
        break

# 뿌리가 있으면 "뿌리", 없으면 "뿌리 없음"을 tree_results에 추가
if root_exists:
    tree_results.append("뿌리")
else:
    tree_results.append("뿌리 없음")


# "나무전체"의 bbox를 찾음
tree_bbox = None
for item in predictions:
    if item["class"] == "나무전체":
        tree_bbox = item["bbox"][0]
        break  # 나무전체는 하나만 있을 것으로 가정하고, 찾으면 루프 종료

if tree_bbox:
    image_grid = ImageGrid([1280, 1280])  # 이미지 크기를 [height, width]로 전달
    position = image_grid.get_cell_occupancy(tree_bbox[0], tree_bbox[1], tree_bbox[2], tree_bbox[3])

    if position and position not in tree_results:
        tree_results.append(position)


# 결과 출력
print(tree_results)


jsonl_file_path = '/home/byunggyu/transform/Interpretations.jsonl'

# 빈 딕셔너리 생성 (결과 저장용)
output_data = {}

# JSONL 파일 읽기
with open(jsonl_file_path, 'r', encoding='utf-8') as file:
    for line in file:
        record = json.loads(line)
        if record["inputs"] in tree_results:
            key = record["inputs"]
            value = record["response"]
            output_data[key] = value

# 결과를 JSON 파일로 내보내기
output_file_path = 'output.json'
with open(output_file_path, 'w', encoding='utf-8') as output_file:
    json.dump(output_data, output_file, ensure_ascii=False, indent=4)

print(f"JSON 파일이 {output_file_path}에 저장되었습니다.")

"""
# 판단 기준:
# 1. 열매나 나뭇잎이 3개 이상이면 "많은"으로 간주하고 tree_results에 "많은 꽃" 또는 "많은 열매"로 담습니다.
# 2. 나뭇잎이나 꽃이 이미지 전체 높이의 하단 30% 영역에 위치하면 땅에 떨어져 있는 것으로 간주하고 tree_results에 "떨어진 나뭇잎" 또는 "떨어진 꽃"으로 담습니다.
# 3. 기둥의 높이가 나무 전체 높이의 70% 이상이고, 기둥의 면적이 나무 전체 면적의 35% 이상일 경우 "큰 기둥"으로 간주하여 tree_results에 "큰 기둥"으로 담습니다.
# 4. 상록수는 수관과 기둥이 겹치는 영역이 수관 전체 면적의 40% 이상일 때 "상록수"로 판단하여 tree_results에 담습니다.
# 5. 수관과 나뭇잎이 모두 없는 경우 "고목나무"로 판단하여 tree_results에 담습니다.
# 6. 상록수와 고목나무에 해당하지 않는 경우 "활엽수"로 간주하여 tree_results에 담습니다.
# 7. 수관과 나뭇잎의 50% 이상이 겹치는 경우 tree_results에 "수관에 있는 나뭇잎"을 추가합니다.
# 8. 달이나 별이 이미지에 있으면 tree_results에 각각 "달" 또는 "별"을 추가합니다.
# 9. 가지에 비해 지나치게 큰 잎이 있을 경우 tree_results에 "가지에 비해 지나치게 큰 잎"을 추가합니다.
# 10. 가지의 면적이 나무 전체 면적의 10% 이상이고, 기둥의 높이가 나무 전체 높이의 70% 이상이며, 기둥의 높이/너비 비율이 10 이상이면 "큰 가지 크고 좁은 기둥"으로 간주하여 tree_results에 추가합니다.
# 11. 수관의 가로 길이가 기둥의 넓이보다 3배 이상이면 tree_results에 "넓은 수관"을 추가합니다.
# 12. 수관의 넓이가 기둥의 넓이 * 1.3보다 작을 때 tree_results에 "좁은 수관"을 추가합니다.
# 13. 수관의 중심이 기둥의 중심보다  10%오른쪽에 있으면 "수관이 오른쪽으로 치우침", 왼쪽에 있으면 "수관이 왼쪽으로 치우침"을 tree_results에 추가합니다.
"""