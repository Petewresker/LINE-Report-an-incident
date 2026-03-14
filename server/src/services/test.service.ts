import { getDataTestRequest } from '../types/test.type';

export const getDataTestService = async (data: getDataTestRequest) => {
  try {
    return data.text;
  } catch (error) {
    throw error;
  }
};
