import { Request, Response, NextFunction } from 'express';

export const dataEmptyCheck = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.body)
      return res.status(400).json({
        success: false,
        message: 'Request is empty',
        data: null,
      });

    next();
  } catch (error) {
    next(error);
  }
};
