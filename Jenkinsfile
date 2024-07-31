pipeline {
    agent any

    tools {
        nodejs 'NodeJs 18'
    }

    stages {
        stage('BE Build') {
            steps {
                sh 'chmod -R 777 .'
                dir('openvidu'){
                    dir('react'){
                        sh './gradlew clean build'
                    }
                }
            }
        }
        
        stage('FE Build') {
            steps {
                sh 'chmod -R 777 .'
                dir('openvidu') {
                    dir('react'){
                        sh 'npm install'
                        // Node.js 버전 호환성 문제 해결
                        sh 'export NODE_OPTIONS=--openssl-legacy-provider && npm run build'
                    }
                }
            }
        }
        
        stage('Docker Compose Down') {
            steps {
                echo 'Stopping and removing existing Docker containers...'
                sh 'docker-compose down || true'
            }
        }
        
        stage('Docker Compose Up') {
            steps {
                echo 'Deploying Docker containers...'
                sh 'docker-compose up -d'
            }
        }
    }
}