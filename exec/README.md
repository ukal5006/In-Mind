# 목차
1. 사용 도구
2. 개발 도구
3. 개발 환경
4. 환경 변수 형태
5. CI/CD 구축
6. 시연 시나리오

# 1. 사용 도구
- 이슈 관리 : Jira
- 형상 관리 : GitLab
- 커뮤니테이션 : Notion, MatterMost
- 디자인 : Figma
- CI/CD : Jenkins

# 2. 개발 도구
- Visual Studio Code: 1.92.1
- Node.js : 20.14.0
- IntelliJ : 24.2.0.1


# 3. 개발 환경
### Frontend
React: 18.3.1  
axios: 1.7.3  

---
### Backend
JDK: 17  
Spring Boot: 3.3.2  
JPA: 5.0.0:jakarta  
JWT: jjwt-0.11.5  
Python : 3.9  

---
### Server    
AWS EC2  
CPU: Intel(R) Xeon(R) CPU E5-2686 v4 @ 2.30Gz(4 Core, 4 thread)  
Disk: 311GB  
Ram: 16GB (MiB Swap 2G)  

---

### Service
nginx: 1.25.5  
openvidu: 2.30.0  
kurento-media-server: 7.0.1  
jenkins: 2.452.3  
mysql: 9.0.1  
Docker: 27.1.1  
Docker-compose: 2.27.2  

# 4. 환경 변수 형태
### Backend
  - application.properties
  ```
  spring.application.name=inmind
  server.port=5000

  # MySQL
  spring.datasource.url=jdbc:mysql://localhost:3306/inmind?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
  spring.datasource.username=username
  spring.datasource.password=password
  spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

  # JPA
  spring.jpa.hibernate.ddl-auto=update
  spring.jpa.show-sql=true
  spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
  spring.jpa.properties.hibernate.format_sql=true

  spring.jpa.properties.hibernate.jdbc.time_zone=Asia/Seoul

  # JWT secretKey
  
  jwt.secret=jwt-secret-key

  # salt
  salt.secret=salt-key

  # SpringDoc
  springdoc.packages-to-scan= com.ssafy.inmind
  springdoc.default-consumes-media-type= application/json;charset=UTF-8

  # Swagger UI
  springdoc.swagger-ui.path=/swagger-ui
  springdoc.api-docs.path=/swagger-ui/v3/api-docs

  springdoc.swagger-ui.disable-swagger-default-url= true
  springdoc.swagger-ui.display-request-duration= true
  springdoc.swagger-ui.operations-sorter= alpha

  # gpt api key
  openai.api.key=api-key
  ```
---

