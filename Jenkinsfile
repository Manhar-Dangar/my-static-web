variables:
  DOCKER_REGISTRY: 635261526007.dkr.ecr.us-east-1.amazonaws.com
  APP_NAME: web
pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                    sh docker info
                    sh docker build -t 635261526007.dkr.ecr.us-east-1.amazonaws.com/web . 
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
                  image: 
                    name: $DOCKER_REGISTRY/$APP_NAME:"$TAG"
                    services:
                        sh docker:dind
                        sh aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $DOCKER_REGISTRY
                        sh docker push 635261526007.dkr.ecr.us-east-1.amazonaws.com/web
                        sh docker rmi 635261526007.dkr.ecr.us-east-1.amazonaws.com/web
            }
        }
    }
}













