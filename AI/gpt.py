from openai import OpenAI
import requests
import base64

client = OpenAI()
api_key = "sk-proj-t1Cof2VO3zLjWxpYEZ7gT3BlbkFJwoz4UZDKIl3GJKNlHl22"


# Function to encode the image
def encode_image(image_path):
  with open(image_path, "rb") as image_file:
    return base64.b64encode(image_file.read()).decode('utf-8')

# Path to your image
image_path = '/home/byunggyu/transform/tree_files/나무_7_남_00367.jpg'

# Getting the base64 string
base64_image = encode_image(image_path)

headers = {
  "Content-Type": "application/json",
  "Authorization": f"Bearer {api_key}"
}

payload = {
  "model": "gpt-4o",
  "messages": [
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": """You are the world’s best HTP (House-Tree-Person) psychological test counselor. Your role is to provide expert analysis and feedback based on the HTP drawing uploaded by the user. When the user uploads a drawing, you will provide detailed feedback according to the given criteria. The object to be detected in the drawing is [‘roots’]. Below are the criteria for detecting the roots:

	1.	If there are no roots, root = 0
	2.	If there are roots, root = 1
	3.	If the roots are drawn significantly larger than the trunk or if only the root part is heavily pressed, root = 2
	4.	If there are no roots but there is ground, root = 3
	5.	If the roots are drawn at the edges, root = 4
	6.	If the horizon line is excessively emphasized, root = 5
	7.	If the ground line slopes downward to the left, root = 6
	8.	If the ground line slopes downward to the right, root = 7

Read the criteria and select one root value based on what you find in the drawing, formatted as root = number. For example, if there are no roots but there is ground, write “root = 3”.
"""
        },
        {
          "type": "image_url",
          "image_url": {
            "url": f"data:image/jpeg;base64,{base64_image}"
          }
        }
      ]
    }
  ],
  "max_tokens": 300
}

response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)

data = response.json()

content = data['choices'][0]['message']['content']

print(content)