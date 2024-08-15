pipeline {
    agent any

    stages {
        stage('BE Build') {
            steps {
                sh 'chmod -R 777 .'
                dir('BE'){
                    sh './gradlew clean build'
                }
            }
        }
        
        stage('Docker Compose Down') {
            steps {
                echo 'Stopping and removing the Docker container named inmind-server...'
                sh '''
                docker rm -f inmind-server || true
                '''
            }
        }
        
        stage('Docker Compose Up') {
            steps {
                echo 'Deploying Docker containers...'
                sh 'docker-compose up --build -d'
            }
        }

        stage('Check Dump File') {
            steps {
                echo 'Checking if Dump.sql file exists...'
                sh 'ls -la $WORKSPACE'
                sh 'ls -la $WORKSPACE/mysql'
            }
        }

        stage('Restore MySQL Dump') {
            steps {
                echo 'Restoring MySQL dump file to the MySQL container...'
                sh '''                
                # 덤프 파일을 복사하여 컨테이너 내부로 이동
                docker cp $WORKSPACE/mysql/Dump.sql openvidu-mysql-1:/Dump.sql
                
                # 덤프 파일을 MySQL 데이터베이스로 복원
                docker exec openvidu-mysql-1 bash -c "mysql -u root -p1234 inmind < Dump.sql"
                
                # 덤프 파일 삭제 (선택 사항)
                docker exec openvidu-mysql-1 rm Dump.sql
                '''
            }
        }
        
        stage('Docker Image Build'){
            steps{
                dir('FE'){
                    sh 'docker build -t inmind-nginx-image .'
                }
            }
        }

        stage('Docker Stop & Remove') {
            steps {
                echo 'Stopping and removing the Docker container named inmind-nginx...'
                dir('FE') {
                    sh '''
                    docker stop inmind-nginx || true
                    docker rm -v inmind-nginx || true
                    '''
                }
            }
        }

        stage('Docker Run') {
            steps {
                dir('FE') {
                    echo 'Deploying Docker containers...'
                    sh 'docker run -d --network host --name inmind-nginx inmind-nginx-image'
                }
            }
        }

    }
}
