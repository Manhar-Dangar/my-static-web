pipeline {

agent any 
tools {nodejs "node_v10"}  
stages{  
  
   stage('Git Pull') {
       steps {
          echo 'Code Checkout'
          }
        }
    
     stage('Code scan Sonarqube') {
        steps {
          script {
       def scannerHome = tool 'sonar-instance';
       withSonarQubeEnv("sonarqube-container") {
       sh """${tool("sonarqube")}/bin/sonar-scanner \
       -Dsonar.projectKey=test-node-js \
       -Dsonar.sources=. \
       -Dsonar.projectName=test-node-js \
       -Dsonar.projectVersion=1.0 """
           }
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
