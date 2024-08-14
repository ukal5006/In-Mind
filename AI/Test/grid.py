# ImageGrid 클래스 정의
class ImageGrid:
    def __init__(self, image_size):
        self.image_width = image_size[1]
        self.image_height = image_size[0]
        self.grid_size = 3

    def get_cell_occupancy(self, x1, y1, x2, y2):
        # 중앙 셀의 크기를 이미지 크기의 50%로 설정
        central_cell_width = self.image_width * 0.5
        central_cell_height = self.image_height * 0.5

        # 나머지 셀의 크기는 남은 공간을 2등분하여 계산
        side_cell_width = (self.image_width - central_cell_width) / 2
        side_cell_height = (self.image_height - central_cell_height) / 2

        # bounding box의 중앙 좌표 계산
        center_x = (x1 + x2) / 2
        center_y = (y1 + y2) / 2

        # 중앙 좌표가 위치한 셀의 인덱스 계산
        if center_x < side_cell_width:
            cell_x_index = 0  # 왼쪽
        elif center_x > side_cell_width + central_cell_width:
            cell_x_index = 2  # 오른쪽
        else:
            cell_x_index = 1  # 중앙

        if center_y < side_cell_height:
            cell_y_index = 0  # 위쪽
        elif center_y > side_cell_height + central_cell_height:
            cell_y_index = 2  # 아래쪽
        else:
            cell_y_index = 1  # 중앙

        # 해석 결정
        position = ""
        if cell_y_index == 0:
            if cell_x_index == 1:
                position = "위쪽에 치우친"
            elif cell_x_index == 0:
                position = "왼쪽 상단"
            elif cell_x_index == 2:
                position = "오른쪽 상단"
        elif cell_y_index == 1:
            if cell_x_index == 0:
                position = "왼쪽에 치우친"
            elif cell_x_index == 1:
                position = "중앙 위치"
            elif cell_x_index == 2:
                position = "오른쪽에 치우친"
        elif cell_y_index == 2:
            if cell_x_index == 1:
                position = "아래쪽에 치우친"
            elif cell_x_index == 0:
                position = "왼쪽 하단 구석"
            elif cell_x_index == 2:
                position = "오른쪽 하단 구석"

        return position
