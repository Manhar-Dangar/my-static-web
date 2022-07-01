pipeline {
    agent any
    environment {
        AWS_ACCOUNT_ID="635261526007"
        AWS_DEFAULT_REGION="us-east-1" 
        IMAGE_REPO_NAME="ECR_REPO_NAME"
        IMAGE_TAG="IMAGE_TAG"
        REPOSITORY_URI = "${635261526007}.dkr.ecr.${us-east-1}.amazonaws.com/${web}"
    }
   
    stages {
        
         stage('Logging into AWS ECR') {
            steps {
                script {
                sh "aws ecr get-login-password --region ${us-east-1} | docker login --username AWS --password-stdin ${635261526007}.dkr.ecr.${us-east-1}.amazonaws.com"
                }
                 
            }
        }
        
        stage('Cloning Git') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: '', url: 'https://github.com/Manhar-Dangar/my-static-web.git']]])     
            }
        }
  
    // Building Docker images
    stage('Building image') {
      steps{
        script {
          dockerImage = docker.build "${web}:${latest}"
        }
      }
    }
   
    // Uploading Docker images into AWS ECR
    stage('Pushing to ECR') {
     steps{  
         script {
                sh "docker tag ${web}:${IMAGE_TAG} ${635261526007.dkr.ecr.us-east-1.amazonaws.com/web}:$latest"
                sh "docker push ${635261526007}.dkr.ecr.${us-east-1}.amazonaws.com/${web}:${latest}"
         }
        }
      }
    }
}
