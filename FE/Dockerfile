# Build stage
FROM node:20 AS builder

WORKDIR /app
COPY . .

RUN npm install

RUN npm install openvidu-browser

RUN npm install -g serve

RUN npm run build

CMD ["serve", "-s", "build"]
