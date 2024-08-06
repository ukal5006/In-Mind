pipeline {
    agent any

    tools {
        nodejs 'NodeJs 18'
    }

    stages {
        stage('Wait for MySQL') {
            steps {
<<<<<<< HEAD
                script {
                    echo 'Waiting for MySQL to be ready...'
                    sh '''
                    while ! docker exec openvidu-mysql-1 mysqladmin --user=root --password=1234 ping --silent; do
                        sleep 5
                    done
                    '''
                }
            }
        }

        stage('BE Build') {
            steps {
                sh 'chmod -R 777 .'
                dir('BE'){
                    sh './gradlew clean build'
                }
            }
        }
=======
                sh 'chmod -R 777 .'
                dir('BE'){
                    sh './gradlew clean build'
                }
            }
        }
        
        // stage('FE Build') {
        //     steps {
        //         sh 'chmod -R 777 .'
        //         dir('openvidu') {
        //             dir('react'){
        //                 sh 'npm install'
        //                 // Node.js 버전 호환성 문제 해결
        //                 sh 'export NODE_OPTIONS=--openssl-legacy-provider && npm run build'
        //             }
        //         }
        //     }
        // }
>>>>>>> df217d7bb21a1de23662f4d89d21e1c82aeea470
        
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
