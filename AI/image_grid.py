class ImageGrid:
    def __init__(self, image_size):
        self.image_width = image_size['width']
        self.image_height = image_size['height']
        self.grid_size = 3

        self.interpretations = {
            "중앙 위치": {
                "특성": ["적정수준의 안정감을 느끼고 있음을 반영"]
            },
            "위쪽": {
                "크기": "작게",
                "특성": [
                    "에너지 수준 낮음",
                    "자기 통찰 부족",
                    "자신감 없음",
                    "자존감 낮음",
                    "상황 맞지 않게 낙천적"
                ]
            },
            "위쪽에 치우친": {
                "특성": [
                    "욕구, 포부 수준 높음",
                    "어려운 목표 설정으로 갈등",
                    "스트레스",
                    "공상 속에서 만족 추구 경향",
                    "과도한 낙관주의",
                    "대인관계, 사회적 상황에 대한 지나친 무관심",
                    "고립적 경향"
                ]
            },
            "아래쪽에 치우친": {
                "특성": [
                    "내면에 상당한 불안정감/부적절감",
                    "우울증적 상태",
                    "공상 자주 빠짐"
                ]
            },
            "오른쪽에 치우친": {
                "특성": [
                    "좀 더 안정되어 있음",
                    "행동 통제 잘함",
                    "욕구 만족 지연 능력 갖추어짐",
                    "지적 만족감 선호 경향",
                    "억제적 경향 반영"
                ]
            },
            "왼쪽에 치우친": {
                "특성": [
                    "충동적으로 행동 경향",
                    "욕구 충동의 즉각적 만족 추구 경향",
                    "변화 욕구",
                    "외향성 반영"
                ]
            },
            "왼쪽 상단": {
                "특성": [
                    "내면에 퇴행적 공상 (정신분열적, 자폐적 공상)",
                    "불안정감",
                    "위축감",
                    "불안감 시사"
                ]
            },
            "오른쪽 상단": {
                "특성": [
                    "불쾌한 기억 억압 바람",
                    "미래에 과도한 낙관주의",
                    "미래 지향적인 환상"
                ]
            },
            "왼쪽 하단 구석": {
                "특성": [
                    "과거 관련한 우울감"
                ]
            },
            "오른쪽 하단 구석": {
                "특성": [
                    "미래와 관련된 무망감"
                ]
            },
            "밑바닥, 가장자리": {
                "특성": [
                    "불안정감",
                    "자신감 없음",
                    "지지 욕구",
                    "의존 경향",
                    "독립에 두려움",
                    "새 경험 회피 경향",
                    "환상 머물려는 경향"
                ]
            }
        }

    def get_cell_occupancy(self, x1, y1, x2, y2):

        # 그리드의 각 셀의 크기 계산
        cell_width = self.image_width / self.grid_size
        cell_height = self.image_height / self.grid_size

        # bounding box의 중앙 좌표 계산
        center_x = (x1 + x2) / 2
        center_y = (y1 + y2) / 2

        # 중앙 좌표가 위치한 셀의 인덱스 계산
        cell_x_index = int(center_x // cell_width)
        cell_y_index = int(center_y // cell_height)

        # 인덱스가 그리드 범위를 초과하지 않도록 보정
        cell_x_index = min(cell_x_index, self.grid_size - 1)
        cell_y_index = min(cell_y_index, self.grid_size - 1)

        # bounding box의 크기 계산
        box_width = x2 - x1
        box_height = y2 - y1
        size_ratio = (box_width * box_height) / (self.image_width * self.image_height)

        # 해석 결정
        interpretation = self.determine_interpretation(cell_x_index, cell_y_index, size_ratio)

        return interpretation

    def determine_interpretation(self, col, row, size_ratio):
        position = ""
        if row == 0:
            if col == 1:
                position = "위쪽에 치우친"
                interpretation = self.interpretations["위쪽에 치우친"]
            elif col == 0:
                position = "왼쪽 상단"
                interpretation = self.interpretations["왼쪽 상단"]
            elif col == 2:
                position = "오른쪽 상단"
                interpretation = self.interpretations["오른쪽 상단"]
            elif size_ratio < 0.1:
                position = "위쪽"
                interpretation = self.interpretations["위쪽"]
        elif row == 1:
            if col == 0:
                position = "왼쪽에 치우친"
                interpretation = self.interpretations["왼쪽에 치우친"]
            elif col == 1:
                position = "중앙 위치"
                interpretation = self.interpretations["중앙 위치"]
            elif col == 2:
                position = "오른쪽에 치우친"
                interpretation = self.interpretations["오른쪽에 치우친"]
        elif row == 2:
            if col == 1:
                position = "아래쪽에 치우친"
                interpretation = self.interpretations["아래쪽에 치우친"]
            elif col == 0:
                position = "왼쪽 하단 구석"
                interpretation = self.interpretations["왼쪽 하단 구석"]
            elif col == 2:
                position = "오른쪽 하단 구석"
                interpretation = self.interpretations["오른쪽 하단 구석"]

        return {
            position: interpretation["특성"] if "특성" in interpretation else interpretation
        }
