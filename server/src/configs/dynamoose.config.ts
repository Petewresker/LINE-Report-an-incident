import dynamoose from "dynamoose"
import dotenv from "dotenv"

dotenv.config()

export const connectDynamoDB = () => {
  dynamoose.aws.ddb.local(process.env.DYNAMODB_ENDPOINT!)
}
