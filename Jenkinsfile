pipeline {

agent any 
   
stages{ 

    stage('Docker Build and Push to dev ecr') {

        steps {
            echo "Building phffase started." 
           sh "aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 635261526007.dkr.ecr.us-east-1.amazonaws.com"
           sh "docker build -t web ."
           sh "docker tag web:latest 635261526007.dkr.ecr.us-east-1.amazonaws.com/web:latest"
           sh "docker push 635261526007.dkr.ecr.us-east-1.amazonaws.com/web:latest"
        }
    }
   
   stage('Deploy to EKS') {

        steps {
            echo "Deploying phase started."
           sh "kubectl apply deployment.yaml"
        }
    }
   
 }
}   
