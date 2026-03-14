import app from './app';
import { connectDynamoDB } from './configs/dynamoose.config';

const PORT = process.env.PORT || 5050;

const startServer = async () => {
  try {
    await connectDynamoDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Server start failed', error);
    process.exit(1);
  }
};

startServer();
