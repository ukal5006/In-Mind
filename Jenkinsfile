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
    }
}
