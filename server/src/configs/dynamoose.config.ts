import dynamoose from "dynamoose"
import dotenv from "dotenv"

dotenv.config()

export const connectDynamoDB = () => {
  // for local development
  if (process.env.NODE_ENV === 'development' && process.env.DYNAMODB_ENDPOINT) {
    dynamoose.aws.ddb.local(process.env.DYNAMODB_ENDPOINT);
    console.log('Connected to DynamoDB Local');
  } else {
    // for production AWS - use default AWS credentials
    console.log('Connected to DynamoDB AWS');
  }
}