# 5. CI/CD 구축
### 1. UFW 방화벽 설정
```
sudo apt-get update

sudo ufw status
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
sudo ufw status numbered
```
### 2. Swap 메모리 설정
```
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```
### 3. 서버 시간 설정
```
sudo timedatectl set-timezone Asia/Seoul
```
### 4. 도커 및 도커 컴포즈 설치
```
sudo apt-get install -y ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update

sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

sudo curl -L "https://github.com/docker/compose/releases/download/$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep -oP '(?<=tag_name": "v)[^"]*')/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```
### 5. openvidu 설치
```
sudo su
cd /opt

curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_latest.sh | bash

1. Go to openvidu folder:
$ cd openvidu

2. Configure DOMAIN_OR_PUBLIC_IP and OPENVIDU_SECRET in .env file:
$ nano .env
```
### 6. .env 설정
```
# OpenVidu configuration
# ----------------------
# Documentation: https://docs.openvidu.io/en/stable/reference-docs/openvidu-config/

# NOTE: This file doesn't need to quote assignment values, like most shells do.
# All values are stored as-is, even if they contain spaces, so don't quote them.

# Domain name. If you do not have one, the public IP of the machine.
# For example: 198.51.100.1, or openvidu.example.com
DOMAIN_OR_PUBLIC_IP=b301.xyz

# OpenVidu SECRET used for apps to connect to OpenVidu server and users to access to OpenVidu Dashboard
OPENVIDU_SECRET=ssafy

# Certificate type:
# - selfsigned:  Self signed certificate. Not recommended for production use.
#                Users will see an ERROR when connected to web page.
# - owncert:     Valid certificate purchased in a Internet services company.
#                Please put the certificates files inside folder ./owncert
#                with names certificate.key and certificate.cert
# - letsencrypt: Generate a new certificate using letsencrypt. Please set the
#                required contact email for Let's Encrypt in LETSENCRYPT_EMAIL
#                variable.
CERTIFICATE_TYPE=letsencrypt

# If CERTIFICATE_TYPE=letsencrypt, you need to configure a valid email for notifications
LETSENCRYPT_EMAIL=user@example.com
...
```
### 7-1. docker-compose.yml 설정
```
nano docker-compose.yml
```
```
# ------------------------------------------------------------------------------
#
#    DO NOT MODIFY THIS FILE !!!
#
#    Configuration properties should be specified in .env file
#
#    Application based on OpenVidu should be specified in
#    docker-compose.override.yml file
#
#    This docker-compose file coordinates all services of OpenVidu CE Platform
#
#    This file will be overridden when update OpenVidu Platform
#
#    Openvidu Version: 2.30.0
#
#    Installation Mode: On Premises
#
# ------------------------------------------------------------------------------

version: '3.1'

services:

    openvidu-server:
        image: openvidu/openvidu-server:2.30.0
        restart: on-failure
        network_mode: host
        entrypoint: ['/usr/local/bin/entrypoint.sh']
        volumes:
            - ./coturn:/run/secrets/coturn
            - /var/run/docker.sock:/var/run/docker.sock
            - ${OPENVIDU_RECORDING_PATH}:${OPENVIDU_RECORDING_PATH}
            - ${OPENVIDU_RECORDING_CUSTOM_LAYOUT}:${OPENVIDU_RECORDING_CUSTOM_LAYOUT}
            - ${OPENVIDU_CDR_PATH}:${OPENVIDU_CDR_PATH}
        env_file:
            - .env
        environment:
            - SERVER_SSL_ENABLED=false
            - SERVER_PORT=5443
            - KMS_URIS=["ws://localhost:8888/kurento"]
            - COTURN_IP=${COTURN_IP:-auto-ipv4}
            - COTURN_PORT=${COTURN_PORT:-3478}
        logging:
            options:
                max-size: "${DOCKER_LOGS_MAX_SIZE:-100M}"

    kms:
        image: ${KMS_IMAGE:-kurento/kurento-media-server:7.0.1}
        restart: always
        network_mode: host
        ulimits:
          core: -1
        volumes:
            - /opt/openvidu/kms-crashes:/opt/openvidu/kms-crashes
            - ${OPENVIDU_RECORDING_PATH}:${OPENVIDU_RECORDING_PATH}
            - /opt/openvidu/kurento-logs:/opt/openvidu/kurento-logs
        environment:
            - KMS_MIN_PORT=40000
            - KMS_MAX_PORT=57000
            - GST_DEBUG=${KMS_DOCKER_ENV_GST_DEBUG:-}
            - KURENTO_LOG_FILE_SIZE=${KMS_DOCKER_ENV_KURENTO_LOG_FILE_SIZE:-100}
            - KURENTO_LOGS_PATH=/opt/openvidu/kurento-logs
        logging:
            options:
                max-size: "${DOCKER_LOGS_MAX_SIZE:-100M}"

    coturn:
        image: openvidu/openvidu-coturn:2.30.0
        restart: on-failure
        ports:
            - "${COTURN_PORT:-3478}:${COTURN_PORT:-3478}/tcp"
            - "${COTURN_PORT:-3478}:${COTURN_PORT:-3478}/udp"
        env_file:
            - .env
        volumes:
            - ./coturn:/run/secrets/coturn
        command:
            - --log-file=stdout
            - --listening-port=${COTURN_PORT:-3478}
            - --fingerprint
            - --min-port=${COTURN_MIN_PORT:-57001}
            - --max-port=${COTURN_MAX_PORT:-65535}
            - --realm=openvidu
            - --verbose
            - --use-auth-secret
            - --static-auth-secret=$${COTURN_SHARED_SECRET_KEY}
        logging:
            options:
                max-size: "${DOCKER_LOGS_MAX_SIZE:-100M}"

    nginx:
        image: openvidu/openvidu-proxy:2.30.0
        restart: always
        network_mode: host
        volumes:
            - ./certificates:/etc/letsencrypt
            - ./owncert:/owncert
            - ./custom-nginx-vhosts:/etc/nginx/vhost.d/
            - ./custom-nginx-locations:/custom-nginx-locations
            - ${OPENVIDU_RECORDING_CUSTOM_LAYOUT}:/opt/openvidu/custom-layout
            - ./custom-nginx.conf:/etc/nginx/conf.d/default.conf
        environment:
            - DOMAIN_OR_PUBLIC_IP=${DOMAIN_OR_PUBLIC_IP}
            - CERTIFICATE_TYPE=${CERTIFICATE_TYPE}
            - LETSENCRYPT_EMAIL=${LETSENCRYPT_EMAIL}
            - PROXY_HTTP_PORT=${HTTP_PORT:-}
            - PROXY_HTTPS_PORT=${HTTPS_PORT:-}
            - PROXY_HTTPS_PROTOCOLS=${HTTPS_PROTOCOLS:-}
            - PROXY_HTTPS_CIPHERS=${HTTPS_CIPHERS:-}
            - PROXY_HTTPS_HSTS=${HTTPS_HSTS:-}
            - ALLOWED_ACCESS_TO_DASHBOARD=${ALLOWED_ACCESS_TO_DASHBOARD:-}
            - ALLOWED_ACCESS_TO_RESTAPI=${ALLOWED_ACCESS_TO_RESTAPI:-}
            - PROXY_MODE=CE
            - WITH_APP=true
            - SUPPORT_DEPRECATED_API=${SUPPORT_DEPRECATED_API:-false}
            - REDIRECT_WWW=${REDIRECT_WWW:-false}
            - WORKER_CONNECTIONS=${WORKER_CONNECTIONS:-10240}
            - PUBLIC_IP=${PROXY_PUBLIC_IP:-auto-ipv4}
        logging:
            options:
                max-size: "${DOCKER_LOGS_MAX_SIZE:-100M}"
```

