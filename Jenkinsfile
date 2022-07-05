pipeline {

agent any 

stages{          
       sonarqube-check:
image:
name: sonarsource/sonar-scanner-cli:latest
entrypoint: [""]
variables:
SONAR_USER_HOME: "${CI_PROJECT_DIR}/.sonar"  # Defines the location of the analysis task cache
GIT_DEPTH: "0"  # Tells git to fetch all the branches of the project, required by the analysis task
cache:
key: "${CI_JOB_NAME}"
paths:
- .sonar/cache
script:
- sonar-scanner -X -Dsonar.sources=. -Dsonar.host.url=$SONAR_HOST_URL -Dsonar.login=$SONAR_LOGIN -Dsonar.password=$SONAR_PASSWORD
only:
- main # or the name of your main branch
      
       
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
