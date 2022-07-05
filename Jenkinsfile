pipeline {

agent any 

stages{          
        stage('Clone sources') {
            steps {
                git url: 'https://github.com/Manhar-Dangar/my-static-web.git'
            }
        }
        stage('SonarQube analysis') {
            steps {
                withSonarQubeEnv('sonar-instance') {
                    sh "./gradlew sonarqube"
                }
            }
        }
        stage("Quality gate") {
            steps {
                waitForQualityGate abortPipeline: true
            }
        }
      
       
   stage('Docker Build and Push to dev ecr') {
 
        steps {
            echo "Building phffase started." 
           sh "aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 635261526007.dkr.ecr.us-east-1.amazonaws.com"
           sh "docker build -t 635261526007.dkr.ecr.us-east-1.amazonaws.com/web:latest ."
           sh "docker push 635261526007.dkr.ecr.us-east-1.amazonaws.com/web:latest"
          
        }
    }
   
   stage('Deploy to EKS') {

        steps {
           echo "Deploying phase started."
           echo "previous Deployment Deleting"
           sh "kubectl rollout restart deployment nginx"
           echo "New Deployment starting..."
           sh "kubectl apply -f deployment.yaml"
           sh "docker rmi 635261526007.dkr.ecr.us-east-1.amazonaws.com/web:latest"
        }
    }
   
 }
} 
