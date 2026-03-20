import dynamoose from 'dynamoose';

export const connectDynamoDB = async () => {
  try {
    // ถ้าเป็น production ใช้ AWS DynamoDB
    if (process.env.NODE_ENV === 'production') {
      dynamoose.aws.ddb.set(
        new dynamoose.aws.ddb.DynamoDB({
          region: process.env.REGION || 'us-east-1',
        })
      );
    } else {
      // Local development
      dynamoose.aws.ddb.local('http://localhost:8000');
    }
    
    console.log('DynamoDB connected successfully');
  } catch (error) {
    console.error('DynamoDB connection failed:', error);
    throw error;
  }
};
