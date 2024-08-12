import json

class InterpretationMatcher:
    def __init__(self):
        self.interpretations = {
            "뿌리": {
                "뿌리 있음": "내적으로 느끼는 자신에 대한 안정감, 자신의 근본적 모습",
                "뿌리 없음": "현실속에서 자신에 대한 불안정감, 자신없음",
                "뿌리 강조": "불안정하기에 버티려는 의도, 불안정감으로 이에 대한 과도한 보상 시도",
                "도화지 가장자리 뿌리": "불안정감, 안정에 대한 욕구를 의미",
                "뿌리가 없으며, 땅이 존재": "내적자기와의 단절감 느끼나 어느정도 안정감 느낌"
            }
        }


    def match_interpretation(self, detected_objects):
        results = {}
        for obj in detected_objects:
            class_name = obj["class"]
            if class_name in self.interpretations:
                results[class_name] = self.interpretations[class_name]
        return results

    def get_interpretation(self, predictions):
        matched_interpretations = self.match_interpretation(predictions)

        # 해석
        if "뿌리" in matched_interpretations:
            return {
                "뿌리" : self.interpretations['뿌리']['뿌리 있음']
            }
        else:
            if any(obj["class"] == "땅" for obj in predictions):
                return self.interpretations['뿌리']['뿌리가 없으며, 땅이 존재']
            else:
                return None