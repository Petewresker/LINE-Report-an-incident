import { Request, Response, NextFunction } from 'express';
import { getUserCasesService } from '../services/case.service';

export const getUserCases = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;

    if (!userId || Array.isArray(userId)) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required',
      });
    }

    // เรียก service เพื่อดึงข้อมูล
    const cases = await getUserCasesService(userId);

    return res.status(200).json({
      success: true,
      message: 'Get user cases successfully',
      data: cases,
    });
  } catch (error: any) {
    if (error.status) {
      return res.status(error.status).json({
        success: false,
        message: error.message,
      });
    }

    next(error);
  }
};
