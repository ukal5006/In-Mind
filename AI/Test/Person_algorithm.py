import json

def analyze_person(person_result):
    # JSON 형식의 데이터를 파싱
    data = json.loads(person_result)
    
    predictions = data["predictions"]
    image_width, image_height = data["image_size"]["width"], data["image_size"]["height"]

    # 필요한 변수를 초기화
    head_bbox = None
    eye_bboxes = []
    nose_bbox = None
    face_bbox = None
    mouth_bbox = None
    ear_bboxes = []
    hair_found = False
    neck_bbox = None 
    neck_found = False
    upper_body_bbox = None
    upper_body_found = False
    arm_bboxes = []
    arms_found = 0
    hand_bboxes = []
    hands_found = 0
    leg_bboxes = []
    legs_found = 0
    foot_bboxes = []
    feet_found = 0 
    button_found = False

    person_results = []

    # predictions를 순회하며 필요한 데이터를 추출
    for prediction in predictions:
        if prediction["class"] == "머리":
            head_bbox = prediction["bbox"][0]
        elif prediction["class"] == "눈":
            eye_bboxes.append(prediction["bbox"][0])
        elif prediction["class"] == "코":
            nose_bbox = prediction["bbox"][0]
        elif prediction["class"] == "얼굴":
            face_bbox = prediction["bbox"][0]
        elif prediction["class"] == "입":
            mouth_bbox = prediction["bbox"][0]
        elif prediction["class"] == "귀":
            ear_bboxes.append(prediction["bbox"][0])
        elif prediction["class"] == "머리카락":
            hair_found = True
        elif prediction["class"] == "목":
            neck_bbox = prediction["bbox"][0]
            neck_found = True
        elif prediction["class"] == "상체":
            upper_body_bbox = prediction["bbox"][0]
            upper_body_found = True
        elif prediction["class"] == "팔":
            arm_bboxes.append(prediction["bbox"][0])
            arms_found += 1
        elif prediction["class"] == "손":
            hand_bboxes.append(prediction["bbox"][0])
            hands_found += 1
        elif prediction["class"] == "다리":
            leg_bboxes.append(prediction["bbox"][0])
            legs_found += 1
        elif prediction["class"] == "발":
            foot_bboxes.append(prediction["bbox"][0])
            feet_found += 1
        elif prediction["class"] == "단추":
            button_found = True

    # 머리 크기 계산
    if head_bbox:
        head_height = head_bbox[3] - head_bbox[1]
        head_area = (head_bbox[2] - head_bbox[0]) * head_height

    # 눈의 개수에 따른 판단 (눈이 없거나 1개의 눈)
    if len(eye_bboxes) == 0 or len(eye_bboxes) == 1:
        person_results.append("눈이 없거나 1개의 눈")

    # 눈 크기 및 비대칭성 판단
    small_eye_added = False  # 작은 눈이 이미 추가되었는지 확인하는 플래그

    for eye_bbox in eye_bboxes:
        eye_width = eye_bbox[2] - eye_bbox[0]
        eye_height = eye_bbox[3] - eye_bbox[1]
        eye_area = eye_width * eye_height
        
        # 큰 눈 판단
        if eye_area >= 0.1 * head_area:
            person_results.append("큰 눈")
        # 작은 눈 판단
        elif eye_area <= 0.02 * head_area and not small_eye_added:
            person_results.append("작은 눈")
            small_eye_added = True  # 작은 눈이 추가되었음을 기록

    # 눈의 비대칭성 판단 (수직 차이)
    if len(eye_bboxes) == 2:
        left_eye, right_eye = eye_bboxes
        left_eye_center_y = (left_eye[1] + left_eye[3]) / 2
        right_eye_center_y = (right_eye[1] + right_eye[3]) / 2
        
        # 수직 위치 차이 계산
        vertical_diff = abs(left_eye_center_y - right_eye_center_y)
        
        # 비대칭 판단 (수직 차이가 머리 높이의 10% 이상일 경우)
        if vertical_diff > head_height * 0.1:
            person_results.append("눈 비대칭")

    # 코 판단
    if nose_bbox:
        # 얼굴이 있는 경우, 코의 크기를 얼굴 크기와 비교
        if face_bbox:
            nose_area = (nose_bbox[2] - nose_bbox[0]) * (nose_bbox[3] - nose_bbox[1])
            face_area = (face_bbox[2] - face_bbox[0]) * (face_bbox[3] - face_bbox[1])
            
            # 코가 얼굴 크기의 15% 이상이면 큰 코로 판단
            if nose_area >= 0.15 * face_area:
                person_results.append("코가 크다")
    else:
        person_results.append("코가 없음")

    # 입 판단
    if mouth_bbox:
        # 얼굴이 있는 경우, 입의 크기를 얼굴 크기와 비교
        if face_bbox:
            mouth_area = (mouth_bbox[2] - mouth_bbox[0]) * (mouth_bbox[3] - mouth_bbox[1])
            face_area = (face_bbox[2] - face_bbox[0]) * (face_bbox[3] - face_bbox[1])
            
            # 입이 얼굴 크기의 15% 이상이면 큰 입으로 판단
            if mouth_area >= 0.15 * face_area:
                person_results.append("큰 입")
            # 입이 얼굴 크기의 2% 이하이면 작은 입으로 판단
            elif mouth_area <= 0.02 * face_area:
                person_results.append("작은 입")
    else:
        person_results.append("입 없음")

    # 귀 비대칭성 판단 (수직 차이)
    if len(ear_bboxes) == 2:
        left_ear, right_ear = ear_bboxes
        left_ear_center_y = (left_ear[1] + left_ear[3]) / 2
        right_ear_center_y = (right_ear[1] + right_ear[3]) / 2
        
        # 수직 위치 차이 계산
        ear_vertical_diff = abs(left_ear_center_y - right_ear_center_y)
        
        # 비대칭 판단 (수직 차이가 머리 높이의 10% 이상일 경우)
        if ear_vertical_diff > head_height * 0.1:
            person_results.append("귀 비대칭")
            
    # 머리카락 여부 판단
    if not hair_found:
        person_results.append("머리카락 없음")

    # 목 판단
    if not neck_found:
        person_results.append("목 없음")
    elif neck_bbox and face_bbox:
        neck_height = neck_bbox[3] - neck_bbox[1]
        neck_width = neck_bbox[2] - neck_bbox[0]
        face_height = face_bbox[3] - face_bbox[1]
        face_width = face_bbox[2] - face_bbox[0]
        
        # 긴 목 판단 (목 높이가 얼굴 높이의 80% 이상)
        if neck_height >= 0.8 * face_height:
            person_results.append("긴 목")
        # 짧은 목 판단 (목 높이가 얼굴 높이의 30% 이하)
        elif neck_height <= 0.3 * face_height:
            # 넓고 굵은 목 판단 (목이 짧으면서 넓은 경우)
            if neck_width >= 0.8 * face_width:
                person_results.append("짧고 굵은 목")
            else:
                person_results.append("짧은 목")
        # 넓고 굵은 목 판단 (목이 짧지 않으면서 넓은 경우)
        elif neck_width >= 0.8 * face_width:
            person_results.append("넓고 굵은 목")
            
    # 상체 판단
    if not upper_body_found:
        person_results.append("상체 생략")
    elif upper_body_bbox and head_bbox:
        upper_body_height = upper_body_bbox[3] - upper_body_bbox[1]
        upper_body_width = upper_body_bbox[2] - upper_body_bbox[0]
        head_height = head_bbox[3] - head_bbox[1]
        head_width = head_bbox[2] - head_bbox[0]
        
        # 길고 가는 상체 판단 (상체 높이가 머리 높이의 3배 이상이고, 상체 너비가 머리 너비의 1.5배 이하일 때)
        if upper_body_height >= 3 * head_height and upper_body_width <= 1.5 * head_width:
            person_results.append("길고 가는 상체")
        # 매우 큰 상체 판단 (상체 높이와 너비 모두 머리의 3배 이상일 때)
        elif upper_body_height >= 3 * head_height and upper_body_width >= 3 * head_width:
            person_results.append("매우 큰 상체")
            
    # 팔 판단
    if arms_found == 0:
        person_results.append("생략된 팔")
    elif arms_found == 1:
        person_results.append("1개의 팔")
    elif arms_found == 2:
        left_arm, right_arm = arm_bboxes
        left_arm_area = (left_arm[2] - left_arm[0]) * (left_arm[3] - left_arm[1])
        right_arm_area = (right_arm[2] - right_arm[0]) * (right_arm[3] - right_arm[1])

        # 긴 팔 판단 (팔의 높이가 머리 높이의 1.5배 이상일 때)
        if max(left_arm[3] - left_arm[1], right_arm[3] - right_arm[1]) >= 1.5 * head_height:
            person_results.append("긴 팔")

        # 다른 크기의 팔 판단 (팔의 크기가 1.4배 이상 차이날 때)
        if max(left_arm_area, right_arm_area) >= 1.4 * min(left_arm_area, right_arm_area):
            person_results.append("다른 크기의 팔")

    # 팔과 손의 생략 판단
    if arms_found == 0 and hands_found == 0:
        person_results.append("팔과 손의 생략")

    # 한 손 또는 생략 판단
    if hands_found == 0:
        person_results.append("손 생략")
    elif hands_found == 1:
        person_results.append("한 손")

    # 큰 손과 작은 손 판단
    if hands_found >= 2:
        for hand_bbox in hand_bboxes:
            hand_width = hand_bbox[2] - hand_bbox[0]
            hand_height = hand_bbox[3] - hand_bbox[1]
            hand_area = hand_width * hand_height

            if upper_body_bbox:
                upper_body_area = (upper_body_bbox[2] - upper_body_bbox[0]) * (upper_body_bbox[3] - upper_body_bbox[1])
                
                # 큰 손 판단 (손이 상체 면적의 15% 이상일 때)
                if hand_area >= 0.15 * upper_body_area:
                    person_results.append("큰 손")
                # 작은 손 판단 (손이 상체 면적의 5% 이하일 때)
                elif hand_area <= 0.05 * upper_body_area:
                    person_results.append("작은 손")
                    
    # 다리 생략 판단
    if legs_found == 0:
        person_results.append("다리 생략")

    # 너무 긴 다리와 짧고 가는 다리 판단
    if legs_found >= 1:
        for leg_bbox in leg_bboxes:
            leg_height = leg_bbox[3] - leg_bbox[1]
            leg_width = leg_bbox[2] - leg_bbox[0]

            if upper_body_bbox:
                upper_body_height = upper_body_bbox[3] - upper_body_bbox[1]
                upper_body_width = upper_body_bbox[2] - upper_body_bbox[0]
                
                # 너무 긴 다리 판단 (다리 높이가 상체 높이의 1.5배 이상일 때)
                if leg_height >= 1.5 * upper_body_height:
                    person_results.append("너무 긴 다리")
                # 짧고 가는 다리 판단 (다리 높이가 상체 높이의 0.5배 이하이고, 다리 너비가 상체 너비의 0.5배 이하일 때)
                elif leg_height <= 0.5 * upper_body_height and leg_width <= 0.5 * upper_body_width:
                    person_results.append("짧고 가는 다리")

    # 두 발 생략 판단
    if feet_found == 0:
        person_results.append("두 발 생략")
    elif feet_found == 1:
        person_results.append("한 발")

    # 큰 발, 작은 발, 매우 긴 발 판단
    if feet_found >= 1:
        for foot_bbox in foot_bboxes:
            foot_area = (foot_bbox[2] - foot_bbox[0]) * (foot_bbox[3] - foot_bbox[1])  # 발의 면적
            foot_length = foot_bbox[2] - foot_bbox[0]  # 발의 길이
            foot_width = foot_bbox[3] - foot_bbox[1]   # 발의 너비

            if upper_body_bbox:
                upper_body_area = (upper_body_bbox[2] - upper_body_bbox[0]) * (upper_body_bbox[3] - upper_body_bbox[1])
                upper_body_height = upper_body_bbox[3] - upper_body_bbox[1]
                
                # 큰 발 판단 (발 면적이 상체 면적의 30% 이상일 때)
                if foot_area >= 0.3 * upper_body_area and "큰 발" not in person_results:
                    person_results.append("큰 발")
                # 작은 발 판단 (발 면적이 상체 면적의 10% 이하일 때)
                elif foot_area <= 0.1 * upper_body_area and "작은 발" not in person_results:
                    person_results.append("작은 발")
                # 매우 긴 발 판단 (발의 너비가 상체의 높이보다 40% 이상일 때)
                if foot_width >= 0.4 * upper_body_height and "매우 긴 발" not in person_results:
                    person_results.append("매우 긴 발")

    # 단추 존재 여부 판단
    if button_found:
        person_results.append("단추")
    
    # 인물 크기 평가
    for prediction in predictions:
        if prediction["class"] == "사람":
            person_bbox = prediction["bbox"][0]
            person_width = person_bbox[2] - person_bbox[0]
            person_height = person_bbox[3] - person_bbox[1]
            person_area = person_width * person_height

            # 전체 이미지 면적을 계산합니다.
            image_area = image_width * image_height

            # 인물 크기 평가
            if 0.05 * image_area <= person_area <= 0.3 * image_area:
                person_results.append("크기 보통")
            elif person_area < 0.05 * image_area:
                person_results.append("보통보다 훨씬 작은 인물상")
            elif person_area > 0.3 * image_area:
                person_results.append("매우 큰 인물상")
            elif person_area < 0.03 * image_area:
                person_results.append("매우 작은 그림")

            # 도화지 상부에 지나치게 작은 그림이 그려진 경우
            if person_area < 0.03 * image_area and person_bbox[1] < 0.1 * image_height:
                person_results.append("도화지 상부에 지나치게 작은 그림이 그려짐")
                
    return person_results
