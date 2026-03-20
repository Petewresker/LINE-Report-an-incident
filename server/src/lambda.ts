import serverlessExpress from '@vendia/serverless-express';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import app from './app';
import { connectDynamoDB } from './configs/dynamoose.config';

let serverlessExpressInstance: any;

// Initialize connection นอก handler เพื่อใช้ connection reuse
const setup = async () => {
  await connectDynamoDB();
  serverlessExpressInstance = serverlessExpress({ app });
};

export const handler = async (event: APIGatewayProxyEvent, context: Context) => {
  if (!serverlessExpressInstance) {
    await setup();
  }
  return serverlessExpressInstance(event, context);
};