### 7-2. docker-compose.override.yml 설정
```
nano docker-compose.override.yml
```
```
version: '3.1'

services:
    # --------------------------------------------------------------
    #
    #    Change this if your want use your own application.
    #    It's very important expose your application in port 5442
    #    and use the http protocol.
    #
    #    Default Application
    #
    #    Openvidu-Call Version: 2.30.0
    #
    # --------------------------------------------------------------
    app:
        image: openvidu/openvidu-server:2.30.0
        restart: on-failure
        network_mode: host
        environment:
            - SERVER_PORT=5442
            - OPENVIDU_URL=http://localhost:5443
            - OPENVIDU_SECRET=ssafy
            - CALL_OPENVIDU_CERTTYPE=letsencrypt
            - CALL_PRIVATE_ACCESS=${CALL_PRIVATE_ACCESS:-}
            - CALL_USER=${CALL_USER:-}
            - CALL_SECRET=${CALL_SECRET:-}
            - CALL_ADMIN_SECRET=${CALL_ADMIN_SECRET:-}
            - CALL_RECORDING=${CALL_RECORDING:-}
        logging:
            options:
                max-size: "${DOCKER_LOGS_MAX_SIZE:-100M}"

    jenkins:
        image: jenkins/jenkins:lts
        restart: on-failure
        network_mode: host
        volumes:
            - jenkins_home:/var/jenkins_home
            - /var/run/docker.sock:/var/run/docker.sock
        environment:
            - JENKINS_OPTS="--prefix=/jenkins"

    mysql:
        image: mysql:latest
        restart: always
        network_mode: host
        environment:
            MYSQL_ROOT_PASSWORD: 1q2w3e4r1!
            MYSQL_DATABASE: inmind
        volumes:
            - db_data:/var/lib/mysql

volumes:
    jenkins_home:
    db_data:
```
- custom-nginx.conf 추가
```
nano custom-nginx.conf
```
```
# Your App
upstream yourapp {
    server localhost:3000;
}

upstream openviduserver {
    server localhost:5443;
}

upstream jenkinsserver {
    server localhost:8080;
}

upstream backendserver {
    server localhost:5000;
}

server {
    listen 80;
    listen [::]:80;
    server_name i11b301.p.ssafy.io;

    # Redirect to https
    location / {
        rewrite ^(.*) https://i11b301.p.ssafy.io:443$1 permanent;
    }

    # letsencrypt
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location /nginx_status {
        stub_status;
        allow 127.0.0.1;        #only allow requests from localhost
        deny all;               #deny all other hosts
    }
}



server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name i11b301.p.ssafy.io;

    # SSL Config
    ssl_certificate         /etc/letsencrypt/live/i11b301.p.ssafy.io/fullchain.pem;
    ssl_certificate_key     /etc/letsencrypt/live/i11b301.p.ssafy.io/privkey.pem;
    ssl_trusted_certificate /etc/letsencrypt/live/i11b301.p.ssafy.io/fullchain.pem;

    ssl_session_cache shared:SSL:50m;
    ssl_session_timeout 5m;
    ssl_stapling on;
    ssl_stapling_verify on;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers "ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384";
    ssl_prefer_server_ciphers off;

    add_header Strict-Transport-Security "max-age=63072000" always;

    # Proxy
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-Proto https;
    proxy_headers_hash_bucket_size 512;
    proxy_redirect off;

    # Websockets
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";

    # Your App
    location / {
        allow all;
        deny all;
        proxy_pass http://yourapp; # Openvidu call by default
    }

    ########################
    # OpenVidu Locations   #
    ########################
    #################################
    # Common rules CE              #
    #################################
    # Dashboard rule
    location /dashboard {
        allow all;
        deny all;
        proxy_pass http://openviduserver;
    }

    # Websocket rule
    location ~ /openvidu$ {
        allow all;
        deny all;
        proxy_pass http://openviduserver;
    }


    #################################
    # New API                       #
    #################################
    location /openvidu/layouts {
        allow all;
        deny all;
        rewrite ^/openvidu/layouts/(.*)$ /custom-layout/$1 break;
        root /opt/openvidu;
    }

    location /openvidu/recordings {
        allow all;
        deny all;
        proxy_pass http://openviduserver;
    }

    location /openvidu/api {
        allow all;
        deny all;
        proxy_pass http://openviduserver;
    }

    location /openvidu/info {
        allow all;
        deny all;
        proxy_pass http://openviduserver;
    }

    location /openvidu/accept-certificate {
        allow all;
        proxy_pass http://openviduserver;
    }

    location /openvidu/cdr {
        allow all;
        deny all;
        proxy_pass http://openviduserver;
    }

    location /jenkins {
        allow all;
        deny all;
        proxy_pass http://jenkinsserver;
    }

    location /api/ {
        allow all;
        deny all;
        rewrite ^/api/(.*)$ /$1 break;
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;

        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /swagger-ui/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;

        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /yolo/ {
        allow all;
        deny all;
        rewrite ^/yolo/(.*)$ /$1 break;
        proxy_pass http://localhost:6000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;

        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }


    #################################
    # LetsEncrypt                   #
    #################################
    location /.well-known/acme-challenge {
        root /var/www/certbot;
        try_files $uri $uri/ =404;
    }
}
```
### 8. openvidu 실행
```
./openvidu start
```
### 9. 젠킨스 설정
`https://i11b301.p.ssafy.io/jenkins/` 에 접속


