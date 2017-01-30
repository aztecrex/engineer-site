#! /bin/bash


content-bucket() {
  aws cloudformation describe-stacks \
    --stack-name engineer-site \
    --query 'Stacks[0].Outputs[?OutputKey==`"ContentStore"`]  | [0].OutputValue' \
    --output text
}

if [ "$1" = "" ]; then
  origin_bucket=$(content-bucket)
else
  origin_bucket="$1"
fi

aws s3 cp \
   --recursive \
   --cache-control 'max-age=31536000' \
   --exclude index.html \
   build/ \
   "s3://${origin_bucket}/"

aws s3 cp \
   --cache-control 'max-age=900,s-maxage=60' \
   build/index.html \
   "s3://${origin_bucket}/"
