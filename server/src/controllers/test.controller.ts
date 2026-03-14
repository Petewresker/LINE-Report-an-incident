import { Request, Response, NextFunction } from 'express';
import { getDataTestService } from '../services/test.service';
import { getDataTestRequest } from '../types/test.type';

export const getDataTest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body: getDataTestRequest = req.body;
    const result = await getDataTestService(body);

    return res.status(200).json({
      success: true,
      message: 'Test Successful',
      data: result,
    });
  } catch (error: any) {
    if (error.status)
      return res.status(error.status).json({
        code: error.code,
        message: error.message,
      });

    next(error);
  }
};
