pipeline {

agent any
   
stages{

    stage('Docker Build and Push to dev ecr') {
        when {
            branch "master"
        }
        steps {
            echo "Building phase started."
            nodejs('NodeJS-16.0.0') {
               
               sh 'pm2 --version'
            }
            sh "aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 635261526007.dkr.ecr.us-east-1.amazonaws.com"
            sh "docker build -t web ." 
            sh "docker push 635261526007.dkr.ecr.us-east-1.amazonaws.com/web:latest"   
        }
    }
 }
}
