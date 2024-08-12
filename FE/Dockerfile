# Build stage
FROM node:18 as build-stage
WORKDIR /app

# Copy package.json and package-lock.json for better cache on Docker layer
COPY package.json package-lock.json ./

# Install dependencies in a single layer
RUN npm install && \
    npm install openvidu-browser && \
    npm install -g serve

CMD ["serve", "-s", "build;"]

# Copy the rest of the application code
# COPY . .

# Build the application
# RUN npm run build

# Production stage
# FROM nginx:latest
# Copy the build output to nginx html folder
# COPY --from=build-stage /app/build /usr/share/nginx/html

# Copy custom nginx configuration if needed
# COPY nginx.conf /etc/nginx/nginx.conf

# Command to run nginx
# CMD ["nginx", "-g", "daemon off;"]