```
docker exec openvidu-jenkins-1 cat /var/jenkins_home/secrets/initialAdminPassword
```
![image](/uploads/d6058331fa290fe662acf0fe7573deef/image.png)
![image](/uploads/1492c46ad481457215ec57879ce22e4f/image.png)
![image](/uploads/98d21055497e3eb0640ad7b37c5c70b7/image.png)
![image](/uploads/fe7dc329ce51d47826bff66d70ff9af6/image.png)
![image](/uploads/037a9629bf77c82b2d9d2a4809468a44/image.png)
![image](/uploads/900b2c706890954df84bc9446e3a1f30/image.png)
![image](/uploads/73552453b8c4446e599e54aee4615729/image.png)
![image](/uploads/52f7975086ea990cbbac03b3df69045e/image.png)
![image](/uploads/a0aff4a72e65449dbd14c976a1e70657/image.png)
![image](/uploads/599060b481042573f8cc72b4b9d5fb33/image.png)
![image](/uploads/12e587dbeea25e90144e93b3d4a72170/image.png)
![image](/uploads/70d8e0cea6b4d19655d234eb5cc591f1/image.png)
![image](/uploads/c8af5bb395dc89bcd9786cc625d6103c/image.png)
![image](/uploads/c67e88e57e78d6a01f391b26ccdd6f28/image.png)
![image](/uploads/a7234c7a0adc42623bb46913f9d62537/image.png)

### 10. mysql 설정
```
git clone https://lab.ssafy.com/s11-webmobile1-sub2/S11P12B301.git
cd S11P12B301/mysql

docker exec -i openvidu-mysql-1 mysql -u root -ppw1 inmind < Dump.sql
```

### 11. Fastapi-server 추가
```
cd S11P12B301/AI
sudo docker build --no-cache -t inmind-python-image .
sudo docker run -d --network host --name inmind-python inmind-python-image
```

# 6. 시연 시나리오


