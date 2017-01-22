#! /bin/bash


content-bucket() {
  aws cloudformation describe-stacks \
    --stack-name engineer-site \
    --query 'Stacks[0].Outputs[?OutputKey==`"ContentStore"`]  | [0].OutputValue' \
    --output text
}

aws s3 cp \
   --recursive \
   build/ \
   s3://$(content-bucket)/
