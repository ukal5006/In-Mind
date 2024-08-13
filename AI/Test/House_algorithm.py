import json
from Test.grid import ImageGrid

def analyze_house(house_result):
    # JSON 형식의 데이터를 파싱
    data = json.loads(house_result)
    
    predictions = data["predictions"]

    # 필요한 변수를 초기화
    house_results = []
    house_bbox = None
    wall_bbox = None
    roof_bbox = None
    chimney_bbox = None
    window_count = 0
    too_small_window_found = False
    door_count = 0
    smoke_found = False
    fence_found = False

    # predictions를 한 번만 순회하면서 필요한 데이터를 모두 추출
    for prediction in predictions:
        if prediction["class"] == "집전체":
            house_bbox = prediction["bbox"][0]
        elif prediction["class"] == "외벽":
            wall_bbox = prediction["bbox"][0]
        elif prediction["class"] == "지붕":
            roof_bbox = prediction["bbox"][0]
        elif prediction["class"] == "굴뚝":
            chimney_bbox = prediction["bbox"][0]
        elif prediction["class"] == "창문":
            window_count += 1
            if wall_bbox:
                window_bbox = prediction["bbox"][0]
                window_area = (window_bbox[2] - window_bbox[0]) * (window_bbox[3] - window_bbox[1])
                wall_area = (wall_bbox[2] - wall_bbox[0]) * (wall_bbox[3] - wall_bbox[1])
                if window_area < 0.03 * wall_area:
                    too_small_window_found = True
        elif prediction["class"] == "문":
            door_count += 1
        elif prediction["class"] == "연기":
            smoke_found = True
        elif prediction["class"] == "울타리":
            fence_found = True

    # 창문 개수에 따른 결과 결정
    if window_count == 0:
        house_results.append('창문 없음')
    elif window_count >= 4:
        house_results.append('너무 많은 창문')
    else:
        house_results.append('창문')

    # 너무 작은 창문이 있는지 확인
    if too_small_window_found:
        house_results.append('너무 작은 창문')

    # 문 개수에 따른 결과 결정
    if door_count > 1:
        house_results.append('문이 여러개')
    elif door_count == 1:
        house_results.append('문')
    elif door_count == 0:
        house_results.append('문이 없음')

    # 굴뚝과 연기에 따른 결과 결정
    if chimney_bbox:
        if roof_bbox:
            chimney_area = (chimney_bbox[2] - chimney_bbox[0]) * (chimney_bbox[3] - chimney_bbox[1])
            roof_area = (roof_bbox[2] - roof_bbox[0]) * (roof_bbox[3] - roof_bbox[1])
            if chimney_area > 0.25 * roof_area:
                house_results.append('큰 굴뚝')
            else:
                house_results.append('굴뚝')
        else:
            house_results.append('굴뚝')
    else:
        house_results.append('굴뚝 없음')

    if smoke_found:
        house_results.append('굴뚝연기')

    # 울타리에 따른 결과 결정
    if fence_found:
        house_results.append('울타리')
        
    # 지붕과 외벽의 넓이를 비교하여 너무 큰 지붕인지 판단
    if roof_bbox and wall_bbox:
        roof_area = (roof_bbox[2] - roof_bbox[0]) * (roof_bbox[3] - roof_bbox[1])
        wall_area = (wall_bbox[2] - wall_bbox[0]) * (wall_bbox[3] - wall_bbox[1])
        if roof_area > 1.8 * wall_area:
            house_results.append('너무 큰 지붕')

    # "나무전체" 위치를 그리드 셀로 변환하여 추가
    image_grid = ImageGrid([1280, 1280])
    if wall_bbox:
        position = image_grid.get_cell_occupancy(wall_bbox[0], wall_bbox[1], wall_bbox[2], wall_bbox[3])
        if position and position not in house_results:
            house_results.append(position)
    else:
        position = image_grid.get_cell_occupancy(house_bbox[0], house_bbox[1], house_bbox[2], house_bbox[3])
        if position and position not in house_results:
            house_results.append(position)

    return house_results
