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
image_path = '/home/byunggyu/transform/tree_files/나무_7_남_02956.jpg'

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
          "text": """You are the world's best HTP (House-Tree-Person) psychological test counselor. Your role is to provide expert analysis and feedback based on the HTP drawing uploaded by the user. When the user uploads a drawing, you will provide detailed feedback according to the given criteria.
                    Please detect all the objects in the drawing that match the following criteria:
                    1 Tree drawing
                    2 Evergreen tree (e.g., pine, cedar)
                    3 Deciduous tree
                    4 Willow tree
                    5 Old tree
                    6 Trunk tapering sharply toward the leaves
                    7 Trunk thicker at the top
                    8 Trunk
                    9 Noticeably thick trunk
                    10 Trunk with uniform thickness like a utility pole
                    11 Horizontal branches like a bonsai
                    12 Dead old tree
                    13 Drawing of an old tree with all leaves blown away by wind
                    14 Tree stump
                    15 Trunk drawn with a single line
                    16 Old tree with a few leaves
                    17 Narrow trunk
                    18 Tree drawing with trunk bent downward
                    19 Trunk base overly emphasized
                    20 Trunk with upwardly separated lines not joined at the top
                    21 Trunk outline drawn wavy
                    22 Tree bark
                    23 Tree bark shaded dark
                    24 Detailed tree bark
                    25 Scaly rough or serrated bark
                    26 Bark peeled off
                    27 Thick tree bark
                    28 Excessively detailed tree bark
                    29 Hollow trunk with an animal inside
                    30 Base of the trunk
                    31 Branches that progressively divide from the trunk
                    32 Emphasized trunk outline
                    33 Weak and faint trunk outline
                    34 Trunk swaying in the wind
                    35 Trunk with scars
                    36 Bark with shading only on the left side
                    37 Bark lines drawn rounded and curved
                    38 Drawing of trunk scars knots or hollow holes
                    39 Branch
                    40 Branches thicker toward the ends
                    41 Single-line branches emerging directly from the trunk
                    42 Tree with cut-off branches with open ends
                    43 Branches with sharp spear-like ends or thorn-like attachment to the trunk
                    44 Branches extending upward more than sideways
                    45 Small branches appearing to pierce deep into the trunk
                    46 Right side of the trunk notably emphasized
                    47 Branches not spread out much
                    48 Shading applied properly to the branches
                    49 Tree heavily asymmetrical towards the house
                    50 Tree far away from the house
                    51 Dead branches
                    52 Branches detached or broken
                    53 Thin branches on a thick trunk
                    54 Branches drooping broken or cut off
                    55 Branches pointing inward rather than outward
                    56 Repeatedly drawing branches in a uniform pattern
                    57 Branches significantly larger than the trunk
                    58 Left side of the trunk notably emphasized
                    59 Branches protruding frontally
                    60 Branches without any shading
                    61 Branches extending upward
                    62 New growth sprouting from the trunk
                    63 Swing on the branches
                    64 Treehouse on the branches
                    65 Tree on a hill
                    66 Only part of the trunk drawn or drawing a thick branch
                    67 Drawing support structures for the tree trunk or branches like bonsai
                    68 Very small tree
                    69 Tree leaning to the left
                    70 Branches tapering to a single point at the top
                    71 Trunk expanding at the top
                    72 Branches growing from the base of the trunk
                    73 Wide trunk
                    74 Sharp leaves
                    75 Tree so large it feels cut off by the paper's edge
                    76 Large tree fitting within the paper
                    77 Branches extending outward like paths
                    78 Circular branches or canopy
                    79 Tree leaning to the right
                    80 Tree bent by wind or shedding leaves
                    81 Tree without a trunk
                    82 Narrow trunk
                    83 Leaves shaped like hands
                    84 Large leaves
                    85 Long trunk with small canopy
                    86 Short trunk with large canopy
                    87 Left side of the canopy significantly shaded or emphasized
                    88 Right side of the canopy emphasized
                    89 Canopy edges drooping down like a sack covering the trunk
                    90 Trunk separated from the canopy and emerging from the bottom
                    91 Roots
                    92 Roots visible through the ground
                    93 Emphasized tree roots
                    94 Excessively emphasized ground line
                    95 Ground line sloping downward to the left
                    96 Ground line sloping downward to the right
                    97 Young tree
                    98 Branches within the canopy appearing skeletal and outlined
                    99 Very thin trunk with excessively large canopy
                    100 Left side of the canopy significantly shaded or emphasized
                    101 Right side of the canopy emphasized
                    102 Canopy edges drooping down like a sack covering the trunk
                    103 Trunk separated from the canopy and emerging from the bottom
                    104 Roots
                    105 Roots visible through the ground
                    106 Emphasized tree roots
                    107 Excessively emphasized ground line
                    108 Ground line sloping downward to the left
                    109 Ground line sloping downward to the right
                    110 Young tree
                    111 Branches within the canopy appearing skeletal and outlined
                    112 Very thin trunk with excessively large canopy
                    113 Canopy shaped like cotton or clouds
                    114 Canopy with straight and angular shapes
                    115 Canopy divided into several sections
                    116 Clearly depicted dead roots
                    117 Tree drawn with a continuous line for both trunk and ground line
                    118 Roots drawn at the edge of the paper
                    119 Ground line not horizontal drawn like a hill with a tree on top
                    120 Ground line above the base of the trunk
                    121 Drawing the ground line last and using the paper’s bottom edge as the ground line
                    122 Tree leaves
                    123 Drawing leaves falling from the tree
                    124 Drawing flowers on the tree
                    125 Drawing fruits falling from the tree
                    126 Setting sun
                    127 Drawing clouds between the tree and the sun
                    128 Branches seemingly reaching the sun
                    129 Tree appearing to move away from the sun
                    130 Wind blowing from above to the ground
                    131 Drawing trees within various landscapes
                    132 Squirrel in the tree
                    133 Drawing leaves on the canopy
                    134 Tree with fruits
                    135 Leaves significantly larger compared to the branches
                    136 Tree drawing with the sun
                    137 Tree seemingly dominated by a low large sun
                    138 Sun rays focused on the tree
                    139 Drawing the moon or stars in the background of the tree or wind
                    140 Wind blowing from the ground up to the tree
                    141 Keyhole-shaped tree
                    142 Tree resembling a phallus
                    143 Tree with dense branches and leaves on the far side from the house
                    144 Tree growing from the top of a house
                    145 Drawing leaves first
                    146 Canopy giving a round and soft impression
                    147 Drawing the ground line first then drawing the tree
                    148 Drawing the ground line after drawing the tree
                    149 Branches drooping like a weeping willow
                    150 Sun
                    151 Clouds between the tree and the sun
                    152 Large sun at a low position
                    153 Branches touching the sun
                    154 Moon or stars
                    155 Wind
                    156 Wind blowing from the ground
                    157 Wind blowing from above to the ground
                    158 Size - Large
                    159 Size - Medium
                    160 Size - Small
                    161 Position - Center
                    162 Position - Top & Size - Small
                    163 Position - Skewed to the Top
                    164 Position - Skewed to the Bottom
                    165 Position - Skewed to the Right
                    166 Position - Skewed to the Left
                    167 Position - Top Left
                    168 Position - Top Right
                    169 Position - Bottom Left Corner
                    170 Position - Bottom Right Corner
                    171 Position - Bottom Edge
                    172 Strong Pressure
                    173 Weak Pressure
                    174 Moderate Pressure Variations
                    175 Strong Pressure Throughout the Entire Drawing
                    176 Dark Outlines Only

                    Use the criteria to detect objects in the tree drawing For example if an evergreen tree and a noticeably thick trunk are detected return [2 9]"""
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
