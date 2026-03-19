 
#!/bin/bash

npm run build

aws s3 mb s3://incident-line --region us-east-1

aws s3 sync ./out s3://incident-line --delete

aws s3 website s3://incident-line \
  --index-document index.html \
  --error-document index.html

aws s3api put-public-access-block \
  --bucket incident-line \
  --public-access-block-configuration "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"

aws s3api put-bucket-policy --bucket incident-line --policy '{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::incident-line/*"
  }]
}'