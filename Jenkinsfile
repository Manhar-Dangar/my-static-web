pipeline {

agent any 
    stages
    {
    stage('Docker Build and push to ECR') {
 
        steps {
           echo "Building phase started" 
           sh "aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 635261526007.dkr.ecr.us-east-1.amazonaws.com"
           sh "docker build -t 635261526007.dkr.ecr.us-east-1.amazonaws.com/web:latest ."
            echo "Pushing Image to ECR"
           sh "docker push 635261526007.dkr.ecr.us-east-1.amazonaws.com/web:latest"
          
        }
    }
   
   stage('Deploy to EKS') {

        steps {
           echo "Deploying phase started"
           sh "kubectl rollout restart deployment nginx"
           sh "kubectl apply -f deployment.yaml"
           sh "docker rmi 635261526007.dkr.ecr.us-east-1.amazonaws.com/web:latest"
        }
    }
    }
 
} 
 
